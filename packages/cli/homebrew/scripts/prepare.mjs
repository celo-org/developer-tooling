import url from 'url'
import crypto from 'crypto'
import fs from 'fs'
import path from 'node:path'
import { parse } from 'semver'
import { pipeline } from 'stream/promises'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const CLI_ROOT = path.join(__dirname, '..', '..')
const DIST_ASSETS = path.join(CLI_ROOT, 'dist')

const { description, homepage, name } = JSON.parse(
  fs.readFileSync(path.join(CLI_ROOT, 'package.json'))
)

const { GITHUB_SHA_SHORT, TARBALL_VERSION } = process.env

if (!GITHUB_SHA_SHORT) {
  console.log('Missing GITHUB_SHA_SHORT in environment; exiting')
  process.exit(1)
}
if (parse(TARBALL_VERSION)?.prerelease.length) {
  console.log('Not on stable release; exiting')
  process.exit(1)
}

async function calculateSHA256(fileName) {
  const hash = crypto.createHash('sha256')
  hash.setEncoding('hex')
  await pipeline(fs.createReadStream(fileName), hash)

  return hash.read()
}

const TEMPLATES = path.join(CLI_ROOT, 'homebrew', 'templates')
const fileSuffix = '.tar.xz'
const ARCH_INTEL = 'x64'
const ARCH_ARM = 'arm64'
const versionedName = `${name}@${TARBALL_VERSION}`
const urlPrefix = `https://github.com/celo-org/developer-tooling/releases/download/${encodeURIComponent(
  versionedName
)}`

const fileNamePrefix = `celocli-v${TARBALL_VERSION}-${GITHUB_SHA_SHORT}`
const fileNameMacIntel = `${fileNamePrefix}-darwin-${ARCH_INTEL}${fileSuffix}`
const fileNameMacArm = `${fileNamePrefix}-darwin-${ARCH_ARM}${fileSuffix}`
const fileNameLinuxIntel = `${fileNamePrefix}-linux-${ARCH_INTEL}${fileSuffix}`
const fileNameLinuxArm = `${fileNamePrefix}-linux-arm${fileSuffix}`

async function updateHomebrewFormula() {
  const templatePath = path.join(TEMPLATES, 'celocli.rb')
  const template = fs.readFileSync(templatePath).toString('utf-8')
  const formulaPath = path.join(CLI_ROOT, 'homebrew', 'Formula', 'celocli.rb')

  const [sha256MacIntel, sha256MacArm, sha256LinuxIntel, sha256LinuxArm] = await Promise.all([
    calculateSHA256(path.join(DIST_ASSETS, fileNameMacIntel)),
    calculateSHA256(path.join(DIST_ASSETS, fileNameMacArm)),
    calculateSHA256(path.join(DIST_ASSETS, fileNameLinuxIntel)),
    calculateSHA256(path.join(DIST_ASSETS, fileNameLinuxArm)),
  ])

  const templateReplaced = template
    .replace('__CLI_VERSION__', TARBALL_VERSION)
    .replace('__CLI__HOMEPAGE__', homepage)
    .replace('__CLI__DESC__', description)

    .replace('__CLI_MAC_INTEL_DOWNLOAD_URL__', `${urlPrefix}/${fileNameMacIntel}`)
    .replace('__CLI_MAC_INTEL_SHA256__', sha256MacIntel)

    .replace('__CLI_MAC_ARM_DOWNLOAD_URL__', `${urlPrefix}/${fileNameMacArm}`)
    .replace('__CLI_MAC_ARM_SHA256__', sha256MacArm)

    .replace('__CLI_LINUX_DOWNLOAD_URL__', `${urlPrefix}/${fileNameLinuxIntel}`)
    .replace('__CLI_LINUX_SHA256__', sha256LinuxIntel)

    .replace('__CLI_LINUX_ARM_DOWNLOAD_URL__', `${urlPrefix}/${fileNameLinuxArm}`)
    .replace('__CLI_LINUX_ARM_SHA256__', sha256LinuxArm)

  fs.writeFileSync(formulaPath, templateReplaced)

  console.log(`done updating celocli Formula in ${formulaPath}`)
}

try {
  // NOTE: this expects the follow command beforehand:
  // yarn oclif pack tarballs
  await updateHomebrewFormula()
} catch (error) {
  console.error(`error running ${__filename}`, error)
  process.exit(1)
}
