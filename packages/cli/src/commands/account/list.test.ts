import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { testWithGanache } from '@celo/dev-utils/lib/ganache-test'
import { AddressValidation } from '@celo/wallet-ledger/lib/ledger-wallet'
import { LocalWallet } from '@celo/wallet-local'
import Web3 from 'web3'
import { testLocally } from '../../test-utils/cliUtils'
import List from './list'
process.env.NO_SYNCCHECK = 'true'

jest.mock('@ledgerhq/hw-transport-node-hid', () => {
  return {
    default: {
      open: jest.fn(() => {
        return {
          send: jest.fn(() => new Promise(() => {})),
          decorateAppAPIMethods: jest.fn(),
          close: jest.fn(),
        }
      }),
    },
  }
})

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

testWithGanache('account:list', (web3: Web3) => {
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

    await testLocally(List, [])
    expect(spy).toHaveBeenCalledWith('All Addresses: ', accounts)
  })
  test.only('shows the list of accounts when --useLedger given', async () => {
    const spy = jest.spyOn(console, 'log')

    await testLocally(List, ['--useLedger'])
    expect(spy).toHaveBeenCalledWith('Ledger Addresses: ', [
      '0x7457d5E02197480Db681D3fdF256c7acA21bDc12',
      '0x91c987bf62D25945dB517BDAa840A6c661374402',
    ])
  })
})
