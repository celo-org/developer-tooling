`celocli rewards`
=================

Show rewards information about a voter, registered Validator, or Validator Group

* [`celocli rewards:show`](#celocli-rewardsshow)

## `celocli rewards:show`

Show rewards information about a voter, registered Validator, or Validator Group

```
USAGE
  $ celocli rewards:show [--gasCurrency
    0x1234567890123456789012345678901234567890] [--globalHelp] [--estimate] [--voter
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d] [--validator
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d] [--group
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d] [--slashing] [--epochs <value>]
    [--columns <value> | -x] [--filter <value>] [--no-header | [--csv | --no-truncate]]
    [--output csv|json|yaml |  | ] [--sort <value>]

FLAGS
  -x, --extended
      show extra columns

  --columns=<value>
      only show provided columns (comma-separated)

  --csv
      output is csv format [alias: --output=csv]

  --epochs=<value>
      [default: 1] Show results for the last N epochs

  --estimate
      Estimate voter rewards from current votes

  --filter=<value>
      filter property by partial string matching, ex: name=foo

  --gasCurrency=0x1234567890123456789012345678901234567890
      Use a specific gas currency for transaction fees (defaults to CELO if no gas
      currency is supplied). It must be a whitelisted token.

  --globalHelp
      View all available global flags

  --group=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      Validator Group to show rewards for

  --no-header
      hide table header from output

  --no-truncate
      do not truncate output to fit screen

  --output=<option>
      output in a more machine friendly format
      <options: csv|json|yaml>

  --slashing
      Show rewards for slashing

  --sort=<value>
      property to sort by (prepend '-' for descending)

  --validator=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      Validator to show rewards for

  --voter=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      Voter to show rewards for

DESCRIPTION
  Show rewards information about a voter, registered Validator, or Validator Group

EXAMPLES
  show --voter 0x5409ed021d9299bf6814279a6a1411a7e866a631
```

_See code: [src/commands/rewards/show.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/rewards/show.ts)_
