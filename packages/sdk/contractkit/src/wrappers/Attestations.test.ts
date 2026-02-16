import { attestationsABI } from '@celo/abis'
import { StrongAddress } from '@celo/base'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { deployAttestationsContract } from '@celo/dev-utils/contracts'
import { getIdentifierHash, IdentifierPrefix } from '@celo/odis-identifiers'
import { sha3 } from '@celo/utils/lib/solidity'
import { newKitFromProvider } from '../kit'
import { AttestationsWrapper } from './Attestations'

testWithAnvilL2('AttestationsWrapper', (client) => {
  const PHONE_NUMBER = '+15555555555'
  const IDENTIFIER = getIdentifierHash(sha3, PHONE_NUMBER, IdentifierPrefix.PHONE_NUMBER, 'pepper')

  const kit = newKitFromProvider(client.currentProvider)
  let accounts: StrongAddress[] = []
  let attestations: AttestationsWrapper

  beforeAll(async () => {
    accounts = await kit.connection.getAccounts()
    kit.defaultAccount = accounts[0]

    const attestationsContractAddress = await deployAttestationsContract(client, accounts[0])

    attestations = new AttestationsWrapper(
      kit.connection,
      kit.connection.createContract(attestationsABI as any, attestationsContractAddress),
      newKitFromProvider(client.currentProvider).contracts
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
