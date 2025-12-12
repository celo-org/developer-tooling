import { COMPLIANT_ERROR_RESPONSE } from '@celo/compliance'
import { ContractKit, StableToken, newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { topUpWithToken } from '../../test-utils/chain-setup'
import { TEST_SANCTIONED_ADDRESS, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import TransferReals from './reals'

process.env.NO_SYNCCHECK = 'true'

// Lots of commands, sometimes times out
jest.setTimeout(15000)

testWithAnvilL2('transfer:reals cmd', (web3: Web3) => {
  let accounts: string[] = []
  let kit: ContractKit

  beforeEach(async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {
      // noop
    })
    jest.spyOn(console, 'error').mockImplementation(() => {
      // noop
    })
  })

  beforeEach(async () => {
    kit = newKitFromWeb3(web3)
    accounts = await web3.eth.getAccounts()

    await topUpWithToken(
      kit,
      StableToken.BRLm,
      accounts[0],
      new BigNumber('9000000000000000000000')
    )
    await topUpWithToken(
      kit,
      StableToken.BRLm,
      accounts[1],
      new BigNumber('9000000000000000000000')
    )
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('can transfer ceur', async () => {
    const balanceBefore = await kit.getTotalBalance(accounts[0])
    const receiverBalanceBefore = await kit.getTotalBalance(accounts[1])
    const amountToTransfer = '500000000000000000000'
    // Send BRLm, to RG contract
    await testLocallyWithWeb3Node(
      TransferReals,
      ['--from', accounts[0], '--to', accounts[1], '--value', amountToTransfer],
      web3
    )
    // RG BRLm, balance should match the amount sent
    const receiverBalance = await kit.getTotalBalance(accounts[1])
    expect(receiverBalance.BRLm!.toFixed()).toEqual(
      receiverBalanceBefore.BRLm!.plus(amountToTransfer).toFixed()
    )
    // Attempt to send BRLm, back
    await testLocallyWithWeb3Node(
      TransferReals,
      ['--from', accounts[1], '--to', accounts[0], '--value', amountToTransfer],
      web3
    )
    const balanceAfter = await kit.getTotalBalance(accounts[0])
    expect(balanceBefore.BRLm).toEqual(balanceAfter.BRLm)
  })

  test('should fail if to address is sanctioned', async () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {
      // noop
    })

    await expect(
      testLocallyWithWeb3Node(
        TransferReals,
        ['--from', accounts[1], '--to', TEST_SANCTIONED_ADDRESS, '--value', '1'],
        web3
      )
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"Some checks didn't pass!"`)
    expect(spy).toHaveBeenCalledWith(expect.stringContaining(COMPLIANT_ERROR_RESPONSE))
  })
})
