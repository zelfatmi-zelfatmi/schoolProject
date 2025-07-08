<script setup>
import { CategoryForm } from './partials';
import { Page } from '@shared/components';
import { routes } from '@blogs/routes';
const breadcumb = [
    {
        name: 'Categories',
        href: route(routes.admin.categories.list),
    },
    {
        name: 'Creation du categorie',
    },
];
</script>

<template>
    <Page width="xl" :breadcumb="breadcumb" title="Creation du categorie">
        <CategoryForm />
    </Page>
</template>
