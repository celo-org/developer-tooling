import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import { timeTravel } from '@celo/dev-utils/lib/ganache-test'
import Web3 from 'web3'
import { ContractKit, newKitFromWeb3 } from './kit'
import { startAndFinishEpochProcess } from './test-utils/utils'

testWithAnvilL2('kit', (web3: Web3) => {
  let kit: ContractKit

  beforeAll(async () => {
    kit = newKitFromWeb3(web3)
  })

  describe('epochs', () => {
    let epochDuration: number

    beforeEach(async () => {
      const epochManagerWrapper = await kit.contracts.getEpochManager()
      epochDuration = await epochManagerWrapper.epochDuration()

      // Go 3 epochs ahead
      for (let i = 0; i < 3; i++) {
        await timeTravel(epochDuration * 2, web3)
        await startAndFinishEpochProcess(kit)
      }

      await timeTravel(epochDuration * 2, web3)

      const accounts = await kit.web3.eth.getAccounts()

      await epochManagerWrapper.startNextEpochProcess().sendAndWaitForReceipt({
        from: accounts[0],
      })

      await (
        await epochManagerWrapper.finishNextEpochProcessTx()
      ).sendAndWaitForReceipt({
        from: accounts[0],
      })
    })

    it('gets the current epoch size', async () => {
      expect(await kit.getEpochSize()).toEqual(epochDuration)
    })

    it('gets first and last block number of an epoch', async () => {
      expect(await kit.getFirstBlockNumberForEpoch(4)).toEqual(300)
      expect(await kit.getLastBlockNumberForEpoch(4)).toEqual(352)

      expect(await kit.getFirstBlockNumberForEpoch(5)).toEqual(353)
      expect(await kit.getLastBlockNumberForEpoch(5)).toEqual(355)

      expect(await kit.getFirstBlockNumberForEpoch(6)).toEqual(356)
      expect(await kit.getLastBlockNumberForEpoch(6)).toEqual(358)

      expect(await kit.getFirstBlockNumberForEpoch(7)).toEqual(359)
      expect(await kit.getLastBlockNumberForEpoch(7)).toEqual(361)

      expect(await kit.getFirstBlockNumberForEpoch(8)).toEqual(362)
    })

    it('gets the current epoch number', async () => {
      expect(await kit.getEpochNumberOfBlock(300)).toEqual(4)
      expect(await kit.getEpochNumberOfBlock(357)).toEqual(6)
      expect(await kit.getEpochNumberOfBlock(361)).toEqual(7)
      expect(await kit.getEpochNumberOfBlock(362)).toEqual(8)
    })

    it('throws when block number is out of range for L2', async () => {
      await expect(kit.getEpochNumberOfBlock(363)).rejects.toThrow()
    })
  })
})
