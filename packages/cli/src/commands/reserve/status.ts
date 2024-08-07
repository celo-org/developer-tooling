import { BaseCommand } from '../../base'
import { printValueMapRecursive } from '../../utils/cli'

/**
 * @deprecated https://forum.celo.org/t/sunset-of-reserve-commands/8454
 */
export default class ReserveStatus extends BaseCommand {
  static description = 'Shows information about reserve'

  static flags = {
    ...BaseCommand.flags,
  }

  static examples = ['status']

  async run() {
    const kit = await this.getKit()
    const reserve = await kit.contracts.getReserve()
    const data = {
      'Reserve address': reserve.address,
      Spenders: await reserve.getSpenders(),
      'Other reserves': await reserve.getOtherReserveAddresses(),
      Frozen: await reserve.frozenReserveGoldStartBalance(),
      'Gold balance': await reserve.getReserveGoldBalance(),
    }
    printValueMapRecursive(data)
  }
}
