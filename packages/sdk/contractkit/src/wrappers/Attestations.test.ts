import { newAttestations } from '@celo/abis/web3/Attestations'
import { StrongAddress } from '@celo/base'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { deployAttestationsContract } from '@celo/dev-utils/contracts'
import { getIdentifierHash, IdentifierPrefix } from '@celo/odis-identifiers'
import { newKitFromWeb3 } from '../kit'
import { AttestationsWrapper } from './Attestations'

testWithAnvilL2('AttestationsWrapper', (web3) => {
  const PHONE_NUMBER = '+15555555555'
  const IDENTIFIER = getIdentifierHash(
    web3.utils.sha3,
    PHONE_NUMBER,
    IdentifierPrefix.PHONE_NUMBER,
    'pepper'
  )

  const kit = newKitFromWeb3(web3)
  let accounts: StrongAddress[] = []
  let attestations: AttestationsWrapper

  beforeAll(async () => {
    accounts = (await web3.eth.getAccounts()) as StrongAddress[]
    kit.defaultAccount = accounts[0]

    const attestationsContractAddress = await deployAttestationsContract(web3, accounts[0])

    attestations = new AttestationsWrapper(
      kit.connection,
      newAttestations(web3, attestationsContractAddress),
      newKitFromWeb3(web3).contracts
    )
  })

  describe('Verification with default values', () => {
    it('No completions returns false', async () => {
      jest
        .spyOn<any, any>(attestations, 'getAttestationStat')
        .mockReturnValue({ completed: 0, total: 3 })

      const result = await attestations.getVerifiedStatus(IDENTIFIER, accounts[0])
      expect(result.isVerified).toBeFalsy()
      expect(result.numAttestationsRemaining).toBe(3)
    })
    it('Not enough completions returns false', async () => {
      jest
        .spyOn<any, any>(attestations, 'getAttestationStat')
        .mockReturnValue({ completed: 2, total: 6 })

      const result = await attestations.getVerifiedStatus(IDENTIFIER, accounts[0])
      expect(result.isVerified).toBeFalsy()
      expect(result.numAttestationsRemaining).toBe(1)
    })
    it('Fraction too low returns false', async () => {
      jest
        .spyOn<any, any>(attestations, 'getAttestationStat')
        .mockReturnValue({ completed: 3, total: 30 })

      const result = await attestations.getVerifiedStatus(IDENTIFIER, accounts[0])
      expect(result.isVerified).toBeFalsy()
    })
    it('Fraction pass threshold returns true', async () => {
      jest
        .spyOn<any, any>(attestations, 'getAttestationStat')
        .mockReturnValue({ completed: 3, total: 9 })

      const result = await attestations.getVerifiedStatus(IDENTIFIER, accounts[0])
      expect(result.isVerified).toBeTruthy()
    })
  })
})
