<template lang="pug">
.fullscreen.text-center.q-pa-md.flex.flex-center
  .column.full-width.items-center.q-gutter-lg
    .row
      h1 Chat Login
    .row
      q-input(v-model="userName" label="User Name")
    .row
      q-input(v-model="password" label="Password" type="password")
    .row
      q-btn(@click="login" label='Login' color="primary")
    .row
      q-btn(@click="logout" label='Logout' color="primary")
</template>

<script>
import { defineComponent, ref } from 'vue'
import { injectSC } from '../boot/sc'


export default defineComponent({
  name: 'Login',
  setup () {
    const sc = injectSC()
    const userName = ref('john.doe')
    const password = ref('VerySecretPa55word')

    const login = async () => {
      console.log('login')
      try {
        let result = await sc.invoke('login',{ 
          userName: userName.value,
          password: password.value
        })
        console.log(result)
      } catch (e) {
        console.log(e)
      }
    }

    const logout = () => {
      sc.deauthenticate()
    }
    return {
      userName,
      password,
      login,
      logout
    }
  }
})
</script>
