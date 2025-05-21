import { StrongAddress } from '@celo/base'
import { CeloProvider } from '@celo/connect/lib/celo-provider'
import { newKitFromWeb3 } from '@celo/contractkit'
import { GovernanceWrapper, Proposal } from '@celo/contractkit/lib/wrappers/Governance'
import { setBalance, testWithAnvilL2, withImpersonatedAccount } from '@celo/dev-utils/anvil-test'
import { timeTravel } from '@celo/dev-utils/ganache-test'
import { ProposalBuilder } from '@celo/governance'
import Safe, { getSafeAddressFromDeploymentTx } from '@safe-global/protocol-kit'
import BigNumber from 'bignumber.js'
import { celoAlfajores } from 'viem/chains'
import Web3 from 'web3'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import { deployMultiCall } from '../../test-utils/multicall'
import { createMultisig, setupSafeContracts } from '../../test-utils/multisigUtils'
import Withdraw from './withdraw'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2(
  'governance:withdraw',
  (web3: Web3) => {
    let logMock = jest.spyOn(console, 'log')
    let errorMock = jest.spyOn(console, 'error')

    let minDeposit: string
    const kit = newKitFromWeb3(web3)

    let accounts: StrongAddress[] = []
    let governance: GovernanceWrapper

    beforeEach(async () => {
      logMock.mockClear().mockImplementation()
      errorMock.mockClear().mockImplementation()

      await deployMultiCall(web3, celoAlfajores.contracts.multicall3.address)

      accounts = (await web3.eth.getAccounts()) as StrongAddress[]
      kit.defaultAccount = accounts[0]
      governance = await kit.contracts.getGovernance()
      minDeposit = (await governance.minDeposit()).toFixed()
      const proposal: Proposal = await new ProposalBuilder(kit).build()
      await governance
        .propose(proposal, 'URL')
        .sendAndWaitForReceipt({ from: accounts[0], value: minDeposit })
      const dequeueFrequency = (await governance.dequeueFrequency()).toNumber()
      await timeTravel(dequeueFrequency + 1, web3)
      await governance.dequeueProposalsIfReady().sendAndWaitForReceipt()
    })

    test('can withdraw', async () => {
      const balanceBefore = await kit.connection.getBalance(accounts[0])

      await testLocallyWithWeb3Node(Withdraw, ['--from', accounts[0]], web3)

      const balanceAfter = await kit.connection.getBalance(accounts[0])
      const latestTransactionReceipt = await web3.eth.getTransactionReceipt(
        (
          await web3.eth.getBlock('latest')
        ).transactions[0]
      )

      // Safety check if the latest transaction was originated by expected account
      expect(latestTransactionReceipt.from.toLowerCase()).toEqual(accounts[0].toLowerCase())

      const difference = new BigNumber(balanceAfter)
        .minus(balanceBefore)
        .plus(latestTransactionReceipt.effectiveGasPrice * latestTransactionReceipt.gasUsed)

      expect(difference.toFixed()).toEqual(minDeposit)

      expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
              [
                [
                  "Running Checks:",
                ],
                [
                  "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 has refunded governance deposits ",
                ],
                [
                  "All checks passed",
                ],
                [
                  "SendTransaction: withdraw",
                ],
                [
                  "txHash: 0xtxhash",
                ],
              ]
          `)
      expect(stripAnsiCodesFromNestedArray(errorMock.mock.calls)).toMatchInlineSnapshot(`[]`)
    })

    describe('multisig', () => {
      let multisigAddress: StrongAddress
      let multisigOwner: StrongAddress

      beforeEach(async () => {
        multisigOwner = accounts[0]
        multisigAddress = await createMultisig(kit, [multisigOwner], 1, 1)

        await withImpersonatedAccount(
          web3,
          multisigAddress,
          async () => {
            await governance
              .propose(await new ProposalBuilder(kit).build(), 'http://example.com/proposal.json')
              .sendAndWaitForReceipt({ from: multisigAddress, value: minDeposit })
          },
          // make sure the multisig contract has enough balance to perform the transaction
          new BigNumber(minDeposit).multipliedBy(2)
        )

        // Zero out the balance for easier testing
        await setBalance(web3, multisigAddress, 0)

        // Dequeue so the proposal can be refunded
        const dequeueFrequency = (await governance.dequeueFrequency()).toNumber()
        await timeTravel(dequeueFrequency + 1, web3)
        await governance.dequeueProposalsIfReady().sendAndWaitForReceipt()
      })

      it('can withdraw using --useMultiSig', async () => {
        // Safety check
        expect(await kit.connection.getBalance(multisigAddress)).toEqual('0')

        await testLocallyWithWeb3Node(
          Withdraw,
          ['--useMultiSig', '--for', multisigAddress, '--from', multisigOwner],
          web3
        )

        // After withdrawing the refunded deposit should be the minDeposit (as we zeroed out the balance before)
        expect(await kit.connection.getBalance(multisigAddress)).toEqual(minDeposit)

        expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
                  [
                    [
                      "Running Checks:",
                    ],
                    [
                      "   ✔  0x871DD7C2B4b25E1Aa18728e9D5f2Af4C4e431f5c has refunded governance deposits ",
                    ],
                    [
                      "   ✔  The provided address is an owner of the multisig ",
                    ],
                    [
                      "All checks passed",
                    ],
                    [
                      "SendTransaction: withdraw",
                    ],
                    [
                      "txHash: 0xtxhash",
                    ],
                    [
                      "Deposit:",
                    ],
                    [
                      "sender: 0x2EB25B5eb9d5A4f61deb1e4F846343F862eB67D9
                  value: 100000000000000000000",
                    ],
                  ]
              `)
        expect(stripAnsiCodesFromNestedArray(errorMock.mock.calls)).toMatchInlineSnapshot(`[]`)
      })

      it('fails if trying to withdraw using --useMultiSig not as a signatory', async () => {
        const otherAccount = accounts[1]

        // Safety check
        expect(await kit.connection.getBalance(multisigAddress)).toEqual('0')

        await expect(
          testLocallyWithWeb3Node(
            Withdraw,
            ['--useMultiSig', '--for', multisigAddress, '--from', otherAccount],
            web3
          )
        ).rejects.toMatchInlineSnapshot(`[Error: Some checks didn't pass!]`)

        // After failing to withdraw the deposit, the balance should still be zero
        expect(await kit.connection.getBalance(multisigAddress)).toEqual('0')

        expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
                  [
                    [
                      "Running Checks:",
                    ],
                    [
                      "   ✔  0x871DD7C2B4b25E1Aa18728e9D5f2Af4C4e431f5c has refunded governance deposits ",
                    ],
                    [
                      "   ✘  The provided address is an owner of the multisig ",
                    ],
                  ]
              `)
        expect(stripAnsiCodesFromNestedArray(errorMock.mock.calls)).toMatchInlineSnapshot(`[]`)
      })
    })

    describe('useSafe', () => {
      let safeAddress: StrongAddress
      let owners: StrongAddress[]

      beforeEach(async () => {
        await setupSafeContracts(web3)

        owners = [
          (await web3.eth.getAccounts())[0] as StrongAddress,
          '0x6C666E57A5E8715cFE93f92790f98c4dFf7b69e2',
        ]
        const safeAccountConfig = {
          owners,
          threshold: 2,
        }

        const predictSafe = {
          safeAccountConfig,
        }
        const protocolKit = await Safe.init({
          predictedSafe: predictSafe,
          provider: (web3.currentProvider as any as CeloProvider).toEip1193Provider(),
          signer: owners[0],
        })
        const deploymentTransaction = await protocolKit.createSafeDeploymentTransaction()
        const receipt = await web3.eth.sendTransaction({
          from: owners[0],
          ...deploymentTransaction,
        })
        safeAddress = getSafeAddressFromDeploymentTx(
          receipt as unknown as Parameters<typeof getSafeAddressFromDeploymentTx>[0],
          '1.3.0'
        ) as StrongAddress
        await protocolKit.connect({ safeAddress })

        const balance = new BigNumber(minDeposit).multipliedBy(2)
        await setBalance(web3, safeAddress, balance)
        for (const owner of owners) {
          await setBalance(web3, owner, balance)
        }

        await withImpersonatedAccount(web3, safeAddress, async () => {
          await governance
            .propose(await new ProposalBuilder(kit).build(), 'http://example.com/proposal.json')
            .sendAndWaitForReceipt({ from: safeAddress, value: minDeposit })
        })

        // Dequeue so the proposal can be refunded
        const dequeueFrequency = (await governance.dequeueFrequency()).toNumber()
        await timeTravel(dequeueFrequency + 1, web3)
        await governance.dequeueProposalsIfReady().sendAndWaitForReceipt()
      })

      it('can withdraw using --useSafe', async () => {
        // Safety check
        const amountBeforeRefund = await kit.connection.getBalance(safeAddress)

        for (const owner of owners) {
          await withImpersonatedAccount(web3, owner, async () => {
            await testLocallyWithWeb3Node(
              Withdraw,
              ['--from', owner, '--useSafe', '--safeAddress', safeAddress],
              web3
            )
          })
          if (owner !== owners.at(-1)) {
            expect(await kit.connection.getBalance(safeAddress)).toEqual(amountBeforeRefund)
          }
        }

        // After withdrawing the refunded deposit should be the minDeposit (as we zeroed out the balance before)
        expect(await kit.connection.getBalance(safeAddress)).toEqual(
          (BigInt(minDeposit) + BigInt(amountBeforeRefund)).toString()
        )

        expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
          [
            [
              "Running Checks:",
            ],
            [
              "   ✔  0xF5f1A68E82209C433AFBE260737801E75FD84ff4 has refunded governance deposits ",
            ],
            [
              "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 is a safe owner ",
            ],
            [
              "All checks passed",
            ],
            [
              "txHash: 0xtxhash",
            ],
            [
              "Running Checks:",
            ],
            [
              "   ✔  0xF5f1A68E82209C433AFBE260737801E75FD84ff4 has refunded governance deposits ",
            ],
            [
              "   ✔  0x6C666E57A5E8715cFE93f92790f98c4dFf7b69e2 is a safe owner ",
            ],
            [
              "All checks passed",
            ],
            [
              "txHash: 0xtxhash",
            ],
            [
              "txHash: 0xtxhash",
            ],
          ]
        `)
        expect(stripAnsiCodesFromNestedArray(errorMock.mock.calls)).toMatchInlineSnapshot(`[]`)
      })
    })
  },
  {
    chainId: 42220,
  }
)
