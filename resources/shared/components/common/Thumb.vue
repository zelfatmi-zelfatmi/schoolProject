<template>
    <div :class="['rounded-full bg-gray-80 flex-center aspect-square overflow-hidden t-500', SIZE[size]]">
        <img
            v-if="typeof src === 'string'"
            v-bind="attrs"
            :class="['aspect-square t-500', SIZE[size], imageClass]"
            :src="src"
            @error="(e) => (e.target.src = '/assets/images/common/placeholder.png')"
        />
        <component v-bind="attrs" :is="src || PhotoIcon" v-else :class="['aspect-square w-4 opacity-70', imageClass]" />
    </div>
</template>

<script setup>
import { useAttrs } from 'vue';
import { PhotoIcon } from '@heroicons/vue/20/solid';

defineProps({
    src: [String, Function],
    size: {
        type: String,
        default: 'md',
    },
    imageClass: {
        type: String,
        default: 'object-cover',
    },
});
const attrs = useAttrs();
const SIZE = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
    full: 'w-full h-full',
};
</script>
