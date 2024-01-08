#!/usr/bin/env bash
set -e
export COLUMNS=88
# must replace lib with src so docs link to source code
sed -i -e 's@./lib/commands@./src/commands@g' package.json
yarn oclif readme --multi --dir=../docs/command-line-interface
yarn prettier --write ../docs/command-line-interface/*
sed -i.bak '/^- \[/d' ../docs/command-line-interface/*
rm -rf ../docs/command-line-interface/*.bak
# reverse changes to package.json
sed -i -e 's@./src/commands@./lib/commands@g' package.json