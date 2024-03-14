# Release Process

This repo uses [changesets](https://github.com/changesets/changesets) to determine what
packages need a version bump.

Each PR MUST be accompanied by a changeset unless it has zero impact on package consumers (i.e.
changing GitHub Action workflows).

To create a changeset run:

```sh
$ changeset add
# or
$ yarn cs
```

This will bring up an interactive console that asks which packages are affected and if they
require a patch, minor, or major update.

## Package Versioning

Based on [semantic versioning best practices](semver.org),g iven a version number
`MAJOR.MINOR.PATCH`, increment the:

- `MAJOR` version when you make incompatible API changes
- `MINOR` version when you add functionality in a backward compatible manner
- `PATCH` version when you make backward compatible bug fixes

Additional labels for pre-release and build metadata are available as extensions to the
`MAJOR.MINOR.PATCH` format.

## Production releases

### Automatic (recommended)

The [`release.yaml`](./.github/workflows/release.yaml) workflow will create a PR called
"Version Packages", each time a PR is merged to master with changeset files this PR will be rebased and updated to show what the published versions would be. Merging this PR will build and publish packages to NPM,
and publish GitHub release notes.

### Manual (discouraged)

When it's time to release NPM packages run:

```sh
$ changeset version
```

This will look through the changeset files that have been generated since the last release and
bump package versions automatically.

To publish the relevant NPM packages run:

```sh
$ changeset publish
```

Afterwards, push git tags to GitHub:

```sh
$ git push --follow-tags
```

## Pre-releases

to create betas 

from master checkout a new branch and run 

`yarn changesets pre enter beta`

then commit, push and open a pr

once the pr is merged the changesets github action will create a new pr entitld "Version Packages (beta)" merging it will result in package releases. 

you can keep master branch in beta mode until you are statisfied and ready for the main release then run 

`yarn changesets pre exit`  

(this will just change pre mode in the changesets config to "exit")

commit the changes, push and open a pr to master branch 

as with entering pre mode the changeset action will open a pr. this time entitled "Version Packages" 

### troubleshooting

If packages are not released when a Version Packages PR is merged or the Version Packages PR is never created there is likely an issue with the gh action. Go to [github.com/celo-org/developer-tooling/actions/workflows/release.yaml](https://github.com/celo-org/developer-tooling/actions/workflows/release.yaml) and see if there are errors. 


### Other pre releasing

it is possible to make prereleases with tags besides beta by replacing 'beta' with the tag you prefer. Although these SHOULD NOT be merged into master but instead into a branch starting with 'prerelease/'
