`celocli network`
=================

View details about the network, like contracts and parameters

* [`celocli network:contracts`](#celocli-networkcontracts)
* [`celocli network:info`](#celocli-networkinfo)
* [`celocli network:parameters`](#celocli-networkparameters)
* [`celocli network:whitelist`](#celocli-networkwhitelist)

## `celocli network:contracts`

Lists Celo core contracts and their addresses.

```
USAGE
  $ celocli network:contracts [--gasCurrency
    0x1234567890123456789012345678901234567890] [--globalHelp] [--columns <value> | -x]
    [--filter <value>] [--no-header | [--csv | --no-truncate]] [--output csv|json|yaml |
    | ] [--sort <value>]

FLAGS
  -x, --extended
      show extra columns

  --columns=<value>
      only show provided columns (comma-separated)

  --csv
      output is csv format [alias: --output=csv]

  --filter=<value>
      filter property by partial string matching, ex: name=foo

  --gasCurrency=0x1234567890123456789012345678901234567890
      Use a specific gas currency for transaction fees (defaults to CELO if no gas
      currency is supplied). It must be a whitelisted token.

  --globalHelp
      View all available global flags

  --no-header
      hide table header from output

  --no-truncate
      do not truncate output to fit screen

  --output=<option>
      output in a more machine friendly format
      <options: csv|json|yaml>

  --sort=<value>
      property to sort by (prepend '-' for descending)

DESCRIPTION
  Lists Celo core contracts and their addresses.
```

_See code: [src/commands/network/contracts.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/network/contracts.ts)_

## `celocli network:info`

View general network information such as the current block number

```
USAGE
  $ celocli network:info [--gasCurrency
    0x1234567890123456789012345678901234567890] [--globalHelp] [--lastN <value>]

FLAGS
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags
  --lastN=<value>                                           [default: 1] Fetch info
                                                            about the last n epochs

DESCRIPTION
  View general network information such as the current block number
```

_See code: [src/commands/network/info.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/network/info.ts)_

## `celocli network:parameters`

View parameters of the network, including but not limited to configuration for the various Celo core smart contracts.

```
USAGE
  $ celocli network:parameters [--gasCurrency
    0x1234567890123456789012345678901234567890] [--globalHelp] [--raw]

FLAGS
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags
  --raw                                                     Display raw numerical
                                                            configuration

DESCRIPTION
  View parameters of the network, including but not limited to configuration for the
  various Celo core smart contracts.
```

_See code: [src/commands/network/parameters.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/network/parameters.ts)_

## `celocli network:whitelist`

List the whitelisted fee currencies

```
USAGE
  $ celocli network:whitelist [--gasCurrency
    0x1234567890123456789012345678901234567890] [--globalHelp] [--columns <value> | -x]
    [--filter <value>] [--no-header | [--csv | --no-truncate]] [--output csv|json|yaml |
    | ] [--sort <value>]

FLAGS
  -x, --extended
      show extra columns

  --columns=<value>
      only show provided columns (comma-separated)

  --csv
      output is csv format [alias: --output=csv]

  --filter=<value>
      filter property by partial string matching, ex: name=foo

  --gasCurrency=0x1234567890123456789012345678901234567890
      Use a specific gas currency for transaction fees (defaults to CELO if no gas
      currency is supplied). It must be a whitelisted token.

  --globalHelp
      View all available global flags

  --no-header
      hide table header from output

  --no-truncate
      do not truncate output to fit screen

  --output=<option>
      output in a more machine friendly format
      <options: csv|json|yaml>

  --sort=<value>
      property to sort by (prepend '-' for descending)

DESCRIPTION
  List the whitelisted fee currencies

EXAMPLES
  whitelist
```

_See code: [src/commands/network/whitelist.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/network/whitelist.ts)_
