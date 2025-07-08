<template>
    <Swiper
        :slides-per-view="1"
        :space-between="8"
        navigation
        :pagination="{
            dynamicBullets: true,
        }"
        :modules="[Navigation, Pagination]"
        :breakpoints="breakpoints"
        class="!px-2 !pt-2 post-media text-primary max-h-[60vh]"
    >
        <SwiperSlide v-for="media in medias" :key="media.id">
            <img
                :src="media?.storage_media.path"
                class="w-full aspect-square object-cover rounded-lg h-full max-h-[60vh]"
                :alt="media.storage_media.name"
                @error="(e) => (e.target.src = '/assets/images/common/placeholder.png')"
            />
        </SwiperSlide>
    </Swiper>
</template>
<script setup>
import {Swiper, SwiperSlide} from 'swiper/vue';

import {Navigation, Pagination} from 'swiper/modules';

defineProps({
    medias: {
        type: Array,
        default: () => [],
    },
});
const breakpoints = {
    // 640: {
    //     slidesPerView: 2,
    // },
    // 768: {
    //     slidesPerView: 3,
    // },
};
</script>

<style>
@import 'swiper/css';
@import 'swiper/css/navigation';
@import 'swiper/css/pagination';
.post-media {
    --swiper-navigation-color: rgb(226 86 38);
    --swiper-pagination-color: rgb(226 86 38);
    --swiper-navigation-size: 20px;
}
.swiper-button-prev:not(.swiper-button-disabled),
.swiper-button-next:not(.swiper-button-disabled) {
    /* color: rgb(226 86 38); */
    @apply bg-white shadow-lg shadow-slate-400 border rounded-full flex justify-center items-center w-9 h-9;
}
</style>
