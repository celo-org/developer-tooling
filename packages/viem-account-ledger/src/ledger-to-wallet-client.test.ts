import { ETHEREUM_DERIVATION_PATH } from '@celo/base'
import Eth from '@celo/hw-app-eth'
import { recoverMessageSigner, recoverTransaction } from '@celo/wallet-base'
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid'
import { http, recoverMessageAddress } from 'viem'
import { celo } from 'viem/chains'
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  MockInstance,
  test,
  vi,
} from 'vitest'
import { ledgerToWalletClient } from './ledger-to-wallet-client.js'
import { ACCOUNT_ADDRESS1, mockLedger, TEST_CHAIN_ID, TestLedger } from './test-utils.js'
import { LedgerWalletClient } from './types.js'
import { generateLedger, readAppName } from './utils.js'

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

// Sample data from the official EIP-712 example:
// https://github.com/ethereum/EIPs/blob/master/assets/eip-712/Example.js
const TYPED_DATA = {
  types: {
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ],
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail',
  domain: {
    name: 'Ether Mail',
    version: '1',
    chainId: BigInt(1),
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
  },
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
} as const

const defaultWalletClientOptions: Parameters<
  typeof ledgerToWalletClient
>['0']['walletClientOptions'] = {
  transport: http(),
  chain: celo,
}
syntheticDescribe('ledgerToWalletClient (mocked ledger)', () => {
  let client: LedgerWalletClient<typeof celo>
  for (const supportedApp of ['celo', 'ethereum']) {
    describe(supportedApp, () => {
      beforeEach(async () => {
        client = await ledgerToWalletClient<typeof celo>({
          transport: await transport,
          walletClientOptions: defaultWalletClientOptions,
        })
        vi.spyOn(TestLedger.prototype, 'getName').mockReturnValue(supportedApp)
      })

      describe('signs txs', () => {
        it('signs messages', async () => {
          const message = 'Hello World clabs'
          const signedMessage = await client.signMessage({ message })
          expect(
            (await recoverMessageAddress({ message, signature: signedMessage })).toLowerCase()
          ).toBe(client.account.address.toLowerCase())
          expect(
            recoverMessageSigner(
              `0x${Buffer.from(message).toString('hex')}`,
              signedMessage
            ).toLowerCase()
          ).toBe(client.account.address.toLowerCase())
        })

        it('signs messages from all accounts', async () => {
          client = await ledgerToWalletClient<typeof celo>({
            transport: await transport,
            walletClientOptions: defaultWalletClientOptions,
            derivationPathIndexes: [0, 1, 2],
          })

          console.log(client.accounts.map((x) => x.address))
          const message = 'Hello World clabs 2'
          const signedMessage = await client.signMessage({ message, account: client.accounts[2] })
          expect(
            (await recoverMessageAddress({ message, signature: signedMessage })).toLowerCase()
          ).toBe(client.accounts[2].address.toLowerCase())
          expect(
            recoverMessageSigner(
              `0x${Buffer.from(message).toString('hex')}`,
              signedMessage
            ).toLowerCase()
          ).toBe(client.accounts[2].address.toLowerCase())
        })

        it('signs typed data', async () => {
          if (supportedApp === 'celo') {
            await expect(client.signTypedData(TYPED_DATA)).rejects.toMatchInlineSnapshot(
              `[Error: Not implemented as of this release.]`
            )
          } else if (supportedApp === 'ethereum') {
            await expect(client.signTypedData(TYPED_DATA)).resolves.toMatchInlineSnapshot(
              `"0x51a454925c2ff4cad0a09cc64fc970685a17f39b2c3a843323f0cc08942d413d15e1ee8c7ff2e12e85eaf1f887cadfbb20b270a579f0945f30de2a73cad4d8ce1c"`
            )
          }
        })
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
            const txHash = await client.signTransaction(txData)
            expect(txHash).toEqual(
              '0x02f86282a4ec2a6464809412345678901234567890123456789012345678907b80c080a09652b2c93921885944c38b0197c073724039151bd873d430394c79b97c2b9f9ba052bd3674daafe7ccc20007961b6781ed779b3cf20e92219bf7fecfe828d9ebca'
            )
            const [decoded, signer] = recoverTransaction(txHash)
            expect(signer.toLowerCase()).toBe(client.account.address.toLowerCase())
            // @ts-expect-error
            expect(decoded.yParity).toBe(0)
          })
          test('v=1', async () => {
            const txHash = await client.signTransaction({ ...txData, nonce: 2 })
            expect(txHash).toEqual(
              '0x02f86282a4ec026464809412345678901234567890123456789012345678907b80c001a0e72d3b97d334b42835aa2431606b65808a770ea7dad0ca5738d4df93b467f273a067ae3e2bb58831dbed770464ad7c375c2a9ced324c003758b95091d0952d7d5c'
            )
            const [decoded, signer] = recoverTransaction(txHash)
            expect(signer.toLowerCase()).toBe(client.account.address.toLowerCase())
            // @ts-expect-error
            expect(decoded.yParity).toBe(1)
          })
          test('different account', async () => {
            client = await ledgerToWalletClient<typeof celo>({
              transport: await transport,
              walletClientOptions: defaultWalletClientOptions,
              derivationPathIndexes: [0, 1, 2],
            })

            const txHash = await client.signTransaction({
              ...txData,
              nonce: 2,
              account: client.accounts[2],
            })
            const [_, signer] = recoverTransaction(txHash)
            expect(signer.toLowerCase()).toBe(client.accounts[2].address.toLowerCase())
          })
        })

        describe('cip64', () => {
          const _test = supportedApp === 'celo' ? test : test.fails

          _test('v=0', async () => {
            const client = await ledgerToWalletClient<typeof celo>({
              transport: await transport,
              walletClientOptions: defaultWalletClientOptions,
            })
            const cUSDa = '0x874069fa1eb16d44d622f2e0ca25eea172369bc1'
            const txHash = await client.signTransaction({ ...txData, feeCurrency: cUSDa, nonce: 2 })
            expect(txHash).toEqual(
              '0x7bf87682a4ec026464809412345678901234567890123456789012345678907b80c094874069fa1eb16d44d622f2e0ca25eea172369bc1809f086e5c4b1ec410ddc826f65809935295623743a8859eb7ce87272a0d97d997a043a7e7949a75149b469df789c9edab960e651be85a990524e4e9cd8cea72a831'
            )
            const [decoded, signer] = recoverTransaction(txHash)
            expect(signer.toLowerCase()).toBe(client.account.address.toLowerCase())
            // @ts-expect-error
            expect(decoded.yParity).toBe(0)
          })
          _test('v=1', async () => {
            const client = await ledgerToWalletClient<typeof celo>({
              transport: await transport,
              walletClientOptions: defaultWalletClientOptions,
            })
            const cUSDa = '0x874069fa1eb16d44d622f2e0ca25eea172369bc1'
            const txHash = await client.signTransaction({
              ...txData,
              feeCurrency: cUSDa,
              nonce: 1,
            })
            expect(txHash).toEqual(
              '0x7bf87782a4ec016464809412345678901234567890123456789012345678907b80c094874069fa1eb16d44d622f2e0ca25eea172369bc101a003c8fc93bcffa3bbfc27da93a1f7d18234cbe65320ea04625a25e02d62a9044aa00185845f1110f5a471e131fe2413390e3958434d2a7f443d268109c51995687a'
            )
            const [decoded, signer] = recoverTransaction(txHash)
            expect(signer.toLowerCase()).toBe(client.account.address.toLowerCase())
            // @ts-expect-error
            expect(decoded.yParity).toBe(1)
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
                vi.spyOn(TestLedger.prototype, 'signTransaction').mockImplementationOnce(() =>
                  Promise.resolve({
                    v: v as string,
                    r: '0x1',
                    s: '0x1',
                  })
                )
                const txHash = await client.signTransaction(txData)
                const [recovered] = recoverTransaction(txHash)
                // @ts-expect-error
                expect(recovered.yParity).toBe(+expectedyParity)
              }
            }
          })
          test('unrecoverable', async () => {
            const test_vs = [NaN, 'asdf', null, undefined, {}]
            for (const v of test_vs) {
              vi.spyOn(TestLedger.prototype, 'signTransaction').mockImplementationOnce(() =>
                Promise.resolve({
                  v: v as string,
                  r: '0x1',
                  s: '0x1',
                })
              )
              await expect(client.signTransaction(txData)).rejects.toThrowError(
                "Ledger signature `v` was malformed and couldn't be parsed"
              )
            }
          })
        })
      })

      describe('list addresses', () => {
        let spy: MockInstance<
          (derivationPath: string) => Promise<{
            address: string
            publicKey: string
          }>
        >
        beforeEach(() => {
          spy = vi.spyOn(TestLedger.prototype, 'getAddress').mockResolvedValue({
            address: ACCOUNT_ADDRESS1,
            publicKey: '0x123',
          })
        })

        afterEach(() => {
          spy.mockClear()
        })

        it('can be used with eth derivation path', async () => {
          client = await ledgerToWalletClient<typeof celo>({
            transport: await transport,
            walletClientOptions: defaultWalletClientOptions,
            derivationPathIndexes: [0, 1, 2, 3],
            baseDerivationPath: ETHEREUM_DERIVATION_PATH,
            changeIndexes: [6, 7, 8],
          })
          spy.mock.calls.forEach((params: string[]) => {
            expect(params[0]).toMatch(/^44'/)
            expect(params[0].split('/').length).toBe(5)
          })
          expect(spy).toHaveBeenCalledTimes(12)
          await expect(client.getAddresses()).resolves.toHaveLength(12)
        })
        it('can be used with derivation path without the master node', async () => {
          client = await ledgerToWalletClient<typeof celo>({
            transport: await transport,
            walletClientOptions: defaultWalletClientOptions,
            derivationPathIndexes: [0, 3],
            baseDerivationPath: "44'/52752'/0'/0",
            changeIndexes: [0],
          })
          spy.mock.calls.forEach((params: string[]) => {
            expect(params[0]).toMatch(/^44'/)
            expect(params[0].split('/').length).toBe(5)
          })
          expect(spy).toHaveBeenCalledTimes(2)
        })

        it('iterates over change indices and address indexes', async () => {
          client = await ledgerToWalletClient<typeof celo>({
            transport: await transport,
            walletClientOptions: defaultWalletClientOptions,
            derivationPathIndexes: [0, 1],
            baseDerivationPath: "m/44'/52752'/0'/0",
            changeIndexes: [0, 1, 2],
          })
          expect(spy.mock.calls).toEqual([
            ["44'/52752'/0'/0/0", false],
            ["44'/52752'/0'/0/1", false],
            ["44'/52752'/0'/1/0", false],
            ["44'/52752'/0'/1/1", false],
            ["44'/52752'/0'/2/0", false],
            ["44'/52752'/0'/2/1", false],
          ])
          expect(spy).toHaveBeenCalledTimes(6)
        })
      })
    })
  }
})

