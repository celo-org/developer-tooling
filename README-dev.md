# README GUIDE FOR CELO DEVELOPERS


### Verify installation in Docker

Test installation in isolation using Docker.
This confirms that it is locally installable and does not have implicit dependency on rest of the `developer-tooling` or have an implicit dependency which is an explicit dependency of another `developer-tooling` package.

```
# Specify the package to test. e.g. celocli, contractkit, utils
developer-tooling $ PACKAGE=cli
developer-tooling $ docker run --rm -v $PWD/packages/${PACKAGE}:/tmp/npm_package -it --entrypoint bash gcr.io/celo-testnet/circleci-node18:1.0.0
circleci@e0d56700584f:/# mkdir /tmp/tmp1 && cd /tmp/tmp1
circleci@e0d56700584f:/tmp/tmp1# npm install /tmp/npm_package/
```

### Publish the package

```
# Publish the package publicly
developer-tooling/packages/cli $ yarn publish --access=public
```

Let's say the published package version number 0.0.20, verify that it is installable

```
/tmp/tmp1 $ npm install @celo/cli@0.0.20
```

Add a tag with the most recent git commit of the published branch. Note that this commit comes before package.json is updated with the new package version.

```
$ npm dist-tag add <package-name>@<version> <tag>
```

Additionally, if this version is intended to be used on a deployed network (e.g. `baklava` or `alfajores`), tag the version with all appropriate network names.

```
$ npm dist-tag add <package-name>@<version> <network>
```

Once you publish do some manual tests, for example, after publishing `celocli`

```
# Docker for an isolated environment again
developer-tooling $ docker run --rm -it --entrypoint bash gcr.io/celo-testnet/circleci-node18:1.0.0
circleci@7040a7660754:/$ mkdir /tmp/tmp1 && cd /tmp/tmp1
circleci@7040a7660754:/tmp/tmp1$ npm install @celo/celocli@0.0.48
...
circleci@7040a7660754:/tmp/tmp1$ ./node_modules/.bin/celocli
CLI Tool for transacting with the Celo protocol

VERSION
  @celo/celocli/1.6.3 linux-x64 node-v18.14.2

USAGE
  $ celocli [COMMAND]

COMMANDS
  account         Manage your account, keys, and metadata
  config          Configure CLI options which persist across commands
  election        Participate in and view the state of Validator Elections
  exchange        Exchange Celo Dollars and Celo Gold via the stability mechanism
  governance      Interact with on-chain governance proposals and hotfixes
  help            display help for celocli
  identity        Outputs the set of validators currently participating in BFT and which ones are participating in Celo's lightweight identity protocol
  lockedgold      View and manage locked Celo Gold
  multisig        Shows information about multi-sig contract
  network         Prints Celo contract addesses.
  node            Manage your Celo node
  oracle          Remove expired oracle reports for a specified token (currently just Celo Dollar, aka: "StableToken")
  releasegold     View and manage Release Gold contracts
  reserve         Shows information about reserve
  rewards         Show rewards information about a voter, registered Validator, or Validator Group
  transfer        Transfer Celo Gold and Celo Dollars
  validator       View and manage Validators
  validatorgroup  View and manage Validator Groups

circleci@7040a7660754:/tmp/tmp1$ ./node_modules/.bin/celocli account:new
Failed to initialize libusb.
This is not being stored anywhere. Save the mnemonic somewhere to use this account at a later point.

mnemonic: fury puzzle field laptop evidence stuff rescue display home museum ritual message million cave stadium carbon clinic dutch robust vehicle control lizard brass dinosaur
accountAddress: 0x328e0394Dbb468FE4eD1fF73bD508442fBD305CF
privateKey: 7adb0c1a98b00b98a180cbfcc44666f1aab7d315669190fbac30bbdc4989a2ec
publicKey: 039f938bb038962080c9269b195b63999cf90b149921250c2b8a8db92f711d5c81
```
