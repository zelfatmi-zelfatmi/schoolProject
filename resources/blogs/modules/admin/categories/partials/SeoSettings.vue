<script setup>
import { SeoBar } from '@blogs/components';
// import { CheckCircleIcon } from '@heroicons/vue/24/solid';
import { Box, Switch, TextField } from '@shared/components';
// import { dateFormat } from '@shared/helpers';
import { toRef } from 'vue';

const props = defineProps({
    values: {
        type: Object,
        default: () => ({}),
    },
});
const form = toRef(props, 'values');
</script>
<template>
    <Box title="Seo Parametéres" class="mt-5" sectionned padding>
        <TextField
            id="requete_cible"
            v-model="form.requete_cible"
            label="Requete cible"
            :error="form.errors.requete_cible"
        />
        <div>
            <TextField id="title_seo" v-model="form.title_seo" label="Titre SEO" :error="form.errors.title_seo" />
            <SeoBar :value="form.title_seo?.length" :min="25" :max="65" />
        </div>
        <div class="flex gap-5">
            <TextField id="slug" v-model="form.slug" label="Slug" class="w-full" :error="form.errors.slug" />
            <Switch v-model="form.indexable" label="Indexable" />
        </div>
        <div>
            <TextField
                id="meta_description"
                v-model="form.meta_description"
                label="Méta Description"
                :multiline="3"
                :error="form.errors.meta_description"
            />
            <SeoBar :value="form.meta_description?.length" :min="60" :max="160" />
        </div>
        <TextField id="url" v-model="form.url" type="url" label="URL canonique" :error="form.errors.url" />
    </Box>
</template>
