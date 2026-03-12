# Decisions

## 2026-02-27 User Decisions
- Drop parsers, use viem native (bigint, boolean, address) — but keep parser functions exported (CLI imports them)
- Big bang migration — all 24 wrappers in one PR, structured as reviewable waves
- Internal only — keep all public return types identical, no breaking changes for consumers
