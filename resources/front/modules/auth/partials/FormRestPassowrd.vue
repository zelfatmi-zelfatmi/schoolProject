<script setup>
import {useForm} from '@inertiajs/vue3';
import {AppLogo, Box, Button, TextField} from '@shared/components';

const props = defineProps({
    email: Object,
    token: String,
});
const form = useForm({
    token: props.token,
    email: props.email,
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('password.update'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>
<template>
    <form class="h-screen flex-col flex-center" @submit.prevent="submit">
        <AppLogo class="mb-10" />
        <Box padding sectionned class="max-w-md mx-auto w-full">
            <TextField
                id="email"
                v-model="form.email"
                label="E-mail"
                type="email"
                class="bg-slate-200 p-2 rounded-md"
                required
                disabled
                :error="form.errors.email"
            />

            <TextField
                id="password"
                v-model="form.password"
                label="Mot de passe"
                type="password"
                class="mt-1 block w-full"
                required
                autocomplete="new-password"
                :error="form.errors.password"
            />
            <TextField
                id="password_confirmation"
                v-model="form.password_confirmation"
                label="Confirmer le mot de passe"
                type="password"
                class="mt-1 block w-full"
                required
                autocomplete="new-password"
                :error="form.errors.password_confirmation"
            />
            <Button
                primary
                full
                submit
                :loading="form.processing"
                :disabled="form.processing || !form.isDirty"
                class="mt-6"
            >
                Difinir le mot de passe
            </Button>
        </Box>
    </form>
</template>
