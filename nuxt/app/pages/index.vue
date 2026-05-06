<script setup lang="ts">
useHead({ title: 'PackTrack Hybrid — Home' });
</script>

<template>
  <section class="space-y-8">
    <h1 class="text-4xl font-black tracking-tight text-body">PackTrack Hybrid</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <article
        class="bg-panel border border-wire rounded-xl p-6 hover:border-primary/40 transition-colors"
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

      <article
        class="bg-panel border border-wire rounded-xl p-6 hover:border-primary/40 transition-colors"
      >
        <span
          class="inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-500/15 text-amber-400 border border-amber-500/30 mb-3"
        >
          CSR
        </span>
        <h2 class="text-lg font-black mb-2">Tools</h2>
        <p class="text-sm text-soft leading-relaxed mb-4">
          Rendered only in the browser. Includes a capacity calculator and an FAQ accordion.
        </p>
        <NuxtLink to="/tools" class="text-sm font-bold text-primary hover:text-primary-dark">
          Open tools →
        </NuxtLink>
      </article>
    </div>
  </section>
</template>
