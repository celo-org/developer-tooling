---
'@celo/contractkit': minor
'@celo/celocli': minor
---

Show how many approvers still need to approve.

- `governance:show --proposalID` reports the confirmations the approver multisig is still
  missing, both in the `approvals` map (`required` / `remaining`) and as a note.
- `governance:show --hotfix` gained an `approvals` section with the approver and security
  council progress towards their respective thresholds.
- `multisig:show` reports `confirmations`, `confirmationsRequired` and
  `confirmationsRemaining` per displayed transaction, using the internal threshold for
  transactions the multisig sends to itself.
- `GovernanceWrapper.getApprovalStatus` returns the new `required` and `remaining` fields.
