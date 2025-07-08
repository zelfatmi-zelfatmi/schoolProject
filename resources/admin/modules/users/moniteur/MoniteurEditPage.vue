<script setup>
import { Page, WapperMenu } from '@shared/components';
import { routes } from '@admin/routes';
import { MoniteurForm } from './partials';
import { pagesNavigation } from './fishMoniteur';
defineProps({
    user: {
        type: Object,
        default: () => ({}),
    },
});
const breadcumb = [
    {
        name: 'Moniteur',
        href: route(routes.users.moniteur.list),
    },
    {
        name: 'Modifier Le Moniteur',
    },
];
</script>

<template>
    <Page
        :breadcumb="breadcumb"
        title="Modifier Moniteur"
        :back="route(routes.users.moniteur.list)"
        :actions="[
            {
                label: 'Se connecter',
                dark: true,
                self: true,
                href: route(routes.impersonate.start, user.id),
            },
        ]"
    >
        <WapperMenu :nav-items="pagesNavigation(user.moniteur.id)">
            <MoniteurForm :key="user.updated_at" :data="user" is-edit />
        </WapperMenu>
    </Page>
</template>
