<template lang="pug">
q-page.row.yellow
  //- chat component
  #chat.col.self-stretch.column.red.no-wrap
    //- messages list component
    #list.col-10.self-stretch.yellow
      q-virtual-scroll(:items="messages" separator style="max-height: 300px;")
        template(v-slot="{ item, index }")
          q-item(:key="index")
            q-item-section {{ item }}
    //- input component
    #input.col-2.yellow
      .row.q-gutter-sm
        .col-11
          q-input(v-model="message" standout autogrow type="textarea" v-on:keyup.enter="sendMessage")
        .col
          q-btn(label="send" color="secondary" @click="sendMessage")
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import { injectSC } from '../boot/sc'

export default defineComponent({
  name: 'Chat',
  setup () {
    const sc = injectSC()
    const user = sc.authToken

    const message = ref('default message')

    const messages = reactive([
      "test",
      "test2",
      "test3"
    ])

    const sendMessage = () => {
      messages.push(message.value)
      message.value = ''
    }

    return {
      user,
      message,
      messages,
      sendMessage
    }
  }
})
</script>

<style scoped>
.blue {
  /* border: 1px solid blue; */
}
.red{
  /* border: 1px solid red; */
}
.yellow {
  /* border: 1px solid yellow; */
}
#input {
  /* height: 100px; */
}
#chat {
  /* width: 100%; */
}

</style>
