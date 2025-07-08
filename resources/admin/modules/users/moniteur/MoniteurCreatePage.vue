<script setup>
import { Page } from '@shared/components';
import { routes } from '@admin/routes';
import MoniteurForm from '@admin/modules/users/moniteur/partials/MoniteurForm.vue';

const breadcumb = [
    {
        name: 'Moniteurs',
        href: route(routes.users.moniteur.list),
    },
    {
        name: 'Creation de moniteur',
    },
];
const uuidPreview = Math.random().toString(16).slice(2);
</script>

<template>
    <Page :breadcumb="breadcumb" title="Creation de moniteur" width="lg" :back="route(routes.users.moniteur.list)">
        <MoniteurForm :uuid="uuidPreview" />
    </Page>
</template>
