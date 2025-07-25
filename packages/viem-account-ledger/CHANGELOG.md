# @celo/viem-account-ledger

## 1.2.0

### Minor Changes

- [#640](https://github.com/celo-org/developer-tooling/pull/640) [`04c89f7`](https://github.com/celo-org/developer-tooling/commit/04c89f739b1056330c5ca287234c9336c19b11e9) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - expose `deriveLedgerAccounts` function

- [#602](https://github.com/celo-org/developer-tooling/pull/602) [`a270c1a`](https://github.com/celo-org/developer-tooling/commit/a270c1aa0c9d5b282396af8812ea9ddbcb7fec9c) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Export a WalletClient

### Patch Changes

- [#651](https://github.com/celo-org/developer-tooling/pull/651) [`5a2fa51`](https://github.com/celo-org/developer-tooling/commit/5a2fa5196976fffd7c89c804c68b7507e9c48f92) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Removes unused dependencies

- [#610](https://github.com/celo-org/developer-tooling/pull/610) [`6ca357b`](https://github.com/celo-org/developer-tooling/commit/6ca357bfbbb1075d73c2b8000e01db70959e08f5) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Remove unintuitive mutex impl which resulted in `transport` error in the hw-app-eth

- [#674](https://github.com/celo-org/developer-tooling/pull/674) [`6610d47`](https://github.com/celo-org/developer-tooling/commit/6610d474e364e7ae5fe1016dd44a0a8c53d0769f) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - chore: upgrade ledger-token-signer to 0.7.0

- Updated dependencies [[`7d84a5a`](https://github.com/celo-org/developer-tooling/commit/7d84a5a9a23f72572999dc17f24d9b70bf6ca9f6), [`99717e9`](https://github.com/celo-org/developer-tooling/commit/99717e93c640e37e4e67020d973a2a13d5af2ac3), [`5a2fa51`](https://github.com/celo-org/developer-tooling/commit/5a2fa5196976fffd7c89c804c68b7507e9c48f92)]:
  - @celo/base@7.0.3

## 1.2.0-beta.3

### Patch Changes

- [#674](https://github.com/celo-org/developer-tooling/pull/674) [`6610d47`](https://github.com/celo-org/developer-tooling/commit/6610d474e364e7ae5fe1016dd44a0a8c53d0769f) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - chore: upgrade ledger-token-signer to 0.7.0

## 1.2.0-beta.2

### Minor Changes

- [#640](https://github.com/celo-org/developer-tooling/pull/640) [`04c89f7`](https://github.com/celo-org/developer-tooling/commit/04c89f739b1056330c5ca287234c9336c19b11e9) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - expose `deriveLedgerAccounts` function

### Patch Changes

- [#651](https://github.com/celo-org/developer-tooling/pull/651) [`5a2fa51`](https://github.com/celo-org/developer-tooling/commit/5a2fa5196976fffd7c89c804c68b7507e9c48f92) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Removes unused dependencies

- Updated dependencies [[`7d84a5a`](https://github.com/celo-org/developer-tooling/commit/7d84a5a9a23f72572999dc17f24d9b70bf6ca9f6), [`99717e9`](https://github.com/celo-org/developer-tooling/commit/99717e93c640e37e4e67020d973a2a13d5af2ac3), [`5a2fa51`](https://github.com/celo-org/developer-tooling/commit/5a2fa5196976fffd7c89c804c68b7507e9c48f92)]:
  - @celo/base@7.0.3-beta.0

## 1.2.0-beta.1

### Patch Changes

- [#610](https://github.com/celo-org/developer-tooling/pull/610) [`6ca357b`](https://github.com/celo-org/developer-tooling/commit/6ca357bfbbb1075d73c2b8000e01db70959e08f5) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Remove unintuitive mutex impl which resulted in `transport` error in the hw-app-eth

## 1.2.0-beta.0

### Minor Changes

- [#602](https://github.com/celo-org/developer-tooling/pull/602) [`a270c1a`](https://github.com/celo-org/developer-tooling/commit/a270c1aa0c9d5b282396af8812ea9ddbcb7fec9c) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Export a WalletClient

## 1.1.1

### Patch Changes

- [#558](https://github.com/celo-org/developer-tooling/pull/558) [`f11a069`](https://github.com/celo-org/developer-tooling/commit/f11a069b152cb34c18f12b6535f4b217a631079d) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix incorrect repo link in package.json

- [#544](https://github.com/celo-org/developer-tooling/pull/544) [`170e91c`](https://github.com/celo-org/developer-tooling/commit/170e91cbdcdf6d8e398c423355b78f31d4c9e33c) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Allow users to use other apps than ethereum or celo, namely eth recovery in order to recovery funds or signTypedData which isnt supported by celo but would require the correct derivationPath (which, in turn, isn't supported by ethereum)

- Updated dependencies [[`f11a069`](https://github.com/celo-org/developer-tooling/commit/f11a069b152cb34c18f12b6535f4b217a631079d)]:
  - @celo/base@7.0.2

## 1.1.1-beta.0

### Patch Changes

- [#544](https://github.com/celo-org/developer-tooling/pull/544) [`170e91c`](https://github.com/celo-org/developer-tooling/commit/170e91cbdcdf6d8e398c423355b78f31d4c9e33c) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Allow users to use other apps than ethereum or celo, namely eth recovery in order to recovery funds or signTypedData which isnt supported by celo but would require the correct derivationPath (which, in turn, isn't supported by ethereum)

## 1.1.0

### Minor Changes

- [#516](https://github.com/celo-org/developer-tooling/pull/516) [`a8e5099`](https://github.com/celo-org/developer-tooling/commit/a8e50990e71f5d45522d11995836fbee820564c1) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Add (Beta) support for signTypedData in @celo/viem-account-ledger and @celo/wallet-ledger when using with the `ethereum` ledger app.
  when using with the `ethereum` ledger app.

### Patch Changes

- [#497](https://github.com/celo-org/developer-tooling/pull/497) [`79cd947`](https://github.com/celo-org/developer-tooling/commit/79cd94725582be0c62133e98b922d19ed9c0b5de) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - chore: package.json link fixes

- [#492](https://github.com/celo-org/developer-tooling/pull/492) [`2e02d94`](https://github.com/celo-org/developer-tooling/commit/2e02d943adb859b3a5b71432d1d232f3dca44733) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Bump dependncies up

- Updated dependencies [[`2e02d94`](https://github.com/celo-org/developer-tooling/commit/2e02d943adb859b3a5b71432d1d232f3dca44733), [`79cd947`](https://github.com/celo-org/developer-tooling/commit/79cd94725582be0c62133e98b922d19ed9c0b5de), [`07c4c78`](https://github.com/celo-org/developer-tooling/commit/07c4c7854f419dd07fbf09fe966fb5b378a139d1)]:
  - @celo/base@7.0.1

## 1.1.0-beta.1

### Minor Changes

- [#516](https://github.com/celo-org/developer-tooling/pull/516) [`a8e5099`](https://github.com/celo-org/developer-tooling/commit/a8e50990e71f5d45522d11995836fbee820564c1) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Add (Beta) support for signTypedData in @celo/viem-account-ledger and @celo/wallet-ledger when using with the `ethereum` ledger app.
  when using with the `ethereum` ledger app.

## 1.0.1-beta.0

### Patch Changes

- [#497](https://github.com/celo-org/developer-tooling/pull/497) [`79cd947`](https://github.com/celo-org/developer-tooling/commit/79cd94725582be0c62133e98b922d19ed9c0b5de) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - chore: package.json link fixes

- [#492](https://github.com/celo-org/developer-tooling/pull/492) [`2e02d94`](https://github.com/celo-org/developer-tooling/commit/2e02d943adb859b3a5b71432d1d232f3dca44733) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Bump dependncies up

- Updated dependencies [[`2e02d94`](https://github.com/celo-org/developer-tooling/commit/2e02d943adb859b3a5b71432d1d232f3dca44733), [`79cd947`](https://github.com/celo-org/developer-tooling/commit/79cd94725582be0c62133e98b922d19ed9c0b5de), [`07c4c78`](https://github.com/celo-org/developer-tooling/commit/07c4c7854f419dd07fbf09fe966fb5b378a139d1)]:
  - @celo/base@7.0.1-beta.0

## 1.0.0

### Major Changes

- [#344](https://github.com/celo-org/developer-tooling/pull/344) [`6bba5e3`](https://github.com/celo-org/developer-tooling/commit/6bba5e377cded1c8216c5cd1cadeb4b8b764df55) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Initial release

### Patch Changes

- [#443](https://github.com/celo-org/developer-tooling/pull/443) [`a23246e`](https://github.com/celo-org/developer-tooling/commit/a23246e82e17424cb22c04cce197eb84a2cac54c) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Safer handling of v from device

- [#427](https://github.com/celo-org/developer-tooling/pull/427) [`ee33677`](https://github.com/celo-org/developer-tooling/commit/ee33677287905076daafe39087283fe2434d729e) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Change a dependency to use npm rather than github

- Updated dependencies [[`4ef76eb`](https://github.com/celo-org/developer-tooling/commit/4ef76eb174454f60304080d0ef63a859cd8d931b), [`26b9779`](https://github.com/celo-org/developer-tooling/commit/26b9779071ecb0283644412587d5a6d8bd6fd5a0)]:
  - @celo/base@7.0.0

## 1.0.0-beta.2

### Patch Changes

- [#443](https://github.com/celo-org/developer-tooling/pull/443) [`a23246e`](https://github.com/celo-org/developer-tooling/commit/a23246e82e17424cb22c04cce197eb84a2cac54c) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Safer handling of v from device

## 1.0.0-beta.1

### Patch Changes

- [#427](https://github.com/celo-org/developer-tooling/pull/427) [`ee33677`](https://github.com/celo-org/developer-tooling/commit/ee33677287905076daafe39087283fe2434d729e) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Change a dependency to use npm rather than github

## 1.0.0-beta.0

### Major Changes

- [#344](https://github.com/celo-org/developer-tooling/pull/344) [`6bba5e3`](https://github.com/celo-org/developer-tooling/commit/6bba5e377cded1c8216c5cd1cadeb4b8b764df55) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Initial release

### Patch Changes

- Updated dependencies [[`4ef76eb`](https://github.com/celo-org/developer-tooling/commit/4ef76eb174454f60304080d0ef63a859cd8d931b)]:
  - @celo/base@7.0.0-beta.0
