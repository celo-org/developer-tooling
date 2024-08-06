/* eslint max-classes-per-file:off */
import { registryABI } from '@celo/abis-12'
import { NULL_ADDRESS, StrongAddress } from '@celo/base/lib/address'
import { Connection } from '@celo/connect'
import debugFactory from 'debug'
import { Contract } from 'web3'
import { CeloContract, RegisteredContracts, stripProxy } from './base'

const debug = debugFactory('kit:registry')

// Registry contract is always predeployed to this address
export const REGISTRY_CONTRACT_ADDRESS = '0x000000000000000000000000000000000000ce10'

export class UnregisteredError extends Error {
  constructor(contract: CeloContract) {
    super(`${contract} not (yet) registered`)
  }
}

/**
 * Celo Core Contract's Address Registry
 *
 * @param connection – an instance of @celo/connect {@link Connection}
 */
export class AddressRegistry {
  private readonly registry: Contract<typeof registryABI>
  private readonly cache: Map<CeloContract, StrongAddress> = new Map()

  constructor(readonly connection: Connection) {
    this.cache.set(CeloContract.Registry, REGISTRY_CONTRACT_ADDRESS)
    this.registry = new Contract(registryABI, REGISTRY_CONTRACT_ADDRESS, connection.web3)
  }

  /**
   * Get the address for a `CeloContract`
   */
  async addressFor(contract: CeloContract): Promise<StrongAddress> {
    if (!this.cache.has(contract)) {
      debug('Fetching address from Registry for %s', contract)
      const address = await this.registry.methods.getAddressForString(stripProxy(contract)).call()

      debug('Fetched address %s', address)
      if (!address || address === NULL_ADDRESS) {
        throw new UnregisteredError(contract)
      }
      this.cache.set(contract, address as StrongAddress)
    }
    const cachedAddress = this.cache.get(contract)!
    return cachedAddress
  }

  /**
   * Get the address mapping for known registered contracts
   */
  async addressMapping() {
    await Promise.all(
      RegisteredContracts.map(async (contract) => {
        try {
          await this.addressFor(contract)
        } catch (e) {
          debug(e)
        }
      })
    )
    return this.cache
  }
}
