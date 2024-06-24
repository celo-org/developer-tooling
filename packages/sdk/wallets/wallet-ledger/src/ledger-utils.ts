import debugFactory from 'debug'
import { SemVer } from 'semver'

const debug = debugFactory('kit:wallet:ledger')

export function transportErrorFriendlyMessage(error: any) {
  debug('Possible connection lost with the ledger')
  debug(`Error message: ${error.message}`)
  if (error.statusCode === 26368 || error.statusCode === 26628 || error.message === 'NoDevice') {
    throw new Error(
      `Possible connection lost with the ledger. Check if still on and connected. ${error.message}`
    )
  }
  throw error
}

export function meetsVersionRequirements(
  version: string | SemVer,
  {
    minimum,
    maximum,
  }: { minimum?: SemVer | string; maximum?: SemVer | string; inclusive?: boolean }
) {
  const min = minimum ? new SemVer(version).compare(minimum) >= 0 : true
  const max = maximum ? new SemVer(version).compare(maximum) <= 0 : true
  return min && max
}
