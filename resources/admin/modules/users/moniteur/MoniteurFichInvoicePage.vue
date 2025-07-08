<script setup>
import { reactive } from 'vue';
import { Box, DateRangepicker, IndexFilters, Page, Table, WapperMenu } from '@shared/components';
import { InvoiceRowItem } from './partials';
import { pagesNavigation, invoicesPage } from './fishMoniteur';
import { MonitreurResumeHours } from '@admin/components';
import { routes } from '@admin/routes';

defineProps({
    invoices: {
        type: Object,
        default: () => ({}),
    },
    user: {
        type: Object,
        default: () => ({}),
    },
});
const state = reactive({
    selectedItem: null,
});
</script>

<template>
    <Page :breadcumb="invoicesPage.breadcumb" title="Facturation" :back="route(routes.users.moniteur.list)">
        <WapperMenu :nav-items="pagesNavigation(user?.id)">
            <Box sectionned :separated="false">
                <IndexFilters
                    :options="{ showSlot: false }"
                    :tabs="invoicesPage.tabs"
                    :default-tab="invoicesPage.tabs[0].id"
                    key-tab="status"
                >
                    <DateRangepicker class="flex-1 max-w-full" placeholder="Date facture" title="Filtre par date" />
                </IndexFilters>
                <Table :headings="invoicesPage.headings" :is-loading="false" :items="invoices">
                    <template #items="{ items }">
                        <InvoiceRowItem
                            v-for="item in items"
                            :key="item.id"
                            :item="item"
                            @click:resume-hours="state.selectedItem = $event"
                        />
                    </template>
                </Table>
                <MonitreurResumeHours :item="state.selectedItem" @close="state.selectedItem = null" />
            </Box>
        </WapperMenu>
    </Page>
</template>
