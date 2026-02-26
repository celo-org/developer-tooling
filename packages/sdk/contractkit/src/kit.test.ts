import { CeloTx, CeloTxObject, CeloTxReceipt, PromiEvent } from '@celo/connect'
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
import { promiEventSpy } from './test-utils/PromiEventStub'
import { startAndFinishEpochProcess } from './test-utils/utils'

interface TransactionObjectStub<T> extends CeloTxObject<T> {
  sendMock: jest.Mock<PromiEvent<any>, [CeloTx | undefined]>
  estimateGasMock: jest.Mock<Promise<number>, []>
  resolveHash(hash: string): void
  resolveReceipt(receipt: CeloTxReceipt): void
  rejectHash(error: any): void
  rejectReceipt(receipt: CeloTxReceipt, error: any): void
}

export function txoStub<T>(): TransactionObjectStub<T> {
  const estimateGasMock = jest.fn()
  const peStub = promiEventSpy()
  const sendMock = jest.fn().mockReturnValue(peStub)

  const pe: TransactionObjectStub<T> = {
    arguments: [],
    call: () => {
      throw new Error('not implemented')
    },
    encodeABI: () => {
      throw new Error('not implemented')
    },
    estimateGas: estimateGasMock,
    send: sendMock,
    sendMock,
    estimateGasMock,
    resolveHash: peStub.resolveHash,
    rejectHash: peStub.rejectHash,
    resolveReceipt: peStub.resolveReceipt,
    rejectReceipt: peStub.resolveReceipt,
    _parent: jest.fn() as any,
  }
  return pe
}

;[newFullKitFromProvider, newMiniKitFromProvider].forEach((newKitFromProviderFn) => {
  describe('kit.sendTransactionObject()', () => {
    const kit = newKitFromProviderFn(getProviderForKit('http://', undefined))

    test('should send transaction on simple case', async () => {
      const txo = txoStub()
      txo.estimateGasMock.mockResolvedValue(1000)
      const txRes = await kit.connection.sendTransactionObject(txo)

      txo.resolveHash('HASH')
      txo.resolveReceipt('Receipt' as any)

      await expect(txRes.getHash()).resolves.toBe('HASH')
      await expect(txRes.waitReceipt()).resolves.toBe('Receipt')
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
      expect(txo.send).toBeCalledWith(
        expect.objectContaining({
          gas: 1000 * 2,
        })
      )
    })

    test('should forward txoptions to txo.send()', async () => {
      const txo = txoStub()
      await kit.connection.sendTransactionObject(txo, { gas: 555, from: '0xAAFFF' })
      expect(txo.send).toBeCalledWith({
        feeCurrency: undefined,
        gas: 555,
        from: '0xAAFFF',
      })
    })

    test('works with maxFeePerGas and maxPriorityFeePerGas', async () => {
      const txo = txoStub()
      await kit.connection.sendTransactionObject(txo, {
        gas: 1000,
        maxFeePerGas: 555,
        maxPriorityFeePerGas: 555,
        from: '0xAAFFF',
      })
      expect(txo.send).toBeCalledWith({
        feeCurrency: undefined,
        maxFeePerGas: 555,
        maxPriorityFeePerGas: 555,
        gas: 1000,
        from: '0xAAFFF',
      })
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
      expect(txo.send).toBeCalledWith({
        gas: 1000,
        maxFeePerGas: 555,
        maxPriorityFeePerGas: 555,
        feeCurrency: '0xe8537a3d056da446677b9e9d6c5db704eaab4787',
        from: '0xAAFFF',
      })
    })
  })
})

describe('newKitWithApiKey()', () => {
  test('should create kit with apiKey', async () => {
    const kit = newKitWithApiKey('http://', 'key')
    expect(kit).toBeDefined()
    expect(kit.connection).toBeDefined()
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
    expect(kit.connection).toBeDefined()
  })
})

testWithAnvilL2('kit', (providerOwner) => {
  let kit: ContractKit

  beforeAll(async () => {
    kit = newKitFromProvider(providerOwner.currentProvider)
  })

  describe('epochs', () => {
    let epochDuration: number

    beforeEach(async () => {
      const epochManagerWrapper = await kit.contracts.getEpochManager()
      epochDuration = await epochManagerWrapper.epochDuration()

      // Go 3 epochs ahead
      for (let i = 0; i < 3; i++) {
        await timeTravel(epochDuration * 2, providerOwner)
        await startAndFinishEpochProcess(kit)
      }

      await timeTravel(epochDuration * 2, providerOwner)

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
