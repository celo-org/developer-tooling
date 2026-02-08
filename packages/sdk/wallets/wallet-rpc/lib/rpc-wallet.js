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
exports.RpcWallet = exports.RpcWalletErrors = void 0;
const address_1 = require("@celo/base/lib/address");
const connect_1 = require("@celo/connect");
const address_2 = require("@celo/utils/lib/address");
const wallet_remote_1 = require("@celo/wallet-remote");
const rpc_signer_1 = require("./rpc-signer");
var RpcWalletErrors;
(function (RpcWalletErrors) {
    RpcWalletErrors["FetchAccounts"] = "RpcWallet: failed to fetch accounts from server";
    RpcWalletErrors["AccountAlreadyExists"] = "RpcWallet: account already exists";
})(RpcWalletErrors || (exports.RpcWalletErrors = RpcWalletErrors = {}));
/**
 *   WARNING: This class should only be used with well-permissioned providers (ie IPC)
 *   to avoid sensitive user 'privateKey' and 'passphrase' information being exposed
 *
 * @deprecated https://forum.celo.org/t/deprecation-of-celo-wallet-rpc/8452
 */
class RpcWallet extends wallet_remote_1.RemoteWallet {
    constructor(_provider) {
        super();
        this._provider = _provider;
        this.rpc = new connect_1.HttpRpcCaller(_provider);
    }
    loadAccountSigners() {
        return __awaiter(this, void 0, void 0, function* () {
            const addressToSigner = new Map();
            const resp = yield this.rpc.call('eth_accounts', []);
            if (resp.error) {
                throw new Error(RpcWalletErrors.FetchAccounts);
            }
            const accounts = resp.result;
            accounts.forEach((account) => {
                addressToSigner.set(account, new rpc_signer_1.RpcSigner(this.rpc, account));
            });
            return addressToSigner;
        });
    }
    addAccount(privateKey, passphrase) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = (0, address_1.normalizeAddressWith0x)((0, address_2.privateKeyToAddress)((0, address_1.ensureLeading0x)(privateKey)));
            if (this.hasAccount(address)) {
                throw new Error(RpcWalletErrors.AccountAlreadyExists);
            }
            const signer = new rpc_signer_1.RpcSigner(this.rpc, address);
            const resultantAddress = yield signer.init(privateKey, passphrase);
            this.addSigner(resultantAddress, signer);
            return resultantAddress;
        });
    }
    unlockAccount(address, passphrase, duration) {
        return __awaiter(this, void 0, void 0, function* () {
            const signer = this.getSigner(address);
            return signer.unlock(passphrase, duration);
        });
    }
    isAccountUnlocked(address) {
        const signer = this.getSigner(address);
        return signer.isUnlocked();
    }
    /**
     * Gets the signer based on the 'from' field in the tx body
     * @param txParams Transaction to sign
     * @dev overrides WalletBase.signTransaction
     */
    signTransaction(txParams) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get the signer from the 'from' field
            const fromAddress = txParams.from.toString();
            const signer = this.getSigner(fromAddress);
            return signer.signRawTransaction(txParams);
        });
    }
}
exports.RpcWallet = RpcWallet;
//# sourceMappingURL=rpc-wallet.js.map