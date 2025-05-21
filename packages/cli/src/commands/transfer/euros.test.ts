import { COMPLIANT_ERROR_RESPONSE } from '@celo/compliance'
import { ContractKit, StableToken, newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { topUpWithToken } from '../../test-utils/chain-setup'
import { TEST_SANCTIONED_ADDRESS, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import TransferEURO from './euros'

process.env.NO_SYNCCHECK = 'true'

// Lots of commands, sometimes times out
jest.setTimeout(15000)

testWithAnvilL2('transfer:euros cmd', (web3: Web3) => {
  let accounts: string[] = []
  let kit: ContractKit

  beforeEach(async () => {
    kit = newKitFromWeb3(web3)
    accounts = await web3.eth.getAccounts()
    jest.spyOn(console, 'log').mockImplementation(() => {})
    jest.spyOn(console, 'error').mockImplementation(() => {})

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
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('can transfer ceur', async () => {
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
        ['--from', accounts[1], '--to', TEST_SANCTIONED_ADDRESS, '--value', '1'],
        web3
      )
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"Some checks didn't pass!"`)
    expect(spy).toHaveBeenCalledWith(expect.stringContaining(COMPLIANT_ERROR_RESPONSE))
  })
})
