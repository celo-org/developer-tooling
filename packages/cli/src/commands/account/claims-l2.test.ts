import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import { ClaimTypes, IdentityMetadataWrapper } from '@celo/metadata-claims'
import { now } from '@celo/metadata-claims/lib/types'
import { ux } from '@oclif/core'
import { readFileSync, writeFileSync } from 'fs'
import humanizeDuration from 'humanize-duration'
import { tmpdir } from 'os'
import Web3 from 'web3'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import ClaimAccount from './claim-account'
import ClaimDomain from './claim-domain'
import ClaimName from './claim-name'
import ClaimRpcUrl from './claim-rpc-url'
import CreateMetadata from './create-metadata'
import RegisterMetadata from './register-metadata'
import ShowMetadata from './show-metadata'
process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('account metadata cmds', (web3: Web3) => {
  let account: string
  let accounts: string[]
  let kit: ContractKit

  beforeEach(async () => {
    accounts = await web3.eth.getAccounts()
    kit = newKitFromWeb3(web3)
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
      await testLocallyWithWeb3Node(CreateMetadata, ['--from', account, newFilePath], web3)
      const res = JSON.parse(readFileSync(newFilePath).toString())
      expect(res.meta.address).toEqual(account)
    })

    test('account:claim-name cmd', async () => {
      generateEmptyMetadataFile()
      const name = 'myname'
      await testLocallyWithWeb3Node(
        ClaimName,
        ['--from', account, '--name', name, emptyFilePath],
        web3
      )
      const metadata = await readFile()
      const claim = metadata.findClaim(ClaimTypes.NAME)
      expect(claim).toBeDefined()
      expect(claim!.name).toEqual(name)
    })

    test('account:claim-domain cmd', async () => {
      generateEmptyMetadataFile()
      const domain = 'example.com'
      await testLocallyWithWeb3Node(
        ClaimDomain,
        ['--from', account, '--domain', domain, emptyFilePath],
        web3
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
        testLocallyWithWeb3Node(
          ClaimRpcUrl,
          [emptyFilePath, '--from', account, '--rpcUrl', 'http://127.0.0.1:8545'],
          web3
        )
      ).rejects.toMatchInlineSnapshot(`
        [Error: Parsing --rpcUrl 
        	Provided URL is a localhost address. Please provide a public URL.
        See more help with --help]
      `)

      await testLocallyWithWeb3Node(
        ClaimRpcUrl,
        [emptyFilePath, '--from', account, '--rpcUrl', rpcUrl],
        web3
      )

      const metadata = await readFile()
      const claim = metadata.findClaim(ClaimTypes.RPC_URL)

      expect(claim).toBeDefined()
      expect(claim!.rpcUrl).toEqual(rpcUrl)

      const infoMock = jest.spyOn(console, 'info')
      const writeMock = jest.spyOn(ux.write, 'stdout')

      await testLocallyWithWeb3Node(ShowMetadata, [emptyFilePath, '--csv'], web3)

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
      await testLocallyWithWeb3Node(
        ClaimAccount,
        ['--from', account, '--address', otherAccount, emptyFilePath],
        web3
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
        await accountsInstance.createAccount().sendAndWaitForReceipt({ from: account })
      })

      test('can register metadata', async () => {
        await testLocallyWithWeb3Node(
          RegisterMetadata,
          ['--force', '--from', account, '--url', 'https://example.com'],
          web3
        )
      })

      test('fails if url is missing', async () => {
        await expect(
          testLocallyWithWeb3Node(RegisterMetadata, ['--force', '--from', account], web3)
        ).rejects.toThrow('Missing required flag')
      })
    })

    it('cannot register metadata', async () => {
      await expect(
        testLocallyWithWeb3Node(
          RegisterMetadata,
          ['--force', '--from', account, '--url', 'https://example.com'],
          web3
        )
      ).rejects.toThrow("Some checks didn't pass!")
    })
  })
})
