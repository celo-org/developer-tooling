import { Address } from '@celo/base/lib/address';
import { KeybaseClaim } from './claim';
import { AccountMetadataSignerGetters } from './types';
export declare const keybaseFilePathToProof = ".well-known/celo/";
export declare const proofFileName: (address: Address) => string;
export declare const targetURL: (username: string, address: Address) => string;
/**
 *
 * @remarks
 * If verification encounters an error, returns the error message as a string
 * otherwise returns undefined when successful
 *
 * @param accountsInfoGetters
 * @param claim
 * @param signer
 * @returns a human readable string with claims (non)verifiability or undefined
 */
export declare function verifyKeybaseClaim(accountsInfoGetters: AccountMetadataSignerGetters, claim: KeybaseClaim, signer: Address): Promise<string | undefined>;
export declare const createKeybaseClaim: (username: string) => KeybaseClaim;
