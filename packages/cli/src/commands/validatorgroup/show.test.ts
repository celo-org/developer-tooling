import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import { ux } from '@oclif/core'
import Web3 from 'web3'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Show from './show'
process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('validatorgroup:show cmd', (web3: Web3) => {
  const writeMock = jest.spyOn(ux.write, 'stdout')
  const logMock = jest.spyOn(console, 'log')

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('outputs the current validator groups', async () => {
    const validatorGroupfromDevChainSetup = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
    await testLocallyWithWeb3Node(Show, [validatorGroupfromDevChainSetup], web3)
    expect(stripAnsiCodesFromNestedArray(writeMock.mock.calls)).toMatchInlineSnapshot(`[]`)
    expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "Running Checks:",
        ],
        [
          "   ✔  0x70997970C51812dc3A010C7d01b50e0d17dc79C8 is ValidatorGroup ",
        ],
        [
          "All checks passed",
        ],
        [
          "name: cLabs
      address: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
      members: 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65,0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc
      commission: 0.1
      nextCommission: 0
      nextCommissionBlock: 0
      membersUpdated: 1731689623
      affiliates: 
      slashingMultiplier: 1
      lastSlashed: 0",
        ],
      ]
    `)
  })
})
