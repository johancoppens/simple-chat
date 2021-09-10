<template lang="pug">
q-layout(view='lHh lpR lFf')
  q-header(elevated reveal)
    q-toolbar
      q-toolbar-title.text-black {{ currentChat.username || 'Group' }}
      q-item(clickable v-if="currentChat.address")
        q-item-section(avatar)
          q-icon(name="video_camera_front" color="black" @click="startCall({ video: true })")
      q-item(clickable v-if="currentChat.address")
        q-item-section(avatar)
          q-icon(name="phone" color="black" @click="startCall")
      q-item#avatar.rounded-borders(v-if="getUser")
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
      template(v-for="user in users" :key="user.address")
        q-item(clickable v-ripple @click="openChat(user)")
          q-item-section(avatar)
            q-img(:src="`avatars/${getUser()}.jpeg`")
  q-page-container
    router-view
</template>

<script>
const linksList = [];

import { defineComponent, ref, onMounted } from 'vue';
import Peer from 'peerjs'

import { injectSC } from '../boot/sc';

export default defineComponent({
  name: 'MainLayout',
  components: {},
  setup() {
    const currentChat = ref({});
    const users = ref([]);
    const sc = injectSC();

    const getUser = () => {
      return sc.authToken.username ? sc.authToken.username : null;
    };

    // TODO: Get friends related to our current user

    onMounted(async () => {
      try {
        console.log('hit');
        users.value = await sc.invoke('users/all');
        console.log(users.value);
      } catch (e) {
        console.error(e);
      }
    });

    return {
      essentialLinks: linksList,
      getUser,
      logout: () => {
        sc.deauthenticate();
      },
      users,
      openChat: (user) => (currentChat.value = user),
      currentChat,
      startCall: async ({ video = false }) => {
        try {
          const obj = { callee: currentChat.value.address, callerPeer: new Peer() }
          console.log(obj)
          const answer = await sc.invoke('call/accept', obj);
          console.log(answer)
          if(answer) {
            console.log('answered')
          }
        } catch(e) {
          console.error(e)
        }
      },
    };
  },
});
</script>
