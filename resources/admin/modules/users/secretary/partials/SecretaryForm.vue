<script setup>
import {computed, onMounted, ref} from 'vue';
import {useForm} from '@inertiajs/vue3';
import {Box, Listbox, MediaManager, SingleImageField, TextField, useMedias} from '@shared/components';
import {routes} from '@admin/routes';
import {usePage} from '@shared/stores';
import {statusEnumToArray} from '@shared/hooks';
import {UserStatusEnum} from '@shared/constants/index.js';

const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
    actions: Array,
    isEdit: Boolean,
    uuid: String,
});
const form = useForm({
    first_name: props.data.first_name || '',
    last_name: props.data.last_name || '',
    email: props.data.email || '',
    status: props.data.status || 1,
    // adresse: props.data.adresse || '',
    telephone: props.data.telephone || '',
    media: props.data?.media || props.data?.profile_photo_url || null,
    // sexe: 'Homme',
    // date_naissance: props.data.date_naissance || null,
    // postal: props.data.postal || '',
    // ville: props.data.ville || '',
    password: props.data.password || '',
    password_confirmation: props.data.password_confirmation || '',
    // role: props.data.role || 1,
});
const minDate = ref(null);
const maxDate = ref(null);

const medias = useMedias();
const page = usePage();
const loading = ref(false);

onMounted(() => {
    // Calculate the minimum date as 100 years ago from the current date
    const currentDate = new Date();
    const calculatedMinDate = new Date(currentDate.getFullYear() - 100, currentDate.getMonth(), currentDate.getDate());
    const calculatedMaxDate = new Date(currentDate.getFullYear() - 16, currentDate.getMonth(), currentDate.getDate());

    minDate.value = calculatedMinDate.toISOString().split('T')[0];
    maxDate.value = calculatedMaxDate.toISOString().split('T')[0];
});

const submit = () => {
    form.transform((data) => {
        if (data.media?.id) {
            data.media = data.media.path;
        }
        return data;
    });
    if (props.isEdit) {
        
        
        console.log(route(routes.users.secretary.update, props.data.id));

        console.log('ID de l’utilisateur à modifier :', props.data.id);

        form.put(route(routes.users.secretary.update, props.data.id));
    } else {
        form.post(route(routes.users.secretary.store));
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
        label: `${props.isEdit ? 'Modifier' : 'Ajouter'} Secrétaire`,
        primary: true,
        disabled: computed(() => form.processing || !form.isDirty),
        loading: computed(() => form.processing),
        onClick: () => submit(),
    },
    {
        label: 'Annuler',
        disabled: computed(() => form.processing || !form.isDirty),
        secondary: true,
        onClick: () => form.reset(),
    },
];
</script>
<template>
    <div>
        <MediaManager @submit="form.media = $event" />
        <form class="grid lg:grid-cols-3 py-10 lg:gap-10" @submit.prevent="submit">
            <article class="lg:col-span-2 grid">
                <Box sectionned padding title="Secrétaire infos">
                    <div class="grid sm:grid-cols-2 gap-4">
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
                            id="tel"
                            v-model="form.telephone"
                            :error="form.errors.telephone"
                            label="Telephone"
                            required
                            type="tel"
                        />

                        <Listbox
                            v-model="form.status"
                            label="Status"
                            :items="statusEnumToArray(UserStatusEnum)"
                            class="w-full"
                            input-class="!rounded-lg bg-white shadow-none border !h-9"
                            placeholder="Secrétaire status"
                        />
                    </div>
                </Box>
                <Box padding sectionned title="Changer Mot de passe">
                    <div class="flex gap-4">
                        <TextField
                            id="password"
                            v-model="form.password"
                            :error="form.errors.password"
                            label="Mot de passe"
                            required
                            type="password"
                            class="flex-1"
                        />
                        <TextField
                            id="password_confirmation"
                            v-model="form.password_confirmation"
                            :error="form.errors.password_confirmation"
                            label="Mot de passe confirmation"
                            required
                            type="password"
                            class="flex-1"
                            @blur="checkPassword"
                        />
                    </div>
                </Box>
            </article>
            <article class="sticky top-5 h-fit">
                <Box sectionned padding title="Media">
                    <SingleImageField
                        :error="form.errors.media"
                        :src="form.media?.path || form.media || null"
                        @delete="handleDeleteMedia"
                    />
                </Box>
            </article>
        </form>
    </div>
</template>
