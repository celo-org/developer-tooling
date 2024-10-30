#!/usr/bin/env bash
set -e
export COLUMNS=88
yarn build
yarn oclif manifest
rm -rf ../../docs/command-line-interface
yarn oclif readme --multi --dir=../../docs/command-line-interface
sed -i.bak '/^- \[/d' ../../docs/command-line-interface/*
rm -rf ../../docs/command-line-interface/*.bak
