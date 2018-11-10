import compression from 'compression'
import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import config from 'config'
import _debug from 'debug'
import PM2 from '../process/pm2'

const debug = _debug('server')

const app = express()
app.use(compression())
app.use(bodyParser.json({ limit: config.requestBodySize }))
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/pm2/list', (req, res, next) => {
  debug('Fetching pm2 list...')
  PM2.connect(() => PM2.list((apps) => res.send(apps)))
})

app.use('/api/pm2/describe', (req, res, next) => {
  debug('Fetching pm2 app info...')
  const processNameOrId = req.query.process
  PM2.connect(() => PM2.describe(processNameOrId, (app) => res.send(app)))
})

app.use('/api/pm2/restart', (req, res, next) => {
  debug('Restarting app...')
  const processNameOrId = req.query.process
  PM2.connect(() => PM2.restart(processNameOrId, (app) => res.send(app)))
})

app.use('/api/pm2/kill', (req, res, next) => {
  debug('Killing app...')
  const processNameOrId = req.query.process
  PM2.connect(() => PM2.kill(processNameOrId, (app) => res.send(app)))
})

app.use('/api/pm2/scale', (req, res, next) => {
  debug('Scaling app...', req.query)
  const processNameOrId = req.query.process
  const instances = (parseInt(req.query.instances , 10) || 4).toString()
  PM2.connect(() => PM2.describe(processNameOrId, (apps) => {
    const app = apps[0]
    debug('App', app)
    const scriptArgs = {
      name: app.name,
      instances,
      force: true,
      // script: app.pm2_env.pm_exec_path,
      args: app.pm2_env.args,
      exec_mode: 'cluster'
    }
    debug('Script args', scriptArgs)
    // PM2.start(scriptArgs, (response) => res.send(response))
    PM2.start2(app.pm2_env.pm_exec_path, scriptArgs, (response) => { 
      debug('ressss', response) 
      res.send(response) })
  }))
})

const main = async () => {
  const httpServer = http.Server(app)

  httpServer.listen(config.server.port, function () {
    debug(`Server & Api running on ${config.server.port}`)
  })
}

main()