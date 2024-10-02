"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyDomainRecord = exports.verifyAccountClaim = exports.verifyClaim = void 0;
const address_1 = require("@celo/base/lib/address");
const io_1 = require("@celo/base/lib/io");
const node_dns_1 = require("node:dns"); // TODO replace with non node specifc package
const node_util_1 = require("node:util"); // TODO replace with non node specifc package
const claim_1 = require("./claim");
const keybase_1 = require("./keybase");
const metadata_1 = require("./metadata");
const types_1 = require("./types");
/**
 * Verifies a claim made by an account, i.e. whether a claim can be verified to be correct
 * @param kit AccountMetadataSignerGetters object
 * @param claim The claim to verify
 * @param address The address that is making the claim
 * @returns If valid, returns undefined. If invalid or unable to verify, returns a string with the error
 */
function verifyClaim(accountMeta, claim, address, tries = 3) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (claim.type) {
            case types_1.ClaimTypes.KEYBASE:
                return (0, keybase_1.verifyKeybaseClaim)(accountMeta, claim, address);
            case types_1.ClaimTypes.ACCOUNT:
                return (0, exports.verifyAccountClaim)(accountMeta, claim, address, tries);
            case types_1.ClaimTypes.DOMAIN:
                return (0, exports.verifyDomainRecord)(accountMeta, claim, address);
            default:
                break;
        }
        return;
    });
}
exports.verifyClaim = verifyClaim;
const verifyAccountClaim = (accountMeta, claim, address, tries = 3) => __awaiter(void 0, void 0, void 0, function* () {
    const metadataURL = yield accountMeta.getMetadataURL(claim.address);
    if (!(0, io_1.isValidUrl)(metadataURL)) {
        return `Metadata URL of ${claim.address} could not be retrieved`;
    }
    let metadata;
    try {
        metadata = yield metadata_1.IdentityMetadataWrapper.fetchFromURL(accountMeta, metadataURL, tries);
    }
    catch (error) {
        return `Metadata could not be fetched for ${claim.address} at ${metadataURL}: ${error.toString()}`;
    }
    const accountClaims = metadata.filterClaims(types_1.ClaimTypes.ACCOUNT);
    if (accountClaims.find((x) => (0, address_1.eqAddress)(x.address, address)) === undefined) {
        return `${claim.address} did not claim ${address}`;
    }
    return;
});
exports.verifyAccountClaim = verifyAccountClaim;
/**
 * It verifies if a DNS domain includes in the TXT records an entry with name
 * `celo-site-verification` and a valid signature in base64
 */
const verifyDomainRecord = (accountMeta, claim, address, dnsResolver = node_dns_1.resolveTxt) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getRecords = (0, node_util_1.promisify)(dnsResolver);
        const domainRecords = yield getRecords(claim.domain);
        for (const record of domainRecords) {
            for (const entry of record) {
                if (entry.startsWith(claim_1.DOMAIN_TXT_HEADER)) {
                    const signatureBase64 = entry.substring(claim_1.DOMAIN_TXT_HEADER.length + 1);
                    const signature = Buffer.from(signatureBase64, 'base64').toString('binary');
                    if (yield metadata_1.IdentityMetadataWrapper.verifySignerForAddress(accountMeta, (0, claim_1.serializeClaim)(claim), signature, address)) {
                        return;
                    }
                }
            }
        }
        return `Unable to verify domain claim with address ${address}`;
    }
    catch (error) {
        return `Unable to fetch domain TXT records: ${error.toString()}`;
    }
});
exports.verifyDomainRecord = verifyDomainRecord;
//# sourceMappingURL=verify.js.map