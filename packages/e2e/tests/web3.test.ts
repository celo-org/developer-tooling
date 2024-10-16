import { registryABI } from '@celo/abis'
// import { CeloTransactionTypesPlugin } from '@celo/web3-plugin-transaction-types'

import { describe, expect, it } from 'vitest'

import Web3 from 'web3'

import { TEST_PRIVATE_KEY, celoAlfajores } from './common'

const web3 = new Web3(celoAlfajores.rpcUrls.default[0])
const account = web3.eth.accounts.wallet.add(TEST_PRIVATE_KEY)
web3.setProvider(new Web3.providers.HttpProvider(celoAlfajores.rpcUrls.default.http[0]))

const cEURContract = new web3.eth.Contract(
  registryABI as any,
  '0x000000000000000000000000000000000000ce10'
)
let cEUR = cEURContract.methods.getAddressForString('StableToken').call()

describe('e2e web3 test suite', () => {
  it('is setup correctly', async () => {
    const blockNumber = await web3.eth.getBlockNumber()
    expect(blockNumber).toBeTypeOf('number')
    expect(blockNumber).toBeGreaterThan(0)
  })

  it('can get basic account info', async () => {
    const { address } = account
    expect(address).toMatchInlineSnapshot(`"0x5FB3913Eb60d125Afbe7A6572E4F0F624dd945Ed"`)

    const balance = await web3.eth.getBalance(address, 'latest')
    expect(balance).toBeTypeOf('string')
    expect(balance).toMatch(/\d+/)
    expect(BigInt(balance)).toBeGreaterThan(0n)
  })

  it('can call a contract', async () => {
    expect(cEUR).resolves.toMatch(/^0x[A-Fa-f0-9]{40}$/)
  })

  it('can submit a basic tx', async () => {
    const params = {
      value: 1,
      from: account.address,
      to: account.address,
    } as const

    const tx = await web3.eth.sendTransaction({
      ...params,
      gas: await web3.eth.estimateGas(params),
    })

    expect(tx.transactionHash).toMatch(/^0x[A-Fa-f0-9]{64}$/)
  }, 15000)

  it.skip('can submit a feeCurrency tx', async () => {
    // web3.registerPlugin(new CeloTransactionTypesPlugin())
    // web3.celo.link(web3)
    // web3.eth.defaultAccount = account.address
    // const params = {
    //   value: 1,
    //   from: account.address,
    //   to: account.address,
    //   feeCurrency: await cEUR,
    // } as const
    // await web3.celo.populateTransaction(params)
    // const tx = await web3.eth.sendTransaction({
    //   ...params,
    // })
    // expect(tx.transactionHash).toMatch(/^0x[A-Fa-f0-9]{64}$/)
  })
})
