<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { Volume2, VolumeX, Fullscreen } from 'lucide-vue-next';

const props = defineProps({
  question: Object,
  current: Number,
  total: Number,
});
const emit = defineEmits(['next']);

const audioRef = ref(null);
const interacted = ref(localStorage.getItem('audio_interacted') === 'true');
const isMuted = ref(!interacted.value);

const selectedAnswers = ref({});  
const validated = ref(false);

// Audio
const toggleFullscreen = () => {
  document.documentElement.requestFullscreen?.();
};

const toggleMute = async () => {
  if (!audioRef.value) return;
  try {
    audioRef.value.muted = false;
    isMuted.value = false;
    await audioRef.value.play();
    interacted.value = true;
    localStorage.setItem('audio_interacted', 'true');
  } catch (e) {
    console.warn('⛔ Erreur lecture audio manuelle', e);
  }
};

onMounted(async () => {
  await nextTick();
  if (!audioRef.value) return;

  if (interacted.value) {
    audioRef.value.muted = false;
    isMuted.value = false;
    try {
      await audioRef.value.play();
    } catch (e) {
      console.warn('⛔ Erreur lecture avec son', e);
    }
  } else {
    audioRef.value.muted = true;
    try {
      await audioRef.value.play();
    } catch (e) {
      console.warn('⛔ Lecture muette échouée', e);
    }

    window.addEventListener(
      'click',
      async () => {
        if (!interacted.value && audioRef.value) {
          interacted.value = true;
          localStorage.setItem('audio_interacted', 'true');
          audioRef.value.muted = false;
          isMuted.value = false;
          try {
            await audioRef.value.play();
          } catch (e) {
            console.warn('⛔ Échec relance audio', e);
          }
        }
      },
      { once: true }
    );
  }
});

// Réponses
const selectAnswer = (questionItemId, reponseId) => {
  if (validated.value) return;

  if (!selectedAnswers.value[questionItemId]) {
    selectedAnswers.value[questionItemId] = [];
  }

  const selected = selectedAnswers.value[questionItemId];
  const index = selected.indexOf(reponseId);

  if (index > -1) {
    // désélection
    selected.splice(index, 1);
  } else {
    // sélection
    selected.push(reponseId);
  }
};


const handleAction = () => {
  if (validated.value) return;

const itemId = props.question.items[0]?.id;
  const selected = selectedAnswers.value[itemId];

  if (selected && selected.length > 0) {
    validated.value = true;
    setTimeout(() => {
      selectedAnswers.value = {};
      validated.value = false;
      emit('next');
    }, 1500);
  }
};



</script>


<template>
  <div class="bg-black text-white min-h-screen relative">
    <!-- HEADER -->
    <div class="flex justify-between p-4 bg-gray-800">
      <div>Question {{ current }} / {{ total }}</div>
      <div class="flex space-x-4">
        <button @click="toggleMute">
          <component :is="isMuted ? VolumeX : Volume2" class="w-6 h-6" />
        </button>
        <button @click="toggleFullscreen">
          <Fullscreen class="w-6 h-6" />
        </button>
      </div>
    </div>

    <audio
      ref="audioRef"
      :src="question.audio_url_question"
      autoplay
      :muted="isMuted"
      playsinline
    />

    <!-- IMAGE -->
    <img :src="question.media_url_question" alt="image" class="w-full max-h-[500px] object-cover" />

    <!-- QUESTION -->
    <div class="p-4 text-lg">
      <template v-if="question.is_composed">
        <div v-for="(item, idx) in question.items" :key="item.id" class="mb-6">
          <p class="mb-2 font-semibold">{{ item.texte }}</p>
          <div class="grid grid-cols-2 gap-4 mt-2">
            <button
              v-for="reponse in item.reponses"
              :key="reponse.id"
              @click="selectAnswer(item.id, reponse.id)"
              class="border rounded p-3"
            :class="{
          'bg-green-600 text-white': validated && reponse.is_correct,
          'bg-red-600 text-white': validated && selectedAnswers[item.id] === reponse.id && !reponse.is_correct,
          'border-blue-400': selectedAnswers[item.id] === reponse.id && !validated,
          'hover:bg-blue-100': !validated
            }"
            >
              {{ reponse.label }} — {{ reponse.content }}
            </button>
          </div>
        </div>
      </template>

      <template v-else>
        <p class="mb-2 font-semibold">{{ question.description }}</p>
        <div class="grid grid-cols-2 gap-4 mt-2">
<button
  v-for="reponse in question.items[0]?.reponses || []"
  :key="reponse.id"
  @click="selectAnswer(question.items[0].id, reponse.id)"
  class="border rounded p-3"
:class="{
  'bg-green-600 text-white': validated && reponse.is_correct,
  'bg-red-600 text-white': validated && selectedAnswers[question.items[0].id]?.includes(reponse.id) && !reponse.is_correct,
  'border-blue-400': selectedAnswers[question.items[0].id]?.includes(reponse.id) && !validated,
  'hover:bg-blue-100': !validated
}"

>
  {{ reponse.label }} — {{ reponse.content }}
</button>

        </div>
      </template>
    </div>

    <!-- BOUTON UNIQUE -->
    <div class="flex justify-center gap-4 pb-10">
<button
:disabled="validated || selectedAnswers[question.items[0]?.id]?.length === 0"
  @click="handleAction"
  class="px-6 py-2 font-bold rounded
         bg-blue-600 text-white
         hover:bg-blue-700
         disabled:bg-gray-500 disabled:text-white disabled:opacity-100 disabled:cursor-not-allowed"
>
  Valider
</button>
  </div>
  </div>
</template>
