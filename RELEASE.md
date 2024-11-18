# Release Process


## What do we mean when we say own a release 

Being assigned as the release steward means you are expected to deliver 

* 1 or more sets of beta releases.
* The final release of packages. 
* Release notes on github for every package (automatically created by changesets bot)
* If the release is significant a forum post with the highlights and link back to release notes

### What is a significant release

This is intentionally not defined. Some guiding principles: if it has been a long time, if someone will be asking about the release, if there are big fixes. 


### What do I do? 

As the release steward you should be making sure all prs get the approval they need and have attention that the ci checks are not stuck. This may be automated but its not a passive role. When changesets has published try out installing the new version yourself for each beta and the final. Give celocli a quick spin. Are there people who reported bugs? Message them or comment on their github issue asking them to try the latest beta. 


For technical details see below. 



## The tools

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

Based on [semantic versioning best practices](semver.org), given a version number
`MAJOR.MINOR.PATCH`, increment the:

- `MAJOR` version when you make incompatible API changes
- `MINOR` version when you add functionality in a backward compatible manner
- `PATCH` version when you make backward compatible bug fixes

Additional labels for pre-release and build metadata are available as extensions to the
`MAJOR.MINOR.PATCH` format.

## Production releases

### Automatic (only way possible)

The [`release.yaml`](./.github/workflows/release.yaml) workflow will create a PR called
"Version Packages", each time a PR is merged to master with changeset files this PR will be rebased and updated to show what the published versions would be. Merging this PR will build and publish packages to NPM,
and publish GitHub release notes.


## Pre-releases

### To create betas 

from master checkout a new branch (name as you wish) and run 

`yarn changeset pre enter beta`

This will create `.changeset/pre.json` 

Commit this file, push and open a pull request. [example of previous pr](https://github.com/celo-org/developer-tooling/commit/4baf0a79e01cafb78f19221ed5a56963410bdf5d)

```
git add .changeset/pre.json
git commit -m "Enter Beta Mode"
git push 
```

Once the pr is merged the changesets github action will create a new pr entitld "Version Packages (beta)" merging it will result in package releases. 

You may keep master branch in beta mode until you are statisfied and ready for the main release then run 

`yarn changesets pre exit`  

(this will just change pre mode in the changesets config to "exit") 


Commit the changes to `.changeset/pre.json`, `git push` and open a pr to master branch.

As with exiting pre mode, on merge of your PR the changeset action will open a new PR -- this time entitled "Version Packages" 

### Troubleshooting

If packages are not released when a Version Packages PR is merged or the Version Packages PR is never created there is likely an issue with the gh action. Go to [github.com/celo-org/developer-tooling/actions/workflows/release.yaml](https://github.com/celo-org/developer-tooling/actions/workflows/release.yaml) and see if there are errors. 


### Other pre releasing

it is possible to make prereleases with tags besides beta by replacing 'beta' with the tag you prefer. Although these SHOULD NOT be merged into master but instead into a branch starting with 'prerelease/'
