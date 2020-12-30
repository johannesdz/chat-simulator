<template>
  <div
    v-is="member.id !== 0 && chooseCallbackRef ? 'div' : 'ImageUploadWrapper'"
    :class="[
      'border-2 border-dashed rounded-t relative border-white',
      !chooseCallbackRef && isDragRef ? 'border-gray-400' : '',
    ]"
    :open-file-upload="openFileUploadRef"
    @load="handleImageLoad"
  >
    <div
      :class="[
        'py-3 border-b border-dashed border-gray-100 rounded',
        chooseCallbackRef ? 'hover:border-gray-300 border hover:bg-gray-50 cursor-pointer' : ''
      ]"
      @click="handleChooseMember"
    >
      <div
        :class="[
          'flex items-center transition group duration-500 ease-linear opacity-0',
          isVisibleRef ? 'opacity-100' : '',
          !chooseCallbackRef ? '' : 'cursor-pointer',
          member.id === 1 ? 'flex-row-reverse' : '',
        ]"
      >
        <img
          v-if="member.id"
          width="40"
          height="40"
          :class="[
            'object-cover mr-2 ml-2 border-gray-300 rounded-full shadow-l h-40px w-40px',
            !chooseCallbackRef ? 'cursor-pointer' : ''
          ]"
          :src="imageSrcRef"
          @click="handleImageClick"
        >
        <div
          :class="[
            member.id === 1 ? '' : 'flex-grow',
            member.id === 0 ? 'flex items-center justify-center' : ''
          ]"
        >
          <div
            :class="[
              memberColorRef === 'gray' ? 'bg-gray-900' : '',
              memberColorRef === 'rose' ? 'bg-rose-900' : '',
              memberColorRef === 'fuchsia' ? 'bg-fuchsia-900' : '',
              memberColorRef === 'violet' ? 'bg-violet-900' : '',
              memberColorRef === 'cyan' ? 'bg-cyan-900' : '',
              memberColorRef === 'emerald' ? 'bg-emerald-900' : '',
              memberColorRef === 'lime' ? 'bg-lime-900' : '',
              memberColorRef === 'amber' ? 'bg-amber-900' : '',
              !memberColorRef ? 'bg-gray-900' : '',
              memberColorRef === 'gray' ? 'border-gray-900' : '',
              mmemberColorRef === 'rose' ? 'border-rose-900' : '',
              memberColorRef === 'fuchsia' ? 'border-fuchsia-900' : '',
              memberColorRef === 'violet' ? 'border-violet-900' : '',
              memberColorRef === 'cyan' ? 'border-cyan-900' : '',
              memberColorRef === 'emerald' ? 'border-emerald-900' : '',
              memberColorRef === 'lime' ? 'border-lime-900' : '',
              memberColorRef === 'amber' ? 'border-amber-900' : '',
              !memberColorRef ? 'border-gray-900' : '',
              'relative inline-flex p-1 pr-2 text-white transition ease-in border border-dashed rounded',
              !chooseCallbackRef ? 'focus:border-white group-hover:border-white' : '',
              member.id === 0 ? 'opacity-50' : ''
            ]"
          >
            <span
              :class="[
                'w-auto max-w-xs truncate outline-none sm:max-w-xs',
                !chooseCallbackRef ? 'pr-5' : ''
              ]"
              role="textbox"
              :contenteditable="!chooseCallbackRef"
              @input="handleNameInput($event)"
            >{{ member.name }}</span>
            <div
              v-if="!chooseCallbackRef"
              class="absolute top-0 bottom-0 right-0 flex items-center justify-center pr-1 cursor-pointer"
              @click="handleColorToggle"
            >
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              ><path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              /></svg>
            </div>
          </div>
        </div>
        <div
          v-if="!chooseCallbackRef && member.id > 1"
          :class="[
            'items-center justify-center p-2 transition transform  ',
            member.isDelatable ? 'cursor-pointer hover:scale-125' : 'cursor-not-allowed opacity-50',
            isMarkedForRemove ? 'text-red-500' : ''
          ]"
          :title="member.isDelatable ? '' : 'Delete messages first'"
          @click="handleRemoveMemberClick"
          @mouseleave="isMarkedForRemove = false"
        >
          <svg
            class="w-5 h-5"
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
    </div>
    <div
      v-if="colorSelectIndexRef === member.id"
      class="absolute left-0 right-0 z-10 flex w-full p-4 bg-white shadow-xl top-full justify-items-stretch"
      @mouseleave="handleColorToggle"
    >
      <div
        v-for="(color, i) in possibleColors"
        :key="i"
        :class="[
          'h-10 flex-grow mr-1 transition transform cursor-pointer border-white border-2 shadow rounded',
          color === 'gray' ? 'bg-gray-900' : '',
          color === 'rose' ? 'bg-rose-900' : '',
          color === 'fuchsia' ? 'bg-fuchsia-900' : '',
          color === 'violet' ? 'bg-violet-900' : '',
          color === 'cyan' ? 'bg-cyan-900' : '',
          color === 'emerald' ? 'bg-emerald-900' : '',
          color === 'lime' ? 'bg-lime-900' : '',
          color === 'amber' ? 'bg-amber-900' : '',
          !color ? 'bg-gray-900' : '',
          (color === member.color) ? 'scale-125 ml-1 mr-2' : 'scale-100 hover:scale-110'
        ]"
        @mouseover="colorHoverRef = color"
        @mouseleave="colorHoverRef = ''"
        @click="handleColorClick(color)"
      >
        &nbsp;
      </div>
      <div
        class="flex items-center justify-center px-2 cursor-pointer"
        @click="handleColorToggle"
      >
        <svg
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        /></svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, ComputedRef, computed, onMounted } from 'vue'
import useMembersOverlay from '@/composables/useMembersOverlay'
import useMembers from '@/composables/useMembers'
import ImageUploadWrapper from '@/components/ImageUploadWrapper.vue'
import { Member } from '@/types/member'
import constants from '@/util/constants'

