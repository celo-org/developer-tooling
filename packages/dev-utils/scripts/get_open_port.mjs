import { createServer } from 'node:net'

const srv = createServer().listen(0, () => {
  console.log(srv.address().port)
  srv.close()
  process.exit(0)
})
