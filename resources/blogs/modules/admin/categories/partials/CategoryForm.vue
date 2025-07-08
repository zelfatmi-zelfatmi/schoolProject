<script setup>
import { useForm } from '@inertiajs/vue3';
import { Box, MediaManager, SingleImageField, SuperEditorField, TextField, useMedias } from '@shared/components';
import { routes } from '@blogs/routes';
import { usePage } from '@shared/stores';
import { computed } from 'vue';
import SeoSettings from './SeoSettings.vue';

const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
    actions: Array,
    isEdit: Boolean,
});

const form = useForm({
    name: props.data.name || '',
    description: props.data.description || '',
    is_active: props.data.is_active || false,
    media: props.data?.media?.storage_media || null,
    slug: props.data.slug || '',
    requete_cible: props.data.requete_cible || '',
    title_seo: props.data.title_seo || '',
    meta_description: props.data.meta_description || '',
    indexable: props.isEdit ? props.data.indexable || false : true,
    url: props.data.url || '',
});
const medias = useMedias();
const page = usePage();

const handleSubmit = () => {
    form.transform((data) => {
        if (data.media?.id) {
            data.media = data.media.id;
        }
        return data;
    });
    if (props.isEdit) {
        form.post(route(routes.admin.categories.update, props.data.id));
    } else {
        form.post(route(routes.admin.categories.store));
    }
};

page.actions = [
    {
        label: `${props.isEdit ? 'Modifier' : 'Ajouter'} catégorie`,
        primary: true,
        disabled: computed(() => form.processing || !form.isDirty),
        loading: computed(() => form.processing),
        onClick: () => handleSubmit(),
    },
    {
        label: 'Rejeter',
        disabled: computed(() => form.processing || !form.isDirty),
        secondary: true,
        onClick: () => form.reset(),
    },
];
const handleDeleteMedia = () => {
    if (props.isEdit && props.data.media?.id) {
        medias.deleteMediaModel(props.data.media.id, () => {
            form.media = null;
        });
    } else {
        form.media = null;
    }
};
</script>

<template>
    <div>
        <MediaManager @submit="form.media = $event" />
        <form class="grid lg:grid-cols-3 py-10 lg:gap-10" @submit.prevent="handleSubmit">
            <article class="lg:col-span-2 grid">
                <SeoSettings :values="form" />
                <Box title="Categories" subtitle="List of categories" sectionned padding>
                    <TextField id="name" v-model="form.name" label="Nom du catégorie" :error="form.errors.name" />
                    <SuperEditorField
                        id="description"
                        v-model="form.description"
                        label="Description"
                        :error="form.errors.description"
                        show-source
                    />
                </Box>
            </article>
            <article class="sticky top-5 h-fit">
                <Box title="Status" sectionned padding>
                    <select v-model="form.is_active" class="form-control">
                        <option :value="true">Active</option>
                        <option :value="false">Inactif</option>
                    </select>
                </Box>
                <Box title="Media" sectionned padding>
                    <SingleImageField
                        :src="form.media?.path || null"
                        :error="form.errors.media"
                        @delete="handleDeleteMedia"
                    />
                </Box>
            </article>
        </form>
    </div>
</template>
