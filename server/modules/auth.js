const userDB = {
  'john.doe': {
    name: 'Doe',
    firstName: 'John',
    password: 'VerySecretPa55word',
    roles: ['admin', 'user']
  }
}

const attach = (agServer, socket) => {
  ;(async () => {
    for await (let request of socket.procedure('login')) {
      console.log(`Login request from client ${socket.id}. Data: ${request.data.userName}`)
      const user = verifyUser(request.data)
      if (user) {
        socket.setAuthToken(user)
        request.end("Login success")
      } else {
        request.end("Login failed")
      }
      
    }
  })()
}

const verifyUser = (credentials) => {
  // Need a clone here, bacause we want to strip the password from the user object
  // See https://www.samanthaming.com/tidbits/70-3-ways-to-clone-objects/#_1-using-spread
  const user = { ...userDB[credentials.userName] }
  if (user && user.password === credentials.password ) {
    delete user.password
    return user
  } else {
    return null
  }
}

exports.attach = attach
