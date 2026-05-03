<script setup lang="ts">
import type { Warehouse } from '~~/server/api/warehouses.get';

useHead({ title: 'Warehouses — PackTrack Hybrid' });

const { data: warehouses, error } = await useFetch<Warehouse[]>('/api/warehouses');

function utilization(w: Warehouse): number {
  return Math.round((w.currentLoad / w.capacity) * 100);
}

function barColor(percent: number): string {
  if (percent > 90) return 'bg-rose-500';
  if (percent > 70) return 'bg-amber-500';
  return 'bg-primary';
}
</script>

<template>
  <section>
    <div class="mb-8">
      <span
        class="inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mb-3"
      >
        SSR
      </span>
      <h1 class="text-3xl font-black tracking-tight text-body">Warehouses</h1>
      <p class="mt-2 text-soft">
        Rendered server-side on each request. Data fetched from
        <code class="text-primary">/api/warehouses</code> served by Nuxt's
        <code class="text-primary">server/</code> layer.
      </p>
    </div>

    <div
      v-if="error"
      class="bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-xl p-4 text-sm"
    >
      Could not load warehouses.
    </div>

    <div v-else-if="warehouses" class="bg-panel border border-wire rounded-2xl overflow-hidden">
      <table class="w-full text-left">
        <thead class="bg-sheet border-b border-wire">
          <tr class="text-xs font-bold uppercase tracking-wider text-faded">
            <th class="px-6 py-3">Name</th>
            <th class="px-6 py-3">Location</th>
            <th class="px-6 py-3 text-right">Capacity</th>
            <th class="px-6 py-3 text-right">Load</th>
            <th class="px-6 py-3">Utilization</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-wire-subtle">
          <tr
            v-for="warehouse in warehouses"
            :key="warehouse.id"
            class="hover:bg-sheet/50 transition-colors"
          >
            <td class="px-6 py-4">
              <NuxtLink
                :to="`/warehouses/${warehouse.id}`"
                class="font-bold text-body hover:text-primary transition-colors"
              >
                {{ warehouse.name }}
              </NuxtLink>
            </td>
            <td class="px-6 py-4 text-sm text-soft">{{ warehouse.location }}</td>
            <td class="px-6 py-4 text-sm text-soft text-right">
              {{ warehouse.capacity.toLocaleString() }}
            </td>
            <td class="px-6 py-4 text-sm text-soft text-right">
              {{ warehouse.currentLoad.toLocaleString() }}
            </td>
            <td class="px-6 py-4 min-w-[180px]">
              <div class="flex items-center gap-3">
                <div class="flex-1 h-2 bg-canvas rounded-full overflow-hidden">
                  <div
                    class="h-full rounded-full transition-all"
                    :class="barColor(utilization(warehouse))"
                    :style="{ width: utilization(warehouse) + '%' }"
                  ></div>
                </div>
                <span class="text-xs font-bold text-primary w-10 text-right">
                  {{ utilization(warehouse) }}%
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
