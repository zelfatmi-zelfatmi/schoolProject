<script setup>
import { Page } from '@shared/components';
import { ConfirmationModal } from '@shared/components';
import { routes } from '@admin/routes';
import { ref } from 'vue';
import { ItemsCard, StatsSection, UserCard } from '@admin/components/common';
import FeedsAndStatusCart from './FeedsAndStatusCart.vue';

const props = defineProps({
    cart: {
        type: Object,
        default: () => ({}),
    },
});
const confirmation = ref(null);
const deleting = ref(false);

const actions = [];
const breadcumb = [
    {
        name: 'Panniers',
        href: route(routes.shop.cart.list),
    },
    {
        name: 'Détails de pannier',
    },
];
</script>

<template>
    <Page :actions="actions" :breadcumb="breadcumb" width="xl" :back="route(routes.shop.cart.list)">
        <StatsSection :data="cart" />
        <section class="grid md:grid-cols-3 grid-cols-2 gap-5">
            <article class="col-span-2 order-last md:order-first">
                <FeedsAndStatusCart :data="props.cart" />
                <ItemsCard :items="{ data: cart?.cart_items }" />
            </article>
            <UserCard :eleve="cart?.eleve" class="col-span-2 md:col-span-1 order-first md:order-last" />
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
