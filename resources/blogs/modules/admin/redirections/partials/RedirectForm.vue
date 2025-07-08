<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { Box, Listbox, TextField, Button } from '@shared/components';
import { routes } from '@blogs/routes';
defineEmits(['close']);
const props = defineProps({
    data: {
        type: [Object, null],
        default: () => ({}),
    },
    actions: Array,
    isEdit: Boolean,
});

const form = useForm({
    new_url: props.data?.new_url || '',
    old_url: props.data?.old_url || '',
    status_code: props.data?.status_code || 301,
});

const handleSubmit = () => {
    const onSuccess = () => {
        form.new_url = '';
        form.old_url = '';
        form.status_code = 301;
        form.clearErrors();
        form.defaults();
    };
    if (props.isEdit) {
        return form.post(route(routes.admin.redirections.update, props.data.id), { onSuccess });
    }
    form.post(route(routes.admin.redirections.store), { onSuccess });
};
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <Box sectionned padding class="mt-8 !mb-0" title="Redirection infos">
            <TextField
                id="old_url"
                v-model="form.old_url"
                label="URL source"
                class="max-w-md"
                type="text"
                placeholder="L'url relative que vous voulez rediriger"
                :error="form.errors.old_url"
            />
            <TextField
                id="new_url"
                v-model="form.new_url"
                label="URL cible"
                class="max-w-screen-md"
                type="text"
                placeholder="URL de destination de la redirection, ou auto-complétion basée sur nom de la publication ou son permalien"
                :error="form.errors.new_url"
            />
            <Listbox
                v-model="form.status_code"
                label="Statut de la redirection"
                class="max-w-[9rem]"
                :show-search="false"
                :items="[
                    { name: 'Code 301', value: 301 },
                    { name: 'Code 302', value: 302 },
                    { name: 'Code 303', value: 303 },
                ]"
                :error="form.errors.status_code"
            />
            <div class="flex gap-5">
                <Button secondary @click="$emit('close')">Fermer</Button>
                <Button :primary="isEdit" :success="!isEdit" submit :disabled="!form.isDirty">
                    {{ isEdit ? 'Modifier' : 'Ajouter' }} une redirection</Button
                >
            </div>
        </Box>
    </form>
</template>
