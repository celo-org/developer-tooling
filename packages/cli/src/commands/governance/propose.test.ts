import { StrongAddress } from '@celo/base'
import { newKitFromProvider } from '@celo/contractkit'
import { GoldTokenWrapper } from '@celo/contractkit/lib/wrappers/GoldTokenWrapper'
import { GovernanceWrapper } from '@celo/contractkit/lib/wrappers/Governance'
import { setBalance, testWithAnvilL2, withImpersonatedAccount } from '@celo/dev-utils/anvil-test'
import { ux } from '@oclif/core'
import Safe, { getSafeAddressFromDeploymentTx } from '@safe-global/protocol-kit'
import * as fs from 'fs'
import {
  EXTRA_LONG_TIMEOUT_MS,
  stripAnsiCodesFromNestedArray,
  testLocallyWithNode,
} from '../../test-utils/cliUtils'
import { deployMultiCall } from '../../test-utils/multicall'
import { createMultisig, setupSafeContracts } from '../../test-utils/multisigUtils'
import Approve from '../multisig/approve'
import Propose from './propose'
import { encodeFunctionData, parseEther } from 'viem'

// Mock fetch for HTTP status tests
jest.mock('cross-fetch')

process.env.NO_SYNCCHECK = 'true'

const randomAddress = '0x13B10327aA54Cb055B0ea4B85B59b4bcf64B3B92'

const transactions = [
  {
    contract: 'GoldToken',
    function: 'transfer',
    args: ['0xC870dc32e84531DA06C0156f0dfa73CfA091C4bd', '42'],
    value: '0',
  },
]

const transactionsUnknownAddress = [
  {
    address: randomAddress,
    function: 'transfer(address,uint256)',
    args: ['0xC870dc32e84531DA06C0156f0dfa73CfA091C4bd', '42'],
    value: '0',
  },
]

const transactionsWithStruct = [
  {
    address: '0x3d79EdAaBC0EaB6F08ED885C05Fc0B014290D95A',
    function:
      'mint((address token0,address token1,uint24 fee,int24 tickLower,int24 tickUpper,uint256 amount0Desired,uint256 amount1Desired,uint256 amount0Min,uint256 amount1Min,address recipient,uint256 deadline))',
    args: [
      '{"token0": "0x471EcE3750Da237f93B8E339c536989b8978a438","token1": "0xC668583dcbDc9ae6FA3CE46462758188adfdfC24","fee": 100,"tickLower": -1764,"tickUpper": -631,"amount0Desired": "0","amount1Desired": "100000000000000000","amount0Min": "0","amount1Min": "99900000000000000","recipient": "0xD533Ca259b330c7A88f74E000a3FaEa2d63B7972","deadline": 1710335001}',
    ],
    value: '0',
  },
]

const structAbiDefinition = {
  inputs: [
    {
      components: [
        {
          internalType: 'address',
          name: 'token0',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'token1',
          type: 'address',
        },
        {
          internalType: 'uint24',
          name: 'fee',
          type: 'uint24',
        },
        {
          internalType: 'int24',
          name: 'tickLower',
          type: 'int24',
        },
        {
          internalType: 'int24',
          name: 'tickUpper',
          type: 'int24',
        },
        {
          internalType: 'uint256',
          name: 'amount0Desired',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'amount1Desired',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'amount0Min',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'amount1Min',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: 'recipient',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'deadline',
          type: 'uint256',
        },
      ],
      internalType: 'struct INonfungiblePositionManager.MintParams',
      name: 'params',
      type: 'tuple',
    },
  ],
  name: 'mint',
  outputs: [
    {
      internalType: 'uint256',
      name: 'tokenId',
      type: 'uint256',
    },
    {
      internalType: 'uint128',
      name: 'liquidity',
      type: 'uint128',
    },
    {
      internalType: 'uint256',
      name: 'amount0',
      type: 'uint256',
    },
    {
      internalType: 'uint256',
      name: 'amount1',
      type: 'uint256',
    },
  ],
  stateMutability: 'payable',
  type: 'function',
}

