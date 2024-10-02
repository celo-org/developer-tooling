import * as t from 'io-ts';
import { AccountClaim } from './account';
import { ClaimTypes } from './types';
export declare const KeybaseClaimType: t.TypeC<{
    type: t.LiteralC<ClaimTypes.KEYBASE>;
    timestamp: t.NumberC;
    username: t.StringC;
}>;
export type KeybaseClaim = t.TypeOf<typeof KeybaseClaimType>;
declare const DomainClaimType: t.TypeC<{
    type: t.LiteralC<ClaimTypes.DOMAIN>;
    timestamp: t.NumberC;
    domain: t.StringC;
}>;
declare const NameClaimType: t.TypeC<{
    type: t.LiteralC<ClaimTypes.NAME>;
    timestamp: t.NumberC;
    name: t.StringC;
}>;
declare const StorageClaimType: t.TypeC<{
    type: t.LiteralC<ClaimTypes.STORAGE>;
    timestamp: t.NumberC;
    address: t.StringC;
    filteredDataPaths: t.StringC;
}>;
export declare const ClaimType: t.UnionC<[t.Type<{
    type: ClaimTypes.ACCOUNT;
    timestamp: number;
    address: string;
    publicKey: string | undefined;
}, any, unknown>, t.TypeC<{
    type: t.LiteralC<ClaimTypes.DOMAIN>;
    timestamp: t.NumberC;
    domain: t.StringC;
}>, t.TypeC<{
    type: t.LiteralC<ClaimTypes.KEYBASE>;
    timestamp: t.NumberC;
    username: t.StringC;
}>, t.TypeC<{
    type: t.LiteralC<ClaimTypes.NAME>;
    timestamp: t.NumberC;
    name: t.StringC;
}>, t.TypeC<{
    type: t.LiteralC<ClaimTypes.STORAGE>;
    timestamp: t.NumberC;
    address: t.StringC;
    filteredDataPaths: t.StringC;
}>]>;
export declare const SignedClaimType: t.TypeC<{
    claim: t.UnionC<[t.Type<{
        type: ClaimTypes.ACCOUNT;
        timestamp: number;
        address: string;
        publicKey: string | undefined;
    }, any, unknown>, t.TypeC<{
        type: t.LiteralC<ClaimTypes.DOMAIN>;
        timestamp: t.NumberC;
        domain: t.StringC;
    }>, t.TypeC<{
        type: t.LiteralC<ClaimTypes.KEYBASE>;
        timestamp: t.NumberC;
        username: t.StringC;
    }>, t.TypeC<{
        type: t.LiteralC<ClaimTypes.NAME>;
        timestamp: t.NumberC;
        name: t.StringC;
    }>, t.TypeC<{
        type: t.LiteralC<ClaimTypes.STORAGE>;
        timestamp: t.NumberC;
        address: t.StringC;
        filteredDataPaths: t.StringC;
    }>]>;
    signature: t.StringC;
}>;
export declare const DOMAIN_TXT_HEADER = "celo-site-verification";
export type DomainClaim = t.TypeOf<typeof DomainClaimType>;
export type NameClaim = t.TypeOf<typeof NameClaimType>;
export type StorageClaim = t.TypeOf<typeof StorageClaimType>;
export type Claim = DomainClaim | KeybaseClaim | NameClaim | AccountClaim | StorageClaim;
export type ClaimPayload<K extends ClaimTypes> = K extends typeof ClaimTypes.DOMAIN ? DomainClaim : K extends typeof ClaimTypes.NAME ? NameClaim : K extends typeof ClaimTypes.KEYBASE ? KeybaseClaim : K extends typeof ClaimTypes.ACCOUNT ? AccountClaim : StorageClaim;
/** @internal */
export declare const isOfType: <K extends ClaimTypes>(type: K) => (data: Claim) => data is ClaimPayload<K>;
export declare function hashOfClaim(claim: Claim): string;
export declare function hashOfClaims(claims: Claim[]): string;
export declare function serializeClaim(claim: Claim): string;
export declare const createNameClaim: (name: string) => NameClaim;
export declare const createDomainClaim: (domain: string) => DomainClaim;
export declare const createStorageClaim: (storageURL: string) => StorageClaim;
export {};
