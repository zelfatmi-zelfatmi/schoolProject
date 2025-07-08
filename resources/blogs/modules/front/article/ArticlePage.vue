<template>
    <BlogPageLayout>
        <!-- <MediaListSection :medias="article.media" /> -->
        <section class="!px-2 !pt-2 post-media text-primary max-h-[60vh]">
            <img
                :src="article.media?.storage_media?.path"
                class="w-full aspect-square object-cover rounded-lg h-full max-h-[60vh]"
                :alt="article.media?.storage_media?.name"
                @error="(e) => (e.target.src = '/assets/images/common/placeholder.png')"
            />
        </section>
        <section class="bg-white px-3 py-20 md:py-32 lg:px-8">
            <nav class="flex -mt-16 mb-16 mx-auto max-w-5xl max-md:text-xxs" aria-label="Breadcrumb">
                <ol role="list" class="flex items-center md:gap-4">
                    <li>
                        <Link :href="route(routes.front.landing)" class="text-blue-400 hover:text-blue-500">
                            <span>Accueil</span>
                        </Link>
                    </li>
                    <li v-if="article.category?.id" class="flex items-center gap-3">
                        <Link
                            :href="route(routes.front.categoriesShow, article.category.id)"
                            class="flex items-center md:gap-3"
                        >
                            <ChevronRightIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            <span class="text-blue-400 hover:text-blue-500">
                                {{ article.category?.name }}
                            </span>
                        </Link>
                    </li>
                    <li v-if="article.title" class="flex items-center md:gap-3">
                        <ChevronRightIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <span class="text-gray-400 hover:text-gray-500">
                            {{ article.title }}
                        </span>
                    </li>
                </ol>
            </nav>
            <article class="flex mx-auto max-w-5xl gap-5 md:gap-8 flex-col md:flex-row-reverse">
                <SummaryList v-if="getSummary(article.description).length" :items="getSummary(article.description)" />

                <div class="text-base leading-7 text-gray-700 flex-1 flex-grow">
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
            </article>
        </section>
        <section v-if="relatedArticle?.length" class="bg-white pt-10 pb-24 sm:pb-32 container-app">
            <div class="md:max-w-2xl lg:mx-0">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-[42px] leading-tight">
                    Ces articles Pouraient vous intéresser
                </h2>
            </div>
            <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                <PostCard v-for="post in relatedArticle" :key="post.id" :post="post" />
            </div>
        </section>
        <CommentSection :comments="comments" :article="article" />
    </BlogPageLayout>
</template>

<script setup>
import { PostCard } from '@blogs/components';
import { BlogPageLayout } from '@blogs/layouts';
import { CommentSection, SummaryList } from './partials';
import { computed } from 'vue';
import { routes } from '@blogs/routes';
import { Link } from '@inertiajs/vue3';
import { ChevronRightIcon } from '@heroicons/vue/20/solid';
import { getSummary } from '@shared/helpers';

const props = defineProps({
    article: {
        type: Object,
        default: () => ({}),
    },
    comments: {
        type: Object,
        default: () => ({}),
    },
});

const relatedArticle = computed(() => {
    if (props.article?.related_article?.length) {
        return props.article?.related_article;
    }
    return props.article?.related_category || [];
});
</script>
