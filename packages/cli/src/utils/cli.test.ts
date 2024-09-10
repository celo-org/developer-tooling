import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import { stripAnsiCodesFromNestedArray } from '../test-utils/cliUtils'
import { printValueMapRecursive } from './cli'
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
