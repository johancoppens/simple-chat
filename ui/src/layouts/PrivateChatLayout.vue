<template lang="pug">
q-layout(view='lHh lpR lFf')
  q-header(elevated reveal)
    q-toolbar
      q-toolbar-title.text-black simple-chat
      q-item#avatar.rounded-borders(v-if="getUser")
        q-item-section
        q-item-section(avatar)
          q-btn(round)
            q-avatar
              q-img(:src="`avatars/${getUser()}.jpeg`")
                q-menu
                  q-list
                    q-item
                      q-item-section {{ getUser() }}
                    q-item(clickable @click="logout")
                      q-item-section Logout
  q-drawer.bg-grey-10(v-model='leftDrawerOpen' show-if-above mini bordered q-mini-drawer-only)
    q-list(padding)
      q-item(clickable v-ripple)
        q-item-section(avatar)
          q-img(:src="`avatars/${getUser()}.jpeg`")
  q-page-container
    router-view
</template>

<script>
const linksList = [];

import { defineComponent, ref } from 'vue';
import { injectSC } from '../boot/sc';

export default defineComponent({
  name: 'MainLayout',
  components: {},
  setup() {
    const leftDrawerOpen = ref(false);
    const sc = injectSC();

    const getUser = () => {
      return sc.authToken.username ? sc.authToken.username : null;
    };

    // TODO: Get friends related to our current user

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      getUser,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      logout: () => {
        sc.deauthenticate();
      },
    };
  },
});
</script>
