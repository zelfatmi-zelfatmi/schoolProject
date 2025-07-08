<script setup>
import { Page } from '@shared/components';
import { ConfirmationModal } from '@shared/components';
import { routes } from '@admin/routes';
import { ref } from 'vue';
import { ItemsCard, StatsSection, UserCard } from '@admin/components/common';
import FeedsAndStatusOrder from './FeedsAndStatusOrder.vue';
import { dateFormat } from '@shared/helpers';
import { addMonths } from 'date-fns';
import { computed } from 'vue';
 import InvoiceDownload from '@/eleve/modules/orders/partials/InvoiceDownload.vue';
function addOneMonth(dateString) {
    return addMonths(new Date(dateString), 1);
}
const parsedPaymentHistory = computed(() => {
    try {
        return JSON.parse(props.order.payment_history); // Analyse le JSON
    } catch (e) {
        console.error('Invalid payment_history JSON:', e);
        return []; // Retourne un tableau vide si le JSON est invalide
    }
});
var props=defineProps({
    order: {
        type: Object,
        default: () => ({}),
    },
});
const confirmation = ref(null);
const deleting = ref(false);


const actions = computed(() => {
    if (props.order.payment_method !== 1 && props.order.payment_method !== 2) {
        return [
            {
                label: 'Modifier La Commande',
                primary: true,
                onClick: () => {
                    window.location.href = route(routes.shop.orders.edit, props.order.id); // Redirige vers la page d'édition
                },
            },
        ];
    }
    return []; // Si la condition n'est pas remplie, aucune action n'est affichée
});

const breadcumb = [
    {
        name: 'Commandes',
        href: route(routes.shop.orders.list),
    },
    {
        name: 'Détails de la commande',
    },
];

const handleConfirmedDelete = () => {
    deleting.value = true;
};


</script>

<template>
    <Page :actions="actions" :breadcumb="breadcumb" :title="`Référence : #${order.reference}`" width="xl" back>
        <StatsSection :data="order?.cart" />
        <section class="grid md:grid-cols-3 grid-cols-2 mt-8 gap-5">
    <!-- Colonne 1 : Section principale -->
    <article class="col-span-2 order-last md:order-first">
        <FeedsAndStatusOrder :data="order" />
        <ItemsCard
            :items="{ data: order.cart?.cart_items }"
            :order-id="order.id"
            :payment-info="{ method: order.payment_method, status: order.payment_status }"
            is-order
        />
    </article>

    <!-- Colonne 2 : Élève infos + Paiement -->
    <div class="col-span-2 md:col-span-1">
        <!-- Élève infos -->
        <UserCard :eleve="order?.eleve" class="mb-4" />

        <!-- Section Paiement -->
        <section class="payment-info-container " v-if="order.payment_status === 6">
            <div class="payment-row">
                <div class="payment-details">
                    <p class="payment-label">Info du 1er paiement</p>
                    <p class="payment-date">
                        {{ dateFormat(order.created_at, 'letter') }}
                    </p>
                </div>
                <div class="payment-actions">
                <InvoiceDownload :order="order" :isIcon="true"/>
                <span class="badge badge-paid">Payé</span>
            </div>
            </div>
            <hr />
            <div class="payment-row">
                <div class="payment-details">
                    <p class="payment-label">Info du 2ème paiement</p>
                    <p class="payment-date">
                        {{ dateFormat(addOneMonth(order.created_at), 'letter') }}
                    </p>
                </div>
                <span class="badge badge-pending">En attente</span>
            </div>
        </section>

        <section class="payment-info-container" v-if="order.payment_history && order.payment_history.length > 0">
            <div class="payment-row">
                <div class="payment-details">
                    <p class="payment-label">Info du 1er paiement</p>
                    <p class="payment-date">
                        {{ dateFormat(order.created_at, 'letter') }}
                    </p>
                </div>
                <div class="payment-actions">
                <InvoiceDownload :order="order" :isIcon="true"/>
                <span class="badge badge-paid">Payé</span>
            </div>
            </div>
            <hr />
            <div class="payment-row">
                <div class="payment-details">
                    <p class="payment-label">Info du 2ème paiement</p>
                    <p class="payment-date">
                        {{ dateFormat(parsedPaymentHistory[0].date, 'letter') }}
                    </p>
                </div>
                <div class="payment-actions">
            <InvoiceDownload :order="order" :isIcon="true" :invoiceDate="parsedPaymentHistory[0].date" :invoice_number="parsedPaymentHistory[0].invoice_number" />
            <span class="badge badge-paid">Payé</span>
        </div>

            </div>
        </section>
    </div>
</section>

        <ConfirmationModal
            :loading="deleting"
            :show="!!confirmation"
            @close="confirmation = null"
            @confirm="handleConfirmedDelete"
        >
            Etes-vous sûr que vous voulez supprimer l'article
            <b class="text-red-500">{{ confirmation?.title }}</b>
            ?
        </ConfirmationModal>
    </Page>
</template>
<style scoped>
/* Section globale */
.grid {
    gap: 16px;
}

/* Élève infos */
.eleve-info-card {
    background: #f9f9f9;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
}

.payment-info-container {
    border: 2px solid #E63946; /* Garder la bordure rouge */
    border-radius: 8px;
    padding: 12px; /* Réduire le padding pour un meilleur équilibre */
    background: #fff;
    max-width: 400px; /* Largeur maximale */
    /* margin: 0 auto 4px; Réduire la marge top */
}
.payment-actions {
    display: flex;
    align-items: center; /* Aligner les éléments sur une même ligne */
    gap: 10px; /* Espacement entre l'icône et le badge */
}

.payment-row {
    display: flex;
    justify-content: space-between; /* Aligne les éléments sur une même ligne */
    align-items: center; /* Centre verticalement les éléments */
    margin-bottom: 8px; /* Espacement uniforme entre les lignes */
}

.payment-details {
    flex-grow: 1; /* Permet au texte de prendre tout l'espace disponible */
}

.payment-label {
    font-size: 14px;
    font-weight: 600;
    color: #E63946;
    margin: 0;
}

.payment-date {
    font-size: 12px;
    color: #6c757d;
    margin: 4px 0 0 0; /* Réduire les marges au-dessus */
}

.badge {
    display: inline-block;
    padding: 6px 12px; /* Augmenter légèrement pour un badge plus équilibré */
    font-size: 12px;
    font-weight: 600;
    border-radius: 16px;
    text-transform: capitalize;
}

.badge-paid {
    color: #fff;
    background-color: #2D6A4F;
}

.badge-pending {
    color: #fff;
    background-color: #FFC107;
}

hr {
    border: none;
    border-top: 1px solid #E63946;
    margin: 8px 0; /* Réduire la marge */
}

</style>
