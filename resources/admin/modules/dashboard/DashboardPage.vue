<template>
    <div class="p-6 space-y-8">

<!-- Tableau Produits par Mois -->

      <!-- Statistiques -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <CardStatColored
          title="Revenu total"
          :value="'€' + stats.revenuTotal.toLocaleString()"
          :icon="CurrencyEuroIcon"
          bgClass="bg-gradient-to-r from-green-500 to-green-700"
        />
        <CardStatColored
          title="Revenu journalier"
          :value="'€' + stats.revenuJournalier.toLocaleString()"
          :icon="CurrencyEuroIcon"
          bgClass="bg-gradient-to-r from-emerald-400 to-emerald-600"
        />
        <CardStatColored
          title="Revenu mensuel"
          :value="'€' + stats.revenuMensuel.toLocaleString()"
          :icon="CurrencyEuroIcon"
          bgClass="bg-gradient-to-r from-blue-400 to-blue-600"
        />
        <CardStatColored
          title="Revenu annuel"
          :value="'€' + stats.revenuAnnuel.toLocaleString()"
          :icon="CurrencyEuroIcon"
          bgClass="bg-gradient-to-r from-indigo-400 to-indigo-600"
        />
  
        <CardStatColored
          title="Leads totaux"
          :value="stats.leadsTotaux"
          :icon="SparklesIcon"
          bgClass="bg-gradient-to-r from-purple-500 to-purple-700"
        />
        <CardStatColored
          title="Commandes"
          :value="stats.commandes"
          :icon="ShoppingCartIcon"
          bgClass="bg-gradient-to-r from-pink-500 to-pink-700"
        />
        <CardStatColored
          title="Heures vendues"
          :value="stats.heuresVendues + 'h'"
          :icon="ClockIcon"
          bgClass="bg-gradient-to-r from-yellow-500 to-yellow-700"
        />
        <CardStatColored
          title="Heures CPF"
          :value="stats.heuresCpf + 'h'"
          :icon="ClockIcon"
          bgClass="bg-gradient-to-r from-orange-500 to-orange-700"
        />
  
        <CardStatColored
          title="Élèves inscrits"
          :value="stats.elevesInscrits"
          :icon="UserGroupIcon"
          bgClass="bg-gradient-to-r from-teal-500 to-teal-700"
        />
        <CardStatColored
          title="Élèves actifs"
          :value="stats.elevesActifs"
          :icon="AcademicCapIcon"
          bgClass="bg-gradient-to-r from-cyan-500 to-cyan-700"
        />
      </div>
  
      <!-- Graphiques -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-auto">



<!-- AUTRES GRAPHS -->

<div class="p-6 rounded shadow h-[360px] bg-gray-100">
  <h2 class="font-semibold mb-4 text-gray-800">Produits vendus par catégorie</h2>
  <div class="h-[280px]">
    <Pie :data="produitsParCategorie" :options="chartOptions" />
  </div>
</div>

<div class="p-6 rounded shadow h-[360px] bg-gray-100">
  <h2 class="font-semibold mb-4 text-gray-800">Élèves par zone</h2>
  <div class="h-[280px]">
    <Bar :data="elevesParZone" :options="chartOptions" />
  </div>
</div>

<div class="p-6 rounded shadow h-[360px] bg-gray-100">
  <h2 class="font-semibold mb-4 text-gray-800">Revenu mensuel 2025</h2>
  <div class="h-[280px]">
    <Bar :data="revenuMensuel" :options="chartOptions" />
  </div>
</div>

<div class="p-6 rounded shadow h-[360px] bg-gray-100">
  <h2 class="font-semibold mb-4 text-gray-800">Heures vendues par mois</h2>
  <div class="h-[280px]">
    <Line :data="hoursPerMonth" :options="chartOptions" />
  </div>
</div>

<div class="p-6 rounded shadow h-[360px] bg-gray-100">
  <h2 class="font-semibold mb-4 text-gray-800">Élèves par tranche d'âge</h2>
  <div class="h-[280px]">
    <Pie :data="elevesParTrancheAge" :options="chartOptions" />
  </div>
</div>

<div class="p-6 rounded shadow h-[360px] bg-gray-100">
  <h2 class="font-semibold mb-4 text-gray-800">Élèves par sexe</h2>
  <div class="h-[280px]">
    <Pie :data="elevesParSexe" :options="chartOptions" />
  </div>
