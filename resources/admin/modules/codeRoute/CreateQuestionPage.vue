<script setup>
import {
  Box,
  Button,
  TextField,
  TabSwitch,
  SingleImageField,
  SingleAudioField,
  SingleVideoField,
  Listbox,
  MediaManager,
  Page,
  useMedias 
} from '@shared/components';
import {
  TrashIcon,
  PlusIcon,
  ArrowLeftIcon,
} from '@heroicons/vue/20/solid'
import { ref, computed } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { usePage } from '@shared/stores';
import { routes } from '@admin/routes';
import { toRaw } from 'vue';

const props = defineProps({
  themes: Array,
  isEdit: Boolean,
  data: Object,
});
const medias = useMedias();
const loading = ref(false);

const page = usePage();
const form = useForm({
  theme_id: props.data?.theme_id ?? props.data?.theme?.id ?? null,
  description: props.data?.description ?? '',
  explication: props.data?.explication ?? '',
  media_url_question: props.data?.media_url_question ?? null,
  audio_url_question: props.data?.audio_url_question ?? null,
  video_url_question: props.data?.video_url_question ?? null,
  media_url_response: props.data?.media_url_response ?? null,
  audio_url_response: props.data?.audio_url_response ?? null,
  video_url_response: props.data?.video_url_response ?? null,
  is_multiple: !!props.data?.is_multiple,
  est_active: !!props.data?.est_active,
  is_composed: !!props.data?.is_composed,
  items: props.data?.items?.map(item => ({
    texte: item.texte,
    options: item.reponses?.map(r => ({
      texte: r.content,
      is_correct: !!r.is_correct,
    })) ?? [],
  })) ?? [{ texte: '', options: [] }],
});



const submit = () => {
  form.transform((data) => {
    const cleanMedia = (media) => {
      if (!media) return null;
      if (media instanceof File) return media;
      if (typeof media === 'object' && media.path && !media.path.startsWith('blob:')) return media.path;
      return null;
    };

    const cleanBool = (value) => value ? '1' : '0';

    return {
      ...data,
      _method: 'PUT', // ✅ DOIT être dans les données ici
      theme_id: data.theme_id ?? null,
      description: data.description ?? null,
      explication: data.explication ?? '',
      is_multiple: cleanBool(data.is_multiple),
      est_active: cleanBool(data.est_active),
      is_composed: cleanBool(data.is_composed),
      media_url_question: cleanMedia(data.media_url_question),
      audio_url_question: cleanMedia(data.audio_url_question),
      video_url_question: cleanMedia(data.video_url_question),
      media_url_response: cleanMedia(data.media_url_response),
      audio_url_response: cleanMedia(data.audio_url_response),
      video_url_response: cleanMedia(data.video_url_response),

      items: JSON.stringify(toRaw(data.items).map((item) => ({
        id: item.id ?? null,
        texte: item.texte ?? '',
        options: item.options.map(opt => ({
          id: opt.id ?? null,
          texte: opt.texte ?? '',
          is_correct: !!opt.is_correct,
        })),
      }))),
    };
  });

  if (props.isEdit) {
    form.post(route(routes.codeRoute.updateQuestion, props.data?.id), {
      forceFormData: true,
      onError: (errors) => console.log('❌ Erreurs Laravel :', errors),
      onSuccess: () => console.log('✅ Modification réussie'),
    });
  } else {
    form.post(route(routes.codeRoute.storeQuestion), {
      forceFormData: true,
    });
  }

  loading.value = true;
};

const themesOptions = computed(() =>
  (props.themes?.data || props.themes || []).map((t) => ({
    name: t.nom,
    value: t.id,
  }))
);



page.actions = [
  {
    label: props.isEdit ? 'Modifier la question' : 'Ajouter la question',
    primary: true,
    disabled: computed(() => form.processing || !form.isDirty),
    loading: computed(() => form.processing),
    onClick: () => submit(),
  },
  {
    label: 'Annuler',
    secondary: true,
    disabled: computed(() => form.processing || !form.isDirty),
    onClick: () => form.reset(),
  },
];
</script>

