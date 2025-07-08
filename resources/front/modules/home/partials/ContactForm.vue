<template>
  <form @submit.prevent="handleSendMail" 
        class="flex flex-col p-10 bg-white rounded-[30px] shadow-lg w-full max-w-lg mx-auto text-left">

    <!-- Titre avec surlignage jaune -->
    <h3 class="relative text-3xl font-bold leading-snug text-zinc-800 mb-8 w-full">
   <span class="relative block w-full">
      <span class="absolute left-0 bottom-[-4px] w-full h-[14px] bg-yellow-300 z-0"></span>
      <span class="relative z-10 text-[28px] font-medium leading-7 tracking-tight text-black block">
         On t'appelle et on t'explique tout !
      </span>
   </span>
</h3>


    <!-- Champs du formulaire -->
<div class="flex flex-col gap-4">
  <div>
    <input v-model="form.name" type="text" placeholder="Nom" class="input-field" />
  </div>

  <div>
    <input v-model="form.firstName" type="text" placeholder="Prénoms" class="input-field" />
  </div>

  <div>
    <input v-model="form.phone" type="tel" placeholder="Téléphone" class="input-field" />
    <p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</p>
  </div>

  <div>
    <input v-model="form.city" type="text" placeholder="Ville" class="input-field" />
    <p v-if="errors.city" class="text-red-500 text-sm mt-1">{{ errors.city }}</p>
  </div>
</div>


    <!-- Radios "Avez-vous le code ?" -->
    <fieldset class="mt-6">
      <legend class="text-lg font-semibold text-zinc-800 mb-3">Avez-vous le code ?</legend>
      <div class="flex space-x-6">
        <label class="flex items-center space-x-2">
          <input type="radio" v-model="form.hasCode" :value="true" class="form-radio" />
          <span class="text-lg font-medium">Oui</span>
        </label>
        <label class="flex items-center space-x-2">
          <input type="radio" v-model="form.hasCode" :value="false" class="form-radio" />
          <span class="text-lg font-medium">Non</span>
        </label>
      </div>
    </fieldset>

    <!-- Radios "Boîte de vitesse" -->
    <fieldset class="mt-6">
      <legend class="text-lg font-semibold text-zinc-800 mb-3">Vous voulez conduire en :</legend>
      <div class="flex space-x-6">
        <label class="flex items-center space-x-2">
          <input type="radio" v-model="form.transmission" value="manual" class="form-radio" />
          <span class="text-lg font-medium">Boîte Manuel</span>
        </label>
        <label class="flex items-center space-x-2">
          <input type="radio" v-model="form.transmission" value="automatic" class="form-radio" />
          <span class="text-lg font-medium">Boîte automatique</span>
        </label>
      </div>
    </fieldset>

    <!-- Bouton de soumission -->
    <OrangeButton type="submit" class="mt-8 w-[70%] max-md:w-full" :loading="form.processing">
  Je veux être rappelé                   
</OrangeButton>

    <!-- Texte au bas du formulaire -->
    <div class="w-full text-left">
      <p class="mt-4 text-lg font-extrabold text-orange-600">Auto école en ligne agréée.</p>
      <p class="mt-2 text-xs text-neutral-700">
        J'accepte formellement que mes informations soient utilisées par Moniteur Indépendant pour me contacter.
      </p>
    </div>
  </form>
  <InfoModal
  v-if="showConfirmation"
  :show="showConfirmation"
  title="Demande envoyée avec succès"
  message="Votre demande a bien été envoyée ! Nous vous contacterons sous peu."
  @close="showConfirmation = false"
/>

</template>

<script >
import { defineComponent, reactive,ref } from 'vue';
import { routes } from '@front/routes';

import axios from 'axios';
import { OrangeButton } from '@front/components';
import { InfoModal} from '@shared/components';


export default defineComponent({
  name: 'ContactForm',
  components: {
    OrangeButton, // Ajoute ceci
    InfoModal
  },
  setup() {
    const errors = reactive({
  city: '',
  phone: '',
});

    const form = reactive({
  name: '',
  firstName: '',
  phone: '',
  city: '',
  hasCode: true,
  transmission: 'automatic',
});
const showConfirmation = ref(false);
const formatUrl = (href) => {
    if (!href.startsWith('http')) {
        return new URL(href, import.meta.env.VITE_APP_URL).href;
    }
    return href;
};
const sendLead=formatUrl('contact/sendLead');
const handleSendMail = async () => {
    if (!validateForm()) return;

    console.log("Données envoyées :", form);
    try {
        await axios.post(sendLead , form, {
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Content-Type': 'application/json',
            },
        });
        console.log('Message envoyé avec succès');
        form.name = '';
        form.firstName = '';
        form.phone = '';
        form.city = '';
        showConfirmation.value = true;
    } catch (error) {
        console.error("Erreur lors de l'envoi du formulaire", error);
    }
};

const validateForm = () => {
  errors.city = '';
  errors.phone = '';

  let valid = true;

  if (!form.city.trim()) {
    errors.city = 'La ville est requise.';
    valid = false;
  }

  const phoneRegex = /^0[1-9][0-9]{8}$/;
  if (!phoneRegex.test(form.phone)) {
    errors.phone = 'Numéro de téléphone invalide. Exemple : 0612345678';
    valid = false;
  }

  return valid;
};

    return {
      form,
      errors,
      handleSendMail,
      showConfirmation
    };
  },
});

</script>

<style scoped>
/* Style des champs */
.input-field {
  width: 100%;
  padding: 16px;
  border: 2px solid #D1D5DB;
  border-radius: 12px;
  font-size: 18px;
  outline: none;
  transition: border-color 0.3s;
}

/* Correction focus uniquement en orange */
.input-field:focus {
  border-color: #E25626;
  outline: none;
  box-shadow: 0 0 0 3px rgba(226, 86, 38, 0.3);
}

/* Style des radios */
.form-radio {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #E25626;
  appearance: none;
  cursor: pointer;
  transition: background 0.3s;
}

.form-radio:checked {
  background: #E25626;
}

/* Correction police */
.font-outfit {
  font-family: 'Outfit', sans-serif;
}
</style>
