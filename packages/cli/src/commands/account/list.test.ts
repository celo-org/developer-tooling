import { StrongAddress } from '@celo/base'
import { ACCOUNT_ADDRESSES, ACCOUNT_PRIVATE_KEYS } from '@celo/dev-utils/lib/test-accounts'
import { viem_testWithAnvil } from '@celo/dev-utils/lib/viem/anvil-test'
import * as ViemLedger from '@celo/viem-account-ledger'
import { getAddress } from 'viem'
import { testLocallyWithViemNode, testWithoutChain } from '../../test-utils/cliUtils'
import List from './list'

process.env.NO_SYNCCHECK = 'true'

jest.mock('@celo/viem-account-ledger', () => {
  const actual = jest.requireActual('@celo/viem-account-ledger')
  return {
    ...actual,
    deriveLedgerAccounts: jest.fn(() => [
      { address: '0x7457d5E02197480Db681D3fdF256c7acA21bDc12' },
      { address: '0x91c987bf62D25945dB517BDAa840A6c661374402' },
    ]),
  }
})

viem_testWithAnvil('account:list', (client) => {
  let spy: jest.SpyInstance
  beforeEach(() => {
    spy = jest.spyOn(console, 'log').mockClear()
  })
  afterEach(() => jest.clearAllMocks())
  test('shows the list of accounts', async () => {
    const accounts: StrongAddress[] = await client.request({
      method: 'eth_requestAccounts',
      params: [],
    })
    await testLocallyWithViemNode(List, [], client)
    expect(spy).toHaveBeenCalledWith(
      'All Addresses: ',
      accounts.map((x) => getAddress(x)) // checksums
    )
  })

  test('shows the list of accounts when --privateKey given', async () => {
    await testLocallyWithViemNode(List, ['-k', ACCOUNT_PRIVATE_KEYS[0]], client)
    expect(spy).toHaveBeenCalledWith('All Addresses: ', [ACCOUNT_ADDRESSES[0]])
  })

  test('shows the list of accounts when --useLedger given', async () => {
    await testLocallyWithViemNode(List, ['--useLedger'], client)
    expect(spy).toHaveBeenCalledWith('Ledger Addresses: ', [
      '0x7457d5E02197480Db681D3fdF256c7acA21bDc12',
      '0x91c987bf62D25945dB517BDAa840A6c661374402',
    ])
  })
  test('it does not require a node to get the list of accounts from a ledger', async () => {
    const clientSpy = jest.spyOn(List.prototype, 'getPublicClient')
    const walletClientSpy = jest.spyOn(List.prototype, 'getWalletClient')
    const runSpy = jest.spyOn(List.prototype, 'run')
    const ledgerSpy = jest.spyOn(ViemLedger, 'deriveLedgerAccounts')
    await testWithoutChain(List, ['--useLedger'])
    expect(clientSpy).not.toHaveBeenCalled()
    expect(walletClientSpy).not.toHaveBeenCalled()
    expect(runSpy).toHaveBeenCalled()
    expect(ledgerSpy).toHaveBeenCalled()
  })
})
