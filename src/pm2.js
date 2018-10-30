import pm2 from 'pm2'
import config from 'config'
import _debug from 'debug'

const debug = _debug('pm2')

const start = (instance, opts) => {
  instance.start(opts, (err, apps) => {
    if (err) {
      debug('Error starting pm2 app(s)', err)
    }
    debug('Started app(s) successfully', apps)
  })
}

export const setup = () => {
  pm2.connect(err => {
    if (err) {
      debug('Error connecting to pm2 deamon')
      process.exit(2)
    }
    start(pm2, {
      script: config.script
    })
  })
}

