import { CeloTx } from '../types'
import { inputAccessListFormatter, inputCeloTxFormatter } from './formatter'

describe('inputAccessListFormatter', () => {
  test('with valid accessList', () => {
    const accessList = [
      {
        address: '0x0000000000000000000000000000000000000000',
        storageKeys: [
          '0x0000000000000000000000000000000000000000000000000000000000000001',
          '0x60fdd29ff912ce880cd3edaf9f932dc61d3dae823ea77e0323f94adb9f6a72fe',
        ],
      },
    ]

    expect(inputAccessListFormatter(accessList)).toEqual([
      [
        '0x0000000000000000000000000000000000000000',
        [
          '0x0000000000000000000000000000000000000000000000000000000000000001',
          '0x60fdd29ff912ce880cd3edaf9f932dc61d3dae823ea77e0323f94adb9f6a72fe',
        ],
      ],
    ])
  })
})

describe('inputCeloTxFormatter', () => {
  const base: CeloTx = {
    chainId: 42220,
    nonce: 1,
    gas: 1000000,
    value: '0x0241',
    from: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
    to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
    data: '0x',
  }
  describe('when address does not pass checksum', () => {
    ;['from', 'to', 'feeCurrency'].forEach((property) => {
      test(`${property}`, () => {
        const faulty = { ...base, [property]: '0x3e8' }
        expect(() => inputCeloTxFormatter(faulty)).toThrowError(
          `Provided address 0x3e8 is invalid, the capitalization checksum test failed`
        )
      })
    })
  })

  describe('valid celo-legacy tx', () => {
    const legacy = {
      ...base,
      gasPrice: '0x3e8',
      feeCurrency: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
    } as const
    it('formats', () => {
      expect(inputCeloTxFormatter(legacy)).toMatchInlineSnapshot(`
        {
          "data": "0x",
          "feeCurrency": "0x11f4d0a3c12e86b4b5f39b213f7e19d048276dae",
          "from": "0x11f4d0a3c12e86b4b5f39b213f7e19d048276dae",
          "gas": "0xf4240",
          "gasPrice": "0x3e8",
          "nonce": "0x1",
          "to": "0x11f4d0a3c12e86b4b5f39b213f7e19d048276dae",
          "value": "0x241",
        }
      `)
    })
  })
  describe('valid cip64 tx', () => {
    const cip64 = {
      ...base,
      maxFeePerGas: '0x3e8',
      maxPriorityFeePerGas: '0x3e8',
      feeCurrency: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
    } as const
    it('formats', () => {
      expect(inputCeloTxFormatter(cip64)).toMatchInlineSnapshot(`
        {
          "data": "0x",
          "feeCurrency": "0x11f4d0a3c12e86b4b5f39b213f7e19d048276dae",
          "from": "0x11f4d0a3c12e86b4b5f39b213f7e19d048276dae",
          "gas": "0xf4240",
          "maxFeePerGas": "0x3e8",
          "maxPriorityFeePerGas": "0x3e8",
          "nonce": "0x1",
          "to": "0x11f4d0a3c12e86b4b5f39b213f7e19d048276dae",
          "value": "0x241",
        }
      `)
    })
  })
  describe('valid cip66 tx', () => {
    const cip66 = {
      ...base,
      maxFeePerGas: '0x3e8',
      maxPriorityFeePerGas: '0x3e8',
      feeCurrency: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
      maxFeeInFeeCurrency: '0x3f0',
    } as const
    it('formats', () => {
      expect(inputCeloTxFormatter(cip66)).toMatchInlineSnapshot(`
        {
          "data": "0x",
          "feeCurrency": "0x11f4d0a3c12e86b4b5f39b213f7e19d048276dae",
          "from": "0x11f4d0a3c12e86b4b5f39b213f7e19d048276dae",
          "gas": "0xf4240",
          "maxFeeInFeeCurrency": "0x3f0",
          "maxFeePerGas": "0x3e8",
          "maxPriorityFeePerGas": "0x3e8",
          "nonce": "0x1",
          "to": "0x11f4d0a3c12e86b4b5f39b213f7e19d048276dae",
          "value": "0x241",
        }
      `)
    })
  })
  describe('valid cip42 tx', () => {
    const cip42 = {
      ...base,
      maxFeePerGas: '0x3e8',
      maxPriorityFeePerGas: '0x3e8',
      feeCurrency: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
    } as const
    it('formats', () => {
      expect(inputCeloTxFormatter(cip42)).toMatchInlineSnapshot(`
        {
          "data": "0x",
          "feeCurrency": "0x11f4d0a3c12e86b4b5f39b213f7e19d048276dae",
          "from": "0x11f4d0a3c12e86b4b5f39b213f7e19d048276dae",
          "gas": "0xf4240",
          "maxFeePerGas": "0x3e8",
          "maxPriorityFeePerGas": "0x3e8",
          "nonce": "0x1",
          "to": "0x11f4d0a3c12e86b4b5f39b213f7e19d048276dae",
          "value": "0x241",
        }
      `)
    })
  })
  describe('valid eip1559 tx', () => {
    const eip1559 = {
      ...base,
      maxFeePerGas: '0x3e8',
      maxPriorityFeePerGas: '0x3e8',
    } as const
    it('formats', () => {
      expect(inputCeloTxFormatter(eip1559)).toMatchInlineSnapshot(`
        {
          "data": "0x",
          "from": "0x11f4d0a3c12e86b4b5f39b213f7e19d048276dae",
          "gas": "0xf4240",
          "maxFeePerGas": "0x3e8",
          "maxPriorityFeePerGas": "0x3e8",
          "nonce": "0x1",
          "to": "0x11f4d0a3c12e86b4b5f39b213f7e19d048276dae",
          "value": "0x241",
        }
      `)
    })
  })
})
