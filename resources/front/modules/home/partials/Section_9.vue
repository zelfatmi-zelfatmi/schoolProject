<template>
    <div class="bg-gray-80 py-10 sm:py-24">
        <section class="mx-auto max-w-7xl lg:px-8">
            <article class="mx-auto max-w-2xl max-md:px-6 text-center">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-[42px]">Blog</h2>
                <p class="mt-2 text-lg leading-8 text-gray-600">
                    Les témoignages et retours de nos clients sont très positifs comme ci-dessous
                </p>
            </article>
            <article class="flex justify-center items-center gap-8 w-full -mb-16">
                <ChevronLeftIcon
                    :class="[
                        'w-8 btn-m hover:bg-primary hover:text-white rounded-full lg:w-14 p-3 max-md:hidden',
                        showPrev ? 'bg-white shadow-box-2' : ' bg-slate-50 disabled',
                    ]"
                    @click="prev"
                />
                <ul ref="slider" class="slider-container flex-1 py-16 gap-x-8 px-8 max-md:scroll-px-6">
                    <!-- class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3" -->
                    <li v-for="post in articles?.data || []" :key="post.id" class="slider-item md:w-1/3">
                        <div class="flex flex-col rounded-3xl shadow-box-2 items-start bg-white justify-between">
                            <!-- class="flex flex-col rounded-3xl shadow-box-2 items-start bg-white justify-between" -->
                            <div class="relative w-full">
                                <img
                                    :src="getMediaUrl(post, true)"
                                    :is_icon="false"
                                    alt=""
                                    class="aspect-[16/9] w-full rounded-t-3xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                />
                            </div>
                            <div class="w-full p-5 flex justify-center items-center flex-col">
                                <div class="group relative">
                                    <h3
                                        class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
                                    >
                                        <a :href="post.href || '#'">
                                            <span class="absolute inset-0" />
                                            {{ post.title }}
                                        </a>
                                    </h3>
                                    <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                                        {{ post.description }}
                                    </p>
                                </div>
<!-- 
                                <LightButton
                                    class="w-full mt-10"
                                    reload
                                    :href="
                                        route(routes.front.articleShow, {
                                            article: post.slug,
                                            category: post.category.slug,
                                        }) || '#'
                                    "
                                >
                                    Lire l’article
                                </LightButton> -->
                            </div>
                        </div>
                    </li>
                </ul>
                <ChevronRightIcon
                    :class="[
                        'w-8 btn-m hover:bg-primary hover:text-white rounded-full lg:w-14 p-3 max-md:hidden',
                        showNext ? 'bg-white shadow-box-2' : ' bg-slate-50 disabled',
                    ]"
                    @click="next"
                />
            </article>
            <article class="flex justify-center items-center mt-10">
                <OrangeButton reload :href="linkLanding || '#'">Voir tous les articles</OrangeButton>
            </article>
        </section>
    </div>
</template>

<script setup>
import { OrangeButton, LightButton } from '@front/components';
import { getMediaUrl } from '@shared/helpers';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { routes } from '@blogs/routes';
defineProps({
    articles: {
        type: Object,
        required: true,
    },
});
const slider = ref(null);
const showPrev = ref(false);
const showNext = ref(false);
const linkLanding=ref("blog");
const checkNavigation = () => {
    if (slider.value) {
        showPrev.value = slider.value.scrollLeft > 32;
        showNext.value = slider.value.scrollLeft + 33 + slider.value.clientWidth < slider.value.scrollWidth;
    }
};

onMounted(() => {
    checkNavigation();
    window.addEventListener('resize', checkNavigation);
    slider.value.addEventListener('scroll', checkNavigation);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', checkNavigation);
    if (slider.value) {
        slider.value.removeEventListener('scroll', checkNavigation);
    }
});

const prev = () => {
    if (slider.value) {
        slider.value.scrollBy({
            left: -slider.value.clientWidth,
            behavior: 'smooth',
        });
    }
};

const next = () => {
    if (slider.value) {
        slider.value.scrollBy({
            left: slider.value.clientWidth,
            behavior: 'smooth',
        });
    }
};
</script>
