<script setup lang="ts">
/**
 * @author Law
 * @description Reusable donut chart component using Chart.js via vue-chartjs.
 */
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  labels: string[]
  values: number[]
  colors: string[]
  centerLabel?: string
  centerValue?: string
}

const props = defineProps<Props>()

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      data: props.values,
      backgroundColor: props.colors,
      borderWidth: 0,
      hoverOffset: 6,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%',
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#161b22',
      borderColor: '#30363d',
      borderWidth: 1,
      titleColor: '#e6edf3',
      bodyColor: '#8b949e',
      padding: 10,
      cornerRadius: 8,
    },
  },
} as const
</script>

<template>
  <div class="relative w-[180px] h-[180px]">
    <Doughnut :data="chartData" :options="chartOptions" />
    <div
      v-if="centerLabel || centerValue"
      class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
    >
      <span class="text-2xl font-bold text-body">{{ centerValue }}</span>
      <span class="text-[10px] text-soft uppercase font-bold">{{ centerLabel }}</span>
    </div>
  </div>
</template>
