<script setup>
import { Page, Box, Listbox2,Badge } from '@shared/components';
import { MonitreurResumeHours } from '@admin/components';

import { Button ,InfoModal} from '@shared/components';
import axios from 'axios';
import { reactive, computed,ref } from 'vue';
import moment from 'moment-timezone';
import { PencilSquareIcon, ArrowTrendingUpIcon,ArrowDownTrayIcon } from '@heroicons/vue/20/solid';
import { moneyFormat, dateFormat } from '@shared/helpers';
import { routes } from '@admin/routes';
import { router   } from '@inertiajs/vue3';
var props = defineProps({
    invoices: {
        type: Object,
        default: () => ({}),
    },
    year: {
        type: Number,
        default: new Date().getFullYear(),
    },
});


const showConfirmation = ref(false);
const showDateError = ref(false);

const state = reactive({
    selectedYear: props.year || new Date().getFullYear(), // Par défaut, année actuelle
    selectedMonth: null, // Filtre pour le mois
    selectedMoniteur: null, // Filtre pour le moniteur
    selectedItem: null,

});

const groupedInvoices = computed(() => {
    if (!props.invoices || Object.keys(props.invoices).length === 0) {
        return [];
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Les mois commencent à 0
    const currentYear = currentDate.getFullYear();

    // Transformer les factures en tableau plat
    const invoices = ref( 
        Object.entries(props.invoices).flatMap(([month, moniteurs]) => {
        const monthInt = parseInt(month, 10);

        // Exclure les mois futurs dans l'année en cours
        if (state.selectedYear === currentYear && monthInt > currentMonth) {
            return [];
        }

        return moniteurs.map(moniteur => {
            return reactive({
                month: monthInt,
                year: state.selectedYear,
                isEdit: false, // Test : toujours vrai
                tempDatePaiement: null,
                ...moniteur,
            });
        });
    })
    );

    // Filtrage des factures par année, mois, moniteur et exclusion des mois futurs
    const filteredInvoices = invoices.value.filter(invoice => {
        const byYear = invoice.year === state.selectedYear;
        const byMonth = state.selectedMonth ? invoice.month === state.selectedMonth : true;
        const byMoniteur = state.selectedMoniteur ? invoice.moniteur.id === state.selectedMoniteur : true;

        // Exclure les mois futurs si l'année sélectionnée est l'année en cours
        if (state.selectedYear === currentYear && invoice.month > currentMonth) {
            return false;
        }

        return byYear && byMonth && byMoniteur;
    });
    // Grouper les factures par mois
    const groups = {};
    filteredInvoices.forEach(invoice => {
        const monthKey = invoice.month;
        if (!groups[monthKey]) {
            groups[monthKey] = [];
        }
        groups[monthKey].push(invoice);
    });

    return Object.entries(groups).map(([month, items]) => ({
        month: parseInt(month, 10),
        year: state.selectedYear,
        items,
    }));
});
const cancelEdit = (invoice) => {
    invoice.tempDatePaiement = null; // Réinitialisez la date temporaire
    invoice.isEdit = false; // Quittez le mode édition
};
const saveInvoice = (invoice) => {
    if (moment(invoice.tempDatePaiement).isAfter(moment(), 'day')) {
        showDateError.value=true;
        return;
    }
    const payload = {
        moniteur_id: invoice.moniteur.id,
        month: invoice.month,
        year: invoice.year,
        date_paiement: invoice.tempDatePaiement,
    };

    axios
      .put(route(routes.invoices.updateOrCreatePaymentDate), payload, {
          headers: {
              'Content-Type': 'application/json',
          },
      })
      .then((response) => {
          console.log("Facture mise à jour :", response.data.facture);
          invoice.isEdit = false;
          invoice.tempDatePaiement = null;
          window.location.reload(); // Rafraîchit la page
      })
      .catch((error) => {
          showConfirmation.value = true;
          console.error("Erreur lors de la mise à jour :", error.response?.data || error.message);
      });
};

const getFormattedMonth = (month, year) => {
    if (!month || !year || isNaN(month) || isNaN(year)) {
        return 'Date invalide'; // Message d'erreur si les données sont incorrectes
    }
    const date = new Date(year, month - 1); // JavaScript commence les mois à partir de 0
    return date.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });
};


