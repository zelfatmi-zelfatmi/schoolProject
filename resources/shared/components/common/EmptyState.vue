<template>
    <component
        :is="as || 'div'"
        :class="['text-center text-gray-400', sectionned && 'bg-white shadow-box-2 pt-5 pb-8 rounded-2xl']"
    >
        <img
            v-if="typeof image === 'string'"
            class="mx-auto h-28 w-28 text-gray-400"
            :src="image"
            :alt="heading || title"
        />
        <component :is="image" v-else-if="typeof image === 'function'" class="mx-auto h-12 w-12 fill-current" />
        <h3 class="mt-2 text-md font-semibold text-gray-900">{{ heading || title }}</h3>
        <div class="mt-1 text-xs text-gray-500">
            <slot />
        </div>
        <div v-if="actions.length" class="flex gap-3 justify-center mt-6 mx-2">
            <Button v-for="action in actions" :key="action.name" v-bind="action">
                {{ action.label || action.title }}
            </Button>
        </div>
    </component>
</template>

<script setup>
import Button from './Button.vue';

defineProps({
    heading: String,
    as: String,
    title: String,
    sectionned: Boolean,
    image: [String, Function],
    actions: {
        type: Array,
        default: () => [],
    },
});
</script>
