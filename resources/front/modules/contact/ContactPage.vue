<script setup>
import { Head, useForm } from '@inertiajs/vue3';
import { TextField } from '@shared/components';
import { OrangeButton } from '@front/components';
import { routes } from '@front/routes';
import { useHead } from '@vueuse/head';

useHead({
  title: 'Contact - Moniteur indépendant',
  meta: [
    {
      name: 'title',
      content: 'Contact - Moniteur indépendant'
    }
  ]
})
const form = useForm({
    prenom: '',
    nom: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
});
const handleSendMail = () => {
    form.post(route(routes.contact.send), {
        onSuccess: () => {
            form.reset();
        },
    });
};
</script>

<template>
    <!-- <Head title="Contactez-nous " /> -->
    <div class="font-sans text-gray-900 antialiased flex max-md:flex-col">
        <div class="md:w-1/3 bg-black text-white flex flex-col gap-2 md:gap-5 px-10 max-md:py-10">
            <h2 class="text-xl md:text-4xl font-bold md:mt-20">Vous êtes éligible au CPF ?</h2>
            <h2 class="text-xl md:text-4xl font-bold">Vous avez besoin d'aide ?</h2>
            <p class="md:text-xl font-semibold">Remplissez la fiche de renseignement ci dessous.</p>
        </div>
        <div class="isolate px-6 py-14 sm:py-24 lg:px-8 flex-1">
            <div
                v-if="form.wasSuccessful"
                role="alert"
                class="rounded border-s-4 border-green-500 bg-green-50 p-4 md:-mt-10 mb-10"
            >
                <strong class="block font-medium text-green-800"> Votre message a bien été envoyé </strong>

                <p class="mt-2 text-sm text-green-700">Nous vous recontacterons dans les plus brefs délais.</p>
            </div>
            <form class="max-w-xl mx-auto" @submit.prevent="handleSendMail">
                <div class="mx-auto max-w-2xl text-center">
                    <h2 class="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                        Contactez nous
                    </h2>
                    <p class="mt-2 text-lg/8 text-gray-600">Remplissez le formulaire et nous vous recontactons.</p>
                </div>
                <div class="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                    <TextField id="first-name" v-model="form.prenom" label="Prénom" :error="form.errors.prenom" />
                    <TextField id="last-name" v-model="form.nom" label="Nom" :error="form.errors.nom" />

                    <div class="sm:col-span-2">
                        <TextField id="email" v-model="form.email" label="Email" :error="form.errors.email" />
                    </div>
                    <div class="sm:col-span-2">
                        <TextField id="phone" v-model="form.phone" label="Télèphone" :error="form.errors.phone" />
                    </div>
                    <div class="sm:col-span-2">
                        <TextField id="subject" v-model="form.subject" label="Sujet" :error="form.errors.subject" />
                    </div>
                    <div class="sm:col-span-2">
                        <TextField
                            id="message"
                            v-model="form.message"
                            label="Un mot à rajouter ?"
                            :error="form.errors.message"
                            :multiline="6"
                            placeholder="Dites-nous ce que nous pouvons faire pour vous!"
                        />
                    </div>
                </div>
                <div class="mt-10">
                    <OrangeButton type="submit" class="w-full" :loading="form.processing">
                        Envoyer message
                    </OrangeButton>
                </div>
            </form>
        </div>
    </div>
</template>
