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
