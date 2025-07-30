#!/usr/bin/env bash
set -e
export COLUMNS=88
yarn build
rm -rf ../../docs/command-line-interface
yarn oclif readme --multi --dir=../../docs/command-line-interface
sed -i.bak '/^- \[/d' ../../docs/command-line-interface/*
rm -rf ../../docs/command-line-interface/*.bak

# Fix GitHub links to point to source files instead of generated lib files
find ../../docs/command-line-interface -name "*.md" -exec sed -i.bak 's|/lib/|/src/|g; s|\.js|\.ts|g; s|\[lib/|\[src/|g' {} \;
rm -rf ../../docs/command-line-interface/*.bak

