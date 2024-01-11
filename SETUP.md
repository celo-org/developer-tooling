# Celo Engineering Setup

- [Celo Engineering Setup](#celo-engineering-setup)
  - [Reading](#reading)
  - [Getting everything installed](#getting-everything-installed)
    - [Common stuff](#common-stuff)
      - [Install Node](#install-node)
    - [MacOS](#macos)
      - [Xcode CLI](#xcode-cli)
      - [Install Yarn](#install-yarn)
    - [Linux](#linux)
      - [Install Yarn](#install-yarn-1)
  - [Building developer-tooling](#building-developer-tooling)

This is a living document! Please edit and update it as part of your onboarding process :-)

## Reading

Review the README from each directory in [packages](packages/).

## Getting everything installed

Follow these steps to get everything that you need installed to build the developer-tooling codebase on your computer.

### Common stuff

#### Install Node

Currently Node.js v18.14.2 is required in order to work with this repo.

Install `nvm` (allows you to manage multiple versions of Node) by following the [instructions here](https://github.com/nvm-sh/nvm).

Once `nvm` is successfully installed, restart the terminal and run the following commands to install the `npm` versions that [developer-tooling](https://github.com/celo-org/developer-tooling) will need:

```bash
# restart the terminal after installing nvm
nvm install 18.14.2
nvm alias default 18.14.2
```

### MacOS

#### Xcode CLI

Install the Xcode command line tools:

```bash
xcode-select --install
```

#### Install Yarn

We use Yarn to build all of the [developer-tooling] repo. Install it using [Homebrew](#homebrew):

```bash
brew install yarn
```

### Linux

#### Install Yarn

We use Yarn to build all of the [developer-tooling](https://github.com/celo-org/developer-tooling) repo. Install it by running the following:

```bash
# for documentation on yarn visit https://yarnpkg.com/en/docs/install#debian-stable
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```


## Building

Clone the [developer-tooling](https://github.com/celo-org/developer-tooling) repo:

```bash
mkdir ~/celo
cd celo
git clone https://github.com/celo-org/developer-tooling.git
```

Then install the packages:

```bash
cd developer-tooling
# install dependencies and run post-install script
yarn
# build all packages
yarn build --ignore docs
```

> Note that if you do your checkouts with a different method, Yarn will fail if
> you haven’t used git with ssh at least once previously to confirm the
> github.com host key. Clone a repo or add the github host key to
> `~/.ssh/known_hosts` and then try again.

> When removing a dependency via `yarn remove some-package`, be sure to also run `yarn postinstall` so
> you aren't left with freshly unpackaged modules. This is because we use `patch-package`
> and the `postinstall` step which uses it is not automatically run after using `yarn remove`.

> The docs package relies on gitbook which has problems off of a fresh install. Running
> `yarn build --ignore docs` is a known workaround.