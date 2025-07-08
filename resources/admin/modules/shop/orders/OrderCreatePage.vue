<script setup>
import { Page } from '@shared/components';
import { routes } from '@admin/routes';
import { reactive } from 'vue';
import { OrderForm } from './partials';

const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
    students: {
        type: Object,
        default: () => ({}),
    },
    products: {
        type: Object,
        default: () => ({}),
    },
    isEdit: Boolean,
});

const breadcumb = [
    {
        name: 'Commandes',
        href: route(routes.shop.products.list),
    },
    {
        name: props.isEdit ? `Modifier Commande ${props.data?.reference || ''}` : 'Nouvelle Commande',

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
console.log("liste des éléves ",props.students)
</script>

<template>
    <Page
        :banner="banner"
        :breadcumb="breadcumb"
        :title="isEdit ? 'Modifier la commande' : 'Créer une nouvelle commande'" 
        width="xl"
        back
        @banner:dismiss="banne.show = false"
    >
        <OrderForm :uuid="uuidPreview" :products="products" :students="students" :isEdit="isEdit" :data="data"/>
    </Page>
</template>
