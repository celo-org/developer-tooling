import baseSetup from '@celo/dev-utils/lib/ganache-setup'
// Has to import the matchers somewhere so that typescript knows the matchers have been made available
import _unused from '@celo/dev-utils/lib/matchers'
import * as path from 'path'

// Warning: There should be an unused import of '@celo/dev-utils/lib/matchers' above.
// If there is not, then your editor probably deleted it automatically.

export default async function globalSetup() {
  console.log('\nstarting ganache...')
  const chainDataPath = path.join(path.dirname(require.resolve('@celo/celo-devchain')), '../chains')
  // v X refers to core contract release X
  await baseSetup(path.resolve(chainDataPath), 'v11.tar.gz', {
    from_targz: true,
  })
  console.log('\n ganache started...')
  // it is necessary to disabled oclif integration with ts-node as
  // together it leads to a silent signit error and exit when tsconfk is loaded.
  // @ts-ignore - because global this doesnt have oclif property
  global.oclif = { tsnodeEnabled: false }
}
