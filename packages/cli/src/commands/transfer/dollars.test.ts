import {
  COMPLIANT_ERROR_RESPONSE,
  OFAC_SANCTIONS_LIST_URL,
  SANCTIONED_ADDRESSES,
} from '@celo/compliance'
import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { testWithGanache } from '@celo/dev-utils/lib/ganache-test'
import Web3 from 'web3'
import { testLocally } from '../../test-utils/cliUtils'
import TransferCUSD from './dollars'

process.env.NO_SYNCCHECK = 'true'

// Lots of commands, sometimes times out
jest.setTimeout(15000)

testWithGanache('transfer:dollars cmd', (web3: Web3) => {
  let accounts: string[] = []
  let kit: ContractKit

  beforeEach(async () => {
    kit = newKitFromWeb3(web3)
    accounts = await web3.eth.getAccounts()
    fetchMock.get(OFAC_SANCTIONS_LIST_URL, SANCTIONED_ADDRESSES)
  })
  afterEach(() => fetchMock.reset())

  test('can transfer cusd', async () => {
    const balanceBefore = await kit.getTotalBalance(accounts[0])
    const receiverBalanceBefore = await kit.getTotalBalance(accounts[1])
    const amountToTransfer = '500000000000000000000'
    // Send cUSD to RG contract
    await testLocally(TransferCUSD, [
      '--from',
      accounts[0],
      '--to',
      accounts[1],
      '--value',
      amountToTransfer,
    ])
    // RG cUSD balance should match the amount sent
    const receiverBalance = await kit.getTotalBalance(accounts[1])
    expect(receiverBalance.cUSD!.toFixed()).toEqual(
      receiverBalanceBefore.cUSD!.plus(amountToTransfer).toFixed()
    )
    // Attempt to send cUSD back
    await testLocally(TransferCUSD, [
      '--from',
      accounts[1],
      '--to',
      accounts[0],
      '--value',
      amountToTransfer,
    ])
    const balanceAfter = await kit.getTotalBalance(accounts[0])
    expect(balanceBefore.cUSD).toEqual(balanceAfter.cUSD)
  })

  test('should fail if to address is sanctioned', async () => {
    const spy = jest.spyOn(console, 'log')
    await expect(
      testLocally(TransferCUSD, [
        '--from',
        accounts[1],
        '--to',
        SANCTIONED_ADDRESSES[0],
        '--value',
        '1',
      ])
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"Some checks didn't pass!"`)
    expect(spy).toHaveBeenCalledWith(expect.stringContaining(COMPLIANT_ERROR_RESPONSE))
  })
})
