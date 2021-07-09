# Hook up our UI to the server

We do this by integrating socketcluster-client in the Vue/Quasar ui app.

## socketcluster-client Installation

In the ui folder:

```bash
$ npm install --save socketcluster-client@16.0.3
```

## Creating a Boot File on the ui Side

Create a file ui/src/boot/sc.js

## Activate sc Boot File in quasar.conf.js

```js
...
module.exports = configure(function (ctx) {
  return {
    ...
    boot: [
      'sc'
    ],
    ...

```

## ping pong Using RPC's

### On Server Side

Create a file server/modules/pingpong.js

Attach the module in server/server.js

```js
...
// SocketCluster/WebSocket connection handling loop.
(async () => {
  for await (let {socket} of agServer.listener('connection')) {
    console.log(`Client with socket id ${socket.id} connected`)
    // Attach pingpong module
    require('./modules/pingpong').attach(agServer, socket)
  }
})();
...

```

### On the Client

See ui/src/pages/Chat.vue

```js
...
// 1: Import injectSC
import { injectSC } from '../boot/sc'

export default defineComponent({
  ...
  setup () {
    // 2: Inject socketcluster client
    const sc = injectSC()
    ...
    // Every 2 secs
    setInterval(async () => {
      try {
        // 3. Invoke ping RPC and wait for result
        let result = await sc.invoke('ping', {counter: counter.value})
        console.log(result)
        ...
      } catch (e) {
        console.log(e)
      }
    }, 2000)
    ...
    }
  }
})

```

### Display Counter Value on the Page Using ref

In ui/src/pages/Chat.vue

```js
<template lang="pug">
...
  //- 6. Display counter recative value
  h2 Counter: {{ counter }}
</template>

<script>
// 1. Import ref from vue
import { defineComponent, ref } from 'vue'
...
export default defineComponent({
  ...
  setup () {
    ...
    // 2. Create a reactive value with ref
    const counter = ref(0)

    setInterval(async () => {
      try {
        // 3. Pass counter to RPC
        let result = await sc.invoke('ping', {counter: counter.value})
        console.log(result)
        // 4. Update counter value with new value
        counter.value = result.counter
      } catch (e) {
        console.log(e)
      }
    }, 2000)
    return {
      // 5. Return counter from setup, for display in template
      counter
    }
  }
})
</script>
```


## Further Readings for a Deeper Understanding

<https://quasar.dev/quasar-cli/boot-files>

<https://v3.vuejs.org/guide/component-provide-inject.html>

<https://socketcluster.io/docs/basic-usage/>

<https://flaviocopes.com/javascript-symbols/>

<https://v3.vuejs.org/api/refs-api.html>
