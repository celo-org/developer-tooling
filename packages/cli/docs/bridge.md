# Bridge Commands

Bridge CELO tokens between Ethereum (L1) and Celo (L2) using the OP Stack bridge.

## Overview

The bridge commands allow you to move CELO between Ethereum (Layer 1) and Celo (Layer 2):

- **Deposit** (L1 → L2): Move CELO from Ethereum to Celo. Takes ~15 minutes.
- **Withdrawal** (L2 → L1): Move CELO from Celo to Ethereum. Takes ~7 days due to the challenge period.

## Prerequisites

- A wallet with CELO on the source chain
- RPC URLs for both L1 (Ethereum) and L2 (Celo)
- A private key or Ledger hardware wallet for signing transactions

## Deposit: Ethereum (L1) → Celo (L2)

Deposits are simple — one command, ~15 minute wait.

### Command

```bash
celocli bridge:deposit \
  --from 0xYourAddress \
  --to 0xRecipientOnL2 \
  --value 1000000000000000000 \
  --network mainnet \
  --l1RpcUrl https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY \
  -k 0xYourPrivateKey
```

### Flags

| Flag | Required | Description |
|------|----------|-------------|
| `--from` | Yes | Your address on L1 (sender) |
| `--to` | No | Recipient address on L2 (defaults to `--from`) |
| `--value` | Yes | Amount in wei (1 CELO = 1000000000000000000) |
| `--network` | Yes | `mainnet` or `sepolia` |
| `--l1RpcUrl` | Yes | Ethereum RPC URL |
| `--gaslimit` | No | L2 gas limit (default: 100000) |
| `-k` / `--privateKey` | Yes* | Private key for signing |
| `--useLedger` | Yes* | Use Ledger hardware wallet |

*One of `--privateKey` or `--useLedger` is required.

### What happens

1. The CLI retrieves the CELO token address on L1
2. Approves the bridge contract to spend your CELO
3. Submits the deposit transaction
4. Your CELO appears on L2 in ~15 minutes

## Withdrawal: Celo (L2) → Ethereum (L1)

Withdrawals are a multi-step process due to the OP Stack's 7-day security challenge period.

### Step 1: Initiate the Withdrawal

```bash
celocli bridge:withdraw-init \
  --from 0xYourL2Address \
  --to 0xYourL1Address \
  --value 1000000000000000000 \
  --network mainnet \
  -n mainnet \
  -k 0xYourPrivateKey
```

**Save the transaction hash from the output!** You'll need it for all subsequent steps.

### Step 2: Submit the Proof (~1 hour after Step 1)

Wait about 1 hour for the L2 output to be published on L1, then submit the proof:

```bash
celocli bridge:withdraw-prove \
  --txHash 0xYourL2TxHash \
  --from 0xYourAddress \
  --network mainnet \
  --l1RpcUrl https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY \
  -n mainnet \
  -k 0xYourPrivateKey
```

This command will wait for the proof to become available if it isn't ready yet.

### Step 3: Wait for the Challenge Period (7 days)

After proving, you must wait 7 days for the security challenge period to pass. You can check the status at any time:

```bash
celocli bridge:withdraw-status \
  --txHash 0xYourL2TxHash \
  --network mainnet \
  --l1RpcUrl https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY \
  -n mainnet
```

The status command will tell you exactly where your withdrawal stands and what to do next.

### Step 4: Finalize and Claim (after 7 days)

Once the challenge period has passed:

```bash
celocli bridge:withdraw-finalize \
  --txHash 0xYourL2TxHash \
  --from 0xYourAddress \
  --network mainnet \
  --l1RpcUrl https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY \
  -n mainnet \
  -k 0xYourPrivateKey
```

Your CELO will be transferred to your L1 address.

## Checking Withdrawal Status

You can check the status of any withdrawal at any point:

```bash
celocli bridge:withdraw-status \
  --txHash 0xYourL2TxHash \
  --network mainnet \
  --l1RpcUrl https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY \
  -n mainnet
```

### Possible Statuses

| Status | Meaning | Next Action |
|--------|---------|-------------|
| **Waiting to Prove** | Withdrawal initiated, proof not yet available | Wait ~1 hour |
| **Ready to Prove** | Proof available | Run `bridge:withdraw-prove` |
| **Waiting to Finalize** | Proof submitted, challenge period in progress | Wait (up to 7 days) |
| **Ready to Finalize** | Challenge period passed | Run `bridge:withdraw-finalize` |
| **Finalized** | Complete | Nothing — funds are on L1 |

## Network Support

| Network | L1 | L2 |
|---------|----|----|
| `mainnet` | Ethereum Mainnet | Celo Mainnet |
| `sepolia` | Ethereum Sepolia | Celo Sepolia |

## Using with Ledger

All bridge commands support Ledger hardware wallets. Replace `-k 0xYourPrivateKey` with `--useLedger`:

```bash
celocli bridge:deposit \
  --from 0xYourAddress \
  --value 1000000000000000000 \
  --network mainnet \
  --l1RpcUrl https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY \
  --useLedger
```

## Common Issues

**"Bridge commands require --privateKey or --useLedger"**
You must provide a signing method. Add `-k 0xYourKey` or `--useLedger`.

**"Cannot finalize: The 7-day challenge period has not passed yet"**
The challenge period hasn't elapsed. Run `bridge:withdraw-status` to check progress.

**"Cannot finalize: The withdrawal has not been proven yet"**
You need to submit the proof first with `bridge:withdraw-prove`.
