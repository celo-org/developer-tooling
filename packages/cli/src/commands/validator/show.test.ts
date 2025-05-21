import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { ux } from '@oclif/core'
import Web3 from 'web3'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Show from './show'

process.env.NO_SYNCCHECK = 'true'

const KNOWN_DEVCHAIN_VALIDATOR = '0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f'

testWithAnvilL2('validator:show', (web3: Web3) => {
  const writeMock = jest.spyOn(ux.write, 'stdout')
  const logMock = jest.spyOn(console, 'log')

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('shows the validator', async () => {
    await testLocallyWithWeb3Node(Show, [KNOWN_DEVCHAIN_VALIDATOR], web3)
    expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "Running Checks:",
        ],
        [
          "   ✔  0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f is Validator ",
        ],
        [
          "All checks passed",
        ],
        [
          "name: 
      address: 0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f
      ecdsaPublicKey: 0x931e7fda8da226f799f791eefc9afebcd7ae2b1b19a03c5eaa8d72122d9fe74d887a3962ff861190b531ab31ee82f0d7f255dfe3ab73ca627bd70ab3d1cbb417
      blsPublicKey: 0x010101010101010101010101010101010101010101010101010101010101010202020202020202020202020202020202020202020202020202020202020202030303030303030303030303030303030303030303030303030303030303030304
      affiliation: 0x90F79bf6EB2c4f870365E785982E1f101E93b906
      score: 0
      signer: 0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
        ],
      ]
    `)
    expect(stripAnsiCodesFromNestedArray(writeMock.mock.calls)).toMatchInlineSnapshot(`[]`)
  })
})
