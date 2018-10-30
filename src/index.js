import { setup as pm2Setup } from './pm2'
import _debug from 'debug'

const debug = _debug('main')

async function main() {
  pm2Setup()
}

main().catch(err => {
  debug(err)
})

