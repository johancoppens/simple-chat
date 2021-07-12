<template lang="pug">
q-page
  h1 Chat
  pre {{ user }}
</template>

<script>
import { defineComponent } from 'vue'
import { injectSC } from '../boot/sc'

export default defineComponent({
  name: 'Chat',
  setup () {
    const sc = injectSC()
    const user = sc.authToken
    return {
      user
    }
  }
})
</script>
