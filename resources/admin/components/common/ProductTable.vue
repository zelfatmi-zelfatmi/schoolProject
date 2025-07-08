<script setup>
import { ref, computed, defineProps, watch } from 'vue'
import { Listbox2 } from '@shared/components';

const props = defineProps({
  produits: Array,
})

const filtreMois = ref(null)
const filtreOrdre = ref('quantite')

const moisLabels = [
  '',
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
]

// options pour Listbox2
const moisOptions = computed(() => {
  const moisList = [...new Set(props.produits.map(p => Number(p.mois)))].sort((a, b) => a - b)

  return [
    { id: null, name: 'Tous les mois' }, // valeur par défaut
    ...moisList.map(mois => ({
      id: mois,
      name: moisLabels[mois] ?? `Mois ${mois}`,
    })),
  ]
})

// debug : vérifie ce que tu reçois
watch(filtreMois, (val) => {
  console.log('filtreMois changé :', val)
})

// produit filtrés
const produitsFiltres = computed(() => {
  let data = props.produits || []

  // 🎯 Filtrage par mois (ton code exact)
  if (filtreMois.value !== null && filtreMois.value !== '') {
    data = data.filter(p => {
      const moisProduit = Number(p.mois)
      const moisFiltre = Number(filtreMois.value)
      return moisProduit === moisFiltre
    })
  }

  // Tri
  const ordreKey = filtreOrdre.value?.id || filtreOrdre.value // pour gérer les 2 cas : string ou objet
  console.log('→ ordreKey utilisé pour tri :', ordreKey)

  if (ordreKey) {
    data = [...data].sort((a, b) => {
      console.log(`Comparaison : ${b[ordreKey]} - ${a[ordreKey]}`)
      return b[ordreKey] - a[ordreKey]
    })
    console.log('→ Après tri', data)
  }
  return data
})


const ordreOptions = [
  { id: 'quantite', name: 'Quantité vendue' },
  { id: 'revenu', name: 'Revenu généré' },
]


const formatPrice = (price) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)

const isBestSeller = (produit) => produit?.is_best_seller === true

const totalQuantite = computed(() => {
  return produitsFiltres.value.reduce((sum, p) => sum + Number(p.quantite), 0)
})
const totalHeures = computed(() =>
  produitsFiltres.value.reduce((sum, p) => sum + Number(p.heures || 0), 0)
)

const totalRevenu = computed(() => produitsFiltres.value.reduce((sum, p) => sum + p.revenu, 0))
</script>
<template>
  <div>
    <div class="flex flex-wrap gap-6 mb-6 mt-4 ml-2 items-end justify-start border-b border-gray-200 pb-4">

<div class="flex flex-col gap-1 w-48">
  <label class="text-xs text-gray-500 font-medium ml-1">Filtrer par mois</label>
  <Listbox2
    v-model="filtreMois"
    :items="moisOptions"
    :show-search="false"
    :keys="['name', 'id']"
    input-class="!rounded-md bg-white shadow-sm border !h-9"
    placeholder="Tous les mois"
    clear
  />
</div>

<div class="flex flex-col gap-1 w-48">
  <label class="text-xs text-gray-500 font-medium ml-1">Trier par</label>
  <Listbox2
    v-model="filtreOrdre"
    :items="ordreOptions"
    :show-search="false"
    :keys="['name', 'id']"
    input-class="!rounded-md bg-white shadow-sm border !h-9"
    placeholder="Trier par"
  />
</div>

</div>


    <table class="table-auto w-full text-sm border-collapse">
      <thead class="bg-orange-100 text-blue-900 uppercase text-xs">
        <tr>
          <th class="border px-4 py-2 text-center">Mois</th>
          <th class="border px-4 py-2 text-left">Produit</th>
          <th class="border px-4 py-2 text-center">Quantité</th>
          <th class="border px-4 py-2 text-center">Heure</th>
          <th class="border px-4 py-2 text-center">Revenu (€)</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in produitsFiltres"
          :key="item.name + '-' + item.mois"
          :class="isBestSeller(item) ? 'bg-green-100 text-green-900 font-semibold' : 'hover:bg-gray-50 transition'"
        >
          <td class="border px-4 py-2 text-center">{{ moisLabels[item.mois] }}</td>
          <td class="border px-4 py-2">
            <div class="flex flex-col">
              <span>{{ item.name }}</span>
              <span
                v-if="isBestSeller(item)"
                class="text-green-800 bg-green-200 w-fit px-2 py-0.5 rounded text-xs font-bold mt-1 animate-pulse"
              >
                ⭐ Meilleur vendu
              </span>
            </div>
          </td>
          <td class="border px-4 py-2 text-center">{{ item.quantite }}</td>
          <td class="border px-4 py-2 text-center">{{ item.heures }}</td>

          <td class="border px-4 py-2 text-center">{{ formatPrice(item.revenu) }}</td>
        </tr>
      </tbody>
         <tfoot v-if="produitsFiltres.length > 0">
  <tr class="bg-yellow-50 border-t border-yellow-200 text-sm font-semibold text-gray-700">
    <td colspan="2" class="border px-4 py-3 text-right">Totaux :</td>

    <td class="border px-4 py-3 text-center text-green-700">
      {{ totalQuantite }} <span class="text-xs text-green-700">unités</span>
    </td>

    <td class="border px-4 py-3 text-center text-green-700">
      {{ totalHeures }} <span class="text-xs  text-green-700">heures</span>
    </td>

    <td class="border px-4 py-3 text-center text-green-700">
      {{ formatPrice(totalRevenu) }}
    </td>
  </tr>
        </tfoot>

    </table>

    <div v-if="produitsFiltres.length === 0" class="text-center text-gray-400 py-8">
      Aucun produit trouvé pour ce filtre.
    </div>
  </div>
</template>
