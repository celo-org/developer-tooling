import { Address } from '@celo/base/lib/address';
import { Signer } from '@celo/base/lib/signatureUtils';
import * as t from 'io-ts';
import { Claim, ClaimPayload } from './claim';
import { AccountMetadataSignerGetters, ClaimTypes } from './types';
export { ClaimTypes } from './types';
type KitOrAccountsWrapper = AccountMetadataSignerGetters;
export declare const IdentityMetadataType: t.TypeC<{
    claims: t.ArrayC<t.UnionC<[t.Type<{
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
    }>]>>;
    meta: t.TypeC<{
        address: t.Type<string, string, unknown>;
        signature: t.StringC;
    }>;
}>;
export type IdentityMetadata = t.TypeOf<typeof IdentityMetadataType>;
export declare class IdentityMetadataWrapper {
    data: IdentityMetadata;
    static fromEmpty(address: Address): IdentityMetadataWrapper;
    static fetchFromURL(contractKitOrAccountsWrapper: KitOrAccountsWrapper, url: string, tries?: number): Promise<IdentityMetadataWrapper>;
    static fromFile(contractKitOrAccountsWrapper: KitOrAccountsWrapper, path: string): Promise<IdentityMetadataWrapper>;
    static verifySigner(contractKitOrAccountsWrapper: KitOrAccountsWrapper, hash: any, signature: any, metadata: any): Promise<boolean>;
    static verifySignerForAddress(contractKitOrAccountsWrapper: KitOrAccountsWrapper, hash: any, signature: any, address: Address): Promise<boolean>;
    static fromRawString(contractKitOrAccountsWrapper: KitOrAccountsWrapper, rawData: string): Promise<IdentityMetadataWrapper>;
    constructor(data: IdentityMetadata);
    get claims(): ({
        type: ClaimTypes.ACCOUNT;
        timestamp: number;
        address: string;
        publicKey: string | undefined;
    } | {
        type: ClaimTypes.KEYBASE;
        timestamp: number;
        username: string;
    } | {
        type: ClaimTypes.DOMAIN;
        timestamp: number;
        domain: string;
    } | {
        type: ClaimTypes.NAME;
        timestamp: number;
        name: string;
    } | {
        type: ClaimTypes.STORAGE;
        timestamp: number;
        address: string;
        filteredDataPaths: string;
    })[];
    hashOfClaims(): string;
    toString(): string;
    addClaim(claim: Claim, signer: Signer): Promise<Claim>;
    findClaim<K extends ClaimTypes>(type: K): ClaimPayload<K> | undefined;
    filterClaims<K extends ClaimTypes>(type: K): ClaimPayload<K>[];
}
