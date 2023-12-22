import fetchMock from 'fetch-mock'
const fetchMockSandbox = fetchMock.sandbox()
jest.mock('cross-fetch', () => fetchMockSandbox)

global.fetchMock = fetchMockSandbox
