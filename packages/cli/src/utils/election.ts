import { Address, BlockHeader } from '@celo/connect'
import { ContractKit } from '@celo/contractkit'
import { ElectionWrapper } from '@celo/contractkit/lib/wrappers/Election'
import { EpochManagerWrapper } from '@celo/contractkit/lib/wrappers/EpochManager'
import { eqAddress } from '@celo/utils/lib/address'
import { bitIsSet, parseBlockExtraData } from '@celo/utils/lib/istanbul'

/**
 * Cache to efficiently retreive the elected validators for many blocks within an epoch.
 */
export class ElectionResultsCache {
  private readonly cache = new Map()

  constructor(
    private readonly kit: ContractKit,
    private readonly isCel2: boolean,
    private readonly electionWrapper: ElectionWrapper,
    private readonly epochManagerWrapper?: EpochManagerWrapper
  ) {
    if (isCel2 && !epochManagerWrapper) {
      throw new Error('EpochManagerWrapper is required for L2')
    }
  }

  /**
   * Returns the list of elected signers for a given block.
   * @param blockNumber The block number to get elected signers for.
   */
  async electedSigners(blockNumber: number): Promise<Address[]> {
    const epoch = await this.kit.getEpochNumberOfBlock(blockNumber)
    const cached = this.cache.get(epoch)
    if (cached) {
      return cached
    }

    const electedSigners = this.isCel2
      ? await this.epochManagerWrapper!.getElectedSigners()
      : await this.electionWrapper.getValidatorSigners(
          // For the first epoch, the contract might be unavailable
          epoch === 1 ? blockNumber : await this.kit.getFirstBlockNumberForEpoch(epoch)
        )

    this.cache.set(epoch, electedSigners)
    return electedSigners
  }

  /**
   * Returns true if the given signer is elected at the given block number.
   * @param signer Validator signer address to check if elected.
   * @param blockNumber The block number to check the election status at.
   */
  async elected(signer: Address, blockNumber: number): Promise<boolean> {
    const electedSigners = await this.electedSigners(blockNumber)
    return electedSigners.some(eqAddress.bind(null, signer))
  }

  /**
   * Returns true if the given signer is present in the parent aggregated seal of the given block.
   * @param signer Validator signer address to check if present in the block.
   * @param block The block to check for a signature on.
   */
  async signedParent(signer: Address, block: BlockHeader): Promise<boolean> {
    const electedSigners = await this.electedSigners(block.number)
    const signerIndex = electedSigners.map(eqAddress.bind(null, signer)).indexOf(true)
    if (signerIndex < 0) {
      return false
    }
    const bitmap = parseBlockExtraData(block.extraData).parentAggregatedSeal.bitmap
    return bitIsSet(bitmap, signerIndex)
  }
}
