import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import write from '@oclif/core/lib/cli-ux/write'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Contracts from './contracts'
process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('network:contracts', (web3) => {
  test('runs', async () => {
    const spy = jest.spyOn(write, 'stdout')
    await testLocallyWithWeb3Node(Contracts, ['--output', 'json'], web3)
    expect(spy.mock.calls).toMatchSnapshot()
  })
})
