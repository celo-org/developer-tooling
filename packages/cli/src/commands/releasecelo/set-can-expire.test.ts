import { newReleaseGold } from '@celo/abis/web3/ReleaseGold'
import { StrongAddress } from '@celo/base'
import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { ReleaseGoldWrapper } from '@celo/contractkit/lib/wrappers/ReleaseGold'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { stripAnsiCodesAndTxHashes, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import { createMultisig } from '../../test-utils/multisigUtils'
import { deployReleaseGoldContract } from '../../test-utils/release-gold'
import SetCanExpire from './set-can-expire'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('releasegold:set-can-expire cmd', (client) => {
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

  it('fails to set the same value', async () => {
    const logMock = jest.spyOn(console, 'log')

    await expect(
      testLocallyWithWeb3Node(
        SetCanExpire,
        ['--contract', contractAddress, '--value', 'true', '--yesreally'],
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
          "   ✘  New expire value is different ",
        ],
      ]
    `)
  })

  it('sets can expire to false and then true', async () => {
    const releaseGoldWrapper = new ReleaseGoldWrapper(
      kit.connection,
      newReleaseGold(kit.web3, contractAddress),
      kit.contracts
    )

    await testLocallyWithWeb3Node(
      SetCanExpire,
      ['--contract', contractAddress, '--value', 'false', '--yesreally'],
      client
    )

    expect((await releaseGoldWrapper.getRevocationInfo()).canExpire).toBeFalsy()

    await testLocallyWithWeb3Node(
      SetCanExpire,
      ['--contract', contractAddress, '--value', 'true', '--yesreally'],
      client
    )

    expect((await releaseGoldWrapper.getRevocationInfo()).canExpire).toBeTruthy()
  })
})
