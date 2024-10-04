import TransportNodeHid from '@ledgerhq/hw-transport-node-hid'
import { ledgerToAccount } from './ledger-to-account.js'
import { mockLedger, TEST_CHAIN_ID } from './test-utils.js'
import { vi, describe, it, test, expect } from 'vitest'

vi.mock('./utils.js', async () => {
  const module = await vi.importActual('./utils.js')

  return {
    ...module,
    generateLedger: vi.fn(() => Promise.resolve(mockLedger())),
  }
})

const transport =
  process.env.USE_PHYSICAL_LEDGER === 'true'
    ? TransportNodeHid.open('')
    : Promise.resolve(undefined as unknown as TransportNodeHid)

describe('ledgerToAccount', () => {
  it.only('can be setup', async () => {
    await expect(
      ledgerToAccount({
        transport: await transport,
      })
    ).resolves.not.toBe(undefined)
    // expect((generateLedger as ReturnType<(typeof jest)['fn']>).mock.calls.length).toBe(1)
  })

  describe('signs txs', () => {
    const txData = {
      to: '0x1234567890123456789012345678901234567890',
      value: BigInt(123),
      chainId: TEST_CHAIN_ID,
      nonce: 42,
      maxFeePerGas: BigInt(100),
      maxPriorityFeePerGas: BigInt(100),
    } as const

    test('eip1559', async () => {
      const account = await ledgerToAccount({
        transport: await transport,
      })
      await expect(account.signTransaction(txData)).resolves.toMatchInlineSnapshot(
        `"0x02f86282aef32a6464809412345678901234567890123456789012345678907b80c080a05e130d8edb38e3ee8ab283af7c03a2579598b9a77807d7d796060358787d4707a07219dd22fe3bf3fe57682041d8f80dc9909cd70d903163b077d19625c4cd6e67"`
      )
    })

    test('cip64', async () => {
      const account = await ledgerToAccount({
        transport: await transport,
      })
      const cUSDa = '0x874069fa1eb16d44d622f2e0ca25eea172369bc1'
      await expect(
        account.signTransaction({
          ...txData,

          feeCurrency: cUSDa,
        })
      ).resolves.toMatchInlineSnapshot(
        `"0x7bf87782aef32a6464809412345678901234567890123456789012345678907b80c094874069fa1eb16d44d622f2e0ca25eea172369bc180a017d8df83b40dc645b60142280613467ca92438ff5aa0811a6ceff399fe66d661a02efe4eea14146f41d4f776bec1ededc486ddee37cea8304d297a69dbf27c4089"`
      )
    })
  })

  it('signs messages', async () => {
    const account = await ledgerToAccount({
      transport: await transport,
    })
    await expect(account.signMessage({ message: 'Hello World' })).resolves.toMatchInlineSnapshot(
      `"0x2f9a547e69592e98114263c08c6f7a6e6cd2f991fc29f442947179419233fe9641c8e4c86975a2722b54313e47768d2ffe2608c497ff9fe7f8c61b12e6257e571c"`
    )
  })

  it('signs typed data', async () => {
    const account = await ledgerToAccount({
      transport: await transport,
    })

    await expect(
      account.signTypedData({
        domain: {
          name: 'foo',
          version: '0.0.0',
          chainId: BigInt(42),
          verifyingContract: '0x123',
        },
        primaryType: 'EIP712Domain',
        types: {
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' },
          ],
        },
      })
    ).rejects.toMatchInlineSnapshot(`[Error: Not implemented as of this release.]`)
  }, 20_000)
})
