# Developer Guide

## Running Tests

### All tests

`yarn test`

### Anvil & Ganache tests

There are 2 more yarn commands:

- `yarn test-anvil`
- `yarn test-ganache`

Please note that it is necessary to have node version 20.0 or higher to run the tests.

They will run anvil and ganache tests (+ common tests that are neither of those) ONLY by providing necessary process env variables. It determines which tests to run based on `RUN_ANVIL_TESTS` env var which which is used by `testWithAnvil` (from [packages/dev-utils/src/anvil-test.ts](packages/dev-utils/src/anvil-test.ts)) and `RUN_GANACHE_TESTS` env var wich is used `testWithGanache` (from [packages/dev-utils/src/ganache-test.ts](packages/dev-utils/src/ganache-test.ts)) to call `testWithWeb3` (from [packages/dev-utils/src/test-utils.ts](packages/dev-utils/src/test-utils.ts)) with required parameters. See docs for `testWithWeb3` for a detailed description of the logic on how it runs only the desired tests.

Please note that anvil tests will be run in parallel and ganache tests will be run sequentially (by providing `--runInBand` flag).

#### CI

There are 2 CI equivalents of the `test-*` commands that supply ` --workerIdleMemoryLimit=0.1` flags that are required for them to work in CI environment.
