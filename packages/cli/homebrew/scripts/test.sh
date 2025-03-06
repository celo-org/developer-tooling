#!/usr/bin/env bash

set -ex

__dirname=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

brew update
brew install "$__dirname/../Formula/celocli.rb"
celocli version
celocli help