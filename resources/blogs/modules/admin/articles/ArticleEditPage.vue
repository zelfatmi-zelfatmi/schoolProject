<script setup>
import { reactive } from 'vue';
import { ArticleForm } from './partials';
import { Page } from '@shared/components';
import { routes } from '@blogs/routes';
import { watch } from 'vue';
import { useParams } from '@shared/hooks';

const props = defineProps({
    article: {
        type: Object,
        default: () => ({}),
    },
});
const breadcumb = [
    {
        name: 'Articles',
        href: route(routes.admin.articles.list),
    },
    {
        name: 'Modifier article',
    },
];
const params = useParams();
const banner = reactive({
    title: "Voir l'article sur le site",
    content: '',
    href: route(routes.front.articleShow, {
        article: props.article.slug,
        category: props.article.category.slug,
        show_all: true,
    }),
    show: true,
    status: 'secondary',
    close: HandleClose,
});
function HandleClose() {
    banner.show = false;
}
watch(props, () => {
    const { created, updated } = params;
    if (created || updated) {
        banner.title = created ? 'Article créé' : 'Article modifié';
        banner.content = "Voir l'article sur le site";
        banner.status = created ? 'success' : 'info';
    }
});
</script>

<template>
    <Page width="xl" :breadcumb="breadcumb" title="Modifier article" :banner="banner">
        <ArticleForm :key="article.updated_at" is-edit :data="article" />
    </Page>
</template>
