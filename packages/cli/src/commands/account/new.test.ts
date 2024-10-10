import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import { ux } from '@oclif/core'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import NewAccount from './new'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('account:set-name cmd', (web3: Web3) => {
  const writeMock = jest.spyOn(ux, 'info')

  beforeEach(() => {
    writeMock.mockClear()
  })
  it('generates mneumonic when called with no flags', async () => {
    await testLocallyWithWeb3Node(NewAccount, [], web3)

    expect(writeMock.mock.calls).toMatchInlineSnapshot()
  })
})
