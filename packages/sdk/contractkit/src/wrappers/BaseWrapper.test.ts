import { NULL_ADDRESS } from '@celo/base'
import { Connection, Provider } from '@celo/connect'
import type { AbiItem } from '@celo/connect/lib/abi-types'
import { encodeAbiParameters, type AbiParameter } from 'viem'
import BigNumber from 'bignumber.js'
import type { PublicClient } from 'viem'
import { ContractVersion, newContractVersion } from '../versions'
import { BaseWrapper, type ContractLike, unixSecondsTimestampToDateString } from './BaseWrapper'

const mockVersion = newContractVersion(1, 1, 1, 1)

// Encode the version as ABI-encoded (uint256, uint256, uint256, uint256)
const encodedVersion = encodeAbiParameters(
  [
    { type: 'uint256' },
    { type: 'uint256' },
    { type: 'uint256' },
    { type: 'uint256' },
  ] as AbiParameter[],
  [BigInt(1), BigInt(1), BigInt(1), BigInt(1)]
)

const mockContract: ContractLike<AbiItem[]> = {
  abi: [
    {
      type: 'function' as const,
      name: 'getVersionNumber',
      inputs: [],
      outputs: [
        { name: '', type: 'uint256' },
        { name: '', type: 'uint256' },
        { name: '', type: 'uint256' },
        { name: '', type: 'uint256' },
      ],
    },
  ],
  address: NULL_ADDRESS,
}

const mockProvider = { send: (_payload: unknown, _cb: unknown) => undefined } as unknown as Provider
const connection = new Connection(mockProvider)
// Override viemClient with mock that returns encoded version data
;(connection as any)._viemClient = {
  call: jest.fn().mockResolvedValue({ data: encodedVersion }),
} as unknown as PublicClient

class TestWrapper extends BaseWrapper {
  constructor() {
    super(connection, mockContract as any)
  }

  async protectedFunction(v: ContractVersion) {
    await this.onlyVersionOrGreater(v)
  }
}

describe('TestWrapper', () => {
  const tw = new TestWrapper()

  describe(`#onlyVersionOrGreater (actual = ${mockVersion})`, () => {
    const throwTests = [
      newContractVersion(2, 0, 0, 0),
      newContractVersion(1, 2, 0, 0),
      newContractVersion(1, 1, 2, 0),
    ]
    const resolveTests = [newContractVersion(1, 1, 1, 2), newContractVersion(1, 0, 0, 0)]

    throwTests.forEach((v) => {
      it(`should throw with incompatible version ${v}`, async () => {
        await expect(tw.protectedFunction(v)).rejects.toThrow(
          `Bytecode version ${mockVersion} is not compatible with ${v} yet`
        )
      })
    })

    resolveTests.forEach((v) => {
      it(`should resolve with compatible version ${v}`, async () => {
        await expect(tw.protectedFunction(v)).resolves.not.toThrow()
      })
    })
  })
})

describe('unixSecondsTimestampToDateString()', () => {
  const date = new BigNumber(1627489780)

  const timezoneMock = (zone: string) => {
    const DateTimeFormat = Intl.DateTimeFormat

    jest
      .spyOn(global.Intl, 'DateTimeFormat')
      .mockImplementation(
        (locale, options) => new DateTimeFormat(locale, { ...options, timeZone: zone })
      )
  }

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('when Brazil/East', () => {
    it('returns local time', () => {
      timezoneMock('Brazil/East')
      let str = unixSecondsTimestampToDateString(date)
      // due to behavior of node 18 https://github.com/nodejs/node/issues/46123
      str = str.replace(/[\u00A0\u1680​\u180e\u2000-\u2009\u200a​\u200b​\u202f\u205f​\u3000]/g, ' ')
      expect(str).toEqual('Wed, Jul 28, 2021, 1:29 PM GMT-3')
    })
  })

  describe('when UTC', () => {
    it('returns utc time', () => {
      timezoneMock('UTC')
      let str = unixSecondsTimestampToDateString(date)
      str = str.replace(/[\u00A0\u1680​\u180e\u2000-\u2009\u200a​\u200b​\u202f\u205f​\u3000]/g, ' ')
      expect(str).toEqual('Wed, Jul 28, 2021, 4:29 PM UTC')
    })
  })
  describe('when Australia/Adelaide', () => {
    it('returns local time', () => {
      timezoneMock('Australia/Adelaide')
      let str = unixSecondsTimestampToDateString(date)
      str = str.replace(/[\u00A0\u1680​\u180e\u2000-\u2009\u200a​\u200b​\u202f\u205f​\u3000]/g, ' ')
      expect(str).toEqual('Thu, Jul 29, 2021, 1:59 AM GMT+9:30')
    })
  })
  describe('when Europe/London', () => {
    it('returns local time', () => {
      timezoneMock('Europe/London')
      let str = unixSecondsTimestampToDateString(date)
      str = str.replace(/[\u00A0\u1680​\u180e\u2000-\u2009\u200a​\u200b​\u202f\u205f​\u3000]/g, ' ')
      expect(str).toEqual('Wed, Jul 28, 2021, 5:29 PM GMT+1')
    })
  })
})
