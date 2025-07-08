<script setup>
import { Box, Page, TextField, WapperMenu } from '@shared/components';
import { pagesNavigation } from './fishMoniteur';
import { useForm } from '@inertiajs/vue3';
import { STATUS_ACTIVE } from '@common/constants';
import { InlineActions } from '@common/components';
import { usePage } from '@shared/stores';
import { computed } from 'vue';
import { routes } from '@admin/routes';

const props = defineProps({
    account: {
        type: Object,
        default: () => ({}),
    },
    moniteur: Object,
});

const page = usePage();
const form = useForm({
    iban: props.account?.iban || '',
    bic: props.account?.bic || '',
    status: props.account?.status || STATUS_ACTIVE,
});

const submit = () => {
    form.post(route(routes.users.moniteur.fich.coordonneesBancaireSave, props.moniteur?.id));
};

page.actions = [
    {
        label: 'Enregister',
        primary: true,
        disabled: computed(() => form.processing || !form.isDirty),
        loading: computed(() => form.processing),
        submit: true,
        onClick: submit,
    },
    {
        label: 'Réinitialiser',
        disabled: computed(() => form.processing || !form.isDirty),
        secondary: true,
        onClick: () => form.reset(),
    },
];
const breadcumb = [
    {
        name: 'Moniteur',
        href: route(routes.users.moniteur.list),
    },
    {
        name: 'Coordonnées bancaires',
    },
];
</script>

<template>
    <Page :breadcumb="breadcumb" title="Coordonnées bancaires" :back="route(routes.users.moniteur.list)">
        <WapperMenu :nav-items="pagesNavigation(moniteur?.id)">
            <Box sectionned padding title="Bank informations" class="mt-7 flex flex-col px-3 flex-1">
                <div class="flex flex-col gap-4">
                    <TextField
                        v-model="form.iban"
                        mask="AA ## XXXX ###### ########"
                        avoid-replace
                        :error="form.errors.iban"
                        label="IBAN"
                    />
                    <TextField v-model="form.bic" :length="11" :error="form.errors.bic" label="BIC" />
                </div>
            </Box>

            <InlineActions :actions="page.actions" />
        </WapperMenu>
    </Page>
</template>
