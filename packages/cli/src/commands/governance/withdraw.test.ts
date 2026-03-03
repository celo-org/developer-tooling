import { StrongAddress } from '@celo/base'
import { newKitFromProvider } from '@celo/contractkit'
import { GovernanceWrapper, Proposal } from '@celo/contractkit/lib/wrappers/Governance'
import { setBalance, testWithAnvilL2, withImpersonatedAccount } from '@celo/dev-utils/anvil-test'
import { timeTravel } from '@celo/dev-utils/ganache-test'
import { ProposalBuilder } from '@celo/governance'
import Safe, { getSafeAddressFromDeploymentTx } from '@safe-global/protocol-kit'
import BigNumber from 'bignumber.js'
import { stripAnsiCodesFromNestedArray, testLocallyWithNode } from '../../test-utils/cliUtils'
import { deployMultiCall } from '../../test-utils/multicall'
import { createMultisig, setupSafeContracts } from '../../test-utils/multisigUtils'
import Withdraw from './withdraw'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2(
  'governance:withdraw',
  (client) => {
    const logMock = jest.spyOn(console, 'log')
    const errorMock = jest.spyOn(console, 'error')

    let minDeposit: string
    const kit = newKitFromProvider(client)

    let accounts: StrongAddress[] = []
    let governance: GovernanceWrapper

    beforeEach(async () => {
      logMock.mockClear().mockImplementation()
      errorMock.mockClear().mockImplementation()

      await deployMultiCall(client, '0xcA11bde05977b3631167028862bE2a173976CA11')

      accounts = (await kit.connection.getAccounts()) as StrongAddress[]
      kit.defaultAccount = accounts[0]
      governance = await kit.contracts.getGovernance()
      minDeposit = (await governance.minDeposit()).toFixed()
      const proposal: Proposal = await new ProposalBuilder(kit).build()
      const proposeHash = await governance.propose(proposal, 'URL', {
        from: accounts[0],
        value: minDeposit,
      })
      await kit.connection.viemClient.waitForTransactionReceipt({ hash: proposeHash as `0x${string}` })
      const dequeueFrequency = (await governance.dequeueFrequency()).toNumber()
      await timeTravel(dequeueFrequency + 1, client)
      const dequeueHash = await governance.dequeueProposalsIfReady()
      await kit.connection.viemClient.waitForTransactionReceipt({ hash: dequeueHash as `0x${string}` })
    })

    test('can withdraw', async () => {
      const balanceBefore = await kit.connection.viemClient.getBalance({ address: accounts[0] as `0x${string}` })

      await testLocallyWithNode(Withdraw, ['--from', accounts[0]], client)

      const balanceAfter = await kit.connection.viemClient.getBalance({ address: accounts[0] as `0x${string}` })
      const latestBlock = await kit.connection.viemClient.getBlock({ blockTag: 'latest' })
      const latestTransactionReceipt = await kit.connection.viemClient.getTransactionReceipt({
        hash: latestBlock.transactions[0],
      })

      // Safety check if the latest transaction was originated by expected account
      expect(latestTransactionReceipt.from.toLowerCase()).toEqual(accounts[0].toLowerCase())

      const difference = new BigNumber(balanceAfter.toString())
        .minus(balanceBefore.toString())
        .plus((latestTransactionReceipt.effectiveGasPrice * latestTransactionReceipt.gasUsed).toString())

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
          client,
          multisigAddress,
          async () => {
            const proposeHash2 = await governance.propose(
              await new ProposalBuilder(kit).build(),
              'http://example.com/proposal.json',
              { from: multisigAddress, value: minDeposit }
            )
            await kit.connection.viemClient.waitForTransactionReceipt({ hash: proposeHash2 as `0x${string}` })
          },
          // make sure the multisig contract has enough balance to perform the transaction
          new BigNumber(minDeposit).multipliedBy(2)
        )

        // Zero out the balance for easier testing
        await setBalance(client, multisigAddress, 0)

        // Dequeue so the proposal can be refunded
        const dequeueFrequency = (await governance.dequeueFrequency()).toNumber()
        await timeTravel(dequeueFrequency + 1, client)
        const dequeueHash2 = await governance.dequeueProposalsIfReady()
        await kit.connection.viemClient.waitForTransactionReceipt({ hash: dequeueHash2 as `0x${string}` })
      })

      it('can withdraw using --useMultiSig', async () => {
        // Safety check
        expect(await kit.connection.viemClient.getBalance({ address: multisigAddress as `0x${string}` })).toEqual(0n)

        await testLocallyWithNode(
          Withdraw,
          ['--useMultiSig', '--for', multisigAddress, '--from', multisigOwner],
          client
        )

        // After withdrawing the refunded deposit should be the minDeposit (as we zeroed out the balance before)
        expect(await kit.connection.viemClient.getBalance({ address: multisigAddress as `0x${string}` })).toEqual(BigInt(minDeposit))

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
          ]
        `)
        expect(stripAnsiCodesFromNestedArray(errorMock.mock.calls)).toMatchInlineSnapshot(`[]`)
      })

      it('fails if trying to withdraw using --useMultiSig not as a signatory', async () => {
        const otherAccount = accounts[1]

        // Safety check
        expect(await kit.connection.viemClient.getBalance({ address: multisigAddress as `0x${string}` })).toEqual(0n)

        await expect(
          testLocallyWithNode(
            Withdraw,
            ['--useMultiSig', '--for', multisigAddress, '--from', otherAccount],
            client
          )
        ).rejects.toMatchInlineSnapshot(`[Error: Some checks didn't pass!]`)

        // After failing to withdraw the deposit, the balance should still be zero
        expect(await kit.connection.viemClient.getBalance({ address: multisigAddress as `0x${string}` })).toEqual(0n)

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
        await setupSafeContracts(client)

        owners = [
          (await kit.connection.getAccounts())[0] as StrongAddress,
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
          provider: kit.connection.currentProvider as any,
          signer: owners[0],
        })
        const deploymentTransaction = await protocolKit.createSafeDeploymentTransaction()
        const txHash = await kit.connection.sendTransaction({
          from: owners[0],
          ...deploymentTransaction,
        })
        const receipt = await kit.connection.viemClient.waitForTransactionReceipt({ hash: txHash as `0x${string}` })
        safeAddress = getSafeAddressFromDeploymentTx(
          receipt as unknown as Parameters<typeof getSafeAddressFromDeploymentTx>[0],
          '1.3.0'
        ) as StrongAddress
        await protocolKit.connect({ safeAddress })

        const balance = new BigNumber(minDeposit).multipliedBy(2)
        await setBalance(client, safeAddress, balance)
        for (const owner of owners) {
          await setBalance(client, owner, balance)
        }

        await withImpersonatedAccount(client, safeAddress, async () => {
          const proposeHash3 = await governance.propose(
            await new ProposalBuilder(kit).build(),
            'http://example.com/proposal.json',
            { from: safeAddress, value: minDeposit }
          )
          await kit.connection.viemClient.waitForTransactionReceipt({ hash: proposeHash3 as `0x${string}` })
        })

        // Dequeue so the proposal can be refunded
        const dequeueFrequency = (await governance.dequeueFrequency()).toNumber()
        await timeTravel(dequeueFrequency + 1, client)
        const dequeueHash3 = await governance.dequeueProposalsIfReady()
        await kit.connection.viemClient.waitForTransactionReceipt({ hash: dequeueHash3 as `0x${string}` })
      })

      it('can withdraw using --useSafe', async () => {
        // Safety check
        const amountBeforeRefund = await kit.connection.viemClient.getBalance({ address: safeAddress as `0x${string}` })

        for (const owner of owners) {
          await withImpersonatedAccount(client, owner, async () => {
            await testLocallyWithNode(
              Withdraw,
              ['--from', owner, '--useSafe', '--safeAddress', safeAddress],
              client
            )
          })
          if (owner !== owners.at(-1)) {
            expect(await kit.connection.viemClient.getBalance({ address: safeAddress as `0x${string}` })).toEqual(amountBeforeRefund)
          }
        }

        // After withdrawing the refunded deposit should be the minDeposit (as we zeroed out the balance before)
        expect(await kit.connection.viemClient.getBalance({ address: safeAddress as `0x${string}` })).toEqual(
          BigInt(minDeposit) + amountBeforeRefund
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
