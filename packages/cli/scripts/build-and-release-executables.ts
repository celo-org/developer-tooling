import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import { parse } from 'semver'
import { pipeline } from 'stream/promises'
import { description, homepage, name, version } from '../package.json'

const { GITHUB_SHA_SHORT } = process.env

if (parse(version)?.prerelease.length) {
  console.log('Not on stable release; skipping releasing on homebrew')
  process.exit(0)
}

async function calculateSHA256(fileName: string) {
  const hash = crypto.createHash('sha256')
  hash.setEncoding('hex')
  await pipeline(fs.createReadStream(fileName), hash)

  return hash.read()
}

const ROOT = path.join(__dirname, '..')
const TEMPLATES = path.join(ROOT, 'homebrew', 'templates')
const fileSuffix = '.tar.xz'
const ARCH_INTEL = 'x64'
const ARCH_ARM = 'arm64'
const versionedName = `${name}@${version}`
const urlPrefix = `https://github.com/celo-org/developer-tooling/releases/download/${encodeURIComponent(
  versionedName
)}`

async function uploadExecutableToGithubRelease(filePath: string) {
  console.log(`Upload ${filePath}`)
  await Promise.resolve()
}

const fileNamePrefix = `celocli-v${version}-${GITHUB_SHA_SHORT}`
const fileNameMacIntel = `${fileNamePrefix}-darwin-${ARCH_INTEL}${fileSuffix}`
const fileNameMacArm = `${fileNamePrefix}-darwin-${ARCH_ARM}${fileSuffix}`
const fileNameLinuxIntel = `${fileNamePrefix}-linux-${ARCH_INTEL}${fileSuffix}`
const fileNameLinuxArm = `${fileNamePrefix}-linux-arm${fileSuffix}`

async function uploadAllExecutablesToGithub() {
  await Promise.all([
    uploadExecutableToGithubRelease(path.join(ROOT, 'dist', fileNameMacIntel)),
    uploadExecutableToGithubRelease(path.join(ROOT, 'dist', fileNameMacArm)),
    uploadExecutableToGithubRelease(path.join(ROOT, 'dist', fileNameLinuxIntel)),
    uploadExecutableToGithubRelease(path.join(ROOT, 'dist', fileNameLinuxArm)),
  ])
}

async function updateHomebrewFormula() {
  const templatePath = path.join(TEMPLATES, 'celocli.rb')
  const template = fs.readFileSync(templatePath).toString('utf-8')
  const formulaPath = path.join(ROOT, 'homebrew', 'Formula', 'celocli.rb')

  const [sha256MacIntel, sha256MacArm, sha256LinuxIntel, sha256LinuxArm] = await Promise.all([
    calculateSHA256(path.join(ROOT, 'dist', fileNameMacIntel)),
    calculateSHA256(path.join(ROOT, 'dist', fileNameMacArm)),
    calculateSHA256(path.join(ROOT, 'dist', fileNameLinuxIntel)),
    calculateSHA256(path.join(ROOT, 'dist', fileNameLinuxArm)),
  ])

  const templateReplaced = template
    .replace('__CLI_VERSION__', version)
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

  console.log(`done updating heroku Formula in ${formulaPath}`)
}

try {
  // TODO: run the follow command beforehand:
  // yarn oclif pack tarballs
  await uploadAllExecutablesToGithub()
  await updateHomebrewFormula()
  console.log('TODO: open a PR automagically')
  // open PR with the updated formula
} catch (error) {
  console.error(`error running ${__filename}`, error)
  process.exit(1)
}
