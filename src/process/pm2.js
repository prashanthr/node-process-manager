import pm2 from 'pm2'
import config from 'config'
import _debug from 'debug'

const debug = _debug('pm2')

/**
 * https://pm2.io/doc/en/runtime/reference/pm2-programmatic/
 * A class that handles PM2 scripted operations via static methods
 * 
 * @class PM2
 */
class PM2 {
  /**
   * Connect to the deamon and carry out any command
   * @param {func} callback The callback to execute after connecting to the PM2 deamon
   */
  static connect (callback) {
    pm2.connect(err => {
      if (err) {
        debug('Error connection to PM2 deamon', err)
        process.exit(2)
      } else {
        debug('Connected to deamon, proceeding...')
        callback()
      }
    })
  }
  
  static disconnect () {
    pm2.disconnect()
  }

  /**
   * Starts an app
   * @param {*} opts { script, jsonConfigFile, errback }
   */
  static start (opts) {
    pm2.start(opts, (err, apps) => {
      this.disconnect()
      if (err) {
        debug('Error starting pm2 app(s)', err)
        throw err
      }
      debug('Started app successfully!')
    })
  }
  /**
   * Restarts an app
   * @param {*} app 'app' or 1 or 'all'
   */
  static restart (app) {
    pm2.restart(app, (err, result) => {
      this.disconnect()
      if (err) {
        debug('Error restarting pm2 app', err)
        throw err
      }
      debug('Restarted app successfully')
    })
  }

  /**
   * Kills an app
   * @param {*} app 'app' or 1 or 'all'
   */
  static kill (app) {
    pm2.stop(app, (err, result) => {
      this.disconnect()
      if (err) {
        debug('Error killing pm2 app')
      } else {
        debug('Successfully killed app', result)
        
      }
    })
  }

  /**
   * Lists all pm2 processes
   *
   * @static
   * @memberof PM2
   */
  static list () {
    pm2.list((err, apps) => {
      this.disconnect()
      if (err) {
        debug('Error listing instances')
      } 
      debug('App(s) info', apps)
    })
  }

  /**
   * Describes an app
   * @param {*} app 'app' or 1 or 'all'
   */
  static describe (app, callback) {
    pm2.describe(app, (err, app) => {
      if (err) {
        debug('Error describing app')
      } else {
        debug('App info', app)
        if (callback) {
          callback(app)
        } else {
          this.disconnect()
          return app
        }
      }
    })
  }

  /**
   * 
   * @param {*} app 'app' or 1 or 'all'
   */
  static flush (app) {
    pm2.flush(app, (err, result) => {
      this.disconnect()
      if (err) {
        debug('Error flushing process')
      }
      debug('Flushed', result)
    })
  }

  /**
   * Kill all the things
   */
  static nuke () {
    pm2.killDaemon(err => {
      if (err) {
        debug('Error killing pm2 deamon', err)
      } else {
        debug('Killed PM2 deamon')
        process.exit(0)
      }
    })
  }
  /**
   * Launches a bus
   * @param {func} callback to execute with bus object
   */
  static launchBus (callback) {
    pm2.launchBus((err, bus) => {
      this.disconnect()
      if (err) {
        debug('Error launching bus', err)
      }
      debug('Bus is active', bus)
      callback(bus)
    })
  }
  /**
   * Sends a signal to an app
   *
   * @param {*} app 'app' or 1 or 'all'
   * @param {*} signal { type: 'process:msg', data: {}, topic: 'someTopic' }
   * @memberof PM2
   */
  static sendSignal (app, signal) {
    pm2.sendSignalToProcessName(signal, app, (err, result) => {
      if (err) {
        debug('Error sending signal to app', err)
      }
      debug('Sent signal to app', result)
    })
  }

  static interrupt (pid, data) {
    pm2.sendDataToProcessId(pid, data, (err, result) => {
      this.disconnect()
      if (err) {
        debug('Error sending data to process id', err)
      }
      debug('Sent data to process id', result)
    })
  }
}

export default PM2
