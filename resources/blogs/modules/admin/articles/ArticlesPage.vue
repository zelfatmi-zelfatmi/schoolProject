<script setup>
import { Page } from '@shared/components';
import { ChatBubbleBottomCenterIcon, EyeIcon, PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/vue/20/solid';

import { dateFormat } from '@shared/helpers';
import { Badge, Box, Button, ConfirmationModal, IndexFilters, Listbox, Table, Thumb } from '@shared/components';
import { routes } from '@blogs/routes';
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';
import ExcludedWords from '@assets/json/ExcludedWords.json';
import { useParams, useQuery } from '@shared/hooks';

const props = defineProps({
    articles: {
        type: Object,
        default: () => ({}),
    },
    defaultCategory: {
        type: Object,
        default: () => ({}),
    },
    categories: {
        type: Object,
        default: () => ({}),
    },
    users: {
        type: Object,
        default: () => ({}),
    },
});
const params = useParams();
const categoriesQuery = useQuery({
    url: route(routes.admin.api.categories),
    init: props.categories,
    transformable: true,
    key: 'categories',
});

const confirmation = ref(null);
const deleting = ref(false);
const actions = [
    {
        label: 'Ajoute article',
        primary: true,
        icon: PlusIcon,
        href: route(routes.admin.articles.create),
    },
];

const headings = [
    { name: 'Media' },
    { name: 'Infos' },
    { name: 'Categorie' },
    { name: 'Lien', className: 'text-center' },
    { name: 'status', className: 'text-center' },
    { name: 'Nombre de mots', className: 'text-center' },
    { name: 'Date de publication' },
    { name: 'Nom Rédacteur' },
    {
        name: 'Action',
        className: 'text-center px-4 sticky right-0 bg-slate-50 border-l-sticky',
    },
];

const getTotalWords = (value) => {
    // Create a temporary element to parse the HTML
    const tempElement = document.createElement('div');
    tempElement.innerHTML = value;
    const pureText = tempElement.textContent;
    return pureText.split(' ').filter((word) => !ExcludedWords.some((word2) => word === word2)).length;
};
const getTotalLinks = (value) => {
    const count = value.split('<a').length;
    return count > 0 ? count - 1 : 0;
};
const handleConfirmation = (article) => {
    confirmation.value = article;
};
const handleConfirmedDelete = () => {
    deleting.value = true;
    router.delete(route(routes.admin.articles.delete, confirmation.value?.id), {
        onFinish: () => {
            deleting.value = false;
        },
        onSuccess: () => {
            confirmation.value = null;
        },
    });
};
const handSearchCategory = (value) => {
    categoriesQuery.fetch('', { search: value });
};
const handLoadmoreCategory = (value) => {
    categoriesQuery.fetch('', { search: value }, true);
};
const handleChangeCategory = (value) => {
    params.update({ category_id: value });
};
const handleChangeStatus = (value) => {
    params.update({ status: value });
};
const handleChangeUser = (value) => {
    params.update({ user_id: value });
};
</script>

<template>
    <Page width="2xl" :actions="actions" title="Articles">
        <Box sectionned>
            <div>
                <IndexFilters :options="{ showSlot: true }">
                    <Listbox
                        placeholder="Etat"
                        prefix="Etat"
                        :items="[
                            { value: 'published', name: 'Publié' },
                            { value: 'draft', name: 'Brouillon' },
                            { value: 'planning', name: 'Planifié' },
                        ]"
                        class="w-full max-w-[12rem]"
                        input-class="!rounded-full bg-slate-100 shadow-none !border-none !h-8"
                        @change="handleChangeStatus"
                    />
                    <Listbox
                        placeholder="Catégorie"
                        prefix="Catégorie"
                        ssr
                        :items="categoriesQuery.data"
                        :fetching="categoriesQuery.fetching"
                        :fetching-more="categoriesQuery.fetchingMore"
                        :default-value="defaultCategory"
                        :keys="['name', 'id']"
                        class="w-full max-w-[12rem]"
                        input-class="!rounded-full bg-slate-100 shadow-none !border-none !h-8"
                        @search="handSearchCategory"
                        @scroll:end="handLoadmoreCategory"
                        @change="handleChangeCategory"
                    />
                    <Listbox
                        placeholder="Auteur"
                        prefix="Auteur"
                        :keys="['name', 'id']"
                        :items="users"
                        class="w-full max-w-[12rem]"
                        input-class="!rounded-full bg-slate-100 shadow-none !border-none !h-8"
                        @change="handleChangeUser"
                    />
                </IndexFilters>
                <Table v-slot="{ item }" :items="articles" :headings="headings" :is-loading="false">
                    <td class="cell">
                        <Thumb class="!rounded-lg" image-class="object-cover " :src="item.media?.storage_media?.path" />
                    </td>
                    <td class="cell group">
                        <b>
                            {{ item.title }}
                        </b>
                        <div class="flex opacity-0 gap-2 group-hover:opacity-100 t-200">
                            <Button mono link success :href="route(routes.admin.articles.edit, item.id)">
                                Modifier
                            </Button>
                            <Button
                                mono
                                link
                                external
                                dark
                                :href="
                                    route(routes.front.articleShow, {
                                        article: item.slug,
                                        category: item.category?.slug,
                                        show_all: true,
                                    })
                                "
                            >
                                Aperçu
                            </Button>
                            <Button link info mono :href="route(routes.admin.comments.list, { article_id: item.id })">
                                Commentaire
                            </Button>
                        </div>
                        <!-- <p class="line-clamp-2 max-w-xs whitespace-break-spaces" v-html="item.description"></p> -->
                    </td>
                    <td class="cell">
                        <b>
                            {{ item.category?.name }}
                        </b>
                    </td>

                    <td class="cell text-center">
                        {{ getTotalLinks(item.description) }}
                    </td>

                    <td class="cell">
                        <Badge
                            class="mx-auto"
                            :success="item.status === 'published'"
                            :dark="item.status === 'planning'"
                            :warning="item.status === 'draft'"
                        >
                            {{
                                item.status === 'published'
                                    ? 'Publié'
                                    : item.status === 'draft'
                                    ? 'Brouillon'
                                    : 'Planifié'
                            }}
                        </Badge>
                    </td>
                    <td class="cell capitalize text-center">
                        {{ getTotalWords(item.description) }}
                    </td>
                    <td class="cell capitalize">
                        <div class="flex flex-col justify-center items-center">
                            <span>{{ item.release_date && dateFormat(item.release_date, 'lettre') }}</span>
                            <span>{{ item.release_date && dateFormat(item.release_date, 'time') }}</span>
                        </div>
                    </td>
                    <td class="cell">
                        <div class="flex flex-col justify-center text-xs">
                            <span> <b>Créateur: </b>{{ item.user?.name }} </span>

                            <span v-if="item.user_history?.length">
                                <b>Dernier: </b> {{ item.user_history[item.user_history?.length - 1]?.user?.name }}
                            </span>
                        </div>
                    </td>

                    <td class="cell-actions">
                        <div>
                            <Button
                                :icon="PencilSquareIcon"
                                link
                                success
                                class="hover:bg-slate-100"
                                :href="route(routes.admin.articles.edit, item.id)"
                            />

                            <Button
                                link
                                dark
                                :href="
                                    route(routes.front.articleShow, {
                                        article: item.slug,
                                        category: item.category.slug,
                                        show_all: true,
                                    })
                                "
                                :icon="EyeIcon"
                                external
                                class="hover:bg-slate-100"
                            />
                            <Button
                                :icon="ChatBubbleBottomCenterIcon"
                                link
                                info
                                class="hover:bg-slate-100"
                                :href="route(routes.admin.comments.list, { article_id: item.id })"
                            />
                            <Button
                                :icon="TrashIcon"
                                link
                                danger
                                class="hover:bg-slate-100"
                                @click="handleConfirmation(item)"
                            />
                        </div>
                    </td>
                </Table>
            </div>
        </Box>
        <ConfirmationModal
            :show="!!confirmation"
            :loading="deleting"
            @close="confirmation = null"
            @confirm="handleConfirmedDelete"
        >
            Etes-vous sûr que vous voulez supprimer l'article
            <b class="text-red-500">{{ confirmation?.title }}</b>
            ?
        </ConfirmationModal>
    </Page>
</template>
