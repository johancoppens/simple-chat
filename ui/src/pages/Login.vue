<template lang="pug">
.fullscreen.text-center.q-pa-md.flex.flex-center
  .column.full-width.items-center.q-gutter-lg
    .row(v-if="showRegisterForm")
      h1 Register your account
    .row(v-else)
      h1 Chat Login
    .row
      q-input(v-model="passphrase" label="Passphrase" type="text")
    .row(v-if="showRegisterForm")
      q-input(v-model="username" label="Username")
    .row
      q-btn(@click="login" :label="showRegisterForm ? 'Register' : 'Login'" color="primary")
    .row
      q-btn(@click="logout" label="Logout" color="primary")
</template>

<script>
import { defineComponent, ref } from 'vue';
import { injectSC } from '../boot/sc';

export default defineComponent({
  name: 'Login',
  setup() {
    const sc = injectSC();
    const showRegisterForm = ref(false);
    const username = ref(null);
    const passphrase = ref(
      'enable network ramp play luxury output purchase town excess uncle cash code',
    );

    const login = async () => {
      console.log('login');
      try {
        let result = await sc.invoke('login', {
          passphrase: passphrase.value,
          username: username.value,
        });
        if (result.registerClient) showRegisterForm.value = true;
        else showRegisterForm.value = false;
      } catch (e) {
        console.log(e);
      }
    };

    const logout = () => {
      sc.deauthenticate();
    };

    return {
      showRegisterForm,
      username,
      passphrase,
      login,
      logout,
    };
  },
});
</script>
