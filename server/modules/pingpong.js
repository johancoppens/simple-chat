const attach = (agServer, socket) => {
  ;(async () => {
    // Set up a loop to handle and respond to the ping RPC.
    for await (let request of socket.procedure('ping')) {
      console.log(`Ping request from client ${socket.id}. Counter: ${request.data.counter}`)
      request.end({ message: 'pong', counter: request.data.counter + 1})
    }
  })()
}

exports.attach = attach
