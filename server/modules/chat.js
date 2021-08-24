const knex = require('knex')(require('../knexfile'))

const attach = (agServer, socket) => {
  ;(async () => {
    for await (let request of socket.procedure('chat/getMessages')) {
      const result = await knex('messages')
        .orderBy('createdAt', 'desc')
        .limit(request.data.limit)
        .offset(request.data.offset)
        .debug()
      request.end(result)
    }
  })()

  ;(async () => {
    for await (let request of socket.procedure('chat/saveMessage')) {
      console.log(request.data)
      const res = await knex('messages')
        .insert(request.data)
        .returning(['id', 'createdAt', 'message', 'user'])
      // We don't actually return the data here, instead we send it trough
      // chatCannnel so all connected clients will receive it
      agServer.exchange.transmitPublish('chatChannel', res[0])
      request.end("ok")
    }
  })()
}

exports.attach = attach
