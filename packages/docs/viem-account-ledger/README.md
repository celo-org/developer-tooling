**@celo/viem-account-ledger v1.2.0-beta.2**

***

# @celo/viem-account-ledger

This library aims to ease the usage of a ledger device with (viem)[https://viem.sh/].

## Installation

```bash
npm install @celo/viem-account-ledger viem@2 @ledgerhq/transport-node-hid@6.x
# or yarn or bun or ...
```

> [!IMPORTANT] > `viem` is a peer dependency and MUST be installed alongside this library.
> `@ledgerhq/transport-node-hid` is a peer dependency and MUST be installed alongside this library.

## Usage

```ts
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid'
import { createWalletClient } from 'viem'
import { celo, celoAlfajores } from 'viem/chains'
import { ledgerToAccount } from '@celo/viem-account-ledger'

async function main() => {
  const account = await ledgerToAccount({
    transport: await TransportNodeHid.open(''),
  })
  const client = createWalletClient({
    account,
    chain: celo,
    transport: http()
  });
  await client.sendTransaction({
    to: '0x123...',
    value: 10n,
    feeCurrency: '0x123...'
  });
}
```

You can also use the `account` directly eg:

```ts
const account = await ledgerToAccount({
  transport: await TransportNodeHid.open(''),
})
account.signTransaction({
  to: '0x123...',
  value: 123n,
  chainId: celoAlfajores.id,
  nonce: 42,
  maxFeePerGas: 100n,
  maxPriorityFeePerGas: 100n,
  feeCurrency: '0x123...',
})
```
