<template>
    <BlogPageLayout>
        <section class="">
            <div aria-hidden="true" class="relative">
                <img
                    :src="category?.media?.storage_media?.path"
                    alt=""
                    class="h-96 w-full object-cover object-center bg-gray-300"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-white" />
            </div>

            <div class="relative mx-auto -mt-12 max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
                <div class="mx-auto max-w-2xl text-center lg:max-w-4xl">
                    <h1 v-if="category?.name" class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {{ category.name }}
                    </h1>
                    <nav class="flex justify-center mt-2" aria-label="Breadcrumb">
                        <ol role="list" class="flex items-center gap-4">
                            <li>
                                <Link :href="route(routes.front.landing)" class="text-blue-400 hover:text-blue-500">
                                    <span>Accueil</span>
                                </Link>
                            </li>
                            <li class="flex items-center gap-3">
                                <ChevronRightIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                <span class="text-gray-400 hover:text-gray-500">
                                    {{ category.name }}
                                </span>
                            </li>
                        </ol>
                    </nav>
                    <div class="mt-10 text-gray-500 prose prose-sm mx-auto" v-html="category?.description"></div>
                </div>
            </div>
        </section>

        <div class="bg-white pt-10 pb-24 sm:pb-32 container-app">
            <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                <PostCard v-for="post in articles.data" :key="post.id" :post="post" />
            </div>
            <div v-if="articles?.total" class="py-4 px-2 flex-1 flex justify-center mt-10">
                <Paginate :links="articles?.links || []" />
            </div>
        </div>
    </BlogPageLayout>
</template>

<script setup>
// import {NameComp} from '@blogs/partials'
import { PostCard } from '@blogs/components';
import { BlogPageLayout } from '@blogs/layouts';
import { routes } from '@blogs/routes';
import { ChevronRightIcon } from '@heroicons/vue/20/solid';
import { Link } from '@inertiajs/vue3';
import { Paginate } from '@shared/components';
defineProps({
    articles: Object,
    category: Object,
});
</script>
