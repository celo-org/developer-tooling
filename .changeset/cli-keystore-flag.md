---
'@celo/celocli': minor
'@celo/keystores': patch
---

Add a `--keystore` flag for signing with an encrypted keystore file, in the
spirit of `cast --keystore`.

`--keystore` takes a keystore file, or a directory of them in which case
`--from` selects the account. The password is read from `--passwordFile` when
given, and otherwise requested with a hidden prompt. `--keystore` is mutually
exclusive with `--privateKey` and `--useLedger`.

```bash
celocli transfer:celo --keystore ~/keystore/UTC--2024-...--8233d802... --to 0x... --value 1
celocli transfer:celo --keystore ~/keystore --from 0x8233d802... --to 0x... --value 1
```

`@celo/keystores` now exports its V3 keystore primitives (`decryptV3`,
`encryptV3`, `v3Filename`) so that they can be used without going through
`FileKeystore`.

Note that `--keystore` does not yet work with the `bridge:*` commands, which
construct their signer independently of `BaseCommand`.
