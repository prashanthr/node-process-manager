import { pm2Flow } from './pm2-operations'
import _debug from 'debug'

const debug = _debug('main')

async function main() {
  pm2Flow()
}

main().catch(err => {
  debug(err)
})
  