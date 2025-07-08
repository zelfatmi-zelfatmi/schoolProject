<script setup>
import { IndexTable, Page } from '@shared/components';
import { CheckBadgeIcon, PencilSquareIcon, PlusIcon, WifiIcon } from '@heroicons/vue/20/solid';

import { dateFormat } from '@shared/helpers/index.js';
import { ActionsList, Box, ConfirmationModal, IndexFilters, Table } from '@shared/components/index.js';
import { routes } from '@admin/routes';
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';
import { useParams, useStatusSwitch } from '@shared/hooks/index';
import { UserStatusEnum } from '@shared/constants/index.js';
import { ArchiveBoxIcon, ArrowUpOnSquareIcon } from '@heroicons/vue/24/solid/index.js';
import StatusBadge from '@shared/components/common/StatusBadge.vue';
import { ItemAvatar } from '@common/components';
import { STATUS_INACTIVE } from '@common/constants';

const params = useParams();
defineProps({
    users: {
        type: Object,
        default: () => ({}),
    },
});
const confirmation = ref(null);
const deleting = ref(false);
const isRestore = ref(false);
const isInscriptionTab = ref(params.status === '3');
const tabs = [
    { name: 'Actif', id: '1' ,key:'status'},
    { name: 'Archivée', id: '2' ,key:'status'},
    { name: 'Inscription moniteur', id: '3',key:'status' },
    { name: 'Tout', id: 'all' },
];
const actions = [
    {
        label: 'Nouveau Moniteur',
        primary: true,
        icon: PlusIcon,
        href: route(routes.users.moniteur.create),
    },
];

const handleConfirmation = (moniteur, restore = false) => {
    isRestore.value = restore;
    confirmation.value = moniteur;
};

