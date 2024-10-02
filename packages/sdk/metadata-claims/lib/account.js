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
exports.createAccountClaim = exports.AccountClaimType = exports.AccountClaimTypeH = void 0;
const address_1 = require("@celo/utils/lib/address");
const io_1 = require("@celo/utils/lib/io");
const Either_1 = require("fp-ts/lib/Either");
const t = __importStar(require("io-ts"));
const types_1 = require("./types");
/**
 *
 * Provide the type minus the validation that the public key and address are derived from the same private key
 */
exports.AccountClaimTypeH = t.type({
    type: t.literal(types_1.ClaimTypes.ACCOUNT),
    timestamp: types_1.TimestampType,
    address: io_1.AddressType,
    // io-ts way of defining optional key-value pair
    publicKey: t.union([t.undefined, io_1.PublicKeyType]),
});
exports.AccountClaimType = new t.Type('AccountClaimType', exports.AccountClaimTypeH.is, (unknownValue, context) => Either_1.either.chain(exports.AccountClaimTypeH.validate(unknownValue, context), (claim) => {
    if (claim.publicKey === undefined) {
        return t.success(claim);
    }
    const derivedAddress = (0, address_1.publicKeyToAddress)(claim.publicKey);
    return derivedAddress === claim.address
        ? t.success(claim)
        : t.failure(claim, context, 'public key did not match the address in the claim');
}), (x) => x);
const createAccountClaim = (address, publicKey) => {
    const claim = {
        timestamp: (0, types_1.now)(),
        type: types_1.ClaimTypes.ACCOUNT,
        address,
        publicKey,
    };
    const parsedClaim = exports.AccountClaimType.decode(claim);
    if ((0, Either_1.isLeft)(parsedClaim)) {
        throw new Error(`A valid claim could not be created`);
    }
    return parsedClaim.right;
};
exports.createAccountClaim = createAccountClaim;
//# sourceMappingURL=account.js.map