#!/usr/bin/env node --disable-warning DEP0040

// eslint-disable-next-line unicorn/prefer-top-level-await
;(async () => {
  const oclif = require('@oclif/core')
  await oclif.execute({ development: false, dir: __dirname })
})()
