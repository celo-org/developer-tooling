import { BasicDataWrapper } from '@celo/identity/lib/offchain-data-wrapper'
import {
  AwsStorageWriter,
  GitStorageWriter,
  GoogleStorageWriter,
  LocalStorageWriter,
} from '@celo/identity/lib/offchain/storage-writers'
import { privateKeyToAddress } from '@celo/utils/lib/address'
import { Flags } from '@oclif/core'
import { BaseCommand } from '../base'
import { parsePath } from './command'

export enum StorageProviders {
  AWS = 'aws',
  GCP = 'gcp',
  git = 'git',
}

export abstract class OffchainDataCommand extends BaseCommand {
  static flags = {
    ...BaseCommand.flags,
    directory: Flags.string({
      parse: parsePath,
      default: async () => '.',
      description: 'To which directory data should be written',
    }),
    provider: Flags.option({
      options: ['git', 'aws', 'gcp'],
      description: 'If the CLI should attempt to push to the cloud',
    })(),
    bucket: Flags.string({
      dependsOn: ['provider'],
      description: 'If using a GCP or AWS storage bucket this parameter is required',
    }),
  }

  // @ts-ignore Can't encode that this is happening in init
  offchainDataWrapper: BasicDataWrapper

  async init() {
    await super.init()

    const {
      flags: { provider, directory, bucket, privateKey },
    } = await this.parse()

    const from = privateKeyToAddress(privateKey)
    // @ts-ignore -- TODO: if identity depends on diff version of ck which has a slightly differnt type this complains
    this.offchainDataWrapper = new BasicDataWrapper(from, await this.getKit())

    this.offchainDataWrapper.storageWriter =
      provider === StorageProviders.GCP
        ? new GoogleStorageWriter(directory, bucket)
        : provider === StorageProviders.AWS
        ? new AwsStorageWriter(directory, bucket)
        : provider === StorageProviders.git
        ? new GitStorageWriter(directory)
        : new LocalStorageWriter(directory)
  }
}

export const DEPRECATION_NOTICE =
  'offchain-read and offchain-write commands are deprecated as CIP8 was abandonded. They will be remove next major release.'
