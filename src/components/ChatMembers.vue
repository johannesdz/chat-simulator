<template>
  <div
    :class="[
      'absolute inset-0 p-4 bg-gray-900 bg-opacity-60 rounded ',
      'transition duration-700 opacity-0 pointer-events-none',
      isOpenRef ? 'opacity-100 pointer-events-auto' : ''
    ]"
  >
    <div class="flex flex-col h-full rounded shadow-xl">
      <div class="flex items-center justify-between text-white bg-gray-700 rounded-t">
        <div class="flex items-center p-2 font-bold">
          <div class="p-2">
            {{ chooseCallbackRef ? 'Select member' : 'Edit Members' }}
          </div>
          <div
            v-if="chooseCallbackRef"
            class="p-2 transition rounded-full cursor-pointer hover:bg-gray-400"
            @click="handleEditClick"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            ><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
          </div>
        </div>
        <div
          class="p-4 cursor-pointer"
          @click="handleCloseClick"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          /></svg>
        </div>
      </div>
      <div
        ref="membersContainerRef"
        class="flex-grow p-4 overflow-y-auto text-gray-900 bg-white"
      >
        <ChatMembersItem
          v-for="member in membersListRef"
          :key="member.id"
          :member="member"
        />
      </div>
      <ChatMembersInput @create="handleCreateMember" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import useMembersOverlay from '@/composables/useMembersOverlay'
import useMembers from '@/composables/useMembers'
import useMessages from '@/composables/useMessages'
import ChatMembersItem from '@/components/ChatMembersItem.vue'
import ChatMembersInput from '@/components/ChatMembersInput.vue'
import { scrollToBottom } from '@/util/utils'

export default defineComponent({
  name: 'ChatMembers',
  components: {
    ChatMembersItem,
    ChatMembersInput
  },
  setup() {
    const { isOpenRef, closeMembersOverlay, chooseCallbackRef } = useMembersOverlay()
    const { membersRef } = useMembers()
    const { messagesRef } = useMessages()
    const membersContainerRef = ref()
    const memberNameRef = ref('')

    const handleCloseClick = () => {
      closeMembersOverlay()
    }

    const handleCreateMember = () => {
      setTimeout(() => {
        scrollToBottom(membersContainerRef.value)
      }, 100)
    }

    const handleEditClick = () => {
      chooseCallbackRef.value = undefined
    }

    document.addEventListener('keyup', (event) => {
      if (isOpenRef.value && event.keyCode === 27) {
        closeMembersOverlay()
      }
    })

    const membersListRef = computed(() => {
      return membersRef.value.map((member) => {
        const isDelatable = !messagesRef.value.some((message) => message.memberId === member.id)
        return {
          ...member,
          isDelatable
        }
      })
    })

    return {
      membersListRef,
      memberNameRef,
      handleCloseClick,
      membersContainerRef,
      handleCreateMember,
      isOpenRef,
      chooseCallbackRef,
      handleEditClick
    }
  }
})
</script>
