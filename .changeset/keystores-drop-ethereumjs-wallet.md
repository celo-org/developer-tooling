---
'@celo/keystores': patch
---

Replace the deprecated `ethereumjs-wallet` dependency with an in-package V3
keystore implementation built on `@noble/hashes` and `@noble/ciphers`.

`ethereumjs-wallet` pulled in the unmaintained browserify crypto stack
(`ethereum-cryptography@0.1.3`, `pbkdf2`, `sha.js`, `cipher-base`, `secp256k1@4`,
`elliptic`), which carried several critical advisories — among them `pbkdf2`
silently returning static keys for `Uint8Array` input, and hash-rewind flaws in
`sha.js` and `cipher-base`. Those packages are no longer in the dependency tree.

The keystore format is unchanged: encryption still uses geth's defaults (scrypt
n=262144, r=8, p=1, AES-128-CTR, keccak256 MAC), and geth-generated keystores
still decrypt. Decryption now accepts only the `aes-128-ctr` cipher rather than
passing the file's `cipher` field to an arbitrary cipher constructor.
