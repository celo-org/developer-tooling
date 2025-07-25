import { goldTokenABI } from '@celo/abis'
import { COMPLIANT_ERROR_RESPONSE } from '@celo/compliance'
import { ContractKit, newKitFromWeb3, StableToken } from '@celo/contractkit'
import { setBalance, testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { TEST_GAS_PRICE } from '@celo/dev-utils/test-utils'
import BigNumber from 'bignumber.js'
import { Address, createPublicClient, formatEther, http, parseEther } from 'viem'
import { celo } from 'viem/chains'
import Web3 from 'web3'
import { topUpWithToken } from '../../test-utils/chain-setup'
import {
  extractHostFromWeb3,
  stripAnsiCodesFromNestedArray,
  TEST_SANCTIONED_ADDRESS,
  testLocallyWithWeb3Node,
} from '../../test-utils/cliUtils'
import { mockRpcFetch } from '../../test-utils/mockRpc'
import TransferCelo from './celo'

process.env.NO_SYNCCHECK = 'true'

// Lots of commands, sometimes times out
jest.setTimeout(15000)

testWithAnvilL2('transfer:celo cmd', (web3: Web3) => {
  let accounts: string[] = []
  let kit: ContractKit
  let restoreMock: () => void

  beforeEach(async () => {
    restoreMock = mockRpcFetch({ method: 'eth_gasPrice', result: TEST_GAS_PRICE })
    kit = newKitFromWeb3(web3)
    accounts = await web3.eth.getAccounts()

    jest.spyOn(console, 'log').mockImplementation(() => {
      // noop
    })
    jest.spyOn(console, 'error').mockImplementation(() => {
      // noop
    })

    await topUpWithToken(
      kit,
      StableToken.cUSD,
      accounts[0],
      new BigNumber('9000000000000000000000')
    )
    await topUpWithToken(
      kit,
      StableToken.cUSD,
      accounts[1],
      new BigNumber('9000000000000000000000')
    )
  })

  afterEach(() => {
    restoreMock()
    jest.restoreAllMocks()
  })

  test('can transfer celo', async () => {
    const balanceBefore = (await kit.getTotalBalance(accounts[0])).CELO!
    const receiverBalanceBefore = await kit.getTotalBalance(accounts[1])
    const amountToTransfer = '500000000000000000000'
    // Send cUSD to RG contract
    await testLocallyWithWeb3Node(
      TransferCelo,
      [
        '--from',
        accounts[0],
        '--to',
        accounts[1],
        '--value',
        amountToTransfer,
        '--gasCurrency',
        (await kit.contracts.getStableToken(StableToken.cUSD)).address,
      ],
      web3
    )
    // RG cUSD balance should match the amount sent
    const receiverBalance = await kit.getTotalBalance(accounts[1])
    expect(receiverBalance.CELO!.toFixed()).toEqual(
      receiverBalanceBefore.CELO!.plus(amountToTransfer).toFixed()
    )
    let block = await web3.eth.getBlock('latest')
    let transactionReceipt = await web3.eth.getTransactionReceipt(block.transactions[0])

    // Safety check if the latest transaction was originated by expected account
    expect(transactionReceipt.from.toLowerCase()).toEqual(accounts[0].toLowerCase())

    // Attempt to send cUSD back
    await testLocallyWithWeb3Node(
      TransferCelo,
      [
        '--from',
        accounts[1],
        '--to',
        accounts[0],
        '--value',
        amountToTransfer,
        '--gasCurrency',
        (await kit.contracts.getStableToken(StableToken.cUSD)).address,
      ],
      web3
    )
    block = await web3.eth.getBlock('latest')
    transactionReceipt = await web3.eth.getTransactionReceipt(block.transactions[0])

    // Safety check if the latest transaction was originated by expected account
    expect(transactionReceipt.from.toLowerCase()).toEqual(accounts[1].toLowerCase())

    const balanceAfter = (await kit.getTotalBalance(accounts[0])).CELO?.toFixed()!
    // the balance should be close to initial minus the fees for gas times 2 (one for each transfer)
    const estimatedBalance = BigInt(
      balanceBefore
        .minus(transactionReceipt.effectiveGasPrice * transactionReceipt.gasUsed * 2)
        .toFixed()
    )
    expect(Number(formatEther(BigInt(balanceAfter)))).toBeCloseTo(
      Number(formatEther(estimatedBalance)),
      3
    )
  })

  test('cant transfer full balance without feeCurrency', async () => {
    const spy = jest.spyOn(console, 'log')
    const balance = (await kit.getTotalBalance(accounts[0])).CELO!
    await expect(
      testLocallyWithWeb3Node(
        TransferCelo,
        ['--from', accounts[0], '--to', accounts[1], '--value', balance.toFixed()],
        web3
      )
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"Some checks didn't pass!"`)
    expect(stripAnsiCodesFromNestedArray(spy.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "Running Checks:",
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
          "   ✔  Account has at least 1000000 CELO ",
        ],
        [
          "   ✘  Account can afford to transfer CELO with gas paid in CELO Cannot afford to transfer CELO ; try reducing value slightly or using a different gasCurrency",
        ],
      ]
    `)
  })

  test('can transfer full balance with feeCurrency', async () => {
    const balance = (await kit.getTotalBalance(accounts[0])).CELO!
    const spy = jest.spyOn(console, 'log')

    await expect(
      testLocallyWithWeb3Node(
        TransferCelo,
        [
          '--from',
          accounts[0],
          '--to',
          accounts[1],
          '--value',
          balance.toFixed(),
          '--gasCurrency',
          (await kit.contracts.getStableToken(StableToken.cUSD)).address,
          '--comment',
          'Goodbye balance',
        ],
        web3
      )
    ).resolves.toBeUndefined()

    expect(stripAnsiCodesFromNestedArray(spy.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "Running Checks:",
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
          "   ✔  Account has at least 1000000 CELO ",
        ],
        [
          "   ✔  The provided feeCurrency is whitelisted ",
        ],
        [
          "   ✔  Account can afford to transfer CELO with gas paid in 0x20FE3FD86C231fb8E28255452CEA7851f9C5f9c1 ",
        ],
        [
          "All checks passed",
        ],
        [
          "SendTransaction: CeloToken->TransferWithComment",
        ],
        [
          "txHash: 0xtxhash",
        ],
      ]
    `)
    // NOTE that because anvil doesnt understand paying with fee tokens this tx will actually revert.
    // alternatively in the past we used anvil with baseFee set to 0, but that makes tests generally
    // less accurate representations of real world.
  })

  test('can transfer very large amounts of CELO', async () => {
    const balanceBefore = new BigNumber(await web3.eth.getBalance(accounts[0]))

    const amountToTransfer = parseEther('20000000')
    await setBalance(
      web3,
      accounts[0] as Address,
      balanceBefore.plus(amountToTransfer.toString(10))
    )

    await testLocallyWithWeb3Node(
      TransferCelo,
      [
        '--from',
        accounts[0],
        '--to',
        accounts[1],
        '--value',
        amountToTransfer.toString(10),
        '--gasCurrency',
        (await kit.contracts.getStableToken(StableToken.cUSD)).address,
      ],
      web3
    )

    const block = await web3.eth.getBlock('latest')
    const transactionReceipt = await web3.eth.getTransactionReceipt(block.transactions[0])

    // Safety check if the latest transaction was originated by expected account
    expect(transactionReceipt.from.toLowerCase()).toEqual(accounts[0].toLowerCase())
    expect(transactionReceipt.cumulativeGasUsed).toBeGreaterThan(0)
    expect(transactionReceipt.effectiveGasPrice).toBeGreaterThan(0)
    expect(transactionReceipt.gasUsed).toBeGreaterThan(0)
    expect(transactionReceipt.to).toEqual(accounts[1].toLowerCase())
    expect(transactionReceipt.status).toEqual(true)

    const balanceAfter = new BigNumber(await web3.eth.getBalance(accounts[0]))

    expect(balanceAfter.toNumber()).toBeLessThan(balanceBefore.toNumber())
  })

  test('can transfer celo with comment', async () => {
    const start = await web3.eth.getBlock('latest')
    const amountToTransfer = '500000000000000000000'

    await testLocallyWithWeb3Node(
      TransferCelo,
      [
        '--from',
        accounts[0],
        '--to',
        accounts[1],
        '--value',
        amountToTransfer,
        '--comment',
        'Hello World',
      ],
      web3
    )

    // Attempt to send cUSD back
    await testLocallyWithWeb3Node(
      TransferCelo,
      [
        '--from',
        accounts[1],
        '--to',
        accounts[0],
        '--value',
        amountToTransfer,
        '--comment',
        'Hello World Back',
      ],
      web3
    )

    const client = createPublicClient({
      // @ts-expect-error
      transport: http(kit.web3.currentProvider.existingProvider.host),
    })
    const events = await client.getContractEvents({
      abi: goldTokenABI,
      eventName: 'TransferComment',
      fromBlock: BigInt(start.number),
      address: (await kit.contracts.getCeloToken()).address,
    })

    expect(events.length).toEqual(2)
    expect(events[0].args).toEqual({ comment: 'Hello World' })
    expect(events[1].args).toEqual({ comment: 'Hello World Back' })
  })

  test('passes feeCurrency to estimateGas', async () => {
    const chainId = await kit.web3.eth.getChainId()
    const nodeUrl = extractHostFromWeb3(web3)
    const publicClient = createPublicClient({
      chain: {
        name: 'Custom Chain',
        id: chainId,
        nativeCurrency: celo.nativeCurrency,
        formatters: celo.formatters,
        serializers: celo.serializers,
        rpcUrls: {
          default: { http: [nodeUrl] },
        },
      },
      transport: http(nodeUrl),
    })

    const estimateGasSpy = jest.spyOn(publicClient, 'estimateGas').mockResolvedValue(BigInt(100000))
    // @ts-expect-error - clients slightly differ due to block differences.
    jest.spyOn(TransferCelo.prototype, 'getPublicClient').mockResolvedValue(publicClient)

    const amountToTransfer = '1'
    const cUSDAddress = (await kit.contracts.getStableToken(StableToken.cUSD)).address

    await testLocallyWithWeb3Node(
      TransferCelo,
      [
        '--from',
        accounts[0],
        '--to',
        accounts[1],
        '--value',
        amountToTransfer,
        '--gasCurrency',
        cUSDAddress,
      ],
      web3
    )

    expect(estimateGasSpy).toHaveBeenCalledWith({
      account: accounts[0],
      to: accounts[1] as Address,
      value: BigInt(amountToTransfer),
      feeCurrency: cUSDAddress as Address,
    })
  })

  test('should fail if to address is sanctioned', async () => {
    const spy = jest.spyOn(console, 'log')
    await expect(
      testLocallyWithWeb3Node(
        TransferCelo,
        ['--from', accounts[1], '--to', TEST_SANCTIONED_ADDRESS, '--value', '1'],
        web3
      )
    ).rejects.toThrow()
    expect(spy).toHaveBeenCalledWith(expect.stringContaining(COMPLIANT_ERROR_RESPONSE))
  })

  test('should fail if from address is sanctioned', async () => {
    const spy = jest.spyOn(console, 'log')
    await expect(
      testLocallyWithWeb3Node(
        TransferCelo,
        ['--from', TEST_SANCTIONED_ADDRESS, '--to', accounts[0], '--value', '1'],
        web3
      )
    ).rejects.toThrow()
    expect(spy).toHaveBeenCalledWith(expect.stringContaining(COMPLIANT_ERROR_RESPONSE))
  })

  test("should fail if the feeCurrency isn't correctly formatted", async () => {
    const wrongFee = '0x123'
    await expect(
      testLocallyWithWeb3Node(
        TransferCelo,
        ['--from', accounts[0], '--to', accounts[1], '--value', '1', '--gasCurrency', wrongFee],
        web3
      )
    ).rejects.toThrowErrorMatchingInlineSnapshot(`
      "Parsing --gasCurrency 
      	0x123 is not a valid address
      See more help with --help"
    `)
  })

  test("should NOT fail if the feeCurrency isn't the same capitalization as in the whitelist", async () => {
    const balanceBefore = await kit.getTotalBalance(accounts[0])
    const receiverBalanceBefore = await kit.getTotalBalance(accounts[1])
    const amountToTransfer = '1'
    await expect(
      testLocallyWithWeb3Node(
        TransferCelo,
        [
          '--from',
          accounts[0],
          '--to',
          accounts[1],
          '--value',
          amountToTransfer,
          '--gasCurrency',
          (await kit.contracts.getStableToken(StableToken.cUSD)).address.toUpperCase(),
        ],
        web3
      )
    ).resolves.toBeUndefined()

    const balanceAfter = await kit.getTotalBalance(accounts[0])
    const receiverBalanceAfter = await kit.getTotalBalance(accounts[1])
    const transactionReceipt = await web3.eth.getTransactionReceipt(
      (await web3.eth.getBlock('latest')).transactions[0]
    )

    // Safety check if the latest transaction was originated by expected account
    expect(transactionReceipt.from.toLowerCase()).toEqual(accounts[0].toLowerCase())

    expect(receiverBalanceAfter.CELO!.toFixed()).toEqual(
      receiverBalanceBefore.CELO!.plus(amountToTransfer).toFixed()
    )
    expect(
      balanceAfter
        .CELO!.plus(transactionReceipt.effectiveGasPrice * transactionReceipt.gasUsed)
        .toFixed()
    ).toEqual(balanceBefore.CELO!.minus(amountToTransfer).toFixed())
  })

  test("should fail if the feeCurrency isn't whitelisted", async () => {
    const spy = jest.spyOn(console, 'log')
    const wrongFee = '0x1234567890123456789012345678901234567890'
    await expect(
      testLocallyWithWeb3Node(
        TransferCelo,
        ['--from', accounts[0], '--to', accounts[1], '--value', '1', '--gasCurrency', wrongFee],
        web3
      )
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"Some checks didn't pass!"`)
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining(`${wrongFee} is not a valid fee currency.`)
    )
  })

  test('should fail if using with --useAKV', async () => {
    await expect(
      testLocallyWithWeb3Node(
        TransferCelo,
        ['--from', accounts[0], '--to', accounts[1], '--value', '1', '--useAKV'],

        web3
      )
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"--useAKV flag is no longer supported"`)
  })
})
