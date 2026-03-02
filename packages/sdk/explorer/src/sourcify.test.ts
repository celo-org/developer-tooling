import * as crypto from 'crypto'
import { Address, Connection, Provider } from '@celo/connect'
import { toFunctionSelector } from 'viem'
import { Metadata, fetchMetadata, tryGetProxyImplementation } from './sourcify'

// This is taken from protocol/contracts/build/Account.json
const CONTRACT_METADATA = require('../fixtures/contract.metadata.json')

describe('sourcify helpers', () => {
  let connection: Connection
  const address: Address = '0x' + crypto.randomBytes(20).toString('hex')
  const proxyAddress: Address = '0x' + crypto.randomBytes(20).toString('hex')
  const implAddress: Address = '0x' + crypto.randomBytes(20).toString('hex')
  const chainId: number = 42220

  const mockProvider: Provider = {
    request: (async ({ params }: { method: string; params?: any }) => {
      const safeParams = Array.isArray(params) ? params : params != null ? [params] : []
      if (safeParams[0]?.to === proxyAddress) {
        return `0x000000000000000000000000${implAddress.slice(2)}`
      } else {
        throw new Error('revert')
      }
    }) as any,
  }

  beforeEach(() => {
    fetchMock.reset()
    connection = new Connection(mockProvider)
    connection.chainId = jest.fn().mockImplementation(async () => {
      return chainId
    })
  })

  describe('fetchMetadata()', () => {
    describe('when a full match exists', () => {
      it('returns the metadata from the full match', async () => {
        fetchMock.get(
          `https://repo.sourcify.dev/contracts/full_match/42220/${address}/metadata.json`,
          {}
        )
        const metadata = await fetchMetadata(connection, address)
        expect(metadata).toBeInstanceOf(Metadata)
      })
    })

    describe('when a full match does not exist', () => {
      describe('but a partial match exists', () => {
        it('returns the metadata from the partial match', async () => {
          fetchMock
            .get(
              `https://repo.sourcify.dev/contracts/full_match/42220/${address}/metadata.json`,
              400
            )
            .get(
              `https://repo.sourcify.dev/contracts/partial_match/42220/${address}/metadata.json`,
              {}
            )
          const metadata = await fetchMetadata(connection, address)
          expect(metadata).toBeInstanceOf(Metadata)
        })
      })

      describe('and a partial match does not exist', () => {
        it('is null', async () => {
          fetchMock
            .get(
              `https://repo.sourcify.dev/contracts/full_match/42220/${address}/metadata.json`,
              400
            )
            .get(
              `https://repo.sourcify.dev/contracts/partial_match/42220/${address}/metadata.json`,
              400
            )
          const metadata = await fetchMetadata(connection, address)
          expect(metadata).toEqual(null)
        })
      })
    })
  })

  describe('Metadata', () => {
    describe('get abi', () => {
      it('returns the abi when it finds it', () => {
        const metadata = new Metadata(connection, address, { output: { abi: [{}] } })
        const abi = metadata.abi
        expect(abi).not.toBeNull()
        expect(abi).toEqual([{}])
      })

      it('returns null when there is no abi', () => {
        const metadata = new Metadata(connection, address, { output: { other: [{}] } })
        const abi = metadata.abi
        expect(abi).toBeNull()
      })
    })

    describe('get contractName', () => {
      describe('when the structure does not contain it', () => {
        it('returns null', () => {
          const metadata = new Metadata(connection, address, { output: { abi: [{}] } })
          const name = metadata.contractName
          expect(name).toBeNull()
        })
      })

      describe('when the structure contains multiple compilation targets', () => {
        it('returns the first', () => {
          const metadata = new Metadata(connection, address, {
            settings: {
              compilationTarget: {
                'somefile.sol': 'SomeContract',
                'otherfile.sol': 'OtherContract',
              },
            },
          })
          const name = metadata.contractName
          expect(name).toEqual('SomeContract')
        })
      })

      describe('when the structure contains one compilation targets', () => {
        it('returns it', () => {
          const metadata = new Metadata(connection, address, {
            settings: {
              compilationTarget: {
                'otherfile.sol': 'OtherContract',
              },
            },
          })
          const name = metadata.contractName
          expect(name).toEqual('OtherContract')
        })
      })
    })

    describe('abiForMethod', () => {
      let contractMetadata: Metadata

      beforeEach(() => {
        contractMetadata = new Metadata(connection, address, CONTRACT_METADATA)
      })

      describe('with full signature', () => {
        it('finds one ABI item when it exists', async () => {
          const results = contractMetadata.abiForMethod('isLegacyRole(bytes32,bytes32)')
          expect(results.length).toEqual(1)
          expect(results[0]).toMatchObject({
            name: 'isLegacyRole',
            inputs: [{ name: 'role' }, { name: 'otherRole' }],
          })
        })

        it('returns an empty array when none exists', async () => {
          const results = contractMetadata.abiForMethod('randomFunction(bytes32,bytes32')
          expect(results.length).toEqual(0)
        })
      })

      describe('with method name', () => {
        it('finds one ABI item when one exists', async () => {
          const results = contractMetadata.abiForMethod('isLegacySigner')
          expect(results.length).toEqual(1)
          expect(results[0]).toMatchObject({
            name: 'isLegacySigner',
          })
        })

        it('finds multiple ABI items when they exist', async () => {
          const results = contractMetadata.abiForMethod('isLegacyRole')
          expect(results.length).toEqual(2)
        })

        it('returns an empty array when none exists', async () => {
          const results = contractMetadata.abiForMethod('randomFunction')
          expect(results.length).toEqual(0)
        })
      })
    })

    describe('abiForSignature', () => {
      let contractMetadata: Metadata

      beforeEach(() => {
        contractMetadata = new Metadata(connection, address, CONTRACT_METADATA)
      })

      describe('when the function exists', () => {
        it('returns the ABI', async () => {
          const callSignature = toFunctionSelector('authorizedBy(address)')
          const abi = contractMetadata.abiForSelector(callSignature)
          expect(abi).toMatchObject({
            constant: true,
            inputs: [
              {
                internalType: 'address',
                name: '',
                type: 'address',
              },
            ],
            name: 'authorizedBy',
            outputs: [
              {
                internalType: 'address',
                name: '',
                type: 'address',
              },
            ],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          })
        })
      })

      describe("when the function doesn't exist", () => {
        it('returns null', () => {
          const abi = contractMetadata.abiForSelector('0x0')
          expect(abi).toBeNull()
        })
      })
    })

    describe('abiForMethod with tuple params (tests abiItemToSignatureString)', () => {
      it('matches a function with simple params via full signature', () => {
        const metadata = new Metadata(connection, address, {
          output: {
            abi: [
              {
                type: 'function',
                name: 'transfer',
                inputs: [
                  { name: 'to', type: 'address' },
                  { name: 'value', type: 'uint256' },
                ],
                outputs: [{ name: 'success', type: 'bool' }],
                stateMutability: 'nonpayable',
              },
            ],
          },
        })
        const results = metadata.abiForMethod('transfer(address,uint256)')
        expect(results.length).toEqual(1)
        expect(results[0].name).toBe('transfer')
      })

      it('matches a function with tuple params via full signature', () => {
        const metadata = new Metadata(connection, address, {
          output: {
            abi: [
              {
                type: 'function',
                name: 'complexMethod',
                inputs: [
                  {
                    name: 'data',
                    type: 'tuple',
                    components: [
                      { name: 'addr', type: 'address' },
                      { name: 'amount', type: 'uint256' },
                    ],
                  },
                ],
                outputs: [],
                stateMutability: 'nonpayable',
              },
            ],
          },
        })
        const results = metadata.abiForMethod('complexMethod((address,uint256))')
        expect(results.length).toEqual(1)
        expect(results[0].name).toBe('complexMethod')
      })

      it('matches a function with tuple array params', () => {
        const metadata = new Metadata(connection, address, {
          output: {
            abi: [
              {
                type: 'function',
                name: 'batchTransfer',
                inputs: [
                  {
                    name: 'transfers',
                    type: 'tuple[]',
                    components: [
                      { name: 'to', type: 'address' },
                      { name: 'value', type: 'uint256' },
                    ],
                  },
                ],
                outputs: [],
                stateMutability: 'nonpayable',
              },
            ],
          },
        })
        const results = metadata.abiForMethod('batchTransfer((address,uint256)[])')
        expect(results.length).toEqual(1)
        expect(results[0].name).toBe('batchTransfer')
      })

      it('matches a function with nested tuple params', () => {
        const metadata = new Metadata(connection, address, {
          output: {
            abi: [
              {
                type: 'function',
                name: 'nested',
                inputs: [
                  {
                    name: 'data',
                    type: 'tuple',
                    components: [
                      {
                        name: 'inner',
                        type: 'tuple',
                        components: [
                          { name: 'x', type: 'uint256' },
                          { name: 'y', type: 'uint256' },
                        ],
                      },
                      { name: 'flag', type: 'bool' },
                    ],
                  },
                ],
                outputs: [],
                stateMutability: 'nonpayable',
              },
            ],
          },
        })
        const results = metadata.abiForMethod('nested(((uint256,uint256),bool))')
        expect(results.length).toEqual(1)
        expect(results[0].name).toBe('nested')
      })

      it('returns empty for mismatched signature', () => {
        const metadata = new Metadata(connection, address, {
          output: {
            abi: [
              {
                type: 'function',
                name: 'transfer',
                inputs: [
                  { name: 'to', type: 'address' },
                  { name: 'value', type: 'uint256' },
                ],
                outputs: [{ name: 'success', type: 'bool' }],
                stateMutability: 'nonpayable',
              },
            ],
          },
        })
        const results = metadata.abiForMethod('transfer(address,bool)')
        expect(results.length).toEqual(0)
      })

      it('handles event and constructor types (does not match as function)', () => {
        const metadata = new Metadata(connection, address, {
          output: {
            abi: [
              {
                type: 'event',
                name: 'Transfer',
                inputs: [
                  { name: 'from', type: 'address', indexed: true },
                  { name: 'to', type: 'address', indexed: true },
                  { name: 'value', type: 'uint256', indexed: false },
                ],
              },
              {
                type: 'constructor',
                inputs: [{ name: 'supply', type: 'uint256' }],
              },
            ],
          },
        })
        // Events and constructors should not be found by abiForMethod
        const results = metadata.abiForMethod('Transfer(address,address,uint256)')
        expect(results.length).toEqual(0)
      })
    })

    describe('tryGetProxyImplementation', () => {
      describe('with a cLabs proxy', () => {
        it('fetches the implementation', async () => {
          const result = await tryGetProxyImplementation(connection, proxyAddress)
          expect(result?.toLocaleLowerCase()).toEqual(implAddress.toLocaleLowerCase())
        })
      })

      describe('with a non-proxy', () => {
        it('returns null', async () => {
          const result = await tryGetProxyImplementation(connection, address)
          expect(result).toBeUndefined()
        })
      })
    })

    describe('toContractMapping', () => {
      it('returns a mapping with fnMapping populated', () => {
        const metadata = new Metadata(connection, address, {
          output: {
            abi: [
              {
                type: 'function',
                name: 'foo',
                inputs: [],
                outputs: [{ name: '', type: 'uint256' }],
                stateMutability: 'view',
              },
            ],
          },
          settings: {
            compilationTarget: { 'foo.sol': 'Foo' },
          },
        })
        const mapping = metadata.toContractMapping()
        expect(mapping.details.name).toBe('Foo')
        expect(mapping.details.address).toBe(address)
        expect(mapping.details.isCore).toBe(false)
        expect(mapping.fnMapping.size).toBeGreaterThan(0)
      })
    })
  })
})
