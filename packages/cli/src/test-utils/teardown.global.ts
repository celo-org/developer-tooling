import teardown from '@celo/dev-utils/lib/ganache-teardown'
import { shouldRunGanacheTests } from '@celo/dev-utils/lib/ganache-test'

export default async function globalTeardown() {
  if (shouldRunGanacheTests()) {
    await teardown()
  }
}