function downloadInvoice(item) {
    axios.post(route(routes.invoices.download), {
        moniteur_id: item.moniteur.id,
        month: item.month,
        year: item.year,
    })
    .then(response => {
        const url = route(routes.invoices.view, response.data.invoice);
        window.open(url, '_blank');
    })
    .catch(error => {
        console.error(error);
    });
}


    function updatePeriod(selectedYear) {
    console.log('Avant mise à jour, state.selectedYear :', state.selectedYear);

    state.selectedYear = selectedYear;

    console.log('Après mise à jour, state.selectedYear :', state.selectedYear);

    router.visit(window.location.pathname, {
        data: { year: state.selectedYear },
        preserveScroll: true,
        onSuccess: (page) => {
            state.selectedYear = selectedYear;
            console.log('Données reçues après redirection :', page.props.invoices);
        },
    });
}


console.log("grouped invoices ",groupedInvoices.value)

</script>

<template>
    <Page title="Factures" width="xl">
        <div class="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
            <!-- Filtre Année -->
            <div class="flex flex-col space-y-1 w-full md:w-auto">
                <label for="year-picker" class="text-sm font-medium text-gray-700">Année</label>
                <Listbox2
    id="year-listbox"
    v-model="state.selectedYear"
    :items="Array.from({ length: 3 }, (_, i) => {
        const year = new Date().getFullYear() - i;
        return { id: year, name: year.toString() };
    })"
    :show-search="false"
    :keys="['name', 'id']"
    class="w-60"
    input-class="!rounded-lg bg-white shadow-none border !h-9"
    placeholder="Choisir une année"
    @update:modelValue="updatePeriod"
    clear
/>


            </div>

            <!-- Filtre Mois -->
            <div class="flex flex-col space-y-1 w-full md:w-auto">
                <label for="month-listbox" class="text-sm font-medium text-gray-700">Mois</label>

                <Listbox2
    id="month-listbox"
    v-model="state.selectedMonth"
    :items="Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        name: new Date(0, i).toLocaleString('default', { month: 'long' }),
    }))"
    :show-search="false"
    :keys="['name', 'id']"
    class="w-60"
    input-class="!rounded-lg bg-white shadow-none border !h-9"
    placeholder="Choisir un mois"
    clear
/>


            </div>

            <!-- Filtre Moniteur -->
            <div class="flex flex-col space-y-1 w-full md:w-auto">
                <label for="moniteur-listbox" class="text-sm font-medium text-gray-700">Moniteur</label>
                <Listbox2
    id="moniteur-listbox"
    v-model="state.selectedMoniteur"
    :items="Object.values(props.invoices)
        .flatMap(items => items.map(item => ({
            id: item.moniteur.id,
            name: item.moniteur.user.name,
        })))
        .reduce((unique, item) => {
            if (!unique.some(moniteur => moniteur.id === item.id)) {
                unique.push(item); // Ajoutez uniquement si l'ID est unique
            }
            return unique;
        }, [])" 
    :show-search="true"
    :keys="['name', 'id']"
    class="w-60"
    input-class="!rounded-lg bg-white shadow-none border !h-9"
    placeholder="Choisir un moniteur"
    clear
