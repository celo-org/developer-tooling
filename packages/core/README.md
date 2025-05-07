# @celo/core

@celo/core is a rpc client agnostic, dependency free, library which abstracts away the logic for common but complicated interactions with Celo Core contracts. 

Each interaction is handled via an async function with interface like `(adapter, params, options) => Promise<Result>`

## anti goals of @celo/core

* providing functions for every single interaction one could have with Celo. 

## goals of @celo/core

* abstract away the implementation details of complicated critical celo contract interaction
* have a well tested suite of functions for common operations anyone can use with any rpc client library


## usage

Because @celo/core doesnt care how you connect to your rpc node it is up to you to provide an adapter to do the network calls. an addapter is a collection of contract read and write functions which correspond directly to view functions and public/external functions on the contracts the core interaction uses.
