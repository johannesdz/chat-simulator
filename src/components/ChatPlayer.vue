<template>
  <div class="flex">
    <div
      v-if="isPlaying"
      class="flex p-2 transition transform scale-100 rounded-full cursor-pointer min-w-40px hover:scale-125 hover:text-white hover:shadow-inner"
      @click="handlePlayerStop"
    >
      <svg
        class="w-8 h-8"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      ><path
        fill-rule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
        clip-rule="evenodd"
      /></svg>
    </div>
    <div
      class="flex p-2 mr-2 transition transform scale-100 rounded-full cursor-pointer min-w-40px hover:scale-125 hover:text-white hover:shadow-inner"
      @click="handlePlayerClick"
    >
      <svg
        v-if="isPlaying && !isPausing"
        class="w-8 h-8"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      ><path
        fill-rule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
        clip-rule="evenodd"
      /></svg>
      <svg
        v-else
        class="w-8 h-8"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      ><path
        fill-rule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
        clip-rule="evenodd"
      /></svg>
    </div>
  </div>
  <div
    v-if="showProgressBar"
    class="absolute left-0 right-0 z-20 pb-1 bg-gray-400 shadow top-full"
  >
    <div
      class="absolute top-0 bottom-0 left-0 z-20 mt-px bg-gray-700"
      :style="progressStyleRef"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import usePlayer from '@/composables/usePlayer'
import useMessages from '@/composables/useMessages'

export default defineComponent({
  name: 'ChatPlayer',
  setup() {
    const { play, pause, stop, isPlaying, isPausing, playerMessagesRef } = usePlayer()
    const { messagesRef } = useMessages()
    const showProgressBar = ref(false)

    const handlePlayerClick = () => {
      if (isPlaying.value && !isPausing.value) {
        pause()
        return
      }
      showProgressBar.value = true
      play()
    }

    const handlePlayerStop = () => {
      stop()
      showProgressBar.value = false
    }

    const progressStyleRef = computed(() => {
      return {
        minWidth: '10px',
        width: (isPlaying.value ? Math.round(playerMessagesRef.value.length * 100 / messagesRef.value.length) : '100') + '%'
      }
    })

    watch([isPlaying, isPausing], () => {
      if (!isPlaying.value && !isPausing.value) {
        setTimeout(() => {
          if (!isPlaying.value && !isPausing.value) {
            showProgressBar.value = false
          }
        }, 1000)
      }
    })

    return {
      handlePlayerClick,
      handlePlayerStop,
      isPlaying,
      isPausing,
      playerMessagesRef,
      messagesRef,
      progressStyleRef,
      showProgressBar
    }
  }
})
</script>
