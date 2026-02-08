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
exports.RpcSigner = void 0;
const address_1 = require("@celo/base/lib/address");
const wallet_base_1 = require("@celo/wallet-base");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const INCORRECT_PASSWORD_ERROR = 'could not decrypt key with given password';
const currentTimeInSeconds = () => Math.floor(Date.now() / 1000);
const toRpcHex = (val) => {
    if (typeof val === 'number' || val instanceof bignumber_js_1.default) {
        return (0, address_1.ensureLeading0x)(val.toString(16));
    }
    else if (typeof val === 'string') {
        return (0, address_1.ensureLeading0x)(val);
    }
    else {
        return '0x0';
    }
};
// TODO(yorke): move this into rpc-caller and generate typings from RPC spec
var RpcSignerEndpoint;
(function (RpcSignerEndpoint) {
    RpcSignerEndpoint["ImportAccount"] = "personal_importRawKey";
    RpcSignerEndpoint["UnlockAccount"] = "personal_unlockAccount";
    RpcSignerEndpoint["SignTransaction"] = "eth_signTransaction";
    RpcSignerEndpoint["SignBytes"] = "eth_sign";
    RpcSignerEndpoint["SignTypedData"] = "eth_signTypedData";
    RpcSignerEndpoint["Decrypt"] = "personal_decrypt";
})(RpcSignerEndpoint || (RpcSignerEndpoint = {}));
/**
 * Implements the signer interface on top of the JSON-RPC interface.
 * @deprecated https://forum.celo.org/t/deprecation-of-celo-wallet-rpc/8452
 */
class RpcSigner {
    /**
     * Construct a new instance of the RPC signer
     *
     * @param rpc RPC caller instance
     * @param account Account address derived from the private key to be called in init
     * @param unlockBufferSeconds Number of seconds to shrink the unlocked duration by to account for
     * latency and timing inconsistencies on the node
     * @param unlockTime Timestamp in seconds when the signer was last unlocked
     * @param unlockDuration Number of seconds that the signer was last unlocked for
     *
     */
    constructor(rpc, account, unlockBufferSeconds = 5, unlockTime, unlockDuration) {
        this.rpc = rpc;
        this.account = account;
        this.unlockBufferSeconds = unlockBufferSeconds;
        this.unlockTime = unlockTime;
        this.unlockDuration = unlockDuration;
        this.init = (privateKey, passphrase) => this.callAndCheckResponse(RpcSignerEndpoint.ImportAccount, [
            (0, address_1.ensureLeading0x)(privateKey),
            passphrase,
        ]);
        this.getNativeKey = () => this.account;
    }
    signRawTransaction(tx) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, address_1.normalizeAddressWith0x)(tx.from) !== this.account) {
                throw new Error(`RpcSigner cannot sign tx with 'from' ${tx.from}`);
            }
            // see geth SendTxArgs type
            // https://github.com/celo-org/celo-blockchain/blob/fc20d6921478cda68fc88797078f20053bae8866/internal/ethapi/api.go#L1241C6-L1241C20
            const rpcTx = Object.assign(Object.assign(Object.assign({}, tx), { nonce: toRpcHex(tx.nonce), value: toRpcHex(tx.value), gas: toRpcHex(tx.gas) }), (tx.gasPrice
                ? {
                    gasPrice: toRpcHex(tx.gasPrice),
                }
                : {
                    maxPriorityFeePerGas: toRpcHex(tx.maxPriorityFeePerGas),
                    maxFeePerGas: toRpcHex(tx.maxFeePerGas),
                }));
            return this.callAndCheckResponse(RpcSignerEndpoint.SignTransaction, [rpcTx]);
        });
    }
    signTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('signTransaction unimplemented; use signRawTransaction');
        });
    }
    signTypedData(typedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.callAndCheckResponse(RpcSignerEndpoint.SignTypedData, [
                this.account,
                typedData,
            ]);
            return (0, wallet_base_1.decodeSig)(result);
        });
    }
    signPersonalMessage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.callAndCheckResponse(RpcSignerEndpoint.SignBytes, [
                this.account,
                data,
            ]);
            return (0, wallet_base_1.decodeSig)(result);
        });
    }
    unlock(passphrase, duration) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.callAndCheckResponse(RpcSignerEndpoint.UnlockAccount, [
                    this.account,
                    passphrase,
                    duration,
                ]);
            }
            catch (error) {
                // The callAndCheckResponse will throw an error if the passphrase is incorrect
                if ((_b = (_a = error === null || error === void 0 ? void 0 : error.message) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.includes(INCORRECT_PASSWORD_ERROR)) {
                    return false;
                }
                // Re-throw otherwise
                throw error;
            }
            this.unlockTime = currentTimeInSeconds();
            this.unlockDuration = duration;
            return true;
        });
    }
    isUnlocked() {
        if (this.unlockDuration === undefined || this.unlockTime === undefined) {
            return false;
        }
        return this.unlockTime + this.unlockDuration - this.unlockBufferSeconds > currentTimeInSeconds();
    }
    callAndCheckResponse(endpoint, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.rpc.call(endpoint, params);
            if (response.error) {
                throw new Error(`RpcSigner@${endpoint} failed with \n'${response.error.message}'`);
            }
            return response.result;
        });
    }
    decrypt(ciphertext) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.callAndCheckResponse(RpcSignerEndpoint.Decrypt, [
                this.account,
                (0, address_1.ensureLeading0x)(ciphertext.toString('hex')),
            ]);
            return Buffer.from((0, address_1.trimLeading0x)(resp), 'hex');
        });
    }
    computeSharedSecret(_publicKey) {
        throw new Error('Not implemented');
        return Promise.resolve(Buffer.from([]));
    }
}
exports.RpcSigner = RpcSigner;
//# sourceMappingURL=rpc-signer.js.map