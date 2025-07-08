<script setup>
import { Badge, Box, Button, fileTypes, IndexFilters, Page, Popover, RadioField, Table } from '@shared/components';
import { routes } from '@admin/routes';
import { useForm } from '@inertiajs/vue3';
import { ItemAvatar } from '@common/components';
import { dateFormat, getMediaUrl } from '@shared/helpers';
import { ANNULATION_CANCELLED, ANNULATION_PENDING, ANNULATION_SUCCESS, annulationStatus } from '@common/constants';
import { ArrowDownTrayIcon, CheckIcon } from '@heroicons/vue/20/solid';



var props=defineProps({
    annulations: {
        type: Object,
        default: () => ({}),
    },
});

console.log("hello annulations is ",props.annulations)
const form = useForm({
    // is_justified: null,
    status: null,
});
const tabs = [
    {
        name: 'Tous',
        id:'',
        key:'status'

    },
    {
        name: 'Annulations Acceptées',
        id: '3',
        key:'status'
    }
];
const headings = [
    { name: 'Eleve' },
    { name: 'Moniteur' },
    { name: "Date d'annulation" },
    { name: 'Date de la session' },
    { name: 'Message' },
    { name: 'Statut', className: 'text-center' },
    { name: 'Documents', className: 'text-center' },
];
const handleOpenPopup = (item) => {
    form.status = item.status;
    // form.is_justified = item.is_justified;
};
const handleSubmit = (item, close) => {
    form.put(route(routes.annulationTardive.update, item.id), {
        onFinish: () => {
            form.reset();
            close();
        },
    });
};

</script>

<template>
    <Page title="Annulations Tardives" width="xl">
        <Box sectionned :separated="false">
            <IndexFilters :options="{ showSlot: false }" :tabs="tabs" 
            key-tab="status"/>
            <Table v-slot="{ item }" :headings="headings" :is-loading="false" :items="annulations">
                <td class="cell">
                    <ItemAvatar
                        :src="getMediaUrl(item.session?.eleve?.user)"
                        :href="route(routes.users.eleve.general, item.session?.eleve?.id)"
                        :title="item.session?.eleve?.user?.name"
                        :content="item.session?.eleve?.user?.email"
                        :phone="item.session?.eleve?.user?.telephone"
                    />
                </td>
                <td class="cell">
                    <ItemAvatar
                        :src="getMediaUrl(item.session?.planning?.moniteur?.user)"
                        :href="route(routes.users.moniteur.edit, item.session?.planning?.moniteur?.id)"
                        :title="item.session?.planning?.moniteur?.user?.name"
                        :content="item.session?.planning?.moniteur?.user?.email"
                        :phone="item.session?.planning?.moniteur?.user?.telephone"
                    />
                </td>
                <td class="cell">
                <b class="font-normal text-center flex flex-col py-1">
                            <span>
                                {{ dateFormat(item.created_at, 'fr') }}
                            </span>
                            <span class="font-semibold">
                                {{ dateFormat(item.created_at, 'shortTime') }}
                            </span>
                        </b>
                    </td>
                <td class="cell">
                    <div v-if="item.session?.planning">
                        {{ dateFormat(item.session.planning.date, 'letter') }}
                        <b class="block"> {{ item.session.planning.start_at }} à {{ item.session.planning.end_at }} </b>
                    </div>
                </td>
                <td class="cell">
                    {{ item.comment }}
                </td>

                <td class="cell text-center">
                    <Popover @popover-opened="handleOpenPopup(item)">
                        <Badge
                            :secondary="item.status === ANNULATION_PENDING"
                            :error="item.status === ANNULATION_CANCELLED"
                            :success="item.status === ANNULATION_SUCCESS"
                        >
                            {{ annulationStatus[item.status].label }}
                        </Badge>
                        <template #content="{ close }">
                            <Box title="Statut change" class="min-w-72 py-2">
                                <RadioField
                                    v-model="form.status"
                                    class="mt-3"
                                    :items="Object.values(annulationStatus)"
                                    :keys="['label', 'id']"
                                />
                            </Box>

                            <form
                                class="flex gap-3 mt-5 border-t pt-2 items-center"
                                @submit.prevent="handleSubmit(item, close)"
                            >
                                <Button dark link @click="close">Fermer</Button>
                                <Button
                                    primary
                                    submit
                                    full
                                    :loading="form.processing"
                                    :disabled="form.status === item.status"
                                    :icon="CheckIcon"
                                >
                                    Valider
                                </Button>
                            </form>
                        </template>
                    </Popover>
                </td>

                <td class="cell text-center">
                    <a
                        v-if="item.media"
                        class="flex-center flex-col btn-m hover:underline"
                        :href="item.media.storage_media?.path"
                        download
                    >
                        <ArrowDownTrayIcon class="w-5 text-primary" />
                        <span>Telecharger</span>
                    </a>
                    <div v-else>
                        <span>Pas de document</span>
                    </div>
                </td>
            </Table>
        </Box> 
    </Page>
</template>
