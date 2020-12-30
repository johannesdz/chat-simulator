<template>
  <div
    class="p-2 text-white bg-gray-700 rounded-b"
  >
    <div class="text-gray-900 rounded shadow-inner">
      <ImageUploadWrapper
        :class="[
          'rounded-t block',
          isDragRef ? 'border-gray-400' : 'border-gray-700'

        ]"
        :open-file-upload="openFileUploadRef"
        @drag-enter="isDragRef = true"
        @drag-leave="isDragRef = false"
        @load="handleImageLoad"
      >
        <form
          class="flex items-center h-10 overflow-hidden"
          @submit="handleCreateMember"
        >
          <div class="relative">
            <img
              width="40"
              height="40"
              class="object-cover rounded-l cursor-pointer h-40px w-40px"
              :src="imageSrcRef"
              @click="handleImageClick"
            >
            <div class="absolute flex items-center justify-center w-10 h-10 border-t-2 border-r-2 border-gray-300 rounded-bl bg-gray-50 top-12">
              <svg
                class="text-gray-600 w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              /></svg>
            </div>
          </div>
          <div class="flex-grow h-full">
            <input
              ref="inputElementRef"
              v-model="memberNameRef"
              type="text"
              placeholder="Name"
              :class="['flex-grow w-full h-full rounded-r p-3 outline-none shadow-inner resize-none']"
            >
          </div>
          <div
            :class="[
              'flex items-center h-full pl-3 pr-3 ease-in hover:scale-125',
              memberNameRef.trim() ? 'text-white transition transform cursor-pointer' : ' text-gray-400 cursor-not-allowed'
            ]"
            @click="handleCreateMember"
          >
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            ><path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clip-rule="evenodd"
            /></svg>
          </div>
        </form>
      </ImageUploadWrapper>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref } from 'vue'
import useMembers from '@/composables/useMembers'
import ImageUploadWrapper from '@/components/ImageUploadWrapper.vue'
import constants from '@/util/constants'

export default defineComponent({
  name: 'ChatMembersInput',
  components: {
    ImageUploadWrapper
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ['create'],
  setup(props: any, context: SetupContext) {
    const { membersRef, createMember } = useMembers()
    const membersContainerRef = ref()
    const memberNameRef = ref('')
    const isDragRef = ref(false)
    const openFileUploadRef = ref(false)
    const inputElementRef = ref()
    const defaultImageSrc = constants.defaultMemberImage
    const imageSrcRef = ref(defaultImageSrc)
    const handleCreateMember = () => {
      if (!memberNameRef.value.trim()) {
        return
      }
      createMember(memberNameRef.value, imageSrcRef.value)
      memberNameRef.value = ''
      inputElementRef.value.focus()
      imageSrcRef.value = defaultImageSrc
      context.emit('create')
    }

    const handleImageClick = () => {
      openFileUploadRef.value = true
      setTimeout(() => {
        openFileUploadRef.value = false
      }, 500)
    }

    const handleImageLoad = (src: any) => {
      imageSrcRef.value = src
    }

    return {
      membersRef,
      memberNameRef,
      handleCreateMember,
      membersContainerRef,
      isDragRef,
      openFileUploadRef,
      handleImageClick,
      imageSrcRef,
      handleImageLoad,
      inputElementRef
    }
  }
})
</script>
