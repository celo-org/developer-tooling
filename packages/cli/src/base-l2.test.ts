import { Connection } from '@celo/connect'
import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import { Config, ux } from '@oclif/core'
import http from 'http'
import Web3 from 'web3'
import { BaseCommand } from './base'
import CustomHelp from './help'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from './test-utils/cliUtils'
import * as config from './utils/config'

process.env.NO_SYNCCHECK = 'true'

// doesnt use anvil because we are testing the connection to chain
// doesnt use testLocally because that messes with the node connection
describe('flags', () => {
  let config: Config
  class BasicCommand extends BaseCommand {
    async run() {
      console.log('Hello, world!')
    }
  }
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
  describe('--node  celo', () => {
    it('it connects to 42220', async () => {
      const command = new BasicCommand(['--node', 'celo'], config)
      const runnerWeb3 = await command.getWeb3()
      const connectdChain = await runnerWeb3.eth.getChainId()
      expect(connectdChain).toBe(42220)
    })
  })
  describe('--help', () => {
    it('it shows help', async () => {
      const writeSpy = jest.spyOn(ux.write, 'stdout')
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
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('logs command execution error', async () => {
    class TestErrorCommand extends BaseCommand {
      async run() {
        throw new Error('test error')
      }
    }

    const errorSpy = jest.spyOn(console, 'error')

    await expect(testLocallyWithWeb3Node(TestErrorCommand, [], web3)).rejects.toThrow()

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

    const writeMock = jest.spyOn(ux.write, 'stdout')
    const logSpy = jest.spyOn(console, 'log')
    const errorSpy = jest.spyOn(console, 'error')

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

  it('sends telemetry data successfuly on success', async () => {
    class TestTelemetryCommand extends BaseCommand {
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

    await expect(TestTelemetryCommand.run([])).rejects.toMatchInlineSnapshot(`[Error: test error]`)

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
  })
})