testWithAnvilL2(
  'governance:propose cmd',
  (client) => {
    const TRANSACTION_FILE_PATH = 'governance-propose-l2.test.json'

    let governance: GovernanceWrapper
    let goldToken: GoldTokenWrapper
    let goldTokenContract: GoldTokenWrapper['contract']
    let minDeposit: string

    const kit = newKitFromProvider(client)

    let accounts: StrongAddress[] = []

    beforeEach(async () => {
      // need to set multical deployment on the address it was found on alfajores
      // since this test impersonates the old alfajores chain id
      await deployMultiCall(client, '0xcA11bde05977b3631167028862bE2a173976CA11')

      accounts = (await kit.connection.getAccounts()) as StrongAddress[]
      kit.defaultAccount = accounts[0]
      governance = await kit.contracts.getGovernance()
      goldToken = await kit.contracts.getGoldToken()
      // @ts-expect-error
      goldTokenContract = goldToken.contract
      minDeposit = (await governance.minDeposit()).toFixed()
      const mockFetch = require('cross-fetch')
      mockFetch.mockResolvedValue({
        status: 200,
      })
    })

    test(
      'will successfully create proposal based on Core contract',
      async () => {
        const transactionsToBeSaved = JSON.stringify(transactions)
        fs.writeFileSync(TRANSACTION_FILE_PATH, transactionsToBeSaved, { flag: 'w' })

        await kit.sendTransaction({
          to: governance.address,
          from: accounts[0],
          value: parseEther('1').toString(),
        })

        const proposalBefore = await governance.getProposal(1)
        expect(proposalBefore).toEqual([])

        await testLocallyWithNode(
          Propose,
          [
            '--jsonTransactions',
            TRANSACTION_FILE_PATH,
            '--deposit',
            minDeposit,
            '--from',
            accounts[0],
            '--descriptionURL',
            'https://github.com/celo-org/governance/blob/main/CGPs/cgp-123.md',
          ],
          client
        )

        const proposal = await governance.getProposal(1)
        expect(proposal.length).toEqual(transactions.length)
        expect(proposal[0].to).toEqual(goldToken.address)
        expect(proposal[0].value).toEqual(transactions[0].value)
        const expectedInput = encodeFunctionData({
          abi: goldTokenContract.abi,
          functionName: 'transfer',
          args: [transactions[0].args[0] as `0x${string}`, BigInt(transactions[0].args[1])],
        })
        expect(proposal[0].input).toEqual(expectedInput)
      },
      EXTRA_LONG_TIMEOUT_MS * 2
    )

    test(
      'will successfully create proposal based on Core contract with multisig (1 signer)',
      async () => {
        const transactionsToBeSaved = JSON.stringify(transactions)
        fs.writeFileSync(TRANSACTION_FILE_PATH, transactionsToBeSaved, { flag: 'w' })

        await kit.sendTransaction({
          from: accounts[0],
          to: governance.address,
          value: parseEther('1').toString(),
        })

        const multisigWithOneSigner = await createMultisig(kit, [accounts[0]], 1, 1)
        /**
         * Faucet the multisig with 20,000 CELO so it has more than sufficient CELO
         * to submit governance proposals (2x minDeposit in this case).
         * In practice, `minDeposit` is currently 1 CELO on the devchain, so practically 20,000 CELO
         * is too much. But I'm leaving this in case we update the devchain to match
         * Alfajores or Mainnet parameters in the future.
         */
        await kit.sendTransaction({
          from: accounts[2],
          to: multisigWithOneSigner,
          value: parseEther('20000').toString(), // 2x min deposit on Mainnet
        })

        const proposalBefore = await governance.getProposal(1)
        expect(proposalBefore).toEqual([])

        await testLocallyWithNode(
          Propose,
          [
            '--jsonTransactions',
            TRANSACTION_FILE_PATH,
            '--deposit',
            '10000e18',
            '--from',
            accounts[0],
            '--useMultiSig',
            '--for',
            multisigWithOneSigner,
            '--descriptionURL',
            'https://github.com/celo-org/governance/blob/main/CGPs/cgp-123.md',
          ],
          client
        )

        const proposal = await governance.getProposal(1)
        expect(proposal.length).toEqual(transactions.length)
        expect(proposal[0].to).toEqual(goldToken.address)
        expect(proposal[0].value).toEqual(transactions[0].value)
        const expectedInput = encodeFunctionData({
          abi: goldTokenContract.abi,
          functionName: 'transfer',
          args: [transactions[0].args[0] as `0x${string}`, BigInt(transactions[0].args[1])],
        })
        expect(proposal[0].input).toEqual(expectedInput)
      },
      EXTRA_LONG_TIMEOUT_MS
    )

    test(
      'will successfully create proposal based on Core contract with multisig (2 signers)',
      async () => {
        const transactionsToBeSaved = JSON.stringify(transactions)
        fs.writeFileSync(TRANSACTION_FILE_PATH, transactionsToBeSaved, { flag: 'w' })

        await kit.sendTransaction({
          to: governance.address,
          from: accounts[0],
          value: parseEther('1').toString(),
        })

        const multisigWithTwoSigners = await createMultisig(kit, [accounts[0], accounts[1]], 2, 2)
        /**
         * Faucet the multisig with 20,000 CELO so it has more than sufficient CELO
         * to submit governance proposals (2x minDeposit in this case).
         * In practice, `minDeposit` is currently 1 CELO on the devchain, so practically 20,000 CELO
         * is too much. But I'm leaving this in case we update the devchain to match
         * Alfajores or Mainnet parameters in the future.
         */
        await kit.sendTransaction({
          from: accounts[2],
          to: multisigWithTwoSigners,
          value: parseEther('20000').toString(), // 2x min deposit on Mainnet
        })

        const proposalBefore = await governance.getProposal(1)
        expect(proposalBefore).toEqual([])

        // Submit proposal from signer A
        await testLocallyWithNode(
          Propose,
          [
            '--jsonTransactions',
            TRANSACTION_FILE_PATH,
            '--deposit',
            '10000e18',
            '--from',
            accounts[0],
            '--useMultiSig',
            '--for',
            multisigWithTwoSigners,
            '--descriptionURL',
            'https://github.com/celo-org/governance/blob/main/CGPs/cgp-123.md',
          ],
          client
        )

        const proposalBetween = await governance.getProposal(1)
        expect(proposalBetween).toEqual([])

        // Approve proposal from signer B
        await testLocallyWithNode(
          Approve,
          ['--from', accounts[1], '--for', multisigWithTwoSigners, '--tx', '0'],
          client
        )

        const proposal = await governance.getProposal(1)
        expect(proposal.length).toEqual(transactions.length)
        expect(proposal[0].to).toEqual(goldToken.address)
        expect(proposal[0].value).toEqual(transactions[0].value)
        const expectedInput = encodeFunctionData({
          abi: goldTokenContract.abi,
          functionName: 'transfer',
          args: [transactions[0].args[0] as `0x${string}`, BigInt(transactions[0].args[1])],
        })
        expect(proposal[0].input).toEqual(expectedInput)
      },
      EXTRA_LONG_TIMEOUT_MS
    )

    describe('with safe', () => {
      beforeEach(async () => {
        await setupSafeContracts(client)
      })

      test(
        'will successfully create proposal based on Core contract (1 owner)',
        async () => {
          const [owner1] = (await kit.connection.getAccounts()) as StrongAddress[]
          const safeAccountConfig = {
            owners: [owner1],
            threshold: 1,
          }

          const predictSafe = {
            safeAccountConfig,
          }
          const protocolKit = await Safe.init({
            predictedSafe: predictSafe,
            provider: kit.connection.currentProvider.toEip1193Provider(),
            signer: owner1,
          })
          const deploymentTransaction = await protocolKit.createSafeDeploymentTransaction()
          const txHash = await kit.connection.sendTransaction({
            from: owner1,
            ...deploymentTransaction,
          })
          const receipt = await kit.connection.waitForTransactionReceipt(txHash)
          const safeAddress = getSafeAddressFromDeploymentTx(
            receipt as unknown as Parameters<typeof getSafeAddressFromDeploymentTx>[0],
            '1.3.0'
          ) as StrongAddress
          await protocolKit.connect({ safeAddress })

          const balance = BigInt(parseEther('100').toString())
          await setBalance(client, goldToken.address, balance)
          await setBalance(client, governance.address, balance)
          await setBalance(client, owner1, balance)
          await setBalance(client, safeAddress, balance)

          const transactionsToBeSaved = JSON.stringify(transactions)
          fs.writeFileSync(TRANSACTION_FILE_PATH, transactionsToBeSaved, { flag: 'w' })
          const deposit = await governance.minDeposit()
          const proposalBefore = await governance.getProposal(1)
          expect(proposalBefore).toEqual([])

          // Submit proposal from signer A
          await testLocallyWithNode(
            Propose,
            [
              '--jsonTransactions',
              TRANSACTION_FILE_PATH,
              '--deposit',
              deposit.toString(),
              '--from',
              owner1,
              '--useSafe',
              '--safeAddress',
              safeAddress,
              '--descriptionURL',
              'https://github.com/celo-org/governance/blob/main/CGPs/cgp-123.md',
            ],
            client
          )
          const proposal = await governance.getProposal(1)
          expect(proposal.length).toEqual(transactions.length)
          expect(proposal[0].to).toEqual(goldToken.address)
          expect(proposal[0].value).toEqual(transactions[0].value)
          const expectedInput = encodeFunctionData({
            abi: goldTokenContract.abi,
            functionName: 'transfer',
            args: [transactions[0].args[0] as `0x${string}`, BigInt(transactions[0].args[1])],
          })
          expect(proposal[0].input).toEqual(expectedInput)
        },
        EXTRA_LONG_TIMEOUT_MS
      )

      test(
        'will successfully create proposal based on Core contract (2 owners)',
        async () => {
          const [owner1] = (await kit.connection.getAccounts()) as StrongAddress[]
          const owner2 = '0x6C666E57A5E8715cFE93f92790f98c4dFf7b69e2'
          const safeAccountConfig = {
            owners: [owner1, owner2],
            threshold: 2,
          }

          const predictSafe = {
            safeAccountConfig,
          }
          const protocolKit = await Safe.init({
            predictedSafe: predictSafe,
            provider: kit.connection.currentProvider.toEip1193Provider(),
            signer: owner1,
          })
          const deploymentTransaction = await protocolKit.createSafeDeploymentTransaction()
          const txHash = await kit.connection.sendTransaction({
            from: owner1,
            ...deploymentTransaction,
          })
          const receipt = await kit.connection.waitForTransactionReceipt(txHash)
          const safeAddress = getSafeAddressFromDeploymentTx(
            receipt as unknown as Parameters<typeof getSafeAddressFromDeploymentTx>[0],
            '1.3.0'
          ) as StrongAddress
          await protocolKit.connect({ safeAddress })

          const balance = BigInt(parseEther('100').toString())
          await setBalance(client, goldToken.address, balance)
          await setBalance(client, governance.address, balance)
          await setBalance(client, owner1, balance)
          await setBalance(client, owner2, balance)
          await setBalance(client, safeAddress, balance)

          const transactionsToBeSaved = JSON.stringify(transactions)
          fs.writeFileSync(TRANSACTION_FILE_PATH, transactionsToBeSaved, { flag: 'w' })
          const deposit = await governance.minDeposit()
          const proposalBefore = await governance.getProposal(1)
          expect(proposalBefore).toEqual([])

          // Submit proposal from signer 1
          await testLocallyWithNode(
            Propose,
            [
              '--jsonTransactions',
              TRANSACTION_FILE_PATH,
              '--deposit',
              deposit.toString(),
              '--from',
              owner1,
              '--useSafe',
              '--safeAddress',
              safeAddress,
              '--descriptionURL',
              'https://github.com/celo-org/governance/blob/main/CGPs/cgp-123.md',
            ],
            client
          )
          const proposalBefore2ndOwner = await governance.getProposal(1)
          expect(proposalBefore2ndOwner).toEqual([])

          await withImpersonatedAccount(client, owner2, async () => {
            await testLocallyWithNode(
              Propose,
              [
                '--jsonTransactions',
                TRANSACTION_FILE_PATH,
                '--deposit',
                deposit.toString(),
                '--from',
                owner2,
                '--useSafe',
                '--safeAddress',
                safeAddress,
                '--descriptionURL',
                'https://github.com/celo-org/governance/blob/main/CGPs/cgp-123.md',
              ],
              client
            )
          })

          const proposal = await governance.getProposal(1)
          expect(proposal.length).toEqual(transactions.length)
          expect(proposal[0].to).toEqual(goldToken.address)
          expect(proposal[0].value).toEqual(transactions[0].value)
          const expectedInput = encodeFunctionData({
            abi: goldTokenContract.abi,
            functionName: 'transfer',
            args: [transactions[0].args[0] as `0x${string}`, BigInt(transactions[0].args[1])],
          })
          expect(proposal[0].input).toEqual(expectedInput)
        },
        EXTRA_LONG_TIMEOUT_MS
      )
    })

    test(
      'will successfully create proposal with random contract',
      async () => {
        const transactionsToBeSaved = JSON.stringify(transactionsUnknownAddress)
        fs.writeFileSync(TRANSACTION_FILE_PATH, transactionsToBeSaved, { flag: 'w' })

        await kit.sendTransaction({
          to: governance.address,
          from: accounts[0],
          value: parseEther('1').toString(),
        })

        const proposalBefore = await governance.getProposal(1)
        expect(proposalBefore).toEqual([])

        await testLocallyWithNode(
          Propose,
          [
            '--jsonTransactions',
            TRANSACTION_FILE_PATH,
            '--deposit',
            minDeposit,
            '--from',
            accounts[0],
            '--descriptionURL',
            'https://github.com/celo-org/governance/blob/main/CGPs/cgp-123.md',
            '--force',
            '--noInfo',
          ],
          client
        )

        const proposal = await governance.getProposal(1)
        expect(proposal.length).toEqual(transactions.length)
        expect(proposal[0].to).toEqual(randomAddress)
        expect(proposal[0].value).toEqual(transactions[0].value)
        const expectedInput = encodeFunctionData({
          abi: goldTokenContract.abi,
          functionName: 'transfer',
          args: [transactions[0].args[0] as `0x${string}`, BigInt(transactions[0].args[1])],
        })
        expect(proposal[0].input).toEqual(expectedInput)
      },
      EXTRA_LONG_TIMEOUT_MS
    )

    test(
      'will successfully create proposal with struct as input',
      async () => {
        const transactionsToBeSaved = JSON.stringify(transactionsWithStruct)
        fs.writeFileSync(TRANSACTION_FILE_PATH, transactionsToBeSaved, { flag: 'w' })

        await kit.sendTransaction({
          to: governance.address,
          from: accounts[0],
          value: parseEther('1').toString(),
        })

        const proposalBefore = await governance.getProposal(1)
        expect(proposalBefore).toEqual([])

        await testLocallyWithNode(
          Propose,
          [
            '--jsonTransactions',
            TRANSACTION_FILE_PATH,
            '--deposit',
            minDeposit,
            '--from',
            accounts[0],
            '--descriptionURL',
            'https://github.com/celo-org/governance/blob/main/CGPs/cgp-123.md',
            '--force',
            '--noInfo',
          ],
          client
        )

        const proposal = await governance.getProposal(1)
        expect(proposal.length).toEqual(transactions.length)
        expect(proposal[0].to).toEqual('0x3d79EdAaBC0EaB6F08ED885C05Fc0B014290D95A')
        expect(proposal[0].value).toEqual(transactions[0].value)

        const expectedInput = encodeFunctionData({
          abi: [structAbiDefinition] as any,
          args: [JSON.parse(transactionsWithStruct[0].args[0])] as any,
        })

        expect(proposal[0].input).toEqual(expectedInput)
      },
      EXTRA_LONG_TIMEOUT_MS
    )

    test(
      'fails when descriptionURl is missing',
      async () => {
        await expect(
          testLocallyWithNode(
            Propose,
            [
              '--from',
              accounts[0],
              '--deposit',
              '0',
              '--jsonTransactions',
              './exampleProposal.json',
            ],
            client
          )
        ).rejects.toThrow('Missing required flag descriptionURL')
      },
      EXTRA_LONG_TIMEOUT_MS
    )

    test(
      'fails when descriptionURl is invalid',
      async () => {
        await expect(
          testLocallyWithNode(
            Propose,
            [
              '--from',
              accounts[0],
              '--deposit',
              '0',
              '--jsonTransactions',
              './exampleProposal.json',
              '--descriptionURL',
              'https://github.com/suspicious-org/governance/blob/main/CGPs/cgp-123.md',
            ],

            client
          )
        ).rejects.toThrowErrorMatchingInlineSnapshot(`
          "Parsing --descriptionURL 
          	\`https://github.com/suspicious-org/governance/blob/main/CGPs/cgp-123.md\` is not a valid descriptionURL, it must start with \`https://github.com/celo-org/governance/blob/main/CGPs/\`
          See more help with --help"
        `)
      },
      EXTRA_LONG_TIMEOUT_MS
    )

    test(
      'can submit empty proposal',
      async () => {
        await expect(
          testLocallyWithNode(
            Propose,
            [
              '--from',
              accounts[0],
              '--deposit',
              minDeposit,
              '--jsonTransactions',
              './exampleProposal.json',
              '--descriptionURL',
              'https://github.com/celo-org/governance/blob/main/CGPs/cgp-123.md',
            ],
            client
          )
        ).resolves.toBe(undefined)
      },
      EXTRA_LONG_TIMEOUT_MS
    )

    test(
      'can submit proposal using e notion for deposit',
      async () => {
        const spyStart = jest.spyOn(ux.action, 'start')
        const spyStop = jest.spyOn(ux.action, 'stop')
        await testLocallyWithNode(
          Propose,
          [
            '--from',
            accounts[0],
            '--deposit',
            '10000e18',
            '--jsonTransactions',
            './exampleProposal.json',
            '--descriptionURL',
            'https://github.com/celo-org/governance/blob/main/CGPs/cgp-123.md',
          ],
          client
        )
        expect(spyStart).toHaveBeenCalledWith('Sending Transaction: proposeTx')
        expect(spyStop).toHaveBeenCalled()
      },
      EXTRA_LONG_TIMEOUT_MS
    )

    test(
      'when deposit is 10K it succeeds',
      async () => {
        const spyStart = jest.spyOn(ux.action, 'start')
        const spyStop = jest.spyOn(ux.action, 'stop')

        await testLocallyWithNode(
          Propose,
          [
            '--from',
            accounts[0],
            '--deposit',
            '10000000000000000000000',
            '--jsonTransactions',
            './exampleProposal.json',
            '--descriptionURL',
            'https://github.com/celo-org/governance/blob/main/CGPs/cgp-123.md',
          ],
          client
        )
        expect(spyStart).toHaveBeenCalledWith('Sending Transaction: proposeTx')
        expect(spyStop).toHaveBeenCalled()
      },
      EXTRA_LONG_TIMEOUT_MS
    )

    test(
      'fails when descriptionURL returns non-200 status',
      async () => {
        const mockFetch = require('cross-fetch')
        mockFetch.mockResolvedValue({
          status: 404,
        })

        const mockLog = jest.spyOn(console, 'log').mockImplementation(() => {})

        await expect(
          testLocallyWithNode(
            Propose,
            [
              '--from',
              accounts[0],
              '--deposit',
              minDeposit,
              '--jsonTransactions',
              './exampleProposal.json',
              '--descriptionURL',
              'https://github.com/celo-org/governance/blob/main/CGPs/cgp-404.md',
            ],

            client
          )
        ).rejects.toThrowErrorMatchingInlineSnapshot(`"Some checks didn't pass!"`)
        expect(stripAnsiCodesFromNestedArray(mockLog.mock.calls)).toMatchInlineSnapshot(`
          [
            [
              "Running Checks:",
            ],
            [
              "   ✘  URL exists:  The provided URL "https://github.com/celo-org/governance/blob/main/CGPs/cgp-404.md" does not exist or is not reachable.",
            ],
            [
              "   ✔  Account has at least 100 CELO ",
            ],
            [
              "   ✔  Deposit is greater than or equal to governance proposal minDeposit ",
            ],
          ]
        `)
        mockFetch.mockRestore()
        mockLog.mockRestore()
      },
      EXTRA_LONG_TIMEOUT_MS
    )

    test(
      'fails when descriptionURL fetch throws error',
      async () => {
        const mockFetch = require('cross-fetch')
        mockFetch.mockRejectedValue(new Error('Network error'))

        await expect(
          testLocallyWithNode(
            Propose,
            [
              '--from',
              accounts[0],
              '--deposit',
              minDeposit,
              '--jsonTransactions',
              './exampleProposal.json',
              '--descriptionURL',
              'https://github.com/celo-org/governance/blob/main/CGPs/cgp-error.md',
            ],

            client
          )
        ).rejects.toThrowErrorMatchingInlineSnapshot(`"Some checks didn't pass!"`)
        const mockLog = jest.spyOn(console, 'log').mockImplementation(() => {})

        expect(stripAnsiCodesFromNestedArray(mockLog.mock.calls)).toMatchInlineSnapshot(`[]`)
        mockLog.mockRestore()
        mockFetch.mockRestore()
      },
      EXTRA_LONG_TIMEOUT_MS
    )
  },
  {
    chainId: 42220,
  }
)
