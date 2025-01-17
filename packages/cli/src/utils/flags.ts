import { Flags } from '@oclif/core'
import { BaseCommand } from '../base'
import { CustomFlags } from './command'

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
  ledgerLiveMode: {
    ...BaseCommand.flags.ledgerLiveMode,
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

export const MultiSigFlags = {
  useMultiSig: Flags.boolean({
    description: 'True means the request will be sent through multisig.',
    exclusive: ['useSafe'],
  }),
  for: CustomFlags.address({
    dependsOn: ['useMultiSig'],
    description: 'Address of the multi-sig contract',
  }),
}

export const SafeFlags = {
  useSafe: Flags.boolean({
    description: 'True means the request will be sent through safe.',
    exclusive: ['useMultiSig'],
  }),
  safeAddress: CustomFlags.address({
    dependsOn: ['useSafe'],
    description: 'Address of the safe.',
  }),
}