const handleConfirmedDelete = async () => {
    deleting.value = true;
    let SelectedStatus = UserStatusEnum.INACTIVE.id;

    if (isRestore.value === true) {
        SelectedStatus = UserStatusEnum.ACTIVE.id;
    }
    await axios
        .put(route(routes.api.user.archive, confirmation.value?.id), {
            status: SelectedStatus,
        })
        .then(() => {
            confirmation.value = null;
            router.visit(route(routes.users.moniteur.list, { status: 1 }), {
                method: 'get',
            });
        })
        .finally(() => {
            deleting.value = false;
        });
};
const getContent = () => {
    switch (confirmation.value?.status) {
        case UserStatusEnum.ACTIVE.id:
            return {
                // btn: item.name,
                content: 'Archiver',
                icon: ArchiveBoxIcon,
                attrs: 'danger',
            };
        case UserStatusEnum.INACTIVE.id:
            return {
                // btn: item.name,
                content: 'Restore',
                icon: ArrowUpOnSquareIcon,
                attrs: 'info',
            };
        case UserStatusEnum.INPROGRESS.id:
            return {
                // btn: item.name,
                content: isRestore.value ? 'Activer' : 'Archiver',
                icon: isRestore.value ? CheckBadgeIcon : ArchiveBoxIcon,
                attrs: isRestore.value ? 'success' : 'yellow',
            };
        default:
            return {};
    }
};
const getActions = (item) => {
    const actArray = [];
    switch (item.status) {
        case UserStatusEnum.ACTIVE.id:
            actArray.push(
                {
                    title: 'Modifier',
                    icon: PencilSquareIcon,
                    class: !item.id ? 'hidden' : '',
                    href: route(routes.users.moniteur.edit, item.moniteur.id || '-'),
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
                {
                    title: 'Archive',
                    icon: ArchiveBoxIcon,
                    danger: true,
                    link: true,
                    onClick: () => handleConfirmation(item),
                }
            );
            break;
        case UserStatusEnum.INACTIVE.id:
            actArray.push({
                title: 'restore',
                icon: ArrowUpOnSquareIcon,
                danger: true,
                link: true,
                onClick: () => handleConfirmation(item, true),
            });
            break;
        case UserStatusEnum.INPROGRESS.id:
            actArray.push(
                {
                    title: 'Activer',
                    icon: ArrowUpOnSquareIcon,
                    success: true,
                    link: true,
                    onClick: () => handleConfirmation(item, true),
                },
                {
                    divider: true,
                },
                {
                    title: 'Archive',
                    icon: ArchiveBoxIcon,
                    danger: true,
                    link: true,
                    onClick: () => handleConfirmation(item),
                }
            );
            break;

        default:
            break;
    }
    return actArray;
};
const breadcumb = [{ name: 'Utilisateurs' }, { name: 'Moniteurs' }];
</script>

<template>
    <Page :actions="actions" :breadcumb="breadcumb" title="Moniteurs" width="xl">
        <Box sectionned>
            <div>
                <IndexFilters
                    :options="{ showSlot: false }"
                    :tabs="tabs"
                    :default-tab="tabs[0]?.id"
                    key-tab="status"
                    @change="isInscriptionTab = $event.status === '3'"
                />
                <IndexTable
                    v-slot="{ item }"
                    :headings="[
                        { name: 'Moniteur' },
                        { name: 'Status', className: 'text-center' },
                        { name: 'Ville', className: 'text-center' },
                        { name: 'Code postal', className: 'text-center' },
                        isInscriptionTab
                            ? { name: 'Zone conduite souhaitée' }
                            : { name: 'Experience', className: 'text-center' },
                        { name: 'Date Inscription', className: 'text-center' },
                        { name: 'Action', className: 'text-center pr-4 sticky right-0 bg-slate-100' },
                    ]"
                    :items="users"
                >
                    <td class="cell">
                        <ItemAvatar
                            :title="item.name"
                            :content="item?.email"
                            :phone="item?.telephone"
                            :src="item.media || item.profile_photo_url"
                            :href="
                                item.status !== STATUS_INACTIVE
                                    ? route(routes.users.moniteur.edit, item.moniteur.id)
                                    : ''
                            "
                        />
                    </td>
                    <td class="cell text-center">
                        <StatusBadge
                            :id="item.status"
                            :attr="UserStatusEnum"
                            :name="useStatusSwitch(UserStatusEnum, item.status)"
                        />
                    </td>
                    <td class="cell text-center">
                        {{ item.ville ?? '-' }}
                    </td>
                    <td class="cell text-center">
                        {{ item.postal ?? '-' }}
                    </td>
                    <td v-if="isInscriptionTab" class="cell">
                        {{ item.moniteur.details.zone_souhaitee ?? '-' }}
                    </td>
                    <td v-else class="cell text-center">
                        <b class="flex-center">
                            <span class="flex-center w-8 h-8 bg-orange-200 rounded-full">
                                {{ item.moniteur.details.experience }}
                            </span>
                        </b>
                    </td>

                    <td class="cell capitalize">
                        <b class="font-normal text-center flex flex-col py-1">
                            <span>
                                {{ dateFormat(item.created_at, 'fr') }}
                            </span>
                            <span class="font-semibold">
                                {{ dateFormat(item.created_at, 'shortTime') }}
                            </span>
                        </b>
                    </td>
                    <td class="sticky right-0 bg-white w-10 mx-auto">
                        <div class="flex justify-center items-center gap-2 border-l h-full">
                            <ActionsList :actions="getActions(item)"> </ActionsList>
                        </div>
                    </td>
                </IndexTable>
            </div>
        </Box>
        <ConfirmationModal
            :loading="deleting"
            :show="!!confirmation"
            confirm-text="Oui, Confirmer"
            :button-attrs="getContent().attrs"
            :icon="getContent().icon"
            @close="confirmation = null"
            @confirm="handleConfirmedDelete"
        >
            Etes-vous sûr que vous voulez
            {{ getContent().content }} le moniteur
            <b class="text-red-500">{{ confirmation?.title }}</b>
            ?
        </ConfirmationModal>
    </Page>
</template>
