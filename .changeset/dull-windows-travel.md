---
'@celo/celocli': major
---

Remove `celocli validator:force-deaffiliate`

This command was only ever usable pre mainnet launch. The force deaffiliate method it would call is only callable by one of the whitelisted Slasher Contracts. 

To force removal of validator with poor uptime use `celocli validator:downtime-slash` or to sever association with a validator from your group use `celocli validator:deaffiliate` 