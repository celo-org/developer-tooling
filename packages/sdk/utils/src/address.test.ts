import { getAddressChunks, isValidAddress, isValidChecksumAddress } from './address'

describe(getAddressChunks, () => {
  test('splits the address into chunks of 4 chars', async () => {
    expect(getAddressChunks('0xce10ce10ce10ce10ce10ce10ce10ce10ce10ce10')).toEqual([
      'ce10',
      'ce10',
      'ce10',
      'ce10',
      'ce10',
      'ce10',
      'ce10',
      'ce10',
      'ce10',
      'ce10',
    ])
  })

  describe('isValidAddress', () => {
    describe('when nothing', () => {
      it('returns false', () => {
        expect(isValidAddress(null as any)).toBe(false)
      })
    })

    describe('when a random string', () => {
      it('returns false', () => {
        expect(isValidAddress('532ttgs7')).toBe(false)
      })
    })
    describe('when an address', () => {
      it('returns true', () => {
        expect(isValidAddress('0x52395FA87E9EB5b2FB3ec47a34a196AdA5bcF0D0')).toBe(true)
      })
    })
    describe('when an zero address', () => {
      it('returns true', () => {
        expect(isValidAddress('0x0000000000000000000000000000000000000000')).toBe(true)
      })
    })

    describe('when UPPERCASE', () => {
      it('returns true', () => {
        expect(isValidAddress('0x52395FA87E9EB5b2FB3ec47a34a196AdA5bcF0D0'.toUpperCase())).toBe(
          true
        )
      })
    })

    describe('when LOWERCASE', () => {
      it('returns true', () => {
        expect(isValidAddress('0x52395FA87E9EB5b2FB3ec47a34a196AdA5bcF0D0'.toLowerCase())).toBe(
          true
        )
      })
    })
  })

  describe('isValidChecksumAddress', () => {
    const checksummed = '0x52395FA87E9EB5b2FB3ec47a34a196AdA5bcF0D0'

    it('returns true for a correctly EIP-55 checksummed address', () => {
      expect(isValidChecksumAddress(checksummed)).toBe(true)
    })

    // viem's isAddress({ strict: true }) accepts this; a checksum validator must not.
    it('returns false for the same address all-lowercase', () => {
      expect(isValidChecksumAddress(checksummed.toLowerCase())).toBe(false)
    })

    it('returns false for a non-address string', () => {
      expect(isValidChecksumAddress('not-an-address')).toBe(false)
    })
  })
})
