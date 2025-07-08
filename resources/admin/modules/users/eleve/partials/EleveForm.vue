<script setup>
import {computed, ref, watch} from 'vue';
import {useForm} from '@inertiajs/vue3';
import {
    Box,
    Button,
    Datepicker,
    Datepicker1,
    EmptyState,
    Listbox,
    MediaManager,
    SingleImageField,
    TabSwitch,
    TextField,
    useMedias,
} from '@shared/components';
import {routes} from '@admin/routes';
import {usePage} from '@shared/stores';
import {statusEnumToArray} from '@shared/hooks';
import {UserStatusEnum} from '@shared/constants';
import {DocumentTextIcon} from '@heroicons/vue/20/solid';
import {ContratFormationContent} from '@eleve/modules/settings/contract/partials';
import {downloadPdf} from '@common/helpers';

const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
    actions: Array,
    isEdit: Boolean,
    uuid: String,
    firstSession: Object,
});
const form = useForm({
    first_name: props.data.first_name || '',
    last_name: props.data.last_name || '',
    email: props.data.email || '',
    status: props.data.status || '1',
    adresse: props.data.adresse || '',
    neph: props.data.eleve?.neph || '',
    is_cpf: props.data.eleve?.is_cpf || '0',
    boite_type: props.data.eleve?.boite_type || '0',
    frequence: props.data.eleve?.frequence || 0,
    how_know: props.data.eleve?.how_know || '',
    date_code: props.data.eleve?.date_code || '',
    telephone: props.data.telephone || '',
    media: props.data?.media || props.data?.profile_photo_url || null,
    sexe: props.data.sexe || null,
    date_naissance: props.data.date_naissance || null,
    postal: props.data.postal || '',
    ville: props.data.ville || '',
    password: props.data.password || '',
    password_confirmation: props.data.password_confirmation || '',
    role: props.data.role || 2,
});
const contractRef = ref(null);
const medias = useMedias();
const page = usePage();
const loading = ref(false);

const submit = () => {
    form.transform((data) => {
        if (data.media?.id) {
            data.media = data.media.path;
        }
        return data;
    });
    if (props.isEdit) {
        form.put(route(routes.users.eleve.update, props.data?.eleve?.id));
    } else {
        form.post(route(routes.users.eleve.store));
    }
    loading.value = true;
};
const checkPassword = () => {
    if (form.password !== form.password_confirmation) {
        form.errors.password_confirmation = "le mot de passe n'est pas confirmé";
    } else {
        form.errors.password_confirmation = '';
    }
};

const handleDownloadContract = () => {
    downloadPdf(contractRef.value, {
        name: 'contrat de formation',
        unit: 'px',
        x: 0,
        y: 0,
        width: 450,
        windowWidth: 900,
    });
};
const handleDeleteMedia = () => {
    if (props.isEdit && props.data.media?.id) {
        medias.deleteMediaModel(props.data.media.id, () => {
            form.media = null;
        });
    } else {
        form.media = null;
    }
};

page.actions = [
    {
        label: `${props.isEdit ? 'Modifier' : 'Ajouter'} eleve`,
        primary: true,
        disabled: computed(() => form.processing || !form.isDirty),
        loading: computed(() => form.processing),
        onClick: () => submit(),
    },
    {
        label: 'Rejeter',
        disabled: computed(() => form.processing || !form.isDirty),
        secondary: true,
        onClick: () => form.reset(),
    },
];

