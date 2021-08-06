<template lang="pug">
q-layout(view='hHh LpR lFf')
  q-header(elevated reveal)
    q-toolbar
      q-btn.text-black(flat dense round icon='menu' aria-label='Menu' @click='toggleLeftDrawer')
      q-toolbar-title.text-black simple-chat
      q-item#avatar.rounded-borders(v-if="getUser")
        q-item-section(avatar)
          q-avatar()
            q-img(:src="`avatars/${getUser()}.jpeg`")
        q-item-section
          q-item-label.text-black {{ getUser() }}
  q-drawer.bg-grey-10(v-model='leftDrawerOpen' show-if-above='' bordered='')
    div Drawer content
  q-page-container
    router-view
</template>

<script>

const linksList = []

import { defineComponent, ref } from 'vue'
import { injectSC } from '../boot/sc'

export default defineComponent({
  name: 'MainLayout',
  components: {},
  setup () {
    const leftDrawerOpen = ref(false)
    const sc = injectSC()

    const getUser = () => {
      return sc.authToken.username ? sc.authToken.username : null
    }
    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      getUser,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
