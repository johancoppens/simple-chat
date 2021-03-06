import * as client from 'socketcluster-client'
import { inject } from 'vue'

const socket = client.create({
  hostname: 'localhost',
  // hostname: '192.168.0.30', // Change this to the IP address of your dev computer if you want to test the app on another machine or mobile phone
  port: 8000
})


// This default exported function is called by quasar on boot.
// In this function we have access to app, router, store, urlPath, publicPath, redirect
export default ({ app, router }) => {
  // Provide sc to app, so we can inject it where we need it with the exported
  // function injectSC
  app.provide(socketSymbol, socket)

  ;(async () => {
    for await (const event of socket.listener('connect')) {
      console.log(event)
      console.log(`Connected to server with socket id ${socket.id}`)

      // Authstate is already checked before the connect event occurs
      if (!event.isAuthenticated) {
        router.push({ name: 'login'})
      }
    }
  })()
  
  ;(async () => {
    for await (const event of socket.listener('disconnect')) {
      console.log(event)
      console.log(`Disconnected from server`)
    }
  })()

  ;(async () => {
    for await (const event of socket.listener('authStateChange')) {
      console.log(event)
      console.log(`authStateChange ${socket.id}`)
      if (event.newAuthState === 'authenticated') {
        router.push({ name: 'chat' })
      } else {
        router.push({ name: 'login'})
      }
    }
  })()
}

const socketSymbol = Symbol('sc')

// Exported function to inject SC in a component
export const injectSC = () => {
  return inject(socketSymbol)
}
