<script setup>
import { Listbox, TextField, Datepicker } from '@shared/components';
import { routes } from '@admin/routes';
import { useForm } from '@inertiajs/vue3';
import { computed } from 'vue';
import { InlineActions, ItemAvatar } from '@common/components';
import { CPFStatus } from '@common/constants';
import moment from 'moment-timezone';
import { XMarkIcon } from '@heroicons/vue/20/solid';
const emit = defineEmits(['close']);
const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
    isEdit: Boolean,
    uuid: String,
});

const form = useForm({
    date_verif: props.data?.date_verif || '',
    comment: props.data?.comment || '',
    status: Number(props.data?.status) || '',
});
const submit = () => {
    form.put(route(routes.cpf.update, props.data.id), {
        preserveScroll: true,
        onSuccess: onClose,
    });
};
const onClose = () => {
    form.reset();
    emit('close');
};
const actions = computed(() => [
    {
        label: 'Enregister CPF',
        primary: true,
        submit: true,
        disabled: form.processing || !form.isDirty,
        loading: form.processing,
        onClick: submit,
    },
    {
        label: 'Rejeter',
        disabled: form.processing,
        secondary: true,
        onClick: onClose,
    },
]);
</script>

<template>
    <form class="flex flex-col h-full" @submit.prevent="submit">
        <article class="px-4 py-3 bg-white shadow-down">
            <div class="flex justify-between items-center">
                <h2 class="text-xl font-bold">Modification de CPFs</h2>
                <XMarkIcon class="h-7 w-7 p-0.5 text-gray-500 cursor-pointer btn-m" @click="onClose" />
            </div>
            <small>{{ `Créé le ${moment(data.created_at).format('DD/MM/YYYY')}` }}</small>
        </article>
        <article v-if="data.eleve?.user" class="px-4 pt-3 bg -white">
            <ItemAvatar
                is-mobile
                class="bg-slate-200 p-2 rounded-xl"
                :title="data.eleve.user.name"
                :src="data.eleve.user.media || data.eleve.user.profile_photo_url"
                :content="data.eleve.user.email"
            />
        </article>
        <article class="flex-1 p-4 flex flex-col gap-5">
            <Listbox
                v-model="form.status"
                :items="Object.values(CPFStatus)"
                :error="form.errors.status"
                :show-search="false"
                :keys="['name', 'id']"
                class="w-full"
                input-class="!rounded-lg bg-white shadow-none border !h-9"
                label="Statut"
                placeholder="Choisir une statut"
            />

            <Datepicker v-model="form.date_verif" :error="form.errors.date_verif" label="Date verification" />
            <div>
                <TextField v-model="form.comment" :multiline="5" label="Commentaire" :errors="form.errors.comment" />
            </div>
        </article>
        <InlineActions :actions="actions" class="px-4 py-3 bg-white shadow-up" />
    </form>
</template>
