import { multiSigABI } from '@celo/abis'
import { MultiSigWrapper } from './MultiSig'

// synthetic fixtures, never touch a chain
const DESTINATION = '0x00000000000000000000000000000000000000d1'
const OTHER_DESTINATION = '0x00000000000000000000000000000000000000d2'
const WANTED_DATA = '0x0000c0de'
const OTHER_DATA = '0x0000beef'
const OWNERS = [
  '0x0000000000000000000000000000000000000001',
  '0x0000000000000000000000000000000000000002',
]

interface FakeTransaction {
  destination: string
  value: bigint
  data: string
  executed: boolean
}

const otherTransaction = (): FakeTransaction => ({
  destination: OTHER_DESTINATION,
  value: BigInt(0),
  data: OTHER_DATA,
  executed: false,
})

const wantedTransaction = (): FakeTransaction => ({
  destination: DESTINATION,
  value: BigInt(0),
  data: WANTED_DATA,
  executed: false,
})

function fakeWrapper(transactions: FakeTransaction[]) {
  const reads = { transactions: 0 }
  const contract = {
    address: '0x00000000000000000000000000000000000000a1',
    abi: multiSigABI,
    read: {
      getTransactionCount: jest.fn().mockResolvedValue(BigInt(transactions.length)),
      transactionCount: jest.fn().mockResolvedValue(BigInt(transactions.length)),
      transactions: jest.fn().mockImplementation(async ([id]: [bigint]) => {
        reads.transactions++
        const tx = transactions[Number(id)]
        return [tx.destination, tx.value, tx.data, tx.executed]
      }),
      getConfirmations: jest.fn().mockResolvedValue(OWNERS),
      getTransactionIds: jest.fn().mockImplementation(async ([from, to]: [bigint, bigint]) => {
        const ids = []
        for (let i = Number(from); i < Number(to); i++) ids.push(BigInt(i))
        return ids
      }),
      getOwners: jest.fn().mockResolvedValue(OWNERS),
      isOwner: jest.fn().mockResolvedValue(true),
      required: jest.fn().mockResolvedValue(BigInt(2)),
      internalRequired: jest.fn().mockResolvedValue(BigInt(1)),
    },
    write: {
      confirmTransaction: jest
        .fn()
        .mockResolvedValue('0x00000000000000000000000000000000000000000000000000000000000000c1'),
      submitTransaction: jest
        .fn()
        .mockResolvedValue('0x00000000000000000000000000000000000000000000000000000000000000c2'),
      replaceOwner: jest
        .fn()
        .mockResolvedValue('0x00000000000000000000000000000000000000000000000000000000000000c3'),
    },
  }
  const connection = { viemClient: {} }
  const wrapper = new MultiSigWrapper(connection as any, contract as any)
  return { wrapper, contract, reads }
}

describe('MultiSigWrapper.getTransactionDataByContent', () => {
  it('finds a recent transaction within the first batch', async () => {
    const transactions = [...Array.from({ length: 30 }, otherTransaction), wantedTransaction()]
    const { wrapper, reads } = fakeWrapper(transactions)

    const result = await wrapper.getTransactionDataByContent(DESTINATION, WANTED_DATA)

    expect(result?.index).toEqual(30)
    expect(result?.confirmations).toEqual(OWNERS)
    // newest-first batching finds it without reading the whole history
    expect(reads.transactions).toBeLessThan(transactions.length)
  })

  it('keeps scanning older batches until it finds the transaction', async () => {
    const transactions = Array.from({ length: 60 }, otherTransaction)
    transactions[3] = wantedTransaction()
    const { wrapper, reads } = fakeWrapper(transactions)

    const result = await wrapper.getTransactionDataByContent(DESTINATION, WANTED_DATA)

    expect(result?.index).toEqual(3)
    expect(reads.transactions).toEqual(60)
  })

  it('returns the most recent transaction when several share the same content', async () => {
    const transactions = Array.from({ length: 40 }, otherTransaction)
    transactions[10] = wantedTransaction()
    transactions[35] = wantedTransaction()
    const { wrapper } = fakeWrapper(transactions)

    const result = await wrapper.getTransactionDataByContent(DESTINATION, WANTED_DATA)

    expect(result?.index).toEqual(35)
  })

  it('returns undefined after scanning everything without a match', async () => {
    const transactions = Array.from({ length: 26 }, otherTransaction)
    const { wrapper, reads } = fakeWrapper(transactions)

    const result = await wrapper.getTransactionDataByContent(DESTINATION, WANTED_DATA)

    expect(result).toBeUndefined()
    expect(reads.transactions).toEqual(26)
  })

  it('matches on value in addition to destination and data', async () => {
    const transactions = [{ ...wantedTransaction(), value: BigInt(7) }]
    const { wrapper } = fakeWrapper(transactions)

    expect(await wrapper.getTransactionDataByContent(DESTINATION, WANTED_DATA)).toBeUndefined()
    expect((await wrapper.getTransactionDataByContent(DESTINATION, WANTED_DATA, 7))?.index).toEqual(
      0
    )
  })
})

