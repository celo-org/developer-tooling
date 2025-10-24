import { describe, expect, it, test, vi } from 'vitest'
import { ACCOUNT_ADDRESS1, mockLedger } from './test-utils'
import {
  assertCompat,
  checkForKnownToken,
  meetsVersionRequirements,
  readAppName,
  transportErrorFriendlyMessage,
} from './utils.js'

const TEST_CHAIN_ID = 11142220

describe('utils', () => {
  describe('transportErrorFriendlyMessage', () => {
    test('26368', () => {
      const error = new Error('Test error')
      // @ts-expect-error
      error.statusCode = 26368
      expect(() => transportErrorFriendlyMessage(error)).toThrowErrorMatchingInlineSnapshot(
        `[Error: Possible connection lost with the ledger. Check if still on and connected. Test error]`
      )
    })
    test('26628', () => {
      const error = new Error('Test error')
      // @ts-expect-error
      error.statusCode = 26628
      expect(() => transportErrorFriendlyMessage(error)).toThrowErrorMatchingInlineSnapshot(
        `[Error: Possible connection lost with the ledger. Check if still on and connected. Test error]`
      )
    })
    test('NoDevice', () => {
      const error = new Error('NoDevice')
      expect(() => transportErrorFriendlyMessage(error)).toThrowErrorMatchingInlineSnapshot(
        `[Error: Possible connection lost with the ledger. Check if still on and connected. NoDevice]`
      )
    })
    test('other', () => {
      const error = new Error('Test error')
      expect(() => transportErrorFriendlyMessage(error)).toThrowErrorMatchingInlineSnapshot(
        `[Error: Test error]`
      )
    })
  })

  describe('meetsVersionRequirements', () => {
    it('checks if the version is within bounds', () => {
      expect(meetsVersionRequirements('1.1.1', { minimum: '1.0.0', maximum: '2.0.0' })).toBe(true)
      expect(meetsVersionRequirements('1.1.1', { minimum: '1.1.1', maximum: '2.0.0' })).toBe(true)
      expect(meetsVersionRequirements('1.1.1', { minimum: '1.0.0', maximum: '1.1.1' })).toBe(true)
      expect(meetsVersionRequirements('1.1.1', { minimum: '1.0.0' })).toBe(true)
      expect(meetsVersionRequirements('0.0.1', { maximum: '2.0.0' })).toBe(true)
      expect(meetsVersionRequirements('1.1.1', { minimum: '2.0.0', maximum: '3.0.0' })).toBe(false)
    })
  })

  describe('readAppName', () => {
    it('works', async () => {
      await expect(readAppName(mockLedger({ name: 'unknown' }))).resolves.toMatchInlineSnapshot(
        `"unknown"`
      )
      await expect(
        readAppName(mockLedger({ version: '1.0.0', name: 'Ethereum' }))
      ).resolves.toMatchInlineSnapshot(`"ethereum"`)
      await expect(readAppName(mockLedger({ name: 'Celo' }))).resolves.toMatchInlineSnapshot(
        `"celo"`
      )
    })
  })

  describe('assertCompat', () => {
    it('warns if it doesnt enable `arbitraryDataEnabled`', async () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
      await expect(assertCompat(mockLedger({ arbitraryDataEnabled: 0 }))).resolves.toBeTruthy()
      expect(warn.mock.lastCall).toMatchInlineSnapshot(`
        [
          "Beware, your ledger does not allow the use of contract data. Some features may not work correctly, including token transfers. You can enable it from the ledger app settings.",
        ]
      `)
    })
    it('warns if it using Ethereum', async () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
      await expect(assertCompat(mockLedger({ name: 'ethereum' }))).resolves.toBeTruthy()
      expect(warn.mock.lastCall).toMatchInlineSnapshot(`
        [
          "Beware, you opened the Ethereum app instead of the Celo app. Some features may not work correctly, including token transfers.",
        ]
      `)
    })
    it('warns if it using with unknown apps', async () => {
      const error = vi.spyOn(console, 'error').mockImplementation(() => undefined)
      await expect(assertCompat(mockLedger({ name: 'unknown' }))).resolves.toBeTruthy()
      expect(error.mock.lastCall).toMatchInlineSnapshot(`
        [
          "
        ---
        Beware, you opened the unknown app instead of the Celo app. We cannot ensure the safety of using this SDK with unknown. USE AT YOUR OWN RISK.
        ---
        ",
        ]
      `)
    })
    it('works', async () => {
      await expect(assertCompat(mockLedger())).resolves.toBeTruthy()
    })
  })

  describe('checkForKnownToken', () => {
    const ledger = mockLedger()

    it('works', async () => {
      const spy = vi.spyOn(ledger, 'provideERC20TokenInformation')
      const USDCToken = '0x01c5c0122039549ad1493b8220cabedd739bc44e'
      const USDCAdapter = '0xbf1441Ea57f43f35f713431001f35742c88071c7'
      const cEUR = '0x6B172e333e2978484261D7eCC3DE491E79764BbC'

      await expect(
        checkForKnownToken(ledger, {
          to: ACCOUNT_ADDRESS1,
          chainId: TEST_CHAIN_ID,
          feeCurrency: USDCAdapter,
        })
      ).resolves.toBeUndefined()
      expect(spy.mock.calls.length).toBe(1)
      spy.mockClear()

      await expect(
        checkForKnownToken(ledger, {
          to: cEUR,
          chainId: TEST_CHAIN_ID,
        })
      ).resolves.toBeUndefined()
      expect(spy.mock.calls.length).toBe(1)
      spy.mockClear()

      await expect(
        checkForKnownToken(ledger, {
          to: USDCToken,
          chainId: TEST_CHAIN_ID,
          feeCurrency: cEUR,
        })
      ).resolves.toBeUndefined()
      expect(spy.mock.calls.length).toBe(2)
    })
  })
})
