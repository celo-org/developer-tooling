# Issues

## Parallel Execution Data Loss (Wave 3)
- When 4 subagents ran in parallel and each ran `yarn workspace @celo/contractkit run build`, build output directory got overwritten
- Source file changes from some agents were lost while others persisted
- LESSON: For remaining waves, either run sequentially or verify all file changes after parallel execution
