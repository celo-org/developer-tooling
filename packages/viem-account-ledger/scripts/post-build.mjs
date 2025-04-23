import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ESM_DIST = path.resolve(__dirname, '..', 'lib-es')
const CJS_DIST = path.resolve(__dirname, '..', 'lib')

writeFileSync(path.join(ESM_DIST, 'package.json'), JSON.stringify({ type: 'module' }, null, 4))
writeFileSync(path.join(CJS_DIST, 'package.json'), JSON.stringify({ type: 'commonjs' }, null, 4))
