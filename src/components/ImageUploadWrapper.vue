<template>
  <form
    :class="[
      'border-2 border-dashed',
      {'image-upload--loading': isLoading},
      {'image-upload--uploaded': isUploaded}
    ]"
    enctype="multipart/form-data"
    @dragenter.prevent.stop="handleDragOver"
    @dragover.prevent.stop
    @dragleave.prevent.stop="handleDragLeave"
    @dragend.prevent.stop="handleDragLeave"
    @drop.prevent.stop="handleDragDrop"
  >
    <slot />
    <input
      ref="uploadElement"
      class="hidden"
      type="file"
      @change="handleInputChange"
    >
  </form>
</template>

<script lang="ts">
import { defineComponent, SetupContext, Ref, ref, watch } from 'vue'

export default defineComponent({
  name: 'Navigation',
  props: {
    openFileUpload: {
      type: Boolean,
      default: false
    }
  },
  emits: ['drag-enter', 'drag-leave', 'size-exceeded', 'wrong-format', 'load'],
  setup(props: any, context: SetupContext) {
    const uploadElement: Ref<HTMLElement | null> = ref(null)
    const maxSize = 20
    let dragCount = 0
    let file = null
    const isLoading = ref(false)
    const isUploaded = ref(false)
    const isAdvancedUpload = () => {
      const div = document.createElement('div')
      return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window
    }

    const handleDragOver = () => {
      dragCount++
      context.emit('drag-enter')
    }

    const handleDragLeave = () => {
      dragCount--
      if (!dragCount) {
        context.emit('drag-leave')
      }
    }

    const handleFileUpload = () => {
      (uploadElement.value as HTMLElement).click()
    }

    const handleDragDrop = (event: any) => {
      isLoading.value = true
      handleDragLeave()
      const files = event.target.files || event.dataTransfer.files
      if (!files.length) {
        isLoading.value = false
        return
      }

      file = files[0]
      if (!['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'].includes(file.type)) {
        console.log('no image')
        context.emit('wrong-format', file.type)
        isLoading.value = false
        return
      }
      const size = file.size && (file.size / Math.pow(1000, 2))

      // check file max size
      if (size > maxSize) {
        console.log('file too big')
        context.emit('size-exceeded', size)
        isLoading.value = false
        return
      }

      const reader = new FileReader()

      reader.onload = (event) => {
        const dataURI = event?.target?.result
        if (dataURI) {
          context.emit('load', dataURI)
        }
      }

      // read blob url from file data
      reader.readAsDataURL(file)

      isLoading.value = false
      isUploaded.value = true
    }

    const handleInputChange = (event: MouseEvent) => {
      handleDragDrop(event)
    }

    watch(() => props.openFileUpload, () => {
      if (props.openFileUpload) {
        handleFileUpload()
      }
    })

    return {
      isAdvancedUpload,
      handleDragOver,
      handleDragLeave,
      handleDragDrop,
      handleFileUpload,
      handleInputChange,
      uploadElement,
      isLoading,
      isUploaded
    }
  }
})
</script>
