---
'@celo/base': major
'@celo/utils': major
---

remove deprecated functions and consts exported from ./contacts and ./displayformating. ./currencies and ./phonenumbers. We do not expect this to affect consumers as the use have these functions should have been discontinued and more likely never occured.

Full List of removed exports -- ContactPhoneNumber, MinimalContact, getContactPhoneNumber, isContact, CURRENCY_ENUM, Currency, CURRENCIES, resolveCurrency, SHORT_CURRENCIES, currencyToShortMap | getErrorMessage | anonymizedPhone | getContactNameHash



