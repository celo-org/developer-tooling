import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DIST = path.resolve(__dirname, '..', 'dist')

writeFileSync(path.join(DIST, 'mjs', 'package.json'), JSON.stringify({ type: 'module' }, null, 4))
writeFileSync(path.join(DIST, 'cjs', 'package.json'), JSON.stringify({ type: 'commonjs' }, null, 4))
