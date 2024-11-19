`celocli config`
================

Configure CLI options which persist across commands

* [`celocli config:get`](#celocli-configget)
* [`celocli config:set`](#celocli-configset)

## `celocli config:get`

Output network node configuration

```
USAGE
  $ celocli config:get [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --gasCurrency=0x1234567890123456789012345678901234567890
      Use a specific gas currency for transaction fees (defaults to CELO if no gas
      currency is supplied). It must be a whitelisted token.

  --globalHelp
      View all available global flags

  --ledgerAddresses=<value>
      [default: 1] If --useLedger is set, this will get the first N addresses for local
      signing

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Output network node configuration

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [src/commands/config/get.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/config/get.ts)_

## `celocli config:set`

Configure running node information for propagating transactions to network

```
USAGE
  $ celocli config:set [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --gasCurrency=0x1234567890123456789012345678901234567890
      Use a specific gas currency for transaction fees (defaults to CELO if no gas
      currency is supplied). It must be a whitelisted token.

  --globalHelp
      View all available global flags

  --ledgerAddresses=<value>
      [default: 1] If --useLedger is set, this will get the first N addresses for local
      signing

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Configure running node information for propagating transactions to network

EXAMPLES
  set --node mainnet # alias for `forno`

  set --node forno # alias for https://forno.celo.org

  set --node baklava # alias for https://baklava-forno.celo-testnet.org

  set --node alfajores # alias for https://alfajores-forno.celo-testnet.org

  set --node localhost # alias for `local`

  set --node local # alias for http://localhost:8545

  set --node ws://localhost:2500

  set --node <geth-location>/geth.ipc

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [src/commands/config/set.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/config/set.ts)_
