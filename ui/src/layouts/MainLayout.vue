<template lang="pug">
q-layout(view='hHh LpR lFf')
  q-header(elevated reveal)
    q-toolbar
      q-btn(flat dense round icon='menu' aria-label='Menu' @click='toggleLeftDrawer')
        q-toolbar-title Simple Chat
  q-drawer.bg-grey-10(v-model='leftDrawerOpen' show-if-above='' bordered='')
    div Drawer content
  q-page-container
    router-view
</template>

<script>

const linksList = []

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
