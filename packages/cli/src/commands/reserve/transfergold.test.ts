import { StrongAddress } from '@celo/base'
import { newKitFromWeb3 } from '@celo/contractkit'
import { GoldTokenWrapper } from '@celo/contractkit/lib/wrappers/GoldTokenWrapper'
import { testWithAnvil } from '@celo/dev-utils/lib/anvil-test'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import TransferGold from './transfergold'

process.env.NO_SYNCCHECK = 'true'

testWithAnvil('reserve:transfergold cmd', (web3: Web3) => {
  const transferAmt = new BigNumber(100000)
  const kit = newKitFromWeb3(web3)

  let accounts: StrongAddress[] = []
  let goldToken: GoldTokenWrapper

  beforeEach(async () => {
    accounts = (await web3.eth.getAccounts()) as StrongAddress[]
    goldToken = await kit.contracts.getGoldToken()
  })
  test('transferGold fails if spender not passed in', async () => {
    await expect(
      testLocallyWithWeb3Node(
        TransferGold,
        ['--from', accounts[0], '--value', transferAmt.toString(10), '--to', accounts[9]],
        web3
      )
    ).rejects.toThrow("Some checks didn't pass!")
  })
  test('can transferGold with multisig option', async () => {
    const initialBalance = await goldToken.balanceOf(accounts[9])
    await testLocallyWithWeb3Node(
      TransferGold,
      [
        '--from',
        accounts[0],
        '--value',
        transferAmt.toString(10),
        '--to',
        accounts[9],
        '--useMultiSig',
      ],
      web3
    )
    await testLocallyWithWeb3Node(
      TransferGold,
      [
        '--from',
        accounts[7],
        '--value',
        transferAmt.toString(10),
        '--to',
        accounts[9],
        '--useMultiSig',
      ],
      web3
    )
    expect(await goldToken.balanceOf(accounts[9])).toEqual(initialBalance.plus(transferAmt))
  })
})
