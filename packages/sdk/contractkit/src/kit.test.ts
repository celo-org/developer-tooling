import { CeloTx } from '@celo/connect'
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

interface TransactionObjectStub {
  arguments: any[]
  call: () => never
  encodeABI: () => string
  estimateGas: jest.Mock<Promise<number>, []>
  send: jest.Mock<Promise<string>, [CeloTx | undefined]>
  sendMock: jest.Mock<Promise<string>, [CeloTx | undefined]>
  estimateGasMock: jest.Mock<Promise<number>, []>
  _parent: { _address: string }
}

export function txoStub(): TransactionObjectStub {
  const estimateGasMock = jest.fn()
  const fakeTxHash = '0x' + 'a'.repeat(64)
  const sendMock = jest.fn().mockReturnValue(Promise.resolve(fakeTxHash))

  const pe: TransactionObjectStub = {
    arguments: [],
    call: () => {
      throw new Error('not implemented')
    },
    encodeABI: () => '0x1234',
    estimateGas: estimateGasMock,
    send: sendMock,
    sendMock,
    estimateGasMock,
    _parent: { _address: '0x' + '0'.repeat(40) },
  }
  return pe
}

;[newFullKitFromProvider, newMiniKitFromProvider].forEach((newKitFromProviderFn) => {
  describe('kit.sendTransactionObject()', () => {
    const kit = newKitFromProviderFn(getProviderForKit('http://', undefined))

    // sendTransactionObject now uses encodeABI() + sendTransactionViaProvider()
    // rather than txo.send(), so we mock sendTransactionViaProvider to prevent
    // actual network calls and to assert on the tx params passed through.
    let sendViaProviderSpy: jest.SpyInstance
    beforeEach(() => {
      sendViaProviderSpy = jest
        .spyOn(kit.connection as any, 'sendTransactionViaProvider')
        .mockReturnValue({
          getHash: jest.fn().mockResolvedValue('0x' + 'a'.repeat(64)),
          waitReceipt: jest.fn().mockResolvedValue({ status: true }),
        })
    })
    afterEach(() => {
      sendViaProviderSpy.mockRestore()
    })

    test('should send transaction on simple case', async () => {
      const txo = txoStub()
      txo.estimateGasMock.mockResolvedValue(1000)
      await kit.connection.sendTransactionObject(txo)
      // Gas is inflated by defaultGasInflationFactor (1.3)
      expect(sendViaProviderSpy).toHaveBeenCalledTimes(1)
    })

    test('should not estimateGas if gas is provided', async () => {
      const txo = txoStub()
      await kit.connection.sendTransactionObject(txo, { gas: 555 })
      expect(txo.estimateGasMock).not.toBeCalled()
    })

    test('should use inflation factor on gas', async () => {
      const txo = txoStub()
      txo.estimateGasMock.mockResolvedValue(1000)
      kit.connection.defaultGasInflationFactor = 2
      await kit.connection.sendTransactionObject(txo)
      expect(sendViaProviderSpy).toBeCalledWith(
        expect.objectContaining({
          gas: 1000 * 2,
        })
      )
    })

    test('should forward txoptions to sendTransactionViaProvider()', async () => {
      const txo = txoStub()
      await kit.connection.sendTransactionObject(txo, { gas: 555, from: '0xAAFFF' })
      expect(sendViaProviderSpy).toBeCalledWith(
        expect.objectContaining({
          feeCurrency: undefined,
          gas: 555,
          from: '0xAAFFF',
        })
      )
    })

    test('works with maxFeePerGas and maxPriorityFeePerGas', async () => {
      const txo = txoStub()
      await kit.connection.sendTransactionObject(txo, {
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
      const txo = txoStub()
      await kit.connection.sendTransactionObject(txo, {
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
      send(_payload: any, _callback: any) {
        // noop
      },
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

      await epochManagerWrapper.startNextEpochProcess().sendAndWaitForReceipt({
        from: accounts[0],
      })

      await (await epochManagerWrapper.finishNextEpochProcessTx()).sendAndWaitForReceipt({
        from: accounts[0],
      })
    })

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
