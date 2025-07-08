<script setup>
import { dateFormat } from '@shared/helpers';
import { Box, Page, Table, StatusBadge, IndexFilters } from '@shared/components';
import { ChevronLeftIcon } from '@heroicons/vue/20/solid';

import { reactive } from 'vue';
import { useParams } from '@shared/hooks';

const props = defineProps({
  rdvs: {
    type: Object,
    default: () => ({}),
  },
});

console.log("hello rdv ",props.rdvs)

const params = useParams();
const state = reactive({
  tabs: [
    { id: '', name: 'Tous', key: 'status' },
    { id: 'past', name: 'Passé', key: 'status' },
    { id: 'upcoming', name: 'À venir', key: 'status' },
  ],
});

const headings = [
  { name: 'Date création', className: 'text-center px-3 font-normal py-2' },
  { name: 'Date de RDV', className: 'text-center px-3 font-normal' },
  { name: 'Heure de RDV', className: 'text-center px-3 font-normal' },
  { name: 'Point de RDV', className: 'text-center px-3 font-normal' },
  { name: 'Moniteur', className: 'text-center px-3 font-normal' },
  { name: 'Élèves', className: 'text-center px-3 font-normal' },
];


</script>

<template>
  <Page title="RDV Examens" subtitle="Liste des rendez-vous d’examen" width="xl" >
    <Box sectionned>
      <IndexFilters :options="{ showSlot: false }" key-tab="status" :tabs="state.tabs" /> 

    <Table
  v-slot="{ item }"
  :headings="headings"
  :is-loading="false"
  :items="rdvs"
  min-height="min-h-[28rem]"
>
  <!-- ✅ Date création -->
  <td class="cell text-center">
    <div class="text-sm font-semibold">{{ dateFormat(item.created_at, 'fr') }}</div>
    <div class="text-xs text-gray-500">{{ dateFormat(item.created_at, 'shortTime') }}</div>
  </td>

  <!-- ✅ Date de RDV -->
  <td class="cell text-center">
    <span class="text-sm">{{ dateFormat(item.date_rdv, 'fr') }}</span>
  </td>

  <!-- ✅ Heure de RDV -->
  <td class="cell text-center">
    {{ new Date('1970-01-01T' + item.heure_rdv).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) }}
  </td>

  <!-- ✅ Lieu -->
  <td class="cell text-center max-w-[160px] truncate">
    <span class="text-sm text-gray-700">{{ item.point_rdv }}</span>
  </td>

  <!-- ✅ Moniteur -->
  <td class="cell text-center max-w-[160px] truncate">
    <span class="text-sm font-medium text-gray-800">
      {{ item.moniteur?.user?.first_name }} {{ item.moniteur?.user?.last_name }}
    </span>
  </td>

  <!-- ✅ Élèves -->
  <td class="cell text-center">
    <div class="flex flex-wrap justify-center gap-1">
      <span
        v-for="(eleve, index) in item.eleves.slice(0, 3)"
        :key="eleve.id"
        class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium max-w-[120px] truncate"
      >
        {{ eleve.user?.first_name }} {{ eleve.user?.last_name }}
      </span>

      <Popover v-if="item.eleves.length > 3" position="top" hoverable>
        <template #default>
          <span class="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs font-medium cursor-pointer">
            +{{ item.eleves.length - 3 }} autres
          </span>
        </template>
        <template #content>
          <ul class="text-sm text-gray-700 space-y-1">
            <li
              v-for="eleve in item.eleves.slice(3)"
              :key="eleve.id"
              class="whitespace-nowrap"
            >
              {{ eleve.user?.first_name }} {{ eleve.user?.last_name }}
            </li>
          </ul>
        </template>
      </Popover>
    </div>
  </td>
</Table>

    </Box>
  </Page>
</template>

<style scoped>
:deep(.eleve-list) {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  margin: 0;
  padding: 0.25rem 0;
  list-style-type: none;
}

:deep(.eleve-list li) {
  background-color: #e0f2fe;
  color: #0369a1;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.3rem 0.75rem;
  border-radius: 9999px;
  max-width: 180px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

:deep(.eleve-list .more-eleves) {

  font-style: italic;
  font-weight: 400;
  font-size: 0.7rem;
  color: #334155;
  background: none;
  border: none;
  padding: 0;
}
</style>
