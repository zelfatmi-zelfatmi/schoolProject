<template>
    <component :is="as" class="group/tooltip relative">
        <slot />
        <div
            :class="[
                'absolute invisible group-hover/tooltip:visible z-50 bg-white shadow-xl rounded-xl border border-slate-400 p-2',
                placementClass,
            ]"
        >
            <slot name="content" />
        </div>
    </component>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
    placement: {
        type: String,
        default: 'top',
    },
    as: {
        type: String,
        default: 'div',
    },
});
const placementClass = computed(() => {
    switch (props.placement) {
        case 'top':
            return 'bottom-full mb-1 left-1/2 -translate-x-1/2';
        case 'top-start':
            return 'bottom-full mb-1 left-0';
        case 'top-end':
            return 'bottom-full mb-1 right-0';
        case 'bottom':
            return 'bottom-0 left-1/2 -translate-x-1/2';
        case 'left':
            return 'top-1/2 -translate-y-1/2 left-0';
        case 'right':
            return 'top-1/2 -translate-y-1/2 right-0';
        default:
            return 'top-0 left-1/2 -translate-x-1/2';
    }
});
</script>
