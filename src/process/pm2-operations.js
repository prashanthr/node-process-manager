import PM2 from './pm2'
import config from 'config'
import _debug from 'debug'

const debug = _debug('pm2-operations')

const pm2Setup = () => {
  PM2.connect(() => PM2.start(config))
}
const pm2stop = () => {
  PM2.connect(() => PM2.kill(config.name))
}

export const pm2Flow = async () => {
  await pm2Setup()
  // await pm2stop()
}
