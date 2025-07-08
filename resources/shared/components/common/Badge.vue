<template>
    <component
        :is="as"
        class="flex-center gap-x-1.5 rounded-full px-2 py-0.5 h-6 leading-[1] text-xs font-medium ring-1 ring-inset w-fit"
        :class="variant"
    >
        <component :is="icon" v-if="icon" class="w-3.5 h-3.5" />
        <slot />
    </component>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    icon: [Function],
    info: Boolean,
    error: Boolean,
    success: Boolean,
    warning: Boolean,
    primary: Boolean,
    secondary: Boolean,
    dark: Boolean,
    color: String,

    as: {
        type: String,
        default: 'span',
    },
});
const variant = computed(() => [
    {
        'text-gray-900 ring-gray-200': props.secondary,
        'bg-blue-100 text-blue-800 ring-blue-200': props.info,
        'bg-green-100 text-green-800 ring-green-200': props.success,
        'bg-yellow-50 text-yellow-800 ring-yellow-200': props.warning,
        'bg-red-100 text-red-800 ring-red-200': props.error,
        'bg-orange-100 text-primary ring-orange-200': props.primary,
        'bg-gray-700 text-gray-100 ring-black': props.dark,
        [props.color + ' ' + '!ring-0']: !!props.color,
    },
]);
</script>
