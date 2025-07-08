<template>
    <div v-if="video" class="">
        <div v-if="clickable && video.image" class="relative h-full w-full hover:opacity-90 cursor-pointer">
            <img :src="video.image" class="h-full w-full object-cover" alt="" />
        </div>
        <iframe
            v-else
            width="100%"
            height="100%"
            :src="video.url"
            title="YouTube video player"
            :class="[className]"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
        ></iframe>
    </div>
</template>

<script setup>
// import { PlayIcon } from '@heroicons/vue/24/solid';
import { computed } from 'vue';

const props = defineProps({
    url: {
        type: String,
        default: '',
    },
    clickable: Boolean,
    className: String,
});

const video = computed(() => {
    if (!props.url) {
        return null;
    }
    if (props.url.includes('vimeo.com/')) {
        return {
            url: props.url,
        };
    }
    const match = props.url.match(/(?:[?&]v=|\/embed\/|\/v\/|\.be\/)([^&\n?#]+)/);
    return {
        url: match ? `https://www.youtube.com/embed/${match[1]}` : null,
        image: match ? `https://i.ytimg.com/vi/${match[1]}/hqdefault.jpg` : null,
    };
});
</script>
