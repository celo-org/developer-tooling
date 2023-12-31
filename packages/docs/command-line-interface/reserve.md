# `celocli reserve`

Shows information about reserve


## `celocli reserve:status`

Shows information about reserve

```
Shows information about reserve

USAGE
  $ celocli reserve:status

OPTIONS
  --globalHelp  View all available global flags

EXAMPLE
  status
```

_See code: [src/commands/reserve/status.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/reserve/status.ts)_

## `celocli reserve:transfergold`

Transfers reserve celo to other reserve address

```
Transfers reserve celo to other reserve address

USAGE
  $ celocli reserve:transfergold

OPTIONS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d  (required) Spender's address
  --globalHelp                                       View all available global flags
  --to=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d    (required) Receiving address

  --useMultiSig                                      True means the request will be sent
                                                     through multisig.

  --value=value                                      (required) The unit amount of CELO

EXAMPLES
  transfergold --value 9000 --to 0x91c987bf62D25945dB517BDAa840A6c661374402 --from
  0x5409ed021d9299bf6814279a6a1411a7e866a631

  transfergold --value 9000 --to 0x91c987bf62D25945dB517BDAa840A6c661374402 --from
  0x5409ed021d9299bf6814279a6a1411a7e866a631 --useMultiSig
```

_See code: [src/commands/reserve/transfergold.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/reserve/transfergold.ts)_
