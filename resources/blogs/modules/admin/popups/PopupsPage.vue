<script setup>
import { PlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/20/solid';
import { dateFormat } from '@shared/helpers';
import { Badge, Box, Button, IndexFilters, Page, Table } from '@shared/components';
import { routes } from '@blogs/routes';
import { ConfirmationModal } from '@shared/components';
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';

defineProps({
    popups: {
        type: Object,
        default: () => ({}),
    },
});

const confirmation = ref(null);
const deleting = ref(false);
const actions = [
    {
        label: 'Ajouter Popup',
        primary: true,
        icon: PlusIcon,
        href: route(routes.admin.popups.create),
    },
];

const headings = [
    { name: 'Template' },
    { name: 'Status', className: 'text-center' },
    { name: 'Date' },
    { name: 'Action', className: 'text-center pr-4' },
];

const handleConfirmation = (category) => {
    confirmation.value = category;
};
const handleConfirmedDelete = () => {
    deleting.value = true;
    router.delete(route(routes.admin.popups.delete, confirmation.value?.id), {
        onFinish: () => {
            deleting.value = false;
        },
        onSuccess: () => {
            confirmation.value = null;
        },
    });
};
</script>

<template>
    <Page :actions="actions" title="Gestion des Popup">
        <Box sectionned>
            <div>
                <IndexFilters />
                <Table v-slot="{ item }" :items="popups" :headings="headings" :is-loading="false">
                    <td class="cell">
                        <b>{{ item.title }}</b>
                    </td>
                    <td class="cell">
                        <Badge class="mx-auto capitalize" :info="item.is_active" :secondary="!item.is_active">
                            {{ item.is_active ? 'Actif' : 'Inactif' }}
                        </Badge>
                    </td>
                    <td class="cell uppercase">{{ dateFormat(item.created_at, 'fulltime') }}</td>
                    <td class="cell-actions">
                        <div>
                            <Button
                                link
                                success
                                :href="route(routes.admin.popups.edit, item.id)"
                                :icon="PencilSquareIcon"
                                title="Modifier"
                                class="hover:bg-slate-100"
                            />
                            <Button
                                link
                                danger
                                :icon="TrashIcon"
                                title="Delete"
                                class="hover:bg-slate-100"
                                @click="handleConfirmation(item)"
                            />
                        </div>
                    </td>
                </Table>
            </div>
        </Box>
        <ConfirmationModal
            :show="!!confirmation"
            :loading="deleting"
            @close="confirmation = null"
            @confirm="handleConfirmedDelete"
        >
            Etes-vous sûr que vous voulez supprimer categorie <b class="text-red-500">{{ confirmation?.name }}</b
            >?
        </ConfirmationModal>
    </Page>
</template>
