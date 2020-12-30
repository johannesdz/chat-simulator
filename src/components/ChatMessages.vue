<template>
  <div class="relative flex-grow p-3 pt-4 m-px overflow-y-auto text-gray-900 shadow-inner">
    <ChatMessagesItem
      v-for="message in messagesRef"
      :key="message.id"
      :message="message"
      @mounted="handleMessageMounted"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef, SetupContext } from 'vue'
import useMembers from '@/composables/useMembers'
import useMessages from '@/composables/useMessages'
import usePlayer from '@/composables/usePlayer'
import ChatMessagesItem from '@/components/ChatMessagesItem.vue'

export default defineComponent({
  name: 'ChatMessages',
  components: {
    ChatMessagesItem
  },
  emits: ['messageMounted'],
  setup(props: any, context: SetupContext) {
    const { getMember } = useMembers()
    const { sortedMessagesRef } = useMessages()
    const { playerMessagesRef, isPlaying } = usePlayer()
    const messagesRef: ComputedRef = computed(() => {
      let lastMemberId: number | undefined
      return (isPlaying.value ? playerMessagesRef.value : sortedMessagesRef.value).map((message) => {
        if (message.memberId !== undefined) {
          message.member = getMember(message.memberId)
        }
        message.showImage = message.memberId !== lastMemberId
        lastMemberId = message.memberId
        return message
      })
    })

    const handleMessageMounted = () => {
      context.emit('messageMounted')
    }

    return {
      messagesRef,
      handleMessageMounted
    }
  }
})
</script>
