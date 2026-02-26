import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { stripAnsiCodesFromNestedArray, testLocallyWithNode } from '../../test-utils/cliUtils'
import Requirements from './requirements'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('validator:requirements', (provider) => {
  const logMock = jest.spyOn(console, 'log')

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('shows all registered validators', async () => {
    await testLocallyWithNode(Requirements, [], provider)
    expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "value: 1e+22
      duration: 5184000",
        ],
      ]
    `)
  })
})
