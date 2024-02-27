# celocli

Tool for interacting with the Celo Protocol.

## Installation

We are currently deploying the CLI with only Node.js v18.14.2 support.

To install globally, run:

```
npm install -g @celo/celocli
```

If you have trouble installing globally (i.e. with the `-g` flag), try installing to a local directory instead with `npm install @celo/celocli` and run with `npx celocli`.

## How we work

We are a GitHub-first team, which means we have a strong preference for communicating via GitHub. 
Please use GitHub to:

🐞 [File a bug report](https://github.com/celo-org/developer-tooling/issues/new/choose)

💬 [Ask a question](https://github.com/celo-org/developer-tooling/discussions)

✨ [Suggest a feature](httpsi//github.com/celo-org/developer-tooling/issues/new/choose)

🧑‍💻 [Contribute!](/CONTRIBUTING.md)

🚔 [Report a security vulnerability](https://github.com/celo-org/developer-tooling/issues/new/choose)

> [!TIP]
> 
> Please avoid messaging us via Slack, Telegram, or email. We are more likely to respond to you on 
> GitHub than if you message us anywhere else. We actively monitor GitHub, and will get back to you shortly 🌟

### Plugins

Additional plugins can be installed which make the CLI experience smoother. Currently, `celocli` only supports installing plugins published on NPM within the `@celo/*` and `@clabs/*` scopes.

> ⚠️ **Warning**
>
> Installing a 3rd party plugin can be dangerous! Please always be sure that you trust the plugin provider.

## Development

### Build

Use `yarn build:sdk <NETWORK>` to build the sdk for the target environment (CLI dependency).

Use `yarn build` to compile the CLI.

### Generate docs

Use `yarn docs` to populate `packages/docs` with generated documentation. Generated files should be checked in, and CI will fail if CLI modifications cause changes in the docs which were not checked in.

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
