<template>
    <article class="flex flex-col rounded-3xl shadow-box-2 items-start bg-white justify-between">
        <Link
            :href="route(routes.front.articleShow, { article: post.slug, category: post?.category?.slug })"
            class="relative w-full"
        >
            <img
                :src="media.path"
                :alt="post.title"
                class="aspect-[16/9] w-full rounded-t-3xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                @error="(e) => (e.target.src = '/assets/images/common/placeholder.png')"
            />
        </Link>
        <div class="w-full p-5 flex justify-center items-center flex-col flex-1">
            <div class="group relative w-full">
                <time v-if="post.release_date" :datetime="post.release_date" class="text-gray-500 text-sm">
                    {{ moment(post.release_date).format('MMMM, DD yyyy') }}
                </time>
                <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    {{ post.title_seo || post.title }}
                </h3>
                <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600" v-html="post.meta_description"></p>
            </div>
            <span class="flex-1"></span>
            <LightButton
                class="w-full mt-10"
                :href="route(routes.front.articleShow, { article: post.slug, category: post?.category?.slug })"
            >
                Lire l’article
            </LightButton>
        </div>
    </article>
</template>

<script setup>
// import {NameComp} from '@blogs/partials'
import { routes } from '@blogs/routes';
import { LightButton } from '@front/components';
import { Link } from '@inertiajs/vue3';
import moment from 'moment-timezone';
import { computed } from 'vue';

const props = defineProps({
    post: Object,
});

const media = computed(() =>
    props.post?.media ? props.post?.media.storage_media : { path: '/assets/images/common/placeholder.png' }
);
</script>
