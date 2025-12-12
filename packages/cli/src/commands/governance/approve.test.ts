import { hexToBuffer, StrongAddress } from '@celo/base'
import { CeloProvider } from '@celo/connect/lib/celo-provider'
import { newKitFromWeb3 } from '@celo/contractkit'
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
import Web3 from 'web3'
import { changeMultiSigOwner } from '../../test-utils/chain-setup'
import {
  stripAnsiCodesAndTxHashes,
  stripAnsiCodesFromNestedArray,
  testLocallyWithWeb3Node,
} from '../../test-utils/cliUtils'
import { deployMultiCall } from '../../test-utils/multicall'
import { createMultisig, setupSafeContracts } from '../../test-utils/multisigUtils'
import Approve from './approve'

// Mock fetch for HTTP status tests
jest.mock('cross-fetch')

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2(
  'governance:approve cmd',
  (web3: Web3) => {
    const HOTFIX_HASH = '0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d'
    const HOTFIX_BUFFER = hexToBuffer(HOTFIX_HASH)
    beforeEach(async () => {
      // need to set multical deployment on the address it was found on alfajores
      // since this test impersonates the old alfajores chain id
      await deployMultiCall(web3, '0xcA11bde05977b3631167028862bE2a173976CA11')
      jest.spyOn(console, 'log').mockImplementation(() => {
        // noop
      })
      jest.spyOn(console, 'error').mockImplementation(() => {
        // noop
      })
    })

    describe('hotfix', () => {
      it('fails when address is not security council multisig signatory', async () => {
        const kit = newKitFromWeb3(web3)
        const accounts = await web3.eth.getAccounts()
        const governance = await kit.contracts.getGovernance()
        const writeMock = jest.spyOn(ux.write, 'stdout')
        const logMock = jest.spyOn(console, 'log')
        const multisig = await governance.getApproverMultisig()

        await withImpersonatedAccount(web3, DEFAULT_OWNER_ADDRESS, async () => {
          // setApprover to 0x5409ED021D9299bf6814279A6A1411A7e866A631 to avoid "Council cannot be approver" error
          await (
            await kit.sendTransaction({
              to: governance.address,
              from: DEFAULT_OWNER_ADDRESS,
              data: '0x3156560e0000000000000000000000005409ed021d9299bf6814279a6a1411a7e866a631',
            })
          ).waitReceipt()

          // setSecurityCouncil to multisig address
          await (
            await kit.sendTransaction({
              to: governance.address,
              from: DEFAULT_OWNER_ADDRESS,
              // cast calldata "setSecurityCouncil(address)" <multisig-address>
              data: `0x1c1083e2000000000000000000000000${multisig.address
                .replace('0x', '')
                .toLowerCase()}`,
            })
          ).waitReceipt()
        })

        await expect(
          testLocallyWithWeb3Node(
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
            web3
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
        expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes)))
          .toMatchInlineSnapshot(`
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
        const kit = newKitFromWeb3(web3)
        const accounts = await web3.eth.getAccounts()
        const governance = await kit.contracts.getGovernance()
        const writeMock = jest.spyOn(ux.write, 'stdout')
        const logMock = jest.spyOn(console, 'log')

        await expect(
          testLocallyWithWeb3Node(
            Approve,
            ['--from', accounts[0], '--hotfix', HOTFIX_HASH, '--useMultiSig'],
            web3
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
        expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes)))
          .toMatchInlineSnapshot(`
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
        const [approver, securityCouncil, account] = await web3.eth.getAccounts()
        const kit = newKitFromWeb3(web3)
        const governance = await kit.contracts.getGovernance()
        const writeMock = jest.spyOn(ux.write, 'stdout')
        const logMock = jest.spyOn(console, 'log')

        await withImpersonatedAccount(web3, DEFAULT_OWNER_ADDRESS, async () => {
          // setApprover to approver value
          await (
            await kit.sendTransaction({
              to: governance.address,
              from: DEFAULT_OWNER_ADDRESS,
              data: `0x3156560e000000000000000000000000${approver.replace('0x', '').toLowerCase()}`,
            })
          ).waitReceipt()

          // setSecurityCouncil to securityCouncil value
          await (
            await kit.sendTransaction({
              to: governance.address,
              from: DEFAULT_OWNER_ADDRESS,
              data: `0x1c1083e2000000000000000000000000${securityCouncil
                .replace('0x', '')
                .toLowerCase()}`,
            })
          ).waitReceipt()
        })

        await expect(
          testLocallyWithWeb3Node(
            Approve,
            ['--from', account, '--hotfix', HOTFIX_HASH, '--type', 'securityCouncil'],
            web3
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
        expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes)))
          .toMatchInlineSnapshot(`
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
        const kit = newKitFromWeb3(web3)
        const [approver, securityCouncil, account] = await web3.eth.getAccounts()
        const governance = await kit.contracts.getGovernance()
        const writeMock = jest.spyOn(ux.write, 'stdout')
        const logMock = jest.spyOn(console, 'log')

        await withImpersonatedAccount(web3, DEFAULT_OWNER_ADDRESS, async () => {
          // setApprover to approver value
          await (
            await kit.sendTransaction({
              to: governance.address,
              from: DEFAULT_OWNER_ADDRESS,
              data: `0x3156560e000000000000000000000000${approver.replace('0x', '').toLowerCase()}`,
            })
          ).waitReceipt()

          // setSecurityCouncil to securityCouncil value
          await (
            await kit.sendTransaction({
              to: governance.address,
              from: DEFAULT_OWNER_ADDRESS,
              data: `0x1c1083e2000000000000000000000000${securityCouncil
                .replace('0x', '')
                .toLowerCase()}`,
            })
          ).waitReceipt()
        })

        await expect(
          testLocallyWithWeb3Node(Approve, ['--from', account, '--hotfix', HOTFIX_HASH], web3)
        ).rejects.toThrow("Some checks didn't pass!")

        expect(await governance.getHotfixRecord(HOTFIX_BUFFER)).toMatchInlineSnapshot(`
                  {
                    "approved": false,
                    "councilApproved": false,
                    "executed": false,
                    "executionTimeLimit": "0",
                  }
              `)
        expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes)))
          .toMatchInlineSnapshot(`
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
        const [approver, securityCouncil] = await web3.eth.getAccounts()
        const kit = newKitFromWeb3(web3)
        const governance = await kit.contracts.getGovernance()
        const writeMock = jest.spyOn(ux.write, 'stdout')
        const logMock = jest.spyOn(console, 'log')

        await withImpersonatedAccount(web3, DEFAULT_OWNER_ADDRESS, async () => {
          // setApprover to approver value
          await (
            await kit.sendTransaction({
              to: governance.address,
              from: DEFAULT_OWNER_ADDRESS,
              data: `0x3156560e000000000000000000000000${approver.replace('0x', '').toLowerCase()}`,
            })
          ).waitReceipt()

          // setSecurityCouncil to securityCouncil value
          await (
            await kit.sendTransaction({
              to: governance.address,
              from: DEFAULT_OWNER_ADDRESS,
              data: `0x1c1083e2000000000000000000000000${securityCouncil
                .replace('0x', '')
                .toLowerCase()}`,
            })
          ).waitReceipt()
        })

        await testLocallyWithWeb3Node(
          Approve,
          ['--from', securityCouncil, '--hotfix', HOTFIX_HASH, '--type', 'securityCouncil'],
          web3
        )

        expect(await governance.getHotfixRecord(HOTFIX_BUFFER)).toMatchInlineSnapshot(`
                  {
                    "approved": false,
                    "councilApproved": true,
                    "executed": false,
                    "executionTimeLimit": "0",
                  }
              `)
        expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes)))
          .toMatchInlineSnapshot(`
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
                    [
                      "HotfixApproved:",
                    ],
                    [
                      "hash: 0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d
                  approver: 0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb",
                    ],
                  ]
              `)
        expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
      })

      it('succeeds when address is a direct approver', async () => {
        const kit = newKitFromWeb3(web3)
        const [approver, securityCouncil] = await web3.eth.getAccounts()
        const governance = await kit.contracts.getGovernance()
        const writeMock = jest.spyOn(ux.write, 'stdout')
        const logMock = jest.spyOn(console, 'log')

        await withImpersonatedAccount(web3, DEFAULT_OWNER_ADDRESS, async () => {
          // setApprover to approver value
          await (
            await kit.sendTransaction({
              to: governance.address,
              from: DEFAULT_OWNER_ADDRESS,
              data: `0x3156560e000000000000000000000000${approver.replace('0x', '').toLowerCase()}`,
            })
          ).waitReceipt()

          // setSecurityCouncil to securityCouncil value
          await (
            await kit.sendTransaction({
              to: governance.address,
              from: DEFAULT_OWNER_ADDRESS,
              data: `0x1c1083e2000000000000000000000000${securityCouncil
                .replace('0x', '')
                .toLowerCase()}`,
            })
          ).waitReceipt()
        })

        await testLocallyWithWeb3Node(Approve, ['--from', approver, '--hotfix', HOTFIX_HASH], web3)

        expect(await governance.getHotfixRecord(HOTFIX_BUFFER)).toMatchInlineSnapshot(`
                  {
                    "approved": true,
                    "councilApproved": false,
                    "executed": false,
                    "executionTimeLimit": "0",
                  }
              `)
        expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes)))
          .toMatchInlineSnapshot(`
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
                    [
                      "HotfixApproved:",
                    ],
                    [
                      "hash: 0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d
                  approver: 0x5409ED021D9299bf6814279A6A1411A7e866A631",
                    ],
                  ]
              `)
        expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
      })

      it('succeeds when address is security council multisig signatory', async () => {
        const kit = newKitFromWeb3(web3)
        const accounts = (await web3.eth.getAccounts()) as StrongAddress[]
        const governance = await kit.contracts.getGovernance()
        const writeMock = jest.spyOn(ux.write, 'stdout')
        const logMock = jest.spyOn(console, 'log')
        const multisig = await governance.getApproverMultisig()

        await changeMultiSigOwner(kit, accounts[0])

        await withImpersonatedAccount(web3, DEFAULT_OWNER_ADDRESS, async () => {
          // setApprover to 0x5409ED021D9299bf6814279A6A1411A7e866A631 to avoid "Council cannot be approver" error
          await (
            await kit.sendTransaction({
              to: governance.address,
              from: DEFAULT_OWNER_ADDRESS,
              // cast calldata "setApprover(address)" "0x5409ED021D9299bf6814279A6A1411A7e866A631"
              data: '0x3156560e0000000000000000000000005409ed021d9299bf6814279a6a1411a7e866a631',
            })
          ).waitReceipt()

          // setSecurityCouncil to multisig address
          await (
            await kit.sendTransaction({
              to: governance.address,
              from: DEFAULT_OWNER_ADDRESS,
              // cast calldata "setSecurityCouncil(address)" <multisig-address>
              data: `0x1c1083e2000000000000000000000000${multisig.address
                .replace('0x', '')
                .toLowerCase()}`,
            })
          ).waitReceipt()
        })

        // Sanity checks
        expect(await governance.getApprover()).toBe(accounts[0])
        expect(await governance.getSecurityCouncil()).toEqual(multisig.address)

        await testLocallyWithWeb3Node(
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
          web3
        )

        expect(await governance.getHotfixRecord(HOTFIX_BUFFER)).toMatchInlineSnapshot(`
                  {
                    "approved": false,
                    "councilApproved": true,
                    "executed": false,
                    "executionTimeLimit": "0",
                  }
              `)

        expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes)))
          .toMatchInlineSnapshot(`
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
        await setupSafeContracts(web3)

        const kit = newKitFromWeb3(web3)
        const [approver, securityCouncilSafeSignatory1] =
          (await web3.eth.getAccounts()) as StrongAddress[]
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
          provider: (web3.currentProvider as any as CeloProvider).toEip1193Provider(),
          signer: securityCouncilSafeSignatory1,
        })

        const deploymentTransaction = await protocolKit.createSafeDeploymentTransaction()

        const receipt = await web3.eth.sendTransaction({
          from: securityCouncilSafeSignatory1,
          ...deploymentTransaction,
        })

        // @ts-expect-error the function is able to extract safe adddress without having
        const safeAddress = getSafeAddressFromDeploymentTx(receipt, '1.3.0')

        protocolKit.connect({ safeAddress })

        await withImpersonatedAccount(web3, DEFAULT_OWNER_ADDRESS, async () => {
          // setApprover to 0x5409ED021D9299bf6814279A6A1411A7e866A631 to avoid "Council cannot be approver" error
          await (
            await kit.sendTransaction({
              to: governance.address,
              from: DEFAULT_OWNER_ADDRESS,
              // cast calldata "setApprover(address)" "0x5409ED021D9299bf6814279A6A1411A7e866A631"
              data: '0x3156560e0000000000000000000000005409ed021d9299bf6814279a6a1411a7e866a631',
            })
          ).waitReceipt()

          // setSecurityCouncil to safe address
          await (
            await kit.sendTransaction({
              to: governance.address,
              from: DEFAULT_OWNER_ADDRESS,
              // cast calldata "setSecurityCouncil(address)" <safe-address>
              data: `0x1c1083e2000000000000000000000000${safeAddress
                .replace('0x', '')
                .toLowerCase()}`,
            })
          ).waitReceipt()
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

        await testLocallyWithWeb3Node(
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
          web3
        )

        // Run the same command twice with same arguments to make sure it doesn't have any effect
        await testLocallyWithWeb3Node(
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
          web3
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
        await setBalance(
          web3,
          securityCouncilSafeSignatory2,
          BigInt(web3.utils.toWei('1', 'ether'))
        )
        await testLocallyWithWeb3Node(
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
          web3
        )

        expect(await governance.getHotfixRecord(HOTFIX_BUFFER)).toMatchInlineSnapshot(`
                  {
                    "approved": false,
                    "councilApproved": true,
                    "executed": false,
                    "executionTimeLimit": "0",
                  }
              `)

        expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes)))
          .toMatchInlineSnapshot(`
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
        const kit = newKitFromWeb3(web3)
        const accounts = (await web3.eth.getAccounts()) as StrongAddress[]

        await changeMultiSigOwner(kit, accounts[0])

        const governance = await kit.contracts.getGovernance()
        const writeMock = jest.spyOn(ux.write, 'stdout')
        const logMock = jest.spyOn(console, 'log')

        await testLocallyWithWeb3Node(
          Approve,
          ['--from', accounts[0], '--hotfix', HOTFIX_HASH, '--useMultiSig'],
          web3
        )

        expect(await governance.getHotfixRecord(HOTFIX_BUFFER)).toMatchInlineSnapshot(`
                  {
                    "approved": true,
                    "councilApproved": false,
                    "executed": false,
                    "executionTimeLimit": "0",
                  }
              `)
        expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes)))
          .toMatchInlineSnapshot(`
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
        const kit = newKitFromWeb3(web3)
        const accounts = (await web3.eth.getAccounts()) as StrongAddress[]

        await changeMultiSigOwner(kit, accounts[0])

        const governance = await kit.contracts.getGovernance()
        const writeMock = jest.spyOn(ux.write, 'stdout')
        const logMock = jest.spyOn(console, 'log')
        const multisig = await governance.getApproverMultisig()

        await withImpersonatedAccount(web3, DEFAULT_OWNER_ADDRESS, async () => {
          // setApprover to 0x5409ED021D9299bf6814279A6A1411A7e866A631 to avoid "Council cannot be approver" error
          await (
            await kit.sendTransaction({
              to: governance.address,
              from: DEFAULT_OWNER_ADDRESS,
              data: '0x3156560e0000000000000000000000005409ed021d9299bf6814279a6a1411a7e866a631',
            })
          ).waitReceipt()

          // setSecurityCouncil to multisig address
          await (
            await kit.sendTransaction({
              to: governance.address,
              from: DEFAULT_OWNER_ADDRESS,
              // cast calldata "setSecurityCouncil(address)" <multisig-address>
              data: `0x1c1083e2000000000000000000000000${multisig.address
                .replace('0x', '')
                .toLowerCase()}`,
            })
          ).waitReceipt()
        })

        await testLocallyWithWeb3Node(
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
          web3
        )

        expect(await governance.getHotfixRecord(HOTFIX_BUFFER)).toMatchInlineSnapshot(`
                  {
                    "approved": false,
                    "councilApproved": true,
                    "executed": false,
                    "executionTimeLimit": "0",
                  }
              `)
        expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes)))
          .toMatchInlineSnapshot(`
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
        accounts = (await web3.eth.getAccounts()) as StrongAddress[]
        const kit = newKitFromWeb3(web3)
        governance = await kit.contracts.getGovernance()

        // Create and dequeue a proposal
        const minDeposit = (await governance.minDeposit()).toString()
        await governance
          .propose([], 'https://example.com/proposal')
          .sendAndWaitForReceipt({ from: accounts[0], value: minDeposit })

        proposalId = new BigNumber(1)

        // Dequeue the proposal
        const dequeueFrequency = (await governance.dequeueFrequency()).toNumber()
        const { timeTravel } = await import('@celo/dev-utils/ganache-test')
        await timeTravel(dequeueFrequency + 1, web3)
        await governance.dequeueProposalsIfReady().sendAndWaitForReceipt({ from: accounts[0] })

        // Make accounts[0] the multisig owner
        await changeMultiSigOwner(kit, accounts[0])
      })

      it('should approve proposal using multisig when address is approver multisig signatory', async () => {
        const writeMock = jest.spyOn(ux.write, 'stdout')
        const logMock = jest.spyOn(console, 'log')

        await testLocallyWithWeb3Node(
          Approve,
          ['--from', accounts[0], '--proposalID', proposalId.toString(), '--useMultiSig'],
          web3
        )

        expect(await governance.isApproved(proposalId)).toBe(true)
        expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes)))
          .toMatchInlineSnapshot(`
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
                multisigTxId: 0,
                confirmedAt: Date.now(),
                blockNumber: 100,
                transactionHash: '0xabcd',
              },
            ],
          }),
        })

        await expect(
          testLocallyWithWeb3Node(
            Approve,
            [
              '--from',
              accounts[0],
              '--proposalID',
              proposalId.toString(),
              '--useMultiSig',
              '--submit',
            ],
            web3
          )
        ).rejects.toThrow("Some checks didn't pass!")

        expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes)))
          .toMatchInlineSnapshot(`
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
          testLocallyWithWeb3Node(
            Approve,
            [
              '--from',
              accounts[0],
              '--proposalID',
              proposalId.toString(),
              '--useMultiSig',
              '--submit',
            ],
            web3
          )
        ).resolves.toBeUndefined()

        expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes)))
          .toMatchInlineSnapshot(`
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

      it('should confirm existing multisig transaction when --multisigTXId is provided', async () => {
        const logMock = jest.spyOn(console, 'log')
        const kit = newKitFromWeb3(web3)

        // Create a 2-signer multisig so the transaction won't execute immediately
        const twoSignerMultisig = await createMultisig(kit, [accounts[0], accounts[1]], 2, 2)

        // Set the new multisig as the governance approver
        await withImpersonatedAccount(web3, DEFAULT_OWNER_ADDRESS, async () => {
          await (
            await kit.sendTransaction({
              to: governance.address,
              from: DEFAULT_OWNER_ADDRESS,
              data: `0x3156560e000000000000000000000000${twoSignerMultisig.replace('0x', '').toLowerCase()}`,
            })
          ).waitReceipt()
        })

        // Get the new multisig wrapper
        const multisig = await governance.getApproverMultisig()

        // First, submit the transaction to multisig from accounts[0]
        // This won't execute because it requires 2 confirmations
        const approveTx = await governance.approve(proposalId)
        await (
          await multisig.submitTransaction(governance.address, approveTx.txo)
        ).sendAndWaitForReceipt({ from: accounts[0] })

        // Verify proposal is not yet approved
        expect(await governance.isApproved(proposalId)).toBe(false)

        // Mock the fetch to return the multisigTxId
        ;(fetch as jest.Mock).mockResolvedValue({
          ok: true,
          json: async () => ({
            proposalId: 1,
            count: 1,
            approvals: [
              {
                approver: accounts[0],
                multisigTxId: 0,
                confirmedAt: Date.now(),
                blockNumber: 100,
                transactionHash: '0xabcd',
              },
            ],
          }),
        })

        // Now confirm it with the multisigTXId from accounts[1]
        await expect(testLocallyWithWeb3Node(
          Approve,
          [
            '--from',
            accounts[1],
            '--proposalID',
            proposalId.toString(),
            '--useMultiSig',
            '--multisigTXId',
            '0',
          ],
          web3
        )).resolves.toBeUndefined()

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
                      "   ✔  ${twoSignerMultisig} is approver address ",
                    ],
                    [
                      "   ✔  ${accounts[1]} is multisig signatory ",
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

      it('should fail when invalid --multisigTXId is provided', async () => {
        const logMock = jest.spyOn(console, 'log')

        // Mock the fetch to return a different multisigTxId
        ;(fetch as jest.Mock).mockResolvedValue({
          ok: true,
          json: async () => ({
            proposalId: 1,
            count: 1,
            approvals: [
              {
                approver: accounts[0],
                multisigTxId: 5, // Different ID
                confirmedAt: Date.now(),
                blockNumber: 100,
                transactionHash: '0xabcd',
              },
            ],
          }),
        })

        await expect(
          testLocallyWithWeb3Node(
            Approve,
            [
              '--from',
              accounts[0],
              '--proposalID',
              proposalId.toString(),
              '--useMultiSig',
              '--multisigTXId',
              '0', // Invalid ID
            ],
            web3
          )
        ).rejects.toThrow("Some checks didn't pass!")

        expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes)))
          .toMatchInlineSnapshot(`
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
                multisigTxId: 0,
                confirmedAt: Date.now(),
                blockNumber: 100,
                transactionHash: '0xabcd',
              },
            ],
          }),
        })

        // Without --submit flag, this should work because the default behavior
        // is submitOrConfirmTransaction which will confirm if it exists
        await testLocallyWithWeb3Node(
          Approve,
          ['--from', accounts[0], '--proposalID', proposalId.toString(), '--useMultiSig'],
          web3
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
