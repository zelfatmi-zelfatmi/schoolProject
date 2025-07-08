<script setup>
import {
    Box,
    Datepicker,
    EmptyState,
    InlineError,
    Listbox2,
    MEDIA_TYPES,
    MediaManager,
    Page,
    TextField,
    useMedias,
    WapperMenu,
} from '@shared/components';
import { pagesNavigation } from './fishMoniteur';
import { useForm } from '@inertiajs/vue3';
import { InlineActions } from '@common/components';
import { useMediaManager, usePage, useToast } from '@shared/stores';
import { computed } from 'vue';
import { routes } from '@admin/routes';
import { DocumentItem } from './partials';
import { DocumentTextIcon, PlusIcon } from '@heroicons/vue/20/solid';
import { router } from '@inertiajs/vue3';
import { formJuridiqueItems } from '@moniteur/modules/settings/documentsProfessionel/documentsPersonel';

const props = defineProps({
    pieceIdentite: {
        type: Object,
        default: () => ({}),
    },
    permis: {
        type: Object,
        default: () => ({}),
    },
    diplom: {
        type: Object,
        default: () => ({}),
    },
    professionel: {
        type: Object,
        default: () => ({}),
    },
    moniteur: Object,
});
const page = usePage();

const breadcumb = [
    {
        name: 'Moniteur',
        href: route(routes.users.moniteur.list),
    },
    {
        name: 'Documents',
    },
];
const mediaManager = useMediaManager();
const form = useForm({
    media_piece_identite: props.pieceIdentite?.media || [],
    media_permis: props.permis?.media || [],
    media_diplom: props.diplom?.media || [],

    denomination_social: props.professionel?.denomination_social || null,
    forme_juridique: props.professionel?.forme_juridique || null,
    siret: props.professionel?.siret || null,
    num_autorisation: props.professionel?.num_autorisation || null,
    date_creation: props.professionel?.date_creation || null,
    autorisations: {
        media:
            props.professionel?.autorisation_enseigner?.media?.map((v) => ({ ...v.storage_media, media_id: v.id })) ||
            [],
        attestation_vigilance:
            props.professionel?.autorisation_enseigner?.attestation_vigilance?.map((v) => ({
                ...v.storage_media,
                media_id: v.id,
            })) || [],
        autorisation: props.professionel?.autorisation_enseigner?.autorisation || null,
        visite: props.professionel?.autorisation_enseigner?.visite || null,
    },
});

const submit = () => {
    form.transform((data) => {
        data.media_piece_identite = data.media_piece_identite.map((media) => media.storage_media_id || media.id);
        data.media_permis = data.media_permis.map((media) => media.storage_media_id || media.id);
        data.media_diplom = data.media_diplom.map((media) => media.storage_media_id || media.id);
        data.autorisations = {
            media: data.autorisations.media.map((media) => media.storage_media_id || media.id),
            autorisation: data.autorisations.autorisation,
            visite: data.autorisations.visite,
        };
        return data;
    });
    form.put(route(routes.users.moniteur.fich.documentsUpdate, props.moniteur?.id), {
        preserveScroll: true,
    });
};
const toast = useToast();
const medias = useMedias();
const handleAddMedia = (value) => {
    // form.media = $event
    if (mediaManager.source) {
        if (mediaManager.source === 'professionel') {
            if (form.autorisations.media.some((item) => item.id === value.id)) {
                toast.notify({
                    title: 'Ce document a déjà été ajouté',
                    type: 'error',
                });
            } else {
                form.autorisations.media.push(value);
            }
            return;
        }
        if (mediaManager.source === 'attestation_vigilance') {
            if (form.autorisations.attestation_vigilance.some((item) => item.id === value.id)) {
                toast.notify({
                    title: 'Ce document a déjà été ajouté',
                    type: 'error',
                });
            } else {
                form.autorisations.attestation_vigilance.push(value);
            }
            return;
        }
        if (form[mediaManager.source].some((item) => item.id === value.id)) {
            toast.notify({
                title: 'Ce document a déjà été ajouté',
                type: 'error',
            });
        } else {
            form[mediaManager.source] = [...form[mediaManager.source], value];
        }
    }
};
const onDeleteMedia = (item, key) => {
    if (item?.storage_media) {
        medias.deleteMediaModel(item.id, () => {
            form[key] = form[key].filter((media) => media.id !== item.id);
            router.reload();
            form.defaults();
        });
    } else {
        form[key] = form[key].filter((media) => media.id !== item.id);
    }
};

