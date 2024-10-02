/// <reference types="node" />
import { AccountClaim } from './account';
import { Claim, DomainClaim } from './claim';
import { AccountMetadataSignerGetters } from './types';
/**
 * Verifies a claim made by an account, i.e. whether a claim can be verified to be correct
 * @param kit AccountMetadataSignerGetters object
 * @param claim The claim to verify
 * @param address The address that is making the claim
 * @returns If valid, returns undefined. If invalid or unable to verify, returns a string with the error
 */
export declare function verifyClaim(accountMeta: AccountMetadataSignerGetters, claim: Claim, address: string, tries?: number): Promise<string | undefined>;
export declare const verifyAccountClaim: (accountMeta: AccountMetadataSignerGetters, claim: AccountClaim, address: string, tries?: number) => Promise<string | undefined>;
type dnsResolverFunction = (hostname: string, callback: (err: NodeJS.ErrnoException, addresses: string[][]) => void) => void;
/**
 * It verifies if a DNS domain includes in the TXT records an entry with name
 * `celo-site-verification` and a valid signature in base64
 */
export declare const verifyDomainRecord: (accountMeta: AccountMetadataSignerGetters, claim: DomainClaim, address: string, dnsResolver?: dnsResolverFunction) => Promise<string | undefined>;
export {};
