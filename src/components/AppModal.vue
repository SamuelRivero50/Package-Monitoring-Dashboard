<script setup lang="ts">
/**
 * @author Samuel Rivero
 * @description Reusable modal for forms and confirmations.
 */

interface Props {
  show: boolean
  title: string
}
defineProps<Props>()
defineEmits<{ (e: 'close'): void }>()
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[1000] p-6"
        @click.self="$emit('close')"
      >
        <div class="modal-box bg-panel border border-wire rounded-2xl max-w-[480px] w-full max-h-[90vh] overflow-hidden flex flex-col">
          <div class="flex items-center justify-between p-6 border-b border-wire">
            <h2 class="text-lg font-bold">{{ title }}</h2>
            <button
              class="p-1.5 rounded-lg text-faded hover:text-body hover:bg-sheet transition-colors duration-200"
              aria-label="Close"
              @click="$emit('close')"
            >
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="p-6 overflow-y-auto">
            <slot></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .modal-box,
.modal-leave-active .modal-box {
  transition: transform 0.2s ease;
}
.modal-enter-from .modal-box,
.modal-leave-to .modal-box {
  transform: scale(0.95);
}
</style>
