import { COMPLIANT_ERROR_RESPONSE, SANCTIONED_ADDRESSES } from '@celo/compliance'
import { ContractKit, StableToken, newKitFromWeb3 } from '@celo/contractkit'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import TransferCUSD from './dollars'
import { testWithAnvil } from '@celo/dev-utils/lib/anvil-test'
import { topUpWithToken } from '../../test-utils/chain-setup'
import BigNumber from 'bignumber.js'

process.env.NO_SYNCCHECK = 'true'

// Lots of commands, sometimes times out
jest.setTimeout(15000)

testWithAnvil('transfer:dollars cmd', (web3: Web3) => {
  let accounts: string[] = []
  let kit: ContractKit

  beforeEach(async () => {
    kit = newKitFromWeb3(web3)
    accounts = await web3.eth.getAccounts()
  })

  test('can transfer cusd', async () => {
    await topUpWithToken(
      kit,
      StableToken.cUSD,
      accounts[0],
      new BigNumber('1000000000000000000000')
    )
    await topUpWithToken(
      kit,
      StableToken.cUSD,
      accounts[1],
      new BigNumber('1000000000000000000000')
    )

    const balanceBefore = await kit.getTotalBalance(accounts[0])
    const receiverBalanceBefore = await kit.getTotalBalance(accounts[1])
    const amountToTransfer = '500000000000000000000'
    // Send cUSD to RG contract
    await testLocallyWithWeb3Node(
      TransferCUSD,
      ['--from', accounts[0], '--to', accounts[1], '--value', amountToTransfer],
      web3
    )
    // RG cUSD balance should match the amount sent
    const receiverBalance = await kit.getTotalBalance(accounts[1])
    expect(receiverBalance.cUSD!.toFixed()).toEqual(
      receiverBalanceBefore.cUSD!.plus(amountToTransfer).toFixed()
    )
    // Attempt to send cUSD back
    await testLocallyWithWeb3Node(
      TransferCUSD,
      ['--from', accounts[1], '--to', accounts[0], '--value', amountToTransfer],
      web3
    )
    const balanceAfter = await kit.getTotalBalance(accounts[0])
    expect(balanceBefore.cUSD).toEqual(balanceAfter.cUSD)
  })

  test('should fail if to address is sanctioned', async () => {
    const spy = jest.spyOn(console, 'log')
    await expect(
      testLocallyWithWeb3Node(
        TransferCUSD,
        ['--from', accounts[1], '--to', SANCTIONED_ADDRESSES[0], '--value', '1'],
        web3
      )
    ).rejects.toThrow()
    expect(spy).toHaveBeenCalledWith(expect.stringContaining(COMPLIANT_ERROR_RESPONSE))
  })
})
