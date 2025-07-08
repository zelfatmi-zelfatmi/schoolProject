<script setup>
import { Page } from '@shared/components';
import { routes } from '@admin/routes';
import { reactive } from 'vue';
import { ProductForm } from './partials';

defineProps({
    articles: {
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
        name: 'Nouveau produit',
    },
];
const uuidPreview = Math.random().toString(16).slice(2);

const banner = reactive({
    title: "Voir l'Aperçu du produit sur le site",
    content: '',
    // href: route(routes.front.articlePreview, uuidPreview),
    target: '_blank',
    show: false,
    status: 'primary',
});
</script>

<template>
    <Page
        :banner="banner"
        :breadcumb="breadcumb"
        title="Créer un nouveau produit"
        width="xl"
        back
        @banner:dismiss="banne.show = false"
    >
        <ProductForm :uuid="uuidPreview" />
    </Page>
</template>
