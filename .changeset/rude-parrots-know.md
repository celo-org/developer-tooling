---
'@celo/base': major
'@celo/utils': major
---

remove deprecated functions and consts exported from ./contacts and ./displayformating. ./currencies and ./phonenumbers. If these are used by your app we recommend to inline the functions from the previous release. 

* https://github.com/celo-org/developer-tooling/blob/%40celo/wallet-base%406.0.1/packages/sdk/base/src/contacts.ts 
* https://github.com/celo-org/developer-tooling/blob/%40celo/wallet-base%406.0.1/packages/sdk/base/src/displayFormatting.ts 
* https://github.com/celo-org/developer-tooling/blob/%40celo/wallet-base%406.0.1/packages/sdk/base/src/phoneNumbers.ts

https://github.com/celo-org/developer-tooling/tree/%40celo/wallet-base%406.0.1/packages/sdk/base/src

Full List of removed exports -- ContactPhoneNumber, MinimalContact, getContactPhoneNumber, isContact, CURRENCY_ENUM, Currency, CURRENCIES, resolveCurrency, SHORT_CURRENCIES, currencyToShortMap | getErrorMessage | anonymizedPhone | getContactNameHash



