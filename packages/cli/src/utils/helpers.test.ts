import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import { enumEntriesDupWithLowercase, nodeIsSynced } from './helpers'

testWithAnvilL2('nodeIsSynced', (web3) => {
  describe('when NO_SYNCCHECK is set', () => {
    it('returns true', async () => {
      // Arrange
      process.env.NO_SYNCCHECK = 'true'
      // Act
      const result = await nodeIsSynced(web3)
      // Assert
      expect(result).toBe(true)
    })
  })
})

testWithAnvilL2('nodeIsSynced', (web3) => {
  beforeEach(() => {
    process.env.NO_SYNCCHECK = undefined
  })
  afterEach(() => {
    process.env.NO_SYNCCHECK = 'true'
  })
  describe('when syncing is done', () => {
    it('returns true', async () => {
      const syncSpy = jest.spyOn(web3.eth, 'isSyncing').mockResolvedValue(false)
      const blockSpy = jest
        .spyOn(web3.eth, 'getBlock')
        // @ts-expect-error block has more properties but that are not used in the test
        .mockResolvedValue({ number: 1, timestamp: (Date.now() / 1000).toString() })
      // Act
      const result = await nodeIsSynced(web3)
      // Assert
      expect(syncSpy).toHaveBeenCalled()
      expect(blockSpy).toHaveBeenCalled()
      expect(result).toBe(true)
    })
  })
  describe('when syncing is happening', () => {
    it('returns false', async () => {
      const syncSpy = jest.spyOn(web3.eth, 'isSyncing').mockResolvedValue(true)

      // Act
      const result = await nodeIsSynced(web3)
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
