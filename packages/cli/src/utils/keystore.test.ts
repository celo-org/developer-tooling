import { StrongAddress } from '@celo/base'
import { encryptV3, v3Filename } from '@celo/keystores'
import { ux } from '@oclif/core'
import { mkdtempSync, rmSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { privateKeyFromKeystore } from './keystore'

jest.setTimeout(60000)

const PK1 = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
const ADDRESS1 = '0x1Be31A94361a391bBaFB2a4CCd704F57dc04d4bb' as StrongAddress
const PK2 = '0xd72f6c0b0d7348a72eaa7d3c997bd49293bdc7d4bf79eba03e9f7ca9c5ac6b7f'
const ADDRESS2 = '0x8233d802BdC645d0d1b9B2E6face6e5825905081' as StrongAddress
const PASSWORD = 'test-keystore-password'

describe('privateKeyFromKeystore', () => {
  let dir: string
  let keystore1: string
  let passwordFile: string

  const writeKeystore = async (privateKey: string, password = PASSWORD) => {
    const keystore = await encryptV3(privateKey, password)
    const file = join(dir, v3Filename(keystore.address, Date.parse('2024-01-01T00:00:00Z')))
    writeFileSync(file, JSON.stringify(keystore))
    return file
  }

  beforeAll(async () => {
    dir = mkdtempSync(join(tmpdir(), 'celocli-keystore-test-'))
    keystore1 = await writeKeystore(PK1)
    passwordFile = join(dir, 'password.txt')
    writeFileSync(passwordFile, `${PASSWORD}\n`)
  })

  afterAll(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  describe('given a keystore file', () => {
    it('returns the private key', async () => {
      expect(await privateKeyFromKeystore({ keystorePath: keystore1, passwordFile })).toEqual(PK1)
    })

    it('ignores a trailing newline in the password file', async () => {
      const noNewline = join(dir, 'password-no-newline.txt')
      writeFileSync(noNewline, PASSWORD)
      expect(
        await privateKeyFromKeystore({ keystorePath: keystore1, passwordFile: noNewline })
      ).toEqual(PK1)
    })

    it('fails on a wrong password', async () => {
      const wrong = join(dir, 'wrong.txt')
      writeFileSync(wrong, 'not-the-password')
      await expect(
        privateKeyFromKeystore({ keystorePath: keystore1, passwordFile: wrong })
      ).rejects.toThrow('Key derivation failed - possibly wrong passphrase')
    })

    it('reports which keystore could not be unlocked', async () => {
      const wrong = join(dir, 'wrong2.txt')
      writeFileSync(wrong, 'nope')
      await expect(
        privateKeyFromKeystore({ keystorePath: keystore1, passwordFile: wrong })
      ).rejects.toThrow(keystore1)
    })

    it('fails on a file that is not a keystore', async () => {
      const notKeystore = join(dir, 'notes.txt')
      writeFileSync(notKeystore, 'hello')
      await expect(
        privateKeyFromKeystore({ keystorePath: notKeystore, passwordFile })
      ).rejects.toThrow(/Could not unlock keystore/)
    })
  })

  describe('password prompt', () => {
    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('prompts when no password file is given, hiding the input', async () => {
      const promptSpy = jest.spyOn(ux, 'prompt').mockResolvedValue(PASSWORD)

      expect(await privateKeyFromKeystore({ keystorePath: keystore1 })).toEqual(PK1)
      expect(promptSpy).toHaveBeenCalledWith('Keystore password', {
        type: 'hide',
        required: true,
      })
    })

    it('does not prompt when a password file is given', async () => {
      const promptSpy = jest.spyOn(ux, 'prompt')

      await privateKeyFromKeystore({ keystorePath: keystore1, passwordFile })
      expect(promptSpy).not.toHaveBeenCalled()
    })
  })

  describe('given a directory', () => {
    let multiDir: string

    beforeAll(async () => {
      multiDir = mkdtempSync(join(tmpdir(), 'celocli-keystore-multi-'))
      for (const pk of [PK1, PK2]) {
        const keystore = await encryptV3(pk, PASSWORD)
        writeFileSync(
          join(multiDir, v3Filename(keystore.address, Date.parse('2024-01-01T00:00:00Z'))),
          JSON.stringify(keystore)
        )
      }
    })

    afterAll(() => {
      rmSync(multiDir, { recursive: true, force: true })
    })

    it('selects the keystore matching --from', async () => {
      expect(
        await privateKeyFromKeystore({ keystorePath: multiDir, passwordFile, from: ADDRESS1 })
      ).toEqual(PK1)
      expect(
        await privateKeyFromKeystore({ keystorePath: multiDir, passwordFile, from: ADDRESS2 })
      ).toEqual(PK2)
    })

    it('matches --from regardless of case', async () => {
      expect(
        await privateKeyFromKeystore({
          keystorePath: multiDir,
          passwordFile,
          from: ADDRESS1.toLowerCase() as StrongAddress,
        })
      ).toEqual(PK1)
    })

    it('requires --from, listing the addresses it found', async () => {
      const promise = privateKeyFromKeystore({ keystorePath: multiDir, passwordFile })
      await expect(promise).rejects.toThrow('--from is required')
      await expect(promise).rejects.toThrow(ADDRESS1.toLowerCase())
      await expect(promise).rejects.toThrow(ADDRESS2.toLowerCase())
    })

    it('fails when no keystore matches --from', async () => {
      await expect(
        privateKeyFromKeystore({
          keystorePath: multiDir,
          passwordFile,
          from: '0x0000000000000000000000000000000000000001' as StrongAddress,
        })
      ).rejects.toThrow('No keystore for 0x0000000000000000000000000000000000000001')
    })

    it('skips files that are not keystores', async () => {
      writeFileSync(join(multiDir, 'README'), 'not a keystore')
      expect(
        await privateKeyFromKeystore({ keystorePath: multiDir, passwordFile, from: ADDRESS1 })
      ).toEqual(PK1)
    })

    it('fails when the directory holds no keystores', async () => {
      const empty = mkdtempSync(join(tmpdir(), 'celocli-keystore-empty-'))
      try {
        await expect(
          privateKeyFromKeystore({ keystorePath: empty, passwordFile, from: ADDRESS1 })
        ).rejects.toThrow('No keystore files found')
      } finally {
        rmSync(empty, { recursive: true, force: true })
      }
    })
  })
})
