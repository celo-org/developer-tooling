import { ContractKit, newKitFromWeb3, StableToken } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { topUpWithToken } from '../../test-utils/chain-setup'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Balance from './balance'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('account:set-name cmd', (web3: Web3) => {
  const consoleMock = jest.spyOn(console, 'log')
  let accounts: string[] = []
  let kit: ContractKit

  beforeEach(async () => {
    kit = newKitFromWeb3(web3)
    accounts = await web3.eth.getAccounts()
    consoleMock.mockClear()
  })

  it('shows the balance of the account in several currencies', async () => {
    await testLocallyWithWeb3Node(Balance, [accounts[0]], web3)

    expect(stripAnsiCodesFromNestedArray(consoleMock.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "All balances expressed in units of 10^-18.",
        ],
        [
          "lockedCELO: 0
      pending: 0
      CELO: 1e+24
      cUSD: 0
      cEUR: 0
      cREAL: 0",
        ],
      ]
    `)
  })

  it('shows the balance of the account in given currency', async () => {
    const amount = new BigNumber('1234567890000000000000')
    await topUpWithToken(kit, StableToken.cUSD, accounts[0], amount)

    await testLocallyWithWeb3Node(
      Balance,
      [
        accounts[0],
        '--erc20Address',
        (await kit.contracts.getStableToken(StableToken.cUSD)).address,
      ],
      web3
    )

    expect(stripAnsiCodesFromNestedArray(consoleMock.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "All balances expressed in units of 10^-18.",
        ],
        [
          "lockedCELO: 0
      pending: 0
      CELO: 1e+24
      cUSD: ${amount.toExponential()}
      cEUR: 0
      cREAL: 0",
        ],
        [
          "erc20: ${amount.toExponential()}",
        ],
      ]
    `)
  })
})
