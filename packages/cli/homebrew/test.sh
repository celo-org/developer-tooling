#!/usr/bin/env bash

set -ex

brew update
brew install Formula/celocli.rb
celocli version
celocli help