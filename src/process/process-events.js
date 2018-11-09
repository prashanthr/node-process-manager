import _debug from 'debug'
const debug = _debug('proc:handler')
// Needs to be done via spawn/child_process
// https://medium.com/@NorbertdeLangen/communicating-between-nodejs-processes-4e68be42b917
process.on('message', (packet) => {
  console.log('proc-handler-message', packet)
  debug('proc-handler-message', packet)
  process.send({
    type: 'process:msg',
    data: {
     success: true
    }
 })
})
