import { decodeFunctionResult, encodeFunctionData } from 'viem'
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
            const implCallData = encodeFunctionData({
              abi: proxyContract.abi,
              functionName: '_getImplementation',
              args: [],
            })
            const { data: implResultData } = await kit.connection.viemClient.call({
              to: proxyContract.address,
              data: implCallData,
            })
            implementation = decodeFunctionResult({
              abi: proxyContract.abi,
              functionName: '_getImplementation',
              data: implResultData!,
            }) as string
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
            const versionCallData = encodeFunctionData({
              abi: versionContract.abi,
              functionName: 'getVersionNumber',
              args: [],
            })
            const { data: versionResultData } = await kit.connection.viemClient.call({
              to: versionContract.address,
              data: versionCallData,
            })
            const raw = decodeFunctionResult({
              abi: versionContract.abi,
              functionName: 'getVersionNumber',
              data: versionResultData!,
            }) as readonly [unknown, unknown, unknown, unknown]
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