</div>


<!-- Graph Produits vendus -->
<div class="p-6 relative overflow-y-auto max-h-[80vh] bg-gray-100 col-span-1 md:col-span-2 xl:col-span-2" :style="{ minHeight: '400px' }">

<h2 class="font-semibold mb-4 text-gray-800">Produits vendus</h2>

<div class="flex flex-wrap justify-between items-center gap-4 mb-4">

  <!-- Filtre par Mois -->
  <div class="flex flex-col">
    <label class="text-xs text-gray-500 mb-1">Filtrer par mois</label>
    <Listbox2
      v-model="selectedMois"
      :items="statsParMois.map(item => ({
        id: item.mois,
        name: moisLabels[item.mois] || `Mois ${item.mois}`,
      }))"
      :show-search="false"
      :keys="['name', 'id']"
      input-class="!rounded-md bg-white shadow-sm border !h-9 w-[180px]"
      placeholder="Tous les mois"
      clear
    />
  </div>
  <!-- Voir Détails -->
  <a
    href="#"
    @click.prevent="openModal"
    class="text-blue-500 underline text-sm mt-5"
  >
    Voir détails
  </a>

</div>



<div :style="{ height: productsCount * 50 + 'px' }" class="relative">
  <Bar ref="chartRef" :data="filteredStatsGraph" :options="chartOptions1" />

  <div v-if="bestSellerPosition"
       :style="{ top: bestSellerPosition.top + 'px', left: bestSellerPosition.left + 'px' }"
       class="absolute px-2 py-1 rounded bg-green-500 text-white font-bold animate-pulse text-xs">
    Meilleur Vendu
  </div>

</div>

</div>



<div class="p-6 rounded shadow h-[360px] bg-gray-100">
  <h2 class="font-semibold mb-4 text-gray-800">Élèves par boîte</h2>
  <div class="h-[280px]">
    <Pie :data="elevesParBoite" :options="chartOptions" />
  </div>
</div>
</div>



    </div>
    <Modal
    :show="showModal"
    max-width="xl"
    title="Détails produits vendus"
    @close="closeModal"
  >
    <ProductTable
    :produits="statsParMois.flatMap(item => item.produits)"
      @close="closeModal"
    />
  </Modal>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { Pie, Bar, Line } from 'vue-chartjs'
  import { CardStatColored } from '@common/components'
  import {  IndexTable, Badge,Paginate  } from '@shared/components';
  import ChartDataLabels from 'chartjs-plugin-datalabels'
  import {  Modal } from '@shared/components';
  import { ProductTable } from '@admin/components';

  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
  } from 'chart.js'
  import {
    CurrencyEuroIcon,
    SparklesIcon,
    ShoppingCartIcon,
    ClockIcon,
    UserGroupIcon,
    AcademicCapIcon,
  } from '@heroicons/vue/24/solid'
  import { usePage } from '@inertiajs/vue3'
import { Listbox2 } from '@shared/components';

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
  )


const { props } = usePage()
const stats = props.stats

const showModal = ref(false)

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}
const moisLabels = [
  '', // index 0 vide car mois commence à 1
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
]

const bestSellers = props.bestSellers

const produitsParCategorie = {
  labels: Object.keys(props.produitsParCategorie),
  datasets: [
    {
      label: 'Produits vendus',
      data: Object.values(props.produitsParCategorie),
      backgroundColor: [
        '#3b82f6', // 🔵 Boite Manuelle
        '#10b981', // 🟢 Boite Automatique
        '#facc15', // 🟡 CPF Manuelle
        '#ef4444', // 🔴 CPF Automatique
      ],
    },
  ],
}

  
 const elevesParZone = {
    labels: Object.keys(props.elevesParZone),
    datasets: [
      {
        label: "Nombre d'élèves par zone",
        data: Object.values(props.elevesParZone),
        backgroundColor: '#6366f1',
      },
    ],
  }
  
const labelsMois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.']
 const revenuMensuelData = computed(() =>
  labelsMois.map((_, index) => props.revenuMensuel?.[index + 1] || 0)
)

const heuresMensuellesData = computed(() =>
  labelsMois.map((_, index) => props.heuresMensuelles?.[index + 1] || 0)
)
const revenuMensuel = {
  labels: labelsMois,
  datasets: [
    {
      label: 'Revenu (€)',
      data: revenuMensuelData.value,
      backgroundColor: '#0ea5e9',
    },
  ],
}

