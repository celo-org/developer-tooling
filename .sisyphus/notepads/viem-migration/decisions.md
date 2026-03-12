# Decisions — Viem-Native Contract Migration

## 2026-02-26 Architecture
- ViemContract is a plain object `{ abi, address, client }` — no Proxy magic like RpcContract
- Keep `createContract` alive until Phase 7 (only CLI deploy.ts needs it)
- `getPastEvents` reimplemented in BaseWrapper using `eth_getLogs` via rpcCaller + `viemAbiCoder.decodeLog()`
- Connection creates PublicClient from rpcCaller using `custom` transport
- DKG `deploy.ts` is the ONLY file that needs `createContract` for `.deploy()` — special case
