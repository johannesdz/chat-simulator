<template>
  <div class="min-h-screen bg-chat-background">
    <div class="fixed top-0 left-0 right-0 z-10 text-white bg-gray-700">
      <div class="flex items-center justify-between max-w-2xl mx-auto shadow-xl">
        <ChatHeader />
        <ChatPlayer />
      </div>
    </div>
    <div class="relative flex flex-col w-full h-full py-16 text-white">
      <div class="flex items-center justify-between max-w-2xl mx-auto">
        <ChatMessages
          @messageMounted="handleCreateMessage"
        />
      </div>
    </div>
    <div class="fixed bottom-0 left-0 right-0 text-white bg-gray-700">
      <div class="flex items-center justify-between max-w-2xl mx-auto shadow-xl">
        <ChatInput
          @create="handleCreateMessage"
        />
      </div>
    </div>

    <ChatMembers />

    <ChatNavi :is-open="isNavOpen" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ChatHeader from '@/components/ChatHeader.vue'
import ChatMessages from '@/components/ChatMessages.vue'
import ChatInput from '@/components/ChatInput.vue'
import ChatMembers from '@/components/ChatMembers.vue'
import ChatNavi from '@/components/ChatNavi.vue'
import ChatPlayer from '@/components/ChatPlayer.vue'
import { scrollToBottom } from '@/util/utils'

export default defineComponent({
  name: 'Chat',
  components: {
    ChatHeader,
    ChatMessages,
    ChatInput,
    ChatMembers,
    ChatNavi,
    ChatPlayer
  },
  setup() {
    const isNavOpen = ref(false)
    const showProgressBar = ref(false)

    const handleCreateMessage = () => {
      setTimeout(() => {
        scrollToBottom()
      }, 100)
    }

    const handleNaviClick = () => {
      isNavOpen.value = !isNavOpen.value
    }

    return {
      handleCreateMessage,
      handleNaviClick,
      isNavOpen,
      showProgressBar
    }
  }
})
</script>
