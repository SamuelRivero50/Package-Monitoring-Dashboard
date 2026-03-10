<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import DashboardHeader from '@/components/DashboardHeader.vue'

const carriers = [
  {
    name: 'FedEx',
    gradient: 'linear-gradient(135deg, #4D148C, #FF6600)',
    packages: '1,240',
    avgDays: '2.4',
  },
  {
    name: 'DHL',
    gradient: 'linear-gradient(135deg, #FFCC00, #D40511)',
    packages: '890',
    avgDays: '3.1',
  },
  {
    name: 'UPS',
    gradient: 'linear-gradient(135deg, #351C15, #FFB500)',
    packages: '1,560',
    avgDays: '2.8',
  },
  {
    name: 'Amazon',
    gradient: 'linear-gradient(135deg, #232F3E, #FF9900)',
    packages: '2,100',
    avgDays: '1.9',
  },
]
</script>

<template>
  <div class="flex min-h-screen bg-canvas">
    <AppSidebar activePage="/carriers" />

    <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <DashboardHeader title="Carrier Directory" />

      <div class="flex-1 overflow-y-auto p-8">
        <div class="max-w-[1200px] mx-auto flex flex-col gap-10">

          <!-- Carrier Cards -->
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div
              v-for="carrier in carriers"
              :key="carrier.name"
              class="bg-panel border border-wire rounded-2xl overflow-hidden transition-[border-color,transform] duration-200 hover:border-primary/25 hover:-translate-y-0.5"
            >
              <div
                class="h-24 flex items-center justify-center"
                :style="{ background: carrier.gradient }"
              >
                <span class="text-white text-2xl font-black tracking-[-0.5px] [text-shadow:0_2px_8px_rgba(0,0,0,0.3)]">
                  {{ carrier.name }}
                </span>
              </div>
              <div class="p-5">
                <h3 class="font-bold text-base mb-2">{{ carrier.name }} Express</h3>
                <div class="flex flex-col gap-1.5">
                  <div class="flex items-center gap-2 text-xs text-soft">
                    <span class="material-symbols-outlined" style="font-size:16px">package</span>
                    <span>{{ carrier.packages }} active</span>
                  </div>
                  <div class="flex items-center gap-2 text-xs text-soft">
                    <span class="material-symbols-outlined" style="font-size:16px">schedule</span>
                    <span>{{ carrier.avgDays }} days avg.</span>
                  </div>
                </div>
                <button class="w-full mt-4 py-2.5 rounded-xl bg-sheet text-soft text-xs font-bold transition-[background,color] duration-200 hover:bg-primary hover:text-canvas">
                  Manage
                </button>
              </div>
            </div>
          </div>

          <!-- Live Network Coverage -->
          <div class="p-6 bg-panel border border-wire rounded-2xl">
            <h3 class="text-lg font-bold mb-4">Live Network Coverage</h3>
            <div class="relative aspect-video rounded-xl overflow-hidden bg-sheet">
              <img
                src="https://placeholder.pics/svg/800x450/0d1117/2dd4bf?text=GLOBAL%20LOGISTICS%20MAP"
                alt="Global logistics map"
                class="w-full h-full object-cover opacity-50"
              />
              <div class="absolute inset-0 bg-primary/4 pointer-events-none"></div>

              <!-- Map dot 1 -->
              <div class="absolute w-3 h-3" style="top:25%;left:33%">
                <span class="absolute inset-0 rounded-full bg-primary opacity-60 animate-ping-map"></span>
                <span class="absolute inset-[2px] rounded-full bg-primary shadow-[0_0_10px_#2dd4bf]"></span>
              </div>
              <!-- Map dot 2 -->
              <div class="absolute w-3 h-3" style="top:50%;left:55%">
                <span class="absolute inset-0 rounded-full bg-primary opacity-60 animate-ping-map"></span>
                <span class="absolute inset-[2px] rounded-full bg-primary shadow-[0_0_10px_#2dd4bf]"></span>
              </div>
              <!-- Map dot 3 -->
              <div class="absolute w-3 h-3" style="top:35%;left:72%">
                <span class="absolute inset-0 rounded-full bg-primary opacity-60 animate-ping-map"></span>
                <span class="absolute inset-[2px] rounded-full bg-primary shadow-[0_0_10px_#2dd4bf]"></span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>
