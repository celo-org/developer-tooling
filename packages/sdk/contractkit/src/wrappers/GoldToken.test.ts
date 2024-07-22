import { StrongAddress } from '@celo/base'
import { testWithAnvil } from '@celo/dev-utils/lib/anvil-test'
import { testWithGanache } from '@celo/dev-utils/lib/ganache-test'
import { newKitFromWeb3 } from '../kit'
import { GoldTokenWrapper } from './GoldTokenWrapper'

testWithAnvil('GoldToken Wrapper', (web3) => {
  const ONE_GOLD = web3.utils.toWei('1', 'ether')

  const kit = newKitFromWeb3(web3)
  let accounts: StrongAddress[] = []
  let goldToken: GoldTokenWrapper

  beforeAll(async () => {
    accounts = (await web3.eth.getAccounts()) as StrongAddress[]
    kit.defaultAccount = accounts[0]
    goldToken = await kit.contracts.getGoldToken()
  })

  it('checks balance', () => expect(goldToken.balanceOf(accounts[0])).resolves.toBeBigNumber())
  it('checks decimals', () => expect(goldToken.decimals()).resolves.toBe(18))
  it('checks name', () => expect(goldToken.name()).resolves.toBe('Celo native asset'))
  it('checks symbol', () => expect(goldToken.symbol()).resolves.toBe('CELO'))
  it('checks totalSupply', () => expect(goldToken.totalSupply()).resolves.toBeBigNumber())

  it('approves spender', async () => {
    const before = await goldToken.allowance(accounts[0], accounts[1])
    expect(before).toEqBigNumber(0)

    await goldToken.approve(accounts[1], ONE_GOLD).sendAndWaitForReceipt()
    const after = await goldToken.allowance(accounts[0], accounts[1])
    expect(after).toEqBigNumber(ONE_GOLD)
  })
})

// Need to be tested with ganache because of missing transfer precompile
testWithGanache('GoldToken Wrapper', (web3) => {
  const ONE_GOLD = web3.utils.toWei('1', 'ether')

  const kit = newKitFromWeb3(web3)
  let accounts: StrongAddress[] = []
  let goldToken: GoldTokenWrapper

  beforeAll(async () => {
    accounts = (await web3.eth.getAccounts()) as StrongAddress[]
    kit.defaultAccount = accounts[0]
    goldToken = await kit.contracts.getGoldToken()
  })

  it('transfers', async () => {
    const before = await goldToken.balanceOf(accounts[1])
    const tx = await goldToken.transfer(accounts[1], ONE_GOLD).send()
    await tx.waitReceipt()

    const after = await goldToken.balanceOf(accounts[1])
    expect(after.minus(before)).toEqBigNumber(ONE_GOLD)
  })

  it('transfers from', async () => {
    const before = await goldToken.balanceOf(accounts[3])
    // account1 approves account0
    await goldToken.approve(accounts[0], ONE_GOLD).sendAndWaitForReceipt({ from: accounts[1] })
    const tx = await goldToken.transferFrom(accounts[1], accounts[3], ONE_GOLD).send()
    await tx.waitReceipt()
    const after = await goldToken.balanceOf(accounts[3])
    expect(after.minus(before)).toEqBigNumber(ONE_GOLD)
  })
})
