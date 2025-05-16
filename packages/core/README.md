# @celo/core

@celo/core is a rpc client agnostic, nearly dependency free, library which abstracts away the logic for common but complicated interactions with Celo Core contracts. 

Each interaction is handled via an async function with interface like `(adapter, params, options) => Promise<Result>`


## Goals of @celo/core

* abstract away the implementation details of complicated and critical celo contract interaction where multiple contracts might be involved to achieve the task.
* have a well tested suite of functions for common contract operations anyone can use with any rpc client library


## Antigoals of @celo/core

* providing functions for every single interaction one could have with Celo. Instead call the contracts directly or use @celo/actions


## Usage

Because @celo/core doesnt care how you connect to your rpc node it is up to you to provide an adapter to do the network calls. an adapter is a collection of contract read and write functions which correspond directly to view functions and public/external functions on the contracts the core interaction uses.


### Structure / Available 

core operations are grouped by theme. 


* staking
* governing


