**@celo/contractkit v10.0.2-alpha.0**

***

# ContractKit

Celo's ContractKit is a library to help developers and validators to interact with the Celo blockchain.

ContractKit supports the following functionality:

- Interact with json RPC API
- Send Transaction with celo's extra fields: (feeCurrency)
- Build apps to interact with governance and staking

## User Guide

> [!TIP]
> You might not need the ContractKit. For new projects we recommened [viem](https://viem.sh/docs/chains/celo) or [web3](https://www.npmjs.com/package/web3) optionally with [our celo plugin](https://www.npmjs.com/package/@celo/web3-plugin-transaction-types). 

### Getting Started

To install you will need Node.js v18.14.2. or greater. v20 reccomended.

```bash
npm install @celo/contractkit
// or
yarn add @celo/contractkit
```

### Examples

To start working with contractkit you need a `kit` instance:

```ts
import { newKit } from '@celo/contractkit' // or import { newKit } from '@celo/contractkit/lib/mini-kit'

const kit = newKit("https://forno.celo-sepolia.celo-testnet.org")

```

#### List Registered ValidatorGroups

```ts

const validatorsContractWrapper = await kit.contracts.getValidators()
const validatorGroups = await validatorsContractWrapper.getRegisteredValidatorGroups()

```

### Show locked Celo balance for account

```ts
const lockedGoldContractWrapper = await kit.contracts.getLockedGold()

const accountAddress = kit.defaultAccount 
const summary = lockedGoldContractWrapper.getAccountSummary(accountAddress!)

```

### More Information

You can find more information about the ContractKit in the Celo docs at [https://docs.celo.org/developer-guide/contractkit](https://docs.celo.org/developer-guide/contractkit).

## How we work

We are a GitHub-first team, which means we have a strong preference for communicating via GitHub.
Please use GitHub to:

🐞 [File a bug report](https://github.com/celo-org/developer-tooling/issues/new/choose)

💬 [Ask a question](https://github.com/celo-org/developer-tooling/discussions)

✨ [Suggest a feature](https://github.com/celo-org/developer-tooling/issues/new/choose)

🧑‍💻 [Contribute!](/CONTRIBUTING.md)

🚔 [Report a security vulnerability](https://github.com/celo-org/developer-tooling/issues/new/choose)

> [!TIP]
>
> Please avoid messaging us via Slack, Telegram, or email. We are more likely to respond to you on
> GitHub than if you message us anywhere else. We actively monitor GitHub, and will get back to you shortly 🌟

### Debugging

If you need to debug `kit`, we use the well known [debug](https://github.com/visionmedia/debug) node library.

So set the environment variable `DEBUG` as:

```bash
DEBUG="kit:*,
```
