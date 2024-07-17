import { hexToBuffer, StrongAddress } from '@celo/base'
import { newKitFromWeb3 } from '@celo/contractkit'
import {
  DEFAULT_OWNER_ADDRESS,
  setupL2,
  testWithAnvil,
  withImpersonatedAccount,
} from '@celo/dev-utils/lib/anvil-test'
import { ux } from '@oclif/core'
import Web3 from 'web3'
import { changeMultiSigOwner } from '../../test-utils/chain-setup'
import { stripAnsiCodes, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Approve from './approve'

process.env.NO_SYNCCHECK = 'true'

testWithAnvil('governance:approve cmd', (web3: Web3) => {
  const HOTFIX_HASH = '0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d'
  const HOTFIX_BUFFER = hexToBuffer(HOTFIX_HASH)

  describe('hotfix', () => {
    it('fails when address is not security council multisig signatory', async () => {
      const kit = newKitFromWeb3(web3)
      const accounts = await web3.eth.getAccounts()
      const governance = await kit.contracts.getGovernance()
      const writeMock = jest.spyOn(ux.write, 'stdout')
      const logMock = jest.spyOn(console, 'log')
      const multisig = await governance.getApproverMultisig()

      await setupL2(web3)

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
      expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodes))).toMatchInlineSnapshot(`
        [
          [
            "Running Checks:",
          ],
          [
            "   ✔  0x078B932B0d1e56554974A431B8B33973D94E002b is security council address ",
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

      await setupL2(web3)

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
      expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodes))).toMatchInlineSnapshot(`
        [
          [
            "Running Checks:",
          ],
          [
            "   ✔  0x078B932B0d1e56554974A431B8B33973D94E002b is approver address ",
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

      await setupL2(web3)

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
      expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodes))).toMatchInlineSnapshot(`
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

      await setupL2(web3)

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
      expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodes))).toMatchInlineSnapshot(`
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

      await setupL2(web3)

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
      expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodes))).toMatchInlineSnapshot(`
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
            "txHash: 0xdf85b6bb3755e1ec2211a7f9b37203d3a89221b594da7747a1f453f6cfdc2aa5",
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

      await setupL2(web3)

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
      expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodes))).toMatchInlineSnapshot(`
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
            "txHash: 0x46d5958b1b06239eccb901bb3d35bba371c2520df3a97f9e8cc5f9a289210c05",
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

      await setupL2(web3)
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

      expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodes))).toMatchInlineSnapshot(`
        [
          [
            "Running Checks:",
          ],
          [
            "   ✔  0x078B932B0d1e56554974A431B8B33973D94E002b is security council address ",
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
            "txHash: 0x7bdb6c9348695e3ed388de315b1980b2285f1d107de6f25db61789cabf74953a",
          ],
        ]
      `)
      expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
    })

    it('succeeds when address is approver multisig signatory', async () => {
      const kit = newKitFromWeb3(web3)
      const accounts = (await web3.eth.getAccounts()) as StrongAddress[]

      await setupL2(web3)
      await changeMultiSigOwner(kit, accounts[0])

      const governance = await kit.contracts.getGovernance()
      const writeMock = jest.spyOn(ux.write, 'stdout')
      const logMock = jest.spyOn(console, 'log')

      await testLocallyWithWeb3Node(
        Approve,
        ['--from', accounts[0], '--hotfix', HOTFIX_HASH, '--useMultiSig'],
        web3
      )

      await new Promise((resolve) => setTimeout(resolve, 5000))

      expect(await governance.getHotfixRecord(HOTFIX_BUFFER)).toMatchInlineSnapshot(`
        {
          "approved": true,
          "councilApproved": false,
          "executed": false,
          "executionTimeLimit": "0",
        }
      `)
      expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodes))).toMatchInlineSnapshot(`
        [
          [
            "Running Checks:",
          ],
          [
            "   ✔  0x078B932B0d1e56554974A431B8B33973D94E002b is approver address ",
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
            "txHash: 0xd97a6958d93c34ab230f65be1b76167f655efbd8d1fe64980fa560bf1ed4298a",
          ],
        ]
      `)
      expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
    })

    it('succeeds when address is security council multisig signatory', async () => {
      const kit = newKitFromWeb3(web3)
      const accounts = (await web3.eth.getAccounts()) as StrongAddress[]

      await setupL2(web3)
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
      expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodes))).toMatchInlineSnapshot(`
        [
          [
            "Running Checks:",
          ],
          [
            "   ✔  0x078B932B0d1e56554974A431B8B33973D94E002b is security council address ",
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
            "txHash: 0xe7cae35fa46e12f845afe1d7f874d25a00f3594bb9df9adafc78f18d400c09ac",
          ],
        ]
      `)
      expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
    })
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
})
