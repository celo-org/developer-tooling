#!/usr/bin/env bash

# TODO what about if we want to start on master and then merge to prerelease/next-contracts?
git fetch origin
read -p "Do you want to base off master or the latest prerelease/next-contracts? (master/prerelease/next-contracts)"

git checkout $base_branch
git pull origin $base_branch


read -p "Enter @celo/abis version number or tag : " version_tag
echo "Adding @celo/abis@$version_tag to the following packages: @celo/celocli, @celo/contractkit, @celo/governance"
yarn workspaces foreach --worktree  --from '{@celo/celocli,@celo/contractkit,@celo/governance}' add @celo/abis@$version_tag

yarn build

read -p "fix any build errors and then press y to continue" is_fixed

if [ $is_fixed != "y" ]; then
  echo "Aborting"
  exit 1
fi

echo "Please select @celo/celocli, @celo/contractkit, @celo/governance as patch unless you are sure this should be a major"
echo "Please write a changeset like 'Add @celo/abis@$version_tag to @celo/celocli, @celo/contractkit, @celo/governance'"

yarn changeset add

read -p "Enter a tag for @celo/abis prerelease. It should make it clear which version of abis are used e.g. 'contracts-11-post' or 'contracts-11-pre'" release_tag

yarn changest pre enter $release_tag

if [ $base_branch != "prerelease/next-contracts" ]; then
  # TODO what about if we want to start on master and then merge to prerelease/next-contracts?
fi

git status
git add .
read -p "Confirm commit y/n" confirm
if [ $confirm != "y" ]; then
  echo "Aborting"
  exit 1
fi
# TODO do not commit if on master
if [ $base_branch == "master" ]; then
  exit 1 # TODO do something here
fi
git commit -m "Use @celo/abis@$version_tag in @celo/celocli, @celo/contractkit, @celo/governance"


git push origin prerelease/next-contracts

