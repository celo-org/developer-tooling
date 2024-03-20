import { StableToken, StrongAddress } from '@celo/base'
import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithGanache } from '@celo/dev-utils/lib/ganache-test'
import * as fs from 'fs-extra'
import { tmpdir } from 'os'
import { join } from 'path'
import { CeloConfig, LegacyCeloConfig, getGasCurrency, writeConfig } from './config'

// NOTE: for some reason if I don't mock the whole module, jest fails
// to spy on outputJSONSync
jest.mock('fs-extra', () => ({ __esModule: true, ...jest.requireActual('fs-extra') }))

const PATH = tmpdir()
const spy = jest.spyOn(fs, 'outputJSONSync')

beforeEach(() => {
  spy.mockClear()
})

testWithGanache('config', (web3) => {
  const kit = newKitFromWeb3(web3)
  describe('writeConfig', () => {
    test('empty config', async () => {
      writeConfig(PATH, {} as CeloConfig, kit)

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy.mock.calls[0]).toHaveLength(2)
      expect(spy.mock.calls[0][0]).toEqual(join(PATH, 'config.json'))
      expect(spy.mock.calls[0][1]).toMatchInlineSnapshot(`
        {
          "node": "http://localhost:8545",
        }
      `)
    })
    test('node', async () => {
      await writeConfig(PATH, { node: 'SOME_URL' }, kit)
      expect(spy.mock.calls[0][1]).toMatchInlineSnapshot(`
        {
          "node": "SOME_URL",
        }
      `)
    })
    test('gasCurrency auto (legacy)', async () => {
      await writeConfig(PATH, { gasCurrency: 'auto' } as LegacyCeloConfig, kit)
      expect(spy.mock.calls[0][1]).toMatchInlineSnapshot(`
        {
          "node": "http://localhost:8545",
        }
      `)
    })
    test('gasCurrency StableToken (legacy)', async () => {
      await writeConfig(PATH, { gasCurrency: 'cUSD' } as LegacyCeloConfig, kit)
      expect(spy.mock.calls[0][1]).toMatchInlineSnapshot(`
        {
          "gasCurrency": "0x5315e44798395d4a952530d131249fE00f554565",
          "node": "http://localhost:8545",
        }
      `)
    })
    test('gasCurrency CELO', async () => {
      await writeConfig(PATH, { gasCurrency: 'CELO' } as LegacyCeloConfig, kit)
      expect(spy.mock.calls[0][1]).toMatchInlineSnapshot(`
        {
          "node": "http://localhost:8545",
        }
      `)
    })
    test('gasCurrency badly formatted address', async () => {
      await expect(
        writeConfig(PATH, { gasCurrency: '0x123' as StrongAddress } as CeloConfig, kit)
      ).rejects.toMatchInlineSnapshot(`[Error: Invalid address 0x123]`)
    })
    test('gasCurrency wrong address', async () => {
      await expect(
        writeConfig(
          PATH,
          {
            gasCurrency: '0x0000000000000000000000000000000000000000' as StrongAddress,
          } as CeloConfig,
          kit
        )
      ).rejects.toMatchInlineSnapshot(`
        [Error: 0x0000000000000000000000000000000000000000 is not a valid fee currency. Available currencies:
        0x5315e44798395d4a952530d131249fE00f554565 - Celo Dollar (cUSD)
        0x965D352283a3C8A016b9BBbC9bf6306665d495E7 - Celo Brazilian Real (cREAL)
        0xdD66C23e07b4D6925b6089b5Fe6fc9E62941aFE8 - Celo Euro (cEUR)]
      `)
    })

    test('gasCurrency address', async () => {
      await writeConfig(
        PATH,
        {
          gasCurrency: (await kit.contracts.getStableToken(StableToken.cEUR)).address,
        } as CeloConfig,
        kit
      )
      expect(spy.mock.calls[0][1]).toMatchInlineSnapshot(`
        {
          "gasCurrency": "0xdD66C23e07b4D6925b6089b5Fe6fc9E62941aFE8",
          "node": "http://localhost:8545",
        }
      `)
    })
  })

  describe('getGasCurrency', () => {
    test('empty', async () => {
      fs.outputJSONSync(join(PATH, 'config.json'), {})
      expect(await getGasCurrency(PATH, kit)).toBe(undefined)
    })
    test('CELO', async () => {
      fs.outputJSONSync(join(PATH, 'config.json'), { getGasCurrency: 'CELO' })
      expect(await getGasCurrency(PATH, kit)).toBe(undefined)
    })
    test('address', async () => {
      fs.outputJSONSync(join(PATH, 'config.json'), {
        gasCurrency: '0x0000000000000000000000000000000000000000',
      })
      expect(await getGasCurrency(PATH, kit)).toBe('0x0000000000000000000000000000000000000000')
    })
    test('legacy', async () => {
      fs.outputJSONSync(join(PATH, 'config.json'), { gasCurrency: 'cEUR' })
      expect(await getGasCurrency(PATH, kit)).toBe(
        (await kit.contracts.getStableToken(StableToken.cEUR)).address
      )
    })
  })
})
