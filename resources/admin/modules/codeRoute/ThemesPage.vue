<script setup>
import { Page, Box, Button, IndexTable, StatusBadge, Thumb,IndexFilters } from '@shared/components'
import { usePage, router } from '@inertiajs/vue3'
import { routes } from '@admin/routes';
import { ref, computed } from 'vue'
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  PowerIcon,
  PlusIcon,

} from '@heroicons/vue/20/solid'

const props = defineProps({
  themes: Object,
  filters: Object
})

// console.log("helll questions",props.themes)

const actions = [
    {
        label: 'Ajouter un thème',
        primary: true,
        icon: PlusIcon,
        href: route(routes.codeRoute.addTheme),
    },
];
const headings = [
  
  { name: 'Nom' },
  { name: 'Description' },
  { name: 'Nb Questions', className: 'text-center' },
  { name: 'Statut', className: 'text-center' },
  { name: 'Actions', className: 'text-center' },
]

// Désactivation/activation rapide (exemple simplifié)
const toggleStatus = (theme) => {
  router.put(route(routes.codeRoute.toggleTheme
  , theme.id), {
    est_active: !theme.est_active,
  }, {
    preserveScroll: true,
  })
}
const themeStatus = {
  true: { id: true, name: 'Actif', style: 'bg-green-100 text-green-800' },
  false: { id: false, name: 'Inactif', style: 'bg-red-100 text-red-800' },
}

</script>

<template>
  <Page title="Thèmes" width="lgl" :actions="actions">
    <Box sectionned>

        <IndexFilters
        :tabs="[{ name: 'Tous', id: '', key: 'status' }]"
        default-tab=""
        key-tab="status"
        :search-visible="true"
        :placeholder="'Rechercher un thème...'"
        />


      <IndexTable v-slot="{ item }" :headings="headings" :items="themes">
        <!-- Image -->
     

        <!-- Nom -->
        <td class="cell">
          <b>{{ item.nom }}</b>
        </td>

        <!-- Description -->
        <td class="cell text-gray-600 truncate max-w-xs">
          {{ item.description ?? '—' }}
        </td>

        <!-- Nombre de questions -->
        <td class="cell text-center">
          <span class="inline-block bg-orange-100 px-2 py-1 rounded-full text-sm text-orange-800 font-semibold">
            {{ item.questions_count ?? item.nombre_questions }}
          </span>
        </td>

        <!-- Statut -->
        <td class="cell text-center">
          
          <StatusBadge :id="item.est_active" :attr="themeStatus" />

        </td>

        <!-- Actions -->
        <td class="cell text-center border-l">
          <div class="flex items-center gap-2 px-2 justify-center">
            <Button
              :icon="PencilSquareIcon"
              info
              grouped
              tooltip="Modifier"
              :href="route(routes.codeRoute.editTheme, item.id)"

            />
            <Button
  :icon="PowerIcon"
  :class="item.est_active
    ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
    : 'bg-green-100 text-green-700 hover:bg-green-200'"
  grouped
  small
  @click="toggleStatus(item)"
  :tooltip="item.est_active ? 'Désactiver' : 'Activer'"

/>

<!-- 
            <Button
              :icon="TrashIcon"
              danger
              grouped
              link
              method="delete"
              tooltip="Supprimer"
            /> -->
        
          </div>
        </td>
      </IndexTable>
    </Box>
  </Page>
</template>
