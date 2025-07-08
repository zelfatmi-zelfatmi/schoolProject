<script setup>
import { routes } from '@admin/routes';
import { Page, Box, WapperMenu } from '@shared/components';
import { SkillsSteps, Skill } from './partials';
import { useQuery } from '@shared/hooks';
import { ref } from 'vue';
import { breadcumb, pagesBadges, pagesNavigation } from './fishPerso';
const props = defineProps({
    user: {
        type: Object,
        default: () => ({}),
    },
});

const selectedSkillGroup = ref(null);
const eleveSkill = useQuery(
    {
        url: route(routes.api.skills.list, props.user?.eleve.id),
    },
    true
);

const handleSelectSkill = (step) => {
    selectedSkillGroup.value = step;
};
</script>

<template>
    <Page
        :breadcumb="[...breadcumb, { name: 'Livret d\'apprentissage' }]"
        :badges="pagesBadges(user)"
        :title="user?.name"
        width="2xl"
    >
        <WapperMenu :nav-items="pagesNavigation(user.eleve.id)">
            <Box sectionned padding class="!p-0 max-w-[900px] !gap-0 overflow-hidden">
                <SkillsSteps v-if="eleveSkill.data?.length" :data="eleveSkill.data" @select-skill="handleSelectSkill" />
                <Skill v-if="selectedSkillGroup" :group="selectedSkillGroup || eleveSkill.data?.[0] || {}" />
            </Box>
        </WapperMenu>
    </Page>
</template>
