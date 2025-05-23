import * as fs from 'fs-extra'
import { join } from 'node:path'
import { tmpdir } from 'os'
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
        "derivationPath": "m/44'/60'/0'",
        "node": "http://localhost:8545",
        "telemetry": true,
      }
    `)
  })
  it('accepts node', async () => {
    const [dir] = getPaths()
    await writeConfig(dir, {
      node: 'SOME_URL',
      derivationPath: "m/44'/52752'/0'/0/0",
      telemetry: true,
    })
    expect(spy.mock.calls[0][1]).toMatchInlineSnapshot(`
      {
        "derivationPath": "m/44'/52752'/0'/0/0",
        "node": "SOME_URL",
        "telemetry": true,
      }
    `)
  })

  it('accepts telemetry', async () => {
    const [dir] = getPaths()
    await writeConfig(dir, {
      derivationPath: "m/44'/52752'/0'/0/0",
      node: 'http://localhost:8545',
      telemetry: false,
    })

    expect(spy.mock.calls[0][1]).toMatchInlineSnapshot(`
      {
        "derivationPath": "m/44'/52752'/0'/0/0",
        "node": "http://localhost:8545",
        "telemetry": false,
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
        "derivationPath": "m/44'/60'/0'",
        "foo": "bar",
        "node": "http://localhost:8545",
        "telemetry": true,
      }
    `)
  })
  it('translates legacy values into their new aliases', () => {
    const [dir, file] = getPaths()
    fs.writeJsonSync(file, { nodeUrl: 'bar' })
    expect(readConfig(dir)).toMatchInlineSnapshot(`
      {
        "derivationPath": "m/44'/60'/0'",
        "node": "bar",
        "telemetry": true,
      }
    `)
  })
  it('translates legacy values into their new aliases', () => {
    const [dir, file] = getPaths()
    fs.writeJsonSync(file, { gasCurrency: 'CELO' })
    expect(readConfig(dir)).toMatchInlineSnapshot(`
      {
        "derivationPath": "m/44'/60'/0'",
        "node": "http://localhost:8545",
        "telemetry": true,
      }
    `)
  })
})
