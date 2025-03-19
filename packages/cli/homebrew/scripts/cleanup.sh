#!/usr/bin/env bash

###############################################################################
# Usage:
# `./cleanup.sh <sha> <version>`
# Example:
# `./cleanup.sh 8a5df10 6.1.0`
###############################################################################

arr=(
  "darwin-arm64"
  "darwin-x64"
  "linux-arm"
  "linux-arm64"
  "linux-x64"
  "win32-arm64"
  "win32-x64"
  "win32-x86"
)
sha=$1
version=$2

if [ -z "$sha" ]; then
  echo "\`\$sha\` is empty"
  echo "exiting…"
  exit 1
fi
if [ -z "$version" ]; then
  echo "\`\$version\` is empty"
  echo "exiting…"
  exit 1
fi

release="@celo/celocli@$version"
file_prefix="celocli-v$version-$sha"

while true; do
  read -p "Do you wish to delete assets in $release matching $sha?" yn
  case $yn in
      [Yy]* ) echo "deleting assets…"; break;;
      [Nn]* ) echo "exiting…"; exit;;
      * ) echo "Please answer yes or no.";;
  esac
done

for distro in "${arr[@]}";
do
  gh release delete-asset \
    "$release" \
    "$file_prefix-$distro.tar.xz" \
    -y
done
