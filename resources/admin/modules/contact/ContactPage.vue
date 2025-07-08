<script setup>
import { Box, IndexFilters, IndexTable, Page } from '@shared/components';
import { routes } from '@admin/routes';
import { useForm } from '@inertiajs/vue3';
import { dateFormat } from '@shared/helpers';
import { DescPopup } from '@admin/components';
import { computed } from 'vue';
import { useParams } from '@shared/hooks';
defineProps({
    contacts: {
        type: Object,
        default: () => ({}),
    },
});
const form = useForm({
    is_read: 0,
});
const tabs = [
    {
        name: 'All',
        id: 'all',
        key:'is_read'
    },
    {
        name: 'Non lu',
        id: '0',
        key:'is_read'
    },
    {
        name: 'Lu',
        id: '1',
        key:'is_read'
    },
];
const headings = [
    { name: 'Client' },
    { name: 'Email & Télèphone' },
    { name: 'Sujet' },
    { name: 'Message' },
    { name: 'Date' },
];
const bulkActions = computed(
    () => (item) =>
        item.is_read == 0
            ? [
                  {
                      title: 'Marquer comme lu',
                      primary: true,
                      loading: form.processing,
                      onAction: (item, close) => {
                          form.is_read = 1;
                          form.put(route(routes.contact.update, item.id), {
                              onFinish: () => {
                                  form.reset();
                                  close();
                              },
                          });
                      },
                  },
              ]
            : null
);
</script>

<template>
    <Page title="Message clients" width="xl">
        <Box sectionned :separated="false">
            <IndexFilters :tabs="tabs" :default-tab="tabs[1].id" key-tab="is_read" />
            <IndexTable v-slot="{ item }" :headings="headings" :items="contacts" :bulk-actions="bulkActions">
                <td class="cell">{{ item.nom }} {{ item.prenom }}</td>
                <td class="cell">
                    <p>{{ item.email }}</p>
                    <p>{{ item.phone }}</p>
                </td>
                <td class="cell">
                    {{ item.subject }}
                </td>
                <td class="cell">
                    <DescPopup :desc="item.message" />
                </td>

                <td class="cell">
                    {{ dateFormat(item.created_at, 'letter') }}
                </td>
            </IndexTable>
        </Box>
    </Page>
</template>
