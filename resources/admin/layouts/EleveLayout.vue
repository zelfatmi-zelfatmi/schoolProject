<template>
    <WapperMenu :nav-items="tabs">
        <slot />
    </WapperMenu>
</template>

<script setup>
import { WapperMenu } from '@shared/components/layouts';
import { pagesNavigation } from '@admin/modules/users/eleve/fichPerso/fishPerso';

const props = defineProps({
    user: Object,
});
const tabs = pagesNavigation(props.user.eleve.id);
</script>
