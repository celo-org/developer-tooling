import { releaseGoldABI } from '@celo/abis'
import { StrongAddress } from '@celo/base'
import { ContractKit, newKitFromProvider } from '@celo/contractkit'
import { ReleaseGoldWrapper } from '@celo/contractkit/lib/wrappers/ReleaseGold'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { stripAnsiCodesAndTxHashes, testLocallyWithNode } from '../../test-utils/cliUtils'
import { createMultisig } from '../../test-utils/multisigUtils'
import { deployReleaseGoldContract } from '../../test-utils/release-gold'
import SetMaxDistribution from './set-max-distribution'
import { parseEther } from 'viem'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('releasegold:set-max-distribution cmd', (provider) => {
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

  it('sets max distribution', async () => {
    const releaseGoldWrapper = new ReleaseGoldWrapper(
      kit.connection,
      kit.connection.getCeloContract(releaseGoldABI as any, contractAddress),
      kit.contracts
    )

    // This basically halves the total balance which is 40 CELO initially
    await testLocallyWithNode(
      SetMaxDistribution,
      ['--contract', contractAddress, '--distributionRatio', '500', '--yesreally'],
      provider
    )

    expect((await releaseGoldWrapper.getMaxDistribution()).toFixed()).toEqual(
      parseEther('20').toString()
    )
  })

  it('fails if max distribution out of range', async () => {
    const logMock = jest.spyOn(console, 'log')

    await expect(
      testLocallyWithNode(
        SetMaxDistribution,
        ['--contract', contractAddress, '--distributionRatio', '1500', '--yesreally'],
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
          "   ✘  Distribution ratio must be within [0, 1000] ",
        ],
      ]
    `)
  })
})
