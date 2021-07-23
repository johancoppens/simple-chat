const knex = require('knex')(require('../knexfile'))

const attach = (agServer, socket) => {
  ;(async () => {
    for await (let request of socket.procedure('login')) {
      console.log(`Login request from client ${socket.id}. Data: ${request.data.userName}`)
      const user = await verifyUser(request.data)
      if (user) {
        console.log(user)
        socket.setAuthToken(user)
        request.end("Login success")
      } else {
        request.end("Login failed")
      }
      
    }
  })()
}

// Async now!
const verifyUser = async (credentials) => {
  try {
    const dbUser = await knex('users').where({
      'username': credentials.userName
    }).debug()
    const user = dbUser[0]
    if (user && user.password === credentials.password ) {
      delete user.password
      return user
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

exports.attach = attach
