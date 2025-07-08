<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { AppLogo } from '@shared/components';
import AuthenticationCard from '@shared/components/Old/AuthenticationCard.vue';
import Checkbox from '@shared/components/Old/Checkbox.vue';
import InputError from '@shared/components/Old/InputError.vue';
import InputLabel from '@shared/components/Old/InputLabel.vue';
import PrimaryButton from '@shared/components/Old/PrimaryButton.vue';
import TextInput from '@shared/components/Old/TextInput.vue';
import Button from '@shared/components/common/Button.vue'
import { useMutation } from '@shared/hooks';

// import route from 'ziggy-js';
// Initialiser le formulaire avec useMutation
const { form, mutate, errors, transform, mutating } = useMutation({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    city: '',
    terms: false,
    password: '',
    password_confirmation: '',
});

// Transformer les données avant de les envoyer
const submit = () => {
    transform((data) => ({
        ...data,
        terms: data.terms ? 'on' : '',  // Convertir "terms" en 'on' si true
    }));

    // Envoi des données via mutate
    mutate(route('backend.parents.store'))
        .then(() => {
            console.log('✅ Inscription réussie');
                           window.location.href = '/parent/backend/parent/dashboard';

            form.reset();  // Réinitialiser le formulaire après une inscription réussie
        })
        .catch(() => {
            console.log('❌ Erreurs lors de l\'inscription');
            // Tu peux aussi afficher ou traiter les erreurs ici si nécessaire
        });
};

const formatUrl = (href) => {
    if (!href.startsWith('http')) {
        return new URL(href, import.meta.env.VITE_APP_URL).href;
    }
    return href;
};
</script>

<template>
  <Head title="Créer un compte" />

  <div class="min-h-screen bg-gradient-to-r from-pink-50 to-blue-50 flex items-center justify-center px-4">
    <div class="w-full max-w-md bg-white p-8 rounded-xl shadow-lg animate-fade-in">
      
      <!-- Illustration -->
      <div class="mb-6 flex justify-center">
        <img src="@assets/images/register/register.jpg" alt="Inscription" class="h-28" />
      </div>

      <!-- Titre -->
      <h2 class="text-2xl font-bold text-center text-[#F51D65] mb-1">
        Créer votre compte
      </h2>

      <!-- Accroche -->
      <p class="text-center text-sm text-gray-600 mb-4">
        Donnez à votre enfant les clés de la réussite 🌟
      </p>


      <!-- Formulaire -->
      <form @submit.prevent="submit" class="space-y-5">
        <!-- Nom -->
        <div>
          <InputLabel for="last_name" value="Nom" />
          <TextInput id="last_name" v-model="form.last_name" type="text" class="mt-1 block w-full" required autocomplete="name" />
          <InputError class="mt-2" :message="form.errors.last_name" />
        </div>
            <!-- Prénom -->
         <div>
          <InputLabel for="first_name" value="Prénom" />
          <TextInput id="first_name" v-model="form.first_name" type="text" class="mt-1 block w-full" required autocomplete="name" />
          <InputError class="mt-2" :message="form.errors.first_name" />
        </div>
        <!-- Téléphone -->
        <div>
          <InputLabel for="phone" value="Numéro de téléphone" />
          <TextInput id="phone" v-model="form.phone" type="tel" class="mt-1 block w-full" required />
          <InputError class="mt-2" :message="form.errors.phone" />
        </div>

        <!-- Email -->
        <div>
          <InputLabel for="email" value="Email" />
          <TextInput id="email" v-model="form.email" type="email" class="mt-1 block w-full" required autocomplete="username" />
          <InputError class="mt-2" :message="form.errors.email" />
        </div>

        <!-- Ville -->
        <div>
          <InputLabel for="city" value="Ville" />
          <TextInput id="city" v-model="form.city" type="text" class="mt-1 block w-full" required />
          <InputError class="mt-2" :message="form.errors.city" />
        </div>

        <!-- Mot de passe -->
        <div>
          <InputLabel for="password" value="Mot de passe" />
          <TextInput id="password" v-model="form.password" type="password" class="mt-1 block w-full" required autocomplete="new-password" />
          <InputError class="mt-2" :message="form.errors.password" />
        </div>

        <!-- Confirmation mot de passe -->
        <div>
          <InputLabel for="password_confirmation" value="Confirmer le mot de passe" />
          <TextInput id="password_confirmation" v-model="form.password_confirmation" type="password" class="mt-1 block w-full" required autocomplete="new-password" />
          <InputError class="mt-2" :message="form.errors.password_confirmation" />
        </div>

        <!-- Conditions -->
        <div v-if="$page.props.jetstream?.hasTermsAndPrivacyPolicyFeature" class="text-sm text-gray-700 mt-2">
          <label class="flex items-start gap-2">
            <Checkbox id="terms" v-model:checked="form.terms" name="terms" required />
            <span>
              J'accepte les
              <a :href="route('terms.show')" class="text-blue-600 underline" target="_blank">Conditions d'utilisation</a>
              et la
              <a :href="route('policy.show')" class="text-blue-600 underline" target="_blank">Politique de confidentialité</a>.
            </span>
          </label>
          <InputError class="mt-2" :message="form.errors.terms" />
        </div>

        <!-- Footer -->
        <div class="flex flex-col items-center gap-3 mt-6">
          <Button type="submit" primary fullwidth :loading="mutating" class="w-full">
            Créer un compte
          </Button>
          <!-- ont-semibold text-blue-900 hover:underline -->



          <a :href="formatUrl(`/login`)" class="font-semibold text-blue-900 hover:underline text-sm hover:text-bleu-300 underline">
            Vous avez déjà un compte ? Se connecter
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}
</style>
