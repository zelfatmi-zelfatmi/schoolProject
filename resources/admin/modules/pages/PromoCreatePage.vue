<script setup>
import { Page } from '@shared/components';
import { PromoForm } from './partials';
import { routes } from '@admin/routes';

defineProps({
    products: {
        type: Object,
        default: () => ({}),
    },
});
const breadcumb = [
    {
        name: 'Tous les Promo',
        href: route(routes.pages.promo.index),
    },
    {
        name: 'Créer Promo',
    },
];
</script>
<template>
    <Page width="lg" :title="breadcumb[1].name" :breadcumb="breadcumb" :back="route(routes.pages.promo.index)">
        <PromoForm :products="products" />
    </Page>
</template>
