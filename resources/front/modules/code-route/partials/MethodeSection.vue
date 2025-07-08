<template>
    <section class="isolate overflow-hidden bg-white text-black py-14 lg:py-20">
        <article class="text-center container-app">
            <h2 class="mt-10 text-2xl md:text-6xl font-bold tracking-tight sm:text-[42px]">
                Une méthode simple et efficace
            </h2>
            <p class="text-lg pt-6">
                L’auto-école WEB 2.0 moniteurindependant.fr vous permet de passer votre permis sans vous runier
            </p>
        </article>
        <article class="container-app py-10 lg:py-24">
            <ul class="flex gap-3 md:gap-5">
                <li v-for="(item, idx) in list" :key="idx" class="flex-1 text-center flex flex-col">
                    <div class="relative w-full h-20 md:min-h-[216px] flex items-center my-6">
                        <Icon :name="item.image_url" :is_icon="false" class="w-20 md:w-fit mx-auto" />
                    </div>
                    <h3 class="md:text-[42px] font-bold">
                        {{ item.title }}
                    </h3>
                    <h4 class="text-xs md:text-[32px] font-semibold">
                        {{ item.content }}
                    </h4>
                </li>
            </ul>
        </article>
    </section>
</template>

<script setup>
import Icon from '@shared/components/Icon.vue';
const list = [
    {
        image_url: 'code-route/course-video.png',
        title: '200',
        content: 'Cours video en ligne',
    },

    {
        image_url: 'code-route/questions.png',
        title: '30   ',
        content: 'Quizz et questions',
    },

    {
        image_url: 'code-route/taux.png',
        title: '90%',
        content: 'Taux de réussite',
    },
];
</script>
