import { hexToBuffer, StrongAddress } from '@celo/base'
import { newKitFromProvider } from '@celo/contractkit'
import { GovernanceWrapper } from '@celo/contractkit/lib/wrappers/Governance'
import {
  DEFAULT_OWNER_ADDRESS,
  setBalance,
  testWithAnvilL2,
  withImpersonatedAccount,
} from '@celo/dev-utils/anvil-test'
import { ux } from '@oclif/core'
import Safe, {
  getSafeAddressFromDeploymentTx,
  PredictedSafeProps,
  SafeAccountConfig,
} from '@safe-global/protocol-kit'
import BigNumber from 'bignumber.js'
import fetch from 'cross-fetch'
import { changeMultiSigOwner } from '../../test-utils/chain-setup'
import {
  stripAnsiCodesAndTxHashes,
  stripAnsiCodesFromNestedArray,
  testLocallyWithNode,
} from '../../test-utils/cliUtils'
import { deployMultiCall } from '../../test-utils/multicall'
import { createMultisig, setupSafeContracts } from '../../test-utils/multisigUtils'
import Approve from './approve'
import { parseEther } from 'viem'

// Mock fetch for HTTP status tests
jest.mock('cross-fetch')

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2(
  'governance:approve cmd',
  (client) => {
    const HOTFIX_HASH = '0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d'
    const HOTFIX_BUFFER = hexToBuffer(HOTFIX_HASH)
    beforeEach(async () => {
      // need to set multical deployment on the address it was found on alfajores
      // since this test impersonates the old alfajores chain id
      await deployMultiCall(client, '0xcA11bde05977b3631167028862bE2a173976CA11')
      jest.spyOn(console, 'log').mockImplementation(() => {
        // noop
      })
      jest.spyOn(console, 'error').mockImplementation(() => {
        // noop
      })
    })

    describe('hotfix', () => {
      it('fails when address is not security council multisig signatory', async () => {
        const kit = newKitFromProvider(client)
        const accounts = await kit.connection.getAccounts()
        const governance = await kit.contracts.getGovernance()
        const writeMock = jest.spyOn(ux.write, 'stdout')
        const logMock = jest.spyOn(console, 'log')
        const multisig = await governance.getApproverMultisig()

        await withImpersonatedAccount(client, DEFAULT_OWNER_ADDRESS, async () => {
          // setApprover to 0x5409ED021D9299bf6814279A6A1411A7e866A631 to avoid "Council cannot be approver" error
          await kit.sendTransaction({
            to: governance.address,
            from: DEFAULT_OWNER_ADDRESS,
            data: '0x3156560e0000000000000000000000005409ed021d9299bf6814279a6a1411a7e866a631',
          })

          // setSecurityCouncil to multisig address
          await kit.sendTransaction({
            to: governance.address,
            from: DEFAULT_OWNER_ADDRESS,
            // cast calldata "setSecurityCouncil(address)" <multisig-address>
            data: `0x1c1083e2000000000000000000000000${multisig.address
              .replace('0x', '')
              .toLowerCase()}`,
          })
        })

        await expect(
          testLocallyWithNode(
            Approve,
            [
              '--from',
              accounts[0],
              '--hotfix',
              HOTFIX_HASH,
              '--useMultiSig',
              '--type',
              'securityCouncil',
            ],
            client
          )
        ).rejects.toThrow("Some checks didn't pass!")

        expect(await governance.getHotfixRecord(HOTFIX_BUFFER)).toMatchInlineSnapshot(`
                  {
                    "approved": false,
                    "councilApproved": false,
                    "executed": false,
                    "executionTimeLimit": "0",
                  }
              `)
        expect(
          logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes))
        ).toMatchInlineSnapshot(`
                  [
                    [
                      "Running Checks:",
                    ],
                    [
                      "   ✔  0xf750153fc4211e4Ef325A7fD87d8258222e0b510 is security council address ",
                    ],
                    [
                      "   ✘  0x5409ED021D9299bf6814279A6A1411A7e866A631 is security council multisig signatory ",
                    ],
                    [
                      "   ✔  Hotfix 0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d is not already approved by security council ",
                    ],
                    [
                      "   ✔  Hotfix 0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d is not already executed ",
                    ],
                  ]
              `)
        expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
      })

      it('fails when address is not approver multisig signatory', async () => {
        const kit = newKitFromProvider(client)
        const accounts = await kit.connection.getAccounts()
        const governance = await kit.contracts.getGovernance()
        const writeMock = jest.spyOn(ux.write, 'stdout')
        const logMock = jest.spyOn(console, 'log')

        await expect(
          testLocallyWithNode(
            Approve,
            ['--from', accounts[0], '--hotfix', HOTFIX_HASH, '--useMultiSig'],
            client
          )
        ).rejects.toThrow("Some checks didn't pass!")

        expect(await governance.getHotfixRecord(HOTFIX_BUFFER)).toMatchInlineSnapshot(`
                  {
                    "approved": false,
                    "councilApproved": false,
                    "executed": false,
                    "executionTimeLimit": "0",
                  }
              `)
        expect(
          logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes))
        ).toMatchInlineSnapshot(`
                  [
                    [
                      "Running Checks:",
                    ],
                    [
                      "   ✔  0xf750153fc4211e4Ef325A7fD87d8258222e0b510 is approver address ",
                    ],
                    [
                      "   ✘  0x5409ED021D9299bf6814279A6A1411A7e866A631 is approver multisig signatory ",
                    ],
                    [
                      "   ✔  Hotfix 0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d is not already approved ",
                    ],
                    [
                      "   ✔  Hotfix 0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d is not already executed ",
                    ],
                  ]
              `)
        expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
      })

      it('fails when address is not security council', async () => {
        const kit = newKitFromProvider(client)
        const [approver, securityCouncil, account] = await kit.connection.getAccounts()
        const governance = await kit.contracts.getGovernance()
        const writeMock = jest.spyOn(ux.write, 'stdout')
        const logMock = jest.spyOn(console, 'log')

        await withImpersonatedAccount(client, DEFAULT_OWNER_ADDRESS, async () => {
          // setApprover to approver value
          await kit.sendTransaction({
            to: governance.address,
            from: DEFAULT_OWNER_ADDRESS,
            data: `0x3156560e000000000000000000000000${approver.replace('0x', '').toLowerCase()}`,
          })

          // setSecurityCouncil to securityCouncil value
          await kit.sendTransaction({
            to: governance.address,
            from: DEFAULT_OWNER_ADDRESS,
            data: `0x1c1083e2000000000000000000000000${securityCouncil
              .replace('0x', '')
              .toLowerCase()}`,
          })
        })

        await expect(
          testLocallyWithNode(
            Approve,
            ['--from', account, '--hotfix', HOTFIX_HASH, '--type', 'securityCouncil'],
            client
          )
        ).rejects.toThrow("Some checks didn't pass!")

        expect(await governance.getHotfixRecord(HOTFIX_BUFFER)).toMatchInlineSnapshot(`
                  {
                    "approved": false,
                    "councilApproved": false,
                    "executed": false,
                    "executionTimeLimit": "0",
                  }
              `)
        expect(
          logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes))
        ).toMatchInlineSnapshot(`
                  [
                    [
                      "Running Checks:",
                    ],
                    [
                      "   ✘  0xE36Ea790bc9d7AB70C55260C66D52b1eca985f84 is security council address ",
                    ],
                    [
                      "   ✔  Hotfix 0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d is not already approved by security council ",
                    ],
                    [
                      "   ✔  Hotfix 0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d is not already executed ",
                    ],
                  ]
              `)
        expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
      })

      it('fails when address is not approver', async () => {
        const kit = newKitFromProvider(client)
        const [approver, securityCouncil, account] = await kit.connection.getAccounts()
        const governance = await kit.contracts.getGovernance()
        const writeMock = jest.spyOn(ux.write, 'stdout')
        const logMock = jest.spyOn(console, 'log')

        await withImpersonatedAccount(client, DEFAULT_OWNER_ADDRESS, async () => {
          // setApprover to approver value
          await kit.sendTransaction({
            to: governance.address,
            from: DEFAULT_OWNER_ADDRESS,
            data: `0x3156560e000000000000000000000000${approver.replace('0x', '').toLowerCase()}`,
          })

          // setSecurityCouncil to securityCouncil value
          await kit.sendTransaction({
            to: governance.address,
            from: DEFAULT_OWNER_ADDRESS,
            data: `0x1c1083e2000000000000000000000000${securityCouncil
              .replace('0x', '')
              .toLowerCase()}`,
          })
        })

        await expect(
          testLocallyWithNode(Approve, ['--from', account, '--hotfix', HOTFIX_HASH], client)
        ).rejects.toThrow("Some checks didn't pass!")

        expect(await governance.getHotfixRecord(HOTFIX_BUFFER)).toMatchInlineSnapshot(`
                  {
                    "approved": false,
                    "councilApproved": false,
                    "executed": false,
                    "executionTimeLimit": "0",
                  }
              `)
        expect(
          logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes))
        ).toMatchInlineSnapshot(`
                  [
                    [
                      "Running Checks:",
                    ],
                    [
                      "   ✘  0xE36Ea790bc9d7AB70C55260C66D52b1eca985f84 is approver address ",
                    ],
                    [
                      "   ✔  Hotfix 0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d is not already approved ",
                    ],
                    [
                      "   ✔  Hotfix 0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d is not already executed ",
                    ],
                  ]
              `)
        expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
      })

      it('succeeds when address is a direct security council', async () => {
        const kit = newKitFromProvider(client)
        const [approver, securityCouncil] = await kit.connection.getAccounts()
        const governance = await kit.contracts.getGovernance()
        const writeMock = jest.spyOn(ux.write, 'stdout')
        const logMock = jest.spyOn(console, 'log')

        await withImpersonatedAccount(client, DEFAULT_OWNER_ADDRESS, async () => {
          // setApprover to approver value
          await kit.sendTransaction({
            to: governance.address,
            from: DEFAULT_OWNER_ADDRESS,
            data: `0x3156560e000000000000000000000000${approver.replace('0x', '').toLowerCase()}`,
          })

          // setSecurityCouncil to securityCouncil value
          await kit.sendTransaction({
            to: governance.address,
            from: DEFAULT_OWNER_ADDRESS,
            data: `0x1c1083e2000000000000000000000000${securityCouncil
              .replace('0x', '')
              .toLowerCase()}`,
          })
        })

        await testLocallyWithNode(
          Approve,
          ['--from', securityCouncil, '--hotfix', HOTFIX_HASH, '--type', 'securityCouncil'],
          client
        )

        expect(await governance.getHotfixRecord(HOTFIX_BUFFER)).toMatchInlineSnapshot(`
                  {
                    "approved": false,
                    "councilApproved": true,
                    "executed": false,
                    "executionTimeLimit": "0",
                  }
              `)
        expect(
          logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes))
        ).toMatchInlineSnapshot(`
          [
            [
              "Running Checks:",
            ],
            [
              "   ✔  0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb is security council address ",
            ],
            [
              "   ✔  Hotfix 0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d is not already approved by security council ",
            ],
            [
              "   ✔  Hotfix 0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d is not already executed ",
            ],
            [
              "All checks passed",
            ],
            [
              "SendTransaction: approveTx",
            ],
            [
              "txHash: 0xtxhash",
            ],
          ]
        `)
        expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
      })

      it('succeeds when address is a direct approver', async () => {
        const kit = newKitFromProvider(client)
        const [approver, securityCouncil] = await kit.connection.getAccounts()
        const governance = await kit.contracts.getGovernance()
        const writeMock = jest.spyOn(ux.write, 'stdout')
        const logMock = jest.spyOn(console, 'log')

        await withImpersonatedAccount(client, DEFAULT_OWNER_ADDRESS, async () => {
          // setApprover to approver value
          await kit.sendTransaction({
            to: governance.address,
            from: DEFAULT_OWNER_ADDRESS,
            data: `0x3156560e000000000000000000000000${approver.replace('0x', '').toLowerCase()}`,
          })

          // setSecurityCouncil to securityCouncil value
          await kit.sendTransaction({
            to: governance.address,
            from: DEFAULT_OWNER_ADDRESS,
            data: `0x1c1083e2000000000000000000000000${securityCouncil
              .replace('0x', '')
              .toLowerCase()}`,
          })
        })

        await testLocallyWithNode(Approve, ['--from', approver, '--hotfix', HOTFIX_HASH], client)

        expect(await governance.getHotfixRecord(HOTFIX_BUFFER)).toMatchInlineSnapshot(`
                  {
                    "approved": true,
                    "councilApproved": false,
                    "executed": false,
                    "executionTimeLimit": "0",
                  }
              `)
        expect(
          logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes))
        ).toMatchInlineSnapshot(`
          [
            [
              "Running Checks:",
            ],
            [
              "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 is approver address ",
            ],
            [
              "   ✔  Hotfix 0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d is not already approved ",
            ],
            [
              "   ✔  Hotfix 0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d is not already executed ",
            ],
            [
              "All checks passed",
            ],
            [
              "SendTransaction: approveTx",
            ],
            [
              "txHash: 0xtxhash",
            ],
          ]
        `)
        expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
      })

      it('succeeds when address is security council multisig signatory', async () => {
        const kit = newKitFromProvider(client)
        const accounts = (await kit.connection.getAccounts()) as StrongAddress[]
        const governance = await kit.contracts.getGovernance()
        const writeMock = jest.spyOn(ux.write, 'stdout')
        const logMock = jest.spyOn(console, 'log')
        const multisig = await governance.getApproverMultisig()

        await changeMultiSigOwner(kit, accounts[0])

        await withImpersonatedAccount(client, DEFAULT_OWNER_ADDRESS, async () => {
          // setApprover to 0x5409ED021D9299bf6814279A6A1411A7e866A631 to avoid "Council cannot be approver" error
          await kit.sendTransaction({
            to: governance.address,
            from: DEFAULT_OWNER_ADDRESS,
            // cast calldata "setApprover(address)" "0x5409ED021D9299bf6814279A6A1411A7e866A631"
            data: '0x3156560e0000000000000000000000005409ed021d9299bf6814279a6a1411a7e866a631',
          })

          // setSecurityCouncil to multisig address
          await kit.sendTransaction({
            to: governance.address,
            from: DEFAULT_OWNER_ADDRESS,
            // cast calldata "setSecurityCouncil(address)" <multisig-address>
            data: `0x1c1083e2000000000000000000000000${multisig.address
              .replace('0x', '')
              .toLowerCase()}`,
          })
        })

        // Sanity checks
        expect(await governance.getApprover()).toBe(accounts[0])
        expect(await governance.getSecurityCouncil()).toEqual(multisig.address)

        await testLocallyWithNode(
          Approve,
          [
            '--from',
            accounts[0],
            '--hotfix',
            HOTFIX_HASH,
            '--useMultiSig',
            '--type',
            'securityCouncil',
          ],
          client
        )

        expect(await governance.getHotfixRecord(HOTFIX_BUFFER)).toMatchInlineSnapshot(`
                  {
                    "approved": false,
                    "councilApproved": true,
                    "executed": false,
                    "executionTimeLimit": "0",
                  }
              `)

        expect(
          logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes))
        ).toMatchInlineSnapshot(`
                  [
                    [
                      "Running Checks:",
                    ],
                    [
                      "   ✔  0xf750153fc4211e4Ef325A7fD87d8258222e0b510 is security council address ",
                    ],
                    [
                      "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 is security council multisig signatory ",
                    ],
                    [
                      "   ✔  Hotfix 0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d is not already approved by security council ",
                    ],
                    [
                      "   ✔  Hotfix 0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d is not already executed ",
                    ],
                    [
                      "All checks passed",
                    ],
                    [
                      "SendTransaction: approveTx",
                    ],
                    [
                      "txHash: 0xtxhash",
                    ],
                  ]
              `)
        expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
      })

      it('succeeds when address is security council safe signatory', async () => {
        await setupSafeContracts(client)

        const kit = newKitFromProvider(client)
        const [approver, securityCouncilSafeSignatory1] =
          (await kit.connection.getAccounts()) as StrongAddress[]
        const securityCouncilSafeSignatory2: StrongAddress =
          '0x6C666E57A5E8715cFE93f92790f98c4dFf7b69e2'
        const securityCouncilSafeSignatory2PrivateKey =
          '0xe99303048756f2eac145377ebffdeec6747b8de31c1d34e004e1ee62f2b3d7a5'
        const governance = await kit.contracts.getGovernance()
        const writeMock = jest.spyOn(ux.write, 'stdout')
        const logMock = jest.spyOn(console, 'log')

        const safeAccountConfig: SafeAccountConfig = {
          owners: [securityCouncilSafeSignatory1, securityCouncilSafeSignatory2],
          threshold: 2,
        }

        const predictSafe: PredictedSafeProps = {
          safeAccountConfig,
        }

        const protocolKit = await Safe.init({
          predictedSafe: predictSafe,
          provider: kit.connection.currentProvider as any,
          signer: securityCouncilSafeSignatory1,
        })

        const deploymentTransaction = await protocolKit.createSafeDeploymentTransaction()

        const txHash = await kit.connection.sendTransaction({
          from: securityCouncilSafeSignatory1,
          ...deploymentTransaction,
        })
        const receipt = await kit.connection.viemClient.waitForTransactionReceipt({ hash: txHash as `0x${string}` })

        const safeAddress = getSafeAddressFromDeploymentTx(
          receipt as unknown as Parameters<typeof getSafeAddressFromDeploymentTx>[0],
          '1.3.0'
        )

        protocolKit.connect({ safeAddress })

        await withImpersonatedAccount(client, DEFAULT_OWNER_ADDRESS, async () => {
          // setApprover to 0x5409ED021D9299bf6814279A6A1411A7e866A631 to avoid "Council cannot be approver" error
          await kit.sendTransaction({
            to: governance.address,
            from: DEFAULT_OWNER_ADDRESS,
            // cast calldata "setApprover(address)" "0x5409ED021D9299bf6814279A6A1411A7e866A631"
            data: '0x3156560e0000000000000000000000005409ed021d9299bf6814279a6a1411a7e866a631',
          })

          // setSecurityCouncil to safe address
          await kit.sendTransaction({
            to: governance.address,
            from: DEFAULT_OWNER_ADDRESS,
            // cast calldata "setSecurityCouncil(address)" <safe-address>
            data: `0x1c1083e2000000000000000000000000${safeAddress
              .replace('0x', '')
              .toLowerCase()}`,
          })
        })

        // Sanity checks
        expect(await governance.getApprover()).toBe(approver)
        expect(await governance.getSecurityCouncil()).toEqual(safeAddress)
        expect(await protocolKit.getOwners()).toEqual([
          securityCouncilSafeSignatory1,
          securityCouncilSafeSignatory2,
        ])

        expect(await governance.getHotfixRecord(HOTFIX_BUFFER)).toMatchInlineSnapshot(`
                  {
                    "approved": false,
                    "councilApproved": false,
                    "executed": false,
                    "executionTimeLimit": "0",
                  }
              `)

        await testLocallyWithNode(
          Approve,
          [
            '--from',
            securityCouncilSafeSignatory1,
            '--hotfix',
            HOTFIX_HASH,
            '--useSafe',
            '--type',
            'securityCouncil',
          ],
          client
        )

        // Run the same command twice with same arguments to make sure it doesn't have any effect
        await testLocallyWithNode(
          Approve,
          [
            '--from',
            securityCouncilSafeSignatory1,
            '--hotfix',
            HOTFIX_HASH,
            '--useSafe',
            '--type',
            'securityCouncil',
          ],
          client
        )

        expect(await governance.getHotfixRecord(HOTFIX_BUFFER)).toMatchInlineSnapshot(`
                  {
                    "approved": false,
                    "councilApproved": false,
                    "executed": false,
                    "executionTimeLimit": "0",
                  }
              `)

        // Make sure the account has enough balance to pay for the transaction
        await setBalance(client, securityCouncilSafeSignatory2, BigInt(parseEther('1').toString()))
        await testLocallyWithNode(
          Approve,
          [
            '--from',
            securityCouncilSafeSignatory2,
            '--hotfix',
            HOTFIX_HASH,
            '--useSafe',
            '--type',
            'securityCouncil',
            // We want to test if integration works for accounts that are not added to the node
            '--privateKey',
            securityCouncilSafeSignatory2PrivateKey,
          ],
          client
        )

        expect(await governance.getHotfixRecord(HOTFIX_BUFFER)).toMatchInlineSnapshot(`
                  {
                    "approved": false,
                    "councilApproved": true,
                    "executed": false,
                    "executionTimeLimit": "0",
                  }
              `)

        expect(
          logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes))
        ).toMatchInlineSnapshot(`
                  [
                    [
                      "Running Checks:",
                    ],
                    [
                      "   ✔  0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb is security council safe signatory ",
                    ],
                    [
                      "   ✔  Hotfix 0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d is not already approved by security council ",
                    ],
                    [
                      "   ✔  Hotfix 0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d is not already executed ",
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
                      "   ✔  0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb is security council safe signatory ",
                    ],
                    [
                      "   ✔  Hotfix 0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d is not already approved by security council ",
                    ],
                    [
                      "   ✔  Hotfix 0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d is not already executed ",
                    ],
                    [
                      "All checks passed",
                    ],
                    [
                      "Running Checks:",
                    ],
                    [
                      "   ✔  0x6C666E57A5E8715cFE93f92790f98c4dFf7b69e2 is security council safe signatory ",
                    ],
                    [
                      "   ✔  Hotfix 0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d is not already approved by security council ",
                    ],
                    [
                      "   ✔  Hotfix 0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d is not already executed ",
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

        expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
      })

      it('succeeds when address is approver multisig signatory', async () => {
        const kit = newKitFromProvider(client)
        const accounts = (await kit.connection.getAccounts()) as StrongAddress[]

        await changeMultiSigOwner(kit, accounts[0])

        const governance = await kit.contracts.getGovernance()
        const writeMock = jest.spyOn(ux.write, 'stdout')
        const logMock = jest.spyOn(console, 'log')

        await testLocallyWithNode(
          Approve,
          ['--from', accounts[0], '--hotfix', HOTFIX_HASH, '--useMultiSig'],
          client
        )

        expect(await governance.getHotfixRecord(HOTFIX_BUFFER)).toMatchInlineSnapshot(`
                  {
                    "approved": true,
                    "councilApproved": false,
                    "executed": false,
                    "executionTimeLimit": "0",
                  }
              `)
        expect(
          logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes))
        ).toMatchInlineSnapshot(`
                  [
                    [
                      "Running Checks:",
                    ],
                    [
                      "   ✔  0xf750153fc4211e4Ef325A7fD87d8258222e0b510 is approver address ",
                    ],
                    [
                      "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 is approver multisig signatory ",
                    ],
                    [
                      "   ✔  Hotfix 0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d is not already approved ",
                    ],
                    [
                      "   ✔  Hotfix 0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d is not already executed ",
                    ],
                    [
                      "All checks passed",
                    ],
                    [
                      "SendTransaction: approveTx",
                    ],
                    [
                      "txHash: 0xtxhash",
                    ],
                  ]
              `)
        expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
      })

      it('succeeds when address is security council multisig signatory', async () => {
        const kit = newKitFromProvider(client)
        const accounts = (await kit.connection.getAccounts()) as StrongAddress[]

        await changeMultiSigOwner(kit, accounts[0])

        const governance = await kit.contracts.getGovernance()
        const writeMock = jest.spyOn(ux.write, 'stdout')
        const logMock = jest.spyOn(console, 'log')
        const multisig = await governance.getApproverMultisig()

        await withImpersonatedAccount(client, DEFAULT_OWNER_ADDRESS, async () => {
          // setApprover to 0x5409ED021D9299bf6814279A6A1411A7e866A631 to avoid "Council cannot be approver" error
          await kit.sendTransaction({
            to: governance.address,
            from: DEFAULT_OWNER_ADDRESS,
            data: '0x3156560e0000000000000000000000005409ed021d9299bf6814279a6a1411a7e866a631',
          })

          // setSecurityCouncil to multisig address
          await kit.sendTransaction({
            to: governance.address,
            from: DEFAULT_OWNER_ADDRESS,
            // cast calldata "setSecurityCouncil(address)" <multisig-address>
            data: `0x1c1083e2000000000000000000000000${multisig.address
              .replace('0x', '')
              .toLowerCase()}`,
          })
        })

        await testLocallyWithNode(
          Approve,
          [
            '--from',
            accounts[0],
            '--hotfix',
            HOTFIX_HASH,
            '--useMultiSig',
            '--type',
            'securityCouncil',
          ],
          client
        )

        expect(await governance.getHotfixRecord(HOTFIX_BUFFER)).toMatchInlineSnapshot(`
                  {
                    "approved": false,
                    "councilApproved": true,
                    "executed": false,
                    "executionTimeLimit": "0",
                  }
              `)
        expect(
          logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes))
        ).toMatchInlineSnapshot(`
                  [
                    [
                      "Running Checks:",
                    ],
                    [
                      "   ✔  0xf750153fc4211e4Ef325A7fD87d8258222e0b510 is security council address ",
                    ],
                    [
                      "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 is security council multisig signatory ",
                    ],
                    [
                      "   ✔  Hotfix 0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d is not already approved by security council ",
                    ],
                    [
                      "   ✔  Hotfix 0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d is not already executed ",
                    ],
                    [
                      "All checks passed",
                    ],
                    [
                      "SendTransaction: approveTx",
                    ],
                    [
                      "txHash: 0xtxhash",
                    ],
                  ]
              `)
        expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
      })
    })

    describe('proposal approval', () => {
      let proposalId: BigNumber.Value
      let governance: GovernanceWrapper
      let accounts: StrongAddress[]

      beforeEach(async () => {
        const kit = newKitFromProvider(client)
        accounts = (await kit.connection.getAccounts()) as StrongAddress[]
        governance = await kit.contracts.getGovernance()

        // Create and dequeue a proposal
        const minDeposit = (await governance.minDeposit()).toString()
        const proposeHash = await governance.propose([], 'https://example.com/proposal', {
          from: accounts[0],
          value: minDeposit,
        })
        await kit.connection.viemClient.waitForTransactionReceipt({ hash: proposeHash as `0x${string}` })

        proposalId = new BigNumber(1)

        // Dequeue the proposal
        const dequeueFrequency = (await governance.dequeueFrequency()).toNumber()
        const { timeTravel } = await import('@celo/dev-utils/ganache-test')
        await timeTravel(dequeueFrequency + 1, client)
        const dequeueHash = await governance.dequeueProposalsIfReady({ from: accounts[0] })
        await kit.connection.viemClient.waitForTransactionReceipt({ hash: dequeueHash as `0x${string}` })

        // Make accounts[0] the multisig owner
        await changeMultiSigOwner(kit, accounts[0])
      })

      it('should approve proposal using multisig when address is approver multisig signatory', async () => {
        const writeMock = jest.spyOn(ux.write, 'stdout')
        const logMock = jest.spyOn(console, 'log')

        await testLocallyWithNode(
          Approve,
          ['--from', accounts[0], '--proposalID', proposalId.toString(), '--useMultiSig'],
          client
        )

        expect(await governance.isApproved(proposalId)).toBe(true)
        expect(
          logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes))
        ).toMatchInlineSnapshot(`
                  [
                    [
                      "Running Checks:",
                    ],
                    [
                      "   ✔  0xf750153fc4211e4Ef325A7fD87d8258222e0b510 is approver address ",
                    ],
                    [
                      "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 is multisig signatory ",
                    ],
                    [
                      "   ✔  1 is an existing proposal ",
                    ],
                    [
                      "   ✔  1 is in stage Referendum or Execution ",
                    ],
                    [
                      "   ✔  1 not already approved ",
                    ],
                    [
                      "All checks passed",
                    ],
                    [
                      "SendTransaction: approveTx",
                    ],
                    [
                      "txHash: 0xtxhash",
                    ],
                  ]
              `)
        expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
      })

      it('approve proposal using --submit flag fails if already submitted', async () => {
        const logMock = jest.spyOn(console, 'log')

        // Mock the fetch to return that proposal has already been submitted
        ;(fetch as jest.Mock).mockResolvedValue({
          ok: true,
          json: async () => ({
            proposalId: 1,
            count: 1,
            approvals: [
              {
                approver: accounts[0],
                multisigTx: 0,
                confirmedAt: Date.now(),
                blockNumber: 100,
                transactionHash: '0xabcd',
              },
            ],
          }),
        })

        await expect(
          testLocallyWithNode(
            Approve,
            [
              '--from',
              accounts[0],
              '--proposalID',
              proposalId.toString(),
              '--useMultiSig',
              '--submit',
            ],
            client
          )
        ).rejects.toThrow("Some checks didn't pass!")

        expect(
          logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes))
        ).toMatchInlineSnapshot(`
          [
            [
              "Running Checks:",
            ],
            [
              "   ✔  0xf750153fc4211e4Ef325A7fD87d8258222e0b510 is approver address ",
            ],
            [
              "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 is multisig signatory ",
            ],
            [
              "   ✔  1 is an existing proposal ",
            ],
            [
              "   ✔  1 is in stage Referendum or Execution ",
            ],
            [
              "   ✔  1 not already approved ",
            ],
            [
              "   ✘  Proposal has not been submitted to multisig ",
            ],
          ]
        `)
      })
      it('approve proposal using --submit flag can succeed', async () => {
        const logMock = jest.spyOn(console, 'log')

        // Mock the fetch to return that proposal has already been submitted
        ;(fetch as jest.Mock).mockResolvedValue({
          ok: true,
          json: async () => ({
            proposalId: proposalId,
            count: 0,
            approvals: [],
          }),
        })

        await expect(
          testLocallyWithNode(
            Approve,
            [
              '--from',
              accounts[0],
              '--proposalID',
              proposalId.toString(),
              '--useMultiSig',
              '--submit',
            ],
            client
          )
        ).resolves.toBeUndefined()

        expect(
          logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes))
        ).toMatchInlineSnapshot(`
                  [
                    [
                      "Running Checks:",
                    ],
                    [
                      "   ✔  0xf750153fc4211e4Ef325A7fD87d8258222e0b510 is approver address ",
                    ],
                    [
                      "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 is multisig signatory ",
                    ],
                    [
                      "   ✔  1 is an existing proposal ",
                    ],
                    [
                      "   ✔  1 is in stage Referendum or Execution ",
                    ],
                    [
                      "   ✔  1 not already approved ",
                    ],
                    [
                      "   ✔  Proposal has not been submitted to multisig ",
                    ],
                    [
                      "All checks passed",
                    ],
                    [
                      "SendTransaction: approveTx",
                    ],
                    [
                      "txHash: 0xtxhash",
                    ],
                  ]
              `)
      })

      it('should confirm existing multisig transaction when --multisigTx is provided', async () => {
        const logMock = jest.spyOn(console, 'log')
        const kit = newKitFromProvider(client)

        // Create a 2-signer multisig so the transaction won't execute immediately
        const twoSignerMultisig = await createMultisig(kit, [accounts[0], accounts[1]], 2, 2)

        // Set the new multisig as the governance approver
        await withImpersonatedAccount(client, DEFAULT_OWNER_ADDRESS, async () => {
          await kit.sendTransaction({
            to: governance.address,
            from: DEFAULT_OWNER_ADDRESS,
            data: `0x3156560e000000000000000000000000${twoSignerMultisig
              .replace('0x', '')
              .toLowerCase()}`,
          })
        })

        // Get the new multisig wrapper
        const multisig = await governance.getApproverMultisig()

        // First, submit the transaction to multisig from accounts[0]
        // This won't execute because it requires 2 confirmations
        const dequeue = await governance.getDequeue()
        const proposalIndex = dequeue.findIndex((id: BigNumber) => id.isEqualTo(proposalId))
        const approveData = governance.encodeFunctionData('approve', [
          proposalId.toString(),
          proposalIndex,
        ])
        const submitHash = await multisig.submitTransaction(governance.address, approveData, '0', {
          from: accounts[0],
        })
        await kit.connection.viemClient.waitForTransactionReceipt({ hash: submitHash as `0x${string}` })

        // Verify proposal is not yet approved
        expect(await governance.isApproved(proposalId)).toBe(false)

        // Mock the fetch to return the multisigTx
        ;(fetch as jest.Mock).mockResolvedValue({
          ok: true,
          json: async () => ({
            proposalId: 1,
            count: 1,
            approvals: [
              {
                approver: accounts[0],
                multisigTx: 0,
                confirmedAt: Date.now(),
                blockNumber: 100,
                transactionHash: '0xabcd',
              },
            ],
          }),
        })

        // Now confirm it with the multisigTx from accounts[1]
        await expect(
          testLocallyWithNode(
            Approve,
            [
              '--from',
              accounts[1],
              '--proposalID',
              proposalId.toString(),
              '--useMultiSig',
              '--multisigTx',
              '0',
            ],
            client
          )
        ).resolves.toBeUndefined()

        // The proposal should now be approved
        expect(await governance.isApproved(proposalId)).toBe(true)
        expect(
          logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes))
        ).toMatchInlineSnapshot(`
          [
            [
              "Running Checks:",
            ],
            [
              "   ✔  0x0B1ba0af832d7C05fD64161E0Db78E85978E8082 is approver address ",
            ],
            [
              "   ✔  0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb is multisig signatory ",
            ],
            [
              "   ✔  1 is an existing proposal ",
            ],
            [
              "   ✔  1 is in stage Referendum or Execution ",
            ],
            [
              "   ✔  1 not already approved ",
            ],
            [
              "   ✔  multisgTXId provided is valid ",
            ],
            [
              "All checks passed",
            ],
            [
              "SendTransaction: approveTx",
            ],
            [
              "txHash: 0xtxhash",
            ],
          ]
        `)
      })

      it('should fail when invalid --multisigTx is provided', async () => {
        const logMock = jest.spyOn(console, 'log')

        // Mock the fetch to return a different multisigTx
        ;(fetch as jest.Mock).mockResolvedValue({
          ok: true,
          json: async () => ({
            proposalId: 1,
            count: 1,
            approvals: [
              {
                approver: accounts[0],
                multisigTx: 5, // Different ID
                confirmedAt: Date.now(),
                blockNumber: 100,
                transactionHash: '0xabcd',
              },
            ],
          }),
        })

        await expect(
          testLocallyWithNode(
            Approve,
            [
              '--from',
              accounts[0],
              '--proposalID',
              proposalId.toString(),
              '--useMultiSig',
              '--multisigTx',
              '0', // Invalid ID
            ],
            client
          )
        ).rejects.toThrow("Some checks didn't pass!")

        expect(
          logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes))
        ).toMatchInlineSnapshot(`
                  [
                    [
                      "Running Checks:",
                    ],
                    [
                      "   ✔  0xf750153fc4211e4Ef325A7fD87d8258222e0b510 is approver address ",
                    ],
                    [
                      "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 is multisig signatory ",
                    ],
                    [
                      "   ✔  1 is an existing proposal ",
                    ],
                    [
                      "   ✔  1 is in stage Referendum or Execution ",
                    ],
                    [
                      "   ✔  1 not already approved ",
                    ],
                    [
                      "   ✘  multisgTXId provided is valid ",
                    ],
                  ]
              `)
      })

      it('should succeed without --submit when proposal was already submitted to multisig', async () => {
        const logMock = jest.spyOn(console, 'log')
        // Mock the fetch to return that proposal has already been submitted
        ;(fetch as jest.Mock).mockResolvedValue({
          ok: true,
          json: async () => ({
            proposalId: 1,
            count: 1,
            approvals: [
              {
                approver: accounts[0],
                multisigTx: 0,
                confirmedAt: Date.now(),
                blockNumber: 100,
                transactionHash: '0xabcd',
              },
            ],
          }),
        })

        // Without --submit flag, this should work because the default behavior
        // is submitOrConfirmTransaction which will confirm if it exists
        await testLocallyWithNode(
          Approve,
          ['--from', accounts[0], '--proposalID', proposalId.toString(), '--useMultiSig'],
          client
        )

        expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
          [
            [
              "Running Checks:",
            ],
            [
              "   ✔  0xf750153fc4211e4Ef325A7fD87d8258222e0b510 is approver address ",
            ],
            [
              "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 is multisig signatory ",
            ],
            [
              "   ✔  1 is an existing proposal ",
            ],
            [
              "   ✔  1 is in stage Referendum or Execution ",
            ],
            [
              "   ✔  1 not already approved ",
            ],
            [
              "All checks passed",
            ],
            [
              "SendTransaction: approveTx",
            ],
            [
              "txHash: 0xtxhash",
            ],
          ]
        `)

        // Should succeed because submitOrConfirmTransaction finds and confirms the existing transaction
        expect(await governance.isApproved(proposalId)).toBe(true)
      })
    })

    afterEach(() => {
      jest.clearAllMocks()
    })
  },
  {
    chainId: 42220,
  }
)
