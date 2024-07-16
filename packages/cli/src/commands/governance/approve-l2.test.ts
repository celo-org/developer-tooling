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

        // setSecurityCouncil to 0x1B46C60e8B3B427d91d35df22FCfc3FF36407f35 (multisig address)
        await (
          await kit.sendTransaction({
            to: governance.address,
            from: DEFAULT_OWNER_ADDRESS,
            data: '0x1c1083e20000000000000000000000001b46c60e8b3b427d91d35df22fcfc3ff36407f35',
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
            "   ✔  0x1B46C60e8B3B427d91d35df22FCfc3FF36407f35 is security council address ",
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
            "   ✔  0x1B46C60e8B3B427d91d35df22FCfc3FF36407f35 is approver address ",
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
            "txHash: 0xd2de9b8011c6f68c9d6bed06a7a5846ce66af5ff8c58df62fc315729cdb36e64",
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
            "txHash: 0xe7a13efbda7de481ba50e1cd4a546cb4d50dc3cc68112b10d8ec61b0bc76b611",
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

        // setSecurityCouncil to 0x1B46C60e8B3B427d91d35df22FCfc3FF36407f35 (multisig address)
        await (
          await kit.sendTransaction({
            to: governance.address,
            from: DEFAULT_OWNER_ADDRESS,
            // cast calldata "setSecurityCouncil(address)" "0x1B46C60e8B3B427d91d35df22FCfc3FF36407f35"
            data: '0x1c1083e20000000000000000000000001b46c60e8b3b427d91d35df22fcfc3ff36407f35',
          })
        ).waitReceipt()
      })

      // Sanity checks
      expect(await governance.getApprover()).toBe(accounts[0])
      expect(await governance.getSecurityCouncil()).toBe(
        '0x1B46C60e8B3B427d91d35df22FCfc3FF36407f35'
      )

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
            "   ✔  0x1B46C60e8B3B427d91d35df22FCfc3FF36407f35 is security council address ",
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
            "txHash: 0xe6be4acedda0456a98ee7169bdb684cc690f631527708d92d5a6fb8b22f5a790",
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
            "   ✔  0x1B46C60e8B3B427d91d35df22FCfc3FF36407f35 is approver address ",
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
            "txHash: 0xc1c812085a0d6a5e06eb3a395ff836f48b095b73308df4beaeffb7ff6f6d1d90",
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

      await withImpersonatedAccount(web3, DEFAULT_OWNER_ADDRESS, async () => {
        // setApprover to 0x5409ED021D9299bf6814279A6A1411A7e866A631 to avoid "Council cannot be approver" error
        await (
          await kit.sendTransaction({
            to: governance.address,
            from: DEFAULT_OWNER_ADDRESS,
            data: '0x3156560e0000000000000000000000005409ed021d9299bf6814279a6a1411a7e866a631',
          })
        ).waitReceipt()

        // setSecurityCouncil to 0x1B46C60e8B3B427d91d35df22FCfc3FF36407f35 (multisig address)
        await (
          await kit.sendTransaction({
            to: governance.address,
            from: DEFAULT_OWNER_ADDRESS,
            data: '0x1c1083e20000000000000000000000001b46c60e8b3b427d91d35df22fcfc3ff36407f35',
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
            "   ✔  0x1B46C60e8B3B427d91d35df22FCfc3FF36407f35 is security council address ",
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
            "txHash: 0x103992a3f7c7364900215b66510f2b95a2468f699d73d7c65819d274084df0f4",
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
