import { Connection } from '@celo/connect'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { AddressRegistry } from './address-registry'
import { AllContracts } from './index'
import { ContractCache } from './contract-factory-cache'

testWithAnvilL2('client-contract-cache', (client) => {
  function newContractCache() {
    const connection = new Connection(client)
    const registry = new AddressRegistry(connection)
    const AnyContractAddress = '0xe832065fb5117dbddcb566ff7dc4340999583e38'
    jest.spyOn(registry, 'addressFor').mockResolvedValue(AnyContractAddress)
    return new ContractCache(registry)
  }

  describe('getContract()', () => {
    const contractCache = newContractCache()

    for (const contractName of AllContracts) {
      test(`SBAT get ${contractName}`, async () => {
        const contract = await contractCache.getContract(contractName)
        expect(contract).not.toBeNull()
        expect(contract).toBeDefined()
      })
    }
  })
  test('should cache contracts', async () => {
    const contractCache = newContractCache()
    for (const contractName of AllContracts) {
      const contract = await contractCache.getContract(contractName)
      const contractBis = await contractCache.getContract(contractName)
      expect(contract).toBe(contractBis)
    }
  })
  describe('getLockedCelo()', () => {
    it('returns the LockedCelo contract', async () => {
      const contractCache = newContractCache()
      const contract = await contractCache.getLockedCelo()
      expect(contract).not.toBeNull()
      expect(contract).toBeDefined()
      expect
    })
  })
  describe('getCeloToken()', () => {
    it('returns the CELO token contract', async () => {
      const contractCache = newContractCache()
      const contract = await contractCache.getCeloToken()
      expect(contract).not.toBeNull()
      expect(contract).toBeDefined()
    })
  })
})
