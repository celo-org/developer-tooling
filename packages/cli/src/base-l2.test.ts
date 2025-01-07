import { Connection } from '@celo/connect'
import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import * as WalletLedgerExports from '@celo/wallet-ledger'
import { Config, ux } from '@oclif/core'
import { tmpdir } from 'os'
import Web3 from 'web3'
import { BaseCommand } from './base'
import Set from './commands/config/set'
import CustomHelp from './help'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from './test-utils/cliUtils'
import { readConfig } from './utils/config'

process.env.NO_SYNCCHECK = 'true'

jest.mock('@ledgerhq/hw-transport-node-hid')

jest.mock('@celo/wallet-ledger', () => {
  const originalModule = jest.requireActual('@celo/wallet-ledger')
  originalModule.LedgerWallet.prototype.signTransaction = jest.fn()
  return {
    __esModule: true,
    ...originalModule,
    newLedgerWalletWithSetup: jest.fn(),
  }
})
class BasicCommand extends BaseCommand {
  async run() {
    // just parsing flags nothing to see
  }
}
// doesnt use anvil because we are testing the connection to chain
// doesnt use testLocally because that messes with the node connection
describe('flags', () => {
  let config: Config

  beforeEach(async () => {
    // copied from Commaand.run to load config
    config = await Config.load(require.main?.filename || __dirname)
  })
  describe('--node  alfajores', () => {
    it('it connects to 44787', async () => {
      const command = new BasicCommand(['--node', 'alfajores'], config)
      const runnerWeb3 = await command.getWeb3()
      const connectdChain = await runnerWeb3.eth.getChainId()
      expect(connectdChain).toBe(44787)
    })
  })
  describe('--node  baklava', () => {
    it('it connects to 62320', async () => {
      const command = new BasicCommand(['--node', 'baklava'], config)
      const runnerWeb3 = await command.getWeb3()
      const connectdChain = await runnerWeb3.eth.getChainId()
      expect(connectdChain).toBe(62320)
    })
  })
  describe.each(['celo', 'mainnet'])('--node  %s', (node) => {
    it('it connects to 42220', async () => {
      const command = new BasicCommand(['--node', node], config)
      const runnerWeb3 = await command.getWeb3()
      const connectdChain = await runnerWeb3.eth.getChainId()
      expect(connectdChain).toBe(42220)
    })
  })
  describe('--help', () => {
    it('it shows help', async () => {
      const writeSpy = jest.spyOn(ux.write, 'stdout').mockImplementation()
      const help = new CustomHelp(config)
      // transfer:celo could be ANY command --help is the important part
      await help.showHelp(['transfer:celo', '--help'])
      expect(stripAnsiCodesFromNestedArray(writeSpy.mock.calls)).toHaveLength(3)
      expect(stripAnsiCodesFromNestedArray(writeSpy.mock.calls)[1][0]).toEqual(
        expect.stringContaining(`-n, --node=<value>`)
      )
    })
  })
})

