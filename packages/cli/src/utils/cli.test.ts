import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import BigNumber from 'bignumber.js'
import { stripAnsiCodesFromNestedArray } from '../test-utils/cliUtils'
import { humanizeRequirements, printValueMapRecursive } from './cli'
testWithAnvilL2('printValueMapRecursive', async () => {
  it('should print the key-value pairs in the value map recursively', () => {
    const valueMap = {
      key1: 'value1',
      key2: {
        nestedKey1: 'nestedValue1',
        nestedKey2: 'nestedValue2',
      },
    }

    const mock = jest.fn()
    console.log = mock

    printValueMapRecursive(valueMap)

    expect(stripAnsiCodesFromNestedArray(mock.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "key1: value1
      key2: 
        nestedKey1: nestedValue1
        nestedKey2: nestedValue2",
        ],
      ]
    `)
  })

  it('should print number keys in numeric order', () => {
    const valueMap = {
      1: 'jeden',
      2: {
        1: '1',
        2: '2',
        11: '3',
        12: '4',
        21: '5',
      },
      3: {
        '0x1': 'nestedValue1',
        jupiter: 'nestedValue2',
        potato: 'nestedValue3',
      },
    }

    const mock = jest.fn()
    console.log = mock

    printValueMapRecursive(valueMap)

    expect(stripAnsiCodesFromNestedArray(mock.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "1: jeden
      2: 
        1: 1
        2: 2
        11: 3
        12: 4
        21: 5
      3: 
        0x1: nestedValue1
        jupiter: nestedValue2
        potato: nestedValue3",
        ],
      ]
    `)
  })
})

describe('humanizeRequirements', () => {
  describe('requiredDuration', () => {
    const celoINWei = new BigNumber('1000000000000000000000')
    it('shows when duration is hours ', () => {
      const { requiredDays } = humanizeRequirements({
        duration: new BigNumber(60 * 60),
        value: celoINWei,
      })
      expect(requiredDays).toEqual('1 hour')
    })
    it('shows when duration is days ', () => {
      const { requiredDays } = humanizeRequirements({
        duration: new BigNumber(60 * 60 * 24 * 2),
        value: celoINWei,
      })
      expect(requiredDays).toEqual('2 days')
    })
    it('shows when duration is weeks ', () => {
      const { requiredDays } = humanizeRequirements({
        duration: new BigNumber(60 * 60 * 24 * 15),
        value: celoINWei,
      })
      expect(requiredDays).toEqual('2 weeks, 1 day')
    })
    it('shows when duration is months ', () => {
      const { requiredDays } = humanizeRequirements({
        duration: new BigNumber(60 * 60 * 24 * 65),
        value: celoINWei,
      })
      expect(requiredDays).toEqual('2 months, 4 days, 3 hours')
    })
  })
  describe('requiredCELO', () => {
    const duration = new BigNumber(1000 * 60 * 60)
    it('shows when value is small ', () => {
      const celoINWei = new BigNumber('1e18')
      const { requiredCelo } = humanizeRequirements({ duration, value: celoINWei })
      expect(requiredCelo).toEqual('1')
    })
    it('shows when value is big ', () => {
      const celoINWei = new BigNumber('1e23')
      const { requiredCelo } = humanizeRequirements({ duration, value: celoINWei })
      expect(requiredCelo).toEqual('100000')
    })
  })
})
