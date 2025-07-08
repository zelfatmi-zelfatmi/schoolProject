<script setup>
import { Page } from '@shared/components';
import { routes } from '@admin/routes';

import SecretaryForm from './partials/SecretaryForm.vue';

const breadcumb = [
    {
        name: 'Secrétaires',
        href: route(routes.users.admin.list),
    },
    {
        name: "Creation de Secrétaire",
    },
];
const uuidPreview = Math.random().toString(16).slice(2);
</script>

<template>
    <Page :breadcumb="breadcumb" title="Creation de Secrétaire" width="xl">
        <SecretaryForm :uuid="uuidPreview" />
    </Page>
</template>
