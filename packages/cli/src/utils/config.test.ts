import * as fs from 'fs-extra'
import { tmpdir } from 'os'
import { join } from 'path'
import { CeloConfig, writeConfig } from './config'

// NOTE: for some reason if I don't mock the whole module, jest fails
// to spy on outputJSONSync
jest.mock('fs-extra', () => ({ __esModule: true, ...jest.requireActual('fs-extra') }))

const PATH = tmpdir()
const spy = jest.spyOn(fs, 'outputJSONSync')

beforeEach(() => {
  spy.mockClear()
})

describe('writeConfig', () => {
  it('accepts an empty config', async () => {
    writeConfig(PATH, {} as CeloConfig)

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy.mock.calls[0]).toHaveLength(2)
    expect(spy.mock.calls[0][0]).toEqual(join(PATH, 'config.json'))
    expect(spy.mock.calls[0][1]).toMatchInlineSnapshot(`
        {
          "node": "http://localhost:8545",
        }
      `)
  })
  it('accepts node', async () => {
    await writeConfig(PATH, { node: 'SOME_URL' })
    expect(spy.mock.calls[0][1]).toMatchInlineSnapshot(`
        {
          "node": "SOME_URL",
        }
      `)
  })
  it('ignores gasCurrency (legacy)', async () => {
    await writeConfig(PATH, { node: 'SOME_URL' })
    expect(spy.mock.calls[0][1]).toMatchInlineSnapshot(`
      {
        "node": "SOME_URL",
      }
    `)
  })
})
