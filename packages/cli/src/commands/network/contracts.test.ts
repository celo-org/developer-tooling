import { Connection } from '@celo/connect'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import write from '@oclif/core/lib/cli-ux/write'
import { testLocallyWithNode } from '../../test-utils/cliUtils'
import Contracts from './contracts'
process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('network:contracts', (provider) => {
  describe('when version can be obtained', () => {
    test('runs', async () => {
      const spy = jest.spyOn(write, 'stdout')
      const warnSpy = jest.spyOn(console, 'warn')
      expect(warnSpy.mock.calls).toMatchInlineSnapshot(`[]`)
      await testLocallyWithNode(Contracts, ['--output', 'json'], provider)
      expect(spy.mock.calls).toMatchSnapshot()
    })
  })
  describe('when version cant be obtained', () => {
    // Capture the real viemClient getter before any spying
    const realViemClientGetter = Object.getOwnPropertyDescriptor(
      Connection.prototype,
      'viemClient'
    )!.get!

    let viemClientSpy: jest.SpyInstance
    beforeEach(() => {
      const modifiedClients = new WeakSet()
      viemClientSpy = jest
        .spyOn(Connection.prototype, 'viemClient', 'get')
        .mockImplementation(function (this: Connection) {
          const client = realViemClientGetter.call(this)
          if (!modifiedClients.has(client)) {
            const origCall = client.call.bind(client)
            // Intercept getVersionNumber() calls (selector 0x54255be0)
            // and return ABI-encoded [1, 2, 3, 4] for deterministic version output
            client.call = async (params: any) => {
              if (params?.data?.startsWith?.('0x54255be0')) {
                return {
                  data: '0x0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000004',
                }
              }
              return origCall(params)
            }
            modifiedClients.add(client)
          }
          return client
        })
    })
    afterEach(() => {
      viemClientSpy.mockRestore()
      jest.clearAllMocks()
    })
    it('still prints rest of contracts', async () => {
      const spy = jest.spyOn(write, 'stdout')
      const warnSpy = jest.spyOn(console, 'warn')

      await testLocallyWithNode(Contracts, ['--output', 'json'], provider)
      expect(warnSpy.mock.calls).toMatchInlineSnapshot(`[]`)
      expect(spy.mock.calls).toMatchSnapshot() // see the file for the snapshot
    })
  })
})
