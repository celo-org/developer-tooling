import { describe, expect, it, test, vi } from 'vitest'
import { ACCOUNT_ADDRESS1, mockLedger, TEST_CHAIN_ID } from './test-utils'
import {
  assertCompat,
  checkForKnownToken,
  meetsVersionRequirements,
  transportErrorFriendlyMessage,
} from './utils.js'

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

  describe('assertCompat', () => {
    it("throws if it doesn't meet the requirements", async () => {
      await expect(assertCompat(mockLedger({ version: '1.0.0' }))).rejects.toMatchInlineSnapshot(
        `[Error: Due to technical issues, we require the users to update their ledger celo-app to >= 1.2.0. You can do this on ledger-live by updating the celo-app in the app catalog.]`
      )
    })
    it('warns if it doesnt enable `arbitraryDataEnabled`', async () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
      await expect(assertCompat(mockLedger({ arbitraryDataEnabled: 0 }))).resolves.toBeTruthy()
      expect(warn.mock.lastCall).toMatchInlineSnapshot(`
        [
          "Beware, your ledger does not allow the use of contract data. Some features may not work correctly, including token transfers. You can enable it from the ledger app settings.",
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
      const cUSDa = '0x874069fa1eb16d44d622f2e0ca25eea172369bc1'
      const cEURa = '0x10c892a6ec43a53e45d0b916b4b7d383b1b78c0f'

      await expect(
        checkForKnownToken(ledger, {
          to: ACCOUNT_ADDRESS1,
          chainId: TEST_CHAIN_ID,
          feeCurrency: cUSDa,
        })
      ).resolves.toBeUndefined()
      expect(spy.mock.calls.length).toBe(1)
      spy.mockClear()

      await expect(
        checkForKnownToken(ledger, {
          to: cEURa,
          chainId: TEST_CHAIN_ID,
        })
      ).resolves.toBeUndefined()
      expect(spy.mock.calls.length).toBe(1)
      spy.mockClear()

      await expect(
        checkForKnownToken(ledger, {
          to: cUSDa,
          chainId: TEST_CHAIN_ID,
          feeCurrency: cEURa,
        })
      ).resolves.toBeUndefined()
      expect(spy.mock.calls.length).toBe(2)
    })
  })
})
