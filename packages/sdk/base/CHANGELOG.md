# @celo/base

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
