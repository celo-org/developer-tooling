import { COMPLIANT_ERROR_RESPONSE, SANCTIONED_ADDRESSES } from '@celo/compliance'
import { ContractKit, StableToken, newKitFromWeb3 } from '@celo/contractkit'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import TransferEURO from './euros'
import { testWithAnvil } from '@celo/dev-utils/lib/anvil-test'
import { topUpWithToken } from '../../test-utils/chain-setup'
import BigNumber from 'bignumber.js'

process.env.NO_SYNCCHECK = 'true'

// Lots of commands, sometimes times out
jest.setTimeout(15000)

testWithAnvil('transfer:euros cmd', (web3: Web3) => {
  let accounts: string[] = []
  let kit: ContractKit

  beforeEach(async () => {
    kit = newKitFromWeb3(web3)
    accounts = await web3.eth.getAccounts()
  })

  test('can transfer ceur', async () => {
    await topUpWithToken(
      kit,
      StableToken.cEUR,
      accounts[0],
      new BigNumber('1000000000000000000000')
    )
    await topUpWithToken(
      kit,
      StableToken.cEUR,
      accounts[1],
      new BigNumber('1000000000000000000000')
    )

    const balanceBefore = await kit.getTotalBalance(accounts[0])
    const receiverBalanceBefore = await kit.getTotalBalance(accounts[1])
    const amountToTransfer = '500000000000000000000'
    // Send cEUR to RG contract
    await testLocallyWithWeb3Node(
      TransferEURO,
      ['--from', accounts[0], '--to', accounts[1], '--value', amountToTransfer],
      web3
    )
    // RG cEUR balance should match the amount sent
    const receiverBalance = await kit.getTotalBalance(accounts[1])
    expect(receiverBalance.cEUR!.toFixed()).toEqual(
      receiverBalanceBefore.cEUR!.plus(amountToTransfer).toFixed()
    )
    // Attempt to send cEUR back
    await testLocallyWithWeb3Node(
      TransferEURO,
      ['--from', accounts[1], '--to', accounts[0], '--value', amountToTransfer],
      web3
    )
    const balanceAfter = await kit.getTotalBalance(accounts[0])
    expect(balanceBefore.cEUR).toEqual(balanceAfter.cEUR)
  })

  test('should fail if to address is sanctioned', async () => {
    const spy = jest.spyOn(console, 'log')
    await expect(
      testLocallyWithWeb3Node(
        TransferEURO,
        ['--from', accounts[1], '--to', SANCTIONED_ADDRESSES[0], '--value', '1'],
        web3
      )
    ).rejects.toThrow()
    expect(spy).toHaveBeenCalledWith(expect.stringContaining(COMPLIANT_ERROR_RESPONSE))
  })
})
