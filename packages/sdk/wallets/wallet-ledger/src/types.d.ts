import { Hex } from '@celo/connect'

type LedgerSignature = { v: string; r: string; s: string }
export interface ILedger {
  getAddress(
    derivationPath: string,
    forceValidation?: boolean
  ): Promise<{ address?: Hex; derivationPath?: string }>
  signTransaction(derivationPath: string, data: string): Promise<LedgerSignature>
  signPersonalMessage(derivationPath: string, data: string): Promise<LedgerSignature>
  signEIP712HashedMessage(
    derivationPath: string,
    domainSeparator: Buffer,
    structHash: Buffer
  ): Promise<LedgerSignature>
  getAppConfiguration(): Promise<{ arbitraryDataEnabled: number; version: string }>
  provideERC20TokenInformation(TokenInfo): Promise<unknown>
}
