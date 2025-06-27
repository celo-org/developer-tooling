import { COMPLIANT_ERROR_RESPONSE } from '@celo/compliance'
import { ContractKit, newKitFromWeb3, StableToken } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { topUpWithToken } from '../../test-utils/chain-setup'
import { TEST_SANCTIONED_ADDRESS, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import TransferERC20 from './erc20'

process.env.NO_SYNCCHECK = 'true'

// Lots of commands, sometimes times out
jest.setTimeout(15000)

testWithAnvilL2('transfer:erc20 cmd', (web3: Web3) => {
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
      StableToken.cUSD,
      accounts[0],
      new BigNumber('9000000000000000000000')
    )
    await topUpWithToken(
      kit,
      StableToken.cREAL,
      accounts[1],
      new BigNumber('9000000000000000000000')
    )
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('can transfer erc20s', async () => {
    const sender = accounts[0]
    const reciever = accounts[1]
    const balanceBefore = await kit.getTotalBalance(sender)
    const receiverBalanceBefore = await kit.getTotalBalance(accounts[1])
    const amountToTransfer = '500000000000000000000'

    const cusdAddress = await kit.celoTokens.getAddress(StableToken.cUSD)
    // Send cusd as erc20
    await testLocallyWithWeb3Node(
      TransferERC20,
      [
        '--from',
        sender,
        '--to',
        reciever,
        '--value',
        amountToTransfer,
        '--erc20Address',
        cusdAddress,
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
      TransferERC20,
      [
        '--from',
        reciever,
        '--to',
        sender,
        '--value',
        amountToTransfer,
        '--erc20Address',
        cusdAddress,
      ],
      web3
    )
    const balanceAfter = await kit.getTotalBalance(sender)
    expect(balanceBefore.cUSD).toEqual(balanceAfter.cUSD)
  })

  test('should fail if to address is sanctioned', async () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {
      // noop
    })
    const cusdAddress = await kit.celoTokens.getAddress(StableToken.cUSD)

    await expect(
      testLocallyWithWeb3Node(
        TransferERC20,
        [
          '--from',
          accounts[0],
          '--to',
          TEST_SANCTIONED_ADDRESS,
          '--value',
          '1',
          '--erc20Address',
          cusdAddress,
        ],
        web3
      )
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"Some checks didn't pass!"`)
    expect(spy).toHaveBeenCalledWith(expect.stringContaining(COMPLIANT_ERROR_RESPONSE))
  })

  test("should fail if erc20 address isn't correct", async () => {
    await expect(
      testLocallyWithWeb3Node(
        TransferERC20,
        ['--from', accounts[0], '--to', accounts[1], '--value', '1', '--erc20Address', accounts[2]],
        web3
      )
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"Invalid erc20 address"`)
  })

  test('should fail if using with --useAKV', async () => {
    await expect(
      testLocallyWithWeb3Node(
        TransferERC20,
        [
          '--from',
          accounts[0],
          '--to',
          accounts[1],
          '--value',
          '1',
          '--erc20Address',
          accounts[2],
          '--useAKV',
        ],

        web3
      )
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"--useAKV flag is no longer supported"`)
  })
})
