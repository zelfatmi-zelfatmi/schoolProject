<script setup>
import { Box, IndexTable, Page, Popover, WapperMenu } from '@shared/components';
import {
    ProfileSection,
    CommentsSection,
    AvailableDrivingCalendarSection,
    SecretaryCalendarSection,
    InfosSection,
    GeneralTabs,
} from './partials';
import { breadcumb, navigationButtons, pagesBadges, pagesNavigation } from './fishPerso';
import { ref } from 'vue';
import { useParams, useQuery } from '@shared/hooks';
import { routes } from '@admin/routes';
import { ItemAvatar } from '@common/components';
import { dateFormat, getMediaUrl } from '@shared/helpers';

const headings = [
    { name: 'Heures', className: '' },
    { name: 'Date', className: '' },
    { name: 'Moniteur', className: '' },
    { name: 'Produit', className: '' },
    { name: 'Commentaire', className: '' },
];
const headings_estimation = [
  { name: 'Estimation', className: '' },
  { name: 'Moniteur', className: '' },
  { name: 'Élève informé', className: '' },
  { name: "Date d'estimation", className: '' },
];


const props = defineProps({
  user: {
    type: Object,
    default: () => ({}),
  },
  estimations: {
    type: Object,
    default: () => ({}),
  },
  solde: Object,

  // ✅ Ajout de realiseHour
  realiseHour: {
    type: [Number, String],
    default: 0,
  },
});
if (props.user?.eleve) {
  props.user.eleve.realise_hour = props.realiseHour;
}



// console.log("estimations is ",props.estimations);
const params = useParams();
const activeTab = ref(params.tab || navigationButtons[0].id);
const resumeHours = useQuery(
    {
        url: route(routes.api.resumeHours.index, props.user.eleve.id),
        transformable: true,
    },
    true
);
console.log("user fiche perso",props.user.eleve.realise_hour); // doit afficher un nombre comme 5.5
</script>
<template>
    <Page :breadcumb="[...breadcumb, { name: 'Géneral' }]" :title="user?.name" width="2xl" :badges="pagesBadges(user)">
        <WapperMenu :nav-items="pagesNavigation(user.eleve.id)" :active="activeTab">
            <Box sectionned padding class="!p-0">
                <ProfileSection :user="user" />
                <GeneralTabs :active-tab="activeTab" @change="activeTab = $event" />

                <transition
                    enter-from-class="translate-y-[20%] opacity-0"
                    leave-to-class="translate-y-[20%] opacity-0"
                    enter-active-class="transition duration-500"
                    leave-active-class="transition duration-100"
                >
                    <InfosSection v-if="activeTab === navigationButtons[0].id" :user="user" :solde="solde" />
                    <AvailableDrivingCalendarSection v-else-if="activeTab === navigationButtons[1].id" :user="user" />
                    <SecretaryCalendarSection v-else-if="activeTab === navigationButtons[2].id" :user="user" />
                    <CommentsSection v-else-if="activeTab === navigationButtons[3].id" :eleve="user?.eleve" />
                </transition>
            </Box>
            <Box sectionned class="border-t w-full mt-3">
                <h4 class="text-lg font-bold p-3">Estimations</h4>
                <IndexTable v-slot="{ item }" :items="estimations" :headings="headings_estimation" class="w-full text-sm">
  
  <!-- Estimation -->
  <td class="cell font-semibold text-gray-800">
    {{ item.valeur }} H
  </td>

  <!-- Moniteur -->
  <td class="cell">
    <span class="text-gray-700 capitalize">
      {{ item.moniteur?.user?.name || '-' }}
    </span>
  </td>

  <!-- Validation Élève -->
  <td class="cell">
    <span
      :class="[
        'inline-block px-2 py-0.5 rounded-full text-xs font-medium',
        item.is_validated ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      ]"
    >
      {{ item.is_validated ? 'Oui' : 'Non' }}
    </span>
  </td>

  <!-- Date de Validation -->
  <td class="cell text-gray-600">
    {{ dateFormat(item.created_at, 'letter') }}
  </td>

</IndexTable>

            </Box>
            <Box sectionned class="border-t w-full mt-3">
                <h4 class="text-lg font-bold p-3">Historique des heures</h4>
                <IndexTable v-slot="{ item }" :items="resumeHours" :headings="headings" is-api class="w-full text-sm">
                    <td class="cell">
                        <span class="block">{{ item.start_at }}</span>
                        <span class="">{{ item.end_at }}</span>
                    </td>
                    <td class="cell">
                        {{ dateFormat(item.date, 'letter') }}
                    </td>
                    <td class="cell">
                        <ItemAvatar
                            :src="getMediaUrl(item.moniteur?.user || {})"
                            size="w-8 h-8"
                            :title="item.moniteur?.user?.name"
                            :phone="item.moniteur?.user?.telephone"
                        />
                    </td>
                    <td class="cell">
                        {{ item.session?.product?.name }}
                    </td>
                    <td class="cell max-w-lg w-full whitespace-normal">
                        <Popover>
                            <p class="max-w-md line-clamp-2">
                                {{ item.review_moniteur?.comment }}
                            </p>
                            <template #content>
                                <p class="max-w-md">{{ item.review_moniteur?.comment }}</p>
                            </template>
                        </Popover>
                    </td>
                </IndexTable>
            </Box>
        </WapperMenu>
    </Page>
</template>
