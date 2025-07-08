<script setup>
import { ref } from 'vue';
import { routes } from '@admin/routes';
import { router } from '@inertiajs/vue3';
import { useStatusSwitch } from '@shared/hooks';
import { dateFormat } from '@shared/helpers';
import { EleveBoiteEnum, EleveCpfEnum, UserStatusEnum } from '@shared/constants';
import { AddToPanelModal, InscriptionTooltip } from './partials';
import { useParams } from '@shared/hooks/index.js';

import {
    ArchiveBoxIcon,
    ArrowUpOnSquareIcon,
    ClockIcon,
    IdentificationIcon,
    PlusIcon,
    ShoppingCartIcon,
    WifiIcon,
} from '@heroicons/vue/20/solid';
import { ActionsList, Box, ConfirmationModal, IndexFilters, Page, StatusBadge, Table } from '@shared/components';
import { ItemAvatar } from '@common/components';

var props=defineProps({
    users: {
        type: Object,
        default: () => ({}),
    },
});
const params = useParams();

const confirmation = ref(null);
const panelActive = ref(null);
const deleting = ref(false);
const isRestore = ref(false);
const actions = [
    {
        label: 'Nouveau Eleve',
        primary: true,
        icon: PlusIcon,
        href: route(routes.users.eleve.create),
    },
];

const headings = [
    { name: 'Eleve' },
    { name: "Date d'inscription", className: 'text-center' },
    { name: 'Boite', className: 'text-center' },
    { name: 'Cpf', className: 'text-center' },
    { name: 'Progression', className: 'text-center' },
    { name: 'Au Panier', className: 'text-center' },
    { name: 'Action', className: 'text-center pr-4 sticky right-0 bg-slate-100' },
];
const handleConfirmation = (eleve, restore = null) => {
    restore === true ? (isRestore.value = true) : (isRestore.value = false);
    confirmation.value = eleve;
};

const handleActivePanel = (eleve) => {
    panelActive.value = eleve;
};
const handleConfirmedDelete = () => {
    deleting.value = true;
    let SelectedStatus = UserStatusEnum.INACTIVE.id;

    if (isRestore.value === true) {
        SelectedStatus = UserStatusEnum.ACTIVE.id;
    }
    axios
        .put(route(routes.api.user.archive, confirmation.value?.id), {
            status: SelectedStatus,
        })
        .then(() => {
            confirmation.value = null;
            router.visit(route(routes.users.eleve.list, { status: UserStatusEnum.ACTIVE.id }), {
                method: 'get',
            });
        })
        .finally(() => {
            deleting.value = false;
        });
};
const breadcumb = [{ name: 'Utilisateurs' }, { name: 'Eleves' }];
const tabs=[
                        { name: 'Actif', id: '1' ,key:'status'},
                        { name: 'Archivée', id: '2',key:'status'},
                        { name: 'Inscription', id: 'true', key: 'new' },
                        { name: 'Tous', id: '3',key:'status' },
                    ]
const activeTabKey = ref(
    tabs.find((tab) => params[tab.key] === tab.id) ? tabs.find((tab) => params[tab.key] === tab.id).key : 'status'
);

const activeTabId = ref(
    tabs.find((tab) => params[tab.key] === tab.id) ? tabs.find((tab) => params[tab.key] === tab.id).id : '1'
);
</script>

