<script setup>
import { EleveForm } from './partials';
import { Page } from '@shared/components';
import { routes } from '@admin/routes';

const breadcumb = [
    {
        name: 'Eleves',
        href: route(routes.users.eleve.list),
    },
    {
        name: "Création d'eleve",
    },
];
const uuidPreview = Math.random().toString(16).slice(2);
</script>

<template>
    <Page :breadcumb="breadcumb" title="Création d'eleve" width="xl">
        <EleveForm :uuid="uuidPreview" class="py-10" />
    </Page>
</template>
