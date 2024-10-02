import { CeloTx, Provider, RpcCaller } from '@celo/connect';
import { UnlockableWallet } from '@celo/wallet-base';
import { RemoteWallet } from '@celo/wallet-remote';
import { RpcSigner } from './rpc-signer';
export declare enum RpcWalletErrors {
    FetchAccounts = "RpcWallet: failed to fetch accounts from server",
    AccountAlreadyExists = "RpcWallet: account already exists"
}
/**
 *   WARNING: This class should only be used with well-permissioned providers (ie IPC)
 *   to avoid sensitive user 'privateKey' and 'passphrase' information being exposed
 *
 * @deprecated https://forum.celo.org/t/deprecation-of-celo-wallet-rpc/8452
 */
export declare class RpcWallet extends RemoteWallet<RpcSigner> implements UnlockableWallet {
    protected _provider: Provider;
    protected readonly rpc: RpcCaller;
    constructor(_provider: Provider);
    loadAccountSigners(): Promise<Map<string, RpcSigner>>;
    addAccount(privateKey: string, passphrase: string): Promise<string>;
    unlockAccount(address: string, passphrase: string, duration: number): Promise<boolean>;
    isAccountUnlocked(address: string): boolean;
    /**
     * Gets the signer based on the 'from' field in the tx body
     * @param txParams Transaction to sign
     * @dev overrides WalletBase.signTransaction
     */
    signTransaction(txParams: CeloTx): Promise<import("@celo/connect").EncodedTransaction>;
}
