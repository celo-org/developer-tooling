import { StrongAddress } from '@celo/base'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import BigNumber from 'bignumber.js'
import { StableToken } from '../celo-tokens'
import { ContractKit, newKitFromWeb3 } from '../kit'
import { topUpWithToken } from '../test-utils/utils'
import { StableTokenWrapper } from './StableTokenWrapper'

// TEST NOTES: balances defined in test-utils/migration-override

testWithAnvilL2('StableToken Wrapper', async (web3) => {
  const kit = newKitFromWeb3(web3)

  const stableTokenInfos: {
    [key in StableToken]: {
      stableToken: StableToken
      name: string
      symbol: string
    }
  } = {
    [StableToken.cUSD]: {
      stableToken: StableToken.cUSD,
      name: 'Celo Dollar',
      symbol: 'cUSD',
    },
    [StableToken.cEUR]: {
      stableToken: StableToken.cEUR,
      name: 'Celo Euro',
      symbol: 'cEUR',
    },
    [StableToken.cREAL]: {
      stableToken: StableToken.cREAL,
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
  const web3 = kit.web3
  const ONE_STABLE = web3.utils.toWei('1', 'ether')

  let accounts: string[] = []
  let stableToken: StableTokenWrapper

  beforeEach(async () => {
    accounts = (await web3.eth.getAccounts()) as StrongAddress[]
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
    const tx = await stableToken.transfer(accounts[1], ONE_STABLE).send()
    await tx.waitReceipt()

    const after = await stableToken.balanceOf(accounts[1])
    expect(after.minus(before)).toEqBigNumber(ONE_STABLE)
  })

  it('approves spender', async () => {
    const before = await stableToken.allowance(accounts[0], accounts[1])
    expect(before).toEqBigNumber(0)

    await stableToken.approve(accounts[1], ONE_STABLE).sendAndWaitForReceipt()
    const after = await stableToken.allowance(accounts[0], accounts[1])
    expect(after).toEqBigNumber(ONE_STABLE)
  })

  it('transfers from', async () => {
    const before = await stableToken.balanceOf(accounts[3])
    // account1 approves account0
    await stableToken.approve(accounts[1], ONE_STABLE).sendAndWaitForReceipt({ from: accounts[0] })

    const tx = await stableToken
      .transferFrom(accounts[0], accounts[3], ONE_STABLE)
      .send({ from: accounts[1] })
    await tx.waitReceipt()
    const after = await stableToken.balanceOf(accounts[3])
    expect(after.minus(before)).toEqBigNumber(ONE_STABLE)
  })
}
