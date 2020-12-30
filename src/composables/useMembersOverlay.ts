import { MemberId } from '@/types/member'
import { Ref, ref } from 'vue'

const isOpenRef: Ref<boolean> = ref(false)
const colorSelectIndexRef: Ref<MemberId | undefined> = ref()
const chooseCallbackRef: Ref<Function | undefined> = ref()

export default function useMembersOverlay() {
  const openMembersOverlay = (callback?: Function): void => {
    chooseCallbackRef.value = callback
    isOpenRef.value = true
  }

  const openColorSelect = (memberId: MemberId): void => {
    colorSelectIndexRef.value = memberId
  }

  const closeColorSelect = (): void => {
    colorSelectIndexRef.value = undefined
  }

  const closeMembersOverlay = (): void => {
    isOpenRef.value = false
    setTimeout(() => {
      closeColorSelect()
    }, 500)
  }

  const chooseMembersOverlay = (memberId: MemberId): void => {
    chooseCallbackRef.value && chooseCallbackRef.value(memberId)
    closeMembersOverlay()
  }

  return {
    openMembersOverlay,
    closeMembersOverlay,
    chooseMembersOverlay,
    chooseCallbackRef,
    isOpenRef,
    colorSelectIndexRef,
    openColorSelect,
    closeColorSelect
  }
}

export type UseMembersOverlay = ReturnType<typeof useMembersOverlay>;
