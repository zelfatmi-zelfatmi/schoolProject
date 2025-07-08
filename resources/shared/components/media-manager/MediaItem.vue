<script setup>
import { computed } from 'vue';
import { Box } from '../common';
import { CheckIcon, DocumentTextIcon } from '@heroicons/vue/20/solid';
import { fileTypes } from './MediaManager';

const props = defineProps({
    media: {
        type: Object,
        default: () => ({}),
    },
    types: {
        type: Array,
        default: () => [],
    },
    selected: Boolean,
});
const parsedTypes = computed(() => props.types.map((type) => type.split('/')[1]));
</script>

<template>
    <Box
        as="li"
        sectionned
        padding
        :class="[
            '!p-0 !mb-0 cursor-pointer relative btn w-full',
            selected ? 'ring ring-primary' : '',
            !parsedTypes.includes(media.type) ? 'opacity-35 pointer-events-none saturate-50' : '',
        ]"
    >
        <span v-if="selected" class="absolute right-0.5 top-0.5 bg-primary text-white p-0.5 rounded-full">
            <CheckIcon class="h-4 w-4" />
        </span>
        <div
            v-if="fileTypes.includes(media.type)"
            class="aspect-square object-cover rounded-2xl w-full h-full flex-center flex-col"
        >
            <DocumentTextIcon class="w-6 h-6 text-slate-600" />
            {{ media.type }}
        </div>
        <img
            v-else
            :src="media.path"
            class="aspect-square object-cover rounded-2xl w-full h-full"
            alt=""
            @error="(e) => (e.target.src = '/assets/images/common/placeholder.png')"
        />
    </Box>
</template>
