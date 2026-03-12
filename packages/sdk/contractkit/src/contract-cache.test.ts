import { Connection } from '@celo/connect'
import { getProviderForKit } from './setupForKits'
import { CeloContract } from '.'
import { AddressRegistry } from './address-registry'
import { ValidWrappers, WrapperCache } from './contract-cache'
import { ContractCache } from './contract-factory-cache'
import * as crypto from 'crypto'

const TestedWrappers: ValidWrappers[] = [
  CeloContract.GoldToken,
  CeloContract.StableToken,
  CeloContract.StableTokenEUR,
  CeloContract.Validators,
  CeloContract.LockedCelo,
]

function createMockProvider() {
  return getProviderForKit('http://localhost:8545')
}

function newWrapperCache() {
  const provider = createMockProvider()
  const connection = new Connection(provider)
  const registry = new AddressRegistry(connection)
  const nativeContractCache = new ContractCache(registry)
  const AnyContractAddress = '0xe832065fb5117dbddcb566ff7dc4340999583e38'
  jest.spyOn(registry, 'addressFor').mockResolvedValue(AnyContractAddress)
  const contractCache = new WrapperCache(connection, nativeContractCache, registry)
  return contractCache
}

describe('getContract()', () => {
  const contractCache = newWrapperCache()

  for (const contractName of TestedWrappers) {
    test(`SBAT get ${contractName}`, async () => {
      const contract = await contractCache.getContract(contractName)
      expect(contract).not.toBeNull()
      expect(contract).toBeDefined()
    })
  }

  test('should create a new instance when an address is provided', async () => {
    const address1 = '0x' + crypto.randomBytes(20).toString('hex')
    const address2 = '0x' + crypto.randomBytes(20).toString('hex')
    const contract1 = await contractCache.getContract(CeloContract.MultiSig, address1)
    const contract2 = await contractCache.getContract(CeloContract.MultiSig, address2)
    expect(contract1?.address).not.toEqual(contract2?.address)
  })
  describe('get contract methods', () => {
    const exclusionList = new Set([
      'StableTokenEUR',
      'StableTokenBRL',
      'Registry',
      'Random',
      'UniswapFeeHandlerSeller',
      'MentoFeeHandlerSeller',
      'GovernanceSlasher',
      'FeeHandler',
      'EpochManagerEnabler',
      'CeloUnreleasedTreasury',
      'ERC20',
    ])
    const eligibleMethods = Object.values(CeloContract).filter((name) => !exclusionList.has(name))
    for (const contractName of eligibleMethods) {
      const method = `get${contractName}`
      it(`has a method ${method}`, async () => {
        // @ts-ignore
        expect(contractCache[method]).toBeDefined()
        // @ts-ignore
        expect(typeof contractCache[method]).toBe('function')
        // @ts-ignore
        expect(contractCache[method]()).resolves.toBeDefined()
      })
    }
  })
})

test('should cache contracts', async () => {
  const contractCache = newWrapperCache()
  for (const contractName of TestedWrappers) {
    const contract = await contractCache.getContract(contractName)
    const contractBis = await contractCache.getContract(contractName)
    expect(contract).toBe(contractBis)
  }
})
