import { createViemTxObject } from '@celo/connect'
import { iCeloVersionedContractABI, proxyABI } from '@celo/abis'
import { concurrentMap } from '@celo/base'
import { CeloContract } from '@celo/contractkit'
import { ux } from '@oclif/core'

import { BaseCommand } from '../../base'
import { ViewCommmandFlags } from '../../utils/flags'

const UNVERSIONED_CONTRACTS = [
  CeloContract.Registry,
  CeloContract.Freezer,
  CeloContract.StableToken,
  CeloContract.StableTokenBRL,
  CeloContract.StableTokenEUR,
]
const UNPROXIED_CONTRACTS: CeloContract[] = []

export default class Contracts extends BaseCommand {
  static description = 'Lists Celo core contracts and their addresses.'

  static flags = {
    ...ViewCommmandFlags,
    ...(ux.table.flags() as object),
  }

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(Contracts)

    const addressMapping = await kit.registry.addressMapping()
    const contractInfo = await concurrentMap(
      6,
      Array.from(addressMapping.entries()),
      async ([contract, proxy]) => {
        // skip implementation check for known unproxied contracts
        let implementation: string
        if (UNPROXIED_CONTRACTS.includes(contract)) {
          implementation = 'NONE'
        } else {
          try {
            const proxyContract = kit.connection.getCeloContract(proxyABI as any, proxy)
            implementation = await createViemTxObject<string>(
              kit.connection,
              proxyContract,
              '_getImplementation',
              []
            ).call()
          } catch (e) {
            // if we fail to get implementation that means it doesnt have one so set it to NONE
            implementation = 'NONE'
          }
        }
        // skip version check for unversioned contracts (unproxied contracts are by definition unversioned))
        let version: string
        if (UNVERSIONED_CONTRACTS.includes(contract) || implementation === 'NONE') {
          version = 'NONE'
        } else {
          try {
            const versionContract = kit.connection.getCeloContract(
              iCeloVersionedContractABI as any,
              implementation
            )
            const raw = await createViemTxObject<any>(
              kit.connection,
              versionContract,
              'getVersionNumber',
              []
            ).call()
            version = `${raw[0]}.${raw[1]}.${raw[2]}.${raw[3]}`
          } catch (e) {
            console.warn(`Failed to get version for ${contract} at ${proxy}`)
            version = contract === CeloContract.GovernanceSlasher ? '1.1.1.0' : 'UNKNOWN'
          }
        }

        const balances = await kit.celoTokens.balancesOf(proxy)
        return {
          contract,
          proxy,
          implementation,
          version,
          balances,
        }
      }
    )

    ux.table(
      contractInfo,
      {
        contract: { get: (i) => i.contract },
        proxy: { get: (i) => i.proxy },
        implementation: { get: (i) => i.implementation },
        version: {
          get: (i) => i.version,
        },
      },
      { sort: 'contract', ...res.flags }
    )
  }
}
