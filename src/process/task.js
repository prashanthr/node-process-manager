import _debug from 'debug'

const debug = _debug('task')

async function main() {
  debug(`I'm a task. I'm running`)
  while (true) {
    
  }
}

process.on('message', (packet) => {
  debug('Message', packet)
  process.send({
    type: 'process:msg',
    data: {
     success: true
    }
 })
})

main()
