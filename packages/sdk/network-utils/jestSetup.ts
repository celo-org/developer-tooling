import { URL } from 'node:url'
// @ts-ignore
global.URL = URL

const fetchMockSandbox = require('fetch-mock').sandbox()
jest.mock('cross-fetch', () => ({
  ...jest.requireActual('cross-fetch'),
  __esModule: true,
  default: fetchMockSandbox,
  fetch: fetchMockSandbox,
}))
// @ts-ignore
global.fetchMock = fetchMockSandbox
