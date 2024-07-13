import { setupL2, testWithAnvil } from '@celo/dev-utils/lib/anvil-test'
import write from '@oclif/core/lib/cli-ux/write'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Contracts from './contracts'
process.env.NO_SYNCCHECK = 'true'

testWithAnvil('network:contracts', (web3) => {
  test('runs', async () => {
    await setupL2(web3)
    const spy = jest.spyOn(write, 'stdout')
    await testLocallyWithWeb3Node(Contracts, ['--output', 'json'], web3)
    expect(spy.mock.calls).toMatchSnapshot()
  })
})
