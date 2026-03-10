<template>
  <header class="h-16 flex items-center justify-between px-8 border-b border-wire sticky top-0 z-10 bg-canvas/85 backdrop-blur-md">
    <div class="flex items-center gap-6 flex-1">
      <h2 class="text-lg font-bold tracking-[-0.3px] whitespace-nowrap">{{ title }}</h2>
      <div class="relative max-w-[280px] w-full hidden sm:block">
        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-faded" style="font-size:16px">search</span>
        <input
          class="w-full bg-primary/5 border border-wire rounded-lg py-2 pl-[38px] pr-3.5 text-body text-sm outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-faded focus:border-primary focus:shadow-[0_0_0_3px_rgba(45,212,191,0.12)]"
          placeholder="Search..."
          type="text"
        />
      </div>
    </div>
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
