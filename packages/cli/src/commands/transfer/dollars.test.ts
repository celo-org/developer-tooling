import { COMPLIANT_ERROR_RESPONSE } from '@celo/compliance'
import { ContractKit, newKitFromWeb3, StableToken } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { topUpWithToken } from '../../test-utils/chain-setup'
import {
  stripAnsiCodesFromNestedArray,
  TEST_SANCTIONED_ADDRESS,
  testLocallyWithWeb3Node,
} from '../../test-utils/cliUtils'
import { mockRpc } from '../../test-utils/mockRpc'
import TransferCUSD from './dollars'

process.env.NO_SYNCCHECK = 'true'

// Lots of commands, sometimes times out
jest.setTimeout(15000)

testWithAnvilL2('transfer:dollars cmd', (web3: Web3) => {
  let accounts: string[] = []
  let kit: ContractKit
  let logMock: jest.SpyInstance
  beforeEach(async () => {
    kit = newKitFromWeb3(web3)
    accounts = await web3.eth.getAccounts()
    logMock = jest.spyOn(console, 'log').mockImplementation(() => {})
    jest.spyOn(console, 'error').mockImplementation(() => {})
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
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('can transfer cusd', async () => {
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
  it('will transfer ALL the cusd an address has', async () => {
    const cusdWrapper = await kit.contracts.getStableToken(StableToken.cUSD)
    const balance = await cusdWrapper.balanceOf(accounts[0])
    expect(balance.toFixed()).toEqBigNumber('1000000000000000000000')
    await testLocallyWithWeb3Node(
      TransferCUSD,
      ['--from', accounts[0], '--to', accounts[1], '--value', balance.toFixed()],
      web3
    )
    const balanceAfter = await cusdWrapper.balanceOf(accounts[0])
    expect(balanceAfter.toFixed()).toEqBigNumber('0')
  })

  describe('when --gasCurrency', () => {
    beforeEach(() => {
      // need to call this send sending gasCurrency address to the gas price rpc is not supported on anvil.
      mockRpc()
    })
    describe('matches transfer currency', () => {
      it('checks that the sender has enough of the token to cover both transfer and pay for gas', async () => {
        const cusdWrapper = await kit.contracts.getStableToken(StableToken.cUSD)
        const cusdAddress = cusdWrapper.address
        const balance = await cusdWrapper.balanceOf(accounts[0])
        expect(balance.toFixed()).toEqBigNumber('1000000000000000000000')
        await expect(
          testLocallyWithWeb3Node(
            TransferCUSD,
            [
              '--from',
              accounts[0],
              '--to',
              accounts[1],
              '--value',
              balance.toFixed(),
              '--gasCurrency',
              cusdAddress,
            ],

            web3
          )
        ).rejects.toThrowErrorMatchingInlineSnapshot(`"Some checks didn't pass!"`)

        expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
          [
            [
              "Running Checks:",
            ],
            [
              "   ✔  Account has at least 1000 cUSD ",
            ],
            [
              "   ✔  Compliant Address ",
            ],
            [
              "   ✔  Compliant Address ",
            ],
            [
              "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 can sign txs ",
            ],
            [
              "   ✔  The provided feeCurrency is whitelisted ",
            ],
            [
              "   ✘  Account can afford to transfer cUSD with gas paid in 0x20FE3FD86C231fb8E28255452CEA7851f9C5f9c1 Cannot afford to transfer cUSD ; try reducing value slightly or using a different feeCurrency",
            ],
          ]
        `)
      })
    })
    describe('is different from transfer currency', () => {
      beforeEach(async () => {
        await topUpWithToken(
          kit,
          StableToken.cEUR,
          accounts[0],
          new BigNumber('1000000000000000000000')
        )
      })
      it('will transfer all the cusd an address has', async () => {
        const cusdWrapper = await kit.contracts.getStableToken(StableToken.cUSD)
        const euroWrapper = await kit.contracts.getStableToken(StableToken.cEUR)
        const balance = await cusdWrapper.balanceOf(accounts[0])
        expect(balance.toFixed()).toEqBigNumber('1000000000000000000000')
        await testLocallyWithWeb3Node(
          TransferCUSD,
          [
            '--from',
            accounts[0],
            '--to',
            accounts[1],
            '--value',
            balance.toFixed(),
            '--gasCurrency',
            euroWrapper.address,
          ],
          web3
        )
        const balanceAfter = await cusdWrapper.balanceOf(accounts[0])
        expect(balanceAfter.toFixed()).toEqBigNumber('0')
      })
    })
  })

  describe('when --comment is passed', () => {
    it('should transfer cUSD with a comment', async () => {
      const amountToTransfer = '10000000000000000000'
      const comment = 'Test transfer'
      await expect(
        testLocallyWithWeb3Node(
          TransferCUSD,
          [
            '--from',
            accounts[0],
            '--to',
            accounts[1],
            '--value',
            amountToTransfer,
            '--comment',
            comment,
          ],
          web3
        )
      ).resolves.toBeUndefined()
      expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
        [
          [
            "Running Checks:",
          ],
          [
            "   ✔  Account has at least 10 cUSD ",
          ],
          [
            "   ✔  Compliant Address ",
          ],
          [
            "   ✔  Compliant Address ",
          ],
          [
            "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 can sign txs ",
          ],
          [
            "   ✔  Account can afford to transfer cUSD with gas paid in CELO ",
          ],
          [
            "All checks passed",
          ],
          [
            "SendTransaction: transferWithComment",
          ],
          [
            "txHash: 0xtxhash",
          ],
        ]
      `)
    })
  })

  test('should fail if to address is sanctioned', async () => {
    const spy = jest.spyOn(console, 'log')
    await expect(
      testLocallyWithWeb3Node(
        TransferCUSD,
        ['--from', accounts[1], '--to', TEST_SANCTIONED_ADDRESS, '--value', '1'],
        web3
      )
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"Some checks didn't pass!"`)
    expect(spy).toHaveBeenCalledWith(expect.stringContaining(COMPLIANT_ERROR_RESPONSE))
  })
})
