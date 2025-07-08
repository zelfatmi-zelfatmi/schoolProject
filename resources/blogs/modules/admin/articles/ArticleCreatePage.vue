<script setup>
import { ArticleForm } from './partials';
import { Page } from '@shared/components';
import { routes } from '@blogs/routes';
import { reactive } from 'vue';
const breadcumb = [
    {
        name: 'Articles',
        href: route(routes.admin.articles.list),
    },
    {
        name: "Creation d'article",
    },
];
const uuidPreview = Math.random().toString(16).slice(2);
const banner = reactive({
    title: "Voir l'Aperçu de l'article sur le site",
    content: '',
    href: route(routes.front.articlePreview, uuidPreview),
    target: '_blank',
    show: true,
    status: 'primary',
});
</script>

<template>
    <Page
        width="xl"
        :breadcumb="breadcumb"
        title="Creation d'article"
        :banner="banner"
        @banner:dismiss="banne.show = false"
    >
        <ArticleForm :uuid="uuidPreview" />
    </Page>
</template>
