import { Connection } from '@celo/connect'
import Web3 from 'web3'
import { CeloContract } from '.'
import { AddressRegistry } from './address-registry'
import { ValidWrappers, WrapperCache } from './contract-cache'
import { Web3ContractCache } from './web3-contract-cache'

const TestedWrappers: ValidWrappers[] = [
  CeloContract.GoldToken,
  CeloContract.StableToken,
  CeloContract.StableTokenEUR,
  CeloContract.Validators,
  CeloContract.LockedCelo,
]

function newWrapperCache() {
  const web3 = new Web3('http://localhost:8545')
  const connection = new Connection(web3)
  const registry = new AddressRegistry(connection)
  const web3ContractCache = new Web3ContractCache(registry)
  const AnyContractAddress = '0xe832065fb5117dbddcb566ff7dc4340999583e38'
  jest.spyOn(registry, 'addressFor').mockResolvedValue(AnyContractAddress)
  const contractCache = new WrapperCache(connection, web3ContractCache, registry)
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
    const address1 = Web3.utils.randomHex(20)
    const address2 = Web3.utils.randomHex(20)
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
