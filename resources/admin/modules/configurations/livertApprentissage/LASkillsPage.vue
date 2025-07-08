<script setup>
import { Page } from '@shared/components';

import { Box, ConfirmationModal, IndexFilters, Table } from '@shared/components';
import { routes } from '@admin/routes';
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';
import { LASkillForm, SkillItem } from './partials';

defineProps({
    skills: {
        type: Object,
        default: () => ({
            data: [],
        }),
    },
    group: {
        type: Object,
        default: () => ({}),
    },
});
const confirmation = ref(null);
const deleting = ref(false);
const tabs = [
    { name: 'Tout', id: '' ,key:'status'},
    { name: 'Actif', id: '1' ,key:'status'},
    { name: 'Archivée', id: '0' ,key:'status'},
];
const headings = [
    { name: '#', className: 'min-w-[64px]' },
    { name: 'Label', className: 'min-w-[8rem]' },
    { name: 'Statut', className: 'text-center' },
    { name: 'Action', className: 'text-center px-3 sticky right-0 bg-[#f9fafb] border-l-[1px] border-[#e2e8f0]' },
];

const handleConfirmedDelete = () => {
    deleting.value = true;
    router.delete(route(routes.configuration.liverApprentissage.skills.destroy, confirmation.value?.id), {
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
    <Page title="Livret d'apprentissage" subtitle="Aperçu la liste l'apprentissage" width="md" back>
        <Box sectionned :separated="false" class="mt-8 overflow-hidden">
            <IndexFilters :options="{ showSlot: false }" :tabs="tabs" :default-tab="tabs[1].id" key-tab="'status'">
                <LASkillForm :id="group.id" :key="skills.data?.length || 0" :length="skills.data?.length || 0" />
            </IndexFilters>
            <Table :headings="headings" :is-loading="false" :items="skills" :paginate="false" class="">
                <template #items="{ items }">
                    <SkillItem
                        v-for="item in items"
                        :key="item.id"
                        :item="item"
                        :gid="group.id"
                        @item:delete="confirmation = item"
                    />
                </template>
            </Table>
        </Box>

        <ConfirmationModal
            :loading="deleting"
            :show="!!confirmation"
            @close="confirmation = null"
            @confirm="handleConfirmedDelete"
        >
            Etes-vous sûr que vous voulez archiver la zone
            <b class="text-red-500">{{ confirmation?.name }}</b>
            ?
        </ConfirmationModal>
    </Page>
</template>
