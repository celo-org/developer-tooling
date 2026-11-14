import { normalizeAddressWith0x, StrongAddress } from '@celo/base'
import { decryptV3 } from '@celo/keystores'
import { ux } from '@oclif/core'
import { readdirSync, readFileSync, statSync } from 'fs'
import path from 'path'
import { failWith } from './cli'

interface KeystoreOptions {
  /** Path to a keystore file, or to a directory containing keystore files */
  keystorePath: string
  /** Path to a file whose contents are the passphrase */
  passwordFile?: string
  /** Which account to unlock; required when keystorePath is a directory */
  from?: StrongAddress
}

/**
 * Reads the address a keystore entry belongs to without decrypting it.
 * Returns undefined for files that aren't keystores, so that unrelated files
 * sitting in a keystore directory are skipped rather than fatal.
 */
function readKeystoreAddress(file: string): string | undefined {
  try {
    const { address } = JSON.parse(readFileSync(file, 'utf8'))
    return typeof address === 'string' ? normalizeAddressWith0x(address) : undefined
  } catch {
    return undefined
  }
}

/**
 * Picks the keystore file holding a given address out of a directory.
 * Keystore filenames are conventional, not authoritative, so entries are
 * matched on the address recorded inside each file.
 */
function findKeystoreInDirectory(directory: string, from?: StrongAddress): string {
  const entries = readdirSync(directory)
    .map((name) => path.join(directory, name))
    .filter((file) => statSync(file).isFile())
    .map((file) => ({ file, address: readKeystoreAddress(file) }))
    .filter((entry): entry is { file: string; address: string } => entry.address !== undefined)

  if (entries.length === 0) {
    failWith(`No keystore files found in "${directory}"`)
  }
  if (!from) {
    failWith(
      `--from is required to choose which account to unlock in "${directory}". Available: ${entries
        .map((entry) => entry.address)
        .join(', ')}`
    )
  }

  const match = entries.find((entry) => entry.address === normalizeAddressWith0x(from))
  if (!match) {
    failWith(
      `No keystore for ${from} in "${directory}". Available: ${entries
        .map((entry) => entry.address)
        .join(', ')}`
    )
  }
  return match.file
}

async function readPassphrase(passwordFile?: string): Promise<string> {
  if (passwordFile) {
    // Trailing newlines are an artifact of writing the file, not part of the passphrase.
    return readFileSync(passwordFile, 'utf8').replace(/\r?\n$/, '')
  }
  return ux.prompt('Keystore password', { type: 'hide', required: true })
}

/**
 * Resolves the private key held in a keystore, prompting for the passphrase
 * unless a password file is given.
 * @returns Private key as a 0x-prefixed hex string
 */
export async function privateKeyFromKeystore({
  keystorePath,
  passwordFile,
  from,
}: KeystoreOptions): Promise<string> {
  const keystoreFile = statSync(keystorePath).isDirectory()
    ? findKeystoreInDirectory(keystorePath, from)
    : keystorePath

  const passphrase = await readPassphrase(passwordFile)
  try {
    return await decryptV3(readFileSync(keystoreFile, 'utf8'), passphrase)
  } catch (error) {
    return failWith(`Could not unlock keystore "${keystoreFile}": ${(error as Error).message}`)
  }
}
