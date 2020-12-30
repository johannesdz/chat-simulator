import { Message } from '@/types/message'
import { Ref, ref } from 'vue'
import useMessages from '@/composables/useMessages'

const playerMessagesRef: Ref<Message[]> = ref([])
const isPlaying: Ref<boolean> = ref(false)
const isPausing: Ref<boolean> = ref(false)

export default function usePlayer() {
  const { sortedMessagesRef } = useMessages()

  const stop = async () => {
    playerMessagesRef.value = []
    isPlaying.value = false
  }

  const pause = async () => {
    isPausing.value = true
  }

  const addMessage = (): boolean => {
    const nextMessage = sortedMessagesRef.value[playerMessagesRef.value.length]
    if (!nextMessage) {
      return false
    }
    if (!isPlaying.value || isPausing.value) {
      return false
    }
    playerMessagesRef.value.push(nextMessage)
    return playerMessagesRef.value.length === sortedMessagesRef.value.length
  }

  const play = async () => {
    isPausing.value = false
    isPlaying.value = true
    await setTimeout(() => {
      const isEndOfMessages = addMessage()
      if (!isPlaying.value || isPausing.value) {
        return
      }
      if (isEndOfMessages) {
        stop()
        return
      }
      play()
    }, 1500)
  }

  return {
    play,
    stop,
    pause,
    isPlaying,
    isPausing,
    playerMessagesRef
  }
}

export type UsePlayer = ReturnType<typeof usePlayer>;
