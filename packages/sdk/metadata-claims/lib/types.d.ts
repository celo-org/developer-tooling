import * as t from 'io-ts';
import type { Address, StrongAddress } from '@celo/base/lib/address';
export declare const SignatureType: t.StringC;
export declare const TimestampType: t.NumberC;
/** @internal */
export declare const now: () => number;
export declare enum ClaimTypes {
    ACCOUNT = "ACCOUNT",
    DOMAIN = "DOMAIN",
    KEYBASE = "KEYBASE",
    NAME = "NAME",
    PROFILE_PICTURE = "PROFILE_PICTURE",
    STORAGE = "STORAGE",
    TWITTER = "TWITTER"
}
export declare const VERIFIABLE_CLAIM_TYPES: ClaimTypes[];
export declare const SINGULAR_CLAIM_TYPES: ClaimTypes[];
export type AccountSignerGetters = {
    isAccount: (address: Address) => Promise<boolean>;
    getVoteSigner: (address: Address) => Promise<StrongAddress>;
    getValidatorSigner: (address: Address) => Promise<StrongAddress>;
    getAttestationSigner: (address: Address) => Promise<StrongAddress>;
};
export type AccountMetadataSignerGetters = {
    getMetadataURL: (address: string) => Promise<string>;
} & AccountSignerGetters;
