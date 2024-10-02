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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKeybaseClaim = exports.verifyKeybaseClaim = exports.targetURL = exports.proofFileName = exports.keybaseFilePathToProof = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const Either_1 = require("fp-ts/lib/Either");
const claim_1 = require("./claim");
const metadata_1 = require("./metadata");
const types_1 = require("./types");
exports.keybaseFilePathToProof = `.well-known/celo/`;
const proofFileName = (address) => `verify-${address}.json`;
exports.proofFileName = proofFileName;
const targetURL = (username, address) => `https://${username}.keybase.pub/${exports.keybaseFilePathToProof}${(0, exports.proofFileName)(address)}`;
exports.targetURL = targetURL;
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
function verifyKeybaseClaim(accountsInfoGetters, claim, signer) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const resp = yield (0, cross_fetch_1.default)((0, exports.targetURL)(claim.username, signer));
            if (!resp.ok) {
                return `Proof of ownership could not be retrieved at ${(0, exports.targetURL)(claim.username, signer)}, request yielded ${resp.status} status code`;
            }
            const jsonResp = yield resp.json();
            const parsedClaim = claim_1.SignedClaimType.decode(jsonResp);
            if ((0, Either_1.isLeft)(parsedClaim)) {
                return 'Claim is incorrectly formatted';
            }
            const hasValidSignature = yield metadata_1.IdentityMetadataWrapper.verifySignerForAddress(accountsInfoGetters, (0, claim_1.hashOfClaim)(parsedClaim.right.claim), parsedClaim.right.signature, signer);
            if (!hasValidSignature) {
                return 'Claim does not contain a valid signature';
            }
            const parsedKeybaseClaim = claim_1.KeybaseClaimType.decode(parsedClaim.right.claim);
            if ((0, Either_1.isLeft)(parsedKeybaseClaim)) {
                return 'Hosted claim is not a Keybase claim';
            }
            if (parsedKeybaseClaim.right.username !== claim.username) {
                return 'Usernames do not match';
            }
            return;
        }
        catch (error) {
            return 'Could not verify Keybase claim: ' + error;
        }
    });
}
exports.verifyKeybaseClaim = verifyKeybaseClaim;
const createKeybaseClaim = (username) => ({
    username,
    timestamp: (0, types_1.now)(),
    type: types_1.ClaimTypes.KEYBASE,
});
exports.createKeybaseClaim = createKeybaseClaim;
//# sourceMappingURL=keybase.js.map