const onDeleteMedia2 = (item) => {
    if (item?.created_at) {
        medias.deleteMediaModel(item.media_id, () => {
            form.autorisations.media = form.autorisations.media.filter((media) => media.id !== item.id);
            router.reload();
        });
    } else {
        form.autorisations.media = form.autorisations.media.filter((media) => media.id !== item.id);
    }
};

const onDeleteMedia3 = (item) => {
    if (item?.created_at) {
        medias.deleteMediaModel(item.media_id, () => {
            form.autorisations.attestation_vigilance = form.autorisations.attestation_vigilance.filter(
                (media) => media.id !== item.id
            );
            router.reload();
        });
    } else {
        form.autorisations.attestation_vigilance = form.autorisations.attestation_vigilance.filter(
            (media) => media.id !== item.id
        );
    }
};

page.actions = [
    {
        label: 'Enregister les documents',
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
        onClick: () => {
            form.reset();
            form.clearErrors();
        },
    },
];
const action = (key, title = '') => ({
    label: title || 'Ajouter un document',
    info: true,
    link: true,
    icon: PlusIcon,
    onClick: () => mediaManager.open(key),
});
</script>

<template>
    <Page :breadcumb="breadcumb" title="Documents" :back="route(routes.users.moniteur.list)">
        <MediaManager :types="MEDIA_TYPES.all" @submit="handleAddMedia" />
        <WapperMenu :nav-items="pagesNavigation(moniteur?.id)">
            <ul>
                <Box sectionned padding as="li" title="Pièce d'identité" :action="action('media_piece_identite')">
                    <p>{{ pieceIdentite?.media?.length || 0 }} document(s) d'identité.</p>
                    <ul class="list-disc list-inside mt-2">
                        <li>la Carte d'identité recto & verso</li>
                        <li>le passeport</li>
                    </ul>
                    <DocumentItem
                        v-for="item in form.media_piece_identite"
                        :key="item.id"
                        :item="item.storage_media || item"
                        @delete="onDeleteMedia(item, 'media_piece_identite')"
                    />
                    <EmptyState
                        v-if="!form.media_piece_identite.length"
                        title="Aucun document"
                        :image="DocumentTextIcon"
                        class="py-5 bg-slate-50 rounded-xl"
                    >
                        Aucun permis de conduire n'a été ajouté pour le moment.
                    </EmptyState>
                </Box>
                <Box as="li" sectionned padding title="Permis de Conduire" :action="action('media_permis')">
                    <p>Merci de fournir le recto & verso de ce document</p>
                    <DocumentItem
                        v-for="item in form.media_permis"
                        :key="item.id"
                        :item="item.storage_media || item"
                        @delete="onDeleteMedia(item, 'media_permis')"
                    />
                    <EmptyState
                        v-if="!form.media_permis.length"
                        title="Aucun document"
                        :image="DocumentTextIcon"
                        class="py-5 bg-slate-50 rounded-xl"
                    >
                        Aucun permis de conduire n'a été ajouté pour le moment.
                    </EmptyState>
                </Box>
                <Box
                    as="li"
                    sectionned
                    padding
                    title="Diplôme d'enseignement | Titre Pro ECSR"
                    :action="action('media_diplom')"
                >
                    <p>BEPECASER ou Titre Professionnel de la conduite</p>
                    <DocumentItem
                        v-for="item in form.media_diplom"
                        :key="item.id"
                        :item="item.storage_media || item"
                        @delete="onDeleteMedia(item, 'media_diplom')"
                    />
                    <EmptyState
                        v-if="!form.media_diplom.length"
                        title="Aucun document"
                        :image="DocumentTextIcon"
                        class="py-5 bg-slate-50 rounded-xl"
                    >
                        Aucun permis de conduire n'a été ajouté pour le moment.
                    </EmptyState>
                </Box>
                <Box as="li" sectionned padding title="Documents professionneles">
                    <div class="grid grid-cols-2 gap-5">
                        <TextField
                            v-model="form.denomination_social"
                            :error="form.errors.denomination_social"
                            label="Dénomination sociale"
                        />
                        <Listbox2
                            v-model="form.forme_juridique"
                            label="Forme juridique"
                            :items="formJuridiqueItems"
                            :error="form.errors.forme_juridique"
                            input-class="bg-white"
                        />
                        <Datepicker
                            v-model="form.date_creation"
                            :error="form.errors.date_creation"
                            label="Date de création d'entreprise"
                            name="date"
                        />
                        <TextField v-model="form.siret" :error="form.errors.siret" label="SIRET" />
                        <TextField
                            v-model="form.num_autorisation"
                            :error="form.errors.num_autorisation"
                            type="number"
                            class="appearance-none"
                            label="Numero d'autorisation d'enseigner"
                        />
                    </div>
                </Box>

                <Box
                    as="li"
                    sectionned
                    padding
                    title="Autorisation d'enseigner"
                    subtitle="Merci de fournir le recto & verso de ce document"
                    :action="action('professionel')"
                >
                    <div class="flex gap-5">
                        <Datepicker
                            v-model="form.autorisations.autorisation"
                            :error="form.errors['autorisations.autorisation']"
                            label="Date de autorisation"
                            name="date"
                        />
                        <Datepicker
                            v-model="form.autorisations.visite"
                            :error="form.errors['autorisations.visite']"
                            label="Date de visite"
                            name="date"
                        />
                    </div>
                    <ul class="flex flex-col gap-2 mt-5">
                        <li class="block font-medium text-xs text-gray-600">Document(s) téléchargé(s)</li>
                        <DocumentItem
                            v-for="(item, index) in form.autorisations.media"
                            :key="item.id"
                            :index="index"
                            :item="item"
                            @delete="onDeleteMedia2(item)"
                        />
                        <EmptyState
                            v-if="!form.autorisations.media.length"
                            title="Aucun document"
                            :image="DocumentTextIcon"
                            class="py-5 bg-slate-50 rounded-xl"
                        >
                            Aucun document n'a été ajouté pour le moment.
                        </EmptyState>
                        <InlineError :errors="form.errors['autorisations.media']" />
                    </ul>
                </Box>
                <Box
                    as="li"
                    sectionned
                    padding
                    title="Attestation de vigilance"
                    :action="action('attestation_vigilance')"
                >
                    <ul class="flex flex-col gap-2 mt-5">
                        <li class="block font-medium text-xs text-gray-600">Document(s) téléchargé(s)</li>
                        <DocumentItem
                            v-for="(item, index) in form.autorisations.attestation_vigilance"
                            :key="item.id"
                            :index="index"
                            :item="item"
                            @delete="onDeleteMedia3(item)"
                        />
                        <EmptyState
                            v-if="!form.autorisations.attestation_vigilance.length"
                            title="Aucun document"
                            :image="DocumentTextIcon"
                            class="py-5 bg-slate-50 rounded-xl"
                        >
                            Aucun document n'a été ajouté pour le moment.
                        </EmptyState>
                        <InlineError :errors="form.errors['autorisations.attestation_vigilance']" />
                    </ul>
                </Box>
            </ul>
            <InlineActions :actions="page.actions" />
        </WapperMenu>
    </Page>
</template>
