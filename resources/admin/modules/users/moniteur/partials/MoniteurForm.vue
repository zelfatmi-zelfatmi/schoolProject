<script setup>
import {computed, reactive} from 'vue';
import {useForm} from '@inertiajs/vue3';
import {
    Box,
    Button,
    Datepicker,
    Datepicker1,
    Listbox,
    MediaManager,
    SingleImageField,
    TabSwitch,
    TextField,
    useMedias,
} from '@shared/components';
import {routes} from '@admin/routes';
import {usePage, useToast} from '@shared/stores';
import {statusEnumToArray} from '@shared/hooks';
import {UserStatusEnum} from '@shared/constants';
import {InlineActions, ZoneLieu} from '@common/components';
import {MinusIcon} from '@heroicons/vue/20/solid';

const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
    actions: Array,
    isEdit: Boolean,
    uuid: String,
});
const toast = useToast();
const lieux = reactive({
    selected: null,
    clear: 1,
});
const form = useForm({
    first_name: props.data.first_name || '',
    last_name: props.data.last_name || '',
    email: props.data.email || '',
    status: props.data.status || 1,
    adresse: props.data.adresse || '',
    experience: props.data.moniteur?.details?.experience || 0,
    dernier_experience: props.data.moniteur?.details?.dernier_experience || '',
    details_experience: props.data.moniteur?.details?.details_experience || '',
    telephone: props.data.telephone || '',
    media: props.data?.media || props.data?.profile_photo_url || null,
    sexe: props.data.sexe || null,
    date_naissance: props.data?.date_naissance || null,
    postal: props.data.postal || '',
    ville: props.data.ville || '',
    password: props.data.password || '',
    password_confirmation: props.data.password_confirmation || '',
    role: props.data.role || 3,
    lieux: props.data.moniteur?.lieux || [],
    departement: props.data.moniteur?.details?.departement || '',
    numero_autorisation: props.data.moniteur?.details?.numero_autorisation || '',
    tarif_car: props.data.moniteur?.details?.tarif_car || null,
    tarif_enseignement: props.data.moniteur?.details?.tarif_enseignement || null,
    is_auto: props.data.moniteur?.details?.is_auto || false,
});

const medias = useMedias();
const page = usePage();

