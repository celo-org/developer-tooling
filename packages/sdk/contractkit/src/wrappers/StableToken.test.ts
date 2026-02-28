import { StrongAddress } from '@celo/base'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import BigNumber from 'bignumber.js'
import { StableToken } from '../celo-tokens'
import { ContractKit, newKitFromProvider } from '../kit'
import { topUpWithToken } from '../test-utils/utils'
import { StableTokenWrapper } from './StableTokenWrapper'

// TEST NOTES: balances defined in test-utils/migration-override

testWithAnvilL2('StableToken Wrapper', async (provider) => {
  const kit = newKitFromProvider(provider)

  const stableTokenInfos: {
    [key in StableToken]: {
      stableToken: StableToken
      name: string
      symbol: string
    }
  } = {
    // Symbols are old in tests because the test data hasnt been updated
    [StableToken.USDm]: {
      stableToken: StableToken.USDm,
      name: 'Celo Dollar',
      symbol: 'cUSD',
    },
    [StableToken.EURm]: {
      stableToken: StableToken.EURm,
      name: 'Celo Euro',
      symbol: 'cEUR',
    },
    [StableToken.BRLm]: {
      stableToken: StableToken.BRLm,
      name: 'Celo Brazilian Real',
      symbol: 'cREAL',
    },
  }

  for (const stableTokenInfo of Object.values(stableTokenInfos)) {
    describe(stableTokenInfo.symbol, () => {
      testStableToken(
        kit,
        stableTokenInfo.stableToken,
        stableTokenInfo.name,
        stableTokenInfo.symbol
      )
    })
  }
})

export function testStableToken(
  kit: ContractKit,
  stableTokenName: StableToken,
  expectedName: string,
  expectedSymbol: string
) {
  const ONE_STABLE = new BigNumber('1e18').toFixed()

  let accounts: string[] = []
  let stableToken: StableTokenWrapper

  beforeEach(async () => {
    accounts = await kit.connection.getAccounts()
    kit.defaultAccount = accounts[0] as StrongAddress
    stableToken = await kit.contracts.getStableToken(stableTokenName)

    // Make sure the accounts we're transferring from has some stable token
    for (let i = 0; i <= 3; i++) {
      await topUpWithToken(kit, stableTokenName, accounts[i], new BigNumber(ONE_STABLE))
    }
  })

  it('checks balance', () => expect(stableToken.balanceOf(accounts[0])).resolves.toBeBigNumber())
  it('checks decimals', () => expect(stableToken.decimals()).resolves.toBe(18))
  it('checks name', () => expect(stableToken.name()).resolves.toBe(expectedName))
  it('checks symbol', () => expect(stableToken.symbol()).resolves.toBe(expectedSymbol))
  it('checks totalSupply', () => expect(stableToken.totalSupply()).resolves.toBeBigNumber())

  it('transfers', async () => {
    const before = await stableToken.balanceOf(accounts[1])
    await stableToken.transfer(accounts[1], ONE_STABLE)

    const after = await stableToken.balanceOf(accounts[1])
    expect(after.minus(before)).toEqBigNumber(ONE_STABLE)
  })

  it('approves spender', async () => {
    const before = await stableToken.allowance(accounts[0], accounts[1])
    expect(before).toEqBigNumber(0)

    await stableToken.approve(accounts[1], ONE_STABLE)
    const after = await stableToken.allowance(accounts[0], accounts[1])
    expect(after).toEqBigNumber(ONE_STABLE)
  })

  it('transfers from', async () => {
    const before = await stableToken.balanceOf(accounts[3])
    // account1 approves account0
    await stableToken.approve(accounts[1], ONE_STABLE, { from: accounts[0] })

    await stableToken.transferFrom(accounts[0], accounts[3], ONE_STABLE, {
      from: accounts[1],
    })
    const after = await stableToken.balanceOf(accounts[3])
    expect(after.minus(before)).toEqBigNumber(ONE_STABLE)
  })
}
