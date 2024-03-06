import baseSetup from '@celo/dev-utils/lib/ganache-setup'
// Has to import the matchers somewhere so that typescript knows the matchers have been made available
import _must_be_imported from '@celo/dev-utils/lib/matchers'
import { waitForPortOpen } from '@celo/dev-utils/lib/network'
import * as path from 'path'

// Warning: There should be an unused import of '@celo/dev-utils/lib/matchers' above.
// If there is not, then your editor probably deleted it automatically.

export default async function globalSetup() {
  const chainDataPath = path.join(path.dirname(require.resolve('@celo/celo-devchain')), '../chains')
  // vX refers to core contract release version X
  await baseSetup(path.resolve(chainDataPath), 'v11.tar.gz', {
    from_targz: true,
  })
  await waitForPortOpen('localhost', 8545, 60)
  console.log('...ganache started')
}
