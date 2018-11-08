import { pm2Flow } from './pm2-operations'
import _debug from 'debug'

const debug = _debug('main')

async function main() {
  const argv = process.argv
  const action = argv[2]
  pm2Flow(action)
}

main().catch(err => {
  debug(err)
})
  