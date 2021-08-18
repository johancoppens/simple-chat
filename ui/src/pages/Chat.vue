<template lang="pug">
q-page.column
  #chat.col.column
    #list.col.scroll.q-pa-sm(ref="scrollTargetRef")
      q-infinite-scroll(@load="loadHistory" reverse :scroll-target="scrollTargetRef" :offset="50")
        template(v-slot:loading)
          .row.justify-center.q-my-md
            q-spinner-tail(size="50px" color="primary")
        .q-py-sm(v-for="(msg, index) in messages" :key="index")
          transition(appear
            :enter-active-class="msg.sent ? 'animated fadeInBottomLeft' : 'animated fadeInTopLeft'"
            leave-active-class="animated fadeOut")
            q-chat-message(
              :name="msg.name"
              :avatar="msg.avatar"
              :text="msg.text"
              :stamp="msg.stamp"
              :sent="msg.sent"
              :bg-color="msg.bgColor"
              text-color="white"
              )
    #input.col-auto.q-pa-sm(ref="inputRef")
      q-input(v-model="message" standout="bg-primary text-white" autogrow autofocus bottom-slots type="textarea" v-on:keydown.enter.prevent v-on:keyup.enter="sendMessage")
        template(v-slot:append)
          q-btn(round dense flat icon="send" @click="sendMessage")
        q-resize-observer(@resize="resize")
</template>

<script>
import { defineComponent, onMounted, nextTick, ref, reactive } from 'vue'
import { injectSC } from '../boot/sc'

export default defineComponent({
  name: 'Chat',
  setup () {
    // Inject Socketcluster
    const sc = injectSC()
    const user = sc.authToken

    // 
    const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

    const message = ref()
    const messages = reactive([])

    // Refs to DOM elements needed for resizing
    const scrollTargetRef = ref(null)
    const inputRef = ref(null)

    onMounted(() => {
      // Resize on component mounted
      resize()
      // Socketcluster: listen for messages on chatChannel
      ;(async () => {
        const channel = sc.subscribe('chatChannel')
        for await (const msg of channel) {
          console.log(`Received msg on chatChannel: `, msg)
          // Message from myself?
          const username = msg.username === sc.authToken.username ? 'me' : msg.username
          const sent = msg.username === sc.authToken.username ? true : false
          messages.push({
            name: username,
            avatar: `avatars/${msg.username}.jpeg`,
            text: [msg.text],
            sent: sent,
            bgColor: sent ? 'grey-8' : 'grey-9'
          })
          scrollBottom()
        }
      })()
    })

    const sendMessage = () => {
      const msg = {
        username: sc.authToken.username,
        text: message.value
      }
      // Socketcluster: Send message to chatChannel
      sc.transmitPublish('chatChannel', msg)
      message.value = ''
      resize()
    }

    // Called when user scrolls to top of scrollTargetRef
    // Implemented as faker data, later on we'll replace this by getting history messages from the server
    const loadHistory = (index, done) => {
      // Get messages and add at beginning of messages array
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          const user = ['john.doe', 'jane.roe', 'james.doe'][Math.floor(Math.random() * 3)]
          const username = user === sc.authToken.username ? 'me' : user
          const sent = user === sc.authToken.username ? true : false
          messages.unshift({
            name: username,
            avatar: `avatars/${user}.jpeg`,
            text: [`History message ${i}: ${lorem}`],
            stamp: '1 minute ago',
            sent: sent,
            bgColor: sent ? 'grey-8' : 'grey-9'
          })
        }
        done() 
      }, 1000)
    }

    // For flex layout to work properly we need some javascript to set maxHeight of scrollTargetRef
    // Called on mount, window.resize listener, resizing input when typing multiple lines and message is send
    const resize = () => {
      console.log('resizing')
      console.log(window.innerHeight)
      const inputHeight = inputRef.value.clientHeight
      scrollTargetRef.value.style.maxHeight = `${window.innerHeight - inputHeight - 50 }px` // 50px is the height of titlebar
      scrollBottom()
    }

    // Call resize code on window resize
    window.addEventListener('resize', resize)

    // Programmatically scroll to bottom of messages list
    const scrollBottom = async () => {
      await nextTick() // Scroll after new message is rendered
      const el = scrollTargetRef.value
      el.scrollTop = el.scrollHeight - el.clientHeight
    }

    return {
      // Data
      user,
      message,
      messages,
      // Methods
      sendMessage,
      loadHistory,
      resize,
      // DOM element refs
      scrollTargetRef,
      inputRef
    }
  }
})
</script>

<style lang="scss">
#list::-webkit-scrollbar {
  width: 10px;
}
#list::-webkit-scrollbar-track {
  background-color: hsl(0, 1%, 13%);
}
#list::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgb(110, 110, 110);
}
</style>
