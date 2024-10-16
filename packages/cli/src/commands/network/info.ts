import { blockchainParametersABI } from '@celo/abis'
import { epochManagerABI } from '@celo/abis-12'
import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { CeloContract } from '../../packages-to-be/contracts'
import {
  calculateEpochNumberOfBlock,
  calculateFirstBlockNumberForEpoch,
  calculateLastBlockNumberForEpoch,
} from '../../packages-to-be/epochs'
import { printValueMapRecursive } from '../../utils/cli'
import { ViemCommand } from '../../viem'

export default class Info extends ViemCommand {
  static description = 'View general network information such as the current block number'

  static flags = {
    ...BaseCommand.flags,
    lastN: Flags.integer({
      // We cannot use char: 'n' here because it conflicts with the node flag
      description: 'Fetch info about the last n epochs',
      required: false,
      default: 1,
    }),
  }

  async run() {
    const res = await this.parse(Info)
    const isL2 = await this.isCel2()

    const client = await this.getPublicClient()
    const addressResolver = await this.getAddressResolver()

    let latestEpochNumber: bigint
    let epochSize: bigint

    const blockNumber = await client.getBlockNumber()

    if (isL2) {
      const epochManagerContractAddress = await addressResolver.resolve(CeloContract.EpochManager)

      latestEpochNumber = await client.readContract({
        abi: epochManagerABI,
        functionName: 'getCurrentEpochNumber',
        address: epochManagerContractAddress,
      })

      epochSize = await client.readContract({
        abi: epochManagerABI,
        functionName: 'epochDuration',
        address: epochManagerContractAddress,
      })
    } else {
      const blockchainParametersContractAddress = await addressResolver.resolve(
        CeloContract.BlockchainParameters
      )

      epochSize = await client.readContract({
        abi: blockchainParametersABI,
        functionName: 'getEpochSize',
        address: blockchainParametersContractAddress,
      })
      latestEpochNumber = calculateEpochNumberOfBlock(blockNumber, epochSize)
    }

    const fetchEpochInfo = async (epochNumber: bigint) => {
      if (isL2) {
        const epochManagerContractAddress = await addressResolver.resolve(CeloContract.EpochManager)

        const epochData: Record<string, bigint> = {
          number: epochNumber,
          start: await client.readContract({
            abi: epochManagerABI,
            functionName: 'getFirstBlockAtEpoch',
            address: epochManagerContractAddress,
            args: [epochNumber],
          }),
        }

        // for L2 we cannot fetch the end block of the current epoch
        if (epochNumber < latestEpochNumber) {
          epochData.end = await client.readContract({
            abi: epochManagerABI,
            functionName: 'getLastBlockAtEpoch',
            address: epochManagerContractAddress,
            args: [epochNumber],
          })
        }

        return epochData
      }

      return {
        number: epochNumber,
        start: calculateFirstBlockNumberForEpoch(epochNumber, epochSize),
        end: calculateLastBlockNumberForEpoch(epochNumber, epochSize),
      }
    }

    const n = res.flags.lastN
    const minEpoch = isL2
      ? await client.readContract({
          abi: epochManagerABI,
          functionName: 'firstKnownEpoch',
          address: await addressResolver.resolve('EpochManager'),
        })
      : 1
    const epochs = []
    for (let i = latestEpochNumber; i > latestEpochNumber - BigInt(n) && i >= minEpoch; i--) {
      epochs.push(await fetchEpochInfo(i))
    }

    printValueMapRecursive({
      blockNumber,
      epochs: epochs.length === 1 ? epochs[0] : epochs,
      ...(isL2 && { epochDuration: Number(epochSize) }),
      ...(!isL2 && { epochSize }),
    })
  }
}
