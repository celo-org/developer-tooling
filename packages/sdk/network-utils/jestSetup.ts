import fetchMock from 'fetch-mock'
import { URL } from 'node:url'
// @ts-ignore
global.URL = URL

const fetchMockSandbox = fetchMock.sandbox()
jest.mock('cross-fetch', () => fetchMockSandbox)
jest.mock('cross-fetch', () => fetchMockSandbox)

// @ts-ignore
global.fetchMock = fetchMockSandbox
