<script setup>
import { ref, watch } from 'vue';
import { Modal, TextField, Button } from '@shared/components';
import { usePlanningSession } from '@admin/stores';
import { router, useForm } from '@inertiajs/vue3';
import { routes } from '@admin/routes';

const session = usePlanningSession();
const commentaire = ref('');


// ✅ Props et Emits
const props = defineProps({ show: Boolean });

const emit = defineEmits(['update:show']);

// ✅ Formulaire
const form = useForm({
  session_id: null,
  message_administrateur: ''
});
watch(() => props.show, (value) => {
  if (value) {
    // Préremplir le commentaire si déjà existant
    commentaire.value = session.selectedSession?.session?.message_administrateur || '';
    form.reset();
  } else {
    commentaire.value = '';
    form.reset();
  }
});
// ✅ Watch fermeture -> reset
watch(() => props.show, (value) => {
  if (!value) {
    commentaire.value = '';
    form.reset();
  }
});

// ✅ Fermer le modal
const close = () => {
  emit('update:show', false);
  commentaire.value = '';
};

// ✅ Enregistrer
const saveComment = () => {
  form.session_id = session.selectedSession?.session?.id;
  form.message_administrateur = commentaire.value;
form.post(route(routes.plannings.sessions.addComment), {
  onSuccess: () => {
    // ✅ Mise à jour manuelle de la valeur en local
    if (session.selectedSession?.session) {
      session.selectedSession.session.message_administrateur = commentaire.value;
    }

    console.log('✅ Commentaire envoyé');
    close();
  },
  onError: (err) => {
    console.warn('❌ Erreur Laravel', err);
  },
});

};
</script>

<template>
  <Modal :show="props.show" title="Ajouter un commentaire" max-width="md" @close="close">
    <div class="p-4">
      <TextField
        label="Message à transmettre au moniteur"
        v-model="commentaire"
        :multiline="4"
        placeholder="Ex : pense à vérifier les papiers de l’élève"
      />
    </div>
    <div class="p-4 flex justify-end gap-2">
      <Button link dark @click="close">Annuler</Button>
      <Button primary @click="saveComment">Envoyer</Button>
    </div>
  </Modal>
</template>
