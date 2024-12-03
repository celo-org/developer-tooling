import { BaseCommand } from '../base'

export const ViewCommmandFlags = {
  ...BaseCommand.flags,
  gasCurrency: {
    ...BaseCommand.flags.gasCurrency,
    hidden: true,
  },
  useLedger: {
    ...BaseCommand.flags.useLedger,
    hidden: true,
  },
  ledgerAddresses: {
    ...BaseCommand.flags.ledgerAddresses,
    hidden: true,
  },
  ledgerCustomAddresses: {
    ...BaseCommand.flags.ledgerCustomAddresses,
    hidden: true,
  },
  privateKey: {
    ...BaseCommand.flags.privateKey,
    hidden: true,
  },
}
