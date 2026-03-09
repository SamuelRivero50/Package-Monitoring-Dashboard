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
      <div v-if="show" class="modalOverlay" @click.self="$emit('close')">
        <div class="modalBox">
          <div class="modalHeader">
            <h2 class="modalTitle">{{ title }}</h2>
            <button class="modalClose" aria-label="Close" @click="$emit('close')">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="modalBody">
            <slot></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modalOverlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--spacing-lg);
}

.modalBox {
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  max-width: 480px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modalHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-default);
}

.modalTitle {
  font-size: var(--text-lg);
  font-weight: 700;
}

.modalClose {
  padding: 6px;
  border-radius: var(--radius-md);
  color: var(--text-muted);
  background: transparent;
  border: none;
  transition: color 0.2s, background 0.2s;
}

.modalClose:hover {
  color: var(--text-primary);
  background: var(--bg-elevated);
}

.modalBody {
  padding: var(--spacing-lg);
  overflow-y: auto;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modalBox,
.modal-leave-active .modalBox {
  transition: transform 0.2s ease;
}

.modal-enter-from .modalBox,
.modal-leave-to .modalBox {
  transform: scale(0.95);
}
</style>
