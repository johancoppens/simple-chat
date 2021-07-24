<template lang="pug">
//- .flex.row.items-end
//-   #list.q-mb-auto
//-   #input
q-page.column.no-wrap.yellow
  //- chat component
  #chat.fit.column.green
    //- messages list component
    #list.red
      | list
      //- template(v-slot="{ item, index }")
      //-   q-item(:key="index")
      //-     q-item-section {{ item }}
    //- input component
    #input.blue
      q-input(v-model="message" standout autogrow type="textarea" v-on:keyup.enter="sendMessage")
        slot(append)
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
    const messageList = ref(null)

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
      sendMessage,
      messageList
    }
  }
})
</script>

<style scoped>
.blue {
  border: 1px solid blue;
}
.red{
  border: 1px solid red;
}
.yellow {
  border: 1px solid yellow;
}
.green {
  border: 1px solid green;
}
#input {
  /* height: 100px; */
}
#chat {
  /* width: 100%; */
}

</style>
