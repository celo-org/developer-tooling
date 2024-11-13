// Has to import the matchers somewhere so that typescript knows the matchers have been made available
import _very_important from '@celo/dev-utils/lib/matchers'

export default async function globalSetup() {
  console.info('Global setup Complete')
}
