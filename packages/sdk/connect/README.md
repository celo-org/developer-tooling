# @celo/connect

*Connect to the Celo Blockchain.*  `Connection` provides the core of what you need to interact with Celo blockchain. The Core Difference between it and ContractKit is that it provides zero Contract Wrappers, and therefore leaves out convenience methods for example for setting FeeCurrency, or getting configs.

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

## Examples

### Basic

```typescript
import { Connection } from '@celo/connect'

const connection = new Connection('YOUR_RPC_URL')
```

For a raw transaction:

```ts
import { parseEther } from 'viem'

const oneCelo = parseEther('1')

const tx = connection.sendTransaction({
  from: myAddress,
  to: someAddress,
  value: oneCelo,
})
const hash = await tx.getHash()
const receipt = await tx.waitReceipt()
```

