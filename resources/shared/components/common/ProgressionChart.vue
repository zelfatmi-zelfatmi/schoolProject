<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

const props = defineProps({
  labels: Array, // ['12 avr', '13 avr', '14 avr', ...]
  scores: Array  // [28, 30, 32, 26, 35]
})

const chartData = {
  labels: props.labels,
  datasets: [
    {
      label: 'Score sur 40',
      data: props.scores,
      fill: false,
      borderColor: '#10b981',
      backgroundColor: '#10b981',
      tension: 0.3
    }
  ]
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      min: 0,
      max: 40,
      ticks: {
        stepSize: 5
      }
    }
  }
}
</script>

<template>
  <Line :data="chartData" :options="chartOptions" />
</template>
