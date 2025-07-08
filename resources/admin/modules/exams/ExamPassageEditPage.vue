<script setup>
import { Page } from '@shared/components';
import { ExamForm } from './partials';
import { routes } from '@admin/routes';
defineProps({
    exam: {
        type: Object,
        default: () => ({}),
    },
    stats: Array,
});
const breadcumb = [
    {
        name: 'Passage',
        href: route(routes.exams.passage.index),
    },
    {
        name: "Modifier l'examen",
    },
];
</script>

<template>
    <Page title="Modifier l'examen passage" :breadcumb="breadcumb" back width="lg">
        <ExamForm :data="exam" is-edit is-passage />
    </Page>
</template>
