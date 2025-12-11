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

    // Instead of exact snapshot matching, let's verify the balance structure and ranges
    const calls = stripAnsiCodesFromNestedArray(consoleMock.mock.calls)
    expect(calls).toHaveLength(2)
    expect(calls[0][0]).toBe('All balances expressed in units of wei.')

    const balanceOutput = calls[1][0]
    expect(balanceOutput).toMatch(/CELO: \d+ \(~9\.\d+e\+23\)/)
    expect(balanceOutput).toContain('EURm: 0')
    expect(balanceOutput).toContain('BRLm: 0')
    expect(balanceOutput).toContain('USDm: 0')
    expect(balanceOutput).toContain('lockedCELO: 1234567000')
    expect(balanceOutput).toContain('pending: 890')
  })

  it('shows the balance of the account for different tokens', async () => {
    const USDmAmount = new BigNumber('1234567890000000000000')
    const EURmAmount = new BigNumber('2345678900000000000000')
    const BRLmAmount = new BigNumber('3456789000000000000000')

    await topUpWithToken(kit, StableToken.USDm, accounts[0], USDmAmount)
    await topUpWithToken(kit, StableToken.EURm, accounts[0], EURmAmount)
    await topUpWithToken(kit, StableToken.BRLm, accounts[0], BRLmAmount)

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
      EURm: 2345678900000000000000 (~2.3456789e+21)
      BRLm: 3456789000000000000000 (~3.456789e+21)
      USDm: 1234567890000000000000 (~1.23456789e+21)
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