const submit = () => {
    form.transform((data) => {
        if (data.media?.id) {
            data.media = data.media.path;
        }
        data.lieux = data.lieux.map((item) => item.id);
        return data;
    });

    if (props.isEdit) {
        return form.put(route(routes.users.moniteur.update, props.data?.moniteur?.id));
    }
    form.post(route(routes.users.moniteur.store));
};
const checkPassword = () => {
    if (form.password !== form.password_confirmation) {
        form.errors.password_confirmation = "le mot de passe n'est pas confirmé";
    } else {
        form.errors.password_confirmation = '';
    }
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
const handleSelectLieu = (value) => {
    lieux.selected = value;
};
const handleAddLieu = () => {
    if (!lieux.selected) {
        return;
    }
    const item = form.lieux.find((item) => item.id === lieux.selected.id);
    if (item) {
        toast.notify({ type: 'error', title: item.name + ' est deja selectioné' });
        return;
    }
    // lieux.selected = value;
    form.lieux.push(lieux.selected);
    lieux.clear += 1;
    lieux.selected = null;
};
page.actions = [
    {
        label: `${props.isEdit ? 'Modifier' : 'Ajouter'} moniteur`,
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
</script>
<template>
    <div>
        <MediaManager @submit="form.media = $event" />
        <form class="grid lg:grid-cols-3 gap-6 max-md:mt-5" @submit.prevent="submit">
            <article class="lg:col-span-2 grid">
                <Box sectionned padding title="Informations personnel">
                    <section class="grid sm:grid-cols-2 gap-4">
                        <TextField
                            id="firstName"
                            v-model="form.first_name"
                            :error="form.errors.first_name"
                            label="Prenom"
                            required
                        />
                        <TextField
                            id="lastName"
                            v-model="form.last_name"
                            :error="form.errors.last_name"
                            label="Nom "
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
                            id="adress"
                            v-model="form.adresse"
                            :error="form.errors.adresse"
                            label="Adress"
                            required
                        />
                        <TextField
                            id="tel"
                            v-model="form.telephone"
                            :error="form.errors.telephone"
                            label="Telephone"
                            required
                            type="tel"
                            mask="33 ## ## ## ## ##"
                            :length="13"
                        />
                        <Listbox
                            v-model="form.sexe"
                            label="Genre"
                            :error="form.errors?.sexe"
                            :items="[
                                { value: 'Homme', name: 'Homme' },
                                { value: 'Femme', name: 'Femme' },
                            ]"
                            class="w-full"
                            :show-search="false"
                            required
                            input-class="!rounded-lg bg-white shadow-none border !h-9"
                            placeholder="Moniteur genre"
                        />
                        <Datepicker1
                            v-model="form.date_naissance"
                            :error="form.errors.date_naissance"
                            birthday
                            label="Date de naissence"
                        />
                        <TextField id="ville" v-model="form.ville" :error="form.errors.ville" label="Ville" required />
                        <TextField
                            id="postal"
                            v-model="form.postal"
                            :error="form.errors.postal"
                            label="Code postal"
                            required
                            type="number"
                        />

                        <TextField
                            id="experienc"
                            v-model="form.experience"
                            :error="form.errors.experience"
                            label="Experience"
                            required
                            type="number"
                        />
                        <TextField
                            id="last_experience"
                            v-model="form.dernier_experience"
                            :error="form.errors.dernier_experience"
                            label="Dernier experience"
                            required
                        />

                        <div class="sm:col-span-2">
                            <div class="sm:col-span-2">
                                <TextField
                                    id="details_experience"
                                    v-model="form.details_experience"
                                    :error="form.errors.details_experience"
                                    :multiline="3"
                                    label="Details d'experience"
                                    required
                                />
                            </div>
                            <div class="flex items-center justify-between">
                                <label class="block font-medium text-xs text-gray-600 mb-0.5 mt-1">Boite </label>
                                <TabSwitch
                                    v-model="form.is_auto"
                                    class="text-xs bg-gray-200"
                                    size="sm"
                                    :items="[
                                        { value: false, name: 'Manuel' },
                                        { value: true, name: 'Auto' },
                                    ]"
                                />
                            </div>
                        </div>
                    </section>
                </Box>
                <Box sectionned padding title="Autres infos">
                    <div class="grid grid-cols-2 gap-4">
                        <TextField
                            id="departement"
                            v-model="form.departement"
                            :error="form.errors.departement"
                            label="Departement"
                            class="flex-1"
                        />
                        <TextField
                            id="numero_autorisation"
                            v-model="form.numero_autorisation"
                            :error="form.errors.numero_autorisation"
                            label="Numero d'autorisation"
                            mask="A ## ### #### #"
                            avoid-replace
                            input-class="appearance-none form-control"
                            class="flex-1"
                        />
                        <TextField
                            id="tarif_car"
                            v-model="form.tarif_car"
                            :error="form.errors.tarif_car"
                            label="Tarif car"
                            type="number"
                            input-class="appearance-none form-control"
                            suffix="€"
                            class="flex-1"
                        />
                        <TextField
                            id="tarif_enseignement"
                            v-model="form.tarif_enseignement"
                            :error="form.errors.tarif_enseignement"
                            label="Tarif enseignement"
                            type="number"
                            input-class="appearance-none form-control"
                            suffix="€"
                            class="flex-1"
                        />
                    </div>
                </Box>
                <Box sectionned padding title="Zone & Lieux">
                    <ul class="flex flex-col overflow-y-auto max-h-80 divide-y bg-gray-80 shadow-sm rounded-2xl">
                        <li
                            v-for="(lieu, idx) in form.lieux"
                            :key="lieu.id"
                            class="flex gap-2 justify-between font-semibold p-1.5"
                        >
                            <span>{{ lieu.name }}</span>

                            <MinusIcon
                                class="hover:text-red-600 flex-center w-6 h-6 p-0.5 rounded-full hover:bg-red-100 btn-hover"
                                @click="form.lieux.splice(idx, 1)"
                            />
                        </li>
                    </ul>
                    <div class="flex gap-2 w-full items-center">
                        <ZoneLieu :key="lieux.clear" class="contents" @change:full="handleSelectLieu" />
                        <Button dark :disabled="!lieux.selected" class="!h-8" @click="handleAddLieu">Ajoute</Button>
                    </div>
                </Box>
                <Box padding sectionned title="Changer Mot de passe">
                    <div class="flex gap-4">
                        <TextField
                            id="password"
                            v-model="form.password"
                            :error="form.errors.password"
                            label="Mot de passe"
                            type="password"
                            class="flex-1"
                        />
                        <TextField
                            id="password_confirmation"
                            v-model="form.password_confirmation"
                            :error="form.errors.password_confirmation"
                            label="Mot de passe confirmation"
                            type="password"
                            class="flex-1"
                            @blur="checkPassword"
                        />
                    </div>
                </Box>
                <InlineActions :actions="page.actions" />
            </article>
            <article class="sticky top-12 h-fit">
                <Box sectionned padding title="Media">
                    <Listbox
                        v-model="form.status"
                        label="Status"
                        :items="statusEnumToArray(UserStatusEnum)"
                        class="w-full"
                        :show-search="false"
                        input-class="!rounded-lg bg-white shadow-none border !h-9"
                        placeholder="Moniteur status"
                    />
                    <SingleImageField
                        :error="form.errors.media"
                        :src="form.media?.id ? form.media?.path : form.media || null"
                        @delete="handleDeleteMedia"
                    />
                </Box>
            </article>
        </form>
    </div>
</template>
