import { sleep } from '@celo/base'
import teardown from '@celo/dev-utils/lib/ganache-teardown'

export default async function globalTeardown() {
  // wait 2 seconds incase anything is still happening
  await sleep(2000)
  await teardown()
}
