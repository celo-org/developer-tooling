import { getInstance } from '@celo/dev-utils/lib/anvil-test'
import teardown from '@celo/dev-utils/lib/ganache-teardown'

export default async function globalTeardown() {
  const anvil = getInstance()

  await Promise.all([teardown(), anvil.stop()])
}
