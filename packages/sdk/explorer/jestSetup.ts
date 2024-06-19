import { URL } from 'node:url'
// @ts-ignore
global.URL = URL

import type { FetchMockSandbox } from 'fetch-mock'
// @ts-ignore
import { default as fetchMock } from 'fetch-mock/cjs/lib'

const fetchMockSandbox: FetchMockSandbox = fetchMock.sandbox()
jest.mock('cross-fetch', () => fetchMockSandbox)

// @ts-ignore
global.fetchMock = fetchMockSandbox