describe('MultiSigWrapper.getConfirmations', () => {
  it('returns the confirming owners from a single contract read', async () => {
    const { wrapper } = fakeWrapper([wantedTransaction()])

    expect(await wrapper.getConfirmations(0)).toEqual(OWNERS)
  })
})

describe('MultiSigWrapper.submitOrConfirmTransaction', () => {
  it('confirms the matching pending transaction instead of submitting a new one', async () => {
    const { wrapper, contract } = fakeWrapper([otherTransaction(), wantedTransaction()])

    await wrapper.submitOrConfirmTransaction(DESTINATION, WANTED_DATA)

    expect(contract.write.confirmTransaction).toHaveBeenCalledWith([BigInt(1)], undefined)
    expect(contract.write.submitTransaction).not.toHaveBeenCalled()
  })

  it('submits a new transaction when no pending one matches', async () => {
    const { wrapper, contract } = fakeWrapper([otherTransaction()])

    await wrapper.submitOrConfirmTransaction(DESTINATION, WANTED_DATA)

    expect(contract.write.submitTransaction).toHaveBeenCalled()
    expect(contract.write.confirmTransaction).not.toHaveBeenCalled()
  })
})

describe('MultiSigWrapper reads', () => {
  it('reads transactions with and without confirmations', async () => {
    const { wrapper } = fakeWrapper([wantedTransaction()])

    const withConfirmations = await wrapper.getTransaction(0)
    expect(withConfirmations.confirmations).toEqual(OWNERS)
    expect(withConfirmations.destination).toEqual(DESTINATION)
    expect(withConfirmations.value.toFixed()).toEqual('0')

    expect(await wrapper.getTransactions()).toHaveLength(1)
  })

  it('exposes owners, thresholds and counts', async () => {
    const { wrapper } = fakeWrapper([wantedTransaction(), otherTransaction()])

    expect(await wrapper.getOwners()).toEqual(OWNERS)
    expect(await wrapper.isOwner(OWNERS[0] as any)).toEqual(true)
    expect((await wrapper.getRequired()).toNumber()).toEqual(2)
    expect((await wrapper.getInternalRequired()).toNumber()).toEqual(1)
    expect(await wrapper.totalTransactionCount()).toEqual(2)
    expect(await wrapper.getTransactionCount(true, true)).toEqual(2)
  })

  it('wraps the write helpers', async () => {
    const { wrapper, contract } = fakeWrapper([wantedTransaction()])

    await wrapper.confirmTransaction(0)
    expect(contract.write.confirmTransaction).toHaveBeenCalledWith([BigInt(0)], undefined)

    await wrapper.submitTransaction(DESTINATION, WANTED_DATA)
    expect(contract.write.submitTransaction).toHaveBeenCalled()

    await wrapper.replaceOwner(OWNERS[0] as any, OWNERS[1] as any)
    expect(contract.write.replaceOwner).toHaveBeenCalled()
  })
})
