import { ux } from '@oclif/core'

import { iCeloVersionedContractABI, proxyABI } from '@celo/abis'
import { concurrentMap, NULL_ADDRESS, StrongAddress } from '@celo/base'
import { CeloCommand } from '../../celo'
import { CeloContract, RegisteredContracts } from '../../packages-to-be/contracts'
import { ViemCommand } from '../../viem'

const UNVERSIONED_CONTRACTS = [
  CeloContract.Registry,
  CeloContract.FeeCurrencyWhitelist,
  CeloContract.Freezer,
  CeloContract.StableToken,
  CeloContract.StableTokenBRL,
  CeloContract.StableTokenEUR,
]
const UNPROXIED_CONTRACTS: CeloContract[] = []

export default class Contracts extends ViemCommand {
  static description = 'Lists Celo core contracts and their addresses.'

  static flags = {
    ...CeloCommand.flags,
    ...(ux.table.flags() as object),
  }

  async run() {
    const res = await this.parse(Contracts)
    const client = await this.getPublicClient()
    const addressResolver = await this.getAddressResolver()

    const allContractsAddresses: [CeloContract, StrongAddress][] = await Promise.all(
      RegisteredContracts.map(async (contractName) => {
        try {
          const contractAddress = await addressResolver.resolve(contractName)

          return [contractName, contractAddress as StrongAddress]
        } catch (err) {
          return [contractName, NULL_ADDRESS as StrongAddress]
        }
      })
    )
    const addressMapping = allContractsAddresses.filter(([_, address]) => address !== NULL_ADDRESS)
    const contractInfo = await concurrentMap(6, addressMapping, async ([contractName, proxy]) => {
      // skip implementation check for known unproxied contracts
      let implementation: string
      if (UNPROXIED_CONTRACTS.includes(contractName)) {
        implementation = 'NONE'
      } else {
        try {
          implementation = await client.readContract({
            address: proxy,
            abi: proxyABI,
            functionName: '_getImplementation',
          })
        } catch (e) {
          // if we fail to get implementation that means it doesnt have one so set it to NONE
          implementation = 'NONE'
        }
      }
      // skip version check for unversioned contracts (unproxied contracts are by definition unversioned))
      let version: string
      if (UNVERSIONED_CONTRACTS.includes(contractName) || implementation === 'NONE') {
        version = 'NONE'
      } else {
        const raw = await client.readContract({
          address: proxy,
          abi: iCeloVersionedContractABI,
          functionName: 'getVersionNumber',
        })

        version = `${raw[0]}.${raw[1]}.${raw[2]}.${raw[3]}`
      }

      return {
        contractName,
        proxy,
        implementation,
        version,
      }
    })

    ux.table(
      contractInfo,
      {
        contract: { get: (i) => i.contractName },
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
