<template>
  <div
    :class="[
      'absolute top-16 left-px bg-white text-black z-20 border-t border-gray-400 opacity-0 shadow-xl rounded-br-lg overflow-hidden',
      'transition duration-700 opacity-0 pointer-events-none',
      isOpen ? 'opacity-100 pointer-events-auto' : ''
    ]"
    style="margin-top: 4px"
  >
    <div class="flex items-center py-5 pl-5 pr-10 transition border border-white cursor-pointer hover:bg-gray-700 hover:text-white">
      <svg
        class="w-6 h-6 mr-2"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      ><path
        fill-rule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
        clip-rule="evenodd"
      /></svg>
      <div>
        todo
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChatMembers',
  components: {
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {
    }
  }
})
</script>
