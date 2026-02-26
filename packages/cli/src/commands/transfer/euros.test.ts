import { COMPLIANT_ERROR_RESPONSE } from '@celo/compliance'
import { ContractKit, newKitFromProvider, StableToken } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import BigNumber from 'bignumber.js'
import { topUpWithToken } from '../../test-utils/chain-setup'
import { TEST_SANCTIONED_ADDRESS, testLocallyWithNode } from '../../test-utils/cliUtils'
import TransferEURO from './euros'

process.env.NO_SYNCCHECK = 'true'

// Lots of commands, sometimes times out
jest.setTimeout(15000)

testWithAnvilL2('transfer:euros cmd', (providerOwner) => {
  let accounts: string[] = []
  let kit: ContractKit

  beforeEach(async () => {
    kit = newKitFromProvider(providerOwner.currentProvider)
    accounts = await kit.connection.getAccounts()
    jest.spyOn(console, 'log').mockImplementation(() => {
      // noop
    })
    jest.spyOn(console, 'error').mockImplementation(() => {
      // noop
    })

    await topUpWithToken(
      kit,
      StableToken.EURm,
      accounts[0],
      new BigNumber('1000000000000000000000')
    )
    await topUpWithToken(
      kit,
      StableToken.EURm,
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
    // Send EURm to RG contract
    await testLocallyWithNode(
      TransferEURO,
      ['--from', accounts[0], '--to', accounts[1], '--value', amountToTransfer],
      providerOwner
    )
    // RG EURm balance should match the amount sent
    const receiverBalance = await kit.getTotalBalance(accounts[1])
    expect(receiverBalance.EURm!.toFixed()).toEqual(
      receiverBalanceBefore.EURm!.plus(amountToTransfer).toFixed()
    )
    // Attempt to send EURm back
    await testLocallyWithNode(
      TransferEURO,
      ['--from', accounts[1], '--to', accounts[0], '--value', amountToTransfer],
      providerOwner
    )
    const balanceAfter = await kit.getTotalBalance(accounts[0])
    expect(balanceBefore.EURm).toEqual(balanceAfter.EURm)
  })

  test('should fail if to address is sanctioned', async () => {
    const spy = jest.spyOn(console, 'log')
    await expect(
      testLocallyWithNode(
        TransferEURO,
        ['--from', accounts[1], '--to', TEST_SANCTIONED_ADDRESS, '--value', '1'],
        providerOwner
      )
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"Some checks didn't pass!"`)
    expect(spy).toHaveBeenCalledWith(expect.stringContaining(COMPLIANT_ERROR_RESPONSE))
  })
})
