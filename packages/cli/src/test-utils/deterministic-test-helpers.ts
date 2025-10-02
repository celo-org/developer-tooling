import { HttpRpcCaller } from '@celo/connect'

/**
 * Mock gas prices to be deterministic across environments
 */
export const mockDeterministicGas = () => {
  return jest.spyOn(HttpRpcCaller.prototype, 'call').mockImplementation(async (method, _args) => {
    // Set deterministic gas prices that match CI environment
    if (method === 'eth_gasPrice') {
      return {
        result: '0x5d21dba00', // 25000000000 - deterministic gas price
        id: 1,
        jsonrpc: '2.0',
      }
    }
    if (method === 'eth_maxPriorityFeePerGas') {
      return {
        result: '0x4e3b29200', // 20000000000 - deterministic priority fee
        id: 1,
        jsonrpc: '2.0',
      }
    }
    if (method === 'eth_feeHistory') {
      return {
        result: {
          baseFeePerGas: ['0x5d21dba00'], // Same as gas price
          gasUsedRatio: [0.5],
          reward: [['0x4e3b29200']],
        },
        id: 1,
        jsonrpc: '2.0',
      }
    }
    // For other methods, call through to original implementation
    return HttpRpcCaller.prototype.call.call(this, method, _args)
  })
}

/**
 * Mock balance queries to return deterministic values
 */
export const mockDeterministicBalance = (expectedBalance: string) => {
  return jest.spyOn(HttpRpcCaller.prototype, 'call').mockImplementation(async (method, args) => {
    if (method === 'eth_getBalance') {
      return {
        result: expectedBalance, // Use the expected balance from CI snapshots
        id: 1,
        jsonrpc: '2.0',
      }
    }
    // For other methods, call through to original implementation
    return HttpRpcCaller.prototype.call.call(this, method, args)
  })
}