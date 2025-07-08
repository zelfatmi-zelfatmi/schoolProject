<script setup>
import { computed, ref, watch } from 'vue';
import { useForm } from '@inertiajs/vue3';
import {
    Box,
    Datepicker,
    EmptyState,
    ExceptionList,
    Listbox,
    MediaManager,
    SearchField,
    SingleImageField,
    SuperEditorField,
    TabSwitch,
    TextField,
    Thumb,
    useMedias,
} from '@shared/components';
import { routes } from '@blogs/routes';
import { InformationCircleIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid';
import { usePage, useToast } from '@shared/stores';
import { useQuery, useStorage } from '@shared/hooks';
import Feeds from './Feeds.vue';
import SeoSettings from './SeoSettings.vue';
import excludedWords from '@assets/json/ExcludedWords.json';
import { reactive } from 'vue';
import { getEditorRelatedPageData } from '../ArticlePage';

const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
    actions: Array,
    isEdit: Boolean,
    uuid: String,
});
const [, setArticlePreview] = useStorage('preview');
const toast = useToast();
const form = useForm({
    category_id: props.data.category_id || '',
    title: props.data.title || '',
    description: props.data.description || '',
    release_date: props.data.release_date || null,
    is_related: props.data.is_related || false,
    status: props.data.status || 'draft',
    related_article_id: props.data.related_article_id || null,
    media: props.data?.media?.storage_media || null,
    // media: props.data.media?.map((m) => m?.storage_media) || [],
    slug: props.data.slug || '',
    requete_cible: props.data.requete_cible || '',
    title_seo: props.data.title_seo || '',
    meta_description: props.data.meta_description || '',
    indexable: props.isEdit ? props.data.indexable || false : true,
    url: props.data.url || '',
});

const medias = useMedias();
const page = usePage();
const loading = ref(false);

const mainPageSelection = reactive({
    related_article_main: props.data?.related_article_main || null,
    category: props.data?.category || null,
});
const searchQuery = ref({
    category: '',
    article: '',
});
const handleSetDataEditor = (callback) => {
    callback(getEditorRelatedPageData(mainPageSelection));
};
const defaultRelatedArticle = ref(props.data?.related_article_main || {});

const articles = useQuery({
    url: route(routes.admin.api.articlesByCategory),
    params: { category_id: props.data.category_id },
    key: 'articles',
});

const categories = useQuery({
    url: route(routes.admin.api.categories),
    params: { category_id: props.data.category_id },
    key: 'categories',
});

const relatedArticle = useQuery(
    {
        url: route(routes.admin.api.articlesRelated),
        params: {
            id: props.data.id,
            ...(props.data?.is_related
                ? { related_article_id: props.data.related_article_id }
                : { category_id: props.data.category_id }),
        },
        key: 'articles',
    },
    props.isEdit
);

const submit = () => {
    const pm = document.querySelector('[data-page-mere]');
    if (!pm && form.is_related === true) {
        form.errors.description = 'Le contenu de la page mère est obligatoire.';
        toast.notify({ type: 'error', title: 'Le contenu de la page mère est obligatoire.' });
        return;
    }
    form.transform((data) => {
        if (data.media?.id) {
            data.media = data.media.id;
        }
        return data;
    });
    if (props.isEdit) {
        form.post(route(routes.admin.articles.update, props.data.id));
    } else {
        form.post(route(routes.admin.articles.store));
    }
    loading.value = true;
};
const handleStatusChange = (e) => {
    if (e.target.value !== 'planning') {
        form.release_date = null;
    }
};

const handleCategoryChange = (value) => {
    form.category_id = value;
    defaultRelatedArticle.value = {};
    form.related_article_id = null;
    articles.data = [];
    handleFetchArticlesByCategory('');
};
const handleFetchCategory = (search = '', refetch = false, loadmore = false) => {
    if (categories.data?.length && !refetch) {
        return;
    }
    searchQuery.value.category = search;
    categories.fetch('', { search }, loadmore);
};
const handleFetchArticlesByCategory = (search = '', refetch = false, loadmore = false) => {
    if (articles.data?.length && !refetch) {
        return;
    }
    searchQuery.value.article = search;
    articles.fetch('', { category_id: form.category_id, search }, loadmore);
};

const handleMainArticleChange = (value) => {
    form.related_article_id = value;
    relatedArticle.fetch('', { related_article_id: value });
};

const handleSearchRelatedArticle = (value) => {
    const payload = {
        id: props.data?.id,
        search: value,
    };

    if (form.is_related) {
        payload.related_article_id = form.related_article_id;
    } else {
        payload.category_id = form.category_id;
    }
    relatedArticle.fetch('', payload);
};

const handleDeleteMedia = () => {
    if (props.isEdit && props.data.media?.id) {
        medias.deleteMediaModel(props.data.media.id, () => {
            form.media = null;
        });
    } else {
        form.media = null;
    }
};

page.actions = [
    {
        label: `${props.isEdit ? 'Modifier' : 'Ajouter'} article`,
        primary: true,
        disabled: computed(() => form.processing || !form.isDirty),
        loading: computed(() => form.processing),
        onClick: () => submit(),
    },
    {
        label: 'Rejeter',
        disabled: computed(() => form.processing || !form.isDirty),
        secondary: true,
        onClick: () => form.reset(),
    },
];

