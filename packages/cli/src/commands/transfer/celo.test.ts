import { COMPLIANT_ERROR_RESPONSE, SANCTIONED_ADDRESSES } from '@celo/compliance'
import { HttpRpcCaller } from '@celo/connect'
import { ContractKit, StableToken, newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL1 } from '@celo/dev-utils/lib/anvil-test'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import TransferCelo from './celo'

process.env.NO_SYNCCHECK = 'true'

// Lots of commands, sometimes times out
jest.setTimeout(15000)

const mockRpc = () =>
  jest.spyOn(HttpRpcCaller.prototype, 'call').mockImplementation(async (method, _args) => {
    if (method === 'eth_maxPriorityFeePerGas') {
      return {
        result: '20000',
        id: 1,
        jsonrpc: '2.0',
      }
    }
    if (method === 'eth_gasPrice') {
      return {
        result: '30000',
        id: 1,
        jsonrpc: '2.0',
      }
    }
    return {
      result: 0,
      id: Math.random(),
      jsonrpc: '2.0',
    }
  })
testWithAnvilL1('transfer:celo cmd', (web3: Web3) => {
  let accounts: string[] = []
  let kit: ContractKit

  beforeEach(async () => {
    kit = newKitFromWeb3(web3)
    accounts = await web3.eth.getAccounts()
  })

  test('can transfer celo', async () => {
    const balanceBefore = (await kit.getTotalBalance(accounts[0])).CELO!
    const receiverBalanceBefore = await kit.getTotalBalance(accounts[1])
    const amountToTransfer = '500000000000000000000'
    // Send cUSD to RG contract
    let mock = mockRpc()
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
    mock.mockRestore()
    // RG cUSD balance should match the amount sent
    const receiverBalance = await kit.getTotalBalance(accounts[1])
    expect(receiverBalance.CELO!.toFixed()).toEqual(
      receiverBalanceBefore.CELO!.plus(amountToTransfer).toFixed()
    )

    const transactionReceipt = await web3.eth.getTransactionReceipt(
      (
        await web3.eth.getBlock('latest')
      ).transactions[0]
    )

    // Safety check if the latest transaction was originated by expected account
    expect(transactionReceipt.from.toLowerCase()).toEqual(accounts[0].toLowerCase())

    mock = mockRpc()
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
    mock.mockRestore()

    const balanceAfterWithoutFees = (await kit.getTotalBalance(accounts[0])).CELO!
    const balanceAfterWithFees = balanceAfterWithoutFees.plus(
      transactionReceipt.effectiveGasPrice * transactionReceipt.gasUsed
    )

    expect(balanceBefore).toEqual(balanceAfterWithFees)
  })

  test('should fail if to address is sanctioned', async () => {
    const spy = jest.spyOn(console, 'log')
    await expect(
      testLocallyWithWeb3Node(
        TransferCelo,
        ['--from', accounts[1], '--to', SANCTIONED_ADDRESSES[0], '--value', '1'],
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
        ['--from', SANCTIONED_ADDRESSES[0], '--to', accounts[0], '--value', '1'],
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
    let mock = mockRpc()
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
    mock.mockRestore()

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
      0x06f60E083aDf016a98E3c7A1aFfa1c097B617aB9 - Celo Euro (cEUR)
      0x9cA64d4663B4A623C3E9a7F9155451647592bEc7 - Celo Dollar (cUSD)
      0xC458f5ab25a47741205722d465cDea9aB1E1154A - Celo Brazilian Real (cREAL)"
    `)
  })
})