/>

            </div>
        </div>

        <Box sectionned :separated="false">
            <table class="w-full table-auto border-collapse rounded-lg shadow">
                <thead class="bg-orange-500 text-white sticky top-0 z-10">
                    <tr class="bg-gray-800 text-white text-left">
                        <th class="px-4 py-2">Départements</th>
                        <th class="px-4 py-2">Nom de Moniteur</th>
                        <th class="px-4 py-2 text-center">Facturable(s)</th>
                        <th class="px-4 py-2 text-center">Non Facturable(s)</th>
                        <th class="px-4 py-2 text-center">Salaire</th>
                        <th class="px-4 py-2 text-center">Date de paiement</th>
                        <th class="px-4 py-2 text-center">Statut</th>
                        <th class="px-4 py-2 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="groupedInvoices.length === 0">
                <tr>
                    <td colspan="7" class="text-center py-4 text-gray-500">
                        Aucune donnée disponible
                    </td>
                </tr>
            </template>
                    <template v-else v-for="(group, index) in groupedInvoices" :key="index">
                        <tr class="bg-gray-200 text-gray-700 font-bold">
                            <td colspan="8" class="px-4 py-2">
                                Mois : {{ getFormattedMonth(group.month, group.year) }}
                            </td>
                        </tr>
                        <tr
                            v-for="(invoice, idx) in group.items"
                            :key="idx"
                            class="hover:bg-gray-100 odd:bg-gray-50 even:bg-white"
                        >
                            <td class="border px-4 py-2">{{ invoice.moniteur.details?.departement }}</td>
                            <td class="border px-4 py-2">{{ invoice.moniteur.user?.name }}</td>
                            <td class="border px-4 py-2 text-center">{{ invoice.facturable_hours }}</td>
                            <td class="border px-4 py-2 text-center">{{ invoice.non_facturable_hours }}</td>
                            <td class="border px-4 py-2 text-center">
                                {{ moneyFormat(
    invoice.facturable_hours * 
    (Number(invoice.moniteur.details.tarif_car) + Number(invoice.moniteur.details.tarif_enseignement)), 
    '€'
) }}

                            </td>
                            <td class="border px-4 py-2 text-center">
                                <template v-if="invoice.isEdit">
                                    <input
                                        v-model="invoice.tempDatePaiement"
                                        type="date"
                                        class="form-control -my-1"
                                    />
                                </template>
                                <template v-else>
                                    {{ invoice.date_paiement ? moment(invoice.date_paiement).format('DD/MM/YYYY') : 'Non défini' }}
                                </template>
                            </td>
                            <td class="border px-4 py-2 text-center">
                                <Badge :success="!!invoice.date_paiement" :error="!invoice.date_paiement">
                                    {{ invoice.date_paiement ? 'Payée' : 'Impayé' }}
                                </Badge>
                            </td>
                            <td class="border right-0 bg-white w-10 mx-auto">
                                <div :class="['flex justify-center items-center h-full gap-1 px-2']">
                                    <Button
                                    :icon="ArrowDownTrayIcon"
                                     info
                                     link
                                     title="Télécharger la facture"
                                    @click="downloadInvoice(invoice)"
                                        />
                            <Button
    :icon="ArrowTrendingUpIcon"
    dark
    grouped
    tooltip="Résumé heures"
    @click="
        console.log('📌 Avant modification :', state.selectedItem);
        state.selectedItem = {
            period: invoice.year + '-' + invoice.month,
            moniteur: invoice.moniteur?.id,
        };
        console.log('✅ Après modification :', state.selectedItem);
    "
/>

                                    <template v-if="!invoice.isEdit">
                                        <Button
                                            :icon="PencilSquareIcon"
                                            tooltip="Modifier"
                                            info
                                            grouped
                                            @click="() => {
        console.log('Modifier clicked for invoice:', invoice);
        invoice.isEdit = true;
        console.log('after clicked for invoice:', invoice);
    }"
                                        />
                                    </template>
                                    <template v-else>
                                        <Button dark link class="!text-xs"     @click="cancelEdit(invoice)">Annuler</Button>
                                        <Button
                                            info
                                            link
                                            class="!text-xs"
                                            @click="saveInvoice(invoice)"
                                        >
                                            Enreg
                                        </Button>
                                    </template>
                                </div>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </Box>
        <MonitreurResumeHours
        :item="state.selectedItem"
    :show="true"
    @close="state.selectedItem = null"
/>
    <!-- Modal de confirmation -->
    <InfoModal
      v-if="showConfirmation"
      :show="showConfirmation"
      title="Attention requise"
      message="Veuillez générer la facture avant de passer au paiement."
      @close="showConfirmation = false"
    />
    <InfoModal
      v-if="showDateError"
      :show="showDateError"
      title="Attention requise"
      message="La date de paiement ne peut pas être supérieure à aujourd'hui."
      @close="showDateError = false"
    />

    </Page>
</template>
