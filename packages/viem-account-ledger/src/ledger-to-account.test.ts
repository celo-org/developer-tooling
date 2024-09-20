import * as ledger from './ledger-to-account'
import { mockLedger } from './test-utils'

const { ledgerToAccount } = ledger

beforeAll(() => {
  jest.spyOn(ledger, 'generateLedger').mockImplementation(() => Promise.resolve(mockLedger()))
})

describe('ledgerToAccount', () => {
  it('can be setup', async () => {
    await expect(
      ledgerToAccount({
        // @ts-expect-error
        transport: undefined,
      })
    ).resolves.not.toBe(undefined)
  })

  it('signs txs', async () => {
    const account = await ledgerToAccount({
      // @ts-expect-error
      transport: undefined,
    })

    await expect(
      account.signTransaction({
        to: '0x123',
        value: BigInt(123),
      })
    ).resolves.toMatchInlineSnapshot()
  })
})