testWithAnvilL2('BaseCommand', (web3: Web3) => {
  const logSpy = jest.spyOn(console, 'log').mockImplementation()
  beforeEach(() => {
    logSpy.mockClear()
  })

  describe('with --useLedger', () => {
    describe('derivationPath tests', () => {
      it('uses default derivationPath from config', async () => {
        const storedDerivationPath = readConfig(tmpdir()).derivationPath
        console.info('storedDerivationPath', storedDerivationPath)
        expect(storedDerivationPath).not.toBe(undefined)
        await testLocallyWithWeb3Node(BasicCommand, ['--useLedger'], web3)
        expect(WalletLedgerExports.newLedgerWalletWithSetup).toHaveBeenCalledWith(
          expect.anything(),
          expect.objectContaining({
            baseDerivationPath: storedDerivationPath,
          })
        )
      })
      it('uses custom derivationPath', async () => {
        const storedDerivationPath = readConfig(tmpdir()).derivationPath
        const customPath = "m/44'/9000'/0'"
        await testLocallyWithWeb3Node(Set, ['--derivationPath', customPath], web3)
        await testLocallyWithWeb3Node(BasicCommand, ['--useLedger'], web3)
        expect(WalletLedgerExports.newLedgerWalletWithSetup).toHaveBeenCalledWith(
          expect.anything(),
          expect.objectContaining({
            baseDerivationPath: customPath,
          })
        )
        await testLocallyWithWeb3Node(Set, ['--derivationPath', storedDerivationPath], web3)
      })
    })

    it('--ledgerAddresses passes derivationPathIndexes to LedgerWallet', async () => {
      await testLocallyWithWeb3Node(BasicCommand, ['--useLedger', '--ledgerAddresses', '5'], web3)

      expect(WalletLedgerExports.newLedgerWalletWithSetup).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          changeIndexes: [0],
          derivationPathIndexes: [0, 1, 2, 3, 4],
        })
      )
      expect(logSpy.mock.calls).toMatchInlineSnapshot(`
        [
          [
            "Retrieving derivation Paths",
            [
              0,
              1,
              2,
              3,
              4,
            ],
          ],
        ]
      `)
    })

    describe('with --ledgerLiveMode', () => {
      it('--ledgerAddresses passes changeIndexes to LedgerWallet', async () => {
        await testLocallyWithWeb3Node(
          BasicCommand,
          ['--useLedger', '--ledgerLiveMode', '--ledgerAddresses', '5'],
          web3
        )

        expect(WalletLedgerExports.newLedgerWalletWithSetup).toHaveBeenCalledWith(
          expect.anything(),
          expect.objectContaining({
            changeIndexes: [0, 1, 2, 3, 4],
            derivationPathIndexes: [0],
          })
        )
        expect(logSpy.mock.calls).toMatchInlineSnapshot(`
          [
            [
              "Retrieving derivation Paths",
              [
                0,
                1,
                2,
                3,
                4,
              ],
            ],
          ]
        `)
      })
      describe('with --ledgerCustomAddresses', () => {
        it('passes custom changeIndexes to LedgerWallet', async () => {
          await testLocallyWithWeb3Node(
            BasicCommand,
            ['--useLedger', '--ledgerLiveMode', '--ledgerCustomAddresses', '[1,8,9]'],
            web3
          )

          expect(WalletLedgerExports.newLedgerWalletWithSetup).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({
              changeIndexes: [1, 8, 9],
              derivationPathIndexes: [0],
            })
          )
          expect(logSpy.mock.calls).toMatchInlineSnapshot(`
            [
              [
                "Retrieving derivation Paths",
                [
                  1,
                  8,
                  9,
                ],
              ],
            ]
          `)
        })
      })
    })
    describe('with --ledgerCustomAddresses', () => {
      it('passes custom derivationPathIndexes to LedgerWallet', async () => {
        await testLocallyWithWeb3Node(
          BasicCommand,
          ['--useLedger', '--ledgerCustomAddresses', '[1,8,9]'],
          web3
        )

        expect(WalletLedgerExports.newLedgerWalletWithSetup).toHaveBeenCalledWith(
          expect.anything(),
          expect.objectContaining({
            changeIndexes: [0],
            derivationPathIndexes: [1, 8, 9],
          })
        )
        expect(logSpy.mock.calls).toMatchInlineSnapshot(`
          [
            [
              "Retrieving derivation Paths",
              [
                1,
                8,
                9,
              ],
            ],
          ]
        `)
      })
    })
  })

  it('logs command execution error', async () => {
    class TestErrorCommand extends BaseCommand {
      async run() {
        throw new Error('test error')
      }
    }

    const errorSpy = jest.spyOn(console, 'error').mockImplementation()

    await expect(
      testLocallyWithWeb3Node(TestErrorCommand, [], web3)
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"test error"`)

    expect(errorSpy.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "
      Received an error during command execution, if you believe this is a bug you can create an issue here: 
                  
      https://github.com/celo-org/developer-tooling/issues/new?assignees=&labels=bug+report&projects=&template=BUG-FORM.yml

      ",
          [Error: test error],
        ],
      ]
    `)
  })

  it('logs connection close error', async () => {
    class TestConnectionStopErrorCommand extends BaseCommand {
      async run() {
        console.log('Successful run')
      }
    }

    const writeMock = jest.spyOn(ux.write, 'stdout').mockImplementation()
    const logSpy = jest.spyOn(console, 'log').mockImplementation()
    const errorSpy = jest.spyOn(console, 'error').mockImplementation()

    jest.spyOn(Connection.prototype, 'stop').mockImplementation(() => {
      throw new Error('Mock connection stop error')
    })

    await testLocallyWithWeb3Node(TestConnectionStopErrorCommand, [], web3)

    expect(logSpy.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "Successful run",
        ],
      ]
    `)
    expect(errorSpy.mock.calls).toMatchInlineSnapshot(`[]`)
    expect(writeMock.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "Failed to close the connection: Error: Mock connection stop error
      ",
        ],
      ]
    `)
  })
})
