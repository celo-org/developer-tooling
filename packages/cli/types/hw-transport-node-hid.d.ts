declare module '@ledgerhq/hw-transport-node-hid'

/* eslint import/no-extraneous-dependencies:off */
import { FetchMockSandbox } from 'fetch-mock'

declare global {
  const fetchMock: FetchMockSandbox
}
