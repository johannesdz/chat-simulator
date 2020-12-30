<template>
  <ImageUploadWrapper
    :class="[
      'border-2 ml-2 border-dashed rounded-t flex-grow bg-gray-700',
      isDragRef ? 'xs:border-gray-400' : 'border-gray-700'
    ]"
    :open-file-upload="openFileUploadRef"
    @drag-enter="isDragRef = true"
    @drag-leave="isDragRef = false"
    @load="handleImageLoad"
  >
    <div class="relative flex items-center h-16 pr-2">
      <div class="mr-2 min-w-40px">
        <img
          width="40"
          height="40"
          class="object-cover transition transform scale-100 rounded-full cursor-pointer h-40px w-40px hover:scale-110"
          :src="imageRef"
          @click="handleImageClick"
        >
      </div>
      <div class="overflow-hidden xs:max-w-xs">
        <div class="relative inline-flex max-w-xs transition ease-in border border-gray-700 border-dashed group hover:border-gray-100">
          <span
            class="w-auto pr-5 bg-gray-700 outline-none"
            role="textbox"
            contenteditable
            @input="handleInput"
          >{{ nameRef }}</span>
          <div class="absolute top-0 bottom-0 right-0 flex items-center justify-center transition ease-in opacity-0 pointer-events-none group-hover:opacity-100">
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            /></svg>
          </div>
        </div>
        <div
          class="flex max-w-xs text-sm text-gray-200 truncate transition cursor-pointer group hover:text-white"
          @click="handleMembersClick"
        >
          <span class="max-w-xs truncate">
            {{ memberNamesRef }}
          </span>
          <span
            :class="[
              'text-white transition cursor-pointer opacity-0 group-hover:opacity-70',
            ]"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            ><path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            /></svg>
          </span>
        </div>
      </div>
    </div>
  </ImageUploadWrapper>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import useMembersOverlay from '@/composables/useMembersOverlay'
import useChat from '@/composables/useChat'
import useMembers from '@/composables/useMembers'
import ImageUploadWrapper from '@/components/ImageUploadWrapper.vue'

export default defineComponent({
  name: 'ChatHeader',
  components: {
    ImageUploadWrapper
  },
  setup() {
    const { openMembersOverlay } = useMembersOverlay()
    const { chatSettingsRef, setChatName, setChatImage } = useChat()
    const { membersRef } = useMembers()
    const nameRef = ref(chatSettingsRef.value.name)
    const imageRef = ref(chatSettingsRef.value.image || 'https://via.placeholder.com/40x40')
    const isDragRef = ref(false)
    const openFileUploadRef = ref(false)

    const handleImageLoad = (src: any) => {
      imageRef.value = src
      setChatImage(imageRef.value)
    }

    const handleInput = () => {
      setChatName(nameRef.value)
    }

    const handleImageClick = () => {
      openFileUploadRef.value = true
      setTimeout(() => {
        openFileUploadRef.value = false
      }, 500)
    }

    const handleMembersClick = () => {
      openMembersOverlay()
    }

    const memberNamesRef = computed(() => {
      const totalMaxLength = 35
      const maxNameLength = 10
      let nameCount = 2
      let text = ''
      membersRef.value.forEach((member) => {
        if (member.id <= 1) {
          return
        }
        const name = `${member.name}${member.name.length > maxNameLength ? '...' : ''}`
        if (text.length + name.length > totalMaxLength) {
          return true
        }
        nameCount++
        text = `${text}, ${name}`
      })
      text = text.substring(2)
      const membersLength = membersRef.value.length
      if (membersLength > nameCount) {
        text = `${text} + ${membersLength - nameCount}`
      }
      return text
    })

    return {
      nameRef,
      imageRef,
      handleInput,
      isDragRef,
      handleImageClick,
      openFileUploadRef,
      handleImageLoad,
      handleMembersClick,
      membersRef,
      memberNamesRef
    }
  }
})
</script>
