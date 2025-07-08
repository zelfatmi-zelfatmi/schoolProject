<script setup>
import { ref } from 'vue';
import { Page } from '@shared/components';
import { ArrowDownTrayIcon } from '@heroicons/vue/20/solid';
import { downloadPdf } from '@common/helpers';
import { InvoiceMoniteurModel } from './partials';

defineProps({
    invoice: {
        type: Object,
        default: () => ({}),
    },
});
const invoiceContent = ref(null);
</script>

<template>
    <Page
        :title="`Facture: ${invoice?.num_facture}`"
        back
        width="lg"
        :actions="[
            {
                label: 'Télécharger facture',
                icon: ArrowDownTrayIcon,
                primary: true,
                onAction: () => downloadPdf(invoiceContent),
            },
        ]"
    >
        <div ref="invoiceContent" class="font-pdf">
            <InvoiceMoniteurModel :invoice="invoice" />
        </div>
    </Page>
</template>
