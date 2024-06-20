import { URL } from 'node:url'
// @ts-ignore
global.URL = URL

import fetchMock from 'fetch-mock'

const fetchMockSandbox = fetchMock.sandbox()
jest.mock('cross-fetch', () => fetchMockSandbox)

// @ts-ignore
global.fetchMock = fetchMockSandbox
