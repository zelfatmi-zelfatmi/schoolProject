<template>
      <div class="flex justify-between items-center p-4 bg-gray-100 border-b">
    <h1 class="text-lg font-bold text-pink-700">Bonjour, Mme El Fatmi</h1>
    <button
      @click="logout"
      class="bg-gray-200 text-sm text-gray-700 px-3 py-1 rounded hover:bg-red-100 hover:text-red-600"
    >
      Se déconnecter
    </button>
  </div>

  <div class="p-6 space-y-8">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-primary">Bonjour, {{ parentName }}</h1>
        <p class="text-sm text-gray-600">Voici le tableau de bord de vos enfants</p>
      </div>
    </div>

    <!-- Enfants et progression -->
    <div v-for="enfant in enfants" :key="enfant.id" class="bg-white rounded-xl shadow p-6">
      <h2 class="text-xl font-semibold text-gray-800">{{ enfant.nom }}</h2>
      <p class="text-sm text-gray-500 mb-2">Classe : {{ enfant.classe }}</p>

      <div class="mb-4">
        <label class="text-sm text-gray-600">Progression Globale</label>
        <div class="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
          <div class="bg-green-500 h-full" :style="{ width: enfant.progression + '%' }"></div>
        </div>
        <p class="text-xs mt-1">{{ enfant.progression }}%</p>
      </div>

      <div>
        <h3 class="font-semibold text-gray-700 mb-2">Cours suivis</h3>
        <ul class="list-disc ml-4 space-y-1 text-sm text-gray-600">
          <li v-for="cours in enfant.cours" :key="cours.id">
            {{ cours.matiere }} - {{ cours.titre }} ({{ cours.date }})
          </li>
        </ul>
      </div>

      <div class="mt-4">
        <h3 class="font-semibold text-gray-700 mb-2">Derniers quiz</h3>
        <ul class="list-inside list-disc text-sm text-gray-600">
          <li v-for="quiz in enfant.quiz" :key="quiz.id">
            {{ quiz.matiere }} : {{ quiz.note }}/{{ quiz.total }} - {{ quiz.date }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Paiement -->
    <div class="bg-white rounded-xl shadow p-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Abonnement</h2>
      <p class="text-gray-600 text-sm mb-1">Formule : {{ abonnement.formule }}</p>
      <p class="text-gray-600 text-sm mb-1">Montant : {{ abonnement.montant }} €</p>
      <p class="text-gray-600 text-sm mb-4">Prochaine échéance : {{ abonnement.echeance }}</p>
      <button class="btn-primary">Télécharger la facture</button>
    </div>

    <!-- Communication -->
    <div class="bg-white rounded-xl shadow p-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Messages</h2>
      <div v-if="messages.length">
        <ul class="text-sm space-y-2">
          <li v-for="msg in messages" :key="msg.id" class="border-b pb-2">
            <strong>{{ msg.prof }}</strong>: {{ msg.contenu }} <span class="text-xs text-gray-500">({{ msg.date }})</span>
          </li>
        </ul>
      </div>
      <div v-else class="text-sm text-gray-500">Aucun message.</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Pour la redirection
import axios from 'axios';



// Référence pour router
const router = useRouter();
 axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

 
// Fonction de déconnexion
const logout = async () => {
    try {
        // Appel de l'API pour se déconnecter
        const response = await axios.post('/logout'); // Assure-toi que cette route est bien définie

        console.log(response.data.message); // Afficher le message de succès
         window.location.href = '/login';

        // Rediriger vers la page de connexion
        // router.push({ name: 'login' }); // Redirige vers la page de connexion (à adapter si nécessaire)
    } catch (error) {
        console.error('Erreur lors de la déconnexion', error);
    }
};
const parentName = 'Mme El Fatmi';
const enfants = ref([
  {
    id: 1,
    nom: 'Youssef El Fatmi',
    classe: '5ème',
    progression: 82,
    cours: [
      { id: 1, matiere: 'Mathématiques', titre: 'Les fractions', date: '02/07' },
      { id: 2, matiere: 'Français', titre: 'La lettre formelle', date: '01/07' },
    ],
    quiz: [
      { id: 1, matiere: 'Maths', note: 15, total: 15, date: '01/07' },
      { id: 2, matiere: 'SVT', note: 13, total: 15, date: '30/06' },
    ],
  },
]);

const abonnement = ref({
  formule: 'Mensuel',
  montant: 19.99,
  echeance: '10/07/2025',
});

const messages = ref([
  { id: 1, prof: 'Mme Benali (Maths)', contenu: 'Très bon travail sur les fractions !', date: '02/07' },
]);
</script>

<style scoped>
.btn-primary {
  @apply bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-pink-600 transition;
}
</style>
