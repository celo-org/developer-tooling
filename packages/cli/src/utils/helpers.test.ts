import { CeloClient } from '@celo/actions/setup'
import { viem_testWithAnvil } from '@celo/dev-utils/lib/viem/anvil-test'
import { enumEntriesDupWithLowercase, nodeIsSynced } from './helpers'

viem_testWithAnvil('nodeIsSynced', (client) => {
  describe('when NO_SYNCCHECK is set', () => {
    it('returns true', async () => {
      // Arrange
      process.env.NO_SYNCCHECK = 'true'
      // Act
      const result = await nodeIsSynced(client as CeloClient)
      // Assert
      expect(result).toBe(true)
    })
  })
})

viem_testWithAnvil('nodeIsSynced', (client) => {
  beforeEach(() => {
    process.env.NO_SYNCCHECK = undefined
  })
  afterEach(() => {
    process.env.NO_SYNCCHECK = 'true'
  })
  describe('when syncing is done', () => {
    it('returns true', async () => {
      const syncSpy = jest.spyOn(client, 'request').mockResolvedValueOnce(false)
      const blockSpy = jest
        .spyOn(client, 'getBlock')
        // @ts-expect-error block has more properties but that are not used in the test
        .mockResolvedValueOnce({ number: 1n, timestamp: BigInt(Date.now()) / 1000n })
      // Act
      const result = await nodeIsSynced(client as CeloClient)
      // Assert
      expect(syncSpy).toHaveBeenCalled()
      expect(blockSpy).toHaveBeenCalled()
      expect(result).toBe(true)
    })
  })
  describe('when syncing is happening', () => {
    it('returns false', async () => {
      const syncSpy = jest.spyOn(client, 'request').mockResolvedValueOnce(true)

      // Act
      const result = await nodeIsSynced(client as CeloClient)
      // Assert
      expect(syncSpy).toHaveBeenCalled()
      expect(result).toBe(false)
    })
  })
})

describe('enumEntriesDupWithLowercase', () => {
  it('duplicates entries with lowercase keys', () => {
    // Arrange
    const entries = [
      ['Key1', 1],
      ['Key2', 2],
    ] as [string, number][]
    // Act
    const result = enumEntriesDupWithLowercase(entries)
    // Assert
    expect(result).toEqual({
      Key1: 1,
      key1: 1,
      Key2: 2,
      key2: 2,
    })
  })

  it('handles empty entries', () => {
    // Arrange
    const entries: [string, number][] = []
    // Act
    const result = enumEntriesDupWithLowercase(entries)
    // Assert
    expect(result).toEqual({})
  })
})
