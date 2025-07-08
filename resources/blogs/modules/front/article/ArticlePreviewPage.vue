<template>
    <BlogPageLayout>
        <Teleport to="#teleported">
            <div
                class="sticky top-0 z-900 flex items-center justify-between gap-x-6 bg-gray-900 px-6 py-2.5 sm:pr-3.5 lg:pl-8"
            >
                <p class="text-sm leading-6 text-white">
                    <a href="#">
                        <strong class="font-semibold">Preview mode</strong>
                    </a>
                </p>
                <button
                    type="button"
                    class="-m-3 flex-none p-3 focus-visible:outline-offset-[-4px]"
                    @click="handleClose"
                >
                    <span class="sr-only">Dismiss</span>
                    <XMarkIcon class="h-5 w-5 text-white" aria-hidden="true" />
                </button>
            </div>
        </Teleport>
        <template v-if="article">
            <MediaListSection :medias="article.media || []" />
            <section class="bg-white px-6 py-32 lg:px-8">
                <div class="mx-auto max-w-3xl text-base leading-7 text-gray-700">
                    <p class="text-base font-semibold leading-7 text-primary">
                        {{ article.category?.name }}
                    </p>
                    <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {{ article.title }}
                    </h1>
                    <div class="max-w-none prose prose-sm mt-8" v-html="article.description"></div>
                    <figcaption class="flex gap-x-4 items-center mt-20">
                        <img
                            :src="article.user?.profile_photo_url"
                            alt=""
                            class="mt-1 h-10 w-10 flex-none rounded-full bg-gray-50"
                        />
                        <div class="text-sm leading-6">
                            <div class="font-semibold text-gray-900">{{ article.user?.name }}</div>
                            <!-- <div class="text-gray-600">@brenna</div> -->
                        </div>
                    </figcaption>
                </div>
            </section>
            <section v-if="article.related_article?.length" class="bg-white pt-10 pb-24 sm:pb-32 container-app">
                <div class="md:max-w-2xl lg:mx-0">
                    <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-[42px]">
                        Ces articles Pouraient vous intéresser
                    </h2>
                </div>
                <div
                    class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                >
                    <PostCard v-for="post in article.related_article" :key="post.id" :post="post" />
                </div>
            </section>
        </template>
        <CommentSection :comments="comments" class="opacity-70 pointer-events-none" />
    </BlogPageLayout>
</template>

<script setup>
import { PostCard } from '@blogs/components';
import { BlogPageLayout } from '@blogs/layouts';
import { MediaListSection, CommentSection } from './partials';
import { useStorage } from '@shared/hooks';
import { computed } from 'vue';
import { XMarkIcon } from '@heroicons/vue/20/solid';
import { router } from '@inertiajs/vue3';
import { routes } from '@blogs/routes';

const props = defineProps({
    id: String,
});
const [articlePreview, setArticlePreview] = useStorage('preview');

const article = computed(() => {
    if (!articlePreview.value) {
        return null;
    }
    if (articlePreview.value?.id === props.id) {
        return {
            ...articlePreview.value,
            media: articlePreview.value?.media.map((media) => ({ storage_media: media })),
        };
    }
    setArticlePreview(null);
    return null;
});
const handleClose = () => {
    setArticlePreview(null);
    router.get(route(routes.admin.articles.list));
};
</script>
