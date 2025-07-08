<script setup>
import { reactive } from 'vue';
import { OrangeButton } from '@front/components';
import { TextField } from '@shared/components';
import { RadioGroup, RadioGroupOption } from '@headlessui/vue';
import { useForm } from '@inertiajs/vue3';
import { routes } from '@front/routes';
import MoniteurPendingAccountNotifyModal from './MoniteurPendingAccountNotifyModal.vue';

const state = reactive({
    isTermContactAccepted: false,
    isTermConditionAccepted: false,
});

const form = useForm({
    first_name: '',
    last_name: '',
    email: '',
    adresse: '',
    zone_souhaitee: '',
    telephone: '',
    date_naissance: '',
    postal: '',
    experience: '',
    is_experienced: true,
    dernier_experience: '',
    details_experience: '',
});

const handleSubmit = () => {
    form.post(route(routes.register.moniteur.store), {
        preserveScroll: true,
        onSuccess: () => {
            form.reset();
        },
        onError: () => {
            form.password = '';
            form.password_confirmation = '';
        },
    });
};
</script>
<template>
    <article class="text-black py-10 md:py-20 flex-1 md:-mb-[23rem]">
        <form
            class="bg-white rounded-[30px] p-4 md:p-8 shadow-box-2 flex flex-col gap-7 relative z-1"
            @submit.prevent="handleSubmit">
            <p class="leading-8 font-medium text-lg">Informations personnelles</p>
            <div class="grid md:grid-cols-2 gap-4">
                  <TextField
                    v-model="form.first_name"
                    name="first_name"
                    :error="form.errors.last_name"
                    input-class="form-control-new"
                    placeholder="Nom"
                /> 
                <TextField
                    v-model="form.last_name"
                    name="last_name"
                    :error="form.errors.last_name"
                    input-class="form-control-new"
                    placeholder="Prénoms"
                />
                <TextField
                    v-model="form.email"
                    name="email"
                    class="md:col-span-2"
                    :error="form.errors.email"
                    input-class="form-control-new"
                    placeholder="Adresse e-mail"
                />
                <TextField
                    v-model="form.telephone"
                    name="telephone"
                    mask="## ## ## ## ##"
                    :error="form.errors.telephone"
                    input-class="form-control-new"
                    placeholder="Téléphone"
                />
                <TextField
                    v-model="form.postal"
                    :error="form.errors.postal"
                    name="postal"
                    input-class="form-control-new"
                    placeholder="Code postal"
                />
                <TextField
                    v-model="form.zone_souhaitee"
                    name="adresse"
                    class="md:col-span-2"
                    :error="form.errors.zone_souhaitee"
                    input-class="form-control-new"
                    placeholder="Zone conduite souhaitée"
                /> 
            </div>
            <p class="leading-5 font-medium text-lg">Aves-vous des expériences en tant que moniteur?</p>
            <RadioGroup v-model="form.is_experienced" class="flex gap-6">
                <RadioGroupOption v-slot="{ checked }" :value="true" class="flex items-center gap-3">
                    <span
                        :class="[
                            checked ? 'border-[5px] border-primary' : 'border border-[#D9D9D9]',
                            'w-4 h-4 rounded-full bg-white',
                        ]"
                    ></span>
                    <span>Oui</span>
                </RadioGroupOption>
                <RadioGroupOption v-slot="{ checked }" :value="false" class="flex items-center gap-3">
                    <span
                        :class="[
                            checked ? 'border-[5px] border-primary' : 'border border-[#D9D9D9]',
                            'w-4 h-4 rounded-full bg-white',
                        ]"
                    ></span>
                    <span>Non</span>
                </RadioGroupOption>
            </RadioGroup>
            <div v-if="form.is_experienced" class="grid gap-4">
                <!-- <TextField
                    v-model="form.dernier_experience"
                    :error="form.errors.dernier_experience"
                    input-class="form-control-new"
                    placeholder="Dernière expérience"
                />
                <TextField
                    v-model="form.details_experience"
                    :error="form.errors.details_experience"
                    input-class="form-control-new"
                    :multiline="2"
                    placeholder="Veuillez décrire ici vos expériences récentes"
                /> -->
            </div>
            <div class="flex gap-3">
                <input
                    id="term_contact"
                    v-model="state.isTermContactAccepted"
                    type="checkbox"
                    class="rounded text-primary focus:outline-none focus:right-0"
                />
                <label class="-mt-0.5" for="term_contact"
                    >J’accepte formellement que mes informations soient utilisées par Moniteur Indépendant pour me
                    contacter.</label
                >
            </div>
            <div class="flex gap-3">
                <input
                    id="term_condition"
                    v-model="state.isTermConditionAccepted"
                    type="checkbox"
                    class="rounded text-primary focus:outline-none focus:right-0"
                />
                <label class="-mt-0.5" for="term_condition">
                    J’accepte que Moniteur Independant stocke et traite mes données personnelles. (Voir
                    <span class="text-primary cursor-pointer hover:underline">Politique de confidentialité</span>)
                </label>
            </div>
            <OrangeButton
                class="mt-6 w-fit tracking-wide"
                type="submit"
                :disabled="!state.isTermContactAccepted || !state.isTermConditionAccepted || !form.isDirty"
            >
                S’inscrire maintenant
            </OrangeButton>
        </form>
        <MoniteurPendingAccountNotifyModal v-model="form.wasSuccessful" />
    </article>
</template>

<style>
.form-control-new {
    @apply py-3 px-5 placeholder:text-[#A2AEB8] min-h-12 md:min-h-[56px] border border-[#CFCFCF] rounded-[14px] w-full;
}
</style>
