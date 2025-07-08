<script setup>
// import { ArticleForm } from './partials';
import { Page } from '@shared/components';
import { routes } from '@admin/routes';
import { useParams } from '@shared/hooks';
import { SecretaryForm } from './partials';

const props = defineProps({
    user: {
        type: Object,
        default: () => ({}),
    },
});
const breadcumb = [
    {
        name: 'Secrétaire',
        href: route(routes.users.secretary.list),
    },
    {
        name: "Modifier Secrétaire",
    },
];
const params = useParams();
</script>

<template>
    <Page :breadcumb="breadcumb" :title="user.name || 'Modifier d\'admin'" width="xl">
        <SecretaryForm :key="user.updated_at" :data="user" is-edit />
    </Page>
</template>
