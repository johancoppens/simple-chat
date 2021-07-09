<template lang="pug">
q-page
  h1 Chat
  //- Display counter recative value
  h2 Counter: {{ counter }}
</template>

<script>
import { defineComponent, ref } from 'vue'
import { injectSC } from '../boot/sc'

export default defineComponent({
  name: 'Chat',
  setup () {
    const sc = injectSC()
    const counter = ref(0)
    
    // Invoke the ping RPC every 2 secs
    setInterval(async () => {
      try {
        let result = await sc.invoke('ping', {counter: counter.value})
        console.log(result)
        counter.value = result.counter
      } catch (e) {
        console.log(e)
      }
    }, 2000)
    return {
      counter
    }
  }
})
</script>
