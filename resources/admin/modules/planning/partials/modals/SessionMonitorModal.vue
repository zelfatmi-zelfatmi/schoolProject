<script setup>
import { computed,ref ,onMounted} from 'vue';
import { Modal, Button, Thumb, Badge } from '@shared/components';
import { usePlanningSession } from '@admin/stores';
import { dateFormat } from '@shared/helpers';
import SessionCommentModal from './SessionCommentModal.vue';

const session = usePlanningSession();
const showCommentModal = ref(false);
const event = computed(() => {
    return session.selectedSession || {};
});
const mediaMoniteur = computed(
    () => event.value?.moniteur?.user?.media || event.value?.moniteur?.user?.profile_photo_url
);
const mediaEleve = computed(
    () => event.value?.session?.eleve?.user?.media || event.value?.session?.eleve?.user?.profile_photo_url
);
const close = () => {
    session.selectedSession = null;
};
const hasComment = computed(() => {
  return !! session.selectedSession?.session?.message_administrateur;
});
onMounted(async () => {
console.log("selected session is ",session.selectedSession)
});
</script>

<template>
    <Modal
        :show="!!session.selectedSession && !session.show && !session.delete && !session.updateToDispo"
        max-width="sm"
        title="Session Details"
        @close="close"
    >
        <div class="p-3 flex gap-5 min-w-[27rem] border-y border-slate-300 bg-white">
            <div class="flex-1">
                <dl class="p-8 flex gap-5 justify-center">
                    <dd class="flex flex-col items-center flex-1">
                        <Thumb :src="mediaMoniteur" size="lg" class="!rounded-full" />
                        <p class="text-xl font-bold mt-5 text-center">
                            {{ event?.moniteur?.user?.name }}
                            <small class="block text-gray-500 font-normal">Moniteur</small>
                        </p>
                    </dd>
                    <dd v-if="event?.session" class="flex flex-col items-center flex-1">
                        <Thumb :src="mediaEleve" size="lg" class="!rounded-full" />
                        <p class="text-xl font-bold mt-5 text-center">
                            {{ event?.session?.eleve?.user?.name }}
                            <small class="block text-gray-500 font-normal">Eleve</small>
                        </p>
                    </dd>
                </dl>
                <ul class="space-y-2 divide-y pb-3 bg-gray-100 rounded-xl border">
                    <li class="grid grid-cols-3 pt-3 px-5">
                        <span>Status:</span>
                        <div class="col-span-2">
                            <Badge :info="event?.is_active == 1" :warning="event?.is_active == 2">
                                {{ event?.is_active == 1 ? 'Actif' : 'Inactif' }}
                            </Badge>
                        </div>
                    </li>
                    <li class="grid grid-cols-3 pt-3 px-5">
                        <span>Date:</span>
                        <b class="col-span-2">{{ dateFormat(event?.date, 'fr') }}</b>
                    </li>
                    <li class="grid grid-cols-3 pt-3 px-5">
                        <span>Heure:</span>
                        <b class="col-span-2">{{ event?.start_at?.slice(0, 5) }} - {{ event?.end_at?.slice(0, 5) }}</b>
                    </li>
                    <li class="grid grid-cols-3 pt-3 px-5">
                        <span>Lieu:</span>
                        <b class="col-span-2">{{ event.lieu?.name }}</b>
                    </li>
                    <li
  v-if="event?.session?.message_administrateur"
  class="grid grid-cols-3 pt-3 px-5"
>
  <span>Commentaire lu ?</span>
  <b
    class="col-span-2"
    :class="event?.session?.is_read_moniteur ? 'text-green-600' : 'text-red-600'"
  >
    {{ event?.session?.is_read_moniteur ? 'Oui, lu par le moniteur' : 'Non, pas encore lu' }}
  </b>
</li>

                </ul>
            </div>
        </div>
          <div class="flex flex-row items-center justify-between p-4 bg-gray-100 text-right">
            <div class="flex gap-2 justify-end">
                <Button link dark @click="close">Fermer</Button>
                <Button link danger @click="session.delete = true">Supprimer</Button>
            </div>
            <div class="flex gap-2">
<Button danger @click="showCommentModal = true">
  {{ hasComment ? 'Modifier le commentaire' : 'Ajouter un commentaire' }}
</Button>
                <Button v-if="event?.session" yellow @click="session.updateToDispo = true">Mettre à dispo</Button>
                <Button info @click="session.show = true">Modifier</Button>
            </div>
        </div>


    </Modal>
<SessionCommentModal v-model:show="showCommentModal" />

</template>
