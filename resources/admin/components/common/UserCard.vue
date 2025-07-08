<template>
    <article class="h-fit md:sticky top-5 flex flex-col">
        <Box sectionned padding class="py-3">
            <ItemAvatar
                size="w-16 h-16"
                :phone="eleve?.user?.telephone"
                :title="eleve?.user?.first_name + ' ' + eleve?.user?.last_name"
                :content="eleve?.user?.email"
                :src="eleve?.user?.media || eleve?.user?.profile_photo_url"
            />
        </Box>
        <Box sectionned padding as="ul" title="Eleve infos">
            <li class="flex gap-2 text-slate-500 text-sm justify-between">
                <b>Compte créé :</b> <span>{{ dateFormat(eleve?.created_at, 'fulltime') }}</span>
            </li>
            <li class="flex gap-2 text-slate-500 text-sm justify-between">
                <b>Email :</b> <span>{{ eleve?.user?.email }}</span>
            </li>
            <li class="flex gap-2 text-slate-500 text-sm justify-between">
                <b>Téléphone :</b> <span>{{ eleve?.user?.telephone ?? '-' }}</span>
            </li>
            <li class="flex gap-2 text-slate-500 text-sm justify-between">
                <b>Commandes effectuées :</b> <Badge info>-</Badge>
            </li>
        </Box>
    </article>
</template>

<script setup>
import { Badge, Box } from '@shared/components';
import { ItemAvatar } from '@common/components';
import { dateFormat } from '@shared/helpers';

defineProps({
    eleve: {
        type: Object,
        default: () => ({}),
    },
});
</script>
