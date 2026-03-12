import { ContractKit, newKitFromProvider } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { ClaimTypes, IdentityMetadataWrapper } from '@celo/metadata-claims'
import { now } from '@celo/metadata-claims/lib/types'
import { ux } from '@oclif/core'
import { readFileSync, writeFileSync } from 'fs'
import humanizeDuration from 'humanize-duration'
import { tmpdir } from 'os'
import { stripAnsiCodesFromNestedArray, testLocallyWithNode } from '../../test-utils/cliUtils'
import ClaimAccount from './claim-account'
import ClaimDomain from './claim-domain'
import ClaimName from './claim-name'
import ClaimRpcUrl from './claim-rpc-url'
import CreateMetadata from './create-metadata'
import RegisterMetadata from './register-metadata'
import ShowMetadata from './show-metadata'
process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('account metadata cmds', (provider) => {
  let account: string
  let accounts: string[]
  let kit: ContractKit

  beforeEach(async () => {
    kit = newKitFromProvider(provider)
    accounts = await kit.connection.getAccounts()
    account = accounts[0]
  })

  describe('Modifying the metadata file', () => {
    const emptyFilePath = `${tmpdir()}/metadata-l2.json`
    const generateEmptyMetadataFile = () => {
      writeFileSync(emptyFilePath, IdentityMetadataWrapper.fromEmpty(account).toString())
    }

    const readFile = async () => {
      return IdentityMetadataWrapper.fromFile(await kit.contracts.getAccounts(), emptyFilePath)
    }

    test('account:create-metadata cmd', async () => {
      const newFilePath = `${tmpdir()}/newfile.json`
      await testLocallyWithNode(CreateMetadata, ['--from', account, newFilePath], provider)
      const res = JSON.parse(readFileSync(newFilePath).toString())
      expect(res.meta.address).toEqual(account)
    })

    test('account:claim-name cmd', async () => {
      generateEmptyMetadataFile()
      const name = 'myname'
      await testLocallyWithNode(
        ClaimName,
        ['--from', account, '--name', name, emptyFilePath],
        provider
      )
      const metadata = await readFile()
      const claim = metadata.findClaim(ClaimTypes.NAME)
      expect(claim).toBeDefined()
      expect(claim!.name).toEqual(name)
    })

    test('account:claim-domain cmd', async () => {
      generateEmptyMetadataFile()
      const domain = 'example.com'
      await testLocallyWithNode(
        ClaimDomain,
        ['--from', account, '--domain', domain, emptyFilePath],
        provider
      )
      const metadata = await readFile()
      const claim = metadata.findClaim(ClaimTypes.DOMAIN)
      expect(claim).toBeDefined()
      expect(claim!.domain).toEqual(domain)
    })

    test('account:claim-rpc-url cmd', async () => {
      generateEmptyMetadataFile()
      const rpcUrl = 'http://example.com:8545'

      await expect(
        testLocallyWithNode(
          ClaimRpcUrl,
          [emptyFilePath, '--from', account, '--rpcUrl', 'http://127.0.0.1:8545'],
          provider
        )
      ).rejects.toMatchInlineSnapshot(`
        [Error: Parsing --rpcUrl 
        	Provided URL is a localhost address. Please provide a public URL.
        See more help with --help]
      `)

      await testLocallyWithNode(
        ClaimRpcUrl,
        [emptyFilePath, '--from', account, '--rpcUrl', rpcUrl],
        provider
      )

      const metadata = await readFile()
      const claim = metadata.findClaim(ClaimTypes.RPC_URL)

      expect(claim).toBeDefined()
      expect(claim!.rpcUrl).toEqual(rpcUrl)

      const infoMock = jest.spyOn(console, 'info')
      const writeMock = jest.spyOn(ux.write, 'stdout')

      await testLocallyWithNode(ShowMetadata, [emptyFilePath, '--csv'], provider)

      expect(stripAnsiCodesFromNestedArray(infoMock.mock.calls)).toMatchInlineSnapshot(`
        [
          [
            "Metadata at ${emptyFilePath} contains the following claims: 
        ",
          ],
        ]
      `)
      expect(stripAnsiCodesFromNestedArray(writeMock.mock.calls)).toMatchInlineSnapshot(`
        [
          [
            "Type,Value,Status,Created At
        ",
          ],
          [
            "RPC_URL,RPC URL: http://example.com:8545,N/A,${humanizeDuration(
              (now() - claim!.timestamp) * 1000
            )} ago
        ",
          ],
        ]
      `)
    })

    test('account:claim-account cmd', async () => {
      generateEmptyMetadataFile()
      const otherAccount = accounts[1]
      await testLocallyWithNode(
        ClaimAccount,
        ['--from', account, '--address', otherAccount, emptyFilePath],
        provider
      )
      const metadata = await readFile()
      const claim = metadata.findClaim(ClaimTypes.ACCOUNT)
      expect(claim).toBeDefined()
      expect(claim!.address).toEqual(otherAccount)
    })
  })

  describe('account:register-metadata cmd', () => {
    describe('when the account is registered', () => {
      beforeEach(async () => {
        const accountsInstance = await kit.contracts.getAccounts()
        const hash = await accountsInstance.createAccount({ from: account })
        await kit.connection.viemClient.waitForTransactionReceipt({ hash: hash as `0x${string}` })
      })

      test('can register metadata', async () => {
        await testLocallyWithNode(
          RegisterMetadata,
          ['--force', '--from', account, '--url', 'https://example.com'],
          provider
        )
      })

      test('fails if url is missing', async () => {
        await expect(
          testLocallyWithNode(RegisterMetadata, ['--force', '--from', account], provider)
        ).rejects.toThrow('Missing required flag')
      })
    })

    it('cannot register metadata', async () => {
      await expect(
        testLocallyWithNode(
          RegisterMetadata,
          ['--force', '--from', account, '--url', 'https://example.com'],
          provider
        )
      ).rejects.toThrow("Some checks didn't pass!")
    })
  })
})
