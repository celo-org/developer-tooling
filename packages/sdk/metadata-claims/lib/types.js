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
exports.SINGULAR_CLAIM_TYPES = exports.VERIFIABLE_CLAIM_TYPES = exports.ClaimTypes = exports.now = exports.TimestampType = exports.SignatureType = void 0;
const t = __importStar(require("io-ts"));
exports.SignatureType = t.string;
exports.TimestampType = t.number;
/** @internal */
const now = () => Math.round(new Date().getTime() / 1000);
exports.now = now;
var ClaimTypes;
(function (ClaimTypes) {
    ClaimTypes["ACCOUNT"] = "ACCOUNT";
    ClaimTypes["DOMAIN"] = "DOMAIN";
    ClaimTypes["KEYBASE"] = "KEYBASE";
    ClaimTypes["NAME"] = "NAME";
    ClaimTypes["PROFILE_PICTURE"] = "PROFILE_PICTURE";
    ClaimTypes["STORAGE"] = "STORAGE";
    ClaimTypes["TWITTER"] = "TWITTER";
})(ClaimTypes || (exports.ClaimTypes = ClaimTypes = {}));
exports.VERIFIABLE_CLAIM_TYPES = [ClaimTypes.KEYBASE, ClaimTypes.ACCOUNT, ClaimTypes.DOMAIN];
exports.SINGULAR_CLAIM_TYPES = [ClaimTypes.NAME];
//# sourceMappingURL=types.js.map