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
exports.ACCOUNT_ADDRESS2 = exports.PRIVATE_KEY2 = exports.ACCOUNT_ADDRESS1 = exports.PRIVATE_KEY1 = exports.TYPED_DATA = exports.CHAIN_ID = void 0;
const connect_1 = require("@celo/connect");
const ganache_test_1 = require("@celo/dev-utils/lib/ganache-test");
const address_1 = require("@celo/utils/lib/address");
const signatureUtils_1 = require("@celo/utils/lib/signatureUtils");
const wallet_base_1 = require("@celo/wallet-base");
const net_1 = __importDefault(require("net"));
const web3_1 = __importDefault(require("web3"));
const rpc_wallet_1 = require("./rpc-wallet");
exports.CHAIN_ID = 44378;
// Sample data from the official EIP-712 example:
// https://github.com/ethereum/EIPs/blob/master/assets/eip-712/Example.js
exports.TYPED_DATA = {
    types: {
        EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' },
        ],
        Person: [
            { name: 'name', type: 'string' },
            { name: 'wallet', type: 'address' },
        ],
        Mail: [
            { name: 'from', type: 'Person' },
            { name: 'to', type: 'Person' },
            { name: 'contents', type: 'string' },
        ],
    },
    primaryType: 'Mail',
    domain: {
        name: 'Ether Mail',
        version: '1',
        chainId: 1,
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
    },
    message: {
        from: {
            name: 'Cow',
            wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
        },
        to: {
            name: 'Bob',
            wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
        },
        contents: 'Hello, Bob!',
    },
};
exports.PRIVATE_KEY1 = '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abbdef';
exports.ACCOUNT_ADDRESS1 = (0, address_1.normalizeAddressWith0x)((0, address_1.privateKeyToAddress)(exports.PRIVATE_KEY1));
exports.PRIVATE_KEY2 = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890fdeccc';
exports.ACCOUNT_ADDRESS2 = (0, address_1.normalizeAddressWith0x)((0, address_1.privateKeyToAddress)(exports.PRIVATE_KEY2));
const PASSPHRASE = 'ce10';
const DURATION = 10000;
// ./build/bin/geth --datadir=./envs/alfajoresstaging --syncmode=lightest --rpcapi=net,eth,web3,personal --networkid=1101
describe.skip('rpc-wallet', () => {
    it('should work against local geth ipc', () => __awaiter(void 0, void 0, void 0, function* () {
        const ipcUrl = '/Users/yorhodes/celo/blockchain/envs/alfajoresstaging/geth.ipc';
        const ipcProvider = new web3_1.default.providers.IpcProvider(ipcUrl, net_1.default);
        const wallet = new rpc_wallet_1.RpcWallet(ipcProvider);
        yield wallet.init();
        const account = yield wallet.addAccount(exports.PRIVATE_KEY1, PASSPHRASE);
        yield wallet.unlockAccount(account, PASSPHRASE, DURATION);
        const tx = {
            from: exports.ACCOUNT_ADDRESS1,
            to: exports.ACCOUNT_ADDRESS2,
            value: 1000,
        };
        const result = yield wallet.signTransaction(tx);
        console.log(result);
        const connection = new connect_1.Connection(new web3_1.default(ipcUrl), wallet);
        const txResult = yield connection.sendSignedTransaction(result.raw);
        console.log(txResult);
    }));
});
// It uses personal_importKey RPC call which is not supported in anvil
(0, ganache_test_1.testWithGanache)('rpc-wallet', (web3) => {
    const provider = web3.currentProvider;
    const rpcWallet = new rpc_wallet_1.RpcWallet(provider);
    describe('with ganache web3 provider', () => {
        let ganacheAccounts;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield rpcWallet.init();
            ganacheAccounts = yield web3.eth.getAccounts();
            ganacheAccounts = ganacheAccounts.map(address_1.normalizeAddressWith0x);
        }));
        test('initalizes with provider accounts', () => __awaiter(void 0, void 0, void 0, function* () {
            const accounts = rpcWallet.getAccounts();
            expect(accounts).toEqual(ganacheAccounts);
        }));
        test('fails if you add an invalid private key', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield rpcWallet.addAccount('this is not a valid private key', PASSPHRASE);
                throw new Error('Expected exception to be thrown');
            }
            catch (e) {
                expect(e.message).toBe('Expected 32 bytes of private key');
            }
        }));
        test('succeeds if you add a private key without 0x', () => __awaiter(void 0, void 0, void 0, function* () {
            yield rpcWallet.addAccount(exports.PRIVATE_KEY1, PASSPHRASE);
            expect(rpcWallet.hasAccount(exports.ACCOUNT_ADDRESS1)).toBeTruthy();
        }));
        test('fails if you add a private key twice', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield rpcWallet.addAccount(exports.PRIVATE_KEY1, PASSPHRASE);
                throw new Error('Expected exception to be thrown');
            }
            catch (e) {
                expect(e.message).toBe(`RpcWallet: account already exists`);
            }
        }));
        test('succeeds if you add a private key with 0x', () => __awaiter(void 0, void 0, void 0, function* () {
            yield rpcWallet.addAccount(exports.PRIVATE_KEY2, PASSPHRASE);
            expect(rpcWallet.hasAccount(exports.ACCOUNT_ADDRESS2)).toBeTruthy();
        }));
        describe('with added accounts', () => {
            test('all addresses can be retrieved', () => {
                expect(rpcWallet.getAccounts()).toEqual(ganacheAccounts.concat([exports.ACCOUNT_ADDRESS1, exports.ACCOUNT_ADDRESS2]));
            });
            describe('unlocking', () => {
                test('fails if you use an invalid passphrase', () => __awaiter(void 0, void 0, void 0, function* () {
                    try {
                        yield rpcWallet.unlockAccount(exports.ACCOUNT_ADDRESS1, 'wrong_passphrase', DURATION);
                    }
                    catch (e) {
                        expect(e.message).toContain('could not decrypt key with given passphrase');
                    }
                }));
                test('succeeds if you use the correct passphrase', () => __awaiter(void 0, void 0, void 0, function* () {
                    yield rpcWallet.unlockAccount(exports.ACCOUNT_ADDRESS1, PASSPHRASE, DURATION);
                    const unlocked = rpcWallet.isAccountUnlocked(exports.ACCOUNT_ADDRESS1);
                    expect(unlocked).toBeTruthy();
                }));
            });
            describe('signing', () => {
                describe('using an unlocked address', () => {
                    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
                        yield rpcWallet.unlockAccount(exports.ACCOUNT_ADDRESS1, PASSPHRASE, DURATION);
                    }));
                    describe('when calling signTransaction', () => {
                        let celoTransaction;
                        beforeEach(() => {
                            celoTransaction = {
                                from: exports.ACCOUNT_ADDRESS1,
                                to: exports.ACCOUNT_ADDRESS2,
                                chainId: exports.CHAIN_ID,
                                value: web3.utils.toWei('1', 'ether'),
                                nonce: 0,
                                gas: '10',
                                gasPrice: '99',
                                feeCurrency: '0x',
                                data: '0xabcdef',
                            };
                        });
                        test('succeeds with old school pricing', () => __awaiter(void 0, void 0, void 0, function* () {
                            yield expect(rpcWallet.signTransaction(celoTransaction)).resolves.toMatchInlineSnapshot(`"0xf86b8081991094588e4b68193001e4d10928660ab4165b813717c08a0100000000000000000083abcdef25a073bb7eaa60c810af1fad0f68fa15d4714f9990d0202b62797f6134493ec9f6fba046c13e92017228c2c8f0fae74ddd735021817f2f9757cd66debed078daf4070e"`);
                        }));
                        test('succeeds with with FeeMarketFields', () => __awaiter(void 0, void 0, void 0, function* () {
                            const feeMarketTransaction = Object.assign(Object.assign({}, celoTransaction), { gasPrice: undefined, maxFeePerGas: '1500000000', maxPriorityFeePerGas: '1500000000' });
                            yield expect(rpcWallet.signTransaction(feeMarketTransaction)).resolves.toMatchInlineSnapshot(`"0xf86a80801094588e4b68193001e4d10928660ab4165b813717c08a0100000000000000000083abcdef26a05e9c1e7690d05f3e1433c824fbd948643ff6c618e347ea8c23a6363f3b17cdffa072dc1c22d6147be7b4b7b3cf51eb73b8bedd7940d7b668dcd7ef688a2354a631"`);
                        }));
                        // TODO(yorke): enable once fixed: https://github.com/celo-org/celo-monorepo/issues/4077
                        test.skip('with same signer', () => __awaiter(void 0, void 0, void 0, function* () {
                            const signedTx = yield rpcWallet.signTransaction(celoTransaction);
                            const [, recoveredSigner] = (0, wallet_base_1.recoverTransaction)(signedTx.raw);
                            expect((0, address_1.normalizeAddressWith0x)(recoveredSigner)).toBe((0, address_1.normalizeAddressWith0x)(exports.ACCOUNT_ADDRESS1));
                        }));
                        // https://github.com/ethereum/go-ethereum/blob/38aab0aa831594f31d02c9f02bfacc0bef48405d/rlp/decode.go#L664
                        test.skip('signature with 0x00 prefix is canonicalized', () => __awaiter(void 0, void 0, void 0, function* () {
                            // This tx is carefully constructed to produce an S value with the first byte as 0x00
                            const celoTransactionZeroPrefix = {
                                from: exports.ACCOUNT_ADDRESS1,
                                to: exports.ACCOUNT_ADDRESS2,
                                chainId: exports.CHAIN_ID,
                                value: web3.utils.toWei('1', 'ether'),
                                nonce: 65,
                                gas: '10',
                                gasPrice: '99',
                                feeCurrency: '0x',
                                data: '0xabcdef',
                            };
                            const signedTx = yield rpcWallet.signTransaction(celoTransactionZeroPrefix);
                            expect(signedTx.tx.s.startsWith('0x00')).toBeFalsy();
                            const [, recoveredSigner] = (0, wallet_base_1.recoverTransaction)(signedTx.raw);
                            expect((0, address_1.normalizeAddressWith0x)(recoveredSigner)).toBe((0, address_1.normalizeAddressWith0x)(exports.ACCOUNT_ADDRESS1));
                        }));
                    });
                    // ganache
                    describe.skip('when calling signPersonalMessage', () => {
                        test('succeeds', () => __awaiter(void 0, void 0, void 0, function* () {
                            const hexStr = exports.ACCOUNT_ADDRESS2;
                            const signedMessage = yield rpcWallet.signPersonalMessage(exports.ACCOUNT_ADDRESS1, hexStr);
                            expect(signedMessage).not.toBeUndefined();
                            const valid = (0, signatureUtils_1.verifySignature)(hexStr, signedMessage, exports.ACCOUNT_ADDRESS1);
                            expect(valid).toBeTruthy();
                        }));
                    });
                    describe.skip('when calling signTypedData', () => {
                        test('succeeds', () => __awaiter(void 0, void 0, void 0, function* () {
                            const signedMessage = yield rpcWallet.signTypedData(exports.ACCOUNT_ADDRESS1, exports.TYPED_DATA);
                            expect(signedMessage).not.toBeUndefined();
                            const valid = (0, wallet_base_1.verifyEIP712TypedDataSigner)(exports.TYPED_DATA, signedMessage, exports.ACCOUNT_ADDRESS1);
                            expect(valid).toBeTruthy();
                        }));
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=rpc-wallet.test.js.map