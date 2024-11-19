import { recoverTransaction } from '@celo/wallet-base'
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid'
import { beforeAll, describe, expect, it, test, vi } from 'vitest'
import { ledgerToAccount } from './ledger-to-account.js'
import { mockLedger, TEST_CHAIN_ID, test_ledger } from './test-utils.js'
import { generateLedger } from './utils.js'

const USE_PHYSICAL_LEDGER = process.env.USE_PHYSICAL_LEDGER === 'true'
const hardwareDescribe = USE_PHYSICAL_LEDGER ? describe : describe.skip
const syntheticDescribe = USE_PHYSICAL_LEDGER ? describe.skip : describe

const transport = USE_PHYSICAL_LEDGER
  ? TransportNodeHid.open('')
  : Promise.resolve(undefined as unknown as TransportNodeHid)

vi.mock('./utils.js', async () => {
  const module = await vi.importActual('./utils.js')

  return {
    ...module,
    generateLedger: vi.fn((...args) =>
      // @ts-expect-error
      USE_PHYSICAL_LEDGER ? module.generateLedger(...args) : Promise.resolve(mockLedger())
    ),
  }
})

syntheticDescribe('ledgerToAccount (mocked ledger)', () => {
  let account: Awaited<ReturnType<typeof ledgerToAccount>>
  beforeAll(async () => {
    account = await ledgerToAccount({
      transport: await transport,
    })
  })

  it('can be setup', async () => {
    expect((generateLedger as ReturnType<(typeof jest)['fn']>).mock.calls.length).toBe(1)
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

    describe('eip1559', () => {
      test('v=0', async () => {
        const txHash = await account.signTransaction(txData)
        expect(txHash).toMatchInlineSnapshot(
          `"0x02f86282aef32a6464809412345678901234567890123456789012345678907b80c080a05e130d8edb38e3ee8ab283af7c03a2579598b9a77807d7d796060358787d4707a07219dd22fe3bf3fe57682041d8f80dc9909cd70d903163b077d19625c4cd6e67"`
        )
        const [decoded, signer] = recoverTransaction(txHash)
        expect(signer.toLowerCase()).toBe(account.address.toLowerCase())
        // @ts-expect-error
        expect(decoded.yParity).toMatchInlineSnapshot(`0`)
      })
      test('v=1', async () => {
        const txHash = await account.signTransaction({ ...txData, nonce: 100 })
        expect(txHash).toMatchInlineSnapshot(
          `"0x02f86282aef3646464809412345678901234567890123456789012345678907b80c001a05d166032c75a416c4e552223b9288a7a280d47909d7f526c2884d21d05a28747a047b32b31eb8a9f035b73218ab2b8b8f3211713fc44ef9b9965e268b6ae064cfc"`
        )
        const [decoded, signer] = recoverTransaction(txHash)
        expect(signer.toLowerCase()).toBe(account.address.toLowerCase())
        // @ts-expect-error
        expect(decoded.yParity).toMatchInlineSnapshot(`1`)
      })
    })

    describe('cip64', () => {
      test('v=0', async () => {
        const account = await ledgerToAccount({
          transport: await transport,
        })
        const cUSDa = '0x874069fa1eb16d44d622f2e0ca25eea172369bc1'
        const txHash = await account.signTransaction({ ...txData, feeCurrency: cUSDa })
        expect(txHash).toMatchInlineSnapshot(
          `"0x7bf87782aef32a6464809412345678901234567890123456789012345678907b80c094874069fa1eb16d44d622f2e0ca25eea172369bc180a017d8df83b40dc645b60142280613467ca92438ff5aa0811a6ceff399fe66d661a02efe4eea14146f41d4f776bec1ededc486ddee37cea8304d297a69dbf27c4089"`
        )
        const [decoded, signer] = recoverTransaction(txHash)
        expect(signer.toLowerCase()).toBe(account.address.toLowerCase())
        // @ts-expect-error
        expect(decoded.yParity).toMatchInlineSnapshot(`0`)
      })
      test('v=1', async () => {
        const account = await ledgerToAccount({
          transport: await transport,
        })
        const cUSDa = '0x874069fa1eb16d44d622f2e0ca25eea172369bc1'
        const txHash = await account.signTransaction({ ...txData, feeCurrency: cUSDa, nonce: 100 })
        expect(txHash).toMatchInlineSnapshot(
          `"0x7bf87782aef3646464809412345678901234567890123456789012345678907b80c094874069fa1eb16d44d622f2e0ca25eea172369bc101a02425b4eed4b98f3e0b206ca0bc6d6eb7d144ab6a676dc46bb02a243f3b810b84a00364b83eebbb23cbc9a76406842166e0d78086a820388adb1e249f9ed9753474"`
        )
        const [decoded, signer] = recoverTransaction(txHash)
        expect(signer.toLowerCase()).toBe(account.address.toLowerCase())
        // @ts-expect-error
        expect(decoded.yParity).toMatchInlineSnapshot(`1`)
      })
    })

    describe('malformed v values', () => {
      test('recoverable formats', async () => {
        const test_vs_0_and_1 = [
          [0, '', '00', '0x', '0x0', '0x00', '0x1b', 27], // yParity 0
          [1, '1', '0x1', '0x01', '01', '0x1c', 28], // vParity 1
        ]
        for (const expectedyParity in test_vs_0_and_1) {
          const test_vs = test_vs_0_and_1[+expectedyParity]
          for (const v of test_vs) {
            vi.spyOn(test_ledger, 'signTransaction').mockImplementationOnce(() =>
              // @ts-expect-error
              Promise.resolve({
                v,
                r: '0x1',
                s: '0x1',
              })
            )
            const txHash = await account.signTransaction(txData)
            const [recovered] = recoverTransaction(txHash)
            // @ts-expect-error
            expect(recovered.yParity).toBe(+expectedyParity)
          }
        }
      })
      test('unrecoverable', async () => {
        const test_vs = [NaN, 'asdf', null, undefined, {}]
        for (const v of test_vs) {
          vi.spyOn(test_ledger, 'signTransaction').mockImplementationOnce(() =>
            // @ts-expect-error
            Promise.resolve({
              v,
              r: '0x1',
              s: '0x1',
            })
          )
          await expect(account.signTransaction(txData)).rejects.toThrowError(
            "Ledger signature `v` was malformed and couldn't be parsed"
          )
        }
      })
    })
  })

  it('signs messages', async () => {
    await expect(account.signMessage({ message: 'Hello World' })).resolves.toMatchInlineSnapshot(
      `"0x2f9a547e69592e98114263c08c6f7a6e6cd2f991fc29f442947179419233fe9641c8e4c86975a2722b54313e47768d2ffe2608c497ff9fe7f8c61b12e6257e571c"`
    )
  })

  it('signs typed data', async () => {
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
  })
})

