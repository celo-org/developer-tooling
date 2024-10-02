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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityMetadataWrapper = exports.IdentityMetadataType = exports.ClaimTypes = void 0;
const address_1 = require("@celo/base/lib/address");
const async_1 = require("@celo/base/lib/async");
const io_1 = require("@celo/utils/lib/io");
const signatureUtils_1 = require("@celo/utils/lib/signatureUtils");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const Either_1 = require("fp-ts/lib/Either");
const t = __importStar(require("io-ts"));
const PathReporter_1 = require("io-ts/lib/PathReporter");
const claim_1 = require("./claim");
const types_1 = require("./types");
var types_2 = require("./types");
Object.defineProperty(exports, "ClaimTypes", { enumerable: true, get: function () { return types_2.ClaimTypes; } });
const MetaType = t.type({
    address: io_1.AddressType,
    signature: io_1.SignatureType,
});
exports.IdentityMetadataType = t.type({
    claims: t.array(claim_1.ClaimType),
    meta: MetaType,
});
class IdentityMetadataWrapper {
    static fromEmpty(address) {
        return new IdentityMetadataWrapper({
            claims: [],
            meta: {
                address,
                signature: '',
            },
        });
    }
    static fetchFromURL(contractKitOrAccountsWrapper, url, tries = 3) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, async_1.selectiveRetryAsyncWithBackOff)(() => __awaiter(this, void 0, void 0, function* () {
                const resp = yield (0, cross_fetch_1.default)(url);
                if (!resp.ok) {
                    throw new Error(`Request failed with status ${resp.status}`);
                }
                return this.fromRawString(contractKitOrAccountsWrapper, yield resp.text());
            }), tries, ['Request failed with status 404'], []);
        });
    }
    static fromFile(contractKitOrAccountsWrapper, path) {
        let readFileSync;
        try {
            const fs = require('fs');
            readFileSync = fs.readFileSync;
        }
        catch (_a) {
            console.error('cant read from file in browser or environment without native fs module');
        }
        return this.fromRawString(contractKitOrAccountsWrapper, readFileSync(path, 'utf-8'));
    }
    static verifySigner(contractKitOrAccountsWrapper, hash, signature, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.verifySignerForAddress(contractKitOrAccountsWrapper, hash, signature, metadata.address);
        });
    }
    static verifySignerForAddress(contractKitOrAccountsWrapper, hash, signature, address) {
        return __awaiter(this, void 0, void 0, function* () {
            // First try to verify on account's address
            if (!(0, signatureUtils_1.verifySignature)(hash, signature, address)) {
                const accounts = yield getAccounts(contractKitOrAccountsWrapper);
                // If this fails, signature may still be one of `address`' signers
                if (yield accounts.isAccount(address)) {
                    const signers = yield Promise.all([
                        accounts.getVoteSigner(address),
                        accounts.getValidatorSigner(address),
                        accounts.getAttestationSigner(address),
                    ]);
                    return signers.some((signer) => (0, signatureUtils_1.verifySignature)(hash, signature, signer));
                }
                return false;
            }
            return true;
        });
    }
    static fromRawString(contractKitOrAccountsWrapper, rawData) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.parse(rawData);
            const validatedData = exports.IdentityMetadataType.decode(data);
            if ((0, Either_1.isLeft)(validatedData)) {
                // TODO: We could probably return a more useful error in the future
                throw new Error(PathReporter_1.PathReporter.report(validatedData).join(', '));
            }
            // Verify signature on the data
            const claims = validatedData.right.claims;
            const hash = (0, claim_1.hashOfClaims)(claims);
            if (claims.length > 0 &&
                !(yield this.verifySigner(contractKitOrAccountsWrapper, hash, validatedData.right.meta.signature, validatedData.right.meta))) {
                throw new Error(`Signature could not be validated. Guessing signer: ${(0, signatureUtils_1.guessSigner)(hash, validatedData.right.meta.signature)}`);
            }
            const res = new IdentityMetadataWrapper(validatedData.right);
            // Verify that singular claim types appear at most once
            types_1.SINGULAR_CLAIM_TYPES.forEach((claimType) => {
                const results = res.filterClaims(claimType);
                if (results.length > 1) {
                    throw new Error(`Found ${results.length} claims of type ${claimType}, should be at most 1`);
                }
            });
            return res;
        });
    }
    constructor(data) {
        this.data = data;
    }
    get claims() {
        return this.data.claims;
    }
    hashOfClaims() {
        return (0, claim_1.hashOfClaims)(this.data.claims);
    }
    toString() {
        return JSON.stringify({
            claims: this.data.claims,
            meta: this.data.meta,
        });
    }
    addClaim(claim, signer) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (claim.type) {
                case types_1.ClaimTypes.ACCOUNT:
                    if ((0, address_1.eqAddress)(claim.address, this.data.meta.address)) {
                        throw new Error("Can't claim self");
                    }
                    break;
                case types_1.ClaimTypes.DOMAIN: {
                    const existingClaims = this.data.claims.filter((el) => el.domain === claim.domain);
                    if (existingClaims.length > 0) {
                        return existingClaims[0];
                    }
                    break;
                }
                case types_1.ClaimTypes.KEYBASE: {
                    const existingClaims = this.data.claims.filter((el) => el.username === claim.username);
                    if (existingClaims.length > 0) {
                        return existingClaims[0];
                    }
                }
                default:
                    break;
            }
            if (types_1.SINGULAR_CLAIM_TYPES.includes(claim.type)) {
                const index = this.data.claims.findIndex((0, claim_1.isOfType)(claim.type));
                if (index !== -1) {
                    this.data.claims.splice(index, 1);
                }
            }
            this.data.claims.push(claim);
            this.data.meta.signature = yield signer.sign(this.hashOfClaims());
            return claim;
        });
    }
    findClaim(type) {
        return this.data.claims.find((0, claim_1.isOfType)(type));
    }
    filterClaims(type) {
        return this.data.claims.filter((0, claim_1.isOfType)(type));
    }
}
exports.IdentityMetadataWrapper = IdentityMetadataWrapper;
// at first these functions required a `kit` but thats a bit heavy
// as all that is used are functions on the accounts contract so allow just those functions to be passed
function getAccounts(contractKitOrAccountsWrapper) {
    return __awaiter(this, void 0, void 0, function* () {
        if ('getVoteSigner' in contractKitOrAccountsWrapper &&
            'isAccount' in contractKitOrAccountsWrapper &&
            'getValidatorSigner' in contractKitOrAccountsWrapper &&
            'getAttestationSigner' in contractKitOrAccountsWrapper) {
            return contractKitOrAccountsWrapper;
        }
        throw new Error(`Must pass object with the required functions: getVoteSigner, isAccount, getValidatorSigner, getAttestationSigner. Received ${JSON.stringify(contractKitOrAccountsWrapper)}`);
    });
}
//# sourceMappingURL=metadata.js.map