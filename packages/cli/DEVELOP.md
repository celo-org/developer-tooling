# Developer Guide

## Running Tests

### All tests

`yarn test`

#### CI

There are 2 CI equivalents of the `test-*` commands that supply ` --workerIdleMemoryLimit=0.1` flags that are required for them to work in CI environment.
