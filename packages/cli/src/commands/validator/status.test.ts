import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import { ux } from '@oclif/core'
import Web3 from 'web3'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Status from './status'

process.env.NO_SYNCCHECK = 'true'

const KNOWN_DEVCHAIN_VALIDATOR = '0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f'

// Status needs to be re written as it calls L1 only methods on contracts

testWithAnvilL2('validator:status', (web3: Web3) => {
  const writeMock = jest.spyOn(ux.write, 'stdout')
  const logMock = jest.spyOn(console, 'log')

  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('with the --validator flag', () => {
    it.failing('displays status of the validator', async () => {
      await testLocallyWithWeb3Node(Status, ['--validator', KNOWN_DEVCHAIN_VALIDATOR], web3)
      expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot()
      expect(stripAnsiCodesFromNestedArray(writeMock.mock.calls)).toMatchInlineSnapshot()
    })
  })
  describe('with the --all flag', () => {
    it.failing('displays status for all validators', async () => {
      await testLocallyWithWeb3Node(Status, ['--all'], web3)
      expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot()
      expect(stripAnsiCodesFromNestedArray(writeMock.mock.calls)).toMatchInlineSnapshot()
    })
  })
})
