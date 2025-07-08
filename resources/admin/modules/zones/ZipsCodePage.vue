<script setup>
import { Page } from '@shared/components';

import { Box, ConfirmationModal, IndexFilters, Table } from '@shared/components';
import { routes } from '@admin/routes';
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';
import { ZipForm, LieuZipItem } from './partials';

defineProps({
    zips: {
        type: Object,
        default: () => ({}),
    },
    zone: {
        type: Object,
        default: () => ({}),
    },
});
const confirmation = ref(null);
const deleting = ref(false);
const tabs = [
    { name: 'Actif', id: '',key:'status' },
    { name: 'Archivée', id: 0,key:'status' },
    { name: 'Tout', id: 'all',key:'status' },
];
const headings = [
    { name: 'Zone', className: 'text-start px-3 font-normal py-2' },
    { name: 'Status', className: 'text-center px-3 font-normal' },
    { name: 'Action', className: 'text-center px-3 sticky right-0 bg-[#f9fafb] border-l-[1px] border-[#e2e8f0]' },
];

const handleConfirmedDelete = () => {
    deleting.value = true;
    router.delete(route(routes.configuration.zones.zip.destroy, confirmation.value?.id), {
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
    <Page title="Code postals" :subtitle="`Zone: ${zone.name}`" width="md" back>
        <Box sectionned :separated="false" class="mt-8">
            <IndexFilters :options="{ showSlot: false }" :tabs="tabs" :default-tab="tabs[0].id" key-tab="status">
                <ZipForm :zone="zone" />
            </IndexFilters>
            <Table :headings="headings" :is-loading="false" :items="zips">
                <template #items="{ items }">
                    <LieuZipItem
                        v-for="item in items"
                        :key="item.id"
                        is-zip
                        :item="item"
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
            Etes-vous sûr que vous voulez archiver le code postal
            <b class="text-red-500">{{ confirmation?.code }}</b>
            ?
        </ConfirmationModal>
    </Page>
</template>