hardwareDescribe('ledgerToAccount (device ledger)', () => {
  let account: Awaited<ReturnType<typeof ledgerToAccount>>
  beforeAll(async () => {
    account = await ledgerToAccount({
      transport: await transport,
    })
  })

  it('can be setup', async () => {
    expect((generateLedger as ReturnType<(typeof jest)['fn']>).mock.calls.length).toBe(1)
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

    describe('eip1559', async () => {
      test('v=0', async () => {
        const txHash = await account.signTransaction(txData)
        const [decoded, signer] = recoverTransaction(txHash)
        expect(signer.toLowerCase()).toBe(account.address.toLowerCase())
        // @ts-expect-error
        expect(decoded.yParity).toMatchInlineSnapshot(`1`)
      }, 20_000)
      test('v=1', async () => {
        const txHash = await account.signTransaction({ ...txData, nonce: 100 })
        const [decoded, signer] = recoverTransaction(txHash)
        expect(signer.toLowerCase()).toBe(account.address.toLowerCase())
        // @ts-expect-error
        expect(decoded.yParity).toMatchInlineSnapshot(`1`)
      }, 20_000)
    })

    describe('cip64', async () => {
      test('v=0', async () => {
        const account = await ledgerToAccount({
          transport: await transport,
        })
        const cUSDa = '0x874069fa1eb16d44d622f2e0ca25eea172369bc1'
        const txHash = await account.signTransaction({ ...txData, feeCurrency: cUSDa, nonce: 0 })
        const [decoded, signer] = recoverTransaction(txHash)
        expect(signer.toLowerCase()).toBe(account.address.toLowerCase())
        // @ts-expect-error
        expect(decoded.yParity).toMatchInlineSnapshot(`0`)
      }, 20_000)
      test('v=1', async () => {
        const account = await ledgerToAccount({
          transport: await transport,
        })
        const cUSDa = '0x874069fa1eb16d44d622f2e0ca25eea172369bc1'
        const txHash = await account.signTransaction({ ...txData, feeCurrency: cUSDa, nonce: 100 })
        const [decoded, signer] = recoverTransaction(txHash)
        expect(signer.toLowerCase()).toBe(account.address.toLowerCase())
        // @ts-expect-error
        expect(decoded.yParity).toMatchInlineSnapshot(`1`)
      }, 20_000)
    })
  })

  it('signs messages', async () => {
    // TODO: refactor to check signer rather than snapshot to be device-agnostic
    await expect(account.signMessage({ message: 'Hello World' })).resolves.toMatchInlineSnapshot(
      `"0x15859cf38f7b58d98e330b1d105add503a31c88f02104d43b4f9cc7cb08dbb483e51abc79881d0f8562073ad57dc60a4a567ddedc1176bf94d4dccc69fce09c51c"`
    )
  }, 20_000)

  it('signs typed data', async () => {
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
