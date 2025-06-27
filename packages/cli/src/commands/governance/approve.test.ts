import { hexToBuffer, StrongAddress } from '@celo/base'
import { CeloProvider } from '@celo/connect/lib/celo-provider'
import { newKitFromWeb3 } from '@celo/contractkit'
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
import { celoAlfajores } from 'viem/chains'
import Web3 from 'web3'
import { changeMultiSigOwner } from '../../test-utils/chain-setup'
import { stripAnsiCodesAndTxHashes, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import { deployMultiCall } from '../../test-utils/multicall'
import { setupSafeContracts } from '../../test-utils/multisigUtils'
import Approve from './approve'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2(
  'governance:approve cmd',
  (web3: Web3) => {
    const HOTFIX_HASH = '0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d'
    const HOTFIX_BUFFER = hexToBuffer(HOTFIX_HASH)
    beforeEach(async () => {
      // need to set multical deployment on the address it is found on alfajores
      // since this test impersonates alfajores chain id
      await deployMultiCall(web3, celoAlfajores.contracts.multicall3.address)
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
    afterEach(() => {
      jest.clearAllMocks()
    })
  },
  {
    chainId: 42220,
  }
)
