<script setup>
import { Page, Box, Datepicker, IndexFilters, Table, Badge } from '@shared/components';
import { Link } from '@inertiajs/vue3';
import { routes } from '@admin/routes';
import { moneyFormat } from '@shared/helpers';
import { useParams } from '@shared/hooks';

defineProps({
    invoices: {
        type: Object,
        default: () => ({}),
    },
});
const params = useParams();

const headings = [
    { name: 'Nom' },
    { name: 'Facturable', className: 'text-center' },
    { name: 'Non Facturable', className: 'text-center' },
    { name: 'Salaire', className: 'text-center' },
    { name: 'Détails' },
    { name: 'status' },
];
</script>

<template>
    <Page title="Factures " width="xl">
        <template #actions>
            <Datepicker
                v-model="params.period"
                class="max-w-40"
                custom-class="rounded-full font-bold bg-white shadow"
                month-picker
                :max-date="new Date()"
                clear
                @change="params.update({ period: $event })"
            />
        </template>
        <Box sectionned :separated="false">
            <IndexFilters :options="{ showSlot: false }" />
            <Table v-slot="{ item }" :headings="headings" :items="invoices">
                <td class="cell">
                    <Link
                        class="font-bold btn btn-link btn-dark !pl-0"
                        :href="route(routes.users.moniteur.edit, item.moniteur?.id)"
                    >
                        {{ item.moniteur?.user?.name }}
                    </Link>
                </td> 

                <td class="cell text-center">{{ moneyFormat(item.details?.num_heures_f || 0, '') }}h</td>
                <td class="cell text-center">{{ moneyFormat(item.details?.num_heures_nf || 0, '') }}h</td>
                <td class="cell text-center">
                    {{ moneyFormat(item.montant) }}
                </td>
                <td class="cell">
                    <p class="flex justify-between">
                        <span>
                            <b class="w-12 inline-block"> F </b>
                            {{ item.details?.num_heures_f }} x {{ item.details?.prix_heure }} :
                        </span>
                        <span class="text-green-500">
                            {{ moneyFormat(item.details?.num_heures_f * item.details?.prix_heure) }}
                        </span>
                    </p>

                    <p class="flex justify-between">
                        <span>
                            <b class="w-12 inline-block">NF</b>
                            {{ item.details?.num_heures_nf }} x {{ item.details?.prix_heure }} :
                        </span>
                        <span class="text-red-500"
                            >{{ moneyFormat(item.details?.num_heures_nf * item.details?.prix_heure) }}
                        </span>
                    </p>
                </td>
                <td class="cell">
                    <Badge :success="!!item.date_paiement" :secondary="!item.date_paiement">
                        {{ item.date_paiement ? 'Payée' : 'En attente' }}
                    </Badge>
                </td>
            </Table>
        </Box>
    </Page>
</template>
