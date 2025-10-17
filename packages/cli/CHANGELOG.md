# Changelog

## 8.0.0

### Major Changes

- [#719](https://github.com/celo-org/developer-tooling/pull/719) [`f3797a3`](https://github.com/celo-org/developer-tooling/commit/f3797a3105c7cc7c930f165374501bcb1473a21e) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Removes offchain-read and offchain-write commands. These have been in deprecation for a year with no contestation. The follow the deprecated cip8 spec.

- [#716](https://github.com/celo-org/developer-tooling/pull/716) [`3ddc92b`](https://github.com/celo-org/developer-tooling/commit/3ddc92b9308c40f50882446cdeab82f46d046a9c) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - remove all exchange:\*\*\* commands.

  We recommended swapping with mento app instead

- [#715](https://github.com/celo-org/developer-tooling/pull/715) [`682adfe`](https://github.com/celo-org/developer-tooling/commit/682adfe3e9f36139634c9619f7bc0b74d768f27f) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove alfajores and baklava aliases from --rpc flag

### Minor Changes

- [#717](https://github.com/celo-org/developer-tooling/pull/717) [`94cd236`](https://github.com/celo-org/developer-tooling/commit/94cd236c22675d6bc77f8a49e31d884447aadb3d) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - governance:propose now prevents submitting a descriptionUrl that does not exist.

### Patch Changes

- [#713](https://github.com/celo-org/developer-tooling/pull/713) [`3d98e81`](https://github.com/celo-org/developer-tooling/commit/3d98e81431cdecbe8da7c72322bec44eef9268a2) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix releasecelo:transfer-dollars to load the correct account to send from

- Updated dependencies [[`682adfe`](https://github.com/celo-org/developer-tooling/commit/682adfe3e9f36139634c9619f7bc0b74d768f27f), [`05e9051`](https://github.com/celo-org/developer-tooling/commit/05e905196789bdd3407cb7193e4415f652cdafa1)]:
  - @celo/actions@0.2.0
  - @celo/contractkit@10.0.2
  - @celo/explorer@5.0.18
  - @celo/governance@5.1.9

## 8.0.0-alpha.2

### Patch Changes

- Updated dependencies [[`05e9051`](https://github.com/celo-org/developer-tooling/commit/05e905196789bdd3407cb7193e4415f652cdafa1)]:
  - @celo/contractkit@10.0.2-alpha.0
  - @celo/explorer@5.0.18-alpha.0
  - @celo/governance@5.1.9-alpha.0

## 8.0.0-alpha.1

### Major Changes

- [#719](https://github.com/celo-org/developer-tooling/pull/719) [`f3797a3`](https://github.com/celo-org/developer-tooling/commit/f3797a3105c7cc7c930f165374501bcb1473a21e) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Removes offchain-read and offchain-write commands. These have been in deprecation for a year with no contestation. The follow the deprecated cip8 spec.

- [#716](https://github.com/celo-org/developer-tooling/pull/716) [`3ddc92b`](https://github.com/celo-org/developer-tooling/commit/3ddc92b9308c40f50882446cdeab82f46d046a9c) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - remove all exchange:\*\*\* commands.

  We recommended swapping with mento app instead

- [#715](https://github.com/celo-org/developer-tooling/pull/715) [`682adfe`](https://github.com/celo-org/developer-tooling/commit/682adfe3e9f36139634c9619f7bc0b74d768f27f) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove alfajores and baklava aliases from --rpc flag

### Minor Changes

- [#717](https://github.com/celo-org/developer-tooling/pull/717) [`94cd236`](https://github.com/celo-org/developer-tooling/commit/94cd236c22675d6bc77f8a49e31d884447aadb3d) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - governance:propose now prevents submitting a descriptionUrl that does not exist.

### Patch Changes

- Updated dependencies [[`682adfe`](https://github.com/celo-org/developer-tooling/commit/682adfe3e9f36139634c9619f7bc0b74d768f27f)]:
  - @celo/actions@0.2.0-alpha.0

## 7.1.1-alpha.0

### Patch Changes

- [#713](https://github.com/celo-org/developer-tooling/pull/713) [`3d98e81`](https://github.com/celo-org/developer-tooling/commit/3d98e81431cdecbe8da7c72322bec44eef9268a2) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix releasecelo:transfer-dollars to load the correct account to send from

## 7.1.0

### Minor Changes

- [#695](https://github.com/celo-org/developer-tooling/pull/695) [`7360192`](https://github.com/celo-org/developer-tooling/commit/73601920c69a8ffac4d999dcc1c4b9c928a48989) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Adds rpc-url as alias for node

- [#689](https://github.com/celo-org/developer-tooling/pull/689) [`493f73c`](https://github.com/celo-org/developer-tooling/commit/493f73c8807696b952dee675bc8f3fb31e6cf070) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Add a multisig:propose that can propose arbitrary transactions on celo multisigs.
  Refactor all multisig commands to use `viem`.

- [#695](https://github.com/celo-org/developer-tooling/pull/695) [`7360192`](https://github.com/celo-org/developer-tooling/commit/73601920c69a8ffac4d999dcc1c4b9c928a48989) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Adds celo-sepolia + 'testnet' aliases for use with the node flag.

### Patch Changes

- [#695](https://github.com/celo-org/developer-tooling/pull/695) [`7360192`](https://github.com/celo-org/developer-tooling/commit/73601920c69a8ffac4d999dcc1c4b9c928a48989) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Update viem to version that includes support for celo sepolia

- [#684](https://github.com/celo-org/developer-tooling/pull/684) [`e058e0a`](https://github.com/celo-org/developer-tooling/commit/e058e0a5357443ae5c8359443b4bcba955524140) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Remove governance:whitelisthotfix command. Note we dont consider this breaking since it has not functioned since the cel2 transition.

- [#684](https://github.com/celo-org/developer-tooling/pull/684) [`e058e0a`](https://github.com/celo-org/developer-tooling/commit/e058e0a5357443ae5c8359443b4bcba955524140) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Support Core Contract Release 13

- Updated dependencies [[`7360192`](https://github.com/celo-org/developer-tooling/commit/73601920c69a8ffac4d999dcc1c4b9c928a48989), [`7360192`](https://github.com/celo-org/developer-tooling/commit/73601920c69a8ffac4d999dcc1c4b9c928a48989), [`2d997eb`](https://github.com/celo-org/developer-tooling/commit/2d997ebe5f94bbb42114a3e291ff10337be94fdf), [`7360192`](https://github.com/celo-org/developer-tooling/commit/73601920c69a8ffac4d999dcc1c4b9c928a48989), [`493f73c`](https://github.com/celo-org/developer-tooling/commit/493f73c8807696b952dee675bc8f3fb31e6cf070), [`e058e0a`](https://github.com/celo-org/developer-tooling/commit/e058e0a5357443ae5c8359443b4bcba955524140)]:
  - @celo/actions@0.1.0
  - @celo/viem-account-ledger@1.2.1
  - @celo/governance@5.1.8
  - @celo/wallet-ledger@8.0.1
  - @celo/wallet-local@8.0.1
  - @celo/contractkit@10.0.1
  - @celo/wallet-hsm-azure@8.0.1
  - @celo/explorer@5.0.17

## 7.1.0-beta.1

### Minor Changes

- [#695](https://github.com/celo-org/developer-tooling/pull/695) [`7360192`](https://github.com/celo-org/developer-tooling/commit/73601920c69a8ffac4d999dcc1c4b9c928a48989) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Adds rpc-url as alias for node

- [#689](https://github.com/celo-org/developer-tooling/pull/689) [`493f73c`](https://github.com/celo-org/developer-tooling/commit/493f73c8807696b952dee675bc8f3fb31e6cf070) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Add a multisig:propose that can propose arbitrary transactions on celo multisigs.
  Refactor all multisig commands to use `viem`.

- [#695](https://github.com/celo-org/developer-tooling/pull/695) [`7360192`](https://github.com/celo-org/developer-tooling/commit/73601920c69a8ffac4d999dcc1c4b9c928a48989) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Adds celo-sepolia + 'testnet' aliases for use with the node flag.

### Patch Changes

- [#695](https://github.com/celo-org/developer-tooling/pull/695) [`7360192`](https://github.com/celo-org/developer-tooling/commit/73601920c69a8ffac4d999dcc1c4b9c928a48989) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Update viem to version that includes support for celo sepolia

- Updated dependencies [[`7360192`](https://github.com/celo-org/developer-tooling/commit/73601920c69a8ffac4d999dcc1c4b9c928a48989), [`7360192`](https://github.com/celo-org/developer-tooling/commit/73601920c69a8ffac4d999dcc1c4b9c928a48989), [`7360192`](https://github.com/celo-org/developer-tooling/commit/73601920c69a8ffac4d999dcc1c4b9c928a48989), [`493f73c`](https://github.com/celo-org/developer-tooling/commit/493f73c8807696b952dee675bc8f3fb31e6cf070)]:
  - @celo/actions@0.1.0-beta.1
  - @celo/viem-account-ledger@1.2.1-beta.0
  - @celo/wallet-ledger@8.0.1-beta.0
  - @celo/wallet-local@8.0.1-beta.0
  - @celo/contractkit@10.0.1-beta.1
  - @celo/wallet-hsm-azure@8.0.1-beta.0
  - @celo/explorer@5.0.17-beta.1
  - @celo/governance@5.1.8-beta.1

## 7.0.2-cc13.0

### Patch Changes

- [#684](https://github.com/celo-org/developer-tooling/pull/684) [`9ffd3f2`](https://github.com/celo-org/developer-tooling/commit/9ffd3f29aae3e820b5f8a3ce0cf3a509db6e63a1) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Remove governance:whitelisthotfix command. Note we dont consider this breaking since it has not functioned since the cel2 transition.

- [#684](https://github.com/celo-org/developer-tooling/pull/684) [`8cf27a1`](https://github.com/celo-org/developer-tooling/commit/8cf27a1bf22342806b917020776a877296a4b71c) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Support Core Contract Release 13

- Updated dependencies [[`8cf27a1`](https://github.com/celo-org/developer-tooling/commit/8cf27a1bf22342806b917020776a877296a4b71c)]:
  - @celo/contractkit@10.0.1-cc13.0
  - @celo/governance@5.1.8-cc13.0
  - @celo/actions@0.0.2-cc13.0
  - @celo/explorer@5.0.17-cc13.0

## 7.0.1

### Patch Changes

- [#683](https://github.com/celo-org/developer-tooling/pull/683) [`bbdce04`](https://github.com/celo-org/developer-tooling/commit/bbdce04c9f50b7eaa63856bc26f100d11ec2f9d0) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix incorrect estimation of gas for transfers

## 7.0.0

### Major Changes

- [#650](https://github.com/celo-org/developer-tooling/pull/650) [`8b30dc5`](https://github.com/celo-org/developer-tooling/commit/8b30dc57bdcae34146a1f9a139b89dc21c13d3c5) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Now defaults to using "m/44'/60'/0'" as base derivation path for account:new and any command using --useLedger. use celocli `config:set --derivationPath celoLegacy` for old behavior.

- [#640](https://github.com/celo-org/developer-tooling/pull/640) [`04c89f7`](https://github.com/celo-org/developer-tooling/commit/04c89f739b1056330c5ca287234c9336c19b11e9) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove node:accounts command (use account:list)

- [#599](https://github.com/celo-org/developer-tooling/pull/599) [`bec048f`](https://github.com/celo-org/developer-tooling/commit/bec048f2b39c620428ce62ea1e6c20f348203012) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove validator commands with L1 only usecases. set-bitmaps, signed-blocks, status, update-bls-key

- [#599](https://github.com/celo-org/developer-tooling/pull/599) [`bec048f`](https://github.com/celo-org/developer-tooling/commit/bec048f2b39c620428ce62ea1e6c20f348203012) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove bls flags from account:authorize and releasecelo:authorize commands, and validator:list/register commands

- [#599](https://github.com/celo-org/developer-tooling/pull/599) [`bec048f`](https://github.com/celo-org/developer-tooling/commit/bec048f2b39c620428ce62ea1e6c20f348203012) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove slashing flag from rewards:show (no longer relevent post L2 upgrade)

- [#661](https://github.com/celo-org/developer-tooling/pull/661) [`f11ff8a`](https://github.com/celo-org/developer-tooling/commit/f11ff8af38e7cc16913a476fa323908cd11137e2) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove blsKey and blsPop from releasecelo:authorize since they are no longer used

- [#610](https://github.com/celo-org/developer-tooling/pull/610) [`6ca357b`](https://github.com/celo-org/developer-tooling/commit/6ca357bfbbb1075d73c2b8000e01db70959e08f5) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Remove support for --useAKV for transfer methods

- [#646](https://github.com/celo-org/developer-tooling/pull/646) [`7cd2320`](https://github.com/celo-org/developer-tooling/commit/7cd2320a26ee3139ebf1be9788a27551fefe327a) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - epoch:\* commands will not warn and exit instead of erroring if Epoch is not in correct state for the given command

### Minor Changes

- [#661](https://github.com/celo-org/developer-tooling/pull/661) [`f11ff8a`](https://github.com/celo-org/developer-tooling/commit/f11ff8af38e7cc16913a476fa323908cd11137e2) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Add score to validatorgroup:list, All scores are now properly fetched from ScoreManager contract

- [#602](https://github.com/celo-org/developer-tooling/pull/602) [`a270c1a`](https://github.com/celo-org/developer-tooling/commit/a270c1aa0c9d5b282396af8812ea9ddbcb7fec9c) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Change the behaviour of --ledgerConfirmAddress to also verify on first read if no txs are submitted in the command

- [#531](https://github.com/celo-org/developer-tooling/pull/531) [`e1306b7`](https://github.com/celo-org/developer-tooling/commit/e1306b746fc069af86974e15b618eaba955c3774) Thanks [@shazarre](https://github.com/shazarre)! - Add epoch:status command to view information on the current epoch

### Patch Changes

- [#599](https://github.com/celo-org/developer-tooling/pull/599) [`bec048f`](https://github.com/celo-org/developer-tooling/commit/bec048f2b39c620428ce62ea1e6c20f348203012) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix releasecelo/admin-revoke to work on L2

- [#615](https://github.com/celo-org/developer-tooling/pull/615) [`2abf861`](https://github.com/celo-org/developer-tooling/commit/2abf8612e48eba9ef88a2bfef252ccdce8605072) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Deprecate the DKG command group

- [#640](https://github.com/celo-org/developer-tooling/pull/640) [`04c89f7`](https://github.com/celo-org/developer-tooling/commit/04c89f739b1056330c5ca287234c9336c19b11e9) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - fix: account:list --useLedger no longer requires --node to be passed in.

- [#606](https://github.com/celo-org/developer-tooling/pull/606) [`4a6da4f`](https://github.com/celo-org/developer-tooling/commit/4a6da4f443a65d5600707262d01daf1c368f5adb) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - gasCurrency flag now completely removed from config. celocli config:set no longer tries to connect to a node

- [#676](https://github.com/celo-org/developer-tooling/pull/676) [`15e1e03`](https://github.com/celo-org/developer-tooling/commit/15e1e031f0f79339225d860250348d0beceaa9e5) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - (beta) Fix gas estimation with celo transfer with gas tokens

- [#554](https://github.com/celo-org/developer-tooling/pull/554) [`feef9ac`](https://github.com/celo-org/developer-tooling/commit/feef9ac013e5fbf2acc3b5941a6cbd72df2825b2) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Migrate node:synced to viem

- [#606](https://github.com/celo-org/developer-tooling/pull/606) [`4a6da4f`](https://github.com/celo-org/developer-tooling/commit/4a6da4f443a65d5600707262d01daf1c368f5adb) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Getting config no longer requires a node

- [#531](https://github.com/celo-org/developer-tooling/pull/531) [`e1306b7`](https://github.com/celo-org/developer-tooling/commit/e1306b746fc069af86974e15b618eaba955c3774) Thanks [@shazarre](https://github.com/shazarre)! - Parts of celocli now use viem instead of contractkit/web3.

- [#599](https://github.com/celo-org/developer-tooling/pull/599) [`bec048f`](https://github.com/celo-org/developer-tooling/commit/bec048f2b39c620428ce62ea1e6c20f348203012) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove L1 code paths

- [#615](https://github.com/celo-org/developer-tooling/pull/615) [`2abf861`](https://github.com/celo-org/developer-tooling/commit/2abf8612e48eba9ef88a2bfef252ccdce8605072) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Deprecate useAKV flag with intent to remove. This was for connecting to AzureKeyVault for storing key to sign transactions. We hope to streamline and remove this functionality.

- [#651](https://github.com/celo-org/developer-tooling/pull/651) [`5a2fa51`](https://github.com/celo-org/developer-tooling/commit/5a2fa5196976fffd7c89c804c68b7507e9c48f92) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Removes unused dependencies

- [#677](https://github.com/celo-org/developer-tooling/pull/677) [`8637f38`](https://github.com/celo-org/developer-tooling/commit/8637f380eda606a5f11728089328f2ebac88bcb2) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix Typo in Telemetry Log and Update Deprecation Notice Message. credit @leopardracer

- [#628](https://github.com/celo-org/developer-tooling/pull/628) [`7d84a5a`](https://github.com/celo-org/developer-tooling/commit/7d84a5a9a23f72572999dc17f24d9b70bf6ca9f6) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Minor changes in the account:new output

- [#610](https://github.com/celo-org/developer-tooling/pull/610) [`6ca357b`](https://github.com/celo-org/developer-tooling/commit/6ca357bfbbb1075d73c2b8000e01db70959e08f5) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Notice: Refactored following commands to use viem internally. Should not affect behavior.

  - account:list
  - election:activate
  - election:vote
  - epoch:send-validator-payment
  - governance:vote
  - network:info
  - node:synced
  - transfer:\*
  - validator:list
  - validator:rpc-urls
  - validatorgroup:list

- [#617](https://github.com/celo-org/developer-tooling/pull/617) [`8e76ba4`](https://github.com/celo-org/developer-tooling/commit/8e76ba4cd85cd4ecd188d50bff6a718c8dd36c8b) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - chore: Remove web3-utils and @celo/phone-number-utils dependencies

- [#611](https://github.com/celo-org/developer-tooling/pull/611) [`9069df7`](https://github.com/celo-org/developer-tooling/commit/9069df7cf51559ccbcdd5502d045ccc1ab238199) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Speed up validator:rpc-urls due to multicall and higher concurrancy

- [#604](https://github.com/celo-org/developer-tooling/pull/604) [`e84bc3c`](https://github.com/celo-org/developer-tooling/commit/e84bc3c3daebcfc6b69bfb26e27cedd37ee52dea) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Multicall is now generally used where available. Election:current now runs on viem

- Updated dependencies [[`66c8ad4`](https://github.com/celo-org/developer-tooling/commit/66c8ad4e1dc03fbc478cbf046bd0a9cb3712b8d8), [`d761662`](https://github.com/celo-org/developer-tooling/commit/d76166240bf558effe3e27c8a4a0027ed2a0788f), [`7d84a5a`](https://github.com/celo-org/developer-tooling/commit/7d84a5a9a23f72572999dc17f24d9b70bf6ca9f6), [`99717e9`](https://github.com/celo-org/developer-tooling/commit/99717e93c640e37e4e67020d973a2a13d5af2ac3), [`04c89f7`](https://github.com/celo-org/developer-tooling/commit/04c89f739b1056330c5ca287234c9336c19b11e9), [`f11ff8a`](https://github.com/celo-org/developer-tooling/commit/f11ff8af38e7cc16913a476fa323908cd11137e2), [`1c4925f`](https://github.com/celo-org/developer-tooling/commit/1c4925f1275bf78323b5eb4822078ac3572eca44), [`5a2fa51`](https://github.com/celo-org/developer-tooling/commit/5a2fa5196976fffd7c89c804c68b7507e9c48f92), [`6ca357b`](https://github.com/celo-org/developer-tooling/commit/6ca357bfbbb1075d73c2b8000e01db70959e08f5), [`584c5ec`](https://github.com/celo-org/developer-tooling/commit/584c5ec440d031e6979a521b0d217be527a42580), [`66c8ad4`](https://github.com/celo-org/developer-tooling/commit/66c8ad4e1dc03fbc478cbf046bd0a9cb3712b8d8), [`a270c1a`](https://github.com/celo-org/developer-tooling/commit/a270c1aa0c9d5b282396af8812ea9ddbcb7fec9c), [`66c8ad4`](https://github.com/celo-org/developer-tooling/commit/66c8ad4e1dc03fbc478cbf046bd0a9cb3712b8d8), [`6610d47`](https://github.com/celo-org/developer-tooling/commit/6610d474e364e7ae5fe1016dd44a0a8c53d0769f), [`8b30dc5`](https://github.com/celo-org/developer-tooling/commit/8b30dc57bdcae34146a1f9a139b89dc21c13d3c5)]:
  - @celo/contractkit@10.0.0
  - @celo/actions@0.0.1
  - @celo/base@7.0.3
  - @celo/viem-account-ledger@1.2.0
  - @celo/wallet-ledger@8.0.0
  - @celo/metadata-claims@1.0.4
  - @celo/governance@5.1.7
  - @celo/connect@7.0.0
  - @celo/cryptographic-utils@6.0.0
  - @celo/explorer@5.0.16
  - @celo/wallet-hsm-azure@8.0.0
  - @celo/wallet-local@8.0.0
  - @celo/utils@8.0.3

## 7.0.0-beta.10

### Patch Changes

- [#676](https://github.com/celo-org/developer-tooling/pull/676) [`15e1e03`](https://github.com/celo-org/developer-tooling/commit/15e1e031f0f79339225d860250348d0beceaa9e5) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - (beta) Fix gas estimation with celo transfer with gas tokens

- [#677](https://github.com/celo-org/developer-tooling/pull/677) [`8637f38`](https://github.com/celo-org/developer-tooling/commit/8637f380eda606a5f11728089328f2ebac88bcb2) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix Typo in Telemetry Log and Update Deprecation Notice Message

- Updated dependencies [[`6610d47`](https://github.com/celo-org/developer-tooling/commit/6610d474e364e7ae5fe1016dd44a0a8c53d0769f)]:
  - @celo/viem-account-ledger@1.2.0-beta.3
  - @celo/wallet-ledger@8.0.0-beta.3
  - @celo/wallet-hsm-azure@8.0.0-beta.3
  - @celo/wallet-local@8.0.0-beta.3

## 7.0.0-beta.9

### Patch Changes

- Updated dependencies [[`d761662`](https://github.com/celo-org/developer-tooling/commit/d76166240bf558effe3e27c8a4a0027ed2a0788f)]:
  - @celo/actions@0.0.1-beta.3

## 7.0.0-beta.8

### Patch Changes

- Updated dependencies []:
  - @celo/actions@0.0.1-beta.2

## 7.0.0-beta.7

### Major Changes

- [#661](https://github.com/celo-org/developer-tooling/pull/661) [`f11ff8a`](https://github.com/celo-org/developer-tooling/commit/f11ff8af38e7cc16913a476fa323908cd11137e2) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove blsKey and blsPop from releasecelo:authorize since they are no longer used

### Minor Changes

- [#661](https://github.com/celo-org/developer-tooling/pull/661) [`f11ff8a`](https://github.com/celo-org/developer-tooling/commit/f11ff8af38e7cc16913a476fa323908cd11137e2) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Add score to validatorgroup:list, All scores are now properly fetched from ScoreManager contract

### Patch Changes

- [#652](https://github.com/celo-org/developer-tooling/pull/652) [`584c5ec`](https://github.com/celo-org/developer-tooling/commit/584c5ec440d031e6979a521b0d217be527a42580) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Convert election:activate to viem

- Updated dependencies [[`f11ff8a`](https://github.com/celo-org/developer-tooling/commit/f11ff8af38e7cc16913a476fa323908cd11137e2), [`584c5ec`](https://github.com/celo-org/developer-tooling/commit/584c5ec440d031e6979a521b0d217be527a42580)]:
  - @celo/actions@0.0.1-beta.1

## 7.0.0-beta.6

### Major Changes

- [#650](https://github.com/celo-org/developer-tooling/pull/650) [`8b30dc5`](https://github.com/celo-org/developer-tooling/commit/8b30dc57bdcae34146a1f9a139b89dc21c13d3c5) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Now defaults to using "m/44'/60'/0'" as base derivation path for account:new and any command using --useLedger. use celocli `config:set --derivationPath celoLegacy` for old behavior.

- [#640](https://github.com/celo-org/developer-tooling/pull/640) [`04c89f7`](https://github.com/celo-org/developer-tooling/commit/04c89f739b1056330c5ca287234c9336c19b11e9) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove node:accounts command (use account:list)

- [#646](https://github.com/celo-org/developer-tooling/pull/646) [`7cd2320`](https://github.com/celo-org/developer-tooling/commit/7cd2320a26ee3139ebf1be9788a27551fefe327a) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - epoch:\* commands will not warn and exit instead of erroring if Epoch is not in correct state for the given command

### Patch Changes

- [#640](https://github.com/celo-org/developer-tooling/pull/640) [`04c89f7`](https://github.com/celo-org/developer-tooling/commit/04c89f739b1056330c5ca287234c9336c19b11e9) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - fix: account:list --useLedger no longer requires --node to be passed in.

- [#636](https://github.com/celo-org/developer-tooling/pull/636) [`d50bcdd`](https://github.com/celo-org/developer-tooling/commit/d50bcdd6108350238bda84c106b86b2762e4580d) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - (chore): Migrate election:vote to viem

- [#639](https://github.com/celo-org/developer-tooling/pull/639) [`99717e9`](https://github.com/celo-org/developer-tooling/commit/99717e93c640e37e4e67020d973a2a13d5af2ac3) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - migrate governance:vote commands to viem

- [#651](https://github.com/celo-org/developer-tooling/pull/651) [`5a2fa51`](https://github.com/celo-org/developer-tooling/commit/5a2fa5196976fffd7c89c804c68b7507e9c48f92) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Removes unused dependencies

- [#628](https://github.com/celo-org/developer-tooling/pull/628) [`7d84a5a`](https://github.com/celo-org/developer-tooling/commit/7d84a5a9a23f72572999dc17f24d9b70bf6ca9f6) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Minor changes in the account:new output

- [#629](https://github.com/celo-org/developer-tooling/pull/629) [`bd32521`](https://github.com/celo-org/developer-tooling/commit/bd32521b76872cdbe72de0f9c8a032469f428a41) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Refactor epoch:send-validator-payment to use viem

- Updated dependencies [[`7d84a5a`](https://github.com/celo-org/developer-tooling/commit/7d84a5a9a23f72572999dc17f24d9b70bf6ca9f6), [`99717e9`](https://github.com/celo-org/developer-tooling/commit/99717e93c640e37e4e67020d973a2a13d5af2ac3), [`04c89f7`](https://github.com/celo-org/developer-tooling/commit/04c89f739b1056330c5ca287234c9336c19b11e9), [`1c4925f`](https://github.com/celo-org/developer-tooling/commit/1c4925f1275bf78323b5eb4822078ac3572eca44), [`5a2fa51`](https://github.com/celo-org/developer-tooling/commit/5a2fa5196976fffd7c89c804c68b7507e9c48f92), [`8b30dc5`](https://github.com/celo-org/developer-tooling/commit/8b30dc57bdcae34146a1f9a139b89dc21c13d3c5)]:
  - @celo/base@7.0.3-beta.0
  - @celo/viem-account-ledger@1.2.0-beta.2
  - @celo/actions@0.0.1-beta.0
  - @celo/wallet-ledger@8.0.0-beta.2
  - @celo/metadata-claims@1.0.4-beta.0
  - @celo/contractkit@10.0.0-beta.2
  - @celo/governance@5.1.7-beta.1
  - @celo/cryptographic-utils@6.0.0-beta.0
  - @celo/connect@7.0.0-beta.1
  - @celo/explorer@5.0.16-beta.1
  - @celo/utils@8.0.3-beta.0
  - @celo/wallet-hsm-azure@8.0.0-beta.2
  - @celo/wallet-local@8.0.0-beta.2

## 7.0.0-beta.5

### Major Changes

- [#610](https://github.com/celo-org/developer-tooling/pull/610) [`6ca357b`](https://github.com/celo-org/developer-tooling/commit/6ca357bfbbb1075d73c2b8000e01db70959e08f5) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Remove support for --useAKV for transfer methods

### Patch Changes

- [#615](https://github.com/celo-org/developer-tooling/pull/615) [`2abf861`](https://github.com/celo-org/developer-tooling/commit/2abf8612e48eba9ef88a2bfef252ccdce8605072) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Deprecate the DKG command group

- [#615](https://github.com/celo-org/developer-tooling/pull/615) [`2abf861`](https://github.com/celo-org/developer-tooling/commit/2abf8612e48eba9ef88a2bfef252ccdce8605072) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Deprecate useAKV flag with intent to remove. This was for connecting to AzureKeyVault for storing key to sign trnsactions. We hope to streamline and remove this functionality.

- [#610](https://github.com/celo-org/developer-tooling/pull/610) [`6ca357b`](https://github.com/celo-org/developer-tooling/commit/6ca357bfbbb1075d73c2b8000e01db70959e08f5) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Refactor transfer methods to use viem internally

- Updated dependencies [[`6ca357b`](https://github.com/celo-org/developer-tooling/commit/6ca357bfbbb1075d73c2b8000e01db70959e08f5)]:
  - @celo/viem-account-ledger@1.2.0-beta.1

## 7.0.0-beta.4

### Patch Changes

- [#621](https://github.com/celo-org/developer-tooling/pull/621) [`87e6ffb`](https://github.com/celo-org/developer-tooling/commit/87e6ffb2b6381d9e171795ff65501ad9030dc278) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Migrates network:info command to use viem

- [#617](https://github.com/celo-org/developer-tooling/pull/617) [`8e76ba4`](https://github.com/celo-org/developer-tooling/commit/8e76ba4cd85cd4ecd188d50bff6a718c8dd36c8b) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - chore: Remove web3-utils and @celo/phone-number-utils dependencies

## 7.0.0-beta.3

### Patch Changes

- [#611](https://github.com/celo-org/developer-tooling/pull/611) [`9069df7`](https://github.com/celo-org/developer-tooling/commit/9069df7cf51559ccbcdd5502d045ccc1ab238199) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Migrate validator:list to viem

- [#611](https://github.com/celo-org/developer-tooling/pull/611) [`9069df7`](https://github.com/celo-org/developer-tooling/commit/9069df7cf51559ccbcdd5502d045ccc1ab238199) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Migrate validator:rpc-urls to viem, speed up due to multicall and higher concurrancy

## 7.0.0-beta.2

### Minor Changes

- [#602](https://github.com/celo-org/developer-tooling/pull/602) [`a270c1a`](https://github.com/celo-org/developer-tooling/commit/a270c1aa0c9d5b282396af8812ea9ddbcb7fec9c) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Change the behaviour of --ledgerConfirmAddress to also verify on first read if no txs are submitted in the command

### Patch Changes

- [#602](https://github.com/celo-org/developer-tooling/pull/602) [`a270c1a`](https://github.com/celo-org/developer-tooling/commit/a270c1aa0c9d5b282396af8812ea9ddbcb7fec9c) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Account:list now uses viem

- [#604](https://github.com/celo-org/developer-tooling/pull/604) [`e84bc3c`](https://github.com/celo-org/developer-tooling/commit/e84bc3c3daebcfc6b69bfb26e27cedd37ee52dea) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Multicall is now generally used where available. Election:current now runs on viem

- Updated dependencies [[`a270c1a`](https://github.com/celo-org/developer-tooling/commit/a270c1aa0c9d5b282396af8812ea9ddbcb7fec9c)]:
  - @celo/viem-account-ledger@1.2.0-beta.0
  - @celo/wallet-hsm-azure@8.0.0-beta.1
  - @celo/wallet-ledger@8.0.0-beta.1
  - @celo/wallet-local@8.0.0-beta.1
  - @celo/contractkit@10.0.0-beta.1

## 7.0.0-beta.1

### Major Changes

- [#599](https://github.com/celo-org/developer-tooling/pull/599) [`bec048f`](https://github.com/celo-org/developer-tooling/commit/bec048f2b39c620428ce62ea1e6c20f348203012) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove validator commands with L1 only usecases. set-bitmaps, signed-blocks, status, update-bls-key

- [#599](https://github.com/celo-org/developer-tooling/pull/599) [`bec048f`](https://github.com/celo-org/developer-tooling/commit/bec048f2b39c620428ce62ea1e6c20f348203012) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove bls flags from account:authorize and releasecelo:authorize commands, and validator:list/register commands

- [#599](https://github.com/celo-org/developer-tooling/pull/599) [`bec048f`](https://github.com/celo-org/developer-tooling/commit/bec048f2b39c620428ce62ea1e6c20f348203012) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove slashing flag from rewards:show (no longer relevent post L2 upgrade)

### Patch Changes

- [#599](https://github.com/celo-org/developer-tooling/pull/599) [`bec048f`](https://github.com/celo-org/developer-tooling/commit/bec048f2b39c620428ce62ea1e6c20f348203012) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix releasecelo/admin-revoke to work on L2

- [#606](https://github.com/celo-org/developer-tooling/pull/606) [`4a6da4f`](https://github.com/celo-org/developer-tooling/commit/4a6da4f443a65d5600707262d01daf1c368f5adb) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - gasCurrency flag now completely removed from config. celocli config:set no longer tries to connect to a node

- [#606](https://github.com/celo-org/developer-tooling/pull/606) [`4a6da4f`](https://github.com/celo-org/developer-tooling/commit/4a6da4f443a65d5600707262d01daf1c368f5adb) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Getting config no longer requires a node

- [#599](https://github.com/celo-org/developer-tooling/pull/599) [`bec048f`](https://github.com/celo-org/developer-tooling/commit/bec048f2b39c620428ce62ea1e6c20f348203012) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove L1 code paths

- Updated dependencies [[`66c8ad4`](https://github.com/celo-org/developer-tooling/commit/66c8ad4e1dc03fbc478cbf046bd0a9cb3712b8d8), [`66c8ad4`](https://github.com/celo-org/developer-tooling/commit/66c8ad4e1dc03fbc478cbf046bd0a9cb3712b8d8), [`66c8ad4`](https://github.com/celo-org/developer-tooling/commit/66c8ad4e1dc03fbc478cbf046bd0a9cb3712b8d8)]:
  - @celo/contractkit@10.0.0-beta.0
  - @celo/connect@7.0.0-beta.0
  - @celo/explorer@5.0.16-beta.0
  - @celo/governance@5.1.7-beta.0
  - @celo/wallet-ledger@7.0.2-beta.0
  - @celo/wallet-hsm-azure@7.0.2-beta.0
  - @celo/wallet-local@7.0.2-beta.0

## 6.3.0-beta.0

### Minor Changes

- [#531](https://github.com/celo-org/developer-tooling/pull/531) [`e1306b7`](https://github.com/celo-org/developer-tooling/commit/e1306b746fc069af86974e15b618eaba955c3774) Thanks [@shazarre](https://github.com/shazarre)! - Add epoch:status command to view information on the current epoch

### Patch Changes

- [#554](https://github.com/celo-org/developer-tooling/pull/554) [`feef9ac`](https://github.com/celo-org/developer-tooling/commit/feef9ac013e5fbf2acc3b5941a6cbd72df2825b2) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Migrate node:synced to viem

- [#531](https://github.com/celo-org/developer-tooling/pull/531) [`e1306b7`](https://github.com/celo-org/developer-tooling/commit/e1306b746fc069af86974e15b618eaba955c3774) Thanks [@shazarre](https://github.com/shazarre)! - Parts of celocli now use viem instead of contractkit/web3.

## 6.2.5

### Patch Changes

- [#589](https://github.com/celo-org/developer-tooling/pull/589) [`10ca254`](https://github.com/celo-org/developer-tooling/commit/10ca2548c2c1427f7c6a960e6cf9f571994e5269) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix incorrect insufficient balance check for transfers

## 6.2.4

### Patch Changes

- [#592](https://github.com/celo-org/developer-tooling/pull/592) [`321c56d`](https://github.com/celo-org/developer-tooling/commit/321c56d31a22291829de01f97b527ad13e1ae748) Thanks [@pahor167](https://github.com/pahor167)! - Load ineligable groups in EpochManager when switching

- Updated dependencies [[`321c56d`](https://github.com/celo-org/developer-tooling/commit/321c56d31a22291829de01f97b527ad13e1ae748)]:
  - @celo/contractkit@9.2.1

## 6.2.3

### Patch Changes

- [#590](https://github.com/celo-org/developer-tooling/pull/590) [`790cf2a`](https://github.com/celo-org/developer-tooling/commit/790cf2a32b140d4071fcce3ad84664dc22a359d8) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix bug in epoch switching

- Updated dependencies [[`790cf2a`](https://github.com/celo-org/developer-tooling/commit/790cf2a32b140d4071fcce3ad84664dc22a359d8)]:
  - @celo/contractkit@9.2.0

## 6.2.2

### Patch Changes

- [#583](https://github.com/celo-org/developer-tooling/pull/583) [`398dc75`](https://github.com/celo-org/developer-tooling/commit/398dc75b69d01a6ab83fec584a6c42905e3fc790) Thanks [@pahor167](https://github.com/pahor167)! - fixes epoch switch to use group from previous epoch not current

- Updated dependencies [[`398dc75`](https://github.com/celo-org/developer-tooling/commit/398dc75b69d01a6ab83fec584a6c42905e3fc790), [`d57c692`](https://github.com/celo-org/developer-tooling/commit/d57c6924e6a8d0a73b1a68193b417a22b803c117)]:
  - @celo/contractkit@9.1.1
  - @celo/metadata-claims@1.0.3

## 6.2.1

### Patch Changes

- [#567](https://github.com/celo-org/developer-tooling/pull/567) [`ad1f900`](https://github.com/celo-org/developer-tooling/commit/ad1f90055e88b689d0bb376a61952278f735c9e7) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - lock celo compliance version

- [#562](https://github.com/celo-org/developer-tooling/pull/562) [`086622c`](https://github.com/celo-org/developer-tooling/commit/086622c42a090c2b099338c052e53df6da18e375) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fixes issues with using celocli with specific versions of node (20.19 and 22)

## 6.2.1-beta.0

### Patch Changes

- [#567](https://github.com/celo-org/developer-tooling/pull/567) [`ad1f900`](https://github.com/celo-org/developer-tooling/commit/ad1f90055e88b689d0bb376a61952278f735c9e7) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - lock celo compliance version

- [#562](https://github.com/celo-org/developer-tooling/pull/562) [`086622c`](https://github.com/celo-org/developer-tooling/commit/086622c42a090c2b099338c052e53df6da18e375) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fixes issues with using celocli with specific versions of node (20.19 and 22)

## 6.2.0

### Minor Changes

- [#540](https://github.com/celo-org/developer-tooling/pull/540) [`a92fa0c`](https://github.com/celo-org/developer-tooling/commit/a92fa0c6471e5d2903e9e1d2508b667a7d24cf0e) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Add a check to governance:propose for the flag descriptionURL. The checks verifies that the URL points to the correct governance repository.

- [#535](https://github.com/celo-org/developer-tooling/pull/535) [`c184fb1`](https://github.com/celo-org/developer-tooling/commit/c184fb1f17666e436f5261d048c2c9884b678388) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - add lockedcelo:**_ alias for all lockedgold:_** commands

  (tiny break): network:paramamters will output the contract name LockedGold as LockedCelo now

- [#533](https://github.com/celo-org/developer-tooling/pull/533) [`549450f`](https://github.com/celo-org/developer-tooling/commit/549450f312ffa8a61f2af081df39e11c1a9d4500) Thanks [@soloseng](https://github.com/soloseng)! - added support for epochManager processGroups function to contractkit && celocli

### Patch Changes

- [#558](https://github.com/celo-org/developer-tooling/pull/558) [`f11a069`](https://github.com/celo-org/developer-tooling/commit/f11a069b152cb34c18f12b6535f4b217a631079d) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix incorrect repo link in package.json

- [#549](https://github.com/celo-org/developer-tooling/pull/549) [`b6e4716`](https://github.com/celo-org/developer-tooling/commit/b6e4716e8ea6263120fd8da964bdebba45ee4114) Thanks [@shazarre](https://github.com/shazarre)! - Hide extra output, remove feedback postrun hook

- [#532](https://github.com/celo-org/developer-tooling/pull/532) [`b4f560c`](https://github.com/celo-org/developer-tooling/commit/b4f560c17fcf100def9ca9682859a32a84f1e632) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Update oclif dependencies

- Updated dependencies [[`78f9831`](https://github.com/celo-org/developer-tooling/commit/78f9831f43b13853a32d697eb3b1626ad52ced42), [`f11a069`](https://github.com/celo-org/developer-tooling/commit/f11a069b152cb34c18f12b6535f4b217a631079d), [`c184fb1`](https://github.com/celo-org/developer-tooling/commit/c184fb1f17666e436f5261d048c2c9884b678388), [`549450f`](https://github.com/celo-org/developer-tooling/commit/549450f312ffa8a61f2af081df39e11c1a9d4500), [`170e91c`](https://github.com/celo-org/developer-tooling/commit/170e91cbdcdf6d8e398c423355b78f31d4c9e33c), [`c184fb1`](https://github.com/celo-org/developer-tooling/commit/c184fb1f17666e436f5261d048c2c9884b678388), [`55f1e99`](https://github.com/celo-org/developer-tooling/commit/55f1e99670134b5c885ee8debb22c7d370a7a11a)]:
  - @celo/contractkit@9.1.0
  - @celo/governance@5.1.6
  - @celo/base@7.0.2
  - @celo/wallet-hsm-azure@7.0.1
  - @celo/wallet-ledger@7.0.1
  - @celo/wallet-local@7.0.1
  - @celo/cryptographic-utils@5.1.3
  - @celo/metadata-claims@1.0.2
  - @celo/phone-utils@6.0.6
  - @celo/explorer@5.0.15
  - @celo/connect@6.1.2
  - @celo/utils@8.0.2

## 6.2.0-beta.1

### Minor Changes

- [#533](https://github.com/celo-org/developer-tooling/pull/533) [`549450f`](https://github.com/celo-org/developer-tooling/commit/549450f312ffa8a61f2af081df39e11c1a9d4500) Thanks [@soloseng](https://github.com/soloseng)! - added support for epochManager processGroups function to contractkit && celocli

### Patch Changes

- [#549](https://github.com/celo-org/developer-tooling/pull/549) [`b6e4716`](https://github.com/celo-org/developer-tooling/commit/b6e4716e8ea6263120fd8da964bdebba45ee4114) Thanks [@shazarre](https://github.com/shazarre)! - Hide extra output, remove feedback postrun hook

- [#532](https://github.com/celo-org/developer-tooling/pull/532) [`b4f560c`](https://github.com/celo-org/developer-tooling/commit/b4f560c17fcf100def9ca9682859a32a84f1e632) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Update oclif dependencies

- Updated dependencies [[`78f9831`](https://github.com/celo-org/developer-tooling/commit/78f9831f43b13853a32d697eb3b1626ad52ced42), [`549450f`](https://github.com/celo-org/developer-tooling/commit/549450f312ffa8a61f2af081df39e11c1a9d4500)]:
  - @celo/contractkit@9.1.0-beta.1
  - @celo/governance@5.1.6-beta.1

## 6.2.0-beta.0

### Minor Changes

- [#540](https://github.com/celo-org/developer-tooling/pull/540) [`a92fa0c`](https://github.com/celo-org/developer-tooling/commit/a92fa0c6471e5d2903e9e1d2508b667a7d24cf0e) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Add a check to governance:propose for the flag descriptionURL. The checks verifies that the URL points to the correct governance repository.

- [#535](https://github.com/celo-org/developer-tooling/pull/535) [`c184fb1`](https://github.com/celo-org/developer-tooling/commit/c184fb1f17666e436f5261d048c2c9884b678388) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - add lockedcelo:**_ alias for all lockedgold:_** commands

  (tiny break): network:paramamters will output the contract name LockedGold as LockedCelo now

### Patch Changes

- Updated dependencies [[`c184fb1`](https://github.com/celo-org/developer-tooling/commit/c184fb1f17666e436f5261d048c2c9884b678388), [`170e91c`](https://github.com/celo-org/developer-tooling/commit/170e91cbdcdf6d8e398c423355b78f31d4c9e33c), [`c184fb1`](https://github.com/celo-org/developer-tooling/commit/c184fb1f17666e436f5261d048c2c9884b678388), [`55f1e99`](https://github.com/celo-org/developer-tooling/commit/55f1e99670134b5c885ee8debb22c7d370a7a11a)]:
  - @celo/contractkit@9.1.0-beta.0
  - @celo/wallet-ledger@7.0.1-beta.0
  - @celo/governance@5.1.6-beta.0
  - @celo/explorer@5.0.15-beta.0
  - @celo/wallet-hsm-azure@7.0.1-beta.0
  - @celo/wallet-local@7.0.1-beta.0

## 6.1.0

### Minor Changes

- [#470](https://github.com/celo-org/developer-tooling/pull/470) [`770bfa4`](https://github.com/celo-org/developer-tooling/commit/770bfa47af12ce8fbe0a4884481034ca26d3b29d) Thanks [@shazarre](https://github.com/shazarre)! - Introduce `validatorgroup:rpc-urls` command to list community RPC nodes

- [#488](https://github.com/celo-org/developer-tooling/pull/488) [`07c4c78`](https://github.com/celo-org/developer-tooling/commit/07c4c7854f419dd07fbf09fe966fb5b378a139d1) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - add --derivationPath to config:set for setting global deriviationPath. Usefull when using ledger devices and when generated new accounts.

- [#511](https://github.com/celo-org/developer-tooling/pull/511) [`be62336`](https://github.com/celo-org/developer-tooling/commit/be6233688d412ff2279fb9bef2b7df7749b8f095) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Add useSafe flags for governance:propose and governance:withdraw commands

- [#488](https://github.com/celo-org/developer-tooling/pull/488) [`07c4c78`](https://github.com/celo-org/developer-tooling/commit/07c4c7854f419dd07fbf09fe966fb5b378a139d1) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Add --ledgerLiveMode flag for use with --useLedger flag. This is useful for using same addresses on celocli as LedgerLive uses.

- [#508](https://github.com/celo-org/developer-tooling/pull/508) [`8fb95c9`](https://github.com/celo-org/developer-tooling/commit/8fb95c904ee2fd96220658b067ac60193b22a2d9) Thanks [@shazarre](https://github.com/shazarre)! - Support delegation for vote signers

- [#507](https://github.com/celo-org/developer-tooling/pull/507) [`0517378`](https://github.com/celo-org/developer-tooling/commit/0517378e1160990238b4cf670e0fed841eb953ea) Thanks [@shazarre](https://github.com/shazarre)! - --useMultiSig support for governance:withdraw command

- [#510](https://github.com/celo-org/developer-tooling/pull/510) [`0d307db`](https://github.com/celo-org/developer-tooling/commit/0d307db42f4c4a221c8a30682cddc99f2012c2e2) Thanks [@shazarre](https://github.com/shazarre)! - Add `epochs:send-validator-payment` command to support sending validator, their group and delegation beneficiary allocated epoch payments

### Patch Changes

- [#497](https://github.com/celo-org/developer-tooling/pull/497) [`79cd947`](https://github.com/celo-org/developer-tooling/commit/79cd94725582be0c62133e98b922d19ed9c0b5de) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - chore: package.json link fixes

- [#492](https://github.com/celo-org/developer-tooling/pull/492) [`2e02d94`](https://github.com/celo-org/developer-tooling/commit/2e02d943adb859b3a5b71432d1d232f3dca44733) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Bump dependncies up

- [#493](https://github.com/celo-org/developer-tooling/pull/493) [`075a270`](https://github.com/celo-org/developer-tooling/commit/075a270b98c806046226ee151de4027040ae4b05) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix releasegold:transfer-dollars bug with pre run checks

- [#523](https://github.com/celo-org/developer-tooling/pull/523) [`13c4220`](https://github.com/celo-org/developer-tooling/commit/13c4220c21f1e83d9ebf01a5a19e423cbfc1acbc) Thanks [@shazarre](https://github.com/shazarre)! - Fixes EpochManager not available error for some L1 commands

- [#514](https://github.com/celo-org/developer-tooling/pull/514) [`4a1d9e7`](https://github.com/celo-org/developer-tooling/commit/4a1d9e764a67b16324da996eb73d514e4b215959) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix bug with GovernanceSlasher missing version causing failure. defend against exceptions when printing contracts info

- Updated dependencies [[`770bfa4`](https://github.com/celo-org/developer-tooling/commit/770bfa47af12ce8fbe0a4884481034ca26d3b29d), [`2e02d94`](https://github.com/celo-org/developer-tooling/commit/2e02d943adb859b3a5b71432d1d232f3dca44733), [`79cd947`](https://github.com/celo-org/developer-tooling/commit/79cd94725582be0c62133e98b922d19ed9c0b5de), [`2e02d94`](https://github.com/celo-org/developer-tooling/commit/2e02d943adb859b3a5b71432d1d232f3dca44733), [`0d307db`](https://github.com/celo-org/developer-tooling/commit/0d307db42f4c4a221c8a30682cddc99f2012c2e2), [`07c4c78`](https://github.com/celo-org/developer-tooling/commit/07c4c7854f419dd07fbf09fe966fb5b378a139d1), [`a8e5099`](https://github.com/celo-org/developer-tooling/commit/a8e50990e71f5d45522d11995836fbee820564c1), [`07c4c78`](https://github.com/celo-org/developer-tooling/commit/07c4c7854f419dd07fbf09fe966fb5b378a139d1), [`ce6a493`](https://github.com/celo-org/developer-tooling/commit/ce6a493ab6c82893595cde6a8ee9485d9bc9e033), [`07c4c78`](https://github.com/celo-org/developer-tooling/commit/07c4c7854f419dd07fbf09fe966fb5b378a139d1)]:
  - @celo/metadata-claims@1.0.1
  - @celo/wallet-hsm-azure@7.0.0
  - @celo/cryptographic-utils@5.1.2
  - @celo/utils@8.0.1
  - @celo/base@7.0.1
  - @celo/wallet-ledger@7.0.0
  - @celo/wallet-local@7.0.0
  - @celo/contractkit@9.0.1
  - @celo/phone-utils@6.0.5
  - @celo/governance@5.1.5
  - @celo/explorer@5.0.14
  - @celo/connect@6.1.1

## 6.1.0-beta.2

### Patch Changes

- [#523](https://github.com/celo-org/developer-tooling/pull/523) [`13c4220`](https://github.com/celo-org/developer-tooling/commit/13c4220c21f1e83d9ebf01a5a19e423cbfc1acbc) Thanks [@shazarre](https://github.com/shazarre)! - Fixes EpochManager not available error for some L1 commands

## 6.1.0-beta.1

### Minor Changes

- [#511](https://github.com/celo-org/developer-tooling/pull/511) [`be62336`](https://github.com/celo-org/developer-tooling/commit/be6233688d412ff2279fb9bef2b7df7749b8f095) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Add useSafe flags for governance:propose and governance:withdraw commands

- [#510](https://github.com/celo-org/developer-tooling/pull/510) [`0d307db`](https://github.com/celo-org/developer-tooling/commit/0d307db42f4c4a221c8a30682cddc99f2012c2e2) Thanks [@shazarre](https://github.com/shazarre)! - Add `epochs:send-validator-payment` command to support sending validator, their group and delegation beneficiary allocated epoch payments

### Patch Changes

- [#514](https://github.com/celo-org/developer-tooling/pull/514) [`4a1d9e7`](https://github.com/celo-org/developer-tooling/commit/4a1d9e764a67b16324da996eb73d514e4b215959) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix bug with GovernanceSlasher missing version causing failure. defend against exceptions when printing contracts info

- Updated dependencies [[`0d307db`](https://github.com/celo-org/developer-tooling/commit/0d307db42f4c4a221c8a30682cddc99f2012c2e2), [`a8e5099`](https://github.com/celo-org/developer-tooling/commit/a8e50990e71f5d45522d11995836fbee820564c1)]:
  - @celo/contractkit@9.0.1-beta.1
  - @celo/wallet-ledger@7.0.0-beta.1
  - @celo/wallet-hsm-azure@7.0.0-beta.1
  - @celo/wallet-local@7.0.0-beta.1

## 6.1.0-beta.0

### Minor Changes

- [#470](https://github.com/celo-org/developer-tooling/pull/470) [`770bfa4`](https://github.com/celo-org/developer-tooling/commit/770bfa47af12ce8fbe0a4884481034ca26d3b29d) Thanks [@shazarre](https://github.com/shazarre)! - Introduce `validatorgroup:rpc-urls` command to list community RPC nodes

- [#488](https://github.com/celo-org/developer-tooling/pull/488) [`07c4c78`](https://github.com/celo-org/developer-tooling/commit/07c4c7854f419dd07fbf09fe966fb5b378a139d1) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - add --derivationPath to config:set for setting global deriviationPath. Usefull when using ledger devices and when generated new accounts.

- [#488](https://github.com/celo-org/developer-tooling/pull/488) [`07c4c78`](https://github.com/celo-org/developer-tooling/commit/07c4c7854f419dd07fbf09fe966fb5b378a139d1) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Add --ledgerLiveMode flag for use with --useLedger flag. This is useful for using same addresses on celocli as LedgerLive uses.

- [#508](https://github.com/celo-org/developer-tooling/pull/508) [`8fb95c9`](https://github.com/celo-org/developer-tooling/commit/8fb95c904ee2fd96220658b067ac60193b22a2d9) Thanks [@shazarre](https://github.com/shazarre)! - Support delegation for vote signers

- [#507](https://github.com/celo-org/developer-tooling/pull/507) [`0517378`](https://github.com/celo-org/developer-tooling/commit/0517378e1160990238b4cf670e0fed841eb953ea) Thanks [@shazarre](https://github.com/shazarre)! - --useMultiSig support for governance:withdraw command

### Patch Changes

- [#497](https://github.com/celo-org/developer-tooling/pull/497) [`79cd947`](https://github.com/celo-org/developer-tooling/commit/79cd94725582be0c62133e98b922d19ed9c0b5de) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - chore: package.json link fixes

- [#492](https://github.com/celo-org/developer-tooling/pull/492) [`2e02d94`](https://github.com/celo-org/developer-tooling/commit/2e02d943adb859b3a5b71432d1d232f3dca44733) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Bump dependncies up

- [#493](https://github.com/celo-org/developer-tooling/pull/493) [`075a270`](https://github.com/celo-org/developer-tooling/commit/075a270b98c806046226ee151de4027040ae4b05) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix releasegold:transfer-dollars bug with pre run checks

- Updated dependencies [[`770bfa4`](https://github.com/celo-org/developer-tooling/commit/770bfa47af12ce8fbe0a4884481034ca26d3b29d), [`2e02d94`](https://github.com/celo-org/developer-tooling/commit/2e02d943adb859b3a5b71432d1d232f3dca44733), [`79cd947`](https://github.com/celo-org/developer-tooling/commit/79cd94725582be0c62133e98b922d19ed9c0b5de), [`2e02d94`](https://github.com/celo-org/developer-tooling/commit/2e02d943adb859b3a5b71432d1d232f3dca44733), [`07c4c78`](https://github.com/celo-org/developer-tooling/commit/07c4c7854f419dd07fbf09fe966fb5b378a139d1), [`07c4c78`](https://github.com/celo-org/developer-tooling/commit/07c4c7854f419dd07fbf09fe966fb5b378a139d1), [`07c4c78`](https://github.com/celo-org/developer-tooling/commit/07c4c7854f419dd07fbf09fe966fb5b378a139d1)]:
  - @celo/metadata-claims@1.0.1-beta.0
  - @celo/wallet-hsm-azure@7.0.0-beta.0
  - @celo/cryptographic-utils@5.1.2-beta.0
  - @celo/utils@8.0.1-beta.0
  - @celo/base@7.0.1-beta.0
  - @celo/wallet-ledger@7.0.0-beta.0
  - @celo/wallet-local@7.0.0-beta.0
  - @celo/contractkit@9.0.1-beta.0
  - @celo/phone-utils@6.0.5-beta.0
  - @celo/governance@5.1.5-beta.0
  - @celo/explorer@5.0.14-beta.0
  - @celo/connect@6.1.1-beta.0

## 6.0.0

### Major Changes

- [#407](https://github.com/celo-org/developer-tooling/pull/407) [`3890220`](https://github.com/celo-org/developer-tooling/commit/389022056be15c0677b37d4cfaf332afcb652e02) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove transfer:gold -- this was an old alias for transfer:celo which has the same functionality

- [#412](https://github.com/celo-org/developer-tooling/pull/412) [`23d36cc`](https://github.com/celo-org/developer-tooling/commit/23d36cc7f843fdf95a88da0515c65e512d68f400) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove `celocli validator:force-deaffiliate`

  This command was only ever usable pre mainnet launch. The force deaffiliate method it would call is only callable by one of the whitelisted Slasher Contracts.

  To force removal of validator with poor uptime use `celocli validator:downtime-slash` or to sever association with a validator from your group use `celocli validator:deaffiliate`

- [#339](https://github.com/celo-org/developer-tooling/pull/339) [`87223ba`](https://github.com/celo-org/developer-tooling/commit/87223ba93ab79f43ae6884282d30a420eb09c23c) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove support for reserve:\* commands. As foretold by https://forum.celo.org/t/sunset-of-reserve-commands/8454

- [#407](https://github.com/celo-org/developer-tooling/pull/407) [`3890220`](https://github.com/celo-org/developer-tooling/commit/389022056be15c0677b37d4cfaf332afcb652e02) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove account:recover-old

  This was meant to be a temporary command for migrating account from a beta version of Valora to the release version. Please use a previous version of celocli if you need to make this one time recovery.

- [#343](https://github.com/celo-org/developer-tooling/pull/343) [`54741cc`](https://github.com/celo-org/developer-tooling/commit/54741cc01ef0a6716bdd45a955ac65c7ecced6c1) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove commands identity:identifier, identity:get-attestations

  See https://forum.celo.org/t/rfc-deprecation-of-celocli-identity-commands/8676

### Minor Changes

- [#420](https://github.com/celo-org/developer-tooling/pull/420) [`fb08485`](https://github.com/celo-org/developer-tooling/commit/fb08485ae337e796a442b781632ae2123c4f4444) Thanks [@shazarre](https://github.com/shazarre)! - Adds support for safe integration for L2 hotfix security council approvals

- [#429](https://github.com/celo-org/developer-tooling/pull/429) [`5b02036`](https://github.com/celo-org/developer-tooling/commit/5b0203634e14697ffbe1e93491bf7c35bbf1ef52) Thanks [@shazarre](https://github.com/shazarre)! - Removes L2 BLS keys support for account:authorize

- [#447](https://github.com/celo-org/developer-tooling/pull/447) [`7bc05c2`](https://github.com/celo-org/developer-tooling/commit/7bc05c219c7c3bbb764b4741595c57da523bb388) Thanks [@shazarre](https://github.com/shazarre)! - validator:signed-blocks not supported on L2 anymore, fixes validator:status L2

- [#471](https://github.com/celo-org/developer-tooling/pull/471) [`26b9779`](https://github.com/celo-org/developer-tooling/commit/26b9779071ecb0283644412587d5a6d8bd6fd5a0) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - For `account:new` command add alias "celoLegacy" to the `--derivationPath` flag

- [#459](https://github.com/celo-org/developer-tooling/pull/459) [`0e559c7`](https://github.com/celo-org/developer-tooling/commit/0e559c73f1d0dee80ee01e9ddd38481a3a8e10b1) Thanks [@shazarre](https://github.com/shazarre)! - Introduces a new command `account:claim-rpc-url` allowing to claim RPC URLs

- [`76045eb`](https://github.com/celo-org/developer-tooling/commit/76045ebff0df9c1c9fa75121dab4e910c9026976) Thanks [@shazarre](https://github.com/shazarre)! - BLS keys are now optional as being deprecated on L2, validator:register and releasecelo:authorize no longer require them in L2 context

### Patch Changes

- [#421](https://github.com/celo-org/developer-tooling/pull/421) [`7d42a05`](https://github.com/celo-org/developer-tooling/commit/7d42a059f1effa8953ee1fe2e66f7e26bca73181) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - fix governance:build-proposal with contracts from mento or which use solidity 0.8

- [#463](https://github.com/celo-org/developer-tooling/pull/463) [`eba89a3`](https://github.com/celo-org/developer-tooling/commit/eba89a3102706cfe6492b0dc44f583a36d320a15) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Add GovernanceSlasher to RegisteredContractsEnum

- [#389](https://github.com/celo-org/developer-tooling/pull/389) [`5a0a922`](https://github.com/celo-org/developer-tooling/commit/5a0a922f4965336849b33d5f90234766db55b2e5) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Add warning that ETH derivation path will be the default in a future major breaking change.

- [#425](https://github.com/celo-org/developer-tooling/pull/425) [`952bc81`](https://github.com/celo-org/developer-tooling/commit/952bc81dc1bdd4c7abb40306768c50b75e681733) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - deprecates the flags --whitelisters and --nonwhitelisters from the governance:show command

- [#456](https://github.com/celo-org/developer-tooling/pull/456) [`d5c9204`](https://github.com/celo-org/developer-tooling/commit/d5c920491b2b6efec5f4637a4343bfb6f606c56f) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Fix rewards:show for L2

- [#472](https://github.com/celo-org/developer-tooling/pull/472) [`1df8688`](https://github.com/celo-org/developer-tooling/commit/1df86886f953910026a8fd0d7d4d60967dca780b) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Dont show flags for privateKey, gasCurrency, useLedger, and related flags in help for commands which dont actually make use of them.

- [#395](https://github.com/celo-org/developer-tooling/pull/395) [`693f6e7`](https://github.com/celo-org/developer-tooling/commit/693f6e7d2fe3034b6d7a3bc4a9719e76229d1981) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix incorrect message where the transfered token was used as gas token in the messaging but not in actuality

- [#395](https://github.com/celo-org/developer-tooling/pull/395) [`693f6e7`](https://github.com/celo-org/developer-tooling/commit/693f6e7d2fe3034b6d7a3bc4a9719e76229d1981) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix Transfering, exchanging cusd (and other fee tokens) and or using gasCurrency flag with ledger devices prior to 1.2

- [#471](https://github.com/celo-org/developer-tooling/pull/471) [`26b9779`](https://github.com/celo-org/developer-tooling/commit/26b9779071ecb0283644412587d5a6d8bd6fd5a0) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - when account:new is called it displays the full bip44 derivation path in the output. Before it would miss the last 2 positions.

- [#480](https://github.com/celo-org/developer-tooling/pull/480) [`b83d8c4`](https://github.com/celo-org/developer-tooling/commit/b83d8c4bd34feebdc4994dbbae198a1aa5b7eb34) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Recommended node version is now node 20

- [#452](https://github.com/celo-org/developer-tooling/pull/452) [`2283374`](https://github.com/celo-org/developer-tooling/commit/2283374d74b2260c3cc81d19500502f6e6b685cd) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Show deprecated warning on flags which will be removed after cel2 launch

- [#389](https://github.com/celo-org/developer-tooling/pull/389) [`5a0a922`](https://github.com/celo-org/developer-tooling/commit/5a0a922f4965336849b33d5f90234766db55b2e5) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix: account:new can now be called without a node

- [#449](https://github.com/celo-org/developer-tooling/pull/449) [`97f0a53`](https://github.com/celo-org/developer-tooling/commit/97f0a53cab5162365be0c175361943351cf4eb2f) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Show --node and --useLedger flags when --help is called. Show aliases for networks in --node help

- [#452](https://github.com/celo-org/developer-tooling/pull/452) [`2283374`](https://github.com/celo-org/developer-tooling/commit/2283374d74b2260c3cc81d19500502f6e6b685cd) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - use onchain values instead of static for lock requirements

- [#450](https://github.com/celo-org/developer-tooling/pull/450) [`9558b56`](https://github.com/celo-org/developer-tooling/commit/9558b56aff2886fb860194a04fd284b4caca74dc) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Gracefully throw if --estimate wasnt passed on L1

- [#427](https://github.com/celo-org/developer-tooling/pull/427) [`ee33677`](https://github.com/celo-org/developer-tooling/commit/ee33677287905076daafe39087283fe2434d729e) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Change a dependency to use npm rather than github

- Updated dependencies [[`eba89a3`](https://github.com/celo-org/developer-tooling/commit/eba89a3102706cfe6492b0dc44f583a36d320a15), [`43e8474`](https://github.com/celo-org/developer-tooling/commit/43e8474ecd245af3ec1e3d28f45d2de211e481e2), [`693f6e7`](https://github.com/celo-org/developer-tooling/commit/693f6e7d2fe3034b6d7a3bc4a9719e76229d1981), [`7d42a05`](https://github.com/celo-org/developer-tooling/commit/7d42a059f1effa8953ee1fe2e66f7e26bca73181), [`c4b9c6d`](https://github.com/celo-org/developer-tooling/commit/c4b9c6d60bf938950007a67df4e7c8ec35066fb3), [`7bc05c2`](https://github.com/celo-org/developer-tooling/commit/7bc05c219c7c3bbb764b4741595c57da523bb388), [`5a0a922`](https://github.com/celo-org/developer-tooling/commit/5a0a922f4965336849b33d5f90234766db55b2e5), [`0e559c7`](https://github.com/celo-org/developer-tooling/commit/0e559c73f1d0dee80ee01e9ddd38481a3a8e10b1), [`33ad4aa`](https://github.com/celo-org/developer-tooling/commit/33ad4aaf6b9edc33d1ce19833dbea626798cfb88), [`d988d31`](https://github.com/celo-org/developer-tooling/commit/d988d317582daed57bf05a4c4d9d087e5e732f0d), [`42d091f`](https://github.com/celo-org/developer-tooling/commit/42d091fbc2ab71ce4ec2fb5c57ca266a20a96b6e), [`b83d8c4`](https://github.com/celo-org/developer-tooling/commit/b83d8c4bd34feebdc4994dbbae198a1aa5b7eb34), [`36c4369`](https://github.com/celo-org/developer-tooling/commit/36c436980583396ca407fef511942c9a77279470), [`4ef76eb`](https://github.com/celo-org/developer-tooling/commit/4ef76eb174454f60304080d0ef63a859cd8d931b), [`76045eb`](https://github.com/celo-org/developer-tooling/commit/76045ebff0df9c1c9fa75121dab4e910c9026976), [`38fe4d0`](https://github.com/celo-org/developer-tooling/commit/38fe4d018d1b9ed5954a17501bdaa59b0aeec2f2), [`26b9779`](https://github.com/celo-org/developer-tooling/commit/26b9779071ecb0283644412587d5a6d8bd6fd5a0), [`33ad4aa`](https://github.com/celo-org/developer-tooling/commit/33ad4aaf6b9edc33d1ce19833dbea626798cfb88), [`b366827`](https://github.com/celo-org/developer-tooling/commit/b3668273f0ae1ac4363d0fa6f23de089d18dd77c), [`a23246e`](https://github.com/celo-org/developer-tooling/commit/a23246e82e17424cb22c04cce197eb84a2cac54c), [`fb08485`](https://github.com/celo-org/developer-tooling/commit/fb08485ae337e796a442b781632ae2123c4f4444), [`7d42a05`](https://github.com/celo-org/developer-tooling/commit/7d42a059f1effa8953ee1fe2e66f7e26bca73181), [`ee33677`](https://github.com/celo-org/developer-tooling/commit/ee33677287905076daafe39087283fe2434d729e), [`d5c9204`](https://github.com/celo-org/developer-tooling/commit/d5c920491b2b6efec5f4637a4343bfb6f606c56f)]:
  - @celo/contractkit@9.0.0
  - @celo/governance@5.1.4
  - @celo/wallet-ledger@6.0.4
  - @celo/wallet-hsm-azure@6.0.4
  - @celo/wallet-local@6.0.4
  - @celo/cryptographic-utils@5.1.1
  - @celo/metadata-claims@1.0.0
  - @celo/base@7.0.0
  - @celo/utils@8.0.0
  - @celo/connect@6.1.0
  - @celo/explorer@5.0.13
  - @celo/phone-utils@6.0.4

## 6.0.0-beta.7

### Minor Changes

- [#471](https://github.com/celo-org/developer-tooling/pull/471) [`26b9779`](https://github.com/celo-org/developer-tooling/commit/26b9779071ecb0283644412587d5a6d8bd6fd5a0) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - For `account:new` command add alias "celoLegacy" to the `--derivationPath` flag

### Patch Changes

- [#471](https://github.com/celo-org/developer-tooling/pull/471) [`26b9779`](https://github.com/celo-org/developer-tooling/commit/26b9779071ecb0283644412587d5a6d8bd6fd5a0) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - when account:new is called it displays the full bip44 derivation path in the output. Before it would miss the last 2 positions.

- [#480](https://github.com/celo-org/developer-tooling/pull/480) [`b83d8c4`](https://github.com/celo-org/developer-tooling/commit/b83d8c4bd34feebdc4994dbbae198a1aa5b7eb34) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Recommended node version is now node 20

- Updated dependencies [[`b83d8c4`](https://github.com/celo-org/developer-tooling/commit/b83d8c4bd34feebdc4994dbbae198a1aa5b7eb34), [`26b9779`](https://github.com/celo-org/developer-tooling/commit/26b9779071ecb0283644412587d5a6d8bd6fd5a0)]:
  - @celo/contractkit@9.0.0-beta.5
  - @celo/base@7.0.0-beta.1

## 6.0.0-beta.6

### Patch Changes

- [#472](https://github.com/celo-org/developer-tooling/pull/472) [`1df8688`](https://github.com/celo-org/developer-tooling/commit/1df86886f953910026a8fd0d7d4d60967dca780b) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Dont show flags for privateKey, gasCurrency, useLedger, and related flags in help for commands which dont actually make use of them.

- Updated dependencies [[`b366827`](https://github.com/celo-org/developer-tooling/commit/b3668273f0ae1ac4363d0fa6f23de089d18dd77c)]:
  - @celo/metadata-claims@1.0.0-beta.2

## 6.0.0-beta.5

### Minor Changes

- [#459](https://github.com/celo-org/developer-tooling/pull/459) [`0e559c7`](https://github.com/celo-org/developer-tooling/commit/0e559c73f1d0dee80ee01e9ddd38481a3a8e10b1) Thanks [@shazarre](https://github.com/shazarre)! - Introduces a new command `account:claim-rpc-url` allowing to claim RPC URLs

### Patch Changes

- [#463](https://github.com/celo-org/developer-tooling/pull/463) [`eba89a3`](https://github.com/celo-org/developer-tooling/commit/eba89a3102706cfe6492b0dc44f583a36d320a15) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Add GovernanceSlasher to RegisteredContractsEnum

- Updated dependencies [[`eba89a3`](https://github.com/celo-org/developer-tooling/commit/eba89a3102706cfe6492b0dc44f583a36d320a15), [`43e8474`](https://github.com/celo-org/developer-tooling/commit/43e8474ecd245af3ec1e3d28f45d2de211e481e2), [`0e559c7`](https://github.com/celo-org/developer-tooling/commit/0e559c73f1d0dee80ee01e9ddd38481a3a8e10b1)]:
  - @celo/contractkit@9.0.0-beta.4
  - @celo/governance@5.1.4-beta.3
  - @celo/metadata-claims@1.0.0-beta.1

## 6.0.0-beta.4

### Minor Changes

- [#447](https://github.com/celo-org/developer-tooling/pull/447) [`7bc05c2`](https://github.com/celo-org/developer-tooling/commit/7bc05c219c7c3bbb764b4741595c57da523bb388) Thanks [@shazarre](https://github.com/shazarre)! - validator:signed-blocks not supported on L2 anymore, fixes validator:status L2

### Patch Changes

- [#425](https://github.com/celo-org/developer-tooling/pull/425) [`952bc81`](https://github.com/celo-org/developer-tooling/commit/952bc81dc1bdd4c7abb40306768c50b75e681733) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - deprecates the flags --whitelisters and --nonwhitelisters from the governance:show command

- [#456](https://github.com/celo-org/developer-tooling/pull/456) [`d5c9204`](https://github.com/celo-org/developer-tooling/commit/d5c920491b2b6efec5f4637a4343bfb6f606c56f) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Fix rewards:show for L2

- [#452](https://github.com/celo-org/developer-tooling/pull/452) [`2283374`](https://github.com/celo-org/developer-tooling/commit/2283374d74b2260c3cc81d19500502f6e6b685cd) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Show deprecated warning on flags which will be removed after cel2 launch

- [#449](https://github.com/celo-org/developer-tooling/pull/449) [`97f0a53`](https://github.com/celo-org/developer-tooling/commit/97f0a53cab5162365be0c175361943351cf4eb2f) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Show --node and --useLedger flags when --help is called. Show aliases for networks in --node help

- [#452](https://github.com/celo-org/developer-tooling/pull/452) [`2283374`](https://github.com/celo-org/developer-tooling/commit/2283374d74b2260c3cc81d19500502f6e6b685cd) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - use onchain values instead of static for lock requirements

- [#450](https://github.com/celo-org/developer-tooling/pull/450) [`9558b56`](https://github.com/celo-org/developer-tooling/commit/9558b56aff2886fb860194a04fd284b4caca74dc) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Gracefully throw if --estimate wasnt passed on L1

- Updated dependencies [[`7bc05c2`](https://github.com/celo-org/developer-tooling/commit/7bc05c219c7c3bbb764b4741595c57da523bb388), [`42d091f`](https://github.com/celo-org/developer-tooling/commit/42d091fbc2ab71ce4ec2fb5c57ca266a20a96b6e), [`36c4369`](https://github.com/celo-org/developer-tooling/commit/36c436980583396ca407fef511942c9a77279470), [`a23246e`](https://github.com/celo-org/developer-tooling/commit/a23246e82e17424cb22c04cce197eb84a2cac54c), [`d5c9204`](https://github.com/celo-org/developer-tooling/commit/d5c920491b2b6efec5f4637a4343bfb6f606c56f)]:
  - @celo/contractkit@9.0.0-beta.3
  - @celo/governance@5.1.4-beta.2
  - @celo/wallet-ledger@6.0.4-beta.1
  - @celo/wallet-hsm-azure@6.0.4-beta.1
  - @celo/wallet-local@6.0.4-beta.1

## 6.0.0-beta.3

### Minor Changes

- [#420](https://github.com/celo-org/developer-tooling/pull/420) [`fb08485`](https://github.com/celo-org/developer-tooling/commit/fb08485ae337e796a442b781632ae2123c4f4444) Thanks [@shazarre](https://github.com/shazarre)! - Adds support for safe integration for L2 hotfix security council approvals

- [#429](https://github.com/celo-org/developer-tooling/pull/429) [`5b02036`](https://github.com/celo-org/developer-tooling/commit/5b0203634e14697ffbe1e93491bf7c35bbf1ef52) Thanks [@shazarre](https://github.com/shazarre)! - Removes L2 BLS keys support for account:authorize

### Patch Changes

- [#421](https://github.com/celo-org/developer-tooling/pull/421) [`7d42a05`](https://github.com/celo-org/developer-tooling/commit/7d42a059f1effa8953ee1fe2e66f7e26bca73181) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - fix governance:build-proposal with contracts from mento or which use solidity 0.8

- Updated dependencies [[`7d42a05`](https://github.com/celo-org/developer-tooling/commit/7d42a059f1effa8953ee1fe2e66f7e26bca73181), [`c4b9c6d`](https://github.com/celo-org/developer-tooling/commit/c4b9c6d60bf938950007a67df4e7c8ec35066fb3), [`fb08485`](https://github.com/celo-org/developer-tooling/commit/fb08485ae337e796a442b781632ae2123c4f4444), [`7d42a05`](https://github.com/celo-org/developer-tooling/commit/7d42a059f1effa8953ee1fe2e66f7e26bca73181)]:
  - @celo/governance@5.1.4-beta.1
  - @celo/wallet-hsm-azure@6.0.3-beta.1
  - @celo/wallet-ledger@6.0.3-beta.1
  - @celo/wallet-local@6.0.3-beta.1
  - @celo/connect@6.1.0-beta.1
  - @celo/contractkit@9.0.0-beta.2
  - @celo/explorer@5.0.13-beta.1

## 6.0.0-beta.2

### Patch Changes

- [#427](https://github.com/celo-org/developer-tooling/pull/427) [`ee33677`](https://github.com/celo-org/developer-tooling/commit/ee33677287905076daafe39087283fe2434d729e) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Change a dependency to use npm rather than github

- Updated dependencies [[`ee33677`](https://github.com/celo-org/developer-tooling/commit/ee33677287905076daafe39087283fe2434d729e)]:
  - @celo/wallet-ledger@6.0.2-beta.2
  - @celo/wallet-hsm-azure@6.0.2-beta.2
  - @celo/wallet-local@6.0.2-beta.2

## 6.0.0-beta.1

### Major Changes

- [#407](https://github.com/celo-org/developer-tooling/pull/407) [`3890220`](https://github.com/celo-org/developer-tooling/commit/389022056be15c0677b37d4cfaf332afcb652e02) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove transfer:gold -- this was an old alias for transfer:celo which has the same functionality

- [#412](https://github.com/celo-org/developer-tooling/pull/412) [`23d36cc`](https://github.com/celo-org/developer-tooling/commit/23d36cc7f843fdf95a88da0515c65e512d68f400) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove `celocli validator:force-deaffiliate`

  This command was only ever usable pre mainnet launch. The force deaffiliate method it would call is only callable by one of the whitelisted Slasher Contracts.

  To force removal of validator with poor uptime use `celocli validator:downtime-slash` or to sever association with a validator from your group use `celocli validator:deaffiliate`

- [#407](https://github.com/celo-org/developer-tooling/pull/407) [`3890220`](https://github.com/celo-org/developer-tooling/commit/389022056be15c0677b37d4cfaf332afcb652e02) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove account:recover-old

  This was meant to be a temporary command for migrating account from a beta version of Valora to the release version. Please use a previous version of celocli if you need to make this one time recovery.

### Minor Changes

- [`76045eb`](https://github.com/celo-org/developer-tooling/commit/76045ebff0df9c1c9fa75121dab4e910c9026976) Thanks [@shazarre](https://github.com/shazarre)! - BLS keys are now optional as being deprecated on L2, validator:register and releasecelo:authorize no longer require them in L2 context

### Patch Changes

- Updated dependencies [[`d988d31`](https://github.com/celo-org/developer-tooling/commit/d988d317582daed57bf05a4c4d9d087e5e732f0d), [`76045eb`](https://github.com/celo-org/developer-tooling/commit/76045ebff0df9c1c9fa75121dab4e910c9026976), [`38fe4d0`](https://github.com/celo-org/developer-tooling/commit/38fe4d018d1b9ed5954a17501bdaa59b0aeec2f2)]:
  - @celo/wallet-ledger@6.0.2-beta.1
  - @celo/wallet-local@6.0.2-beta.1
  - @celo/contractkit@9.0.0-beta.1
  - @celo/wallet-hsm-azure@6.0.2-beta.1

## 6.0.0-beta.0

### Major Changes

- [#339](https://github.com/celo-org/developer-tooling/pull/339) [`87223ba`](https://github.com/celo-org/developer-tooling/commit/87223ba93ab79f43ae6884282d30a420eb09c23c) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove support for reserve:\* commands. As foretold by https://forum.celo.org/t/sunset-of-reserve-commands/8454

- [#343](https://github.com/celo-org/developer-tooling/pull/343) [`54741cc`](https://github.com/celo-org/developer-tooling/commit/54741cc01ef0a6716bdd45a955ac65c7ecced6c1) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove commands identity:identifier, identity:get-attestations

  See https://forum.celo.org/t/rfc-deprecation-of-celocli-identity-commands/8676

### Patch Changes

- [#389](https://github.com/celo-org/developer-tooling/pull/389) [`5a0a922`](https://github.com/celo-org/developer-tooling/commit/5a0a922f4965336849b33d5f90234766db55b2e5) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Add warning that ETH derivation path will be the default in a future major breaking change.

- [#395](https://github.com/celo-org/developer-tooling/pull/395) [`693f6e7`](https://github.com/celo-org/developer-tooling/commit/693f6e7d2fe3034b6d7a3bc4a9719e76229d1981) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix incorrect message where the transfered token was used as gas token in the messaging but not in actuality

- [#395](https://github.com/celo-org/developer-tooling/pull/395) [`693f6e7`](https://github.com/celo-org/developer-tooling/commit/693f6e7d2fe3034b6d7a3bc4a9719e76229d1981) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix Transfering, exchanging cusd (and other fee tokens) and or using gasCurrency flag with ledger devices prior to 1.2

- [#389](https://github.com/celo-org/developer-tooling/pull/389) [`5a0a922`](https://github.com/celo-org/developer-tooling/commit/5a0a922f4965336849b33d5f90234766db55b2e5) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix: account:new can now be called without a node

- Updated dependencies [[`693f6e7`](https://github.com/celo-org/developer-tooling/commit/693f6e7d2fe3034b6d7a3bc4a9719e76229d1981), [`5a0a922`](https://github.com/celo-org/developer-tooling/commit/5a0a922f4965336849b33d5f90234766db55b2e5), [`33ad4aa`](https://github.com/celo-org/developer-tooling/commit/33ad4aaf6b9edc33d1ce19833dbea626798cfb88), [`4ef76eb`](https://github.com/celo-org/developer-tooling/commit/4ef76eb174454f60304080d0ef63a859cd8d931b), [`33ad4aa`](https://github.com/celo-org/developer-tooling/commit/33ad4aaf6b9edc33d1ce19833dbea626798cfb88)]:
  - @celo/wallet-ledger@6.0.2-beta.0
  - @celo/cryptographic-utils@5.1.1-beta.0
  - @celo/contractkit@9.0.0-beta.0
  - @celo/base@7.0.0-beta.0
  - @celo/utils@8.0.0-beta.0
  - @celo/metadata-claims@1.0.0-beta.0
  - @celo/explorer@5.0.13-beta.0
  - @celo/governance@5.1.4-beta.0
  - @celo/connect@6.0.3-beta.0
  - @celo/phone-utils@6.0.4-beta.0
  - @celo/wallet-hsm-azure@6.0.2-beta.0
  - @celo/wallet-local@6.0.2-beta.0

## 5.2.2

### Patch Changes

- [#396](https://github.com/celo-org/developer-tooling/pull/396) [`d58929c`](https://github.com/celo-org/developer-tooling/commit/d58929c5160b334cb91b109645381aa49fa76011) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix incorrect message where the transfered token was used as gas token in the messaging but not in actuality

- [#396](https://github.com/celo-org/developer-tooling/pull/396) [`d58929c`](https://github.com/celo-org/developer-tooling/commit/d58929c5160b334cb91b109645381aa49fa76011) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix Transfering, exchanging cusd (and other fee tokens) and or using gasCurrency flag with ledger devices prior to 1.2

- Updated dependencies [[`d58929c`](https://github.com/celo-org/developer-tooling/commit/d58929c5160b334cb91b109645381aa49fa76011)]:
  - @celo/wallet-ledger@6.0.2
  - @celo/wallet-hsm-azure@6.0.2
  - @celo/wallet-local@6.0.2

## 5.2.1

### Patch Changes

- [#348](https://github.com/celo-org/developer-tooling/pull/348) [`76d09b7`](https://github.com/celo-org/developer-tooling/commit/76d09b79c68cbb5aba38c0b36a5322384b7842ba) Thanks [@shazarre](https://github.com/shazarre)! - Fix network:info command when in L2

- Updated dependencies [[`433b70e`](https://github.com/celo-org/developer-tooling/commit/433b70e20563e3e087cc39d744f1a2710d1d09de), [`76d09b7`](https://github.com/celo-org/developer-tooling/commit/76d09b79c68cbb5aba38c0b36a5322384b7842ba)]:
  - @celo/connect@6.0.2
  - @celo/contractkit@8.3.0

## 5.2.0

### Minor Changes

- [#334](https://github.com/celo-org/developer-tooling/pull/334) [`7400467`](https://github.com/celo-org/developer-tooling/commit/740046755f5079cb1dafdb71fcc92cc4ad213eb9) Thanks [@pahor167](https://github.com/pahor167)! - Adds epochs:start epochs:switch & epochs:finish commands

### Patch Changes

- [#338](https://github.com/celo-org/developer-tooling/pull/338) [`717809e`](https://github.com/celo-org/developer-tooling/commit/717809e81cedf17048d524dc7603473fbb11e22c) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix printing of values that should be ordered numerically

- [#336](https://github.com/celo-org/developer-tooling/pull/336) [`f5e0101`](https://github.com/celo-org/developer-tooling/commit/f5e010193bbf23a1da170c76bc21b1953b58fcc5) Thanks [@shazarre](https://github.com/shazarre)! - Added a link to create an issue when an error occurs

- Updated dependencies [[`7400467`](https://github.com/celo-org/developer-tooling/commit/740046755f5079cb1dafdb71fcc92cc4ad213eb9)]:
  - @celo/contractkit@8.2.0

## 5.1.1

### Patch Changes

- [#315](https://github.com/celo-org/developer-tooling/pull/315) [`dd67b8f`](https://github.com/celo-org/developer-tooling/commit/dd67b8f7e65285d86af277c1172e760f250abd78) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - chore: bump oclif

- [#275](https://github.com/celo-org/developer-tooling/pull/275) [`ac736ff`](https://github.com/celo-org/developer-tooling/commit/ac736ff5d1c5cb5457d4c3a856bf75675841b379) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - network:whitelist now outputs as a table accepting typical table formatting flags such as --csv

- [#316](https://github.com/celo-org/developer-tooling/pull/316) [`d245703`](https://github.com/celo-org/developer-tooling/commit/d245703fa71ad24c88982fc6566e4d2865f586a4) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - fix: Change transfer:celo to use native sendTransaction to save up on gas costs as well as better decoding on ledger

- [#313](https://github.com/celo-org/developer-tooling/pull/313) [`7715590`](https://github.com/celo-org/developer-tooling/commit/7715590b3efda1eb39a2600ffc858905265f5d12) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - chore: Deprecate reserve commands see https://forum.celo.org/t/sunset-of-reserve-commands/8454

- [#315](https://github.com/celo-org/developer-tooling/pull/315) [`dd67b8f`](https://github.com/celo-org/developer-tooling/commit/dd67b8f7e65285d86af277c1172e760f250abd78) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - chore: Upgrade mento packages. version before was accidentally trying to use a dev dependency. (fix husky not installed on install error)

- Updated dependencies [[`dd67b8f`](https://github.com/celo-org/developer-tooling/commit/dd67b8f7e65285d86af277c1172e760f250abd78), [`d245703`](https://github.com/celo-org/developer-tooling/commit/d245703fa71ad24c88982fc6566e4d2865f586a4)]:
  - @celo/contractkit@8.1.1
  - @celo/connect@6.0.1
  - @celo/explorer@5.0.12
  - @celo/wallet-hsm-azure@6.0.1
  - @celo/wallet-ledger@6.0.1
  - @celo/wallet-local@6.0.1
  - @celo/governance@5.1.3

## 5.1.1-beta.0

### Patch Changes

- [#315](https://github.com/celo-org/developer-tooling/pull/315) [`dd67b8f`](https://github.com/celo-org/developer-tooling/commit/dd67b8f7e65285d86af277c1172e760f250abd78) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - chore: bump oclif

- [#275](https://github.com/celo-org/developer-tooling/pull/275) [`ac736ff`](https://github.com/celo-org/developer-tooling/commit/ac736ff5d1c5cb5457d4c3a856bf75675841b379) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - network:whitelist now outputs as a table accepting typical table formatting flags such as --csv

- [#316](https://github.com/celo-org/developer-tooling/pull/316) [`d245703`](https://github.com/celo-org/developer-tooling/commit/d245703fa71ad24c88982fc6566e4d2865f586a4) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Change transfer:celo to use native sendTransaction to save up on gas costs as well as better decoding on ledger

- [#313](https://github.com/celo-org/developer-tooling/pull/313) [`7715590`](https://github.com/celo-org/developer-tooling/commit/7715590b3efda1eb39a2600ffc858905265f5d12) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Deprecate reserve commands see https://forum.celo.org/t/sunset-of-reserve-commands/8454

- [#315](https://github.com/celo-org/developer-tooling/pull/315) [`dd67b8f`](https://github.com/celo-org/developer-tooling/commit/dd67b8f7e65285d86af277c1172e760f250abd78) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Upgrade mento packages. version before was accidentally trying to use a dev dependency. (fix husky not installed on install error)

- Updated dependencies [[`dd67b8f`](https://github.com/celo-org/developer-tooling/commit/dd67b8f7e65285d86af277c1172e760f250abd78), [`d245703`](https://github.com/celo-org/developer-tooling/commit/d245703fa71ad24c88982fc6566e4d2865f586a4)]:
  - @celo/contractkit@8.1.1-beta.0
  - @celo/connect@6.0.1-beta.0
  - @celo/explorer@5.0.12-beta.0
  - @celo/governance@5.1.3-beta.0
  - @celo/wallet-ledger@6.0.1-beta.0
  - @celo/wallet-hsm-azure@6.0.1-beta.0
  - @celo/wallet-local@6.0.1-beta.0

## 5.1.0

### Minor Changes

- [#264](https://github.com/celo-org/developer-tooling/pull/264) [`59f4b42`](https://github.com/celo-org/developer-tooling/commit/59f4b42029699861e91dd2214c40173f70de279e) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Add support for serializing, sending, parsing and deserializing cip66 transactions. This tx type is preffered over cip64 when paying for gas with tokens. Like eip1559 maxFeePerGass and maxPriorityFeePerGas are denominated in CELO. To create an cip66 transaction with Contractkit call the `kit.populateMaxFeeInToken` method with your transaction and then send it.

- [#210](https://github.com/celo-org/developer-tooling/pull/210) [`5f304f0`](https://github.com/celo-org/developer-tooling/commit/5f304f06da4bcee437d1a8d098116b0edf5a12fc) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - feat: Running celocli lockedgold:lock will now automatically register the eoa as an account if needed before locking

- [#267](https://github.com/celo-org/developer-tooling/pull/267) [`f553539`](https://github.com/celo-org/developer-tooling/commit/f553539feb68f0be9e91f83bf367b0c32f940d1e) Thanks [@shazarre](https://github.com/shazarre)! - Added support for CeloDistributionSchedule contract in network:parameters command

- [#233](https://github.com/celo-org/developer-tooling/pull/233) [`eeb44f3`](https://github.com/celo-org/developer-tooling/commit/eeb44f300c08250e179b43881ae83bf0b530dc67) Thanks [@arthurgousset](https://github.com/arthurgousset)! - Adds support for multisigs (via the `--useMultisig` flag) in the `governance:propose` command.

- [#279](https://github.com/celo-org/developer-tooling/pull/279) [`06019bf`](https://github.com/celo-org/developer-tooling/commit/06019bfce3d7d939aca8d04d841193eb733bd372) Thanks [@shazarre](https://github.com/shazarre)! - Adds support for <1.5.0.0 and >=1.5.0.0 Governance contract version

### Patch Changes

- [#266](https://github.com/celo-org/developer-tooling/pull/266) [`182bf73`](https://github.com/celo-org/developer-tooling/commit/182bf73209e6b7de0d9ea1fedaf91c9ec80299f5) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - network:info will not show epoch info when ran on an L2 context

- [#266](https://github.com/celo-org/developer-tooling/pull/266) [`182bf73`](https://github.com/celo-org/developer-tooling/commit/182bf73209e6b7de0d9ea1fedaf91c9ec80299f5) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - network:contracts no longer shows balance each contract holds of mento tokens

- [#285](https://github.com/celo-org/developer-tooling/pull/285) [`cae3f80`](https://github.com/celo-org/developer-tooling/commit/cae3f8097805c2ba2cea6fed48356781728ff4dd) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Trigger beta release with latest ledger and cip66

- [#288](https://github.com/celo-org/developer-tooling/pull/288) [`d5b1508`](https://github.com/celo-org/developer-tooling/commit/d5b1508d7d08a99f6bb6deb569ec8b89194de2b9) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Change git url

- [#217](https://github.com/celo-org/developer-tooling/pull/217) [`28738ca`](https://github.com/celo-org/developer-tooling/commit/28738ca591e54545bcd71c237fd5a9e4f077a9fd) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@celo/compliance` to `~1.0.20`.

- [#59](https://github.com/celo-org/developer-tooling/pull/59) [`38b2631`](https://github.com/celo-org/developer-tooling/commit/38b26316d615e836e21bbfe2f44853f7e8220e03) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - CHANGE - Replaced all deprecated cryptographic depencies with the audited and maintained suite of crypto libraries `@noble/*` and `@scure/*`

- [#231](https://github.com/celo-org/developer-tooling/pull/231) [`e7ac487`](https://github.com/celo-org/developer-tooling/commit/e7ac487358c30593cfef0497a7e67325a893ac14) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Add deprecation notice about future removal of `account:offchain-read` and `account:offchain-write` commands. These were created to showcase ["CIP8: Expand Metadata to general off-chain storage"](https://github.com/celo-org/celo-proposals/blob/8260b49b2ec9a87ded6727fec7d9104586eb0752/CIPs/cip-0008.md), which has been abandond and they are presenting a high maintainence burden.

- [#266](https://github.com/celo-org/developer-tooling/pull/266) [`182bf73`](https://github.com/celo-org/developer-tooling/commit/182bf73209e6b7de0d9ea1fedaf91c9ec80299f5) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Adds check for L1/L2 context and switches to FeeCurrencyDirectory contract for network:whitelist command and while using --gasCurrency flag

- [#266](https://github.com/celo-org/developer-tooling/pull/266) [`182bf73`](https://github.com/celo-org/developer-tooling/commit/182bf73209e6b7de0d9ea1fedaf91c9ec80299f5) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Changes network:parameters to include FeeCurrencyDirectory data

- [#274](https://github.com/celo-org/developer-tooling/pull/274) [`bfa24da`](https://github.com/celo-org/developer-tooling/commit/bfa24da3eef5f9386395b2173ced2cfd0a4b0eb2) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - fix: USTD not showing that it uses an adapter by supporting Tether's tokenAdapter implementation

- [#296](https://github.com/celo-org/developer-tooling/pull/296) [`de1e5a0`](https://github.com/celo-org/developer-tooling/commit/de1e5a02bb0361aa42b486e9227222b20dfb8416) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Allows approving proposals when in Execution or Referendum stages

- Updated dependencies [[`38b2631`](https://github.com/celo-org/developer-tooling/commit/38b26316d615e836e21bbfe2f44853f7e8220e03), [`38b2631`](https://github.com/celo-org/developer-tooling/commit/38b26316d615e836e21bbfe2f44853f7e8220e03), [`59f4b42`](https://github.com/celo-org/developer-tooling/commit/59f4b42029699861e91dd2214c40173f70de279e), [`182bf73`](https://github.com/celo-org/developer-tooling/commit/182bf73209e6b7de0d9ea1fedaf91c9ec80299f5), [`38b2631`](https://github.com/celo-org/developer-tooling/commit/38b26316d615e836e21bbfe2f44853f7e8220e03), [`7b93642`](https://github.com/celo-org/developer-tooling/commit/7b93642803261b37971dd3c07f8748b6bc8f3378), [`6d2a838`](https://github.com/celo-org/developer-tooling/commit/6d2a838a80a51007d75768c77d62a861f2cec136), [`38b2631`](https://github.com/celo-org/developer-tooling/commit/38b26316d615e836e21bbfe2f44853f7e8220e03), [`f553539`](https://github.com/celo-org/developer-tooling/commit/f553539feb68f0be9e91f83bf367b0c32f940d1e), [`38b2631`](https://github.com/celo-org/developer-tooling/commit/38b26316d615e836e21bbfe2f44853f7e8220e03), [`38b2631`](https://github.com/celo-org/developer-tooling/commit/38b26316d615e836e21bbfe2f44853f7e8220e03), [`d5b1508`](https://github.com/celo-org/developer-tooling/commit/d5b1508d7d08a99f6bb6deb569ec8b89194de2b9), [`66972eb`](https://github.com/celo-org/developer-tooling/commit/66972ebf0dfabc845ae309c2f794fe015ac49a86), [`38b2631`](https://github.com/celo-org/developer-tooling/commit/38b26316d615e836e21bbfe2f44853f7e8220e03), [`38b2631`](https://github.com/celo-org/developer-tooling/commit/38b26316d615e836e21bbfe2f44853f7e8220e03), [`182bf73`](https://github.com/celo-org/developer-tooling/commit/182bf73209e6b7de0d9ea1fedaf91c9ec80299f5), [`182bf73`](https://github.com/celo-org/developer-tooling/commit/182bf73209e6b7de0d9ea1fedaf91c9ec80299f5), [`182bf73`](https://github.com/celo-org/developer-tooling/commit/182bf73209e6b7de0d9ea1fedaf91c9ec80299f5), [`eeb44f3`](https://github.com/celo-org/developer-tooling/commit/eeb44f300c08250e179b43881ae83bf0b530dc67), [`66972eb`](https://github.com/celo-org/developer-tooling/commit/66972ebf0dfabc845ae309c2f794fe015ac49a86), [`bfa24da`](https://github.com/celo-org/developer-tooling/commit/bfa24da3eef5f9386395b2173ced2cfd0a4b0eb2), [`06019bf`](https://github.com/celo-org/developer-tooling/commit/06019bfce3d7d939aca8d04d841193eb733bd372)]:
  - @celo/cryptographic-utils@5.1.0
  - @celo/utils@7.0.0
  - @celo/wallet-ledger@6.0.0
  - @celo/wallet-local@6.0.0
  - @celo/contractkit@8.1.0
  - @celo/connect@6.0.0
  - @celo/base@6.1.0
  - @celo/wallet-hsm-azure@6.0.0
  - @celo/governance@5.1.2
  - @celo/explorer@5.0.11
  - @celo/phone-utils@6.0.3

## 5.1.0-beta.3

### Patch Changes

- [#288](https://github.com/celo-org/developer-tooling/pull/288) [`d5b1508`](https://github.com/celo-org/developer-tooling/commit/d5b1508d7d08a99f6bb6deb569ec8b89194de2b9) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Change git url

- Updated dependencies [[`d5b1508`](https://github.com/celo-org/developer-tooling/commit/d5b1508d7d08a99f6bb6deb569ec8b89194de2b9)]:
  - @celo/wallet-ledger@6.0.0-beta.3
  - @celo/wallet-hsm-azure@6.0.0-beta.3
  - @celo/wallet-local@6.0.0-beta.3

## 5.1.0-beta.2

### Minor Changes

- [#264](https://github.com/celo-org/developer-tooling/pull/264) [`59f4b42`](https://github.com/celo-org/developer-tooling/commit/59f4b42029699861e91dd2214c40173f70de279e) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Add support for serializing, sending, parsing and deserializing cip66 transactions. This tx type is preffered over cip64 when paying for gas with tokens. Like eip1559 maxFeePerGass and maxPriorityFeePerGas are denominated in CELO. To create an cip66 transaction with Contractkit call the `kit.populateMaxFeeInToken` method with your transaction and then send it.

### Patch Changes

- Updated dependencies [[`59f4b42`](https://github.com/celo-org/developer-tooling/commit/59f4b42029699861e91dd2214c40173f70de279e)]:
  - @celo/wallet-ledger@6.0.0-beta.2
  - @celo/wallet-local@6.0.0-beta.2
  - @celo/contractkit@8.1.0-beta.1
  - @celo/connect@6.0.0-beta.1
  - @celo/wallet-hsm-azure@6.0.0-beta.2

## 5.1.0-beta.1

### Patch Changes

- [#285](https://github.com/celo-org/developer-tooling/pull/285) [`cae3f80`](https://github.com/celo-org/developer-tooling/commit/cae3f8097805c2ba2cea6fed48356781728ff4dd) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Trigger beta release with latest ledger and cip66

## 5.1.0-beta.0

### Minor Changes

- [#210](https://github.com/celo-org/developer-tooling/pull/210) [`5f304f0`](https://github.com/celo-org/developer-tooling/commit/5f304f06da4bcee437d1a8d098116b0edf5a12fc) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - feat: Running celocli lockedgold:lock will now automatically register the eoa as an account if needed before locking

- [#267](https://github.com/celo-org/developer-tooling/pull/267) [`f553539`](https://github.com/celo-org/developer-tooling/commit/f553539feb68f0be9e91f83bf367b0c32f940d1e) Thanks [@shazarre](https://github.com/shazarre)! - Added support for CeloDistributionSchedule contract in network:parameters command

- [#233](https://github.com/celo-org/developer-tooling/pull/233) [`eeb44f3`](https://github.com/celo-org/developer-tooling/commit/eeb44f300c08250e179b43881ae83bf0b530dc67) Thanks [@arthurgousset](https://github.com/arthurgousset)! - Adds support for multisigs (via the `--useMultisig` flag) in the `governance:propose` command.

### Patch Changes

- [#266](https://github.com/celo-org/developer-tooling/pull/266) [`182bf73`](https://github.com/celo-org/developer-tooling/commit/182bf73209e6b7de0d9ea1fedaf91c9ec80299f5) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - network:info will not show epoch info when ran on an L2 context

- [#266](https://github.com/celo-org/developer-tooling/pull/266) [`182bf73`](https://github.com/celo-org/developer-tooling/commit/182bf73209e6b7de0d9ea1fedaf91c9ec80299f5) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - network:contracts no longer shows balance each contract holds of mento tokens

- [#217](https://github.com/celo-org/developer-tooling/pull/217) [`28738ca`](https://github.com/celo-org/developer-tooling/commit/28738ca591e54545bcd71c237fd5a9e4f077a9fd) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@celo/compliance` to `~1.0.20`.

- [#59](https://github.com/celo-org/developer-tooling/pull/59) [`38b2631`](https://github.com/celo-org/developer-tooling/commit/38b26316d615e836e21bbfe2f44853f7e8220e03) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - CHANGE - Replaced all deprecated cryptographic depencies with the audited and maintained suite of crypto libraries `@noble/*` and `@scure/*`

- [#231](https://github.com/celo-org/developer-tooling/pull/231) [`e7ac487`](https://github.com/celo-org/developer-tooling/commit/e7ac487358c30593cfef0497a7e67325a893ac14) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Add deprecation notice about future removal of `account:offchain-read` and `account:offchain-write` commands. These were created to showcase ["CIP8: Expand Metadata to general off-chain storage"](https://github.com/celo-org/celo-proposals/blob/8260b49b2ec9a87ded6727fec7d9104586eb0752/CIPs/cip-0008.md), which has been abandond and they are presenting a high maintainence burden.

- [#266](https://github.com/celo-org/developer-tooling/pull/266) [`182bf73`](https://github.com/celo-org/developer-tooling/commit/182bf73209e6b7de0d9ea1fedaf91c9ec80299f5) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Adds check for L1/L2 context and switches to FeeCurrencyDirectory contract for network:whitelist command and while using --gasCurrency flag

- [#266](https://github.com/celo-org/developer-tooling/pull/266) [`182bf73`](https://github.com/celo-org/developer-tooling/commit/182bf73209e6b7de0d9ea1fedaf91c9ec80299f5) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Changes network:parameters to include FeeCurrencyDirectory data

- [#274](https://github.com/celo-org/developer-tooling/pull/274) [`bfa24da`](https://github.com/celo-org/developer-tooling/commit/bfa24da3eef5f9386395b2173ced2cfd0a4b0eb2) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - fix: USTD not showing that it uses an adapter by supporting Tether's tokenAdapter implementation

- Updated dependencies [[`38b2631`](https://github.com/celo-org/developer-tooling/commit/38b26316d615e836e21bbfe2f44853f7e8220e03), [`38b2631`](https://github.com/celo-org/developer-tooling/commit/38b26316d615e836e21bbfe2f44853f7e8220e03), [`182bf73`](https://github.com/celo-org/developer-tooling/commit/182bf73209e6b7de0d9ea1fedaf91c9ec80299f5), [`38b2631`](https://github.com/celo-org/developer-tooling/commit/38b26316d615e836e21bbfe2f44853f7e8220e03), [`7b93642`](https://github.com/celo-org/developer-tooling/commit/7b93642803261b37971dd3c07f8748b6bc8f3378), [`38b2631`](https://github.com/celo-org/developer-tooling/commit/38b26316d615e836e21bbfe2f44853f7e8220e03), [`f553539`](https://github.com/celo-org/developer-tooling/commit/f553539feb68f0be9e91f83bf367b0c32f940d1e), [`38b2631`](https://github.com/celo-org/developer-tooling/commit/38b26316d615e836e21bbfe2f44853f7e8220e03), [`38b2631`](https://github.com/celo-org/developer-tooling/commit/38b26316d615e836e21bbfe2f44853f7e8220e03), [`66972eb`](https://github.com/celo-org/developer-tooling/commit/66972ebf0dfabc845ae309c2f794fe015ac49a86), [`38b2631`](https://github.com/celo-org/developer-tooling/commit/38b26316d615e836e21bbfe2f44853f7e8220e03), [`38b2631`](https://github.com/celo-org/developer-tooling/commit/38b26316d615e836e21bbfe2f44853f7e8220e03), [`182bf73`](https://github.com/celo-org/developer-tooling/commit/182bf73209e6b7de0d9ea1fedaf91c9ec80299f5), [`182bf73`](https://github.com/celo-org/developer-tooling/commit/182bf73209e6b7de0d9ea1fedaf91c9ec80299f5), [`182bf73`](https://github.com/celo-org/developer-tooling/commit/182bf73209e6b7de0d9ea1fedaf91c9ec80299f5), [`eeb44f3`](https://github.com/celo-org/developer-tooling/commit/eeb44f300c08250e179b43881ae83bf0b530dc67), [`66972eb`](https://github.com/celo-org/developer-tooling/commit/66972ebf0dfabc845ae309c2f794fe015ac49a86), [`bfa24da`](https://github.com/celo-org/developer-tooling/commit/bfa24da3eef5f9386395b2173ced2cfd0a4b0eb2)]:
  - @celo/cryptographic-utils@5.1.0-beta.0
  - @celo/utils@7.0.0-beta.0
  - @celo/connect@6.0.0-beta.0
  - @celo/base@6.1.0-beta.0
  - @celo/wallet-hsm-azure@6.0.0-beta.0
  - @celo/contractkit@8.1.0-beta.0
  - @celo/wallet-ledger@6.0.0-beta.0
  - @celo/wallet-local@6.0.0-beta.0
  - @celo/governance@5.1.2-beta.0
  - @celo/explorer@5.0.11-beta.0
  - @celo/phone-utils@6.0.3-beta.0

## 5.0.0

### Major Changes

- [#200](https://github.com/celo-org/developer-tooling/pull/200) [`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - The following changes are related to adding support for more fee currencies in the @celo packages.

  (BREAKING): global flag `--gasCurrency` changed to accept only whitelisted addresses instead of previously accepting a StableToken or 'auto'
  (BREAKING): `config:set --gasCurrency` is now ignored and not saved to a default config and prints a warning instead
  (ADDED): `celocli network:whitelist` prints the whitelisted feeCurrencies

### Patch Changes

- [#189](https://github.com/celo-org/developer-tooling/pull/189) [`cbfedf0`](https://github.com/celo-org/developer-tooling/commit/cbfedf0849a69e347a6ee3647b301ca0e7a11cac) Thanks [@renovate](https://github.com/apps/renovate)! - Bumps @celo/identity package to version [5.1.2](https://github.com/celo-org/social-connect/pull/181). This version removes the opentelemetry dependencies, which removes the warnings when users install @celo/celocli.

- [#200](https://github.com/celo-org/developer-tooling/pull/200) [`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Bump Cross Fetch to fix security vulnerability

- [#200](https://github.com/celo-org/developer-tooling/pull/200) [`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Bump web3-\* to 1.10.4 -- Some consumers may be forced to upgrade their web3 instance to the same version

- [#200](https://github.com/celo-org/developer-tooling/pull/200) [`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - celocli nework:parameters no longer includes info on stable tokens

- Updated dependencies [[`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01), [`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01), [`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01), [`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01), [`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01), [`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01), [`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01), [`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01)]:
  - @celo/contractkit@8.0.0
  - @celo/explorer@5.0.10
  - @celo/wallet-hsm-azure@5.2.0
  - @celo/wallet-ledger@5.2.0
  - @celo/wallet-local@5.2.0
  - @celo/connect@5.3.0
  - @celo/utils@6.0.1
  - @celo/base@6.0.1
  - @celo/cryptographic-utils@5.0.8
  - @celo/governance@5.1.1
  - @celo/phone-utils@6.0.2

## 5.0.0-beta.1

### Major Changes

- [#198](https://github.com/celo-org/developer-tooling/pull/198) [`880a838`](https://github.com/celo-org/developer-tooling/commit/880a8386e10cf9cd84c57d141330e84635a7eeaa) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - The following changes are related to adding support for more fee currencies in the @celo packages.

  (BREAKING): global flag `--gasCurrency` changed to accept only whitelisted addresses instead of previously accepting a StableToken or 'auto'
  (BREAKING): `config:set --gasCurrency` is now ignored and not saved to a default config and prints a warning instead
  (ADDED): `celocli network:whitelist` prints the whitelisted feeCurrencies

## 5.0.0-beta.0

### Major Changes

- [#188](https://github.com/celo-org/developer-tooling/pull/188) [`08b0d6a`](https://github.com/celo-org/developer-tooling/commit/08b0d6a18b73b01c162f6ba4f97d73f3e3708160) Thanks [@github-actions](https://github.com/apps/github-actions)! - The following changes are related to adding support for more fee currencies in the @celo packages.

  (BREAKING): `--gasCurrency` changed to accept only whitelisted addresses or the string `CELO` instead of previously accepting a StableToken or 'auto'
  (ADDED): `celocli network:whitelist` prints the whitelisted feeCurrencies
  (ADDED): the cli will automagically convert the previous gasCurrency such as cEUR, cUSD, cREAL, CELO into its address if necessary

### Patch Changes

- [#189](https://github.com/celo-org/developer-tooling/pull/189) [`cbfedf0`](https://github.com/celo-org/developer-tooling/commit/cbfedf0849a69e347a6ee3647b301ca0e7a11cac) Thanks [@renovate](https://github.com/apps/renovate)! - Bumps @celo/identity package to version [5.1.2](https://github.com/celo-org/social-connect/pull/181). This version removes the opentelemetry dependencies, which removes the warnings when users install @celo/celocli.

- [#168](https://github.com/celo-org/developer-tooling/pull/168) [`c42682d`](https://github.com/celo-org/developer-tooling/commit/c42682d8a7e582f0adaa63c833a4c83a0a649f20) Thanks [@renovate](https://github.com/apps/renovate)! - Bump Cross Fetch to fix security vulnerability

- [#168](https://github.com/celo-org/developer-tooling/pull/168) [`c42682d`](https://github.com/celo-org/developer-tooling/commit/c42682d8a7e582f0adaa63c833a4c83a0a649f20) Thanks [@renovate](https://github.com/apps/renovate)! - Bump web3-\* to 1.10.4 -- Some consumers may be forced to upgrade their web3 instance to the same version

- [#188](https://github.com/celo-org/developer-tooling/pull/188) [`a317972`](https://github.com/celo-org/developer-tooling/commit/a3179725c4c38274b8e664a0f2853a709911949c) Thanks [@github-actions](https://github.com/apps/github-actions)! - celocli nework:parameters no longer includes info on stable tokens

- Updated dependencies [[`08b0d6a`](https://github.com/celo-org/developer-tooling/commit/08b0d6a18b73b01c162f6ba4f97d73f3e3708160), [`c42682d`](https://github.com/celo-org/developer-tooling/commit/c42682d8a7e582f0adaa63c833a4c83a0a649f20), [`c42682d`](https://github.com/celo-org/developer-tooling/commit/c42682d8a7e582f0adaa63c833a4c83a0a649f20), [`a317972`](https://github.com/celo-org/developer-tooling/commit/a3179725c4c38274b8e664a0f2853a709911949c), [`08b0d6a`](https://github.com/celo-org/developer-tooling/commit/08b0d6a18b73b01c162f6ba4f97d73f3e3708160), [`5335af5`](https://github.com/celo-org/developer-tooling/commit/5335af5808a892c95245624e676cd1952a0cfb42), [`08b0d6a`](https://github.com/celo-org/developer-tooling/commit/08b0d6a18b73b01c162f6ba4f97d73f3e3708160), [`08b0d6a`](https://github.com/celo-org/developer-tooling/commit/08b0d6a18b73b01c162f6ba4f97d73f3e3708160)]:
  - @celo/contractkit@8.0.0-beta.0
  - @celo/explorer@5.0.10-beta.0
  - @celo/wallet-hsm-azure@5.2.0-beta.0
  - @celo/wallet-ledger@5.2.0-beta.0
  - @celo/wallet-local@5.2.0-beta.0
  - @celo/connect@5.3.0-beta.0
  - @celo/utils@6.0.1-beta.0
  - @celo/base@6.0.1-beta.0
  - @celo/governance@5.1.1-beta.0
  - @celo/cryptographic-utils@5.0.8-beta.0
  - @celo/phone-utils@6.0.2-beta.0

## 4.2.0

### Minor Changes

- [#171](https://github.com/celo-org/developer-tooling/pull/171) [`fb7877a`](https://github.com/celo-org/developer-tooling/commit/fb7877ac364a4552769d77e4edd980460494557a) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Support for Core Contracts Release 11 (upgrade @celo/abis)

  see https://github.com/celo-org/celo-monorepo/releases/tag/core-contracts.v11

### Patch Changes

- Updated dependencies [[`fb7877a`](https://github.com/celo-org/developer-tooling/commit/fb7877ac364a4552769d77e4edd980460494557a)]:
  - @celo/contractkit@7.2.0
  - @celo/governance@5.1.0

## 4.1.0

### Minor Changes

- [#140](https://github.com/celo-org/developer-tooling/pull/140) [`0ad9c01`](https://github.com/celo-org/developer-tooling/commit/0ad9c011b868c4bf5456f4048cb6d405c9dd8c8e) Thanks [@timmoreton](https://github.com/timmoreton)! - Activate votes from any account, new optional parameter to specify for account in ElectionWrapper:activate

- [#146](https://github.com/celo-org/developer-tooling/pull/146) [`28cd8f8`](https://github.com/celo-org/developer-tooling/commit/28cd8f8c8dd62ecafa01ef7a7fb89117e6db9b56) Thanks [@pahor167](https://github.com/pahor167)! - Added support of structs and tuples in governance:propose

  Adds ability to parse structs and tuples

### Patch Changes

- [#157](https://github.com/celo-org/developer-tooling/pull/157) [`d5977f2`](https://github.com/celo-org/developer-tooling/commit/d5977f2c080501e3e2548e54715a055e4302aa34) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix not being able to submit governance proposals due to mishandling of 10K minimum deposit

- [#150](https://github.com/celo-org/developer-tooling/pull/150) [`6157c6d`](https://github.com/celo-org/developer-tooling/commit/6157c6d45e6bb0d868cd57155316016e013211fb) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix issue where core contracts not having proxy could break cli

- [#149](https://github.com/celo-org/developer-tooling/pull/149) [`ae51ca8`](https://github.com/celo-org/developer-tooling/commit/ae51ca8851e6684d372f976dd8610ddf502a266b) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Require addresses the cli sends from or to not to be sanctioned

- Updated dependencies [[`0ad9c01`](https://github.com/celo-org/developer-tooling/commit/0ad9c011b868c4bf5456f4048cb6d405c9dd8c8e), [`28cd8f8`](https://github.com/celo-org/developer-tooling/commit/28cd8f8c8dd62ecafa01ef7a7fb89117e6db9b56), [`28cd8f8`](https://github.com/celo-org/developer-tooling/commit/28cd8f8c8dd62ecafa01ef7a7fb89117e6db9b56), [`28cd8f8`](https://github.com/celo-org/developer-tooling/commit/28cd8f8c8dd62ecafa01ef7a7fb89117e6db9b56)]:
  - @celo/contractkit@7.1.0
  - @celo/governance@5.0.10
  - @celo/explorer@5.0.9
  - @celo/connect@5.2.0
  - @celo/wallet-hsm-azure@5.1.3
  - @celo/wallet-ledger@5.1.3
  - @celo/wallet-local@5.1.3

## 4.1.0-beta.1

### Minor Changes

- [#146](https://github.com/celo-org/developer-tooling/pull/146) [`28cd8f8`](https://github.com/celo-org/developer-tooling/commit/28cd8f8c8dd62ecafa01ef7a7fb89117e6db9b56) Thanks [@pahor167](https://github.com/pahor167)! - Added support of structs and tuples in governance:propose

  Adds ability to parse structs and tuples

### Patch Changes

- Updated dependencies [[`28cd8f8`](https://github.com/celo-org/developer-tooling/commit/28cd8f8c8dd62ecafa01ef7a7fb89117e6db9b56), [`28cd8f8`](https://github.com/celo-org/developer-tooling/commit/28cd8f8c8dd62ecafa01ef7a7fb89117e6db9b56), [`28cd8f8`](https://github.com/celo-org/developer-tooling/commit/28cd8f8c8dd62ecafa01ef7a7fb89117e6db9b56)]:
  - @celo/governance@5.0.10-beta.1
  - @celo/explorer@5.0.9-beta.1
  - @celo/connect@5.2.0-beta.0
  - @celo/contractkit@7.1.0-beta.1
  - @celo/wallet-hsm-azure@5.1.3-beta.0
  - @celo/wallet-ledger@5.1.3-beta.0
  - @celo/wallet-local@5.1.3-beta.0

## 4.1.0-beta.0

### Minor Changes

- [#140](https://github.com/celo-org/developer-tooling/pull/140) [`0ad9c01`](https://github.com/celo-org/developer-tooling/commit/0ad9c011b868c4bf5456f4048cb6d405c9dd8c8e) Thanks [@timmoreton](https://github.com/timmoreton)! - Activate votes from any account, new optional parameter to specify for account in ElectionWrapper:activate

### Patch Changes

- [#157](https://github.com/celo-org/developer-tooling/pull/157) [`d5977f2`](https://github.com/celo-org/developer-tooling/commit/d5977f2c080501e3e2548e54715a055e4302aa34) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix not being able to submit governance proposals due to mishandling of 10K minimum deposit

- [#150](https://github.com/celo-org/developer-tooling/pull/150) [`6157c6d`](https://github.com/celo-org/developer-tooling/commit/6157c6d45e6bb0d868cd57155316016e013211fb) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix issue where core contracts not having proxy could break cli

- [#149](https://github.com/celo-org/developer-tooling/pull/149) [`ae51ca8`](https://github.com/celo-org/developer-tooling/commit/ae51ca8851e6684d372f976dd8610ddf502a266b) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Require addresses the cli sends from or to not to be sanctioned

- Updated dependencies [[`0ad9c01`](https://github.com/celo-org/developer-tooling/commit/0ad9c011b868c4bf5456f4048cb6d405c9dd8c8e)]:
  - @celo/contractkit@7.1.0-beta.0
  - @celo/explorer@5.0.9-beta.0
  - @celo/governance@5.0.10-beta.0

## 4.0.0

### Major Changes

- [#106](https://github.com/celo-org/developer-tooling/pull/106) [`0a3a570`](https://github.com/celo-org/developer-tooling/commit/0a3a5706575fdb8af34dd2143759ed0535c386bf) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove the deprecated exchange:gold command. exchange:celo is a drop in replacement

- [#21](https://github.com/celo-org/developer-tooling/pull/21) [`f167758`](https://github.com/celo-org/developer-tooling/commit/f1677581b90675e37a4846ce53b29d8615a056e6) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Removes the `releasegold` command in favour of `releasecelo`.

- [#21](https://github.com/celo-org/developer-tooling/pull/21) [`f167758`](https://github.com/celo-org/developer-tooling/commit/f1677581b90675e37a4846ce53b29d8615a056e6) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove `grandamento` commands from CLI.

### Minor Changes

- [#106](https://github.com/celo-org/developer-tooling/pull/106) [`0a3a570`](https://github.com/celo-org/developer-tooling/commit/0a3a5706575fdb8af34dd2143759ed0535c386bf) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Add support for swapping celo -- cStables via mento broker

### Patch Changes

- [#129](https://github.com/celo-org/developer-tooling/pull/129) [`0eabd86`](https://github.com/celo-org/developer-tooling/commit/0eabd86f1fc4078638f0819150e9873b417696b7) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Improve column header names for rewards:show command

- [#129](https://github.com/celo-org/developer-tooling/pull/129) [`0eabd86`](https://github.com/celo-org/developer-tooling/commit/0eabd86f1fc4078638f0819150e9873b417696b7) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Various fixes for displaying tablular information from commands

- [#134](https://github.com/celo-org/developer-tooling/pull/134) [`6968ad6`](https://github.com/celo-org/developer-tooling/commit/6968ad68c3e5b3f0bc09b73a673fbb0f50335674) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - force beta release

- Updated dependencies [[`8fb6c76`](https://github.com/celo-org/developer-tooling/commit/8fb6c76e4fada71c91f516ed151c4519ff2fe0fd), [`45d156d`](https://github.com/celo-org/developer-tooling/commit/45d156d03c03399bef51a00fe2b5cfb5e5669642), [`7dfbcd6`](https://github.com/celo-org/developer-tooling/commit/7dfbcd60203c8fd95bc6e113adfba02f7071ac47), [`b34439a`](https://github.com/celo-org/developer-tooling/commit/b34439a945c698c560c096c92255c230602adee6), [`6b2e34c`](https://github.com/celo-org/developer-tooling/commit/6b2e34c973290da221aaabdc2bf4c6654ef9f99c)]:
  - @celo/contractkit@7.0.0
  - @celo/wallet-hsm-azure@5.1.2
  - @celo/utils@6.0.0
  - @celo/wallet-ledger@5.1.2
  - @celo/wallet-local@5.1.2
  - @celo/connect@5.1.2
  - @celo/cryptographic-utils@5.0.7
  - @celo/explorer@5.0.8
  - @celo/governance@5.0.9
  - @celo/phone-utils@6.0.1

## 4.0.0-beta.3

### Patch Changes

- [#134](https://github.com/celo-org/developer-tooling/pull/134) [`6968ad6`](https://github.com/celo-org/developer-tooling/commit/6968ad68c3e5b3f0bc09b73a673fbb0f50335674) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - force beta release

## 4.0.0-beta.2

### Patch Changes

- [#129](https://github.com/celo-org/developer-tooling/pull/129) [`0eabd86`](https://github.com/celo-org/developer-tooling/commit/0eabd86f1fc4078638f0819150e9873b417696b7) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Improve column header names for rewards:show command

- [#129](https://github.com/celo-org/developer-tooling/pull/129) [`0eabd86`](https://github.com/celo-org/developer-tooling/commit/0eabd86f1fc4078638f0819150e9873b417696b7) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Various fixes for displaying tablular information from commands

## 4.0.0-beta.1

### Major Changes

- [#106](https://github.com/celo-org/developer-tooling/pull/106) [`0a3a570`](https://github.com/celo-org/developer-tooling/commit/0a3a5706575fdb8af34dd2143759ed0535c386bf) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove the deprecated exchange:gold command. exchange:celo is a drop in replacement

### Minor Changes

- [#106](https://github.com/celo-org/developer-tooling/pull/106) [`0a3a570`](https://github.com/celo-org/developer-tooling/commit/0a3a5706575fdb8af34dd2143759ed0535c386bf) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Add support for swapping celo -- cStables via mento broker

### Patch Changes

- Updated dependencies [[`45d156d`](https://github.com/celo-org/developer-tooling/commit/45d156d03c03399bef51a00fe2b5cfb5e5669642), [`b34439a`](https://github.com/celo-org/developer-tooling/commit/b34439a945c698c560c096c92255c230602adee6), [`6b2e34c`](https://github.com/celo-org/developer-tooling/commit/6b2e34c973290da221aaabdc2bf4c6654ef9f99c)]:
  - @celo/wallet-hsm-azure@5.1.2-beta.0
  - @celo/contractkit@7.0.0-beta.2
  - @celo/utils@6.0.0-beta.0
  - @celo/explorer@5.0.8-beta.1
  - @celo/governance@5.0.9-beta.1
  - @celo/connect@5.1.2-beta.0
  - @celo/cryptographic-utils@5.0.7-beta.0
  - @celo/phone-utils@6.0.1-beta.0
  - @celo/wallet-ledger@5.1.2-beta.0
  - @celo/wallet-local@5.1.2-beta.0

## 4.0.0-beta.0

### Major Changes

- [#21](https://github.com/celo-org/developer-tooling/pull/21) [`f167758`](https://github.com/celo-org/developer-tooling/commit/f1677581b90675e37a4846ce53b29d8615a056e6) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Removes releasegold commnand topic. use releasecelo

- [#21](https://github.com/celo-org/developer-tooling/pull/21) [`f167758`](https://github.com/celo-org/developer-tooling/commit/f1677581b90675e37a4846ce53b29d8615a056e6) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Remove Grandamento from CLI

### Patch Changes

- Updated dependencies [[`8fb6c76`](https://github.com/celo-org/developer-tooling/commit/8fb6c76e4fada71c91f516ed151c4519ff2fe0fd)]:
  - @celo/contractkit@6.0.1-beta.0
  - @celo/explorer@5.0.8-beta.0
  - @celo/governance@5.0.9-beta.0

## 3.1.3

### Patch Changes

- 041fc926f: Add textual feedback about parsing proposal
- Updated dependencies [041fc926f]
- Updated dependencies [041fc926f]
- Updated dependencies [041fc926f]
  - @celo/governance@5.0.8

## 3.1.2-beta.2

### Patch Changes

- ba27783ae: Revert removal of Contracts
- Updated dependencies [ba27783ae]
  - @celo/contractkit@6.0.0-beta.2

### Patch Changes

- Updated dependencies [9ab9d00eb]
- Updated dependencies [444db6de9]
- Updated dependencies [9ab9d00eb]
  - @celo/contractkit@6.0.0-beta.1
  - @celo/governance@5.0.7-beta.2

## 3.1.2-beta.1

### Patch Changes

- e4da5a7a8: Add textual feedback about parsing proposal
- Updated dependencies [e4da5a7a8]
  - @celo/governance@5.0.7-beta.1

## 3.1.2-beta.0

### Patch Changes

- bb3cf9f2e: update terminology: refer to celo not gold.
- bb3cf9f2e: Alias releasecelo to releasegold
- Updated dependencies [1c9c844cf]
- Updated dependencies [86bbfddf1]
  - @celo/contractkit@6.0.0-beta.0
  - @celo/governance@5.0.7-beta.0
  - @celo/explorer@5.0.7-beta.0
- bb3cf9f2e: update terminology: refer to celo not gold.
- bb3cf9f2e: Alias releasecelo to releasegold
- Updated dependencies [9ab9d00eb]
- Updated dependencies [1c9c844cf]
- Updated dependencies [9ab9d00eb]
  - @celo/contractkit@6.0.0
  - @celo/explorer@5.0.7
  - @celo/governance@5.0.7

## 3.1.1

### Patch Changes

- 6ff7f4a1e: network:contracts command fix added StableTokens to unversioned contracts list
- Updated dependencies [88e3788b8]
- Updated dependencies [70f600bb0]
- Updated dependencies [2985f9eb2]
  - @celo/contractkit@5.2.1

## 3.1.0

### Minor Changes

- 06700f3ad: Update of Governance Upvote function
- 32face3d8: Delegation of Governance votes
- 1e8d07ba6: add FeeHandler contract info to `celocli network:contracts` command
- 87647b46b: Add multisig:approve command to CLI, expose MultiSig.confirmTransaction in ContractKit.

### Patch Changes

- 22ea7f691: Remove moment.js dependency
- Updated dependencies
- Updated dependencies [679ef0c60]
- Updated dependencies [97d5ccf43]
- Updated dependencies [32face3d8]
- Updated dependencies [97d5ccf43]
- Updated dependencies [87647b46b]
  - @celo/contractkit@5.2.0
  - @celo/connect@5.1.1
  - @celo/phone-utils@6.0.0
  - @celo/base@6.0.0
  - @celo/cryptographic-utils@5.0.6
  - @celo/explorer@5.0.6
  - @celo/governance@5.0.6
  - @celo/utils@5.0.6
  - @celo/wallet-hsm-azure@5.1.1
  - @celo/wallet-ledger@5.1.1
  - @celo/wallet-local@5.1.1

## 3.1.0-beta.0

### Minor Changes

- 06700f3ad: Update of Governance Upvote function
- 32face3d8: Delegation of Governance votes
- 1e8d07ba6: add FeeHandler contract info to `celocli network:contracts` command
- 87647b46b: Add multisig:approve command to CLI, expose MultiSig.confirmTransaction in ContractKit.

### Patch Changes

- 22ea7f691: Remove moment.js dependency
- Updated dependencies
- Updated dependencies [97d5ccf43]
- Updated dependencies [32face3d8]
- Updated dependencies [97d5ccf43]
- Updated dependencies [87647b46b]
  - @celo/contractkit@5.2.0-beta.0
  - @celo/phone-utils@6.0.0-beta.0
  - @celo/base@6.0.0-beta.0
  - @celo/explorer@5.0.6-beta.0
  - @celo/governance@5.0.6-beta.0
  - @celo/connect@5.1.1-beta.0
  - @celo/cryptographic-utils@5.0.6-beta.0
  - @celo/utils@5.0.6-beta.0
  - @celo/wallet-hsm-azure@5.1.1-beta.0
  - @celo/wallet-ledger@5.1.1-beta.0
  - @celo/wallet-local@5.1.1-beta.0

## 3.0.2

### Patch Changes

- d48c68afc: Speeds up governance:show command by parallelize async calls, and reducing data fetched
- cb7b4c538: Fixes type warnings
- Updated dependencies [d48c68afc]
- Updated dependencies [d48c68afc]
- Updated dependencies [53bbd4958]
- Updated dependencies [d48c68afc]
- Updated dependencies [53bbd4958]
- Updated dependencies [d48c68afc]
- Updated dependencies [d48c68afc]
- Updated dependencies [d48c68afc]
  - @celo/contractkit@5.1.0
  - @celo/connect@5.1.0
  - @celo/wallet-hsm-azure@5.1.0
  - @celo/wallet-ledger@5.1.0
  - @celo/wallet-local@5.1.0
  - @celo/cryptographic-utils@5.0.5
  - @celo/phone-utils@5.0.5
  - @celo/governance@5.0.5
  - @celo/explorer@5.0.5
  - @celo/utils@5.0.5
  - @celo/base@5.0.5

## 3.0.2-beta.1

### Patch Changes

- cb7b4c538: Fixes type warnings

## 3.0.2-beta.0

### Patch Changes

- d48c68afc: Speeds up governance:show command by parallelize async calls, and reducing data fetched
- Updated dependencies [d48c68afc]
- Updated dependencies [d48c68afc]
- Updated dependencies [53bbd4958]
- Updated dependencies [d48c68afc]
- Updated dependencies [53bbd4958]
- Updated dependencies [d48c68afc]
- Updated dependencies [d48c68afc]
- Updated dependencies [d48c68afc]
  - @celo/contractkit@5.1.0-beta.0
  - @celo/connect@5.1.0-beta.0
  - @celo/wallet-hsm-azure@5.1.0-beta.0
  - @celo/wallet-ledger@5.1.0-beta.0
  - @celo/wallet-local@5.1.0-beta.0
  - @celo/cryptographic-utils@5.0.5-beta.0
  - @celo/phone-utils@5.0.5-beta.0
  - @celo/governance@5.0.5-beta.0
  - @celo/explorer@5.0.5-beta.0
  - @celo/utils@5.0.5-beta.0
  - @celo/base@5.0.5-beta.0
    All notable changes to the [celo cli package](https://www.npmjs.com/package/@celo/celocli) will be documented in this file.

This package will follow the release process outlined [here](https://docs.celo.org/community/release-process).

## Development (not published yet)

### **[1.2.1--dev]**

Features

- [one-line summary] - [link PR]

Bug Fixes

- [one-line summary] - [link PR]

Other Changes

- [one-line summary] - [link PR]

## Published

### **[1.2.0]** -- 2021-04-22

Features

- cEUR support - [#7524](https://github.com/celo-org/celo-monorepo/pull/7524)
- Add more info to network:contracts - [#7379](https://github.com/celo-org/celo-monorepo/pull/7379)
- Approvehotfix to support multisigs - [#7671](https://github.com/celo-org/celo-monorepo/pull/7671)

Other Changes

- Add --globalHelp option to BaseCommand - [#7669](https://github.com/celo-org/celo-monorepo/pull/7669)

### **[1.1.1--beta]** -- 2021-03-22

Features

- Support Portuguese mnemonics - [#7220](https://github.com/celo-org/celo-monorepo/pull/7220)
- Improve granularity of governance tooling information - [#6475](https://github.com/celo-org/celo-monorepo/pull/6475)
- Small fixes in the proposal process for cEUR/Release 3 - [#7184](https://github.com/celo-org/celo-monorepo/pull/7184)
- CIP8 name access via the CLI - [#6855](https://github.com/celo-org/celo-monorepo/pull/6855)

Other Changes

- Upload/Download Profile Data with CIP8 - [#6604](https://github.com/celo-org/celo-monorepo/pull/6604)
- Improve naming in the DKG - [#4062](https://github.com/celo-org/celo-monorepo/pull/4062)
- Fix packages vulnerabilities - [#7476](https://github.com/celo-org/celo-monorepo/pull/7476)

### **[1.1.0]** -- 2021-02-16

Features

- Add plugins to CLI - [#5973](https://github.com/celo-org/celo-monorepo/pull/5973)
- New CLI command `identity:get-attestations` to query attestations - [#5974](https://github.com/celo-org/celo-monorepo/pull/5974)

Bug Fixes

- `releasegold:show` should succeed w/o account registration - [#7092](https://github.com/celo-org/celo-monorepo/pull/7092)
- Add check for signer or registered account in `releasegold:show` - [#7098](https://github.com/celo-org/celo-monorepo/pull/7098)

Other Changes

- Clarify Docs for `multisig:transfer` - [#6982](https://github.com/celo-org/celo-monorepo/pull/6982)

### **[1.0.3]** -- 2021-01-25

Bug Fixes

- Add missing lib in the `shrinkwrap.json` that avoids the usage of the package - [#6671](https://github.com/celo-org/celo-monorepo/pull/6671)

### **[1.0.2]** -- 2021-01-22

Bug Fixes

- Fixed Global Flag Parsing in CLI - [#6619](https://github.com/celo-org/celo-monorepo/pull/6619)

Other Changes

- Fix libraries versions (`shrinkwrap`) to avoid supply chain attacks - [#6575](https://github.com/celo-org/celo-monorepo/pull/6575)

### **[1.0.1]** -- 2021-01-20

Features

- Pass through [oclif table flags](https://github.com/oclif/cli-ux#clitable) to commands which output tables - [#5618](https://github.com/celo-org/celo-monorepo/pull/5618)
- CIP 8 Encryption - [#5091](https://github.com/celo-org/celo-monorepo/pull/5091)
- Add authorized signers to release gold show - [#5596](https://github.com/celo-org/celo-monorepo/pull/5596)
- Extract governance:build-proposal command - [#5847](https://github.com/celo-org/celo-monorepo/pull/5847)
- Add downtime slashing commands - [#5632](https://github.com/celo-org/celo-monorepo/pull/5632)
- Add ability to withdraw attestation rewards via CLI [#6176](https://github.com/celo-org/celo-monorepo/pull/6176)
- Mnemonic validation flexibility within Valora - [#6372](https://github.com/celo-org/celo-monorepo/pull/6372)
- Write transfer and transferFrom commands for MultiSig contract - [#6425](https://github.com/celo-org/celo-monorepo/pull/6425)

Bug Fixes

- Fix param order on account:new internal call - [#6319](https://github.com/celo-org/celo-monorepo/pull/6319)
- Remove broken header links in generated CLI docs - [#6415](https://github.com/celo-org/celo-monorepo/pull/6415)
- Fix @ledgerhq package version in CK and CLI - [#6496](https://github.com/celo-org/celo-monorepo/pull/6496)
- Fix call to set gas currency in CLI base - [#6505](https://github.com/celo-org/celo-monorepo/pull/6505)

Other Changes

- KomenciKit - [#5436](https://github.com/celo-org/celo-monorepo/pull/5436)
- Update base and utils package versions [#5655](https://github.com/celo-org/celo-monorepo/pull/5655)
- Parallelize and simplify fetching of comprensive registry address map - [#5568](https://github.com/celo-org/celo-monorepo/pull/5568)
- Add readability to (big) number and timestamp/duration outputs in CK and CLI - [#5584](https://github.com/celo-org/celo-monorepo/pull/5584)
- Rename build-proposal flag - [#5885](https://github.com/celo-org/celo-monorepo/pull/5885)
- Compatibility with Sdk Modularization - [#4790](https://github.com/celo-org/celo-monorepo/pull/4790)
- Adjust how CLI docs are generated - [#5882](https://github.com/celo-org/celo-monorepo/pull/5882)
- Add install instructions for CLI readme - [#6466](https://github.com/celo-org/celo-monorepo/pull/6466)

### **[0.0.60]** -- 2020-10-27

Bug Fixes

- Uses the most up-to-date version of @celo/contractkit (0.4.17) & fixes backward compatibility issues from the last release
- Actually call toString in oracle report CLI - [#5594](https://github.com/celo-org/celo-monorepo/pull/5594)

Other Changes

- Support the use of scientific notation for the deposit of a governance proposal - [#5326](https://github.com/celo-org/celo-monorepo/pull/5326)
- Require `--force` with `account:claim-attestation-service-url` for non-TLS urls [#5599](https://github.com/celo-org/celo-monorepo/pull/5599)

### **[0.0.59]** -- 2020-10-23

Features

- Add `jsonTransactions` flag to `governance:show` for use in the (contract release process)[https://docs.celo.org/community/release-process/smart-contracts] - [#5111](https://github.com/celo-org/celo-monorepo/pull/5111)

Bug Fixes

- Fix attestation service test delivering false negatives - [#5336](https://github.com/celo-org/celo-monorepo/pull/5336)
- Fix error when listing contract addresses and include some missing new contracts - [#5301](https://github.com/celo-org/celo-monorepo/pull/5301)

Other Changes

- Convert default log output color from red to yellow - [#5517](https://github.com/celo-org/celo-monorepo/pull/5517)

### **[0.0.58]** -- 2020-10-08

Features

- CLI compatability with [Attestation Service 1.0.5](https://github.com/celo-org/celo-monorepo/releases/tag/attestation-service-1-0-5) - [#5011](https://github.com/celo-org/celo-monorepo/pull/5011)
- Adds an interactive prompt for forming proposals from Celo registry contracts and functions - [#3008](https://github.com/celo-org/celo-monorepo/pull/3008)

Other Changes

- Correct documentation on the validator and validator group deregister - [#5197](https://github.com/celo-org/celo-monorepo/pull/5197)

### **[0.0.57]** -- 2020-09-23

Features

- Adds ODIS identifier query to celocli - [#4976](https://github.com/celo-org/celo-monorepo/pull/4976)

Bug Fixes

- Fixes backward compatibility issues in cli - [#5124](https://github.com/celo-org/celo-monorepo/pull/5124)

_Note: Changes before 0.0.57 are not documented_
