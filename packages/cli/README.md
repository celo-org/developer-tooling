# @celo/celocli

Tool for interacting with the Celo Protocol.

## Installation

celocli is tested on node 20, although we find it works with warnings on 18 and 22 as well.

To install globally, run:

```
npm install -g @celo/celocli
```

If you have trouble installing globally (i.e. with the `-g` flag), try installing to a local directory instead with `npm install @celo/celocli` and run with `npx celocli`.

For the cutting edge of development you can install the latest beta

```
npm install -g @celo/celocli@beta
```

> [!TIP]
> IF you're on macOS or Linux, you may use [Homebrew](https://brew.sh/) to install this. `brew tap celo-org/brew && brew install celocli`
> Other binaries are directly attached to the Github releases (eg: the [6.1.0 release](https://github.com/celo-org/developer-tooling/releases/tag/%40celo%2Fcelocli%406.1.0)).
> Please open up an issue if you'd like to see this CLI distributed elsewhere.

## Using celocli

To see available commands

```bash

celocli commands

```

Check version

```bash

celocli --version

```

Example of running a command.

```bash

celocli network:whitelist --node celo

```

### Documentation

[Head to the documentation](https://docs.celo.org/cli) to read and learn more about the Celo
CLI.

## How we work

We are a GitHub-first team, which means we have a strong preference for communicating via GitHub.
Please use GitHub to:

🐞 [File a bug report](https://github.com/celo-org/developer-tooling/issues/new/choose)

💬 [Ask a question](https://github.com/celo-org/developer-tooling/discussions)

✨ [Suggest a feature](https://github.com/celo-org/developer-tooling/issues/new/choose)

🧑‍💻 [Contribute!](/CONTRIBUTING.md)

🚔 [Report a security vulnerability](https://github.com/celo-org/developer-tooling/issues/new/choose)

> [!TIP]
>
> Please avoid messaging us via Slack, Telegram, or email. We are more likely to respond to you on
> GitHub than if you message us anywhere else. We actively monitor GitHub, and will get back to you shortly 🌟

## Development

### Build

Use `yarn build:sdk <NETWORK>` to build the sdk for the target environment (CLI dependency).

Use `yarn build` to compile the CLI.

### Generate docs

Use `yarn docs` to populate `packages/docs` with generated documentation. Generated files should be checked in, and CI will fail if CLI modifications cause changes in the docs which were not checked in.

### Testing

We use both ganache and anvil for testing. You'll need [foundry](https://book.getfoundry.sh/getting-started/installation) installed on your machine.

To run tests run the following command:

```bash
yarn workspace @celo/celocli test
```

### Known build issues on Linux

> I'm getting the follow error: `Cannot find module '@celo/contractkit'`.

A possible solution is to build the monorepo manually.
Go to the `developer-tooling` root directory and

```bash
> yarn build
```

If all works well, navigate to `packages/cli`.

> I've got the cli built successfully but the running the `cli` yields: `Error: Returned values aren't valid, did it run Out of Gas?`.

When running the `cli` against a full node, this can mean that the contract artifacts are out of date.
Solution: switch to the `alfajores` branch and build the `developer-tooling`.

Go to the `developer-tooling` root directory and

```bash
> git checkout alfajores
> yarn
> yarn build
> cd packages/cli
> ./bin/run account:balance $CELO_ACCOUNT_ADDRESS
```
