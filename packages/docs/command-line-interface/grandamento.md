`celocli grandamento`
=====================

Cancels a Granda Mento exchange proposal

* [`celocli grandamento:cancel`](#celocli-grandamentocancel)
* [`celocli grandamento:execute`](#celocli-grandamentoexecute)
* [`celocli grandamento:get-buy-amount`](#celocli-grandamentoget-buy-amount)
* [`celocli grandamento:list`](#celocli-grandamentolist)
* [`celocli grandamento:propose`](#celocli-grandamentopropose)
* [`celocli grandamento:show`](#celocli-grandamentoshow)

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
