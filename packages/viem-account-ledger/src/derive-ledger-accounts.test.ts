import { beforeEach, describe, expect, it, vi } from 'vitest'
import { deriveLedgerAccounts } from './derive-ledger-accounts'
import * as LedgerAccount from './ledger-to-account'
import { mockLedger } from './test-utils'
import { AddressValidation } from './types'
import { generateLedger } from './utils'

vi.mock('./utils', () => ({
  generateLedger: vi.fn().mockImplementation(() => {
    return mockLedger()
  }),
}))

describe('deriveLedgerAccounts', () => {
  let ledgerToAccount
  beforeEach(() => {
    vi.clearAllMocks()
    ledgerToAccount = vi.spyOn(LedgerAccount, 'ledgerToAccount')
  })

  it('derives accounts for default params', async () => {
    const accounts = await deriveLedgerAccounts({
      transport: {} as any,
    })
    expect(generateLedger).toHaveBeenCalled()
    expect(ledgerToAccount).toHaveBeenCalledTimes(1)
    expect(accounts[0].address).toMatch(/^0x/)
  })

  it('derives accounts for multiple indexes and changes', async () => {
    const accounts = await deriveLedgerAccounts({
      transport: {} as any,
      derivationPathIndexes: [0, 1, 2, 3],
      ledgerAddressValidation: AddressValidation.never,
    })
    expect(ledgerToAccount).toHaveBeenCalledTimes(4)
    expect(accounts).toHaveLength(4)
    expect(accounts[0].address).toMatchInlineSnapshot(
      `"0x1be31a94361a391bbafb2a4ccd704f57dc04d4bb"`
    )
    expect(accounts[1].address).toMatchInlineSnapshot(
      `"0x588e4b68193001e4d10928660ab4165b813717c0"`
    )
    expect(accounts[2].address).toMatchInlineSnapshot(
      `"0x78a564c5367b32d32734dccad0c7f64975e57d26"`
    )
    expect(accounts[3].address).toMatchInlineSnapshot(
      `"0x06b3d71ad946bc14661c050a65a2746fbb8956b0"`
    )
  })

  it('throws if derivationPathIndexes is empty', async () => {
    await expect(
      deriveLedgerAccounts({
        transport: {} as any,
        derivationPathIndexes: [],
      })
    ).rejects.toThrow(/No address index provided/)
  })

  it('throws if changeIndexes is empty', async () => {
    await expect(
      deriveLedgerAccounts({
        transport: {} as any,
        changeIndexes: [],
      })
    ).rejects.toThrow(/No change index provided/)
  })

  it('throws if derivationPathIndexes contains invalid value', async () => {
    await expect(
      deriveLedgerAccounts({
        transport: {} as any,
        derivationPathIndexes: [-1],
      })
    ).rejects.toThrow(/Invalid address index provided/)
  })

  it('throws if changeIndexes contains invalid value', async () => {
    await expect(
      deriveLedgerAccounts({
        transport: {} as any,
        changeIndexes: [1.5],
      })
    ).rejects.toThrow(/Invalid change index provided/)
  })

  it('iterates hardened account indexes for Ledger Live paths', async () => {
    // Index ≥1 distinguishes m/44'/60'/N'/0/0 from iterating change (m/44'/60'/0'/N/0).
    ledgerToAccount.mockResolvedValue({
      address: '0x1be31a94361a391bbafb2a4ccd704f57dc04d4bb',
    })
    await deriveLedgerAccounts({
      transport: {} as any,
      derivationPathIndexes: [0],
      changeIndexes: [0],
      accountIndexes: [0, 1, 2],
      baseDerivationPath: "m/44'/60'/0'",
    })
    expect(ledgerToAccount).toHaveBeenCalledTimes(3)
    expect(
      ledgerToAccount.mock.calls.map(([{ baseDerivationPath, derivationPathIndex }]) => {
        return `${baseDerivationPath}/${derivationPathIndex}`
      })
    ).toEqual(["44'/60'/0'/0/0", "44'/60'/1'/0/0", "44'/60'/2'/0/0"])
  })

  it('does not iterate the account component when accountIndexes is omitted', async () => {
    ledgerToAccount.mockResolvedValue({
      address: '0x1be31a94361a391bbafb2a4ccd704f57dc04d4bb',
    })
    await deriveLedgerAccounts({
      transport: {} as any,
      derivationPathIndexes: [0],
      changeIndexes: [0],
      baseDerivationPath: "m/44'/60'/5'",
    })
    expect(ledgerToAccount).toHaveBeenCalledTimes(1)
    expect(ledgerToAccount).toHaveBeenCalledWith(
      expect.objectContaining({
        derivationPathIndex: 0,
        baseDerivationPath: "44'/60'/5'/0",
      })
    )
  })

  it('throws if accountIndexes is empty', async () => {
    await expect(
      deriveLedgerAccounts({
        transport: {} as any,
        accountIndexes: [],
      })
    ).rejects.toThrow(/No account index provided/)
  })

  it('throws if accountIndexes contains invalid value', async () => {
    await expect(
      deriveLedgerAccounts({
        transport: {} as any,
        accountIndexes: [-1],
      })
    ).rejects.toThrow(/Invalid account index provided/)
  })
})
