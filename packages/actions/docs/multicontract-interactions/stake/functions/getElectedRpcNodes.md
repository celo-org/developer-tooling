[**@Celo/Actions v0.1.0-beta.1**](../../../README.md)

***

[@Celo/Actions](../../../modules.md) / [multicontract-interactions/stake](../README.md) / getElectedRpcNodes

# Function: getElectedRpcNodes()

> **getElectedRpcNodes**(`client`, `options`): `Promise`\<`ElectedRpcNode`[]\>

Retrieves the list of currently elected RPC nodes (validators) along with their associated metadata.

This function fetches the elected validator signers from the epoch manager contract,
maps them to their corresponding accounts, and then decorates each validator with additional
information such as their name. Optionally, it can also include information about changes
in validator status if the `showChanges` option is enabled.

## Parameters

### client

The public client instance used to interact with the blockchain.

### options

Optional settings for the function.

#### showChanges?

`boolean`

If true, includes information about changes in validator status.

## Returns

`Promise`\<`ElectedRpcNode`[]\>

A promise that resolves to an array of elected validator objects, each decorated with additional metadata.
