import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { testWithGanache } from '@celo/dev-utils/lib/ganache-test'
import Web3 from 'web3'
import { getGasOptions } from './helpers'

/**
 * These are "developer tests", meaning that they test implementation specific aspects, and might
 * break if the implementation changes. It's ok and expected for these tests to fail if the
 * implementation changes. Feel free to modify these tests in that case implementation.
 *
 * A failing "developer test" here might not mean that the user experience is broken.
 */
testWithGanache('Fetch whitelisted fee currencies', (web3: Web3) => {
  let kit: ContractKit
  let accounts: string[]

  beforeEach(async () => {
    accounts = await web3.eth.getAccounts()
    kit = newKitFromWeb3(web3)
  })

  describe('When whitelisted fee currencies are fetched on-chain', () => {
    test('Then the result includes addresses', async () => {
      const gasOptions = await getGasOptions(kit)
      for (let i = 0; i < gasOptions.length; i++) {
        expect(web3.utils.isAddress(gasOptions[i])).toBeTruthy()
      }
    })

    test('Then the resulting addresses are valid fee currencies', async () => {
      const contract = await kit.contracts.getGoldToken()
      const gasOptions = await getGasOptions(kit)
      const sender = accounts[0]
      const recipient = accounts[1]
      const amount = kit.web3.utils.toWei('0.01', 'ether')

      for (let i = 0; i < gasOptions.length; i++) {
        const recipientBalanceBefore = await kit.getTotalBalance(recipient)
        const transactionObject = contract.transfer(recipient, amount)

        await transactionObject.sendAndWaitForReceipt({
          from: sender,
          to: recipient,
          feeCurrency: web3.utils.toChecksumAddress(gasOptions[i]),
        })
        const recipientBalanceAfter = await kit.getTotalBalance(recipient)

        expect(recipientBalanceAfter.CELO!.toFixed()).toEqual(
          recipientBalanceBefore.CELO!.plus(amount).toFixed()
        )
      }
    })
  })
})
