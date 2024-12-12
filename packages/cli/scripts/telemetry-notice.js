#!/usr/bin/env node

const { ux } = require('@oclif/core')
const chalk = require('chalk')

// TODO add a reference to actual implementation so users can see what data is being sent
ux.info(
  chalk.green(
    `\ncelocli is now gathering anonymous usage statistics. 
  
None of the data being collected is personally identifiable and no flags or arguments are being stored nor transmitted.
        
Data being reported is:
  - command (for example ${chalk.bold('network:info')})
  - celocli version (for example ${chalk.bold('5.2.3')})
  - success status (0/1)
        
If you would like to opt out of this data collection, you can do so by running:
  
${chalk.bold('celocli config:set --telemetry 0')}
  `
  )
)
