import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import { mineBlocks, timeTravel } from '@celo/dev-utils/lib/ganache-test'
import Web3 from 'web3'
import { ContractKit, newKitFromWeb3 } from '../kit'
import { startAndFinishEpochProcess } from '../test-utils/utils'

testWithAnvilL2('DowntimeSlasherWrapper', (web3: Web3) => {
  let kit: ContractKit

  beforeEach(async () => {
    kit = newKitFromWeb3(web3)
    const epochManagerWrapper = await kit.contracts.getEpochManager()
    const epochDuration = await epochManagerWrapper.epochDuration()
    const downtimeSlasherWrapper = await kit.contracts.getDowntimeSlasher()

    // Go 3 epochs ahead
    for (let i = 0; i < 3; i++) {
      await timeTravel(epochDuration * 2, web3)
      await mineBlocks(await downtimeSlasherWrapper.slashableDowntime(), web3)
      await startAndFinishEpochProcess(kit)
    }
  })

  it('calculates slashable downtime intervals', async () => {
    const wrapper = await kit.contracts.getDowntimeSlasher()

    expect(await wrapper.slashableDowntimeIntervalsBefore()).toMatchInlineSnapshot(`
      [
        {
          "end": 537,
          "start": 478,
        },
      ]
    `)
  })
})
