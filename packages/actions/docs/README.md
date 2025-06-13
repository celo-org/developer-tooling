**@Celo/Actions v0.0.1-beta.3**

***

# @celo/actions

@celo/actions is viem powered set of functions for interacting with the Celo core contracts.

Functions are in the form of `(client: Client, ...params) => Promise<Result>`

## Goals of @celo/actions

* share well tested reusable code used by celocli with other projects
* an easy to use package for interacting with celo core contracts with limited dependencies

## Antigoals of @celo/actions

* rebuild contractkit

## Consumers

* mondo.celo.org
* @celo/celocli

## Usage

```typescript

```

### Structure

@celo/actions has multiply entrypoints

#### @celo/actions root

Holds Common functions

#### @celo/actions/*ing

Groups of actions which interact with multiple contracts and simply some of the implementation proceedures so you can focus on the intent
  
* staking (elected community nodes)
* governing (on chain governance propositions)

#### @celo/actions/contracts/*

These Only interact with 1 contract
  
* accounts
* governance
* lockedcelo
* epochmanager
* elections
* validators
* registry
