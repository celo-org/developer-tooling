---
'@celo/contractkit': major
'@celo/celocli': minor
---

Remove ContractKit's dependency on the Mento `Reserve` and `StableToken` ABIs and repoint the Celo stable tokens onto a viem-native ABI.

- Removed the `ReserveWrapper`, `CeloContract.Reserve`, `ContractKit.getReserve()`, the `reserve` field of `NetworkConfig`, and the `ReserveProxy` init entry.
- `StableToken` / `StableTokenEUR` / `StableTokenBRL` now use a composed `stableTokenViemAbi` (viem's `erc20Abi` + `transferWithComment` from `ICeloToken` + the StableToken admin/`initialize` methods) instead of `@celo/abis` `stableTokenABI`/`reserveABI`. This drops the Mento ABI dependency without waiting on a new `@celo/abis` release.
