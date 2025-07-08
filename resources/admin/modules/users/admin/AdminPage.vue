<script setup>
import { ref } from 'vue';
import { PencilSquareIcon, PlusIcon } from '@heroicons/vue/20/solid';
import { dateFormat } from '@shared/helpers';
import { ActionsList, Box, ConfirmationModal, IndexFilters, Page, Table, StatusBadge } from '@shared/components';
import { routes } from '@admin/routes';
import { router } from '@inertiajs/vue3';
import { useStatusSwitch } from '@shared/hooks';
import { UserStatusEnum } from '@shared/constants';
import { ArchiveBoxIcon, ArrowUpOnSquareIcon } from '@heroicons/vue/24/solid';
import { ItemAvatar } from '@common/components';

defineProps({
    users: {
        type: Object,
        default: () => ({}),
    },
});
const confirmation = ref(null);
const deleting = ref(false);
const isRestore = ref(false);

const actions = [
    {
        label: 'Nouveau Admin',
        primary: true,
        icon: PlusIcon,
        href: route(routes.users.admin.create),
    },
];

const headings = [
    { name: 'Admin' },
    { name: 'Téléphone', className: 'text-center' },
    // { name: 'Genre', className: 'text-center' },
    { name: 'Status', className: 'text-center' },
    // { name: 'Ville', className: 'text-center' },
    { name: 'Date Inscription' },
    { name: 'Action', className: 'text-center pr-4 sticky right-0 bg-slate-100' },
];

const handleConfirmation = (eleve, restore = null) => {
    restore === true ? (isRestore.value = true) : (isRestore.value = false);
    confirmation.value = eleve;
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
            router.visit(route(routes.users.admin.list, { status: UserStatusEnum.ACTIVE.id }), {
                method: 'get',
            });
        })
        .finally(() => {
            deleting.value = false;
        });
};
const breadcumb = [{ name: 'Utilisateurs' }, { name: 'Administrateurs' }];
</script>

<template>
    <Page :actions="actions" :breadcumb="breadcumb" title="Administrateurs" width="lg">
        <Box sectionned>
            <div>
                <IndexFilters
                    :options="{ showSlot: false }"
                    :tabs="[
                        { name: 'Actif', id: '1' ,key:'status'},
                        { name: 'Archivée', id: '2' ,key:'status'},
                        { name: 'Tout', id: 'all',key:'status' },
                    ]"
                    default-tab="1"
                    key-tab="status"
                />
                <Table
                    v-slot="{ item }"
                    :headings="headings"
                    :is-loading="false"
                    :items="users"
                    :bulk-actions="
                        (item) => [
                            {
                                title: 'Modifier',
                                icon: PencilSquareIcon,
                                success: true,
                                full: true,
                                href: route(routes.users.admin.edit, item?.id || '-'),
                            },

                            item.status == UserStatusEnum.ACTIVE.id
                                ? {
                                      title: 'Archive',
                                      icon: ArchiveBoxIcon,
                                      danger: true,
                                      onClick: () => handleConfirmation(item),
                                  }
                                : {
                                      title: 'restore',
                                      icon: ArrowUpOnSquareIcon,
                                      danger: true,
                                      onClick: () => handleConfirmation(item, true),
                                  },
                        ]
                    "
                >
                    <td class="cell">
                        <ItemAvatar
                            :content="item?.email"
                            :title="item.name"
                            :src="item.media || item.profile_photo_url"
                            :href="
                                item.status == UserStatusEnum.ACTIVE.id ? route(routes.users.admin.edit, item.id) : ''
                            "
                        />
                    </td>

                    <td class="cell text-center">
                        {{ item.telephone ?? '-' }}
                    </td>

                    <td class="cell text-center">
                        <StatusBadge
                            :id="item.status"
                            :attr="UserStatusEnum"
                            :name="useStatusSwitch(UserStatusEnum, item.status)"
                        />
                    </td>

                    <td class="cell capitalize">
                        {{ dateFormat(item.created_at, 'fulltime') }}
                    </td>
                    <td class="sticky right-0 bg-white w-10 mx-auto">
                        <div class="flex justify-center items-center border-l h-full">
                            <ActionsList
                                :actions="[
                                    {
                                        title: 'Modifier',
                                        icon: PencilSquareIcon,
                                        full: true,
                                        href: route(routes.users.admin.edit, item.id || '-'),
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
                            >
                            </ActionsList>
                        </div>
                    </td>
                </Table>
            </div>
        </Box>
        <ConfirmationModal
            :loading="deleting"
            :show="!!confirmation"
            :is-restore="isRestore"
            @close="confirmation = null"
            @confirm="handleConfirmedDelete"
        >
            Etes-vous sûr que vous voulez {{ isRestore ? 'restore' : 'archive' }} l'Admin
            <b class="text-red-500">{{ confirmation?.title }}</b>
            ?
        </ConfirmationModal>
    </Page>
</template>
