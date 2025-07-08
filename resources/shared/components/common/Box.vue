<template>
    <component
        :is="as"
        :class="[
            sectionned && 'rounded-2xl shadow-box-2 flex flex-col h-fit',
            bgGray && 'bg-slate-50',
            !bgGray && sectionned && 'bg-white',
            sectionned && mb,
            paddingClass(),
            separated && 'gap-y-4',
        ]"
    >
        <div v-if="title || subtitle" class="w-full flex gap-3 items-center">
            <div class="flex-1">
                <h4 v-if="title" class="text-lg font-bold">{{ title }}</h4>
                <p v-if="subtitle" class="text-sm text-gray-500">{{ subtitle }}</p>
            </div>
            <slot name="action">
                <Button v-if="action" v-bind="action">{{ action.label || action.title }}</Button>
            </slot>
        </div>
        <slot />
    </component>
</template>
<script setup>
import Button from './Button.vue';

const props = defineProps({
    as: {
        type: [String, Object],
        default: 'div',
    },
    padding: {
        type: [String, Boolean],
        default: 'none',
    },
    separated: {
        type: Boolean,
        default: true,
    },
    bgGray: Boolean,
    mb: {
        type: [String, Boolean],
        default: 'mb-5',
    },
    sectionned: Boolean,
    title: String,
    action: Object,
    subtitle: String,
});
const paddingClass = () => {
    switch (props.padding) {
        case 'none':
            return '';
        case 'xs':
            return 'p-1';
        case 'sm':
            return 'p-2';
        case 'md':
            return 'p-4';
        case 'lg':
            return 'p-6';
        default:
            return 'p-4';
    }
};
</script>
