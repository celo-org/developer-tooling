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

### Automatic (recommended)

> [!TIP]
> For detailed steps read [`beta-mode.sh`](./scripts/beta-mode.sh).

1. Run `yarn beta-enter`

   This will enter the "pre mode" of changesets, create a `prerelease/beta` branch, and push
   it to `origin` (GitHub).

   Anytime a commit is pushed to `prerelease/..` GitHub will open a "Version Packages (Beta)" PR.
   You can merge this PR and packages will be published as specified in the branch (should be beta).

2. If you need to release another beta make a changeset and commit it up.

3. When done run `yarn beta-exit`
   This will exit changeset pre mode. Push up.

4. Now you can open a PR with your `prerelease/..` branch against `main`.

### Manual (discouraged)

Changesets has two strategies for pre release versions.

The first is to [enter `pre` mode on changesets](https://github.com/changesets/changesets/blob/main/docs/prereleases.md).

```sh
$ yarn changeset pre enter beta
$ yarn changeset version
$ git add .
$ git commit -m "Enter prerelease mode and version packages"
$ yarn changeset publish
$ git push --follow-tags
```

The other is to [append `--snapshot`](https://github.com/changesets/changesets/blob/main/docs/snapshot-releases.md), which is great for daily releases.

```sh
$ yarn changeset version --snapshot canary
$ yarn changeset publish --no-git-tag --snapshot
```