<template>
    <Page :actions="actions" :breadcumb="breadcumb" title="Eleves" width="lg">
        <Box sectionned>
            <div>
                <IndexFilters
                    :options="{ showSlot: false }"
                    :tabs="tabs"
                    :default-tab="activeTabId"
                    :key-tab="activeTabKey"
                    />
                <Table
                    v-slot="{ item }"
                    :headings="headings"
                    :is-loading="false"
                    :items="users"
                    min-height="min-h-[24rem]"
                >
                    <td class="cell">
                        <ItemAvatar
                            :content="item?.email"
                            :phone="item?.telephone"
                            :title="item.name"
                            :src="item.media || item.profile_photo_url"
                            :href="
                                item.status == UserStatusEnum.INACTIVE.id
                                    ? ''
                                    : route(routes.users.eleve.general, item.eleve.id)
                            "
                        />
                    </td>
                    <td class="cell text-center">
                        <InscriptionTooltip
                            :inscription-date="dateFormat(item.created_at, 'fulltime')"
                            :last-hour-date="dateFormat(item.created_at, 'fulltime')"
                        >
                            <ClockIcon class="w-5 text-gray-700" />
                        </InscriptionTooltip>
                    </td>
                    <td class="cell text-center px-6">
                        <StatusBadge
                            :id="item?.eleve?.boite_type"
                            :attr="EleveBoiteEnum"
                            :name="useStatusSwitch(EleveBoiteEnum, item?.eleve?.boite_type)"
                        >
                            {{ useStatusSwitch(EleveBoiteEnum, item?.eleve?.boite_type) }}
                        </StatusBadge>
                    </td>
                    <td class="cell text-center px-6">
                        <StatusBadge
                            :id="item?.eleve?.is_cpf"
                            :attr="EleveCpfEnum"
                            :name="useStatusSwitch(EleveCpfEnum, item?.eleve?.is_cpf)"
                        >
                            {{ useStatusSwitch(EleveCpfEnum, item?.eleve?.is_cpf) }}
                        </StatusBadge>
                    </td>
                    <td class="cell text-center">
  <div v-if="item.eleve?.latest_estimation?.valeur">
    <div class="text-xs font-semibold">
      {{ Math.round(item.eleve.realise_hour || 0) }}h /
      {{ Math.round(item.eleve.latest_estimation.valeur) }}h
      ({{ ((item.eleve.realise_hour || 0) / item.eleve.latest_estimation.valeur * 100).toFixed(0) }}%)
    </div>

    <div class="h-2 mt-1 bg-gray-200 rounded overflow-hidden">
      <div
        class="h-full transition-all duration-300"
        :class="[
          (item.eleve.realise_hour / item.eleve.latest_estimation.valeur) < 0.5
            ? 'bg-red-400'
            : (item.eleve.realise_hour / item.eleve.latest_estimation.valeur) < 0.75
            ? 'bg-yellow-400'
            : 'bg-green-500'
        ]"
        :style="{
          width:
            ((item.eleve.realise_hour || 0) / item.eleve.latest_estimation.valeur * 100).toFixed(0) + '%'
        }"
      ></div>
    </div>
  </div>
  <div v-else class="text-gray-400 text-sm">—</div>
                     </td>


                    <td class="cell">
                        <b class="flex-center">
                            <ShoppingCartIcon
                                class="w-5 cursor-pointer hover:text-primary text-gray-700"
                                @click="handleActivePanel(item)"
                            />
                        </b>
                    </td>
                    <td class="sticky right-0 bg-white w-10 mx-auto">
                        <div class="flex justify-center items-center gap-2 border-l h-full">
                            <ActionsList
                                :actions="[
                                    {
                                        title: 'Fich perso',
                                        icon: IdentificationIcon,
                                        class: !item.id ? 'hidden' : '',
                                        href: route(routes.users.eleve.general, item.eleve.id),
                                    },
                                    {
                                        title: 'Connecter',
                                        icon: WifiIcon,
                                        class: !item.id ? 'hidden' : '',
                                        self: true,
                                        href: route(routes.impersonate.start, item.id || '-'),
                                    },
                                    {
                                        divider: true,
                                    },
                                    item.status == UserStatusEnum.ACTIVE.id
                                        ? {
                                              title: 'Archive',
                                              icon: ArchiveBoxIcon,
                                              danger: true,
                                              link: true,
                                              onClick: () => handleConfirmation(item),
                                          }
                                        : {
                                              title: 'restore',
                                              icon: ArrowUpOnSquareIcon,
                                              danger: true,
                                              link: true,
                                              onClick: () => handleConfirmation(item, true),
                                          },
                                ]"
                            />
                        </div>
                    </td>
                </Table>
            </div>
        </Box>
        <ConfirmationModal
            :loading="deleting"
            :is-restore="isRestore"
            :show="!!confirmation"
            @close="confirmation = null"
            @confirm="handleConfirmedDelete"
        >
            Etes-vous sûr que vous voulez {{ isRestore ? 'restore' : 'archive' }} l'eleve
            <b class="text-red-500">{{ confirmation?.title }}</b>
            ?
        </ConfirmationModal>

        <AddToPanelModal :eleve="panelActive" :show="!!panelActive" @close="panelActive = null" />
    </Page>
</template>
