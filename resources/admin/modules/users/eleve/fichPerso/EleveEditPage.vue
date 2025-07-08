<script setup>
import { Page, WapperMenu } from '@shared/components';
import { EleveForm } from '../partials';
import { breadcumb, pagesBadges, pagesNavigation } from './fishPerso';

defineProps({
    user: {
        type: Object,
        default: () => ({}),
    },
    firstSession: Object,
});
</script>

<template>
    <Page
        :breadcumb="[...breadcumb, { name: 'Informations et Document' }]"
        :badges="pagesBadges(user)"
        :title="user?.name"
        width="2xl"
    >
        <WapperMenu :nav-items="pagesNavigation(user.eleve.id)">
            <EleveForm :key="user.updated_at" :data="user" is-edit :first-session="firstSession" />
        </WapperMenu>
    </Page>
</template>
