import { testWithAnvilL1 } from '@celo/dev-utils/lib/anvil-test'
import { IstanbulUtils } from '@celo/utils'
import { ux } from '@oclif/core'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Status from './status'

process.env.NO_SYNCCHECK = 'true'

const KNOWN_DEVCHAIN_VALIDATOR = '0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f'

testWithAnvilL1('validator:status', (web3: Web3) => {
  let writeMock = jest.spyOn(ux.write, 'stdout')
  let logMock = jest.spyOn(console, 'log')
  beforeEach(() => {
    writeMock = jest.spyOn(ux.write, 'stdout').mockImplementation(() => {})
    logMock = jest.spyOn(console, 'log').mockImplementation(() => {})
    // In anvil the blocks don't have any extraData on them
    // This is a bare minimum needed by status command to work
    jest.spyOn(IstanbulUtils, 'parseBlockExtraData').mockImplementation(() => {
      return {
        parentAggregatedSeal: {
          bitmap: new BigNumber(0),
        },
      } as any
    })
    jest.spyOn(IstanbulUtils, 'bitIsSet').mockImplementation(() => false)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('displays status of the validator', async () => {
    await testLocallyWithWeb3Node(Status, ['--validator', KNOWN_DEVCHAIN_VALIDATOR, '--csv'], web3)

    expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
        [
          [
            "Running Checks:",
          ],
          [
            "   ✔  0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f is a registered Account ",
          ],
          [
            "   ✔  0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f is Validator ",
          ],
          [
            "All checks passed",
          ],
        ]
      `)
    expect(stripAnsiCodesFromNestedArray(writeMock.mock.calls)).toMatchInlineSnapshot(`
        [
          [
            "Address,Signer,Elected,Frontrunner,Signatures
        ",
          ],
          [
            "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f,0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f,true,true,0.00%
        ",
          ],
        ]
      `)
  })
  it('displays status for all validators', async () => {
    await testLocallyWithWeb3Node(Status, ['--all', '--csv'], web3)

    expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`[]`)
    expect(stripAnsiCodesFromNestedArray(writeMock.mock.calls)).toMatchInlineSnapshot(`
        [
          [
            "Address,Signer,Elected,Frontrunner,Signatures
        ",
          ],
          [
            "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65,0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65,true,true,0.00%
        ",
          ],
          [
            "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc,0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc,true,true,0.00%
        ",
          ],
          [
            "0x976EA74026E726554dB657fA54763abd0C3a0aa9,0x976EA74026E726554dB657fA54763abd0C3a0aa9,true,true,0.00%
        ",
          ],
          [
            "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955,0x14dC79964da2C08b23698B3D3cc7Ca32193d9955,true,true,0.00%
        ",
          ],
          [
            "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f,0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f,true,true,0.00%
        ",
          ],
          [
            "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720,0xa0Ee7A142d267C1f36714E4a8F75612F20a79720,true,true,0.00%
        ",
          ],
        ]
      `)
  })
})
