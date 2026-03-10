<script setup lang="ts">
/**
 * @author Juan Andrés Young Hoyos
 * @description Reusable vertical bar chart component using Chart.js via vue-chartjs.
 */
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

interface Props {
  labels: string[]
  values: number[]
  colors: string[]
}

const props = defineProps<Props>()

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      data: props.values,
      backgroundColor: props.colors,
      borderRadius: 6,
      borderSkipped: false,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
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
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#8b949e', font: { size: 12 } },
      border: { display: false },
    },
    y: {
      grid: { color: '#21262d' },
      ticks: { color: '#8b949e', font: { size: 12 }, stepSize: 1 },
      border: { display: false },
    },
  },
} as const
</script>

<template>
  <div class="w-full h-full">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