hardwareDescribe('ledgerToWalletClient (device ledger)', () => {
  let client: LedgerWalletClient<typeof celo>
  let currentApp: 'celo' | 'ethereum'
  beforeAll(async () => {
    client = await ledgerToWalletClient<typeof celo>({
      transport: await transport,
      walletClientOptions: defaultWalletClientOptions,
    })
    currentApp = (await readAppName({ transport: await transport } as unknown as Eth)) as
      | 'celo'
      | 'ethereum'
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
        const txHash = await client.signTransaction({ ...txData, nonce: 5 })
        const [decoded, signer] = recoverTransaction(txHash)
        expect(signer.toLowerCase()).toBe(client.account.address.toLowerCase())
        // @ts-expect-error
        expect(decoded.yParity).toBe(0)
      }, 20_000)
      test('v=1', async () => {
        const txHash = await client.signTransaction({ ...txData, nonce: 100 })
        const [decoded, signer] = recoverTransaction(txHash)
        expect(signer.toLowerCase()).toBe(client.account.address.toLowerCase())
        // @ts-expect-error
        expect(decoded.yParity).toBe(1)
      }, 20_000)
    })

    describe('cip64', async () => {
      const _test = currentApp === 'celo' ? test : test.fails

      _test(
        'v=0',
        async () => {
          const client = await ledgerToWalletClient<typeof celo>({
            transport: await transport,
            walletClientOptions: defaultWalletClientOptions,
          })
          const cUSDa = '0x874069fa1eb16d44d622f2e0ca25eea172369bc1'
          // NOTE: this is device-specific
          // play with the nonce to produce a different tx with a yParity==0
          const txHash = await client.signTransaction({ ...txData, feeCurrency: cUSDa, nonce: 0 })
          const [decoded, signer] = recoverTransaction(txHash)
          expect(signer.toLowerCase()).toBe(client.account.address.toLowerCase())
          // @ts-expect-error
          expect(decoded.yParity).toBe(0)
        },
        20_000
      )
      _test(
        'v=1',
        async () => {
          const client = await ledgerToWalletClient<typeof celo>({
            transport: await transport,
            walletClientOptions: defaultWalletClientOptions,
          })
          const cUSDa = '0x874069fa1eb16d44d622f2e0ca25eea172369bc1'
          // NOTE: this is device-specific
          // play with the nonce to produce a different tx with a yParity==1
          const txHash = await client.signTransaction({
            ...txData,
            feeCurrency: cUSDa,
            nonce: 100,
          })
          const [decoded, signer] = recoverTransaction(txHash)
          expect(signer.toLowerCase()).toBe(client.account.address.toLowerCase())
          // @ts-expect-error
          expect(decoded.yParity).toBe(1)
        },
        20_000
      )
    })
  })

  it('signs messages', async () => {
    const message = 'Hello World clabs'
    const signedMessage = await client.signMessage({ message })
    expect((await recoverMessageAddress({ message, signature: signedMessage })).toLowerCase()).toBe(
      client.account.address.toLowerCase()
    )
    expect(
      recoverMessageSigner(`0x${Buffer.from(message).toString('hex')}`, signedMessage).toLowerCase()
    ).toBe(client.account.address.toLowerCase())
  }, 20_000)

  it('signs messages from all accounts', async () => {
    client = await ledgerToWalletClient<typeof celo>({
      transport: await transport,
      walletClientOptions: defaultWalletClientOptions,
      derivationPathIndexes: [0, 1, 2],
    })

    const message = 'Hello World clabs 2'
    const signedMessage = await client.signMessage({ message, account: client.accounts[2] })
    expect((await recoverMessageAddress({ message, signature: signedMessage })).toLowerCase()).toBe(
      client.accounts[2].address.toLowerCase()
    )
    expect(
      recoverMessageSigner(`0x${Buffer.from(message).toString('hex')}`, signedMessage).toLowerCase()
    ).toBe(client.accounts[2].address.toLowerCase())
  }, 20_000)

  it('signs typed data', async () => {
    if (currentApp === 'celo') {
      await expect(client.signTypedData(TYPED_DATA)).rejects.toMatchInlineSnapshot(
        `[Error: Not implemented as of this release.]`
      )
    } else if (currentApp === 'ethereum') {
      await expect(client.signTypedData(TYPED_DATA)).resolves.toMatch(/0x[0-9a-fA-F]{130}/)
    }
  }, 20_000)
})
