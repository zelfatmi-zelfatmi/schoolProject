<script setup>
import { Page, Box, Button, IndexTable, StatusBadge, IndexFilters } from '@shared/components';
import { router } from '@inertiajs/vue3';
import { routes } from '@admin/routes';
import { PencilSquareIcon, PowerIcon, PlusIcon } from '@heroicons/vue/20/solid';

const props = defineProps({
  questions: Object,
  filters: Object,
});
// console.log("helll questions",props.questions)

const actions = [
  {
    label: 'Ajouter une question',
    primary: true,
    icon: PlusIcon,
     href: route(routes.codeRoute.addQuestion),
  },
];

const headings = [
  { name: 'Thème' },
  { name: 'Question' },
  { name: 'Nb Réponses', className: 'text-center' },
  { name: 'Statut', className: 'text-center' },
  { name: 'Actions', className: 'text-center' },
];

const questionStatus = {
  true: { id: true, name: 'Actif', style: 'bg-green-100 text-green-800' },
  false: { id: false, name: 'Inactif', style: 'bg-red-100 text-red-800' },
};

const toggleStatus = (question) => {
  router.put(route(routes.codeRoute.toggleQuestion, question.id), {
    est_active: !question.est_active,
  }, {
    preserveScroll: true,
  });
};
</script>

<template>
  <Page title="Questions" width="lgl" :actions="actions">
    <Box sectionned>
      <IndexFilters
        :tabs="[{ name: 'Toutes', id: '', key: 'status' }]"
        default-tab=""
        key-tab="status"
        :search-visible="true"
        placeholder="Rechercher une question..."
      />

      <IndexTable v-slot="{ item }" :headings="headings" :items="questions">
        <!-- Thème -->
        <td class="cell">
          {{ item.theme?.nom ?? '—' }}
        </td>

        <!-- Texte de la question -->
        <td class="cell text-gray-700">
          {{ item.description }}
        </td>

        <!-- Nb réponses -->
        <td class="cell text-center">
          <span class="inline-block bg-orange-100 px-2 py-1 rounded-full text-sm text-orange-800 font-semibold">
            {{ item.total_reponses ?? '—' }}
          </span>
        </td>

        <!-- Statut -->
        <td class="cell text-center">
          <StatusBadge :id="item.est_active" :attr="questionStatus" />
        </td>

        <!-- Actions -->
        <td class="cell text-center border-l">
          <div class="flex items-center gap-2 justify-center">
            <Button
              :icon="PencilSquareIcon"
              info
              grouped
              tooltip="Modifier"
              :href="route(routes.codeRoute.editQuestion, item.id)"

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
          </div>
        </td>
      </IndexTable>
    </Box>
  </Page>
</template>
