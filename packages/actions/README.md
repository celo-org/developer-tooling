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


### Structure 


- /contracts (only interact with 1 contract)
    - accounts
      (getAccountsContract, signerToAccount, getNames)
    - governance
    - lockedcelo
    - epochmanager
    - validators
    - registry
      (resolveAddress)

- /multicontract-interactions
  - stake (elected community nodes)
  - govern (on chain governance propositions)
  - network (read on and off chain info about the chain)
  