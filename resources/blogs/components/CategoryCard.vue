<template>
    <article
        class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
    >
        <img
            :src="category.media?.storage_media?.path || '#'"
            class="absolute inset-0 -z-10 h-full w-full object-cover"
            :alt="category.name"
            @error="(e) => (e.target.src = '/assets/images/common/placeholder.png')"
        />
        <div class="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />

        <div class="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
            <time :datetime="category.release_date" class="mr-8">
                {{ category.release_date }}
            </time>
        </div>
        <h3 class="mt-3 text-lg font-semibold leading-6 text-white">
            <Link :href="route(routes.front.categoriesShow, category.slug)">
                <span class="absolute inset-0" />
                {{ category.name }}
            </Link>
        </h3>
    </article>
</template>

<script setup>
// import {NameComp} from '@blogs/partials'
import { routes } from '@blogs/routes';
import { Link } from '@inertiajs/vue3';
defineProps({
    category: Object,
});
</script>
