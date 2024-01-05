import { newReleaseGold } from '@celo/abis/web3/ReleaseGold'
import { ReleaseGoldWrapper } from '@celo/contractkit/lib/wrappers/ReleaseGold'
import { BaseCommand } from '../base'
import { CustomFlags } from './command'

export abstract class ReleaseGoldBaseCommand extends BaseCommand {
  static flags = {
    ...BaseCommand.flags,
    contract: CustomFlags.address({
      required: true,
      description: 'Address of the ReleaseGold Contract',
    }),
  }

  private _contractAddress: string | null = null
  private _releaseGoldWrapper: ReleaseGoldWrapper | null = null

  async contractAddress() {
    if (!this._contractAddress) {
      const res = await this.parse()
      this._contractAddress = String(res.flags.contract)
    }
    return this._contractAddress
  }

  get releaseGoldWrapper() {
    if (!this._releaseGoldWrapper) {
      this.error('Error in initilizing release gold wrapper')
    }
    return this._releaseGoldWrapper
  }

  async init() {
    const kit = await this.getKit()
    await super.init()
    if (!this._releaseGoldWrapper) {
      this._releaseGoldWrapper = new ReleaseGoldWrapper(
        kit.connection,
        newReleaseGold(kit.connection.web3, await this.contractAddress()),
        kit.contracts
      )
      // Call arbitrary release gold fn to verify `contractAddress` is a releasegold contract.
      try {
        await this._releaseGoldWrapper.getBeneficiary()
      } catch (err) {
        this.error(`Does the provided address point to release gold contract? ${err}`)
      }
    }
  }
}
