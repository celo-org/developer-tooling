`celocli epochs`
================

Finishes next epoch process.

* [`celocli epochs:finish`](#celocli-epochsfinish)
* [`celocli epochs:start`](#celocli-epochsstart)
* [`celocli epochs:switch`](#celocli-epochsswitch)

## `celocli epochs:finish`

Finishes next epoch process.

```
USAGE
  $ celocli epochs:finish --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
    [--gasCurrency 0x1234567890123456789012345678901234567890] [--globalHelp]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d         (required) Account Address
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags

DESCRIPTION
  Finishes next epoch process.

EXAMPLES
  finish --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95
```

_See code: [src/commands/epochs/finish.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/epochs/finish.ts)_

## `celocli epochs:start`

Starts next epoch process.

```
USAGE
  $ celocli epochs:start --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
    [--gasCurrency 0x1234567890123456789012345678901234567890] [--globalHelp]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d         (required) Account Address
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags

DESCRIPTION
  Starts next epoch process.

EXAMPLES
  start --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95
```

_See code: [src/commands/epochs/start.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/epochs/start.ts)_

## `celocli epochs:switch`

Finishes current epoch and starts a new one.

```
USAGE
  $ celocli epochs:switch --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
    [--gasCurrency 0x1234567890123456789012345678901234567890] [--globalHelp]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d         (required) Account Address
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags

DESCRIPTION
  Finishes current epoch and starts a new one.

EXAMPLES
  switch --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95
```

_See code: [src/commands/epochs/switch.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/epochs/switch.ts)_
