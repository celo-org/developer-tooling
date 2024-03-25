import * as fs from 'fs-extra'
import { tmpdir } from 'os'
import { join } from 'path'
import { CeloConfig, readConfig, writeConfig } from './config'

// NOTE: for some reason if I don't mock the whole module, jest fails
// to spy on outputJSONSync
jest.mock('fs-extra', () => ({ __esModule: true, ...jest.requireActual('fs-extra') }))

const getPaths = () => {
  const dir = tmpdir()
  return [dir, join(dir, 'config.json')]
}

const spy = jest.spyOn(fs, 'outputJSONSync')

beforeEach(() => {
  spy.mockClear()
})

describe('writeConfig', () => {
  it('accepts an empty config', async () => {
    const [dir, file] = getPaths()
    writeConfig(dir, {} as CeloConfig)

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy.mock.calls[0]).toHaveLength(2)
    expect(spy.mock.calls[0][0]).toEqual(file)
    expect(spy.mock.calls[0][1]).toMatchInlineSnapshot(`
        {
          "node": "http://localhost:8545",
        }
      `)
  })
  it('accepts node', async () => {
    const [dir] = getPaths()
    await writeConfig(dir, { node: 'SOME_URL' })
    expect(spy.mock.calls[0][1]).toMatchInlineSnapshot(`
        {
          "node": "SOME_URL",
        }
      `)
  })
})

describe('readConfig', () => {
  it('reads arbitrary JSON at the file location', () => {
    const [dir, file] = getPaths()
    fs.writeJsonSync(file, { foo: 'bar' })
    expect(readConfig(dir)).toMatchInlineSnapshot(`
      {
        "foo": "bar",
        "node": "http://localhost:8545",
      }
    `)
  })
  it('translates legacy values into their new aliases', () => {
    const [dir, file] = getPaths()
    fs.writeJsonSync(file, { nodeUrl: 'bar' })
    expect(readConfig(dir)).toMatchInlineSnapshot(`
      {
        "node": "bar",
      }
    `)
  })
  it('translates legacy values into their new aliases', () => {
    const [dir, file] = getPaths()
    fs.writeJsonSync(file, { gasCurrency: 'CELO' })
    expect(readConfig(dir)).toMatchInlineSnapshot(`
      {
        "node": "http://localhost:8545",
      }
    `)
  })
})