<template>
      <MediaManager />
  <Page :title="props.isEdit ? 'Modifier la question' : 'Ajouter la question'" width="xl">
    <template #header-left>
      <Button :icon="ArrowLeftIcon" :href="route(routes.codeRoute.questions)" link>
        Retour aux questions
      </Button>
    </template>

    <form @submit.prevent="submit"  class="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 pb-10">
      <!-- Infos principales -->
      <div class="lg:col-span-2 space-y-6">
        <Box sectionned padding title="Infos générales">

          <Listbox
          v-model="form.theme_id"
          label="Thème de la question"
          placeholder="Choisir un thème"
          :items="themesOptions"
          :keys="['name', 'value']"
          :error="form.errors.theme_id"
           />
        <TextField
          label="Description de la question"
          v-model="form.description"
          :error="form.errors.description"
          required
        />

        <TextField
          label="Explication (facultative)"
          :multiline="3"
          v-model="form.explication"
          :error="form.errors.explication"
        />
        
        <div class="flex items-center justify-between">
            <label class="block font-medium text-xs text-gray-600 mb-0.5 mt-1">Statut de la question</label>
            <TabSwitch
              v-model="form.est_active"
              class="text-xs bg-gray-200"
              size="sm"
              :items="[
                { value: true, name: 'Active' },
                { value: false, name: 'Inactive' },
              ]"
            />
          </div>
          <div class="flex items-center justify-between">
          <label class="block font-medium text-xs text-gray-600 mb-0.5 mt-1">Question à choix multiples ?</label>
          <TabSwitch
            v-model="form.is_multiple"
            class="text-xs bg-gray-200"
            size="sm"
            :items="[
              { value: false, name: 'Non' },
              { value: true, name: 'Oui' },
            ]"
          />
        </div>
        <div class="flex items-center justify-between">
          <label class="block font-medium text-xs text-gray-600 mb-0.5 mt-1">Cette question est-elle composée ? ?</label>
          <TabSwitch
            v-model="form.is_composed"
            class="text-xs bg-gray-200"
            size="sm"
            :items="[
              { value: false, name: 'Non' },
              { value: true, name: 'Oui' },
            ]"
          />
        </div>
      </Box>

      <Box sectionned padding title="Réponses">
  <div class="space-y-6">
    <!-- Si la question est COMPOSÉE -->
    <div v-if="form.is_composed">
      <div
        v-for="(item, itemIndex) in form.items"
        :key="itemIndex"
        class="space-y-3 border p-4 rounded-lg bg-gray-50 mt-4"
      >
        <TextField
          v-model="item.texte"
          placeholder="Texte de la sous-question"
          required
        />

        <div
          v-for="(option, optionIndex) in item.options"
          :key="optionIndex"
          class="flex flex-col md:flex-row items-start md:items-center gap-3"
        >
          <TextField
            v-model="option.texte"
            placeholder="Option de réponse"
            class="flex-1"
            required
          />
          <label class="text-xs">
            <input type="checkbox" v-model="option.is_correct" class="mr-1" /> Correcte
          </label>
          <Button
            :icon="TrashIcon"
            small
            danger
            @click="item.options.splice(optionIndex, 1)"
            tooltip="Supprimer cette option"
          />
        </div>

        <div class="flex items-center justify-between">
          <Button
            type="button"
            small
            :icon="PlusIcon"
            @click="item.options.push({ texte: '', is_correct: false })"
          >
            Ajouter une option
          </Button>

          <Button
            v-if="itemIndex > 0"
            type="button"
            :icon="TrashIcon"
            small
            danger
            @click="form.items.splice(itemIndex, 1)"
            tooltip="Supprimer cette sous-question"
          >
            Supprimer cette sous-question
          </Button>
        </div>
      </div>

      <div class="pt-4">
        <Button
          type="button"
          small
          :icon="PlusIcon"
          @click="form.items.push({ texte: '', options: [] })"
        >
          Ajouter une sous-question
        </Button>
      </div>
    </div>

    <!-- Si la question est SIMPLE -->
    <div v-else>
      <div class="space-y-3 border p-4 rounded-lg bg-gray-50">
        <div
          v-for="(option, optionIndex) in form.items[0].options"
          :key="optionIndex"
          class="flex flex-col md:flex-row items-start md:items-center gap-3"
        >
          <TextField
            v-model="option.texte"
            placeholder="Option de réponse"
            class="flex-1"
            required
          />
          <label class="text-xs">
            <input type="checkbox" v-model="option.is_correct" class="mr-1" /> Correcte
          </label>
          <Button
            :icon="TrashIcon"
            small
            danger
            @click="form.items[0].options.splice(optionIndex, 1)"
            tooltip="Supprimer cette option"
          />
        </div>

        <Button
          type="button"
          small
          :icon="PlusIcon"
          @click="form.items[0].options.push({ texte: '', is_correct: false })"
        >
          Ajouter une option
        </Button>
      </div>
    </div>
  </div>
      </Box>
    </div>
      <!-- Medias -->
      <div class="space-y-6">
        <Box sectionned padding title="Image & Audio">
          <SingleImageField
         label="Image de la question"
         :src="form.media_url_question?.path || form.media_url_question || null"
          v-model="form.media_url_question"
          @change="form.media_url_question = $event"
          :error="form.errors.media_url_question"
          />

          <SingleAudioField
            label="Fichier audio de la question"
            v-model="form.audio_url_question"
            :error="form.errors.audio_url_question"
          />
          
           <SingleVideoField
           label="Fichier vidéo de la question"
           v-model="form.video_url_question"
           :error="form.errors.video_url_question"
           />
           <SingleImageField
          label="Image de la réponse"
          :src="form.media_url_response?.path || form.media_url_response || null"
          v-model="form.media_url_response"
          @change="form.media_url_response = $event"
          :error="form.errors.media_url_response"
          />

          <SingleAudioField
            label="Fichier audio de la réponse"
            v-model="form.audio_url_response"
            :error="form.errors.audio_url_response"
          />
          
          <SingleVideoField
          label="Fichier vidéo de la réponse"
          v-model="form.video_url_response"
          :error="form.errors.video_url_response"
          />
        </Box>
      </div>
    </form>
  </Page>
</template>
