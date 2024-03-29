const fetchMockSandbox = require('fetch-mock').sandbox()
jest.mock('cross-fetch', () => fetchMockSandbox)

// @ts-ignore
global.fetchMock = fetchMockSandbox

import type { FetchMockSandbox } from 'fetch-mock'

declare global {
  const fetchMock: FetchMockSandbox
}
