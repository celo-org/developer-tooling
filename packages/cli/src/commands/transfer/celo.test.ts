import { COMPLIANT_ERROR_RESPONSE, SANCTIONED_ADDRESSES } from '@celo/compliance'
import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { testWithGanache } from '@celo/dev-utils/lib/ganache-test'
import Web3 from 'web3'
import { testLocally } from '../../test-utils/cliUtils'
import TransferCelo from './celo'

process.env.NO_SYNCCHECK = 'true'

// Lots of commands, sometimes times out
jest.setTimeout(15000)

testWithGanache('transfer:celo cmd', (web3: Web3) => {
  let accounts: string[] = []
  let kit: ContractKit

  beforeEach(async () => {
    kit = newKitFromWeb3(web3)
    accounts = await web3.eth.getAccounts()
  })

  test('can transfer celo', async () => {
    const balanceBefore = await kit.getTotalBalance(accounts[0])
    const receiverBalanceBefore = await kit.getTotalBalance(accounts[1])
    const amountToTransfer = '500000000000000000000'
    // Send cUSD to RG contract
    await testLocally(TransferCelo, [
      '--from',
      accounts[0],
      '--to',
      accounts[1],
      '--value',
      amountToTransfer,
      '--gasCurrency',
      'cusd', // TODO(Arthur): Update this test to accept fee currency addresses
    ])
    // RG cUSD balance should match the amount sent
    const receiverBalance = await kit.getTotalBalance(accounts[1])
    expect(receiverBalance.CELO!.toFixed()).toEqual(
      receiverBalanceBefore.CELO!.plus(amountToTransfer).toFixed()
    )
    // Attempt to send cUSD back
    await testLocally(TransferCelo, [
      '--from',
      accounts[1],
      '--to',
      accounts[0],
      '--value',
      amountToTransfer,
      '--gasCurrency',
      'cusd', // TODO(Arthur): Update this test to accept fee currency addresses
    ])
    const balanceAfter = await kit.getTotalBalance(accounts[0])
    expect(balanceBefore.CELO).toEqual(balanceAfter.CELO)
  })

  test('should fail if to address is sanctioned', async () => {
    const spy = jest.spyOn(console, 'log')
    await expect(
      testLocally(TransferCelo, [
        '--from',
        accounts[1],
        '--to',
        SANCTIONED_ADDRESSES[0],
        '--value',
        '1',
      ])
    ).rejects.toThrow()
    expect(spy).toHaveBeenCalledWith(expect.stringContaining(COMPLIANT_ERROR_RESPONSE))
  })
  test('should fail if from address is sanctioned', async () => {
    const spy = jest.spyOn(console, 'log')
    await expect(
      testLocally(TransferCelo, [
        '--from',
        SANCTIONED_ADDRESSES[0],
        '--to',
        accounts[0],
        '--value',
        '1',
      ])
    ).rejects.toThrow()
    expect(spy).toHaveBeenCalledWith(expect.stringContaining(COMPLIANT_ERROR_RESPONSE))
  })
})
