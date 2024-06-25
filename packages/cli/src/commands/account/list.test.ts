import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvil } from '@celo/dev-utils/lib/anvil-test'
import { AddressValidation } from '@celo/wallet-ledger/lib/ledger-wallet'
import { LocalWallet } from '@celo/wallet-local'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import List from './list'

process.env.NO_SYNCCHECK = 'true'

jest.mock('@celo/wallet-ledger', () => {
  return {
    AddressValidation,
    newLedgerWalletWithSetup: jest.fn(() => {
      const wallet = new LocalWallet()
      jest.spyOn(wallet, 'getAccounts').mockImplementation(() => {
        return [
          '0x7457d5E02197480Db681D3fdF256c7acA21bDc12',
          '0x91c987bf62D25945dB517BDAa840A6c661374402',
        ]
      })
      return wallet
    }),
  }
})

testWithAnvil('account:list', (web3: Web3) => {
  let account: string
  let accounts: string[]
  let kit: ContractKit

  beforeEach(async () => {
    accounts = await web3.eth.getAccounts()
    kit = newKitFromWeb3(web3)
    account = accounts[0]

    const accountsInstance = await kit.contracts.getAccounts()
    await accountsInstance.createAccount().sendAndWaitForReceipt({ from: account })
  })

  test('shows the list of accounts', async () => {
    const spy = jest.spyOn(console, 'log')

    await testLocallyWithWeb3Node(List, [], web3)
    expect(spy).toHaveBeenCalledWith('All Addresses: ', accounts)
  })

  test('shows the list of accounts when --useLedger given', async () => {
    const spy = jest.spyOn(console, 'log')

    await testLocallyWithWeb3Node(List, ['--useLedger'], web3)
    expect(spy).toHaveBeenCalledWith('Ledger Addresses: ', [
      '0x7457d5E02197480Db681D3fdF256c7acA21bDc12',
      '0x91c987bf62D25945dB517BDAa840A6c661374402',
    ])
  })
})
