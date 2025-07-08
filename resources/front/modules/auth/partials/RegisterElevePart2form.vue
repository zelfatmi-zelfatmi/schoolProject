<script setup>
import { reactive,ref } from 'vue';
import { Datepicker, Listbox, TextField ,TabSwitch} from '@shared/components';
import { useForm } from '@inertiajs/vue3';
import { routes } from '@front/routes';
import { checkPassword } from '@shared/helpers';
import { OrangeButton } from '@front/components';

const state = reactive({
    isTermConditionAccepted: false,
});
const form = useForm({
    // first_name: '',
    // last_name: '',
    email: '',
    adresse: '',
    // telephone: '',
    media: '',
    sexe: '',
    date_naissance: '',
    postal: '',
    ville: '',
    // is_cpf: 0,
    password: '',
    password_confirmation: '',
    neph:'',
    boite_type:'0'
});
const formatUrl = (href) => {
    if (!href.startsWith('http')) {
        return new URL(href, import.meta.env.VITE_APP_URL).href;
    }
    return href;
};
const linkRegister=formatUrl('inscription/eleve/next-step');
const handleSubmit = () => {
    form.post(linkRegister, {
        preserveScroll: true,
        onSuccess: () => {
            console.log("hello zainab")
            if (typeof window !== "undefined") {
               window.location.href = '/eleve';
                }

        },
        onError: () => {
            console.log("hello zainab test" ,error)
            form.password = '';
            form.password_confirmation = '';
        },
    });
};
</script>
<template>
        <div class="flex min-h-full flex-1 relative z-1 mix-blend-multiply">
            <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24 isolate">
                <div class="w-full max-w-md mx-auto"> 
                    <div class="mix-blend-overlay block text-black">
                        <h2 class="text-4xl font-bold l eading-9 tracking-tight">
    Complétez Vos Informations
</h2>


                        <p class="mt-2 text-sm leading-6 text-gray-500 flex justify-end">
    <span>Etape 3/3</span>
</p>

                    </div>       
    <div class="mt-6">
        <div>
            <form class="space-y-6" @submit.prevent="handleSubmit">
                <div>

                    <div class="grid grid-cols-1 gap-3">
                        <TextField v-model="form.email" :error="form.errors.email" name="email" label="Email" />
              
                    </div>

                    <div class="grid grid-cols-2 gap-3">
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
                        <Datepicker
                            v-model="form.date_naissance"
                            :error="form.errors.date_naissance"
                            label="Date de naissance"
                            birthday
                        />
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <TextField v-model="form.postal" :error="form.errors.postal" label="Postal" />
                        <TextField v-model="form.ville" :error="form.errors.ville" label="Ville" />
                    </div>
                    <TextField v-model="form.adresse" :multiline="2" :error="form.errors.adresse" label="Adresse" />
<div class="grid grid-cols-2 gap-3">
    <TextField v-model="form.neph" :error="form.errors.neph" label="Neph" />

    <div class="flex flex-col justify-end">
        <label class="block font-medium text-xs text-gray-600 mb-1">Type de boîte</label>
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


                            <!-- <div class="grid grid-cols-2 gap-3">
                        <TextField v-model="form.neph" :error="form.errors.neph" label="Neph" />
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
                    </div> -->

                    <div class="grid md:grid-cols-2 gap-3">
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
                            @blur="checkPassword(form)"
                        />
                    </div>
                </div>
                <div class="block text-sm -mb-1">
                    * En cliquant sur 'S'INSCRIRE MAINTENANT', j'accepte que MoniteurIndependant collecte et traite mes données conformément à sa politique de confidentialité
                </div>
                <OrangeButton
                    class="mt-6 w-full text-center tracking-wide"
                    type="submit"
                    :disabled="!form.isDirty"
                >
                    S’inscrire maintenant
                </OrangeButton>

            </form>
        </div>

        <div class="mt-6">
            <div class="relative">
                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                    <div class="w-full border-t border-gray-200" />
                </div>
                <div class="relative flex justify-center text-sm font-medium leading-6">
                    <span class="bg-white px-6 text-gray-900"> Ou connectez-vous avec </span>
                </div>
            </div>

            <a
                href="/auth/google/redirect"
                class="flex w-full items-center justify-center gap-3 rounded-full mt-6 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 t-3 focus-visible:ring-transparent"
            >
                <svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                    <path
                        d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                        fill="#EA4335"
                    />
                    <path
                        d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                        fill="#4285F4"
                    />
                    <path
                        d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                        fill="#FBBC05"
                    />
                    <path
                        d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                        fill="#34A853"
                    />
                </svg>
                <span class="text-sm font-semibold leading-6">Google</span>
            </a>
        </div>
    </div>
    </div>
</div> </div>
</template>
