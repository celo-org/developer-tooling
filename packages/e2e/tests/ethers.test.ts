import { Contract, ethers, NonceManager, Wallet } from 'ethers'

import { describe, expect, it } from 'vitest'

import { registryABI } from '@celo/abis'
import { CHAIN, TEST_PRIVATE_KEY } from './common'

const provider = new ethers.JsonRpcProvider(CHAIN.rpcUrls.default.http[0])
const signer = new NonceManager(new Wallet(TEST_PRIVATE_KEY, provider))

const cEURContract = new Contract(
  '0x000000000000000000000000000000000000ce10',
  registryABI,
  provider
)
let cEUR = cEURContract.getAddressForString('StableToken')

describe('e2e ethers test suite', () => {
  it('is setup correctly', async () => {
    const blockNumber = await provider.getBlockNumber()
    expect(blockNumber).toBeTypeOf('number')
    expect(blockNumber).toBeGreaterThan(0)
  })

  it('can get basic account info', async () => {
    const address = await signer.getAddress()
    expect(address).toMatchInlineSnapshot(`"0x5FB3913Eb60d125Afbe7A6572E4F0F624dd945Ed"`)

    const balance = await signer.provider?.getBalance(address, 'latest')
    expect(balance).toBeTypeOf('bigint')
    expect(balance).toBeGreaterThan(0n)
  })

  it('can call a contract', async () => {
    expect(cEUR).resolves.toMatch(/^0x[A-Fa-f0-9]{40}$/)
  })

  it('can submit a basic tx', async () => {
    const tx = await signer.sendTransaction({
      value: 1n,
      to: await signer.getAddress(),
    })
    await tx.wait()
    expect(tx.hash).toMatch(/^0x[A-Fa-f0-9]{64}$/)
  }, 15000)

  it.skip('can submit a feeCurrency tx', async () => {
    const tx = await signer.sendTransaction({
      value: 1n,
      to: await signer.getAddress(),
      // feeCurrency: await cEUR,
    })
    await tx.wait()
    expect(tx.hash).toMatch(/^0x[A-Fa-f0-9]{64}$/)
  })
})
