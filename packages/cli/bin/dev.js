#!/usr/bin/env node_modules/.bin/ts-node
;(async () => {
  const oclif = await import('@oclif/core')
  console.info('Running in development mode')
  await oclif.execute({ development: false, dir: __dirname })
})()
