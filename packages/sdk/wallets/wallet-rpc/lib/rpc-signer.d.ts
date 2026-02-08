/// <reference types="node" />
import { CeloTx, EncodedTransaction, RpcCaller, Signer } from '@celo/connect';
import { EIP712TypedData } from '@celo/utils/lib/sign-typed-data-utils';
/**
 * Implements the signer interface on top of the JSON-RPC interface.
 * @deprecated https://forum.celo.org/t/deprecation-of-celo-wallet-rpc/8452
 */
export declare class RpcSigner implements Signer {
    protected rpc: RpcCaller;
    protected account: string;
    protected unlockBufferSeconds: number;
    protected unlockTime?: number | undefined;
    protected unlockDuration?: number | undefined;
    /**
     * Construct a new instance of the RPC signer
     *
     * @param rpc RPC caller instance
     * @param account Account address derived from the private key to be called in init
     * @param unlockBufferSeconds Number of seconds to shrink the unlocked duration by to account for
     * latency and timing inconsistencies on the node
     * @param unlockTime Timestamp in seconds when the signer was last unlocked
     * @param unlockDuration Number of seconds that the signer was last unlocked for
     *
     */
    constructor(rpc: RpcCaller, account: string, unlockBufferSeconds?: number, unlockTime?: number | undefined, unlockDuration?: number | undefined);
    init: (privateKey: string, passphrase: string) => Promise<string>;
    signRawTransaction(tx: CeloTx): Promise<EncodedTransaction>;
    signTransaction(): Promise<{
        v: number;
        r: Buffer;
        s: Buffer;
    }>;
    signTypedData(typedData: EIP712TypedData): Promise<{
        v: number;
        r: Buffer;
        s: Buffer;
    }>;
    signPersonalMessage(data: string): Promise<{
        v: number;
        r: Buffer;
        s: Buffer;
    }>;
    getNativeKey: () => string;
    unlock(passphrase: string, duration: number): Promise<boolean>;
    isUnlocked(): boolean;
    private callAndCheckResponse;
    decrypt(ciphertext: Buffer): Promise<Buffer>;
    computeSharedSecret(_publicKey: string): Promise<Buffer>;
}
