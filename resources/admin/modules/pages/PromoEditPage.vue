<script setup>
import { PromoForm } from './partials';
import { routes } from '@admin/routes';
import { Page } from '@shared/components';

defineProps({
    page: {
        type: Object,
        default: () => ({}),
    },
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
        name: 'Modifier Promo',
    },
];
</script>
<template>
    <Page width="lg" :title="breadcumb[1].name" :breadcumb="breadcumb" :back="route(routes.pages.promo.index)">
        <PromoForm :products="products" :page="page" is-edit />
    </Page>
</template>
