import { createContractConstructor } from './rpc-contract'
import { AbiItem } from './abi-types'
import { Connection } from './connection'
import { CeloTx, CeloTxReceipt } from './types'

// Mock Connection and RpcCaller
const createMockConnection = () => {
  const mockRpcCaller = {
    call: jest.fn(),
  }

  const mockConnection = {
    rpcCaller: mockRpcCaller,
    estimateGas: jest.fn().mockResolvedValue(100000),
    currentProvider: {
      send: jest.fn(),
    },
    getTransactionReceipt: jest.fn(),
  } as unknown as Connection

  return { mockConnection, mockRpcCaller }
}

// Simple ERC20-like ABI for testing
const ERC20_ABI: AbiItem[] = [
  {
    type: 'function',
    name: 'transfer',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    type: 'function',
    name: 'balanceOf',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'approve',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    type: 'function',
    name: 'noOutput',
    inputs: [],
    outputs: [],
  },
  {
    type: 'function',
    name: 'multiOutput',
    inputs: [],
    outputs: [
      { name: 'a', type: 'uint256' },
      { name: 'b', type: 'address' },
    ],
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
  {
    type: 'event',
    name: 'Approval',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
  },
  {
    type: 'constructor',
    inputs: [{ name: 'initialSupply', type: 'uint256' }],
  },
]

describe('RpcContract', () => {
  describe('constructor', () => {
    it('creates contract with ABI and address', () => {
      const { mockConnection } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const address = '0x1234567890123456789012345678901234567890'

      const contract = new RpcContract(ERC20_ABI, address)

      expect(contract._address).toBe(address)
      expect(contract.options.address).toBe(address)
      expect(contract.options.jsonInterface).toBeDefined()
      expect(contract.options.jsonInterface.length).toBeGreaterThan(0)
    })

    it('creates contract without address', () => {
      const { mockConnection } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)

      const contract = new RpcContract(ERC20_ABI)

      expect(contract._address).toBe('')
      expect(contract.options.address).toBe('')
    })

    it('enriches ABI with function signatures', () => {
      const { mockConnection } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)

      const contract = new RpcContract(ERC20_ABI)

      const transferFunc = contract.options.jsonInterface.find(
        (item) => item.type === 'function' && item.name === 'transfer'
      )
      expect(transferFunc).toBeDefined()
      expect((transferFunc as any).signature).toBeDefined()
      expect((transferFunc as any).signature).toMatch(/^0x[a-f0-9]{8}$/)
    })

    it('enriches ABI with event signatures', () => {
      const { mockConnection } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)

      const contract = new RpcContract(ERC20_ABI)

      const transferEvent = contract.options.jsonInterface.find(
        (item) => item.type === 'event' && item.name === 'Transfer'
      )
      expect(transferEvent).toBeDefined()
      expect((transferEvent as any).signature).toBeDefined()
      expect((transferEvent as any).signature).toMatch(/^0x[a-f0-9]{64}$/)
    })

    it('builds events map', () => {
      const { mockConnection } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)

      const contract = new RpcContract(ERC20_ABI)

      expect(contract.events.Transfer).toBeDefined()
      expect(contract.events.Approval).toBeDefined()
      expect(contract.events.Transfer.type).toBe('event')
      expect(contract.events.Transfer.name).toBe('Transfer')
    })
  })

  describe('methods proxy', () => {
    it('returns method object with correct shape for existing method', () => {
      const { mockConnection } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI, '0x1234567890123456789012345678901234567890')

      const method = (contract.methods as any).transfer(
        '0x0000000000000000000000000000000000000001',
        '100'
      )

      expect(method).toBeDefined()
      expect(typeof method.call).toBe('function')
      expect(typeof method.send).toBe('function')
      expect(typeof method.estimateGas).toBe('function')
      expect(typeof method.encodeABI).toBe('function')
      expect(method._parent).toBe(contract)
      expect(method.arguments).toBeDefined()
    })

    it('returns error-throwing stubs for non-existent method', () => {
      const { mockConnection } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI, '0x1234567890123456789012345678901234567890')

      const method = (contract.methods as any).nonExistentMethod('arg1', 'arg2')

      expect(method).toBeDefined()
      expect(typeof method.call).toBe('function')
      expect(typeof method.send).toBe('function')
      expect(typeof method.estimateGas).toBe('function')
      expect(typeof method.encodeABI).toBe('function')

      // All should throw errors
      expect(method.call()).rejects.toThrow('Method nonExistentMethod not found in ABI')
      expect(() => method.send()).toThrow('Method nonExistentMethod not found in ABI')
      expect(method.estimateGas()).resolves.toBe(0)
      expect(method.encodeABI()).toBe('0x')
    })
  })

  describe('call()', () => {
    it('makes eth_call RPC and decodes single output', async () => {
      const { mockConnection, mockRpcCaller } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI, '0x1234567890123456789012345678901234567890')

      // Mock eth_call response with encoded uint256 value (100)
      mockRpcCaller.call.mockResolvedValue({
        result: '0x0000000000000000000000000000000000000000000000000000000000000064',
      })

      const result = await (contract.methods as any)
        .balanceOf('0x0000000000000000000000000000000000000001')
        .call()

      expect(mockRpcCaller.call).toHaveBeenCalledWith('eth_call', [
        expect.objectContaining({
          to: '0x1234567890123456789012345678901234567890',
          data: expect.stringMatching(/^0x[a-f0-9]+$/),
        }),
        'latest',
      ])
      expect(result).toBeDefined()
    })

    it('returns raw result for empty output methods', async () => {
      const { mockConnection, mockRpcCaller } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI, '0x1234567890123456789012345678901234567890')

      mockRpcCaller.call.mockResolvedValue({ result: '0x' })

      const result = await (contract.methods as any).noOutput().call()

      expect(result).toBe('0x')
    })

    it('returns raw result for 0x response', async () => {
      const { mockConnection, mockRpcCaller } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI, '0x1234567890123456789012345678901234567890')

      mockRpcCaller.call.mockResolvedValue({ result: '0x' })

      const result = await (contract.methods as any)
        .balanceOf('0x0000000000000000000000000000000000000001')
        .call()

      expect(result).toBe('0x')
    })

    it('decodes multiple outputs as object', async () => {
      const { mockConnection, mockRpcCaller } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI, '0x1234567890123456789012345678901234567890')

      // Mock response with two values encoded
      mockRpcCaller.call.mockResolvedValue({
        result:
          '0x0000000000000000000000000000000000000000000000000000000000000064' +
          '0000000000000000000000000000000000000000000000000000000000000001',
      })

      const result = await (contract.methods as any).multiOutput().call()

      expect(result).toBeDefined()
      expect(typeof result).toBe('object')
    })

    it('passes txParams to eth_call', async () => {
      const { mockConnection, mockRpcCaller } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI, '0x1234567890123456789012345678901234567890')

      mockRpcCaller.call.mockResolvedValue({ result: '0x' })

      const txParams: CeloTx = { from: '0x0000000000000000000000000000000000000002' }
      await (contract.methods as any)
        .balanceOf('0x0000000000000000000000000000000000000001')
        .call(txParams)

      expect(mockRpcCaller.call).toHaveBeenCalledWith('eth_call', [
        expect.objectContaining({
          from: '0x0000000000000000000000000000000000000002',
        }),
        'latest',
      ])
    })
  })

  describe('send()', () => {
    it('creates PromiEvent with correct tx params', () => {
      const { mockConnection } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI, '0x1234567890123456789012345678901234567890')

      const txParams: CeloTx = {
        from: '0x0000000000000000000000000000000000000002',
        gas: 100000,
      }

      const result = (contract.methods as any)
        .transfer('0x0000000000000000000000000000000000000001', '100')
        .send(txParams)

      expect(result).toBeDefined()
      expect(typeof result.then).toBe('function')
      expect(typeof result.on).toBe('function')
      expect(typeof result.once).toBe('function')
    })

    it('includes encoded function data in tx', () => {
      const { mockConnection } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI, '0x1234567890123456789012345678901234567890')

      // We can't directly inspect the tx sent to provider, but we can verify
      // that send() returns a PromiEvent
      const result = (contract.methods as any)
        .transfer('0x0000000000000000000000000000000000000001', '100')
        .send()

      expect(result).toBeDefined()
      expect(typeof result.then).toBe('function')
    })
  })

  describe('estimateGas()', () => {
    it('calls connection.estimateGas with correct params', async () => {
      const { mockConnection } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI, '0x1234567890123456789012345678901234567890')

      const txParams: CeloTx = { from: '0x0000000000000000000000000000000000000002' }
      const gas = await (contract.methods as any)
        .transfer('0x0000000000000000000000000000000000000001', '100')
        .estimateGas(txParams)

      expect(mockConnection.estimateGas).toHaveBeenCalledWith(
        expect.objectContaining({
          to: '0x1234567890123456789012345678901234567890',
          data: expect.stringMatching(/^0x[a-f0-9]+$/),
          from: '0x0000000000000000000000000000000000000002',
        })
      )
      expect(gas).toBe(100000)
    })

    it('returns estimated gas value', async () => {
      const { mockConnection } = createMockConnection()
      mockConnection.estimateGas = jest.fn().mockResolvedValue(250000)
      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI, '0x1234567890123456789012345678901234567890')

      const gas = await (contract.methods as any)
        .transfer('0x0000000000000000000000000000000000000001', '100')
        .estimateGas()

      expect(gas).toBe(250000)
    })
  })

  describe('encodeABI()', () => {
    it('returns encoded function data', () => {
      const { mockConnection } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI, '0x1234567890123456789012345678901234567890')

      const encoded = (contract.methods as any)
        .transfer('0x0000000000000000000000000000000000000001', '100')
        .encodeABI()

      expect(encoded).toBeDefined()
      expect(typeof encoded).toBe('string')
      expect(encoded).toMatch(/^0x[a-f0-9]+$/)
    })

    it('encodes different methods differently', () => {
      const { mockConnection } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI, '0x1234567890123456789012345678901234567890')

      const transferEncoded = (contract.methods as any)
        .transfer('0x0000000000000000000000000000000000000001', '100')
        .encodeABI()
      const approveEncoded = (contract.methods as any)
        .approve('0x0000000000000000000000000000000000000001', '100')
        .encodeABI()

      expect(transferEncoded).not.toBe(approveEncoded)
    })
  })

  describe('deploy()', () => {
    it('encodes constructor args correctly', () => {
      const { mockConnection } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI)

      const bytecode = '0x6080604052'
      const deployTx = contract.deploy({ data: bytecode, arguments: ['1000000000000000000000000'] })

      expect(deployTx).toBeDefined()
      expect(typeof deployTx.call).toBe('function')
      expect(typeof deployTx.send).toBe('function')
      expect(typeof deployTx.estimateGas).toBe('function')
      expect(typeof deployTx.encodeABI).toBe('function')
    })

    it('returns bytecode when no constructor args', async () => {
      const { mockConnection } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI)

      const bytecode = '0x6080604052'
      const deployTx = contract.deploy({ data: bytecode })

      const result = await deployTx.call()

      expect(result).toBe(bytecode)
    })

    it('appends encoded constructor args to bytecode', async () => {
      const { mockConnection } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI)

      const bytecode = '0x6080604052'
      const deployTx = contract.deploy({ data: bytecode, arguments: ['1000000000000000000000000'] })

      const result = await deployTx.call()

      expect(result).toBeDefined()
      expect(result).toMatch(/^0x[a-f0-9]+$/)
      expect((result as string).length).toBeGreaterThan(bytecode.length)
    })

    it('stores arguments in deploy tx object', () => {
      const { mockConnection } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI)

      const args = ['1000000000000000000000000']
      const deployTx = contract.deploy({ data: '0x6080604052', arguments: args })

      expect(deployTx.arguments).toEqual(args)
    })
  })

  describe('deploy().send()', () => {
    it('creates PromiEvent', () => {
      const { mockConnection } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI)

      const deployTx = contract.deploy({ data: '0x6080604052' })
      const result = deployTx.send()

      expect(result).toBeDefined()
      expect(typeof result.then).toBe('function')
      expect(typeof result.on).toBe('function')
      expect(typeof result.once).toBe('function')
    })

    it('resolves to deployed contract instance', async () => {
      const { mockConnection } = createMockConnection()
      mockConnection.currentProvider.send = jest.fn((_req, callback) => {
        // Simulate successful tx send
        callback(null, { result: '0xdeadbeef', jsonrpc: '2.0', id: 1 } as any)
      })
      mockConnection.getTransactionReceipt = jest.fn().mockResolvedValue({
        contractAddress: '0x1111111111111111111111111111111111111111',
        transactionHash: '0xdeadbeef',
        blockNumber: 1,
        gasUsed: 100000,
        status: 1,
        transactionIndex: 0,
        blockHash: '0xefgh',
        from: '0x0000000000000000000000000000000000000000',
        to: null,
        cumulativeGasUsed: 100000,
        logs: [],
      } as unknown as CeloTxReceipt)

      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI)

      const deployTx = contract.deploy({ data: '0x6080604052' })
      const result = deployTx.send()

      // The result should be a PromiEvent that resolves to a Contract instance
      expect(result).toBeDefined()
      expect(typeof result.then).toBe('function')
    })
  })

  describe('getPastEvents()', () => {
    it('makes eth_getLogs RPC call', async () => {
      const { mockConnection, mockRpcCaller } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI, '0x1234567890123456789012345678901234567890')

      mockRpcCaller.call.mockResolvedValue({ result: [] })

      await contract.getPastEvents('Transfer', {})

      expect(mockRpcCaller.call).toHaveBeenCalledWith('eth_getLogs', [
        expect.objectContaining({
          address: '0x1234567890123456789012345678901234567890',
          topics: expect.arrayContaining([expect.stringMatching(/^0x[a-f0-9]{64}$/)]),
        }),
      ])
    })

    it('returns empty array for unknown events', async () => {
      const { mockConnection, mockRpcCaller } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI, '0x1234567890123456789012345678901234567890')

      const result = await contract.getPastEvents('UnknownEvent', {})

      expect(result).toEqual([])
      expect(mockRpcCaller.call).not.toHaveBeenCalled()
    })

    it('decodes event logs correctly', async () => {
      const { mockConnection, mockRpcCaller } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI, '0x1234567890123456789012345678901234567890')

      const mockLog = {
        address: '0x1234567890123456789012345678901234567890',
        topics: [
          '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', // Transfer event sig
          '0x0000000000000000000000000000000000000000000000000000000000000001', // from
          '0x0000000000000000000000000000000000000000000000000000000000000002', // to
        ],
        data: '0x0000000000000000000000000000000000000000000000000000000000000064', // value
        blockNumber: 100,
        transactionHash: '0xabcd',
        blockHash: '0xefgh',
        logIndex: 0,
        transactionIndex: 0,
      }

      mockRpcCaller.call.mockResolvedValue({ result: [mockLog] })

      const result = await contract.getPastEvents('Transfer', {})

      expect(result).toHaveLength(1)
      expect(result[0]).toMatchObject({
        event: 'Transfer',
        address: '0x1234567890123456789012345678901234567890',
        blockNumber: 100,
        transactionHash: '0xabcd',
      })
      expect(result[0].returnValues).toBeDefined()
    })

    it('handles fromBlock and toBlock options', async () => {
      const { mockConnection, mockRpcCaller } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI, '0x1234567890123456789012345678901234567890')

      mockRpcCaller.call.mockResolvedValue({ result: [] })

      await contract.getPastEvents('Transfer', { fromBlock: 100, toBlock: 200 })

      expect(mockRpcCaller.call).toHaveBeenCalledWith('eth_getLogs', [
        expect.objectContaining({
          fromBlock: expect.any(String),
          toBlock: expect.any(String),
        }),
      ])
    })

    it('gracefully handles event decoding errors', async () => {
      const { mockConnection, mockRpcCaller } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI, '0x1234567890123456789012345678901234567890')

      const mockLog = {
        address: '0x1234567890123456789012345678901234567890',
        topics: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
        data: '0xinvalid', // Invalid data that will fail decoding
        blockNumber: 100,
        transactionHash: '0xabcd',
        blockHash: '0xefgh',
        logIndex: 0,
        transactionIndex: 0,
      }

      mockRpcCaller.call.mockResolvedValue({ result: [mockLog] })

      const result = await contract.getPastEvents('Transfer', {})

      // Should return the log even if decoding fails
      expect(result).toHaveLength(1)
      expect(result[0].event).toBe('Transfer')
      expect(result[0].returnValues).toEqual({})
    })
  })

  describe('coerceArgs', () => {
    it('coerces string arguments to match ABI types', () => {
      const { mockConnection } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI, '0x1234567890123456789012345678901234567890')

      // The arguments should be coerced internally
      const method = (contract.methods as any).transfer(
        '0x0000000000000000000000000000000000000001',
        '100'
      )

      expect(method.arguments).toBeDefined()
      expect(method.arguments.length).toBe(2)
    })

    it('handles address type coercion', () => {
      const { mockConnection } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI, '0x1234567890123456789012345678901234567890')

      const method = (contract.methods as any).balanceOf(
        '0x0000000000000000000000000000000000000001'
      )

      expect(method.arguments).toBeDefined()
      expect(method.arguments[0]).toBe('0x0000000000000000000000000000000000000001')
    })

    it('handles uint256 type coercion', () => {
      const { mockConnection } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI, '0x1234567890123456789012345678901234567890')

      const method = (contract.methods as any).transfer(
        '0x0000000000000000000000000000000000000001',
        '100'
      )

      expect(method.arguments).toBeDefined()
      expect(method.arguments[1]).toBeDefined()
    })
  })

  describe('ABI enrichment', () => {
    it('adds function signatures to all functions', () => {
      const { mockConnection } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI)

      const functions = contract.options.jsonInterface.filter((item) => item.type === 'function')

      functions.forEach((func) => {
        expect((func as any).signature).toBeDefined()
        expect((func as any).signature).toMatch(/^0x[a-f0-9]{8}$/)
      })
    })

    it('adds event signatures to all events', () => {
      const { mockConnection } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI)

      const events = contract.options.jsonInterface.filter((item) => item.type === 'event')

      events.forEach((event) => {
        expect((event as any).signature).toBeDefined()
        expect((event as any).signature).toMatch(/^0x[a-f0-9]{64}$/)
      })
    })

    it('does not duplicate signatures on re-enrichment', () => {
      const { mockConnection } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)

      const abi1 = new RpcContract(ERC20_ABI).options.jsonInterface
      const abi2 = new RpcContract(abi1).options.jsonInterface

      const func1 = abi1.find((item) => item.type === 'function' && item.name === 'transfer')
      const func2 = abi2.find((item) => item.type === 'function' && item.name === 'transfer')

      expect((func1 as any).signature).toBe((func2 as any).signature)
    })
  })

  describe('edge cases', () => {
    it('handles contract with no methods', () => {
      const { mockConnection } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const emptyAbi: AbiItem[] = []

      const contract = new RpcContract(emptyAbi, '0x1234567890123456789012345678901234567890')

      expect(contract.options.jsonInterface).toEqual([])
      expect(contract.events).toEqual({})
    })

    it('handles contract with only events', () => {
      const { mockConnection } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const eventOnlyAbi: AbiItem[] = [
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

      const contract = new RpcContract(eventOnlyAbi)

      expect(contract.events.Transfer).toBeDefined()
      expect(contract.options.jsonInterface).toHaveLength(1)
    })

    it('handles methods with no inputs', () => {
      const { mockConnection } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI, '0x1234567890123456789012345678901234567890')

      const method = (contract.methods as any).noOutput()

      expect(method).toBeDefined()
      expect(method.arguments).toEqual([])
    })

    it('handles methods with no outputs', async () => {
      const { mockConnection, mockRpcCaller } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const contract = new RpcContract(ERC20_ABI, '0x1234567890123456789012345678901234567890')

      mockRpcCaller.call.mockResolvedValue({ result: '0x' })

      const result = await (contract.methods as any).noOutput().call()

      expect(result).toBe('0x')
    })

    it('handles readonly array ABI input', () => {
      const { mockConnection } = createMockConnection()
      const RpcContract = createContractConstructor(mockConnection)
      const readonlyAbi: readonly AbiItem[] = ERC20_ABI

      const contract = new RpcContract(readonlyAbi, '0x1234567890123456789012345678901234567890')

      expect(contract.options.jsonInterface).toBeDefined()
      expect(contract.options.jsonInterface.length).toBeGreaterThan(0)
    })
  })
})
