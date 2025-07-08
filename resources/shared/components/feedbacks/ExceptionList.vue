<template>
    <p v-for="(item, idx) in items" :key="idx" class="flex text-xs text-gray-600 gap-2" :class="attr.class">
        <component :is="item?.icon || InformationCircleIcon" v-if="typeof item === 'object'" class="w-4" />
        <span class="flex-1 leading-4">{{ typeof item === 'object' ? item.content : item }}</span>
    </p>
</template>

<script setup>
import { InformationCircleIcon } from '@heroicons/vue/20/solid';
import { useAttrs } from 'vue';
const attr = useAttrs();
defineProps({
    items: {
        type: Array,
        default: () => [],
    },
});
</script>
