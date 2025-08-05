import { StrongAddress } from '@celo/base'
import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import Web3 from 'web3'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import { createMultisig } from '../../test-utils/multisigUtils'
import ApproveMultiSig from './approve'
import ProposeMultiSig from './propose'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('multisig:approve integration tests', (web3: Web3) => {
  let kit: ContractKit
  let accounts: StrongAddress[]
  let multisigAddress: StrongAddress
  let owner1: StrongAddress
  let owner2: StrongAddress
  let owner3: StrongAddress
  let nonOwner: StrongAddress

  beforeAll(async () => {
    kit = newKitFromWeb3(web3)
    accounts = (await web3.eth.getAccounts()) as StrongAddress[]

    // Set up test accounts
    owner1 = accounts[0]
    owner2 = accounts[1]
    owner3 = accounts[2]
    nonOwner = accounts[3]

    const requireNumberOfSignatures = 2
    const requireInternalSignatures = 1

    // Create a multisig with 3 owners requiring 2 signatures
    multisigAddress = await createMultisig(
      kit,
      [owner1, owner2, owner3],
      requireNumberOfSignatures,
      requireInternalSignatures
    )
  })

  afterAll(async () => {
    kit.connection.stop()
  })

  describe('approve transaction', () => {
    it('successfully approves an existing transaction', async () => {
      const logMock = jest.spyOn(console, 'log')
      // First, propose a transaction using the propose command
      const recipient = accounts[4]
      const value = (10 ** 18).toString() // 1 CELO in wei

      // Propose transaction using owner1
      await testLocallyWithWeb3Node(
        ProposeMultiSig,
        [multisigAddress, '--from', owner1, '--to', recipient, '--value', value],
        web3
      )

      // Now approve the transaction using owner2
      await testLocallyWithWeb3Node(
        ApproveMultiSig,
        [
          '--from',
          owner2,
          '--for',
          multisigAddress,
          '--tx',
          '0', // First transaction
        ],
        web3
      )
      expect(logMock).toHaveBeenCalledWith(
        expect.stringContaining(`The provided address is an owner of the multisig`)
      )
    })

    it('fails when non-owner tries to approve', async () => {
      await expect(
        testLocallyWithWeb3Node(
          ApproveMultiSig,
          ['--from', nonOwner, '--for', multisigAddress, '--tx', '0'],
          web3
        )
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Some checks didn't pass!"`)
    })

    it('fails when approving non-existent transaction', async () => {
      await expect(
        testLocallyWithWeb3Node(
          ApproveMultiSig,
          [
            '--from',
            owner1,
            '--for',
            multisigAddress,
            '--tx',
            '999', // Non-existent transaction
          ],
          web3
        )
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Some checks didn't pass!"`)
    })

    it('fails with invalid multisig address', async () => {
      await expect(
        testLocallyWithWeb3Node(
          ApproveMultiSig,
          ['--from', owner1, '--for', '0x0000000000000000000000000000000000000000', '--tx', '0'],
          web3
        )
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        "The contract function "getOwners" returned no data ("0x").

        This could be due to any of the following:
          - The contract does not have the function "getOwners",
          - The parameters passed to the contract function may be invalid, or
          - The address is not a contract.
         
        Contract Call:
          address:   0x0000000000000000000000000000000000000000
          function:  getOwners()

        Docs: https://viem.sh/docs/contract/readContract
        Version: viem@2.29.2"
      `)
    })

    it('fails when approving already approved transaction', async () => {
      // First, propose a transaction
      const recipient = accounts[5]
      const value = '2000000000000000000' // 2 CELO in wei
      const logMock = jest.spyOn(console, 'log')

      // Propose transaction using owner1
      await testLocallyWithWeb3Node(
        ProposeMultiSig,
        [multisigAddress, '--from', owner1, '--to', recipient, '--value', value],
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
        ]
      `)

      // Approve with owner2
      await expect(
        testLocallyWithWeb3Node(
          ApproveMultiSig,
          ['--from', owner2, '--for', multisigAddress, '--tx', '0'],
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
            "Running Checks:",
          ],
          [
            "   ✔  The provided address is an owner of the multisig ",
          ],
          [
            "   ✔  Checking that 0 is an existing transaction. ",
          ],
          [
            "All checks passed",
          ],
          [
            "SendTransaction: multisig: approving transaction",
          ],
          [
            "txHash: 0xtxhash",
          ],
        ]
      `)

      // Try to approve again with owner3 (should fail if already approved)
      await expect(
        testLocallyWithWeb3Node(
          ApproveMultiSig,
          ['--from', owner3, '--for', multisigAddress, '--tx', '1'],
          web3
        )
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Some checks didn't pass!"`)
    })
  })
})
