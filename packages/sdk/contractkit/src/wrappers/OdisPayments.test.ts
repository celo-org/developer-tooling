import { StableToken, StrongAddress } from '@celo/base'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import BigNumber from 'bignumber.js'
import { newKitFromProvider } from '../kit'
import { topUpWithToken } from '../test-utils/utils'
import { OdisPaymentsWrapper } from './OdisPayments'
import { StableTokenWrapper } from './StableTokenWrapper'

testWithAnvilL2('OdisPayments Wrapper', (provider) => {
  const kit = newKitFromProvider(provider)
  let accounts: StrongAddress[] = []
  let odisPayments: OdisPaymentsWrapper
  let stableToken: StableTokenWrapper

  beforeAll(async () => {
    accounts = await kit.connection.getAccounts()
    kit.defaultAccount = accounts[0]
    odisPayments = await kit.contracts.getOdisPayments()
    stableToken = await kit.contracts.getStableToken(StableToken.USDm)

    await topUpWithToken(kit, StableToken.USDm, accounts[0], new BigNumber(10000))
  })

  describe('#payInCUSD', () => {
    const testValue = 10000

    const payAndCheckState = async (sender: string, receiver: string, transferValue: number) => {
      // Approve USDm that OdisPayments contract may transfer from sender
      const approveHash = await stableToken.approve(odisPayments.address, transferValue, {
        from: sender,
      })
      await kit.connection.viemClient.waitForTransactionReceipt({ hash: approveHash })

      const senderBalanceBefore = await stableToken.balanceOf(sender)
      const payHash = await odisPayments.payInCUSD(receiver, transferValue, { from: sender })
      await kit.connection.viemClient.waitForTransactionReceipt({ hash: payHash })
      const balanceAfter = await stableToken.balanceOf(sender)
      expect(senderBalanceBefore.minus(balanceAfter)).toEqBigNumber(transferValue)
      expect(await stableToken.balanceOf(odisPayments.address)).toEqBigNumber(transferValue)
      expect(await odisPayments.totalPaidCUSD(receiver)).toEqBigNumber(transferValue)
    }

    it('should allow sender to make a payment on their behalf', async () => {
      await payAndCheckState(accounts[0], accounts[0], testValue)
    })

    it('should allow sender to make a payment for another account', async () => {
      await payAndCheckState(accounts[0], accounts[1], testValue)
    })

    it('should revert if transfer fails', async () => {
      const approveHash = await stableToken.approve(odisPayments.address, testValue)
      await kit.connection.viemClient.waitForTransactionReceipt({ hash: approveHash })
      expect.assertions(2)
      await expect(odisPayments.payInCUSD(accounts[0], testValue + 1)).rejects.toThrow()
      expect(await odisPayments.totalPaidCUSD(accounts[0])).toEqBigNumber(0)
    })
  })
})
