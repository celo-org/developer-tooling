import { releaseGoldABI } from '@celo/abis'
import { StableToken, StrongAddress } from '@celo/base'
import { ContractKit, newKitFromProvider } from '@celo/contractkit'
import { ReleaseGoldWrapper } from '@celo/contractkit/lib/wrappers/ReleaseGold'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { getContractFromEvent, timeTravel } from '@celo/dev-utils/ganache-test'
import { DAY, MONTH } from '@celo/dev-utils/test-utils'
import BigNumber from 'bignumber.js'
import { topUpWithToken } from '../../test-utils/chain-setup'
import { stripAnsiCodesFromNestedArray, testLocallyWithNode } from '../../test-utils/cliUtils'
import { createMultisig } from '../../test-utils/multisigUtils'
import { deployReleaseGoldContract } from '../../test-utils/release-gold'
import CreateAccount from './create-account'
import SetLiquidityProvision from './set-liquidity-provision'
import SetMaxDistribution from './set-max-distribution'
import RGTransferDollars from './transfer-dollars'
import Withdraw from './withdraw'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('releasegold:withdraw cmd', (provider) => {
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
    await testLocallyWithNode(CreateAccount, ['--contract', contractAddress], provider)
    // make the whole balance available for withdrawal
    await testLocallyWithNode(
      SetMaxDistribution,
      ['--contract', contractAddress, '--yesreally', '--distributionRatio', '1000'],
      provider
    )
  })

  test('can withdraw released celo to beneficiary', async () => {
    await testLocallyWithNode(
      SetLiquidityProvision,
      ['--contract', contractAddress, '--yesreally'],
      provider
    )
    // Based on the release schedule, 3 months needs to pass
    await timeTravel(MONTH * 3 + DAY, provider)
    const withdrawalAmount = '10000000000000000000'
    const releaseGoldWrapper = new ReleaseGoldWrapper(
      kit.connection,
      kit.connection.createContract(releaseGoldABI as any, contractAddress),
      kit.contracts
    )
    const beneficiary = await releaseGoldWrapper.getBeneficiary()

    expect((await releaseGoldWrapper.getTotalWithdrawn()).toFixed()).toEqual('0')

    const balanceBefore = (await kit.getTotalBalance(beneficiary)).CELO!
    await testLocallyWithNode(
      Withdraw,
      ['--contract', contractAddress, '--value', withdrawalAmount],
      provider
    )

    const balanceAfter = (await kit.getTotalBalance(beneficiary)).CELO!

    const latestTransactionReceipt = await kit.connection.getTransactionReceipt(
      (await kit.connection.getBlock('latest', false)).transactions[0] as string
    )

    // Safety check if the latest transaction was originated by the beneficiary
    expect(latestTransactionReceipt!.from.toLowerCase()).toEqual(beneficiary.toLowerCase())

    const difference = new BigNumber(balanceAfter)
      .minus(balanceBefore)
      .plus(latestTransactionReceipt!.effectiveGasPrice! * latestTransactionReceipt!.gasUsed)

    expect(difference.toFixed()).toEqual(withdrawalAmount)
    expect((await releaseGoldWrapper.getTotalWithdrawn()).toFixed()).toEqual(withdrawalAmount)
  })

  test.skip("can't withdraw the whole balance if there is a USDm balance", async () => {
    const spy = jest.spyOn(console, 'log')
    await testLocallyWithNode(
      SetLiquidityProvision,
      ['--contract', contractAddress, '--yesreally'],
      provider
    )
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('The liquidity provision has not already been set')
    )
    await timeTravel(MONTH * 12 + DAY, provider)
    const releaseGoldWrapper = new ReleaseGoldWrapper(
      kit.connection,
      kit.connection.createContract(releaseGoldABI as any, contractAddress),
      kit.contracts
    )
    const beneficiary = await releaseGoldWrapper.getBeneficiary()
    const balanceBefore = await kit.getTotalBalance(beneficiary)
    const remainingBalance = await releaseGoldWrapper.getRemainingUnlockedBalance()

    const stableToken = await kit.contracts.getStableToken()
    const USDmAmount = 100

    await topUpWithToken(kit, StableToken.USDm, beneficiary, new BigNumber(USDmAmount))
    await stableToken
      .transfer(contractAddress, USDmAmount)
      .sendAndWaitForReceipt({ from: beneficiary })

    spy.mockClear()
    // Can't withdraw since there is USDm balance still
    await expect(
      testLocallyWithNode(
        Withdraw,
        ['--contract', contractAddress, '--value', remainingBalance.toString()],
        provider
      )
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"Some checks didn't pass!"`)

    expect(stripAnsiCodesFromNestedArray(spy.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "Running Checks:",
        ],
        [
          "   ✔  Value does not exceed available unlocked celo ",
        ],
        [
          "   ✔  Value would not exceed maximum distribution ",
        ],
        [
          "   ✔  Contract has met liquidity provision if applicable ",
        ],
        [
          "   ✘  No USDm would be left stranded when withdrawing the entire CELO balance ",
        ],
        [
          "   ✔  Compliant Address ",
        ],
      ]
    `)
    spy.mockClear()
    // Move out the USDm balance
    await expect(
      testLocallyWithNode(
        RGTransferDollars,
        ['--contract', contractAddress, '--to', beneficiary, '--value', '100'],
        provider
      )
    ).resolves.toBeUndefined()
    spy.mockClear()

    const totalWithdrawn = await releaseGoldWrapper.getTotalWithdrawn()
    expect(totalWithdrawn.toFixed()).toMatchInlineSnapshot(`"0"`)
    await timeTravel(DAY * 31, provider)
    await expect(
      testLocallyWithNode(
        Withdraw,
        ['--contract', contractAddress, '--value', remainingBalance.toString()],
        provider
      )
    ).resolves.toBeUndefined()
    expect(stripAnsiCodesFromNestedArray(spy.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "Running Checks:",
        ],
        [
          "   ✔  Value does not exceed available unlocked celo ",
        ],
        [
          "   ✔  Value would not exceed maximum distribution ",
        ],
        [
          "   ✔  Contract has met liquidity provision if applicable ",
        ],
        [
          "   ✔  No USDm would be left stranded when withdrawing the entire CELO balance ",
        ],
        [
          "   ✔  Compliant Address ",
        ],
        [
          "All checks passed",
        ],
        [
          "SendTransaction: withdrawTx",
        ],
        [
          "txHash: 0xtxhash",
        ],
      ]
    `)

    const balanceAfter = await kit.getTotalBalance(beneficiary)
    expect(balanceBefore.CELO!.toNumber()).toBeLessThan(balanceAfter.CELO!.toNumber())

    const destroyedContractAddress = await getContractFromEvent(
      'ReleaseGoldInstanceDestroyed(address,address)',
      provider
    )

    expect(destroyedContractAddress).toBe(contractAddress)
  })
})
