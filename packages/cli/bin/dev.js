#!/usr/bin/env node_modules/.bin/ts-node node --disable-warning DEP0040
// eslint-disable-next-line node/shebang, unicorn/prefer-top-level-await
;(async () => {
  const oclif = await import('@oclif/core')
  console.info('Running in development mode')
  await oclif.execute({ development: false, dir: __dirname })
})()
