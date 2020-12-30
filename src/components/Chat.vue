<template>
  <div class="flex items-center justify-center h-screen bg-blue-50">
    <div class="relative flex flex-col w-full h-full text-white bg-gray-700 shadow-xl sm:rounded sm:max-w-lg sm:h-5/6">
      <div class="relative flex items-center justify-between">
        <!-- <div
          class="flex p-1 transition transform scale-100 rounded-full cursor-pointer hover:scale-125 hover:text-white hover:shadow-inner"
          @click="handleNaviClick"
        >
          <svg
            class="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          /></svg>
        </div> -->
        <ChatHeader />
        <ChatPlayer />
      </div>

      <ChatMessages
        ref="messagesContainerRef"
        @messageMounted="handleCreateMessage"
      />
      <ChatInput
        @create="handleCreateMessage"
      />

      <ChatMembers />
      <ChatNavi :is-open="isNavOpen" />
    </div>
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
    const messagesContainerRef = ref()
    const isNavOpen = ref(false)
    const showProgressBar = ref(false)

    const handleCreateMessage = () => {
      setTimeout(() => {
        scrollToBottom(messagesContainerRef.value.$el)
      }, 100)
    }

    const handleNaviClick = () => {
      isNavOpen.value = !isNavOpen.value
    }

    return {
      messagesContainerRef,
      handleCreateMessage,
      handleNaviClick,
      isNavOpen,
      showProgressBar
    }
  }
})
</script>
