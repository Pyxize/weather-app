<script setup lang="ts">


defineEmits(["close-modal"])
defineProps({
  modal: {
    type: Boolean,
    default: false
  }
})

</script>

<template>
    <div v-show="modal" class="absolute w-full bg-slate-900 bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8">
      <div v-if="modal" class="p-4 bg-white self-start mt-32 max-w-screen-md">
        <slot />
        <button @click="$emit('close-modal')" class="text-white mt-8 bg-indigo-300 py-2 px-6">Fermer</button>
      </div>
    </div>
</template>

<style scoped>

</style>