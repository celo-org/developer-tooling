import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { ux } from '@oclif/core'
import Web3 from 'web3'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Switch from '../epochs/switch'
import Status from './status'

process.env.NO_SYNCCHECK = 'true'

const KNOWN_DEVCHAIN_VALIDATOR = '0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f'

testWithAnvilL2('validator:status', (web3: Web3) => {
  const writeMock = jest.spyOn(ux.write, 'stdout')
  const logMock = jest.spyOn(console, 'log')

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('displays status of the validator', async () => {
    await testLocallyWithWeb3Node(
      Status,
      ['--validator', KNOWN_DEVCHAIN_VALIDATOR, '--csv', '--start', '349'],
      web3
    )

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
            "Address,Signer,Elected,Frontrunner
        ",
          ],
          [
            "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f,0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f,true,true
        ",
          ],
        ]
      `)
  })

  it('displays status for all validators', async () => {
    await testLocallyWithWeb3Node(Status, ['--all', '--csv', '--start', '349'], web3)

    expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`[]`)
    expect(stripAnsiCodesFromNestedArray(writeMock.mock.calls)).toMatchInlineSnapshot(`
        [
          [
            "Address,Signer,Elected,Frontrunner
        ",
          ],
          [
            "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65,0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65,true,true
        ",
          ],
          [
            "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc,0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc,true,true
        ",
          ],
          [
            "0x976EA74026E726554dB657fA54763abd0C3a0aa9,0x976EA74026E726554dB657fA54763abd0C3a0aa9,true,true
        ",
          ],
          [
            "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955,0x14dC79964da2C08b23698B3D3cc7Ca32193d9955,true,true
        ",
          ],
          [
            "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f,0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f,true,true
        ",
          ],
          [
            "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720,0xa0Ee7A142d267C1f36714E4a8F75612F20a79720,true,true
        ",
          ],
        ]
      `)
  })

  it('fails if start and end are in different epochs', async () => {
    const [account] = await web3.eth.getAccounts()

    await testLocallyWithWeb3Node(Switch, ['--from', account], web3)

    await expect(
      testLocallyWithWeb3Node(
        Status,
        ['--validator', KNOWN_DEVCHAIN_VALIDATOR, '--start', '349'],
        web3
      )
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Start and end blocks must be in the current epoch"`
    )
  })
})
