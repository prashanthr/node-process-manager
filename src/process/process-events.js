process.on('message', (packet) => {
  debug('Message', packet)
  console.log('message', packet)
  process.send({
    type: 'process:msg',
    data: {
     success: true
    }
 })
})
