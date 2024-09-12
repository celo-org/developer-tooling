import { testWithAnvilL1 } from '@celo/dev-utils/lib/anvil-test'
import write from '@oclif/core/lib/cli-ux/write'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Contracts from './contracts'
process.env.NO_SYNCCHECK = 'true'

testWithAnvilL1('network:contracts', (web3: Web3) => {
  test('runs', async () => {
    const spy = jest.spyOn(write, 'stdout')
    await testLocallyWithWeb3Node(Contracts, ['--output', 'json'], web3)
    expect(spy.mock.calls).toMatchSnapshot()
  })
})
