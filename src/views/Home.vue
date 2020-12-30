<template>
  <Chat />
  <!-- <h1>Chat simulator</h1>
  <p> The easiest way to fake a chat conversation</p>
  <p>
    Simulate a chat conversation with your friends and colleagues easily in your browser.<br>
  </p> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Chat from '@/components/Chat.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Chat
  },
  setup() {
    return {}
  }
})
</script>
