<template>
  <header
    class="h-16 flex items-center justify-between px-8 border-b border-wire sticky top-0 z-10 bg-canvas/85 backdrop-blur-md"
  >
    <h2 class="text-lg font-bold tracking-[-0.3px] whitespace-nowrap">{{ title }}</h2>
  </header>
</template>

<script setup lang="ts">
/**
 * @author Samuel Enrique Rivero Urribarrí, David Hernández Herrera, Juan Andrés Young Hoyos
 * @description Sticky top bar for dashboard pages showing the page title.
 */

defineProps<{
  title: string
}>()
</script>
