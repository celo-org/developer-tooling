const fetchMockSandbox = require('fetch-mock').sandbox()
jest.mock('cross-fetch', () => ({ default: fetchMockSandbox, fetch: fetchMockSandbox }))

// @ts-ignore
global.fetchMock = fetchMockSandbox

/* eslint import/no-extraneous-dependencies:off */
import { FetchMockSandbox } from 'fetch-mock'

declare global {
  const fetchMock: FetchMockSandbox
}

jest.mock('@ledgerhq/hw-transport-node-hid', () => {
  return {
    default: {
      open: jest.fn(() => {
        return {
          send: jest.fn(() => new Promise(() => {})),
          decorateAppAPIMethods: jest.fn(),
          close: jest.fn(),
        }
      }),
    },
  }
})
