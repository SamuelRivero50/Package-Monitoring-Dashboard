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
  <div class="donut-wrapper">
    <Doughnut :data="chartData" :options="chartOptions" />
    <div v-if="centerLabel || centerValue" class="donut-center">
      <span class="donut-center-value">{{ centerValue }}</span>
      <span class="donut-center-label">{{ centerLabel }}</span>
    </div>
  </div>
</template>

<style scoped>
.donut-wrapper {
  position: relative;
  width: 180px;
  height: 180px;
}

.donut-center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.donut-center-value {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--text-primary);
}

.donut-center-label {
  font-size: 10px;
  color: var(--text-secondary);
  text-transform: uppercase;
  font-weight: 700;
}
</style>
