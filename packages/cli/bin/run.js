#!/usr/bin/env node

;(async () => {
  const oclif = require('@oclif/core')
  await oclif.execute({ development: false, dir: __dirname })
})()
