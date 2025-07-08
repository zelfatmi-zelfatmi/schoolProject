<script setup>
import { Page } from '@shared/components';
import { routes } from '@admin/routes';
import { AdminForm } from './partials';

const breadcumb = [
    {
        name: 'Admins',
        href: route(routes.users.admin.list),
    },
    {
        name: "Creation d'admin",
    },
];
const uuidPreview = Math.random().toString(16).slice(2);
</script>

<template>
    <Page :breadcumb="breadcumb" title="Creation d'admin" width="xl">
        <AdminForm :uuid="uuidPreview" />
    </Page>
</template>
