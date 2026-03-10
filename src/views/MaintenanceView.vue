<script setup lang="ts">
/**
 * @author David Hernandez
 * @description Maintenance page shown to non-admin users when maintenance mode is active.
 */
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-canvas px-4">
    <div class="text-center max-w-md">
      <span class="material-symbols-outlined text-7xl text-primary mb-4 block">engineering</span>
      <h1 class="text-3xl font-black text-body mb-3">Under Maintenance</h1>
      <p class="text-soft text-base leading-relaxed mb-8">
        PackTrack is currently undergoing scheduled maintenance. Please check back shortly.
      </p>
      <a
        href="/"
        class="inline-block px-6 py-3 rounded-xl bg-primary text-canvas font-black text-sm transition-[filter] duration-200 hover:brightness-110"
      >
        Try Again
      </a>
    </div>
  </div>
</template>
