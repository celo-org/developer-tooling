// Has to import the matchers somewhere so that typescript knows the matchers have been made available
import _unused from '@celo/dev-utils/lib/matchers'

// Warning: There should be an unused import of '@celo/dev-utils/lib/matchers' above.
// If there is not, then your editor probably deleted it automatically.

export default async function globalSetup() {
  // it is necessary to disabled oclif integration with ts-node as
  // together it leads to a silent signit error and exit when tsconfk is loaded.
  // @ts-ignore - because global this doesnt have oclif property
  global.oclif = { tsnodeEnabled: false }
}
