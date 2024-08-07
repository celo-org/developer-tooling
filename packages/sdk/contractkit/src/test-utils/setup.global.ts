import baseSetup from '@celo/dev-utils/lib/ganache-setup'
import { shouldRunGanacheTests } from '@celo/dev-utils/lib/ganache-test'
// Has to import the matchers somewhere so that typescript knows the matchers have been made available
import _very_important from '@celo/dev-utils/lib/matchers'
import { waitForPortOpen } from '@celo/dev-utils/lib/network'
import * as path from 'path'

// Warning: There should be an unused import of '@celo/dev-utils/lib/matchers' above.
// If there is not, then your editor probably deleted it automatically.
export default async function globalSetup() {
  if (shouldRunGanacheTests()) {
    console.log('\nstarting ganache...')
    const chainDataPath = path.join(
      path.dirname(require.resolve('@celo/celo-devchain')),
      '../chains'
    )
    // v refers to core contract release version
    await baseSetup(path.resolve(chainDataPath), 'v11.tar.gz', {
      from_targz: true,
    })
    await waitForPortOpen('localhost', 8545, 60)
    console.log('...ganache started')
  }
}
