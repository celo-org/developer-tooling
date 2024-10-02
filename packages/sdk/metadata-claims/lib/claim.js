"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStorageClaim = exports.createDomainClaim = exports.createNameClaim = exports.serializeClaim = exports.hashOfClaims = exports.hashOfClaim = exports.isOfType = exports.DOMAIN_TXT_HEADER = exports.SignedClaimType = exports.ClaimType = exports.KeybaseClaimType = void 0;
const signatureUtils_1 = require("@celo/utils/lib/signatureUtils");
const t = __importStar(require("io-ts"));
const account_1 = require("./account");
const types_1 = require("./types");
exports.KeybaseClaimType = t.type({
    type: t.literal(types_1.ClaimTypes.KEYBASE),
    timestamp: types_1.TimestampType,
    // TODO: Validate compliant username before just interpolating
    username: t.string,
});
const DomainClaimType = t.type({
    type: t.literal(types_1.ClaimTypes.DOMAIN),
    timestamp: types_1.TimestampType,
    domain: t.string,
});
const NameClaimType = t.type({
    type: t.literal(types_1.ClaimTypes.NAME),
    timestamp: types_1.TimestampType,
    name: t.string,
});
const StorageClaimType = t.type({
    type: t.literal(types_1.ClaimTypes.STORAGE),
    timestamp: types_1.TimestampType,
    address: t.string,
    filteredDataPaths: t.string,
});
exports.ClaimType = t.union([
    account_1.AccountClaimType,
    DomainClaimType,
    exports.KeybaseClaimType,
    NameClaimType,
    StorageClaimType,
]);
exports.SignedClaimType = t.type({
    claim: exports.ClaimType,
    signature: types_1.SignatureType,
});
exports.DOMAIN_TXT_HEADER = 'celo-site-verification';
/** @internal */
const isOfType = (type) => (data) => data.type === type;
exports.isOfType = isOfType;
function hashOfClaim(claim) {
    return (0, signatureUtils_1.hashMessage)(serializeClaim(claim));
}
exports.hashOfClaim = hashOfClaim;
function hashOfClaims(claims) {
    const hashes = claims.map(hashOfClaim);
    return (0, signatureUtils_1.hashMessage)(hashes.join(''));
}
exports.hashOfClaims = hashOfClaims;
function serializeClaim(claim) {
    return JSON.stringify(claim);
}
exports.serializeClaim = serializeClaim;
const createNameClaim = (name) => ({
    name,
    timestamp: (0, types_1.now)(),
    type: types_1.ClaimTypes.NAME,
});
exports.createNameClaim = createNameClaim;
const createDomainClaim = (domain) => ({
    domain,
    timestamp: (0, types_1.now)(),
    type: types_1.ClaimTypes.DOMAIN,
});
exports.createDomainClaim = createDomainClaim;
const createStorageClaim = (storageURL) => ({
    address: storageURL,
    timestamp: (0, types_1.now)(),
    type: types_1.ClaimTypes.STORAGE,
    filteredDataPaths: '.*',
});
exports.createStorageClaim = createStorageClaim;
//# sourceMappingURL=claim.js.map