const hoursPerMonth = {
  labels: labelsMois,
  datasets: [
    {
      label: 'Heures vendues',
      data: heuresMensuellesData.value,
      borderColor: '#22c55e',
      backgroundColor: 'rgba(34,197,94,0.2)',
      tension: 0.4,
      fill: true,
    },
  ],
}
 
 const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#555' },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#333' },
      },
      x: {
        ticks: { color: '#333' },
      },
    },
  }

const elevesParTrancheAge = {
  labels: Object.keys(props.elevesParTrancheAge),
  datasets: [
    {
      label: "Élèves par tranche d'âge",
      data: Object.values(props.elevesParTrancheAge),
      backgroundColor: ['#3b82f6', '#10b981', '#facc15', '#f97316'],
    },
  ],
}

const elevesParSexe = {
  labels: Object.keys(props.elevesParSexe),
  datasets: [
    {
      label: 'Élèves par sexe',
      data: Object.values(props.elevesParSexe),
      backgroundColor: ['#ec4899', '#3b82f6', '#e5e7eb'], // rose, bleu, gris clair
    },
  ],
}


const elevesParBoite = {
  labels: Object.keys(props.elevesParBoite),
  datasets: [
    {
      label: "Type de boite",
      data: Object.values(props.elevesParBoite),
      backgroundColor: ['#0ea5e9', '#16a34a'],
    },
  ],
}

const statsParMois = Object.values(props.graphProduitsParMois)
console.log("statsParMois ",statsParMois)
const selectedMois = ref(statsParMois[0]?.mois || 1)
const productsCount = computed(() => {
  const moisData = statsParMois.find(item => item.mois === selectedMois.value)
  return moisData ? moisData.produits.length : 0
})
const colors = [
  '#3b82f6', '#10b981', '#f97316', '#eab308', '#9333ea',
  '#14b8a6', '#ef4444', '#6366f1', '#8b5cf6', '#22c55e'
]

const filteredStatsGraph = computed(() => {
  const moisData = statsParMois.find(item => item.mois === selectedMois.value)

  if (!moisData) return { labels: [], datasets: [] }

  return {
    labels: moisData.produits.map(p => p.is_best_seller ? `${p.name} ⭐` : p.name),
    datasets: [{
      label: 'Produits vendus',
      data: moisData.produits.map(p => p.quantite),
      backgroundColor: moisData.produits.map((p, index) =>
        p.is_best_seller ? '#eab308' : colors[index % colors.length]
      ),
      borderWidth: moisData.produits.map(p => p.is_best_seller ? 3 : 1),
      borderColor: moisData.produits.map(p => p.is_best_seller ? '#facc15' : '#fff'),
    }]
  }
})

const bestSellerPlugin = {
  id: 'bestSellerPlugin',
  afterDatasetsDraw(chart) {
    const moisData = statsParMois.find(item => item.mois === selectedMois.value)
    if (!moisData) return

    const ctx = chart.ctx;
    const dataset = chart.data.datasets[0];
    const meta = chart.getDatasetMeta(0);

    moisData.produits.forEach((produit, index) => {
      if (produit.is_best_seller) {
        const bar = meta.data[index];
        ctx.save();
        ctx.fillStyle = '#eab308';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = 0.7 + 0.3 * Math.sin(Date.now() / 200); // blink
        ctx.fillText('Meilleur Vendu', bar.x + bar.width / 2, bar.y);
        ctx.restore();
      }
    })
  }
}
const chartOptions1 = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y',
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (context) => {
          const produit = statsParMois.find(item => item.mois === selectedMois.value)
            ?.produits[context.dataIndex];
          return produit?.is_best_seller
            ? `⭐ ${produit.name} (Meilleur vendu) : ${produit.quantite}`
            : `${produit.name} : ${produit.quantite}`
        }
      }
    }
  },
  scales: {
    x: { beginAtZero: true },
    y: { ticks: { autoSkip: false, maxRotation: 0, minRotation: 0 } }
  },
  animation: {
    duration: 1000,
    easing: 'easeInOutBounce'
  },
  plugins: [bestSellerPlugin]
}

  </script>
  
  <style scoped>
.blink-text {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1 }
  50% { opacity: 0.4 }
}
  h2 {
    font-size: 1rem;
    color: #111827;
  }
  </style>
  