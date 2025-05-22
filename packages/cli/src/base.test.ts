import { Connection } from '@celo/connect'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import * as ViemAccountLedgerExports from '@celo/viem-account-ledger'
import * as WalletLedgerExports from '@celo/wallet-ledger'
import { Config, ux } from '@oclif/core'
import http from 'http'
import { tmpdir } from 'os'
import { MethodNotFoundRpcError } from 'viem'
import Web3 from 'web3'
import { BaseCommand } from './base'
import Set from './commands/config/set'
import CustomHelp from './help'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from './test-utils/cliUtils'
import { mockRpcFetch } from './test-utils/mockRpc'
import { CustomFlags } from './utils/command'
import * as config from './utils/config'
import { readConfig } from './utils/config'
import * as telemetry from './utils/telemetry'

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

jest.mock('@celo/viem-account-ledger', () => {
  const originalModule = jest.requireActual('@celo/viem-account-ledger')
  return {
    __esModule: true,
    ...originalModule,
    ledgerToWalletClient: jest.fn(),
  }
})
class BasicCommand extends BaseCommand {
  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ required: false }),
  }
  async run() {
    await this.getWalletClient()
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
  describe('--node websockets', () => {
    it('it connects to 62320', async () => {
      const command = new BasicCommand(
        ['--node', 'wss://baklava-forno.celo-testnet.org/ws'],
        config
      )
      const runnerClient = await command.getPublicClient()
      const connectdChain = runnerClient.chain
      expect(connectdChain.id).toBe(62320)
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

// Make sure telemetry tests are deterministic, otherwise we'd have to update tests every release
jest.mock('../package.json', () => ({
  version: '5.2.3',
}))

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
        expect(ViemAccountLedgerExports.ledgerToWalletClient).toHaveBeenCalledWith(
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
        expect(ViemAccountLedgerExports.ledgerToWalletClient).toHaveBeenCalledWith(
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
      expect(ViemAccountLedgerExports.ledgerToWalletClient).toHaveBeenCalledWith(
        expect.objectContaining({
          changeIndexes: [0],
          derivationPathIndexes: [0, 1, 2, 3, 4],
        })
      )
      expect(logSpy.mock.calls).toHaveLength(2)
      expect(logSpy.mock.calls[0]).toMatchInlineSnapshot(`
        [
          "Retrieving derivation Paths",
          "m/44'/60'/0'",
          [
            0,
            1,
            2,
            3,
            4,
          ],
        ]
      `)
      expect(logSpy.mock.calls[1]).toMatchInlineSnapshot(`
        [
          "Retrieving derivation Paths",
          [
            0,
            1,
            2,
            3,
            4,
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

        expect(ViemAccountLedgerExports.ledgerToWalletClient).toHaveBeenCalledWith(
          expect.objectContaining({
            changeIndexes: [0, 1, 2, 3, 4],
            derivationPathIndexes: [0],
          })
        )
        expect(logSpy.mock.calls).toHaveLength(2)
        expect(logSpy.mock.calls[0]).toMatchInlineSnapshot(`
          [
            "Retrieving derivation Paths",
            "m/44'/60'/0'",
            [
              0,
              1,
              2,
              3,
              4,
            ],
          ]
        `)
        expect(logSpy.mock.calls[1]).toMatchInlineSnapshot(`
          [
            "Retrieving derivation Paths",
            [
              0,
              1,
              2,
              3,
              4,
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

          expect(ViemAccountLedgerExports.ledgerToWalletClient).toHaveBeenCalledWith(
            expect.objectContaining({
              changeIndexes: [1, 8, 9],
              derivationPathIndexes: [0],
            })
          )
          expect(logSpy.mock.calls).toHaveLength(2)
          expect(logSpy.mock.calls[0]).toMatchInlineSnapshot(`
            [
              "Retrieving derivation Paths",
              "m/44'/60'/0'",
              [
                1,
                8,
                9,
              ],
            ]
          `)
          expect(logSpy.mock.calls[1]).toMatchInlineSnapshot(`
            [
              "Retrieving derivation Paths",
              [
                1,
                8,
                9,
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

        expect(ViemAccountLedgerExports.ledgerToWalletClient).toHaveBeenCalledWith(
          expect.objectContaining({
            changeIndexes: [0],
            derivationPathIndexes: [1, 8, 9],
          })
        )

        expect(logSpy.mock.calls).toHaveLength(2)
        expect(logSpy.mock.calls[0]).toMatchInlineSnapshot(`
          [
            "Retrieving derivation Paths",
            "m/44'/60'/0'",
            [
              1,
              8,
              9,
            ],
          ]
        `)
        expect(logSpy.mock.calls[1]).toMatchInlineSnapshot(`
          [
            "Retrieving derivation Paths",
            [
              1,
              8,
              9,
            ],
          ]
        `)
      })
    })

    describe('with --from', () => {
      it('uses it as the default account', async () => {
        await testLocallyWithWeb3Node(
          BasicCommand,
          [
            '--useLedger',
            '--ledgerCustomAddresses',
            '[1,8,9]',
            '--from',
            '0x1234567890123456789012345678901234567890',
          ],
          web3
        )

        expect(ViemAccountLedgerExports.ledgerToWalletClient).toHaveBeenCalledWith(
          expect.objectContaining({
            changeIndexes: [0],
            derivationPathIndexes: [1, 8, 9],
            account: '0x1234567890123456789012345678901234567890',
          })
        )
      })
    })
  })

  it("logs a helpful message if the node isn't unlocked", async () => {
    const clearMock = mockRpcFetch({
      method: 'eth_requestAccounts',
      error: { code: MethodNotFoundRpcError.code },
    })
    class TestErrorCommand extends BaseCommand {
      async init() {}
      async run() {
        await this.getWalletClient()
      }
    }

    const errorSpy = jest.spyOn(console, 'error').mockImplementation()

    await expect(
      testLocallyWithWeb3Node(TestErrorCommand, [], web3)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Unable to create an RPC Wallet Client, the node is not unlocked. Did you forget to use \`--privateKey\` or \`--useLedger\`?"`
    )
    expect(errorSpy.mock.calls).toMatchInlineSnapshot(`[]`)
    clearMock()
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

  it('does not log command execution error when in silent mode', async () => {
    class TestErrorCommand extends BaseCommand {
      static flags = {
        ...BaseCommand.flags,
        ...(ux.table.flags() as object),
      }

      async run() {
        throw new Error('test error')
      }
    }

    const errorSpy = jest.spyOn(console, 'error').mockImplementation()

    await expect(
      testLocallyWithWeb3Node(TestErrorCommand, ['--output', 'csv'], web3)
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"test error"`)

    expect(errorSpy.mock.calls).toMatchInlineSnapshot(`[]`)
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

  describe('telemetry', () => {
    afterEach(() => {
      jest.clearAllMocks()
      jest.restoreAllMocks()
    })

    it('sends telemetry data successfuly on success', async () => {
      class TestTelemetryCommand extends BaseCommand {
        requireSynced = false
        id = 'test:telemetry-success'

        async run() {
          console.log('Successful run')
        }
      }

      // here we test also that it works without this env var
      delete process.env.TELEMETRY_ENABLED
      process.env.TELEMETRY_URL = 'https://telemetry.example.org'

      jest.spyOn(config, 'readConfig').mockImplementation((_: string) => {
        return { telemetry: true } as config.CeloConfig
      })

      const fetchMock = jest.fn().mockResolvedValue({
        ok: true,
      })
      const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(fetchMock)

      await TestTelemetryCommand.run([])

      // Assert it was called at all in the first place
      expect(fetchSpy.mock.calls.length).toEqual(1)

      expect(fetchSpy.mock.calls[0][0]).toMatchInlineSnapshot(`"https://telemetry.example.org"`)
      expect(fetchSpy.mock.calls[0][1]?.body).toMatchInlineSnapshot(`
        "
        celocli_invocation{success="true", version="5.2.3", command="test:telemetry-success"} 1
        "
      `)
      expect(fetchSpy.mock.calls[0][1]?.headers).toMatchInlineSnapshot(`
        {
          "Content-Type": "application/octet-stream",
        }
      `)
      expect(fetchSpy.mock.calls[0][1]?.method).toMatchInlineSnapshot(`"POST"`)
      expect(fetchSpy.mock.calls[0][1]?.signal).toBeInstanceOf(AbortSignal)
      // Make sure the request was not aborted
      expect(fetchSpy.mock.calls[0][1]?.signal?.aborted).toBe(false)
    })

    it('sends telemetry data successfuly on error', async () => {
      class TestTelemetryCommand extends BaseCommand {
        requireSynced = false
        id = 'test:telemetry-error'

        async run() {
          throw new Error('test error')
        }
      }

      jest.spyOn(config, 'readConfig').mockImplementation((_: string) => {
        return { telemetry: true } as config.CeloConfig
      })

      // here we test also that it works with this env var set to 1 explicitly
      process.env.TELEMETRY_ENABLED = '1'
      process.env.TELEMETRY_URL = 'https://telemetry.example.org'

      const fetchMock = jest.fn().mockResolvedValue({
        ok: true,
      })
      const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(fetchMock)

      await expect(TestTelemetryCommand.run([])).rejects.toMatchInlineSnapshot(
        `[Error: test error]`
      )

      // Assert it was called at all in the first place
      expect(fetchSpy.mock.calls.length).toEqual(1)

      expect(fetchSpy.mock.calls[0][0]).toMatchInlineSnapshot(`"https://telemetry.example.org"`)
      expect(fetchSpy.mock.calls[0][1]?.body).toMatchInlineSnapshot(`
        "
        celocli_invocation{success="false", version="5.2.3", command="test:telemetry-error"} 1
        "
      `)
      expect(fetchSpy.mock.calls[0][1]?.headers).toMatchInlineSnapshot(`
        {
          "Content-Type": "application/octet-stream",
        }
      `)
      expect(fetchSpy.mock.calls[0][1]?.method).toMatchInlineSnapshot(`"POST"`)
      expect(fetchSpy.mock.calls[0][1]?.signal).toBeInstanceOf(AbortSignal)
      // Make sure the request was not aborted
      expect(fetchSpy.mock.calls[0][1]?.signal?.aborted).toBe(false)
    })

    it('does not send telemetry when disabled by config', async () => {
      class TestTelemetryCommand extends BaseCommand {
        requireSynced = false
        id = 'test:telemetry-should-not-be-sent'

        async run() {
          console.log('Successful run')
        }
      }

      jest.spyOn(config, 'readConfig').mockImplementation((_: string) => {
        return { telemetry: false } as config.CeloConfig
      })

      // we leave it here to double check that it is not sent even if the env var is set
      process.env.TELEMETRY_ENABLED = '1'
      process.env.TELEMETRY_URL = 'https://telemetry.example.org'

      const fetchMock = jest.fn().mockResolvedValue({
        ok: true,
      })
      const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(fetchMock)

      await TestTelemetryCommand.run([])

      expect(fetchSpy).not.toHaveBeenCalled()
    })

    it('times out after TIMEOUT', async () => {
      return new Promise<void>((resolve, _) => {
        const EXPECTED_COMMAND_RESULT = 'Successful run'

        class TestTelemetryCommand extends BaseCommand {
          requireSynced = false
          id = 'test:telemetry-timeout'

          async run() {
            return EXPECTED_COMMAND_RESULT
          }
        }

        jest.spyOn(config, 'readConfig').mockImplementation((_: string) => {
          return { telemetry: true } as config.CeloConfig
        })

        delete process.env.TELEMETRY_ENABLED
        process.env.TELEMETRY_URL = 'http://localhost:3000/'

        const fetchSpy = jest.spyOn(global, 'fetch')

        const server = http.createServer((_, res) => {
          setTimeout(() => {
            res.end()
          }, 5000) // Higher timeout than the telemetry logic uses
        })

        server.listen(3000, async () => {
          // Make sure the command actually returns
          await expect(TestTelemetryCommand.run([])).resolves.toBe(EXPECTED_COMMAND_RESULT)

          expect(fetchSpy.mock.calls.length).toEqual(1)

          expect(fetchSpy.mock.calls[0][0]).toMatchInlineSnapshot(`"http://localhost:3000/"`)
          expect(fetchSpy.mock.calls[0][1]?.body).toMatchInlineSnapshot(`
            "
            celocli_invocation{success="true", version="5.2.3", command="test:telemetry-timeout"} 1
            "
          `)
          expect(fetchSpy.mock.calls[0][1]?.headers).toMatchInlineSnapshot(`
                    {
                      "Content-Type": "application/octet-stream",
                    }
                `)
          expect(fetchSpy.mock.calls[0][1]?.method).toMatchInlineSnapshot(`"POST"`)
          expect(fetchSpy.mock.calls[0][1]?.signal).toBeInstanceOf(AbortSignal)
          // Make sure the request was aborted
          expect(fetchSpy.mock.calls[0][1]?.signal?.aborted).toBe(true)

          server.close()
          resolve()
        })
      })
    }, 10_000)

    describe('hide extra output when using --output flag', () => {
      beforeEach(() => {
        process.env.TELEMETRY_ENABLED = '1'
        process.env.TELEMETRY_URL = 'https://telemetry.example.org'

        const fetchMock = jest.fn().mockResolvedValue({
          ok: true,
        })

        jest.spyOn(global, 'fetch').mockImplementation(fetchMock)
      })

      it('does not display telemetry information when --output flag is specified', async () => {
        class TestTelemetryCommand extends BaseCommand {
          requireSynced = false
          id = 'test:telemetry-output'

          static flags = {
            ...BaseCommand.flags,
            ...(ux.table.flags() as object),
          }

          async run() {
            console.log('Successful run')
          }
        }

        jest.spyOn(telemetry, 'telemetryInformationAlreadyPrinted').mockImplementation(() => false)
        jest.spyOn(config, 'readConfig').mockImplementation((_: string) => {
          return { telemetry: true } as config.CeloConfig
        })

        const printTelemetryInformation = jest
          .spyOn(telemetry, 'printTelemetryInformation')
          .mockImplementation()

        await TestTelemetryCommand.run(['--output', 'json'])

        expect(printTelemetryInformation).not.toHaveBeenCalled()
      })

      it('displays telemetry information when --output flag is not specified', async () => {
        class TestTelemetryCommand extends BaseCommand {
          requireSynced = false
          id = 'test:telemetry-no-output'

          async run() {
            console.log('Successful run')
          }
        }

        jest.spyOn(config, 'readConfig').mockImplementation((_: string) => {
          return { telemetry: true } as config.CeloConfig
        })

        jest.spyOn(telemetry, 'telemetryInformationAlreadyPrinted').mockImplementation(() => false)
        const printTelemetryInformation = jest
          .spyOn(telemetry, 'printTelemetryInformation')
          .mockImplementation()

        await TestTelemetryCommand.run([])

        expect(printTelemetryInformation).toHaveBeenCalled()
      })
    })
  })
})
