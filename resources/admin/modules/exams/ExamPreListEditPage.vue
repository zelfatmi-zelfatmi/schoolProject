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
        name: 'Pre-liste',
        href: route(routes.exams.waitingList.index),
    },
    {
        name: "Modifier l'examen",
    },
];
</script>

<template>
    <Page title="Modifier l'examen pre-liste" :breadcumb="breadcumb" back width="lg">
        <ExamForm :data="exam" is-edit is-pre-list />
    </Page>
</template>
