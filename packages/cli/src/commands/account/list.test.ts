import { ACCOUNT_ADDRESSES, ACCOUNT_PRIVATE_KEYS } from '@celo/dev-utils/lib/test-accounts'
import { viem_testWithAnvil } from '@celo/dev-utils/lib/viem/anvil-test'

import { StrongAddress } from '@celo/base'
import { getAddress } from 'viem'
import { testLocallyWithViemNode } from '../../test-utils/cliUtils'
import List from './list'

process.env.NO_SYNCCHECK = 'true'

jest.mock('@celo/viem-account-ledger', () => {
  return {
    ledgerToWalletClient: jest.fn(() => {
      return {
        getAddresses: async () => [
          '0x7457d5E02197480Db681D3fdF256c7acA21bDc12',
          '0x91c987bf62D25945dB517BDAa840A6c661374402',
        ],
      }
    }),
  }
})

viem_testWithAnvil('account:list', (client) => {
  test('shows the list of accounts', async () => {
    const accounts: StrongAddress[] = await client.request({
      method: 'eth_requestAccounts',
      params: [],
    })
    const spy = jest.spyOn(console, 'log')
    await testLocallyWithViemNode(List, [], client)
    expect(spy).toHaveBeenCalledWith(
      'All Addresses: ',
      accounts.map((x) => getAddress(x)) // checksums
    )
  })

  test('shows the list of accounts when --privateKey given', async () => {
    const spy = jest.spyOn(console, 'log')

    await testLocallyWithViemNode(List, ['-k', ACCOUNT_PRIVATE_KEYS[0]], client)
    expect(spy).toHaveBeenCalledWith('All Addresses: ', [ACCOUNT_ADDRESSES[0]])
  })

  test('shows the list of accounts when --useLedger given', async () => {
    const spy = jest.spyOn(console, 'log')

    await testLocallyWithViemNode(List, ['--useLedger'], client)
    expect(spy).toHaveBeenCalledWith('Ledger Addresses: ', [
      '0x7457d5E02197480Db681D3fdF256c7acA21bDc12',
      '0x91c987bf62D25945dB517BDAa840A6c661374402',
    ])
  })
})
