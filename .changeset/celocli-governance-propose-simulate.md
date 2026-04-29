---
'@celo/celocli': minor
---

Add `--simulate` flag to `governance:propose` command to simulate proposal execution against a forked node (e.g. anvil) before submitting on-chain.

Unlike the default `eth_call`-based simulation, `--simulate` actually sends each proposal transaction sequentially from the Governance contract address (which the node must have unlocked, e.g. `anvil --auto-impersonate`). This means transactions execute against cumulative state changes — useful for proposals where the success of one transaction depends on a previous one succeeding. If any transaction fails, the proposal is not submitted and the decoded revert reason is printed.

Example: `celocli governance:propose --jsonTransactions ./transactions.json --deposit 100e18 --from 0x... --descriptionURL https://... --simulate http://127.0.0.1:8545`
