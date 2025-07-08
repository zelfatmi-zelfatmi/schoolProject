<script setup>
import { ref, computed } from 'vue';
import { useForm } from '@inertiajs/vue3';
import {
  Box,
  Button,
  TextField,
  SingleImageField,
  TabSwitch,
  useMedias,
  MediaManager,
  Page,
} from '@shared/components';
import { usePage } from '@shared/stores';
import { routes } from '@admin/routes';

const page = usePage();
const medias = useMedias();
const props = defineProps({
  data: Object,
  isEdit: Boolean,
});


const form = useForm({
  nom: props.data?.nom || '',
  description: props.data?.description || '',
  nombre_questions: props.data?.nombre_questions || 0,
  est_active: !!props.data?.est_active,
  media: props.data?.image_url || null,
});

const loading = ref(false);

const submit = () => {
  form.transform((data) => {
    // Si media est un objet avec un id → extraire le path
    if (data.media?.id) {
      data.media = data.media.path;
    }

    return data;
  });

  if (props.isEdit) {
    form.put(route(routes.codeRoute.updateTheme, props.data.id));
  } else {
    console.log("hello store theeme")
    form.post(route(routes.codeRoute.storeTheme), {
      forceFormData: true,
    });
  }

  loading.value = true;
};

const handleDeleteMedia = () => {
  if (form.media?.id) {
    medias.deleteMediaModel(form.media.id, () => {
      form.media = null;
    });
  } else {
    form.media = null;
  }
};
const breadcumb = [
    {
        name: 'Thémes',
        href: route(routes.codeRoute.theme),
    },
    {
        name: props.isEdit?"Modifier le thème":"Ajouter le thème",
    },
];
page.actions = [
  {
    label: props.isEdit?"Modifier le thème":"Ajouter le thème",
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
  <div>
    <MediaManager />
    <Page :breadcumb="breadcumb" :title="props.isEdit?'Modifier le thème':'Ajouter le thème'" width="xl">

    <form class="grid md:grid-cols-3 md:gap-6" @submit.prevent="submit">
      <!-- Partie principale -->
      <div class="md:col-span-2 grid">
        <Box sectionned padding title="Informations du thème">
          <div class="grid md:grid-cols-2 gap-4">
            <TextField
              v-model="form.nom"
              :error="form.errors.nom"
              label="Nom du thème"
              required
            />

            <TextField
              v-model="form.nombre_questions"
              :error="form.errors.nombre_questions"
              label="Nombre de questions"
              type="number"
              required
            />
          </div>

          <TextField
            v-model="form.description"
            :error="form.errors.description"
            label="Description"
            :multiline="2"
            placeholder="Décrivez le contenu de ce thème…"
          />

          <div class="flex items-center justify-between pt-4">
            <label class="text-sm text-gray-600">Statut du thème</label>
            <TabSwitch
              v-model="form.est_active"
              size="sm"
              :items="[
                { value: true, name: 'Actif' },
                { value: false, name: 'Inactif' }
              ]"
            />
          </div>
        </Box>
      </div>

      <!-- Image -->
      <div class="sticky top-6 h-fit">
        <Box sectionned>
          <SingleImageField
            :src="form.media?.path || form.media || null"
            :error="form.errors.media"
            @change="form.media = $event"
            @delete="handleDeleteMedia"
          />
        </Box>
      </div>
    </form>
</Page>
  </div>
</template>
