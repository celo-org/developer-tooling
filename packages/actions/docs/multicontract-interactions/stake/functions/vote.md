[**@Celo/Actions v0.0.1-beta.3**](../../../README.md)

***

[@Celo/Actions](../../../modules.md) / [multicontract-interactions/stake](../README.md) / vote

# Function: vote()

> **vote**(`clients`, `validatorGroup`, `value`): `Promise`\<`` `0x${string}` ``\>

Casts a vote for a specified validator group using the provided wallet client.

This function interacts with the Election contract to submit a vote for the given
validator group with the specified value. It uses a VoteAdapter to abstract the
voting logic and gas estimation, and delegates the business logic of voting to `@celo/vote`.

## Parameters

### clients

`Required`\<`Clients`\>

### validatorGroup

`` `0x${string}` ``

The address of the validator group to vote for.

### value

`bigint`

The amount of votes in wei (as a bigint) to cast for the validator group.

## Returns

`Promise`\<`` `0x${string}` ``\>

A promise that resolves to a Hex string representing the transaction hash.
