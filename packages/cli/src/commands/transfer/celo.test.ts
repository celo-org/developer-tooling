import { goldTokenABI } from '@celo/abis'
import { COMPLIANT_ERROR_RESPONSE } from '@celo/compliance'
import { ContractKit, StableToken, newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import BigNumber from 'bignumber.js'
import { createPublicClient, http } from 'viem'
import Web3 from 'web3'
import { topUpWithToken } from '../../test-utils/chain-setup'
import { TEST_SANCTIONED_ADDRESS, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import TransferCelo from './celo'

process.env.NO_SYNCCHECK = 'true'

// Lots of commands, sometimes times out
jest.setTimeout(15000)

testWithAnvilL2('transfer:celo cmd', (web3: Web3) => {
  let accounts: string[] = []
  let kit: ContractKit

  beforeEach(async () => {
    kit = newKitFromWeb3(web3)
    accounts = await web3.eth.getAccounts()

    jest.spyOn(console, 'log').mockImplementation(() => {})
    jest.spyOn(console, 'error').mockImplementation(() => {})

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
    const block = await web3.eth.getBlock('latest')
    const transactionReceipt = await web3.eth.getTransactionReceipt(block.transactions[0])

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

    const balanceAfter = (await kit.getTotalBalance(accounts[0])).CELO!
    expect(balanceBefore.toFixed()).toEqual(balanceAfter.toFixed())
  })

  test('can transfer celo with comment', async () => {
    const start = await web3.eth.getBlock('latest')
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
      (
        await web3.eth.getBlock('latest')
      ).transactions[0]
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
    const wrongFee = '0x1234567890123456789012345678901234567890'
    await expect(
      testLocallyWithWeb3Node(
        TransferCelo,
        ['--from', accounts[0], '--to', accounts[1], '--value', '1', '--gasCurrency', wrongFee],
        web3
      )
    ).rejects.toThrowErrorMatchingInlineSnapshot(`
      "0x1234567890123456789012345678901234567890 is not a valid fee currency. Available currencies:
      0x20FE3FD86C231fb8E28255452CEA7851f9C5f9c1 - Celo Dollar (cUSD)
      0x5930519559Ffa7528a00BE445734036471c443a2 - Celo Euro (cEUR)
      0xB2Fd9852Ca3D69678286A8635d661690906A3E9d - Celo Brazilian Real (cREAL)"
    `)
  })
})