watch(form, (value) => {
    if (!props.uuid) {
        return;
    }
    const data = value.data();
    data.id = props.uuid;
    data.user = {
        profile_photo_url: page.user?.profile_photo_url,
    };
    data.description = data.description
        .replace(/\\n/g, '\\n')
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, '\\&')
        .replace(/\\r/g, '\\r')
        .replace(/\\t/g, '\\t')
        .replace(/\\b/g, '\\b')
        .replace(/\\f/g, '\\f');
    setArticlePreview(data);
});
const getTotalWords = computed(() => {
    // Create a temporary element to parse the HTML
    const tempElement = document.createElement('div');
    tempElement.innerHTML = form.description;
    const pureText = tempElement.textContent?.trim()?.split(' ').filter(Boolean);
    return {
        total: pureText.length,
        reel: [...pureText].filter((word) => !excludedWords.some((word2) => word === word2)).length,
    };
});
</script>
<template>
    <div>
        <MediaManager @submit="form.media = $event" />
        <form class="grid lg:grid-cols-3 pb-10 lg:gap-10" @submit.prevent="submit">
            <article class="lg:col-span-2 grid">
                <SeoSettings :values="form" />
                <Box title="Article infos" sectionned padding>
                    <TextField id="title" v-model="form.title" :error="form.errors.title" label="Titre" />
                    <SuperEditorField
                        id="description"
                        v-model="form.description"
                        page-main
                        show-source
                        embbed-popup
                        label="Description"
                        :error="form.errors.description"
                        :set-data="handleSetDataEditor"
                    />
                    <div class="flex gap-5 justify-end items-center text-sm font-semibold text-gray-600 mt-1">
                        {{ getTotalWords.total }} Total / {{ getTotalWords.reel }}
                        Réel
                    </div>
                </Box>
                <Box title="Soeurs Article" sectionned padding>
                    <div class="flex flex-col gap-2 mb-3">
                        <SearchField
                            label="Post recherche"
                            class="bg-gray-100 rounded-lg flex-1"
                            :disabled="!props.data?.id || !form.related_article_id"
                            @change="handleSearchRelatedArticle"
                        />
                        <ExceptionList
                            :items="[
                                {
                                    icon: InformationCircleIcon,
                                    content:
                                        'Vous pouvez utiliser cette recherche avec l\'article requis et l\'article mère',
                                },
                            ]"
                        />
                    </div>
                    <ul v-if="relatedArticle.data?.length" class="divide-y bg-gray-100 px-1 rounded-xl">
                        <li
                            v-for="related in relatedArticle.data"
                            :key="related.id"
                            class="flex gap-3 items-center py-1"
                        >
                            <Thumb :src="related.media?.storage?.path" class="w-12" />
                            <div class="flex-1">
                                <h4>
                                    <b>{{ related.title }}</b>
                                </h4>
                                <div class="text-xs text-gray-500 line-clamp-2" v-html="related.description"></div>
                            </div>
                        </li>
                    </ul>
                    <EmptyState v-else heading="Aucun résultat" :image="MagnifyingGlassIcon">
                        <p>Selectionner une category et un article mere pour voir ses sous articles</p>
                    </EmptyState>
                </Box>

                <Feeds v-if="isEdit && data.user_history" :data="data" />
            </article>
            <article class="sticky top-5 h-fit">
                <Box title="Status" sectionned padding>
                    <select v-model="form.status" class="form-control" @change="handleStatusChange">
                        <option value="published">Publié</option>
                        <option value="draft">Brouillon</option>
                        <option value="planning">Planifié</option>
                    </select>
                    <Datepicker
                        v-if="form.status === 'planning'"
                        v-model="form.release_date"
                        label="Planifié date"
                        :error="form.errors.release_date"
                    />
                    <Listbox
                        label="Category"
                        placeholder="selectionner une category"
                        :items="categories.data || []"
                        :default-value="data.category || {}"
                        :keys="['name', 'id']"
                        :error="form.errors.category_id"
                        :fetching="categories.fetching"
                        :fetching-more="categories.fetchingMore"
                        ssr
                        @change="handleCategoryChange"
                        @change:full="mainPageSelection.category = $event"
                        @open="handleFetchCategory"
                        @search="handleFetchCategory($event, true)"
                        @scroll:end="handleFetchCategory(searchQuery.category, true, true)"
                    ></Listbox>

                    <div>
                        <div class="flex items-center justify-between gap-5 mb-2">
                            <p class="block font-medium text-xs text-gray-600 mb-0.5 mt-1">Page Mère</p>
                            <TabSwitch
                                v-model="form.is_related"
                                class="bg-gray-200"
                                :items="[
                                    { name: 'Categorie', id: false },
                                    { name: 'Article', id: true },
                                ]"
                            />
                        </div>

                        <Listbox
                            :key="form.category_id + form.is_related"
                            :disabled="!form.is_related"
                            placeholder="selectionner un article"
                            :items="articles.data || []"
                            :default-value="form.is_related ? defaultRelatedArticle : {}"
                            :keys="['title', 'id']"
                            :error="form.errors.related_article_id"
                            :fetching="articles.fetching"
                            :fetching-more="articles.fetchingMore"
                            ssr
                            @change="handleMainArticleChange"
                            @open="handleFetchArticlesByCategory"
                            @change:full="mainPageSelection.related_article_main = $event"
                            @search="handleFetchArticlesByCategory($event, true)"
                            @scroll:end="handleFetchArticlesByCategory(searchQuery.article, true, true)"
                        ></Listbox>
                    </div>
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
