import PM2 from './pm2'
import config from 'config'
import _debug from 'debug'
import { delay } from 'lodash'

const debug = _debug('pm2-operations')

const pm2start = async () => {
  PM2.connect(() => PM2.start(config))
}
const pm2restart = async () => {
  PM2.connect(() => PM2.restart(config.name))
}
const pm2stop = async () => {
  PM2.connect(() => PM2.kill(config.name))
}
const pm2list = async () => {
  PM2.connect(() => PM2.list())
}
const pm2describe = async () => {
  PM2.connect(() => PM2.describe(config.name))
}
const pm2flush = async () => {
  PM2.connect(() => PM2.flush(config.name))
}
const pm2nuke = async () => {
  PM2.connect(() => PM2.nuke())
}

export const pm2Flow = async (action) => {
  switch (action) {
    case 'start':
      await pm2start()
      break
    case 'restart':
      await pm2restart()
      break
    case 'stop':
      await pm2stop()
      break
    case 'list':
      await pm2list()
      break
    case 'describe':
      await pm2describe()
      break
    case 'flush':
      await pm2flush()
      break
    case 'killall':
    case 'nuke':
      await pm2nuke()
      break
    default:
      debug('Unknown action', action)
  }
}
