<template>
  <header class="h-16 flex items-center justify-between px-8 border-b border-wire sticky top-0 z-10 bg-canvas/85 backdrop-blur-md">
    <h2 class="text-lg font-bold tracking-[-0.3px] whitespace-nowrap">{{ title }}</h2>
    <div class="flex items-center gap-2">
      <button class="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/5 text-soft transition-[color,background] duration-200 hover:text-primary hover:bg-primary/10">
        <span class="material-symbols-outlined" style="font-size:20px">notifications</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
