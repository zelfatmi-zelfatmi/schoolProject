<script setup>
import { CategoryForm } from './partials';
// import BlogPageLayout from "@blogs/layouts/BlogPageLayout.vue";
import { Page } from '@shared/components';
import { routes } from '@blogs/routes';
import { useToast } from '@shared/stores';
import { reactive } from 'vue';
import { watch } from 'vue';

const props = defineProps({
    category: {
        type: Object,
        default: () => ({}),
    },
});

const breadcumb = [
    {
        name: 'Categories',
        href: route(routes.admin.categories.list),
    },
    {
        name: 'Modifier categorie',
    },
];
const toast = useToast();
const banner = reactive({
    title: 'Voir la categorie sur le site',
    content: '',
    href: route(routes.front.categoriesShow, { category: props.category.slug, show_all: true }),
    show: true,
    status: 'secondary',
    close: handleClose,
});

function handleClose() {
    banner.show = false;
}
watch(toast.showBanner, ({ created, updated }) => {
    if (created || updated) {
        banner.title = created ? 'Categorie créée' : 'Categorie modifiée';
        banner.content = 'Voir la categorie sur le site';
        banner.status = created ? 'success' : 'info';
        banner.show = true;
    }
});
</script>

<template>
    <Page
        width="xl"
        :breadcumb="breadcumb"
        title="Modifier categorie"
        :banner="banner"
        @banner:dismiss="banner.show = false"
    >
        <CategoryForm :key="category.updated_at" is-edit :data="category" />
    </Page>
</template>