export default defineComponent({
  name: 'ChatMembersItem',
  components: {
    ImageUploadWrapper
  },
  props: {
    member: {
      type: Object,
      required: true
    }
  },
  setup(props: any) {
    const { removeMember, possibleColors, updateMember } = useMembers()
    const { chooseMembersOverlay, chooseCallbackRef, openColorSelect, closeColorSelect, colorSelectIndexRef } = useMembersOverlay()
    const isDragRef = ref(false)
    const isVisibleRef = ref(false)
    const openFileUploadRef = ref(false)
    const isMarkedForRemove = ref(false)
    const colorHoverRef = ref('')
    const memberRef: ComputedRef<Member> = computed(() => props.member)
    const maxLength = 30

    onMounted(() => {
      setTimeout(() => {
        isVisibleRef.value = true
      }, 100)
    })

    const handleRemoveMemberClick = () => {
      if (!memberRef.value.id || !memberRef.value.isDelatable) {
        return
      }
      if (!isMarkedForRemove.value) {
        isMarkedForRemove.value = true
        return
      }
      isVisibleRef.value = false
      setTimeout(() => {
        removeMember(memberRef.value.id)
      }, 500)
    }

    const handleNameInput = (event: any) => {
      const name: string = event.target.innerText
      if (name.length > maxLength) {
        event.target.innerText = name.substring(0, maxLength)
        event.target.blur()
        return
      }
      const member = memberRef.value
      member.name = name
      updateMember(member)
    }

    const handleImageLoad = (image: any) => {
      const member = memberRef.value
      member.image = image
      updateMember(member)
    }

    const handleImageClick = () => {
      if (chooseCallbackRef.value) {
        return
      }
      openFileUploadRef.value = true
      setTimeout(() => {
        openFileUploadRef.value = false
      }, 500)
    }

    const handleChooseMember = () => {
      if (!chooseCallbackRef.value) {
        return
      }
      chooseMembersOverlay(memberRef.value.id)
    }

    const handleColorToggle = () => {
      if (colorSelectIndexRef.value === memberRef.value.id) {
        closeColorSelect()
        return
      }
      openColorSelect(memberRef.value.id)
    }

    const handleColorClick = (color: string) => {
      const member = memberRef.value
      member.color = color
      updateMember(member)
      closeColorSelect()
    }

    const memberColorRef = computed(() => {
      return colorHoverRef.value || memberRef.value.color || 'gray'
    })

    const imageSrcRef = computed(() => memberRef.value.image || constants.defaultMemberImage)

    return {
      handleRemoveMemberClick,
      handleImageLoad,
      handleNameInput,
      isDragRef,
      isVisibleRef,
      imageSrcRef,
      openFileUploadRef,
      handleImageClick,
      chooseMembersOverlay,
      handleChooseMember,
      chooseCallbackRef,
      possibleColors,
      colorSelectIndexRef,
      handleColorToggle,
      colorHoverRef,
      memberColorRef,
      handleColorClick,
      isMarkedForRemove
    }
  }
})
</script>
