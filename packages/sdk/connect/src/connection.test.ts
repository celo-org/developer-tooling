import { ensureLeading0x } from '@celo/base'
import { Connection } from './connection'
import { AbiItem } from './abi-types'
import { Callback, JsonRpcPayload, JsonRpcResponse, Provider } from './types'

function createMockProvider(): Provider {
  return {
    send(_payload: JsonRpcPayload, _callback: Callback<JsonRpcResponse>): void {
      // noop mock
    },
  }
}

function createMockProviderWithRpc(handler: (payload: JsonRpcPayload) => unknown): Provider {
  return {
    send(payload: JsonRpcPayload, callback: Callback<JsonRpcResponse>): void {
      try {
        const result = handler(payload)
        callback(null, {
          jsonrpc: '2.0',
          id: payload.id as number,
          result,
        })
      } catch (err) {
        callback(err as Error)
      }
    },
  }
}

describe('Connection', () => {
  let connection: Connection
  beforeEach(() => {
    connection = new Connection(createMockProvider())
  })

  describe('#createContract', () => {
    const simpleAbi: AbiItem[] = [
      {
        type: 'function',
        name: 'balanceOf',
        inputs: [{ name: 'owner', type: 'address' }],
        outputs: [{ name: 'balance', type: 'uint256' }],
        stateMutability: 'view',
      },
      {
        type: 'function',
        name: 'transfer',
        inputs: [
          { name: 'to', type: 'address' },
          { name: 'value', type: 'uint256' },
        ],
        outputs: [{ name: 'success', type: 'bool' }],
        stateMutability: 'nonpayable',
      },
      {
        type: 'event',
        name: 'Transfer',
        inputs: [
          { name: 'from', type: 'address', indexed: true },
          { name: 'to', type: 'address', indexed: true },
          { name: 'value', type: 'uint256', indexed: false },
        ],
      },
    ]

    it('returns an object with methods and options properties', () => {
      const contract = connection.createContract(
        simpleAbi,
        '0x1234567890123456789012345678901234567890'
      )
      expect(contract).toBeDefined()
      expect(contract.methods).toBeDefined()
      expect(contract.options).toBeDefined()
      expect(contract.options.address).toBe('0x1234567890123456789012345678901234567890')
      expect(contract.options.jsonInterface).toBeDefined()
      expect(contract.options.jsonInterface.length).toBe(simpleAbi.length)
    })

    it('has the correct _address property', () => {
      const address = '0xABCDEF0123456789ABCDEF0123456789ABCDEF01'
      const contract = connection.createContract(simpleAbi, address)
      expect(contract._address).toBe(address)
    })

    it('creates a contract without an address', () => {
      const contract = connection.createContract(simpleAbi)
      expect(contract._address).toBe('')
      expect(contract.options.address).toBe('')
    })

    it('has method proxy that returns callable txObjects', () => {
      const contract = connection.createContract(
        simpleAbi,
        '0x1234567890123456789012345678901234567890'
      )
      const txObj = contract.methods.balanceOf('0x0000000000000000000000000000000000000001')
      expect(txObj).toBeDefined()
      expect(typeof txObj.call).toBe('function')
      expect(typeof txObj.send).toBe('function')
      expect(typeof txObj.estimateGas).toBe('function')
      expect(typeof txObj.encodeABI).toBe('function')
      expect(txObj._parent).toBe(contract)
    })

    it('encodeABI returns correct hex for a function call', () => {
      const contract = connection.createContract(
        simpleAbi,
        '0x1234567890123456789012345678901234567890'
      )
      const encoded = contract.methods
        .balanceOf('0x0000000000000000000000000000000000000001')
        .encodeABI()
      expect(encoded).toMatch(/^0x/)
      // balanceOf(address) selector is 0x70a08231
      expect(encoded.slice(0, 10)).toBe('0x70a08231')
    })

    it('methods proxy returns fallback for unknown methods', () => {
      const contract = connection.createContract(
        simpleAbi,
        '0x1234567890123456789012345678901234567890'
      )
      const txObj = contract.methods.nonExistentMethod()
      expect(txObj).toBeDefined()
      expect(typeof txObj.call).toBe('function')
      expect(txObj.encodeABI()).toBe('0x')
    })

    it('call method decodes the return value from RPC', async () => {
      const mockProvider = createMockProviderWithRpc((payload) => {
        if (payload.method === 'eth_call') {
          // Return a uint256 value of 42
          return '0x000000000000000000000000000000000000000000000000000000000000002a'
        }
        return '0x'
      })
      const conn = new Connection(mockProvider)
      const contract = conn.createContract(simpleAbi, '0x1234567890123456789012345678901234567890')
      const result = await contract.methods
        .balanceOf('0x0000000000000000000000000000000000000001')
        .call()
      expect(result).toBe('42')
    })

    it('populates events map from ABI', () => {
      const contract = connection.createContract(
        simpleAbi,
        '0x1234567890123456789012345678901234567890'
      )
      expect(contract.events).toBeDefined()
      expect(contract.events.Transfer).toBeDefined()
      expect(contract.events.Transfer.name).toBe('Transfer')
    })

    it('enriches ABI items with function signatures', () => {
      const contract = connection.createContract(
        simpleAbi,
        '0x1234567890123456789012345678901234567890'
      )
      // The enriched ABI should have signature field for function items
      const balanceOfAbi = contract.options.jsonInterface.find((item) => item.name === 'balanceOf')
      expect(balanceOfAbi).toBeDefined()
      expect((balanceOfAbi as any).signature).toBe('0x70a08231')
    })

    it('deploy method works with constructor arguments', () => {
      const abiWithConstructor: AbiItem[] = [
        {
          type: 'constructor',
          inputs: [{ name: 'initialSupply', type: 'uint256' }],
        },
        ...simpleAbi,
      ]
      const contract = connection.createContract(abiWithConstructor)
      const deployObj = contract.deploy({
        data: '0x6080604052', // minimal EVM bytecode prefix (PUSH1 0x80 PUSH1 0x40 MSTORE)
        arguments: [1000], // initialSupply constructor arg (see abiWithConstructor above)
      })
      expect(deployObj).toBeDefined()
      expect(typeof deployObj.encodeABI).toBe('function')
      const encoded = deployObj.encodeABI()
      expect(encoded).toMatch(/^0x6080604052/)
      // Should have constructor args appended
      expect(encoded.length).toBeGreaterThan('0x6080604052'.length)
    })
  })

  describe('#setFeeMarketGas', () => {
    describe('when fee market gas is set', () => {
      it('returns with gasPrice undefined and feeMarketGas set', async () => {
        const result = await connection.setFeeMarketGas({
          maxFeePerGas: '1',
          maxPriorityFeePerGas: '2',
        })
        expect(result).toEqual({
          gasPrice: undefined,
          maxFeePerGas: '1',
          maxPriorityFeePerGas: '2',
        })
      })
    })
    describe('when fee market gas is set', () => {
      it('returns with gasPrice undefined and feeMarketGas set', async () => {
        const result = await connection.setFeeMarketGas({
          maxFeePerGas: '1',
          maxPriorityFeePerGas: '2',
        })
        expect(result).toEqual({
          gasPrice: undefined,
          maxFeePerGas: '1',
          maxPriorityFeePerGas: '2',
        })
      })
    })

    describe('when fee market gas is not set', () => {
      const ETH_GAS_PRICE = 25001000000
      const BASE_FEE_PER = 25000000000
      const PRIORITYFEE = 200000
      const multiple = BigInt(120)
      beforeEach(() => {
        connection.rpcCaller.call = jest.fn(async (method) => {
          if (method === 'eth_gasPrice') {
            return {
              result: ensureLeading0x(ETH_GAS_PRICE.toString(16)),
              id: 22,
              jsonrpc: '2.0',
            }
          }
          if (method === 'eth_maxPriorityFeePerGas') {
            return {
              result: ensureLeading0x(PRIORITYFEE.toString(16)),
              id: 23,
              jsonrpc: '2.0',
            }
          }
          if (method === 'eth_getBlockByNumber') {
            return {
              result: { gasLimit: 30000000, baseFeePerGas: BASE_FEE_PER },
              id: 24,
              jsonrpc: '2.0',
            }
          }
          return {
            result: 0,
            id: 25,
            jsonrpc: '2.0',
          }
        })
      })
      it('asked the rpc what they should be with feeCurrency', async () => {
        const result = await connection.setFeeMarketGas({ feeCurrency: '0x000001' })
        expect(connection.rpcCaller.call).toHaveBeenCalledWith('eth_maxPriorityFeePerGas', [
          '0x000001',
        ])
        expect(connection.rpcCaller.call).toHaveBeenCalledWith('eth_gasPrice', ['0x000001'])

        expect(BigInt(result.maxPriorityFeePerGas as string)).toEqual(BigInt(PRIORITYFEE))
        expect(BigInt(result.maxFeePerGas as string)).toEqual(
          (BigInt(ETH_GAS_PRICE) * multiple) / BigInt(100) + BigInt(PRIORITYFEE)
        )
      })
      it('asked the rpc what they should be without feeCurrency', async () => {
        const result = await connection.setFeeMarketGas({})
        expect(connection.rpcCaller.call).toHaveBeenCalledWith('eth_maxPriorityFeePerGas', [])
        expect(connection.rpcCaller.call).toHaveBeenCalledWith('eth_getBlockByNumber', [
          'latest',
          true,
        ])
        expect(BigInt(result.maxPriorityFeePerGas as string)).toEqual(BigInt(PRIORITYFEE))
        expect(BigInt(result.maxFeePerGas as string)).toEqual(
          (BigInt(BASE_FEE_PER) * multiple) / BigInt(100) + BigInt(PRIORITYFEE)
        )
      })
    })
  })
})
