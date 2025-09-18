import { StrongAddress } from '@celo/base'
import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import Web3 from 'web3'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import { createMultisig } from '../../test-utils/multisigUtils'
import MultiSigTransfer from './transfer'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('multisig:transfer integration tests', (web3: Web3) => {
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
    console.warn('Accounts:', accounts)
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

  describe('transfer CELO', () => {
    it('successfully proposes a CELO transfer', async () => {
      const recipient = accounts[4]
      const amount = (10 ** 18).toString() // 1 CELO in wei

      const result = await testLocallyWithWeb3Node(
        MultiSigTransfer,
        [multisigAddress, '--to', recipient, '--amount', amount, '--from', owner1],
        web3
      )

      expect(result).toBeUndefined()
    })

    it('successfully approve an existing matching transfer', async () => {
      const recipient = accounts[5]
      const amount = '2000000000000000000' // 2 CELO in wei

      // First owner proposes the transfer
      await testLocallyWithWeb3Node(
        MultiSigTransfer,
        [multisigAddress, '--to', recipient, '--amount', amount, '--from', owner1],
        web3
      )

      // Second owner approves the same transfer (should find existing transaction)
      const result = await testLocallyWithWeb3Node(
        MultiSigTransfer,
        [multisigAddress, '--to', recipient, '--amount', amount, '--from', owner2],
        web3
      )

      expect(result).toBeUndefined()
    })

    it('fails when non-owner tries to transfer', async () => {
      const spy = jest.spyOn(console, 'log').mockImplementation(() => {})
      const recipient = accounts[6]
      const amount = '100000000000000000'
      await expect(
        testLocallyWithWeb3Node(
          MultiSigTransfer,
          [
            multisigAddress,
            '--to',
            recipient,
            '--amount',
            amount,
            '--from',
            nonOwner,
            '--sender',
            accounts[7],
            '--transferFrom',
          ],

          web3
        )
      ).rejects.toThrow("Some checks didn't pass!")
      expect(stripAnsiCodesFromNestedArray(spy.mock.calls)).toMatchInlineSnapshot(`
        [
          [
            "Running Checks:",
          ],
          [
            "   ✘  The provided address is an owner of the multisig ",
          ],
        ]
      `)
    })

    it('fails with invalid multisig address', async () => {
      const recipient = accounts[7]
      const amount = '100000000000000000'

      await expect(
        testLocallyWithWeb3Node(
          MultiSigTransfer,
          [
            '0x0000000000000000000000000000000000000000',
            '--to',
            recipient,
            '--amount',
            amount,
            '--from',
            owner1,
          ],

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
        Version: viem@2.37.6"
      `)
    })

    it('fails with invalid recipient address', async () => {
      const amount = '100000000000000000'

      await expect(
        testLocallyWithWeb3Node(
          MultiSigTransfer,
          [
            multisigAddress,
            '--to',
            '0x000000000000000000000000000000000000000H',
            '--amount',
            amount,
            '--from',
            owner1,
          ],

          web3
        )
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        "Parsing --to 
        	0x000000000000000000000000000000000000000H is not a valid address
        See more help with --help"
      `)
    })

    it('fails with invalid amount', async () => {
      const recipient = accounts[8]

      await expect(
        testLocallyWithWeb3Node(
          MultiSigTransfer,
          [multisigAddress, '--to', recipient, '--amount', 'not-a-number', '--from', owner1],
          web3
        )
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        "Parsing --amount 
        	not-a-number is not a valid bigint amount
        See more help with --help"
      `)
    })

    it('fails with transferFrom without sender', async () => {
      const recipient = accounts[9]

      await expect(
        testLocallyWithWeb3Node(
          MultiSigTransfer,
          [
            multisigAddress,
            '--transferFrom',
            '--to',
            recipient,
            '--amount',
            '100000000000000000',
            '--from',
            owner1,
          ],

          web3
        )
      ).rejects.toThrow()
    })

    it('successfully propose a transferFrom transaction', async () => {
      const sender = accounts[1]
      const recipient = accounts[6]
      const amount = '3000000000000000000' // 3 CELO in wei

      const result = await testLocallyWithWeb3Node(
        MultiSigTransfer,
        [
          multisigAddress,
          '--transferFrom',
          '--sender',
          sender,
          '--to',
          recipient,
          '--amount',
          amount,
          '--from',
          owner1,
        ],
        web3
      )

      expect(result).toBeUndefined()
    })

    it('successfully approve an existing transferFrom transaction', async () => {
      const sender = accounts[2]
      const recipient = accounts[8]
      const amount = '4000000000000000000' // 4 CELO in wei

      const logMock = jest.spyOn(console, 'log')

      // First owner proposes the transferFrom
      await testLocallyWithWeb3Node(
        MultiSigTransfer,
        [
          multisigAddress,
          '--transferFrom',
          '--sender',
          sender,
          '--to',
          recipient,
          '--amount',
          amount,
          '--from',
          owner1,
        ],
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
            "SendTransaction: multisig: proposing transfer",
          ],
          [
            "txHash: 0xtxhash",
          ],
        ]
      `)

      // Second owner approves the same transferFrom (should find existing transaction)
      const result = await testLocallyWithWeb3Node(
        MultiSigTransfer,
        [
          multisigAddress,
          '--transferFrom',
          '--sender',
          sender,
          '--to',
          recipient,
          '--amount',
          amount,
          '--from',
          owner2,
        ],
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
            "SendTransaction: multisig: proposing transfer",
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
            "All checks passed",
          ],
          [
            "SendTransaction: multisig: proposing transfer",
          ],
          [
            "txHash: 0xtxhash",
          ],
        ]
      `)
      expect(result).toBeUndefined()
    })
  })
})
