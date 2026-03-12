import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { timeTravel } from '@celo/dev-utils/ganache-test'

import {
  ContractKit,
  newKitFromProvider as newFullKitFromProvider,
  newKitFromProvider,
  newKitWithApiKey,
} from './kit'
import { newKitFromProvider as newMiniKitFromProvider } from './mini-kit'
import { getProviderForKit } from './setupForKits'
import { startAndFinishEpochProcess } from './test-utils/utils'

;[newFullKitFromProvider, newMiniKitFromProvider].forEach((newKitFromProviderFn) => {
  describe('kit.sendTransaction()', () => {
    const kit = newKitFromProviderFn(getProviderForKit('http://', undefined))

    const txData = { to: '0x' + '0'.repeat(40), data: '0x1234' as `0x${string}` }

    // Mock sendTransactionViaProvider to prevent actual network calls
    // and to assert on the tx params passed through.
    let sendViaProviderSpy: jest.SpyInstance
    let estimateGasSpy: jest.SpyInstance
    beforeEach(() => {
      sendViaProviderSpy = jest
        .spyOn(kit.connection as any, 'sendTransactionViaProvider')
        .mockResolvedValue('0x' + 'a'.repeat(64))
      estimateGasSpy = jest
        .spyOn(kit.connection, 'estimateGasWithInflationFactor')
        .mockResolvedValue(1000)
    })
    afterEach(() => {
      sendViaProviderSpy.mockRestore()
      estimateGasSpy.mockRestore()
    })

    test('should send transaction on simple case', async () => {
      await kit.connection.sendTransaction(txData)
      expect(sendViaProviderSpy).toHaveBeenCalledTimes(1)
    })

    test('should not estimateGas if gas is provided', async () => {
      await kit.connection.sendTransaction({ ...txData, gas: 555 })
      expect(estimateGasSpy).not.toBeCalled()
    })

    test('should use inflation factor on gas', async () => {
      estimateGasSpy.mockResolvedValue(2000)
      await kit.connection.sendTransaction(txData)
      expect(sendViaProviderSpy).toBeCalledWith(
        expect.objectContaining({
          gas: 2000,
        })
      )
    })

    test('should forward tx params to sendTransactionViaProvider()', async () => {
      await kit.connection.sendTransaction({ ...txData, gas: 555, from: '0xAAFFF' })
      expect(sendViaProviderSpy).toBeCalledWith(
        expect.objectContaining({
          feeCurrency: undefined,
          gas: 555,
          from: '0xAAFFF',
        })
      )
    })

    test('works with maxFeePerGas and maxPriorityFeePerGas', async () => {
      await kit.connection.sendTransaction({
        ...txData,
        gas: 1000,
        maxFeePerGas: 555,
        maxPriorityFeePerGas: 555,
        from: '0xAAFFF',
      })
      expect(sendViaProviderSpy).toBeCalledWith(
        expect.objectContaining({
          feeCurrency: undefined,
          maxFeePerGas: 555,
          maxPriorityFeePerGas: 555,
          gas: 1000,
          from: '0xAAFFF',
        })
      )
    })

    test('when maxFeePerGas and maxPriorityFeePerGas and feeCurrency', async () => {
      await kit.connection.sendTransaction({
        ...txData,
        gas: 1000,
        maxFeePerGas: 555,
        maxPriorityFeePerGas: 555,
        feeCurrency: '0xe8537a3d056da446677b9e9d6c5db704eaab4787',
        from: '0xAAFFF',
      })
      expect(sendViaProviderSpy).toBeCalledWith(
        expect.objectContaining({
          gas: 1000,
          maxFeePerGas: 555,
          maxPriorityFeePerGas: 555,
          feeCurrency: '0xe8537a3d056da446677b9e9d6c5db704eaab4787',
          from: '0xAAFFF',
        })
      )
    })
  })
})

describe('newKitWithApiKey()', () => {
  test('should create kit with apiKey', async () => {
    // Spy on setupAPIKey to verify it's called with the correct API key
    const setupAPIKeySpy = jest.spyOn(require('./setupForKits'), 'setupAPIKey')
    try {
      const kit = newKitWithApiKey('http://localhost:8545', 'key')
      expect(kit).toBeDefined()
      expect(kit.connection.currentProvider).toBeDefined()
      // Verify that setupAPIKey was called with the correct API key
      expect(setupAPIKeySpy).toHaveBeenCalledWith('key')
    } finally {
      setupAPIKeySpy.mockRestore()
    }
  })
})

describe('newKitFromProvider()', () => {
  test('should create a kit from a provider', () => {
    const provider = {
      request: (async () => {
        // noop
      }) as any,
    }
    const kit = newKitFromProvider(provider)
    expect(kit).toBeDefined()
    expect(kit.connection.currentProvider).toBeDefined()
  })
})

testWithAnvilL2('kit', (provider) => {
  let kit: ContractKit

  beforeAll(async () => {
    kit = newKitFromProvider(provider)
  })

  describe('epochs', () => {
    let epochDuration: number

    beforeEach(async () => {
      const epochManagerWrapper = await kit.contracts.getEpochManager()
      epochDuration = await epochManagerWrapper.epochDuration()

      // Go 3 epochs ahead
      for (let i = 0; i < 3; i++) {
        await timeTravel(epochDuration * 2, provider)
        await startAndFinishEpochProcess(kit)
      }

      await timeTravel(epochDuration * 2, provider)

      const accounts = await kit.connection.getAccounts()

      await epochManagerWrapper.startNextEpochProcess({ from: accounts[0] })

      await epochManagerWrapper.finishNextEpochProcessTx({ from: accounts[0] })
    }, 300000)

    it('gets the current epoch size', async () => {
      expect(await kit.getEpochSize()).toEqual(epochDuration)
    })

    it('gets first and last block number of an epoch', async () => {
      const epochManagerWrapper = await kit.contracts.getEpochManager()
      const firstKnown = await epochManagerWrapper.firstKnownEpoch()

      // The first known epoch should have valid block numbers
      const firstBlock = await kit.getFirstBlockNumberForEpoch(firstKnown)
      const lastBlock = await kit.getLastBlockNumberForEpoch(firstKnown)
      expect(firstBlock).toBeGreaterThan(0)
      expect(lastBlock).toBeGreaterThan(firstBlock)

      // Subsequent epochs that were advanced in beforeEach should also be queryable
      const nextFirst = await kit.getFirstBlockNumberForEpoch(firstKnown + 1)
      const nextLast = await kit.getLastBlockNumberForEpoch(firstKnown + 1)
      expect(nextFirst).toBeGreaterThan(lastBlock)
      expect(nextLast).toBeGreaterThan(nextFirst)
    })

    it('gets the current epoch number', async () => {
      const epochManagerWrapper = await kit.contracts.getEpochManager()
      const firstKnown = await epochManagerWrapper.firstKnownEpoch()
      const firstBlock = await kit.getFirstBlockNumberForEpoch(firstKnown)

      // Block within the first known epoch should return that epoch number
      expect(await kit.getEpochNumberOfBlock(firstBlock)).toEqual(firstKnown)
      expect(await kit.getEpochNumberOfBlock(firstBlock + 1)).toEqual(firstKnown)
    })
  })
})
