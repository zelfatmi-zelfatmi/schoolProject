<script setup>
import { Page, WapperMenu } from '@shared/components';
import { breadcumb, navigationButtons, pagesBadges, pagesNavigation } from './fishPerso';
import { ref } from 'vue';
import { useParams } from '@shared/hooks';
import { CpfItem } from './partials';

defineProps({
    eleve: {
        type: Object,
        default: () => ({}),
    },
    cpfs: {
        type: Object,
        default: () => ({}),
    },
});

const params = useParams();
const activeTab = ref(params.tab || navigationButtons[0].id);
</script>
<template>
    <Page
        :breadcumb="[...breadcumb, { name: 'CPF - Document' }]"
        :title="eleve?.user?.name"
        width="2xl"
        :badges="pagesBadges(eleve?.user)"
    >
        <WapperMenu :nav-items="pagesNavigation(eleve.id)" :active="activeTab">
            <CpfItem v-for="cpf in cpfs.data" :key="cpf.id" :cpf="cpf" />
        </WapperMenu>
    </Page>
</template>