watch(form, (value) => {
    if (!props.uuid) {
        return;
    }
    const data = value.data();
    data.id = props.uuid;
    data.user = {
        profile_photo_url: page.user?.profile_photo_url,
    };
});
</script>
<template>
    <div>
        <MediaManager />
        <form class="grid lg:grid-cols-3 lg:gap-6" @submit.prevent="submit">
            <div class="lg:col-span-2 grid">
                <Box sectionned padding title="Géneral infos">
                    <div class="grid md:grid-cols-2 gap-4">
                        <TextField
                            id="firstName"
                            v-model="form.first_name"
                            :error="form.errors.first_name"
                            label="Prénom"
                            class="flex-1"
                            required
                        />
                        <TextField
                            id="lastName"
                            v-model="form.last_name"
                            :error="form.errors.last_name"
                            label="Nom"
                            class="flex-1"
                            required
                        />
                        <TextField
                            id="email"
                            v-model="form.email"
                            :error="form.errors.email"
                            label="Email"
                            required
                            type="email"
                        />

                        <TextField
                            id="tel"
                            v-model="form.telephone"
                            :error="form.errors.telephone"
                            label="Telephone"
                            type="tel"
                            mask="## ## ## ## ##"
                            :length="10"
                            required
                        />
                        <Listbox
                            v-model="form.sexe"
                            label="Genre"
                            :show-search="false"
                            :items="[
                                { value: 'Homme', name: 'Homme' },
                                { value: 'Femme', name: 'Femme' },
                            ]"
                            :error="form.errors.sexe"
                            class="w-full"
                            input-class="!rounded-lg bg-white shadow-none border !h-9"
                            placeholder="Eleve genre"
                        />
                        <Datepicker1
                            v-model="form.date_naissance"
                            :error="form.errors.date_naissance"
                            birthday
                            label="Date de naissance"
                        />
                        <TextField
                            id="ville"
                            v-model="form.ville"
                            class="flex-1"
                            :error="form.errors.ville"
                            label="Ville"
                            required
                        />
                        <TextField
                            id="postal"
                            v-model="form.postal"
                            :error="form.errors.postal"
                            label="Code postal"
                            class="flex-1"
                            required
                            type="number"
                        />
                    </div>
                    <TextField
                        id="adress"
                        v-model="form.adresse"
                        :error="form.errors.adresse"
                        label="Adresse"
                        :multiline="2"
                        required
                    />
                </Box>
                <Box sectionned padding title="Solde">
                    <div class="grid sm:grid-cols-2 gap-4">
                        <TextField
                            id="neph"
                            v-model="form.neph"
                            :error="form.errors.neph"
                            label="Neph"
                            mask="### ### ### ###"
                            required
                        />
                        <TextField
                            id="frequence"
                            v-model="form.frequence"
                            :error="form.errors.frequence"
                            label="Frequence"
                            required
                            type="number"
                        />

                        <TextField
                            id="How_know"
                            v-model="form.how_know"
                            :error="form.errors.how_know"
                            label="connus par"
                            required
                        />
                        <Datepicker v-model="form.date_code" :error="form.errors.date_code" label="Date de code" />
                        <div></div>
                        <div class="flex items-center justify-between">
                            <label class="block font-medium text-xs text-gray-600 mb-0.5 mt-1">Cpf </label>
                            <TabSwitch
                                v-model="form.is_cpf"
                                class="text-xs bg-gray-200"
                                size="sm"
                                :items="[
                                    { value: '0', name: 'Non' },
                                    { value: '1', name: 'Oui' },
                                ]"
                            />
                        </div>
                        <div class="flex items-center justify-between">
                            <label class="block font-medium text-xs text-gray-600 mb-0.5 mt-1">Type de boite </label>
                            <TabSwitch
                                v-model="form.boite_type"
                                class="text-xs bg-gray-200"
                                size="sm"
                                :items="[
                                    { value: '0', name: 'Manual' },
                                    { value: '1', name: 'Auto' },
                                ]"
                            />
                        </div>
                    </div>
                </Box>
                <Box sectionned padding title="Changement de mot de passe">
                    <TextField
                        id="password"
                        v-model="form.password"
                        :error="form.errors.password"
                        label="Mot de passe"
                        required
                        type="password"
                    />
                    <TextField
                        id="password_confirmation"
                        v-model="form.password_confirmation"
                        :error="form.errors.password_confirmation"
                        label="Mot de passe confirmation"
                        required
                        type="password"
                        @blur="checkPassword"
                    />
                </Box>
            </div>
            <div class="sticky top-6 h-fit">
                <Listbox
                    v-model="form.status"
                    :error="form.errors.status"
                    :show-search="false"
                    prefix="Statut"
                    :items="statusEnumToArray(UserStatusEnum)"
                    class="w-full mb-5"
                    input-class="!rounded-lg bg-white shadow-none border !h-9"
                    placeholder="Eleve status"
                />
                <Box sectionned>
                    <SingleImageField
                        :src="form.media?.path || form.media || null"
                        :error="form.errors.media"
                        @change="form.media = $event"
                        @delete="handleDeleteMedia"
                    />
                </Box>
                <Box v-if="isEdit" sectionned>
                    <EmptyState
                        :title="firstSession ? 'Contract' : 'Aucun contract'"
                        :class="['pb-10 pt-5', firstSession ? 'text-green-500' : '']"
                        :image="DocumentTextIcon"
                    >
                        <p class="mt-4 px-5">
                            {{
                                firstSession
                                    ? 'Voir le contract de premiere leçon'
                                    : "Vous n'avez pas encore le contrat pour cet eleve"
                            }}.
                        </p>
                        <Button v-if="firstSession" class="mt-4" success @click="handleDownloadContract">
                            Telecharger le contrat
                        </Button>
                    </EmptyState>
                    <div class="hidden">
                        <div v-if="firstSession" ref="contractRef" class="block text-[#333]">
                            <ContratFormationContent :first-session="firstSession" />
                        </div>
                    </div>
                </Box>
            </div>
        </form>
    </div>
</template>
