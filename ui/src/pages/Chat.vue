<template lang="pug">
q-page.column
  #chat.col.column
    #list.col.scroll.q-pa-sm(ref="scrollTargetRef")
      .text-center(v-if="historyLoaded") No more history to load
      q-infinite-scroll(@load="loadHistory" reverse :scroll-target="scrollTargetRef" :offset="50" ref="vscrollRef" )
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

    const message = ref('')
    const messages = reactive([])
    const historyLoaded = ref(false)

    // Refs to DOM elements needed for resizing
    const scrollTargetRef = ref(null)
    const inputRef = ref(null)
    const vscrollRef = ref(null)

    const maxPages = 10         // how many pages we want to go back in history
    const messagesPerPage = 10
    let liveMessagesCount = 0   // To make a distinction bewteen live messages and those retreived from history

    onMounted(() => {
      // Resize on component mounted
      resize()
      // Socketcluster: listen for messages on chatChannel
      ;(async () => {
        const channel = sc.subscribe('chatChannel')
        for await (const data of channel) {
          // console.log(data)
          // Message from myself?
          const user = data.user === sc.authToken.username ? 'me' : data.user
          const sent = data.user === sc.authToken.username ? true : false
          messages.push({
            name: user,
            avatar: `avatars/${data.user}.jpeg`,
            text: [data.id, data.message],
            sent: sent,
            bgColor: sent ? 'grey-8' : 'grey-9'
          })
          liveMessagesCount++
          scrollBottom()
        }
      })()
    })

    const sendMessage = async () => {
      try {
        const res = await sc.invoke('chat/saveMessage', {
          user: sc.authToken.username,
          message: message.value
        })
      } catch (e) {
        console.log(e)
      }
      message.value = ''
      resize()
    }

    // Called when user scrolls to top of scrollTargetRef
    // async now!
    const loadHistory = async (index, done) => {
      // Calculate offset
      const offset = ((index -1) * messagesPerPage)  + liveMessagesCount
      try {
        if(index <= maxPages) {
          const res = await sc.invoke('chat/getMessages', { limit: messagesPerPage, offset: offset })
          // console.log(res)
          if(res.length > 0) {
            for (let i = 0; i < res.length; i++) {
              messages.unshift({
                name: res[i].user === sc.authToken.username ? 'me' : res[i].user ,
                avatar: `avatars/${res[i].user}.jpeg`,
                text: [res[i].id, res[i].message],
                stamp: res[i].createdAt,
                sent: res[i].user === sc.authToken.username ? true : false,
                bgColor: res[i].user === sc.authToken.username ? 'grey-8' : 'grey-9'
              })
            }
          } else {
            // No more messages to fetch, so stop virtual scroll
            vscrollRef.value.stop()
            historyLoaded.value = true
          }
        } else {
          // maxPages reached. Stop virtual scroll
          vscrollRef.value.stop()
          historyLoaded.value = true
        }
      }
      catch (e) {
        console.log(e)
      }
      // Add a little timeout to let the loading indicator have a chance to display
      setTimeout(() => {
        done() 
      }, 300)
    }

    // For flex layout to work properly we need some javascript to set maxHeight of scrollTargetRef
    // Called on mount, window.resize listener, resizing input when typing multiple lines and message is send
    const resize = () => {
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
      historyLoaded,
      // Methods
      sendMessage,
      loadHistory,
      resize,
      // DOM element refs
      scrollTargetRef,
      inputRef,
      vscrollRef
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
