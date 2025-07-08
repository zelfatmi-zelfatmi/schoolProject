<script setup>
import { Page } from '@shared/components';
import { routes } from '@admin/routes';
import { ProductForm } from './partials';

defineProps({
    product: {
        type: Object,
        default: () => ({}),
    },
});

const breadcumb = [
    {
        name: 'Produits',
        href: route(routes.shop.products.list),
    },
    {
        name: 'Modifier produit',
    },
];
</script>

<template>
    <Page :breadcumb="breadcumb" title="Edit produit" width="lg" back>
        <ProductForm :data="product" is-edit />
    </Page>
</template>
