<script setup>
// import { ArticleForm } from './partials';
import { Page } from '@shared/components';
import { routes } from '@admin/routes';
import { useParams } from '@shared/hooks';
import { AdminForm } from './partials';

const props = defineProps({
    user: {
        type: Object,
        default: () => ({}),
    },
});
const breadcumb = [
    {
        name: 'Admin',
        href: route(routes.users.admin.list),
    },
    {
        name: "Modifier L'admin",
    },
];
const params = useParams();
</script>

<template>
    <Page :breadcumb="breadcumb" :title="user.name || 'Modifier d\'admin'" width="xl">
        <AdminForm :key="user.updated_at" :data="user" is-edit />
    </Page>
</template>
