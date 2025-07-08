<script setup>
import {Head} from '@inertiajs/vue3';
import {ref} from 'vue';
import AuthenticationCardLogo from '@shared/components/Old/AuthenticationCardLogo.vue';
import {Button, Checkbox, TextField} from '@shared/components';
import {useMutation, useParams} from '@shared/hooks';
import { useHead } from '@vueuse/head';

defineProps({
    canResetPassword: Boolean,
    status: String,
});
const params = useParams();
const { form, mutate, errors, transform, mutating } = useMutation({
    email: params.e || '',
    password: params.p || '',
    remember: false,
});
const linkLogin=ref("login");
const submit = () => {
    transform((data) => ({
        ...data,
        remember: data.remember ? 'on' : '',
    }));
    mutate(route('login'))
        .then(() => {
            if (typeof window !== "undefined") {
                console.log("connexon reussi")
              window.location.href = '/login';
              }
        })
        .catch(() => {
            form.password = '';
        });
};

useHead({
  title: 'MoniteurIndependant',
  meta: [
    {
      name: 'title',
      content: 'MoniteurIndependant'
    }
  ]
})
</script>

<template>
    <!-- <Head title="MoniteurIndependant" /> -->
    <main class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100 h-screen">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <AuthenticationCardLogo class="mx-auto w-fit" />
            <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Connectez-vous à votre compte
            </h2>
        </div>
        <section class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <article class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-8">
                <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
                    {{ status }}
                </div>
                <form class="space-y-6" @submit.prevent="submit">
                    <TextField
                        v-model="form.email"
                        label="Adresse e-mail"
                        :error="errors.email"
                        type="email"
                        anme="email"
                        autocomplete="email"
                        class="mt-1 block w-full"
                        required
                    />
                    <TextField
                        id="password"
                        v-model="form.password"
                        label="Mot de passe"
                        :error="errors.password"
                        type="password"
                        class="mt-1 block w-full"
                        required
                        autocomplete="current-password"
                    />

                    <div class="flex items-center justify-between">
                        <Checkbox
                            id="remember-me"
                            v-model:checked="form.remember"
                            class="flex-1 text-sm"
                            label="Rappelez-vous de moi"
                        />

                        <div v-if="canResetPassword" class="text-sm leading-6">
                            <a :href="route('password.request')" class="btn btn-link btn-info">
                                Mot de passe oublié?
                            </a>
                        </div>
                    </div>
                    <Button type="submit" primary fullwidth :loading="mutating"> Se connecter </Button>
                </form>
            </article>
        </section>
    </main>
</template>
