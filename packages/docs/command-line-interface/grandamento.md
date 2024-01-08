# `celocli grandamento`

Cancels a Granda Mento exchange proposal


## `celocli grandamento:cancel`

Cancels a Granda Mento exchange proposal

```
USAGE
  $ celocli grandamento:cancel --from <value> (--proposalID <value> |  | )
  [--globalHelp]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d  (required) The address allowed to
                                                     cancel the proposal
  --globalHelp                                       View all available global flags
  --proposalID=<value>                               (required) UUID of proposal to view

DESCRIPTION
  Cancels a Granda Mento exchange proposal
```

_See code: [src/commands/grandamento/cancel.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/grandamento/cancel.ts)_

## `celocli grandamento:execute`

Executes a Granda Mento exchange proposal

```
USAGE
  $ celocli grandamento:execute --from <value> --proposalID <value> [--globalHelp]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d  (required) The address to execute
                                                     the exchange proposal
  --globalHelp                                       View all available global flags
  --proposalID=<value>                               (required) UUID of proposal to view

DESCRIPTION
  Executes a Granda Mento exchange proposal
```

_See code: [src/commands/grandamento/execute.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/grandamento/execute.ts)_

## `celocli grandamento:get-buy-amount`

Gets the buy amount for a prospective Granda Mento exchange

```
USAGE
  $ celocli grandamento:get-buy-amount --value <value> --stableToken
    cUSD|cusd|cEUR|ceur|cREAL|creal --sellCelo [--globalHelp]

FLAGS
  --globalHelp                     View all available global flags
  --sellCelo                       (required) Sell or buy CELO
  --stableToken=<option>           (required) [default: cusd] Name of the stable to
                                   receive or send
                                   <options: cUSD|cusd|cEUR|ceur|cREAL|creal>
  --value=10000000000000000000000  (required) The value of the tokens to exchange

DESCRIPTION
  Gets the buy amount for a prospective Granda Mento exchange
```

_See code: [src/commands/grandamento/get-buy-amount.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/grandamento/get-buy-amount.ts)_

## `celocli grandamento:list`

List current active Granda Mento exchange proposals

```
USAGE
  $ celocli grandamento:list [--globalHelp]

FLAGS
  --globalHelp  View all available global flags

DESCRIPTION
  List current active Granda Mento exchange proposals
```

_See code: [src/commands/grandamento/list.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/grandamento/list.ts)_

## `celocli grandamento:propose`

Proposes a Granda Mento exchange

```
USAGE
  $ celocli grandamento:propose --from <value> --value <value> --stableToken
    cUSD|cusd|cEUR|ceur|cREAL|creal --sellCelo [--globalHelp]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d  (required) The address with tokens
                                                     to exchange
  --globalHelp                                       View all available global flags
  --sellCelo                                         (required) Sell or buy CELO
  --stableToken=<option>                             (required) [default: cusd] Name of
                                                     the stable to receive or send
                                                     <options:
                                                     cUSD|cusd|cEUR|ceur|cREAL|creal>
  --value=10000000000000000000000                    (required) The value of the tokens
                                                     to exchange

DESCRIPTION
  Proposes a Granda Mento exchange
```

_See code: [src/commands/grandamento/propose.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/grandamento/propose.ts)_

## `celocli grandamento:show`

Shows details of a Granda Mento exchange proposal

```
USAGE
  $ celocli grandamento:show --proposalID <value> [--globalHelp]

FLAGS
  --globalHelp          View all available global flags
  --proposalID=<value>  (required) UUID of proposal to view

DESCRIPTION
  Shows details of a Granda Mento exchange proposal
```

_See code: [src/commands/grandamento/show.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/grandamento/show.ts)_
