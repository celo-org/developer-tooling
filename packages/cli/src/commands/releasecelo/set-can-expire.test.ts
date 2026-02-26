import { releaseGoldABI } from '@celo/abis'
import { StrongAddress } from '@celo/base'
import { ContractKit, newKitFromProvider } from '@celo/contractkit'
import { ReleaseGoldWrapper } from '@celo/contractkit/lib/wrappers/ReleaseGold'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { stripAnsiCodesAndTxHashes, testLocallyWithNode } from '../../test-utils/cliUtils'
import { createMultisig } from '../../test-utils/multisigUtils'
import { deployReleaseGoldContract } from '../../test-utils/release-gold'
import SetCanExpire from './set-can-expire'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('releasegold:set-can-expire cmd', (provider) => {
  let contractAddress: string
  let kit: ContractKit

  beforeEach(async () => {
    kit = newKitFromProvider(provider)
    const accounts = (await kit.connection.getAccounts()) as StrongAddress[]

    contractAddress = await deployReleaseGoldContract(
      provider,
      await createMultisig(kit, [accounts[0], accounts[1]] as StrongAddress[], 2, 2),
      accounts[1],
      accounts[0],
      accounts[2]
    )
  })

  it('fails to set the same value', async () => {
    const logMock = jest.spyOn(console, 'log')

    await expect(
      testLocallyWithNode(
        SetCanExpire,
        ['--contract', contractAddress, '--value', 'true', '--yesreally'],
        provider
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
      kit.connection.getViemContract(releaseGoldABI as any, contractAddress),
      kit.contracts
    )

    await testLocallyWithNode(
      SetCanExpire,
      ['--contract', contractAddress, '--value', 'false', '--yesreally'],
      provider
    )

    expect((await releaseGoldWrapper.getRevocationInfo()).canExpire).toBeFalsy()

    await testLocallyWithNode(
      SetCanExpire,
      ['--contract', contractAddress, '--value', 'true', '--yesreally'],
      provider
    )

    expect((await releaseGoldWrapper.getRevocationInfo()).canExpire).toBeTruthy()
  })
})
