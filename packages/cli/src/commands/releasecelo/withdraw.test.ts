import { newReleaseGold } from '@celo/abis/web3/ReleaseGold'
import { StableToken, StrongAddress } from '@celo/base'
import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { ReleaseGoldWrapper } from '@celo/contractkit/lib/wrappers/ReleaseGold'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { getContractFromEvent, timeTravel } from '@celo/dev-utils/ganache-test'
import { DAY, MONTH } from '@celo/dev-utils/test-utils'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { topUpWithToken } from '../../test-utils/chain-setup'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import { createMultisig } from '../../test-utils/multisigUtils'
import { deployReleaseGoldContract } from '../../test-utils/release-gold'
import CreateAccount from './create-account'
import SetLiquidityProvision from './set-liquidity-provision'
import SetMaxDistribution from './set-max-distribution'
import RGTransferDollars from './transfer-dollars'
import Withdraw from './withdraw'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('releasegold:withdraw cmd', (web3: Web3) => {
  let contractAddress: string
  let kit: ContractKit

  beforeEach(async () => {
    const accounts = (await web3.eth.getAccounts()) as StrongAddress[]
    kit = newKitFromWeb3(web3)

    contractAddress = await deployReleaseGoldContract(
      web3,
      await createMultisig(kit, [accounts[0], accounts[1]] as StrongAddress[], 2, 2),
      accounts[1],
      accounts[0],
      accounts[2]
    )
    await testLocallyWithWeb3Node(CreateAccount, ['--contract', contractAddress], web3)
    // make the whole balance available for withdrawal
    await testLocallyWithWeb3Node(
      SetMaxDistribution,
      ['--contract', contractAddress, '--yesreally', '--distributionRatio', '1000'],
      web3
    )
  })

  test('can withdraw released celo to beneficiary', async () => {
    await testLocallyWithWeb3Node(
      SetLiquidityProvision,
      ['--contract', contractAddress, '--yesreally'],
      web3
    )
    // Based on the release schedule, 3 months needs to pass
    await timeTravel(MONTH * 3 + DAY, web3)
    const withdrawalAmount = '10000000000000000000'
    const releaseGoldWrapper = new ReleaseGoldWrapper(
      kit.connection,
      newReleaseGold(web3, contractAddress),
      kit.contracts
    )
    const beneficiary = await releaseGoldWrapper.getBeneficiary()

    expect((await releaseGoldWrapper.getTotalWithdrawn()).toFixed()).toEqual('0')

    const balanceBefore = (await kit.getTotalBalance(beneficiary)).CELO!
    await testLocallyWithWeb3Node(
      Withdraw,
      ['--contract', contractAddress, '--value', withdrawalAmount],
      web3
    )

    const balanceAfter = (await kit.getTotalBalance(beneficiary)).CELO!

    const latestTransactionReceipt = await web3.eth.getTransactionReceipt(
      (await web3.eth.getBlock('latest')).transactions[0]
    )

    // Safety check if the latest transaction was originated by the beneficiary
    expect(latestTransactionReceipt.from.toLowerCase()).toEqual(beneficiary.toLowerCase())

    const difference = new BigNumber(balanceAfter)
      .minus(balanceBefore)
      .plus(latestTransactionReceipt.effectiveGasPrice * latestTransactionReceipt.gasUsed)

    expect(difference.toFixed()).toEqual(withdrawalAmount)
    expect((await releaseGoldWrapper.getTotalWithdrawn()).toFixed()).toEqual(withdrawalAmount)
  })

  test.skip("can't withdraw the whole balance if there is a cUSD balance", async () => {
    const spy = jest.spyOn(console, 'log')
    await testLocallyWithWeb3Node(
      SetLiquidityProvision,
      ['--contract', contractAddress, '--yesreally'],
      web3
    )
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('The liquidity provision has not already been set')
    )
    await timeTravel(MONTH * 12 + DAY, web3)
    const releaseGoldWrapper = new ReleaseGoldWrapper(
      kit.connection,
      newReleaseGold(web3, contractAddress),
      kit.contracts
    )
    const beneficiary = await releaseGoldWrapper.getBeneficiary()
    const balanceBefore = await kit.getTotalBalance(beneficiary)
    const remainingBalance = await releaseGoldWrapper.getRemainingUnlockedBalance()

    const stableToken = await kit.contracts.getStableToken()
    const cUSDAmount = 100

    await topUpWithToken(kit, StableToken.cUSD, beneficiary, new BigNumber(cUSDAmount))
    await stableToken
      .transfer(contractAddress, cUSDAmount)
      .sendAndWaitForReceipt({ from: beneficiary })

    spy.mockClear()
    // Can't withdraw since there is cUSD balance still
    await expect(
      testLocallyWithWeb3Node(
        Withdraw,
        ['--contract', contractAddress, '--value', remainingBalance.toString()],
        web3
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
          "   ✘  No cUSD would be left stranded when withdrawing the entire CELO balance ",
        ],
        [
          "   ✔  Compliant Address ",
        ],
      ]
    `)
    spy.mockClear()
    // Move out the cUSD balance
    await expect(
      testLocallyWithWeb3Node(
        RGTransferDollars,
        ['--contract', contractAddress, '--to', beneficiary, '--value', '100'],
        web3
      )
    ).resolves.toBeUndefined()
    spy.mockClear()

    const totalWithdrawn = await releaseGoldWrapper.getTotalWithdrawn()
    expect(totalWithdrawn.toFixed()).toMatchInlineSnapshot(`"0"`)
    await timeTravel(DAY * 31, web3)
    await expect(
      testLocallyWithWeb3Node(
        Withdraw,
        ['--contract', contractAddress, '--value', remainingBalance.toString()],
        web3
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
          "   ✔  No cUSD would be left stranded when withdrawing the entire CELO balance ",
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
      web3
    )

    expect(destroyedContractAddress).toBe(contractAddress)
  })
})
