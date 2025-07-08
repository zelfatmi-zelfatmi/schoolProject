<script setup>
import { Page } from '@shared/components';
import { ExamForm } from './partials';
import { routes } from '@admin/routes';
defineProps({
    exam: {
        type: Object,
        default: () => ({}),
    },
});
const breadcumb = [
    {
        name: "Liste d'attente",
        href: route(routes.exams.waitingList.index),
    },
    {
        name: "Modifier l'examen",
    },
];
</script>

<template>
    <Page title="Modifier l'examen | liste d'attente" :breadcumb="breadcumb" back width="lg">
        <ExamForm :data="exam" is-edit />
    </Page>
</template>
