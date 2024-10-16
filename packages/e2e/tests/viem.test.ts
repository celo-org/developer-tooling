import { registryABI } from '@celo/abis'

import { createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { createNonceManager, jsonRpc } from 'viem/nonce'

import { describe, expect, it } from 'vitest'

import { celoAlfajores, TEST_PRIVATE_KEY } from './common'

const publicClient = createPublicClient({
  chain: celoAlfajores,
  transport: http(),
})

const walletClient = createWalletClient({
  account: privateKeyToAccount(TEST_PRIVATE_KEY, {
    nonceManager: createNonceManager({
      source: jsonRpc(),
    }),
  }),
  transport: http(),
  chain: celoAlfajores,
})

let cEUR = publicClient.readContract({
  abi: registryABI,
  functionName: 'getAddressForString',
  address: '0x000000000000000000000000000000000000ce10',
  args: ['StableTokenEUR'],
})

describe('viem e2e test suite', () => {
  it('is setup correctly', async () => {
    const blockNumber = await publicClient.getBlockNumber()
    expect(blockNumber).toBeTypeOf('bigint')
    expect(blockNumber).toBeGreaterThan(0)
  })

  it('can get basic account info', async () => {
    const [address] = await walletClient.getAddresses()
    expect(address).toMatchInlineSnapshot(`"0x5FB3913Eb60d125Afbe7A6572E4F0F624dd945Ed"`)

    const balance = await publicClient.getBalance({ address, blockTag: 'latest' })
    expect(balance).toBeTypeOf('bigint')
    expect(balance).toBeGreaterThan(0)
  })

  it('can call a contract', async () => {
    expect(cEUR).resolves.toMatch(/^0x[A-Fa-f0-9]{40}$/)
  })

  it('can submit a basic tx', async () => {
    const tx = await walletClient.sendTransaction({
      value: 1n,
      to: await walletClient.getAddresses()[0],
    })
    expect(tx).toMatch(/^0x[A-Fa-f0-9]{64}$/)
  })
  it('can submit a feeCurrency tx', async () => {
    const tx = await walletClient.sendTransaction({
      value: 1n,
      to: await walletClient.getAddresses()[0],
      feeCurrency: await cEUR,
    })
    expect(tx).toMatch(/^0x[A-Fa-f0-9]{64}$/)
  })
})
