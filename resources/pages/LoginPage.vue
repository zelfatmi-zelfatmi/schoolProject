<template>
<!-- Image de fond (remontée davantage) -->
<img
  src="@assets/images/logo/illustration-ecole.jpg"
  alt="Online Education"
  class="absolute inset-0 w-full h-full object-cover object-[top_-150px] z-0"
/>

<!-- Overlay flouté -->
<div class="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10"></div>

<!-- Bloc de connexion décalé un peu vers le bas -->
<div class="relative z-20 flex items-center justify-center min-h-screen px-4 pt-24">
  <div class="bg-white bg-opacity-80 backdrop-blur-sm shadow-xl p-8 rounded-xl max-w-md w-full">
    <h2 class="text-2xl font-bold text-center text-blue-700">Connexion à votre espace</h2>
    <p class="text-center text-sm text-gray-600 mb-6">Soutien scolaire en ligne</p>

    <!-- Formulaire -->
      <form @submit.prevent="submit" class="space-y-5">
        <TextField
          v-model="form.email"
          label="Adresse e-mail"
          :error="errors.email"
          type="email"
          required
          class="w-full"
        />
        <TextField
          v-model="form.password"
          label="Mot de passe"
          :error="errors.password"
          type="password"
          required
          class="w-full"
        />

        <div class="flex items-center justify-between text-sm">
          <Checkbox
            v-model:checked="form.remember"
            label="Se souvenir de moi"
         class="flex-1 text-sm"
          />
            <div  class="text-sm leading-6">
          <a href="/forgot-password" class="btn btn-link btn-info">
            Mot de passe oublié ?
          </a>
           </div>
        </div>

        <Button
          type="submit" primary fullwidth
          :loading="mutating"
        >
          Se connecter
        </Button>
        <p class="text-center text-sm text-gray-700 mt-4">
  Vous n’avez pas encore de compte ?
  <a :href="formatUrl(`/register`)" class="text-[#F51D65] font-semibold hover:underline">
    Inscrivez-vous
  </a>
</p>
      </form>
  </div>
</div>

</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import AuthenticationCardLogo from '@shared/components/Old/AuthenticationCardLogo.vue';
import TextField from '@shared/components/forms/TextField.vue'
import Checkbox from '@shared/components/forms/Checkbox.vue'
import Button from '@shared/components/common/Button.vue'
import { useMutation, useParams } from '@shared/hooks';
const formatUrl = (href) => {
    if (!href.startsWith('http')) {
        return new URL(href, import.meta.env.VITE_APP_URL).href;
    }
    return href;
};

const params = useParams();
defineProps({
    canResetPassword: Boolean,
    status: String,
});
const { form, mutate, errors, transform, mutating } = useMutation({
    email: params.e || '',
    password: params.p || '',
    remember: false,
})

const login = async () => {
    try {
        await axios.get('/sanctum/csrf-cookie')
        await axios.post('/api/login', { email: email.value, password: password.value })
        alert('Connexion réussie !')
    } catch (err) {
        error.value = 'Email ou mot de passe incorrect.'
    }
}
</script>
 