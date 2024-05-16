import { Anvil, createAnvil } from '@viem/anvil'
import { join } from 'path'
import Web3 from 'web3'
import { testWithWeb3 } from './test-utils'

let instance: null | Anvil = null

const ANVIL_PORT = 8546
const ANVIL_STATE_JSON = 'anvil-state.json'

export function getInstance(): Anvil {
  if (instance === null) {
    instance = createAnvil({
      port: ANVIL_PORT,
      loadState: join(__dirname, ANVIL_STATE_JSON),
    })
  }

  return instance
}

export function testWithAnvil(name: string, fn: (web3: Web3) => void) {
  return testWithWeb3(name, `http://127.0.0.1:${ANVIL_PORT}`, fn)
}
