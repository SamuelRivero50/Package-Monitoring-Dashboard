<script setup lang="ts">
useHead({ title: 'PackTrack Hybrid — Home' });
</script>

<template>
  <section class="space-y-8">
    <h1 class="text-4xl font-black tracking-tight text-body">PackTrack Hybrid</h1>

    <article
      class="bg-panel border border-wire rounded-xl p-6 hover:border-primary/40 transition-colors max-w-md"
    >
      <span
        class="inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mb-3"
      >
        SSR
      </span>
      <h2 class="text-lg font-black mb-2">Warehouses</h2>
      <p class="text-sm text-soft leading-relaxed mb-4">
        List rendered on each request. Data fetched from Nuxt's
        <code class="text-primary text-xs">server/</code> layer via
        <code class="text-primary text-xs">useFetch</code>.
      </p>
      <NuxtLink to="/warehouses" class="text-sm font-bold text-primary hover:text-primary-dark">
        Browse warehouses →
      </NuxtLink>
    </article>
  </section>
</template>
