import { COMPLIANT_ERROR_RESPONSE } from '@celo/compliance'
import { ContractKit, StableToken, newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { topUpWithToken } from '../../test-utils/chain-setup'
import { TEST_SANCTIONED_ADDRESS, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import TransferStable from './stable'

process.env.NO_SYNCCHECK = 'true'

// Lots of commands, sometimes times out
jest.setTimeout(15000)

testWithAnvilL2('transfer:stable cmd', (web3: Web3) => {
  let accounts: string[] = []
  let kit: ContractKit

  beforeEach(async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  beforeEach(async () => {
    kit = newKitFromWeb3(web3)
    accounts = await web3.eth.getAccounts()

    await topUpWithToken(
      kit,
      StableToken.cUSD,
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
    await testLocallyWithWeb3Node(
      TransferStable,
      [
        '--from',
        sender,
        '--to',
        reciever,
        '--value',
        amountToTransfer,
        '--stableToken',
        StableToken.cUSD,
      ],
      web3
    )
    // Send cusd as erc20
    const receiverBalance = await kit.getTotalBalance(reciever)
    expect(receiverBalance.cUSD!.toFixed()).toEqual(
      receiverBalanceBefore.cUSD!.plus(amountToTransfer).toFixed()
    )
    // Attempt to send erc20, back
    await testLocallyWithWeb3Node(
      TransferStable,
      [
        '--from',
        reciever,
        '--to',
        sender,
        '--value',
        '2000000000000000000',
        '--stableToken',
        StableToken.cUSD,
      ],
      web3
    )
  })

  test('should fail if to address is sanctioned', async () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    await expect(
      testLocallyWithWeb3Node(
        TransferStable,
        [
          '--from',
          accounts[0],
          '--to',
          TEST_SANCTIONED_ADDRESS,
          '--value',
          '1',
          '--stableToken',
          StableToken.cUSD,
        ],
        web3
      )
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"Some checks didn't pass!"`)
    expect(spy).toHaveBeenCalledWith(expect.stringContaining(COMPLIANT_ERROR_RESPONSE))
  })

  test('should fail if using with --useAKV', async () => {
    await expect(
      testLocallyWithWeb3Node(
        TransferStable,
        [
          '--from',
          accounts[0],
          '--to',
          accounts[1],
          '--value',
          '1',
          '--stableToken',
          StableToken.cEUR,
          '--useAKV',
        ],

        web3
      )
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"--useAKV flag is no longer supported"`)
  })
})
