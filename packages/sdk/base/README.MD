
# @celo/base

This package contains shared classes and functions used by other celo packages. It was designed to have minimal external dependencies. (for shared celo functions that have big external dependencies see the @celo/utils, @celo/cryptographic-utils, @celo/phone-utils, @celo/network-utils packages)

## How we work

We are a GitHub-first team, which means we have a strong preference for communicating via GitHub. 
Please use GitHub to:

🐞 [File a bug report](https://github.com/celo-org/developer-tooling/issues/new/choose)

💬 [Ask a question](https://github.com/celo-org/developer-tooling/discussions)

✨ [Suggest a feature](httpsi//github.com/celo-org/developer-tooling/issues/new/choose)

🧑‍💻 [Contribute!](/CONTRIBUTING.md)

🚔 [Report a security vulnerability](https://github.com/celo-org/developer-tooling/issues/new/choose)

> [!TIP]
> 
> Please avoid messaging us via Slack, Telegram, or email. We are more likely to respond to you on 
> GitHub than if you message us anywhere else. We actively monitor GitHub, and will get back to you shortly 🌟

## Notable Types

```typescript
// enums StableTokens and Token are enums, CeloTokenType is the type that must be one of the 2 enums
import { StableTokens, Token, CeloTokenType } from "@celo/base"

StableTokens.cUSD

StableTokens.cREAL

Token.CELO
```

## Notable Functions

```typescript
import { eqAddress, normalizeAddress, isNullAddress } from "@celo/base"
```
