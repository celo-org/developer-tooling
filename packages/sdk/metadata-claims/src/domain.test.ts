import { NULL_ADDRESS } from '@celo/base'
import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL1 } from '@celo/dev-utils/lib/anvil-test'
import { ACCOUNT_ADDRESSES } from '@celo/dev-utils/lib/ganache-setup'
import { NativeSigner, Signer, verifySignature } from '@celo/utils/lib/signatureUtils'
import { DomainClaim, createDomainClaim, serializeClaim } from './claim'
import { IdentityMetadataWrapper } from './metadata'
import type { AccountMetadataSignerGetters } from './types'
import { verifyDomainRecord } from './verify'

testWithAnvilL1('Domain claims', (web3) => {
  const kit = newKitFromWeb3(web3)

  const address = ACCOUNT_ADDRESSES[0]
  const secondAddress = ACCOUNT_ADDRESSES[1]

  it('can make a domain claim', async () => {
    const domain = 'example.com'
    const metadata = IdentityMetadataWrapper.fromEmpty(address)
    await metadata.addClaim(createDomainClaim(domain), NativeSigner(kit.connection.sign, address))
  })

  describe('verifying', () => {
    let claim: DomainClaim
    let metadata: IdentityMetadataWrapper
    let signature: string
    let signatureBase64: string
    let signer: Signer
    const domain = 'example.com'
    const originalFetchFromURLImplementation = IdentityMetadataWrapper.fetchFromURL
    const dnsResolver = (
      _hostname: string,
      callback: (err: any, addresses: string[][]) => void
    ) => {
      setTimeout(() => {
        callback(null, [
          [`header=xxx`],
          [`celo-site-verification=${signatureBase64}`, `header=yyy`],
        ])
      }, 100)
    }
    beforeEach(async () => {
      signer = NativeSigner(kit.connection.sign, address)
      metadata = IdentityMetadataWrapper.fromEmpty(address)
      claim = createDomainClaim(domain)

      await metadata.addClaim(claim, signer)

      IdentityMetadataWrapper.fetchFromURL = () => Promise.resolve(metadata)

      signature = await signer.sign(serializeClaim(claim))
      signatureBase64 = Buffer.from(signature, 'binary').toString('base64')
    })

    afterEach(() => {
      IdentityMetadataWrapper.fetchFromURL = originalFetchFromURLImplementation
    })

    describe('when we have a signature', () => {
      it('indicates that signature is correct', async () => {
        const verifiedSignature = verifySignature(serializeClaim(claim), signature, address)
        expect(verifiedSignature).toBeTruthy()
      })

      it('indicates a fixed signature is correct', async () => {
        const newClaim = createDomainClaim('orco.dev')
        newClaim.timestamp = 1584618795

        const newSignature = await NativeSigner(kit.connection.sign, secondAddress).sign(
          serializeClaim(newClaim)
        )

        const verifiedSignature = verifySignature(
          serializeClaim(newClaim),
          newSignature,
          secondAddress
        )

        expect(verifiedSignature).toBeTruthy()
      })
    })

    describe('when the metadata URL is set', () => {
      let addressInfoGetters: AccountMetadataSignerGetters = {
        isAccount: async (_) => false,
        getVoteSigner: async (_) => NULL_ADDRESS,
        getValidatorSigner: async (_) => NULL_ADDRESS,
        getAttestationSigner: async (_) => NULL_ADDRESS,
        getMetadataURL: async (address) => `https://example.com/${address}.json`,
      }

      beforeEach(async () => {
        const accountsContract = await kit.contracts.getAccounts()
        addressInfoGetters = {
          isAccount: (address) => accountsContract.isAccount(address),
          getMetadataURL: (address) => accountsContract.getMetadataURL(address),
          getVoteSigner: (address) => accountsContract.getVoteSigner(address),
          getValidatorSigner: (address) => accountsContract.getValidatorSigner(address),
          getAttestationSigner: (address) => accountsContract.getAttestationSigner(address),
        }
      })
      it('indicates that the metadata contain the right claim', async () => {
        const output = await verifyDomainRecord(addressInfoGetters, claim, address, dnsResolver)
        expect(output).toBeUndefined()
      })

      it('indicates that the metadata does not contain the proper domain claim', async () => {
        const error = await verifyDomainRecord(addressInfoGetters, claim, address)
        expect(error).toContain('Unable to verify domain claim')
      })
    })
  })
})
