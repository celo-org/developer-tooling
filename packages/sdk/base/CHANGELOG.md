# @celo/base

## 7.0.4

### Patch Changes

- [#746](https://github.com/celo-org/developer-tooling/pull/746) [`f78f741`](https://github.com/celo-org/developer-tooling/commit/f78f7414b041d64cf7312876aa874c7761eb5f4b) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Update StableToken to match new Mento naming format cXXX => XXXm https://forum.celo.org/t/mento-stablecoin-rebranding-and-strategic-evolution/12639/10

## 7.0.3

### Patch Changes

- [#628](https://github.com/celo-org/developer-tooling/pull/628) [`7d84a5a`](https://github.com/celo-org/developer-tooling/commit/7d84a5a9a23f72572999dc17f24d9b70bf6ca9f6) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Minor typing improvement

- [#639](https://github.com/celo-org/developer-tooling/pull/639) [`99717e9`](https://github.com/celo-org/developer-tooling/commit/99717e93c640e37e4e67020d973a2a13d5af2ac3) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - use more explicit types for addresses in more places

- [#651](https://github.com/celo-org/developer-tooling/pull/651) [`5a2fa51`](https://github.com/celo-org/developer-tooling/commit/5a2fa5196976fffd7c89c804c68b7507e9c48f92) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Removes unused dependencies

## 7.0.3-beta.0

### Patch Changes

- [#628](https://github.com/celo-org/developer-tooling/pull/628) [`7d84a5a`](https://github.com/celo-org/developer-tooling/commit/7d84a5a9a23f72572999dc17f24d9b70bf6ca9f6) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - Minor typing improvement"

- [#639](https://github.com/celo-org/developer-tooling/pull/639) [`99717e9`](https://github.com/celo-org/developer-tooling/commit/99717e93c640e37e4e67020d973a2a13d5af2ac3) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - use more explicit types for addresses in more places

- [#651](https://github.com/celo-org/developer-tooling/pull/651) [`5a2fa51`](https://github.com/celo-org/developer-tooling/commit/5a2fa5196976fffd7c89c804c68b7507e9c48f92) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Removes unused dependencies

## 7.0.2

### Patch Changes

- [#558](https://github.com/celo-org/developer-tooling/pull/558) [`f11a069`](https://github.com/celo-org/developer-tooling/commit/f11a069b152cb34c18f12b6535f4b217a631079d) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Fix incorrect repo link in package.json

## 7.0.1

### Patch Changes

- [#492](https://github.com/celo-org/developer-tooling/pull/492) [`2e02d94`](https://github.com/celo-org/developer-tooling/commit/2e02d943adb859b3a5b71432d1d232f3dca44733) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Bump @noble/ciphers to use audited version

- [#497](https://github.com/celo-org/developer-tooling/pull/497) [`79cd947`](https://github.com/celo-org/developer-tooling/commit/79cd94725582be0c62133e98b922d19ed9c0b5de) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - chore: package.json link fixes

- [#488](https://github.com/celo-org/developer-tooling/pull/488) [`07c4c78`](https://github.com/celo-org/developer-tooling/commit/07c4c7854f419dd07fbf09fe966fb5b378a139d1) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - New export type DerivationPath. Useful for when a value Must match first part of BIP44

## 7.0.1-beta.0

### Patch Changes

- [#492](https://github.com/celo-org/developer-tooling/pull/492) [`2e02d94`](https://github.com/celo-org/developer-tooling/commit/2e02d943adb859b3a5b71432d1d232f3dca44733) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - Bump @noble/ciphers to use audited version

- [#497](https://github.com/celo-org/developer-tooling/pull/497) [`79cd947`](https://github.com/celo-org/developer-tooling/commit/79cd94725582be0c62133e98b922d19ed9c0b5de) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - chore: package.json link fixes

- [#488](https://github.com/celo-org/developer-tooling/pull/488) [`07c4c78`](https://github.com/celo-org/developer-tooling/commit/07c4c7854f419dd07fbf09fe966fb5b378a139d1) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - New export type DerivationPath. Useful for when a value Must match first part of BIP44

## 7.0.0

### Major Changes

- [#228](https://github.com/celo-org/developer-tooling/pull/228) [`4ef76eb`](https://github.com/celo-org/developer-tooling/commit/4ef76eb174454f60304080d0ef63a859cd8d931b) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - remove deprecated functions and consts exported from ./contacts and ./displayformating. ./currencies and ./phonenumbers. If these are used by your app we recommend to inline the functions from the previous release.

  - https://github.com/celo-org/developer-tooling/blob/%40celo/wallet-base%406.0.1/packages/sdk/base/src/contacts.ts
  - https://github.com/celo-org/developer-tooling/blob/%40celo/wallet-base%406.0.1/packages/sdk/base/src/displayFormatting.ts
  - https://github.com/celo-org/developer-tooling/blob/%40celo/wallet-base%406.0.1/packages/sdk/base/src/phoneNumbers.ts

  https://github.com/celo-org/developer-tooling/tree/%40celo/wallet-base%406.0.1/packages/sdk/base/src

  Full List of removed exports -- ContactPhoneNumber, MinimalContact, getContactPhoneNumber, isContact, CURRENCY_ENUM, Currency, CURRENCIES, resolveCurrency, SHORT_CURRENCIES, currencyToShortMap | getErrorMessage | anonymizedPhone | getContactNameHash

### Minor Changes

- [#471](https://github.com/celo-org/developer-tooling/pull/471) [`26b9779`](https://github.com/celo-org/developer-tooling/commit/26b9779071ecb0283644412587d5a6d8bd6fd5a0) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - add DerivationPathAliases export

## 7.0.0-beta.1

### Minor Changes

- [#471](https://github.com/celo-org/developer-tooling/pull/471) [`26b9779`](https://github.com/celo-org/developer-tooling/commit/26b9779071ecb0283644412587d5a6d8bd6fd5a0) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - add DerivationPathAliases export

## 7.0.0-beta.0

### Major Changes

- [#228](https://github.com/celo-org/developer-tooling/pull/228) [`4ef76eb`](https://github.com/celo-org/developer-tooling/commit/4ef76eb174454f60304080d0ef63a859cd8d931b) Thanks [@aaronmgdr](https://github.com/aaronmgdr)! - remove deprecated functions and consts exported from ./contacts and ./displayformating. ./currencies and ./phonenumbers. If these are used by your app we recommend to inline the functions from the previous release.

  - https://github.com/celo-org/developer-tooling/blob/%40celo/wallet-base%406.0.1/packages/sdk/base/src/contacts.ts
  - https://github.com/celo-org/developer-tooling/blob/%40celo/wallet-base%406.0.1/packages/sdk/base/src/displayFormatting.ts
  - https://github.com/celo-org/developer-tooling/blob/%40celo/wallet-base%406.0.1/packages/sdk/base/src/phoneNumbers.ts

  https://github.com/celo-org/developer-tooling/tree/%40celo/wallet-base%406.0.1/packages/sdk/base/src

  Full List of removed exports -- ContactPhoneNumber, MinimalContact, getContactPhoneNumber, isContact, CURRENCY_ENUM, Currency, CURRENCIES, resolveCurrency, SHORT_CURRENCIES, currencyToShortMap | getErrorMessage | anonymizedPhone | getContactNameHash

## 6.1.0

### Minor Changes

- [#59](https://github.com/celo-org/developer-tooling/pull/59) [`38b2631`](https://github.com/celo-org/developer-tooling/commit/38b26316d615e836e21bbfe2f44853f7e8220e03) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - CHANGE - Replaced all deprecated cryptographic depencies with the audited and maintained suite of crypto libraries `@noble/*` and `@scure/*`

## 6.1.0-beta.0

### Minor Changes

- [#59](https://github.com/celo-org/developer-tooling/pull/59) [`38b2631`](https://github.com/celo-org/developer-tooling/commit/38b26316d615e836e21bbfe2f44853f7e8220e03) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - CHANGE - Replaced all deprecated cryptographic depencies with the audited and maintained suite of crypto libraries `@noble/*` and `@scure/*`

## 6.0.1

### Patch Changes

- [#200](https://github.com/celo-org/developer-tooling/pull/200) [`6e3372f`](https://github.com/celo-org/developer-tooling/commit/6e3372f5ada20bb59d88e275170be4dae1e99f01) Thanks [@nicolasbrugneaux](https://github.com/nicolasbrugneaux)! - The following changes are related to adding support for more fee currencies in the @celo packages.

  (CHANGED): all places referring to gasCurrencies have been changed from `string` to `StrongAddress` for safer types. This shouldn't impact you as you already should have been giving `0x${string}` in these places

## 6.0.1-beta.0

### Patch Changes

- [#188](https://github.com/celo-org/developer-tooling/pull/188) [`08b0d6a`](https://github.com/celo-org/developer-tooling/commit/08b0d6a18b73b01c162f6ba4f97d73f3e3708160) Thanks [@github-actions](https://github.com/apps/github-actions)! - The following changes are related to adding support for more fee currencies in the @celo packages.

  (CHANGED): all places referring to gasCurrencies have been changed from `string` to `StrongAddress` for safer types. This shouldn't impact you as you already should have been giving `0x${string}` in these places

## 6.0.0

### Major Changes

- 97d5ccf43: Remove getIdentifierHash, IdentifierPrefix, getIdentifierPrefix. These have been moved to @celo/odis-identifiers

## 6.0.0-beta.0

### Major Changes

- 97d5ccf43: Remove getIdentifierHash, IdentifierPrefix, getIdentifierPrefix. These have been moved to @celo/odis-identifiers

## 5.0.5

### Patch Changes

- 53bbd4958: Note celo sdk packages will no longer be fix bumped (ie will not share the same version always) and will now use ^range when depending on each other

## 5.0.5-beta.0

### Patch Changes

- 53bbd4958: Note celo sdk packages will no longer be fix bumped (ie will not share the same version always) and will now use ^range when depending on each other
