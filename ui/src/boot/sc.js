import * as client from 'socketcluster-client'
import { inject } from 'vue'

const socket = client.create({
  hostname: 'localhost',
  port: 8000
})


;(async () => {
  for await (const event of socket.listener('connect')) {
    console.log(event)
    console.log(`Connected to server with socket id ${socket.id}`)
  }
})()

;(async () => {
  for await (const event of socket.listener('disconnect')) {
    console.log(event)
    console.log(`Disconnected from server`)
  }
})()


// This default exported function is called by quasar on boot.
// In this function we have access to app, router, store, urlPath, publicPath, redirect
export default ({ app, router }) => {
  // Provide sc to app, so we can inject it where we need it with the exported
  // function injectSC
  app.provide(socketSymbol, socket)
}

const socketSymbol = Symbol('sc')

// Exported function to inject SC in a component
export const injectSC = () => {
  return inject(socketSymbol)
}
