<script setup>
import {Head, useForm} from '@inertiajs/vue3';
import {AppLogo, Box, Button, TextField} from '@shared/components';
import { useHead } from '@vueuse/head';


defineProps({
    status: String,
});

const form = useForm({
    email: '',
});

const submit = () => {
    form.post(route('password.email'));
};

useHead({
  title: 'Mot de passe oublié',
  meta: [
    {
      name: 'title',
      content: 'Mot de passe oublié'
    }
  ]
})
</script>

<template>
    <!-- <Head title="Mot de passe oublié" /> -->

    <main class="h-screen flex-center flex-col">
        <AppLogo class="mb-10" />
        <Box padding sectionned class="max-w-md mx-auto w-full">
            <div class="text-sm text-gray-600">
                Vous avez oublié votre mot de passe ? Aucun problème. Communiquez-nous simplement votre adresse e-mail
                et nous vous enverrons par e-mail un lien de réinitialisation de mot de passe qui vous permettra d'en
                choisir un nouveau.
            </div>

            <div v-if="status" class="font-medium text-sm text-green-600">
                Un lien vous a été envoyé par mail
            </div>

            <form @submit.prevent="submit">
                <div>
                    <TextField
                        id="email"
                        v-model="form.email"
                        label="Email"
                        type="email"
                        class="mt-1 block w-full"
                        required
                        autofocus
                        autocomplete="username"
                        :error="form.errors.email ?'Un lien vous a été envoyé par mail':null"
                    />
                </div>

                <Button
                    primary
                    full
                    type="submit"
                    class="mt-6"
                    :loading="form.processing"
                    :disabled="form.processing || !form.isDirty"
                >
                    Lien de réinitialisation du mot de passe par e-mail
                </Button>
            </form>
        </Box>
    </main>
</template>
