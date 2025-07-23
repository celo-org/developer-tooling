import { StrongAddress } from '@celo/base'
import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import Web3 from 'web3'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import { createMultisig } from '../../test-utils/multisigUtils'
import ProposeMultiSig from './propose'
import ShowMultiSig from './show'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('multisig:show integration tests', (web3: Web3) => {
  let kit: ContractKit
  let accounts: StrongAddress[]
  let multisigAddress: StrongAddress
  let owner1: StrongAddress
  let owner2: StrongAddress
  let owner3: StrongAddress

  beforeAll(async () => {
    kit = newKitFromWeb3(web3)
    accounts = (await web3.eth.getAccounts()) as StrongAddress[]

    // Set up test accounts
    owner1 = accounts[0]
    owner2 = accounts[1]
    owner3 = accounts[2]

    // Create a multisig with 3 owners requiring 2 signatures
    multisigAddress = await createMultisig(kit, [owner1, owner2, owner3], 2, 1)
  })

  afterAll(async () => {
    kit.connection.stop()
  })

  describe('show multisig information', () => {
    it('shows basic multisig information', async () => {
      const logMock = jest.spyOn(console, 'log')
      await testLocallyWithWeb3Node(ShowMultiSig, [multisigAddress], web3)
      expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
        [
          [
            "Owners: 
          0: 0x5409ED021D9299bf6814279A6A1411A7e866A631
          1: 0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb
          2: 0xE36Ea790bc9d7AB70C55260C66D52b1eca985f84
        Required confirmations: 2 
        Required confirmations (internal): 1 
        Transactions: 0 ",
          ],
        ]
      `)
    })

    it('shows information about a specific transaction', async () => {
      // First, propose a transaction
      const recipient = accounts[4]
      const value = '1000000000000000000' // 1 CELO in wei

      await testLocallyWithWeb3Node(
        ProposeMultiSig,
        [multisigAddress, '--from', owner1, '--to', recipient, '--value', value],
        web3
      )
      const logMock = jest.spyOn(console, 'log')

      // Now show the specific transaction
      const result = await testLocallyWithWeb3Node(
        ShowMultiSig,
        [multisigAddress, '--tx', '0'],
        web3
      )
      expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
        [
          [
            "Running Checks:",
          ],
          [
            "   ✔  The provided address is an owner of the multisig ",
          ],
          [
            "All checks passed",
          ],
          [
            "SendTransaction: multisig: proposing transaction",
          ],
          [
            "txHash: 0xtxhash",
          ],
          [
            "Owners: 
          0: 0x5409ED021D9299bf6814279A6A1411A7e866A631
          1: 0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb
          2: 0xE36Ea790bc9d7AB70C55260C66D52b1eca985f84
        Required confirmations: 2 
        Required confirmations (internal): 1 
        Transactions: 
          0: 0x78dc5D2D739606d31509C31d654056A45185ECb6
          1: 1000000000000000000 (~1e+18)
          2: 0x
          3: false
          data: null",
          ],
        ]
      `)
      expect(result).toBeUndefined()
    })

    it('shows raw transaction data', async () => {
      const logMock = jest.spyOn(console, 'log')

      await testLocallyWithWeb3Node(ShowMultiSig, [multisigAddress, '--all', '--raw'], web3)

      expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
        [
          [
            "Owners: 
          0: 0x5409ED021D9299bf6814279A6A1411A7e866A631
          1: 0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb
          2: 0xE36Ea790bc9d7AB70C55260C66D52b1eca985f84
        Required confirmations: 2 
        Required confirmations (internal): 1 
        Transactions: 
        ",
          ],
        ]
      `)
    })

    it('fails with invalid multisig address', async () => {
      await expect(
        testLocallyWithWeb3Node(ShowMultiSig, ['0x0000000000000000000000000000000000000000'], web3)
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        "The contract function "getTransactionCount" returned no data ("0x").

        This could be due to any of the following:
          - The contract does not have the function "getTransactionCount",
          - The parameters passed to the contract function may be invalid, or
          - The address is not a contract.
         
        Contract Call:
          address:   0x0000000000000000000000000000000000000000
          function:  getTransactionCount(bool pending, bool executed)
          args:                         (true, true)

        Docs: https://viem.sh/docs/contract/readContract
        Version: viem@2.29.2"
      `)
    })

    it('returns with empty tx info when showing non-existent transaction', async () => {
      const logMock = jest.spyOn(console, 'log')

      await expect(
        testLocallyWithWeb3Node(ShowMultiSig, [multisigAddress, '--tx', '999271717'], web3)
      ).resolves.toBeUndefined()
      expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
        [
          [
            "Owners: 
          0: 0x5409ED021D9299bf6814279A6A1411A7e866A631
          1: 0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb
          2: 0xE36Ea790bc9d7AB70C55260C66D52b1eca985f84
        Required confirmations: 2 
        Required confirmations (internal): 1 
        Transactions: 
          0: 0x0000000000000000000000000000000000000000
          1: 0 
          2: 0x
          3: false
          data: null",
          ],
        ]
      `)
    })

    it('shows transaction with data', async () => {
      // Propose a transaction with data
      const recipient = accounts[6]
      const data =
        '0xa9059cbb000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa960450000000000000000000000000000000000000000000000000000000000000064'

      await testLocallyWithWeb3Node(
        ProposeMultiSig,
        [multisigAddress, '--from', owner3, '--to', recipient, '--data', data],
        web3
      )
      const logMock = jest.spyOn(console, 'log')

      // Show the transaction with data
      await expect(
        testLocallyWithWeb3Node(
          ShowMultiSig,
          [multisigAddress, '--tx', '2'], // Third transaction
          web3
        )
      ).resolves.toBeUndefined()
      expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
        [
          [
            "Running Checks:",
          ],
          [
            "   ✔  The provided address is an owner of the multisig ",
          ],
          [
            "All checks passed",
          ],
          [
            "SendTransaction: multisig: proposing transaction",
          ],
          [
            "txHash: 0xtxhash",
          ],
          [
            "Owners: 
          0: 0x5409ED021D9299bf6814279A6A1411A7e866A631
          1: 0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb
          2: 0xE36Ea790bc9d7AB70C55260C66D52b1eca985f84
        Required confirmations: 2 
        Required confirmations (internal): 1 
        Transactions: 
          0: 0x0000000000000000000000000000000000000000
          1: 0 
          2: 0x
          3: false
          data: null",
          ],
        ]
      `)
    })
  })
})
