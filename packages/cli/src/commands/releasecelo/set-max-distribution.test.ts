import { newReleaseGold } from '@celo/abis/web3/ReleaseGold'
import { StrongAddress } from '@celo/base'
import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { ReleaseGoldWrapper } from '@celo/contractkit/lib/wrappers/ReleaseGold'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { stripAnsiCodesAndTxHashes, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import { createMultisig } from '../../test-utils/multisigUtils'
import { deployReleaseGoldContract } from '../../test-utils/release-gold'
import SetMaxDistribution from './set-max-distribution'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('releasegold:set-max-distribution cmd', (client) => {
  let contractAddress: string
  let kit: ContractKit

  beforeEach(async () => {
    const accounts = (await client.eth.getAccounts()) as StrongAddress[]
    kit = newKitFromWeb3(client)

    contractAddress = await deployReleaseGoldContract(
      client,
      await createMultisig(kit, [accounts[0], accounts[1]] as StrongAddress[], 2, 2),
      accounts[1],
      accounts[0],
      accounts[2]
    )
  })

  it('sets max distribution', async () => {
    const releaseGoldWrapper = new ReleaseGoldWrapper(
      kit.connection,
      newReleaseGold(kit.web3, contractAddress),
      kit.contracts
    )

    // This basically halves the total balance which is 40 CELO initially
    await testLocallyWithWeb3Node(
      SetMaxDistribution,
      ['--contract', contractAddress, '--distributionRatio', '500', '--yesreally'],
      client
    )

    expect((await releaseGoldWrapper.getMaxDistribution()).toFixed()).toEqual(
      client.utils.toWei('20', 'ether')
    )
  })

  it('fails if max distribution out of range', async () => {
    const logMock = jest.spyOn(console, 'log')

    await expect(
      testLocallyWithWeb3Node(
        SetMaxDistribution,
        ['--contract', contractAddress, '--distributionRatio', '1500', '--yesreally'],
        client
      )
    ).rejects.toMatchInlineSnapshot(`[Error: Some checks didn't pass!]`)

    expect(
      logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes))
    ).toMatchInlineSnapshot(`
      [
        [
          "Running Checks:",
        ],
        [
          "   ✘  Distribution ratio must be within [0, 1000] ",
        ],
      ]
    `)
  })
})
