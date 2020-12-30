<template>
  <ImageUploadWrapper
    :class="[
      'border-2 border-dashed rounded-t absolute bottom-0 left-0 right-0 bg-gray-700',
      isDragRef ? 'border-gray-400' : 'border-gray-700'
    ]"
    :open-file-upload="openFileUploadRef"
    @drag-enter="isDragRef = true"
    @drag-leave="isDragRef = false"
    @load="handleImageLoad"
  >
    <form
      class="p-2"
      @submit="handleCreateMessage"
    >
      <div class="flex items-center justify-center h-full">
        <div class="flex items-center flex-grow h-12 overflow-hidden text-gray-900 bg-white rounded shadow-inner">
          <div class="relative">
            <div
              class="relative cursor-pointer"
              @click="handleInputMemberClick"
            >
              <img
                class="object-cover rounded-l shadow-l"
                style="width: 48px; height: 48px;"
                width="48"
                height="48"
                :src="memberRef.image || defaultMemberImage"
              >
            </div>
          </div>
          <div class="flex-grow h-full">
            <textarea
              ref="inputElementRef"
              v-model="textRef"
              class="flex-grow w-full h-full p-3 outline-none resize-none"
              :placeholder="`Message from ${memberRef.name}...`"
              @keypress="handleKeyPress"
            />
          </div>
          <div
            :class="[
              'flex items-center h-full px-3 transition ease-in border-l-2 border-gray-300 rounded-r cursor-pointer bg-gray-50',
              textRef.trim() ? 'text-black cursor-pointer hover:bg-gray-300' : ' text-gray-300 cursor-not-allowed'
            ]"
            @click="handleCreateMessage"
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
              d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
            /></svg>
          </div>
        </div>
        <div
          class="flex items-center p-3 ml-1 transition ease-in rounded-full cursor-pointer min-w-40px hover:bg-gray-500"
          @click="handleImageClick"
        >
          <svg
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          ><path
            fill-rule="evenodd"
            d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
            clip-rule="evenodd"
          /></svg>
        </div>
      </div>
    </form>
  </ImageUploadWrapper>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref, Ref } from 'vue'
import ImageUploadWrapper from '@/components/ImageUploadWrapper.vue'
import useMembersOverlay from '@/composables/useMembersOverlay'
import useMessages from '@/composables/useMessages'
import useMembers from '@/composables/useMembers'
import { Member, MemberId } from '@/types/member'
import constants from '@/util/constants'

export default defineComponent({
  name: 'Chat',
  components: {
    ImageUploadWrapper
  },
  emits: ['create'],
  setup(props: any, context: SetupContext) {
    const { openMembersOverlay } = useMembersOverlay()
    const isDragRef = ref(false)
    const openFileUploadRef = ref(false)
    const { createMessage } = useMessages()
    const { membersRef } = useMembers()
    const memberRef: Ref<Member> = ref(membersRef.value[1])
    const inputElementRef = ref()
    const textRef = ref('')
    const imageRef = ref('')

    const handleCreateMessage = () => {
      if (!textRef.value.trim() && !imageRef.value) {
        return
      }
      createMessage(textRef.value, imageRef.value, memberRef.value)
      textRef.value = ''
      imageRef.value = ''
      inputElementRef.value.focus()
      context.emit('create')
    }

    const handleChooseMember = (memberId: MemberId) => {
      const member: Member | undefined = membersRef.value.find((member) => member.id === memberId)
      if (member) {
        memberRef.value = member
      }
    }

    const handleInputMemberClick = () => {
      openMembersOverlay(handleChooseMember)
    }

    const handleKeyPress = (event: any) => {
      if (!event.shiftKey && event.keyCode === 13) {
        event.preventDefault()
        handleCreateMessage()
      }
    }

    const handleImageClick = () => {
      openFileUploadRef.value = true
      setTimeout(() => {
        openFileUploadRef.value = false
      }, 500)
    }

    const handleImageLoad = (src: any) => {
      imageRef.value = src
      handleCreateMessage()
    }

    const defaultMemberImage = constants.defaultMemberImage

    return {
      textRef,
      handleCreateMessage,
      memberRef,
      handleInputMemberClick,
      inputElementRef,
      handleKeyPress,
      isDragRef,
      handleImageClick,
      handleImageLoad,
      openFileUploadRef,
      defaultMemberImage
    }
  }
})
</script>
