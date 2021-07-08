<template lang="pug">
.fullscreen.text-center.q-pa-md.flex.flex-center
  div
    h1 Login
    q-btn.q-mt-xl(to='/' label='Go Home')
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Login'
})
</script>
