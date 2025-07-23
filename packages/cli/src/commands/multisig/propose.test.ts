import { StrongAddress } from '@celo/base'
import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import Web3 from 'web3'
import {
  stripAnsiCodesAndTxHashes,
  testLocally,
  testLocallyWithWeb3Node,
} from '../../test-utils/cliUtils'
import { createMultisig } from '../../test-utils/multisigUtils'
import ProposeMultiSig from './propose'

process.env.NO_SYNCCHECK = 'true'

describe('multisig:propose cmd', () => {
  test('fails with invalid data format', async () => {
    await expect(
      testLocally(ProposeMultiSig, [
        '0x5409ed021d9299bf6814279a6a1411a7e866a631',
        '--from',
        '0x5409ed021d9299bf6814279a6a1411a7e866a631',
        '--to',
        '0x5409ed021d9299bf6814279a6a1411a7e866a631',
        '--data',
        'invalid-hex', // Missing 0x prefix
      ])
    ).rejects.toThrowErrorMatchingInlineSnapshot(`
      "Parsing --data 
      	'invalid-hex' is not a valid hex string
      See more help with --help"
    `)
  })

  test('fails with invalid value', async () => {
    await expect(
      testLocally(ProposeMultiSig, [
        '0x5409ed021d9299bf6814279a6a1411a7e866a631',
        '--from',
        '0x5409ed021d9299bf6814279a6a1411a7e866a631',
        '--to',
        '0x5409ed021d9299bf6814279a6a1411a7e866a631',
        '--value',
        'not-a-number',
      ])
    ).rejects.toThrowErrorMatchingInlineSnapshot(`
      "Parsing --value 
      	not-a-number is not a valid bigint amount
      See more help with --help"
    `)
  })
})

testWithAnvilL2('multisig:propose integration tests', (web3: Web3) => {
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

    // Create a multisig with 3 owners requiring 2 signatures
    multisigAddress = await createMultisig(kit, [owner1, owner2, owner3], 2, 1)
  })

  afterAll(async () => {
    kit.connection.stop()
  })

  describe('propose transaction', () => {
    let logMock: jest.SpyInstance
    beforeEach(() => {
      logMock = jest.spyOn(console, 'log')
      logMock.mockReset()
    })

    function expectLogs(logs: jest.SpyInstance) {
      return expect(stripAnsiCodesAndTxHashes(logs.mock.calls[0]))
    }

    it('proposes a transaction with value', async () => {
      const recipient = accounts[4]
      const value = '1000000000000000000' // 1 CELO in wei

      const result = await testLocallyWithWeb3Node(
        ProposeMultiSig,
        [multisigAddress, '--from', owner1, '--to', recipient, '--value', value],
        web3
      )
      expectLogs(logMock).toMatchInlineSnapshot(`
        [
          "Running Checks:",
        ]
      `)
      expect(result).toBeUndefined()
    })

    it('proposes a transaction with data', async () => {
      const recipient = accounts[5]
      const data =
        '0xa9059cbb000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa960450000000000000000000000000000000000000000000000000000000000000064'

      const result = await testLocallyWithWeb3Node(
        ProposeMultiSig,
        [multisigAddress, '--from', owner2, '--to', recipient, '--data', data],
        web3
      )
      expectLogs(logMock).toMatchInlineSnapshot(`
        [
          "Running Checks:",
        ]
      `)

      expect(result).toBeUndefined()
    })

    it('proposes a transaction with both value and data', async () => {
      const recipient = accounts[6]
      const value = '500000000000000000' // 0.5 CELO in wei
      const data = '0x'

      const result = await testLocallyWithWeb3Node(
        ProposeMultiSig,
        [multisigAddress, '--from', owner3, '--to', recipient, '--value', value, '--data', data],
        web3
      )
      expectLogs(logMock).toMatchInlineSnapshot(`
        [
          "Running Checks:",
        ]
      `)

      expect(result).toBeUndefined()
    })

    it('fails when non-owner tries to propose', async () => {
      const recipient = accounts[7]
      const value = '100000000000000000'

      await expect(
        testLocallyWithWeb3Node(
          ProposeMultiSig,
          [multisigAddress, '--from', nonOwner, '--to', recipient, '--value', value],
          web3
        )
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Some checks didn't pass!"`)
    })

    it('fails with invalid multisig address', async () => {
      const recipient = accounts[8]
      const value = '100000000000000000'

      await expect(
        testLocallyWithWeb3Node(
          ProposeMultiSig,
          [
            '0x0000000000000000000000000000000000000000',
            '--from',
            owner1,
            '--to',
            recipient,
            '--value',
            value,
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
        Version: viem@2.29.2"
      `)
    })

    it('fails with invalid recipient address', async () => {
      const value = '100000000000000000'

      await expect(
        testLocallyWithWeb3Node(
          ProposeMultiSig,
          [
            multisigAddress,
            '--from',
            owner1,
            '--to',
            '0x000000000000000000000000000000000000000h', // Invalid address
            '--value',
            value,
          ],

          web3
        )
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        "Parsing --to 
        	0x000000000000000000000000000000000000000h is not a valid address
        See more help with --help"
      `)
    })
  })
})
