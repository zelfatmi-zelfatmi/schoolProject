<script setup>
import { TrashIcon, EyeIcon } from '@heroicons/vue/20/solid';
import { getTotalSold, totalProductsPrice } from '@admin/constants';
import { routes } from '@admin/routes';
import { useStatusSwitch } from '@shared/hooks';
import { CartStatusEnum } from '@shared/constants';
import { dateFormat, moneyFormat } from '@shared/helpers';
import { UserInfoWithCopy } from '@common/components';
import { Box, IndexFilters,Button, Thumb, StatusBadge, Page, IndexTable } from '@shared/components';
import axios from 'axios';
import moment from "moment";
import { usePage } from '@inertiajs/vue3'

import { reactive,computed } from 'vue';
var props1=defineProps({
    carts: {
        type: Object,
        default: () => ({}),
    },
    users: {
        type: Object,
        default: () => ({}),
    },
});
// ✅ Fonction pour vérifier si la date est aujourd’hui
const isToday = (date) => moment(date).isSame(moment(), 'day');

// ❌ Fonction pour vérifier si la date est passée
const isPast = (date) => moment(date).isBefore(moment(), 'day');

// 🔵 Fonction pour vérifier si la date est dans le futur
const isFuture = (date) => moment(date).isAfter(moment(), 'day');

// 📅 Fonction pour formater la date
const formatDate = (date) => moment(date).format("DD/MM/YYYY");

const { props } = usePage()
const query = computed(() => props.query || {})
const cartType = computed(() => query.value.type || 'default')
const showMoniteurCol = computed(() => cartType.value === 'moniteur')


console.log("carts is ",cartType.value)

// ✅ Définition des colonnes du tableau
const headings = [
  { name: 'Nom' },
  { name: 'Contact' },
   ...(cartType.value === 'moniteur' ? [{ name: 'Moniteur', className: 'text-center' }] : []),
  { name: 'Status', className: 'text-center' },
  { name: 'Total items', className: 'text-center' },
  { name: 'Total heures', className: 'text-center' },
  { name: 'Amount', className: 'text-center' },
  { name: 'Date de Rappel', className: 'text-center' },
  { name: 'Date' },
  { name: 'Action' },
];


// ✅ Actions disponibles sur le tableau
const bulkActions = [
    {
        label: 'Voir la commande',
        icon: EyeIcon, 
        info: true,
        isLink: true,
        onAction: (item) => route(routes.shop.cart.show, item.id),
    },
    {
        label: 'Supprimer',
        icon: TrashIcon,
        danger: true,
        confirm: { url: routes.shop.cart.delete },
    },
];

// ✅ Fonction pour mettre à jour la date de rappel
const updateReminder = (item) => {
    axios
      .put(route(routes.shop.cart.updateReminder, { cart: item.id }), {
          date_de_rappel: item.date_de_rappel
      }, {
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
      })
      .then((response) => {
        console.log('✅ Succès:', response.data);
        
        // ✅ Masquer l'édition après mise à jour
        item.isEditing = false;

        // ✅ Attendre 500ms avant de recharger pour un effet fluide
        setTimeout(() => {
            window.location.reload();
        }, 500);
        
      })
      .catch((error) => {
        console.error('❌ Erreur:', error);
      });
};



</script>

<template>
    <Page title="Panier" width="lgl">
        <Box sectionned>
            <div>
                <IndexFilters
                    :tabs="[{ name: 'Tous', id: '' ,key:'status'}, ...Object.values(CartStatusEnum)]"
                    default-tab=""
                    key-tab="status"
                />

                <IndexTable v-slot="{ item }" :headings="headings" :items="carts" >
                    <!-- ✅ Nom et Contact -->
                    <td class="cell">
                        <div class="flex gap-2 items-center">
                            <Thumb :src="item.eleve?.user?.media || item.eleve?.user?.profile_photo_url" size="xs" />
                            <b>{{ item.eleve?.user?.name }}</b>
                        </div>
                    </td>
                    <td class="cell">
                        <UserInfoWithCopy
                            class="!gap-0"
                            :email="item?.eleve?.user.email"
                            :phone="item?.eleve?.user.telephone"
                        />
                    </td>
                    <td  v-if="showMoniteurCol" class="cell" >{{ item.moniteur?.name }}</td>

                    <!-- ✅ Statut -->
                    <td class="cell">
                        <b class="flex-center">
                            <StatusBadge :id="item.status" :attr="CartStatusEnum">
                                {{ useStatusSwitch(CartStatusEnum, item.status) }}
                            </StatusBadge>
                        </b>
                    </td>

                    <!-- ✅ Total Items -->
                    <td class="cell">
                        <b class="flex-center">
                            <span class="flex-center w-8 h-8 bg-orange-200 rounded-full">
                                {{ item.cart_items?.length }}
                            </span>
                        </b>
                    </td>

                    <!-- ✅ Total Heures et Montant -->
                    <td class="cell text-center">{{ getTotalSold(item.cart_items) }} h</td>
                    <td class="cell text-center">{{ moneyFormat(totalProductsPrice(item.cart_items)) }}</td>

                    <!-- ✅ Date de Rappel (édition et coloration dynamique) -->
                    <td 
    class="cell text-center px-4 py-1 rounded cursor-pointer"
    :class="!item.isEditing ? {
        'bg-green-500 text-white font-bold animate-pulse': isToday(item.date_de_rappel),
        'bg-red-500 text-white font-bold': isPast(item.date_de_rappel),
        'bg-gray-500 text-white font-bold': isFuture(item.date_de_rappel),
    } : 'bg-white'"
>
    <template v-if="!item.isEditing">
        <span @click="item.isEditing = true">
            {{ item.date_de_rappel ? formatDate(item.date_de_rappel) : '➕ Ajouter' }}
        </span>
    </template>
    <template v-else>
        <form @submit.prevent="updateReminder(item)" class="inline-flex items-center space-x-2">
            <input
                type="date"
                v-model="item.date_de_rappel"
                class="border px-2 py-1 rounded"
            />
            <button type="submit" class="text-blue-600">✔</button>
            <button type="button" class="text-gray-500" @click="item.isEditing = false">❌</button>
        </form>
    </template>
</td>





                    <!-- ✅ Date de Création -->
                    <td class="cell capitalize">
                        {{ dateFormat(item.created_at, 'fr') }}
                        {{ dateFormat(item.created_at, 'shortTime') }}
                    </td>
                    <td class="sticky right-0 bg-white w-10 mx-auto border-l">
                        <div v-if="!item.isEditing" class="flex items-center gap-2 px-2 justify-center">
                                            <Button
                                :href="route(routes.shop.cart.show, item.id)"
                                :icon="EyeIcon"
                                success
                                link
                                title="Voir le panier"
                            />
                            <Button
                                :href="route(routes.shop.cart.delete, item.id)"
                                :icon="TrashIcon"
                                danger
                                link
                                title="Supprimer le panier"
                            />

    </div>
    </td>
                </IndexTable>
            </div>
        </Box>
    </Page>
</template>
