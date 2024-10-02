export interface ParsedPhoneNumber {
  e164Number: string
  displayNumber: string
  displayNumberInternational: string
  countryCode?: number
  regionCode?: string
}

const E164_REGEX = /^\+[1-9][0-9]{1,14}$/

export function isE164Number(phoneNumber: string) {
  return E164_REGEX.test(phoneNumber)
}

export const PhoneNumberBase = {
  isE164Number,
}
