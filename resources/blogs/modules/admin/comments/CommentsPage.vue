<script setup>
import { PlusIcon } from '@heroicons/vue/20/solid';
import { Box, IndexFilters, Table, Page } from '@shared/components';
import { routes } from '@blogs/routes';
import { ConfirmationModal } from '@shared/components';
import { CommentRow } from './partials';
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';

defineProps({
    comments: {
        type: Object,
        default: () => ({}),
    },
});

const confirmation = ref(null);
const deleting = ref(false);

// const actions = [
//     {
//         label: 'Ajoute Categorie',
//         primary: true,
//         icon: PlusIcon,
//         href: route(routes.admin.categories.create),
//     },
// ];

const headings = [
    { name: 'Auteur' },
    { name: 'Commentaire' },
    { name: 'Statut' },
    { name: 'Article' },
    { name: 'Soumis le' },
    { name: 'Action', className: 'text-center' },
];

const handleConfirmation = (item) => {
    confirmation.value = item;
};
const handleConfirmedDelete = () => {
    deleting.value = true;
    router.delete(route(routes.admin.comments.delete, confirmation.value?.id), {
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
    <Page width="2xl" title="Gestion des commentaires ">
        <Box sectionned>
            <div>
                <IndexFilters />
                <Table :items="comments" :headings="headings" :is-loading="false">
                    <template #items="{ items }">
                        <CommentRow v-for="item in items" :key="item.id" :item="item" @delete="handleConfirmation" />
                    </template>
                </Table>
            </div>
        </Box>
        <ConfirmationModal
            :show="!!confirmation"
            :loading="deleting"
            @close="confirmation = null"
            @confirm="handleConfirmedDelete"
        >
            <div>
                <b class="text-red-500">Etes-vous sûr que vous voulez supprimer cet commentaire?</b>
            </div>
            {{ confirmation?.comment }}
        </ConfirmationModal>
    </Page>
</template>
