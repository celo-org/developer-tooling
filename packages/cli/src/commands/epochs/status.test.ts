import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import { ux } from '@oclif/core'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Start from './start'
import Status from './status'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('epochs:status cmd', (web3) => {
  it('shows the current status of the epoch', async () => {
    const consoleMock = jest.spyOn(ux.write, 'stdout')
    const kit = newKitFromWeb3(web3)
    const epochManagerWrapper = await kit.contracts.getEpochManager()

    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(4)
    await expect(testLocallyWithWeb3Node(Status, ['--output', 'csv'], web3)).resolves.toBe(true)

    expect(consoleMock.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "Query,Response
      ",
        ],
        [
          "Current Epoch Number,4n
      ",
        ],
        [
          "First Block of Epoch,300n
      ",
        ],
        [
          "Last Block of Epoch,0n
      ",
        ],
        [
          "Has Epoch Processing Begun?,false
      ",
        ],
        [
          "Is In Epoch Process?,false
      ",
        ],
        [
          "Is Processing Individually?,false
      ",
        ],
        [
          "Is Time for Next Epoch,false
      ",
        ],
        [
          "Epoch Start Time,2025-02-03T21:50:43.000Z
      ",
        ],
      ]
    `)
  })
  describe('when the epoch has is processing', () => {
    beforeEach(async () => {
      const accounts = await web3.eth.getAccounts()
      await testLocallyWithWeb3Node(Start, ['--from', accounts[0]], web3)
    })
    it('shows the current status of the epoch', async () => {
      const consoleMock = jest.spyOn(ux.write, 'stdout')
      const kit = newKitFromWeb3(web3)
      const epochManagerWrapper = await kit.contracts.getEpochManager()

      expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(4)
      await expect(testLocallyWithWeb3Node(Status, ['--output', 'csv'], web3)).resolves.toBe(true)

      expect(consoleMock.mock.calls).toMatchInlineSnapshot(`
        [
          [
            "Query,Response
        ",
          ],
          [
            "Current Epoch Number,4n
        ",
          ],
          [
            "First Block of Epoch,300n
        ",
          ],
          [
            "Last Block of Epoch,0n
        ",
          ],
          [
            "Has Epoch Processing Begun?,true
        ",
          ],
          [
            "Is In Epoch Process?,true
        ",
          ],
          [
            "Is Processing Individually?,false
        ",
          ],
          [
            "Is Time for Next Epoch,true
        ",
          ],
          [
            "Epoch Start Time,2025-02-03T21:50:43.000Z
        ",
          ],
        ]
      `)
    })
  })
})
