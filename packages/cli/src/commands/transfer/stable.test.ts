import { COMPLIANT_ERROR_RESPONSE } from '@celo/compliance'
import { ContractKit, StableToken, newKitFromProvider } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import BigNumber from 'bignumber.js'
import { topUpWithToken } from '../../test-utils/chain-setup'
import { TEST_SANCTIONED_ADDRESS, testLocallyWithNode } from '../../test-utils/cliUtils'
import TransferStable from './stable'

process.env.NO_SYNCCHECK = 'true'

// Lots of commands, sometimes times out
jest.setTimeout(15000)

testWithAnvilL2('transfer:stable cmd', (client) => {
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
    kit = newKitFromProvider(client.currentProvider)
    accounts = await kit.connection.getAccounts()

    await topUpWithToken(
      kit,
      StableToken.USDm,
      accounts[0],
      new BigNumber('9000000000000000000000')
    )
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('can transfer stables', async () => {
    const sender = accounts[0]
    const reciever = accounts[1]
    const receiverBalanceBefore = await kit.getTotalBalance(accounts[1])
    const amountToTransfer = '5000000000000000000'

    // Send cusd as erc20
    await testLocallyWithNode(
      TransferStable,
      [
        '--from',
        sender,
        '--to',
        reciever,
        '--value',
        amountToTransfer,
        '--stableToken',
        StableToken.USDm,
      ],
      client
    )
    // Send cusd as erc20
    const receiverBalance = await kit.getTotalBalance(reciever)
    expect(receiverBalance.USDm!.toFixed()).toEqual(
      receiverBalanceBefore.USDm!.plus(amountToTransfer).toFixed()
    )
    // Attempt to send erc20, back
    await testLocallyWithNode(
      TransferStable,
      [
        '--from',
        reciever,
        '--to',
        sender,
        '--value',
        '2000000000000000000',
        '--stableToken',
        StableToken.USDm,
      ],
      client
    )
  })

  test('should fail if to address is sanctioned', async () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {
      // noop
    })

    await expect(
      testLocallyWithNode(
        TransferStable,
        [
          '--from',
          accounts[0],
          '--to',
          TEST_SANCTIONED_ADDRESS,
          '--value',
          '1',
          '--stableToken',
          StableToken.USDm,
        ],
        client
      )
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"Some checks didn't pass!"`)
    expect(spy).toHaveBeenCalledWith(expect.stringContaining(COMPLIANT_ERROR_RESPONSE))
  })

  test('should fail if using with --useAKV', async () => {
    await expect(
      testLocallyWithNode(
        TransferStable,
        [
          '--from',
          accounts[0],
          '--to',
          accounts[1],
          '--value',
          '1',
          '--stableToken',
          StableToken.EURm,
          '--useAKV',
        ],

        client
      )
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"--useAKV flag is no longer supported"`)
  })
})
