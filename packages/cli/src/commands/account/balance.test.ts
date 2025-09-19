import { ContractKit, newKitFromWeb3, StableToken } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { topUpWithToken } from '../../test-utils/chain-setup'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Lock from '../lockedcelo/lock'
import Unlock from '../lockedcelo/unlock'
import Balance from './balance'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('account:balance cmd', (web3: Web3) => {
  const consoleMock = jest.spyOn(console, 'log')
  let accounts: string[] = []
  let kit: ContractKit

  beforeEach(async () => {
    kit = newKitFromWeb3(web3)
    accounts = await web3.eth.getAccounts()
    consoleMock.mockClear()
  })

  it('shows the balance of the account for CELO only', async () => {
    await testLocallyWithWeb3Node(Lock, ['--from', accounts[0], '--value', '1234567890'], web3)
    await testLocallyWithWeb3Node(Unlock, ['--from', accounts[0], '--value', '890'], web3)

    consoleMock.mockClear()

    await testLocallyWithWeb3Node(Balance, [accounts[0]], web3)

    expect(stripAnsiCodesFromNestedArray(consoleMock.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "All balances expressed in units of wei.",
        ],
        [
          "CELO: 999999992104924367432905 (~9.99999992104924367432905e+23)
      cEUR: 0 
      cREAL: 0 
      cUSD: 0 
      lockedCELO: 1234567000 (~1.234567e+9)
      pending: 890 ",
        ],
      ]
    `)
  })

  it('shows the balance of the account for different tokens', async () => {
    const cUSDAmount = new BigNumber('1234567890000000000000')
    const cEURAmount = new BigNumber('2345678900000000000000')
    const cREALAmount = new BigNumber('3456789000000000000000')

    await topUpWithToken(kit, StableToken.cUSD, accounts[0], cUSDAmount)
    await topUpWithToken(kit, StableToken.cEUR, accounts[0], cEURAmount)
    await topUpWithToken(kit, StableToken.cREAL, accounts[0], cREALAmount)

    await testLocallyWithWeb3Node(
      Balance,
      [accounts[0], '--erc20Address', (await kit.contracts.getGoldToken()).address],
      web3
    )

    expect(stripAnsiCodesFromNestedArray(consoleMock.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "All balances expressed in units of wei.",
        ],
        [
          "CELO: 1000000000000000000000000 (~1e+24)
      cEUR: 2345678900000000000000 (~2.3456789e+21)
      cREAL: 3456789000000000000000 (~3.456789e+21)
      cUSD: 1234567890000000000000 (~1.23456789e+21)
      lockedCELO: 0 
      pending: 0 ",
        ],
        [
          "erc20: 1000000000000000000000000 (~1e+24)",
        ],
      ]
    `)
  })
})
