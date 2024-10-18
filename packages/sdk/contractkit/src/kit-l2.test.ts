import { StrongAddress } from '@celo/base'
import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import { timeTravel } from '@celo/dev-utils/lib/ganache-test'
import Web3 from 'web3'
import { ContractKit, newKitFromWeb3 } from './kit'
import { startAndFinishEpochProcess } from './test-utils/utils'

testWithAnvilL2('kit', (web3: Web3) => {
  let kit: ContractKit
  let feeToken: StrongAddress

  beforeAll(async () => {
    kit = newKitFromWeb3(web3)

    const feeCurrencyWhitelist = await kit.contracts.getFeeCurrencyWhitelist()
    const gasOptions = await feeCurrencyWhitelist.getWhitelist()
    feeToken = gasOptions[0]
  })

  describe('when on cel2', () => {
    describe('when gas is missing', () => {
      it('fills the gas and works as normal', async () => {
        await expect(
          kit.populateMaxFeeInToken({
            feeCurrency: feeToken,
          })
        ).resolves.toMatchInlineSnapshot(`
          {
            "feeCurrency": "0x06f60E083aDf016a98E3c7A1aFfa1c097B617aB9",
            "gas": 53001,
            "maxFeeInFeeCurrency": "54061020000000",
            "maxFeePerGas": "1000000000",
            "maxPriorityFeePerGas": "1000000000",
          }
        `)
      })
    })
    describe('when maxFeePerFeeCurrency exists', () => {
      it('returns without modification', async () => {
        const maxFeeInFeeCurrency = '2000000'
        await expect(
          kit.populateMaxFeeInToken({
            maxFeeInFeeCurrency,
            feeCurrency: feeToken,
            gas: '102864710371401736267367367',
          })
        ).resolves.toMatchObject({
          maxFeeInFeeCurrency,
          feeCurrency: feeToken,
          gas: '102864710371401736267367367',
        })
      })
    })
    describe('when feeCurrency provided with gas', () => {
      it('returns with maxFeePerFeeCurrency estimated', async () => {
        await expect(
          kit.populateMaxFeeInToken({
            feeCurrency: feeToken,
            gas: '102864710371401736267367367',
          })
        ).resolves.toMatchInlineSnapshot(`
          {
            "feeCurrency": "0x06f60E083aDf016a98E3c7A1aFfa1c097B617aB9",
            "gas": "102864710371401736267367367",
            "maxFeeInFeeCurrency": "104922004578829770992714714340000000",
            "maxFeePerGas": "1000000000",
            "maxPriorityFeePerGas": "1000000000",
          }
        `)
      })
    })
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
      expect(await kit.getLastBlockNumberForEpoch(7)).toEqual(371)

      expect(await kit.getFirstBlockNumberForEpoch(8)).toEqual(372)
    })

    it('gets the current epoch number', async () => {
      expect(await kit.getEpochNumberOfBlock(300)).toEqual(4)
      expect(await kit.getEpochNumberOfBlock(357)).toEqual(6)
      expect(await kit.getEpochNumberOfBlock(371)).toEqual(7)
      expect(await kit.getEpochNumberOfBlock(372)).toEqual(8)
    })

    it('throws when block number is out of range', async () => {
      await expect(kit.getEpochNumberOfBlock(299)).rejects.toThrow()
      await expect(kit.getEpochNumberOfBlock(373)).rejects.toThrow()
    })
  })
})
