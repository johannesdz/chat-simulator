<template>
  <div
    :class="[
      'flex group transition opacity-0 rounded',
      isVisibleRef ? 'opacity-100' : '',
      messageRef.member.id === 1 ? 'flex-row-reverse' : '',
      messageRef.member.id === 0 ? 'pl-24 justify-center' : '',
      isDraggedRef ? 'invisible' : ''
    ]"
    :draggable="true"
    @dragstart="startDrag($event)"
    @dragend="isDraggedRef = false"
  >
    <div
      v-if="messageRef.member.id"
      :class="[
        'min-w-40px',
        messageRef.member.id === 1 ? 'ml-2' : 'mr-2'
      ]"
    >
      <img
        v-show="messageRef.showImage && messageRef.member"
        width="40"
        height="40"
        class="object-cover transition transform scale-100 bg-gray-300 border-gray-300 rounded-full cursor-pointer h-40px w-40px shadow-l hover:scale-110"
        :src="messageRef.member.image || defaultMemberImage"
        @click="handleChooseMember"
      >
    </div>
    <div
      :class="[
        `bg-${messageRef.member.color || 'gray'}-900`,
        ' text-white rounded shadow ',
        messageRef.member.id === 0 ? 'opacity-50 p-1' : 'p-2',
      ]"
    >
      <div
        v-if="messageRef.member"
        :class="[
          `border-${messageRef.member.color || 'gray'}-900`,
          'text-xs font-bold text-white border cursor-pointer group text-opacity-70 hover:text-opacity-100 relative flex',
          messageRef.member.id === 1 ? 'justify-start flex-row-reverse' : '',
          messageRef.member.id === 0 ? 'justify-center' : '',
        ]"
        @click="handleChooseMember"
      >
        <span
          :class="[
            messageRef.member.id === 0 ? 'pl-3' : '',
          ]"
        >
          {{ messageRef.member.name }}
        </span>
        <span
          :class="[
            'text-white transition cursor-pointer opacity-0 group-hover:opacity-70'
          ]"
        >
          <svg
            class="w-4 h-4"
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
      <div class="relative transition ease-in">
        <div v-if="messageRef.image">
          <img
            :src="messageRef.image"
            class="w-full mt-2 mb-1"
          >
        </div>
        <div
          :class="[
            `border-${messageRef.member.color || 'gray'}-900`,
            'w-full border border-dashed outline-none whitespace-pre-line break-word hover:border-gray-300 focus:border-white',
            !messageRef.member.id ? 'pl-5 pr-5 italic text-sm' : '' ,
            messageRef.member.id === 1 ? 'pl-5' : 'pr-5'
          ]"
          role="textbox"
          contenteditable
          @input="handleTextInput($event)"
        >
          {{ messageRef.text }}
        </div>
      </div>
    </div>

    <div
      :class="[
        'items-center self-center justify-center p-2  transition transform opacity-0 cursor-move hover:text-black hover:scale-125 hover:opacity-100 group-hover:opacity-100',
        messageRef.member.id === 1 ? 'mr-1' : 'ml-1'
      ]"
    >
      <svg
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      ><path
        fill-rule="evenodd"
        d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
        clip-rule="evenodd"
      /></svg>
    </div>

    <div
      :class="[
        'items-center self-center justify-center p-2  transition transform opacity-0 cursor-pointer  hover:scale-125 hover:opacity-100 group-hover:opacity-100',
        messageRef.member.id === 1 ? 'ml-5' : 'mr-5',
        removeMessageRef ? 'text-red-500' : ''
      ]"
      @click="handleRemoveMessage"
      @mouseleave="handleRemoveMouseLeave"
    >
      <svg
        class="w-5 h-5 "
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      /></svg>
    </div>
  </div>
  <div
    :class="[
      'drop-zone border-2 border-dashed transform transition-all bg-opacity-50 rounded',
      isDragOverRef ? 'border-gray-500 bg-gray-50' : ''
    ]"
    :style="(!isDraggedRef && isDragOverRef) ? 'min-height: 70px' : 'min-height: 10px'"
    @drop.prevent.stop="onDrop($event, 1)"
    @dragover.prevent.stop
    @dragenter.prevent.stop="isDragOverRef = true"
    @dragleave.prevent.stop="isDragOverRef = false"
  />
</template>

<script lang="ts">
import { defineComponent, ComputedRef, computed, ref, onMounted, SetupContext } from 'vue'
import useMembersOverlay from '@/composables/useMembersOverlay'
import useMessages from '@/composables/useMessages'
import constants from '@/util/constants'
import { Message } from '@/types/message'
import { MemberId } from '@/types/member'

export default defineComponent({
  name: 'ChatMessagesItem',
  components: {
  },
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  emits: ['mounted'],
  setup(props: any, context: SetupContext) {
    const { removeMessage, getMessage, sortMessages } = useMessages()
    const { openMembersOverlay } = useMembersOverlay()
    const messageRef: ComputedRef<Message> = computed(() => props.message)
    const isVisibleRef = ref(false)
    const removeMessageRef = ref(false)
    const isDragOverRef = ref(false)
    const isDraggedRef = ref(false)
    const maxLength = 1000

    onMounted(() => {
      setTimeout(() => {
        isVisibleRef.value = true
        context.emit('mounted')
      }, 100)
    })

    const handleRemoveMessage = () => {
      if (!removeMessageRef.value) {
        removeMessageRef.value = true
        return
      }
      isVisibleRef.value = false
      setTimeout(() => {
        removeMessage(messageRef.value.id)
      }, 500)
    }

    const handleRemoveMouseLeave = () => {
      removeMessageRef.value = false
    }

    const chooseMemberCallback = (memberId: MemberId) => {
      messageRef.value.memberId = memberId
    }

    const handleChooseMember = () => {
      openMembersOverlay(chooseMemberCallback)
    }

    const handleTextInput = (event: any) => {
      const text: string = event.target.innerText
      if (text.length > maxLength) {
        event.target.innerText = text.substring(0, maxLength)
        event.target.blur()
        return
      }
      messageRef.value.text = text
    }

    const startDrag = (event: DragEvent) => {
      if (!event.dataTransfer) {
        return
      }
      setTimeout(() => {
        isDraggedRef.value = true
      }, 100)
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      const element: HTMLElement = event.target as HTMLElement
      event.dataTransfer.setData('messageId', messageRef.value.id.toString())
      event.dataTransfer.setData('elementHeight', element.offsetHeight.toString())
    }

    const onDrop = (event: DragEvent) => {
      isDragOverRef.value = false
      if (!event.dataTransfer) {
        return
      }
      const messageId = parseInt(event.dataTransfer.getData('messageId'))
      if (!messageId) {
        return
      }
      const sourceMessage: Message | undefined = getMessage(messageId)
      if (sourceMessage) {
        sortMessages(sourceMessage, messageRef.value)
      }
    }

    const defaultMemberImage = constants.defaultMemberImage

    return {
      messageRef,
      isVisibleRef,
      handleRemoveMessage,
      handleChooseMember,
      handleTextInput,
      startDrag,
      onDrop,
      isDragOverRef,
      isDraggedRef,
      removeMessageRef,
      handleRemoveMouseLeave,
      defaultMemberImage
    }
  }
})
</script>
