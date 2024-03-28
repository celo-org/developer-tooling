import { testWithGanache } from '@celo/dev-utils/lib/ganache-test'
import write from '@oclif/core/lib/cli-ux/write'
import { testLocally } from '../../test-utils/cliUtils'
import Contracts from './contracts'
process.env.NO_SYNCCHECK = 'true'

testWithGanache('network:contracts', () => {
  test('runs', async () => {
    const spy = jest.spyOn(write, 'stdout')
    await testLocally(Contracts, ['--output', 'csv'])
    expect(spy.mock.calls).toMatchSnapshot()
  })
})
