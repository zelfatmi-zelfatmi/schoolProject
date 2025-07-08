<script setup>
import { useSlots } from 'vue';
import SpinnerIcon from './Spinner.vue';
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue';
defineEmits(['click']);
const props = defineProps({
    submit: Boolean,
    loading: Boolean,
    icon: Function,
    primary: Boolean,
    secondary: Boolean,
    dark: Boolean,
    outline: Boolean,
    info: Boolean,
    danger: Boolean,
    success: Boolean,
    yellow: Boolean,
    link: Boolean,
    mono: Boolean,
    fullwidth: Boolean,
    grouped: Boolean,
    full: Boolean,
    external: Boolean,
    self: Boolean,
    href: String,
    disabled: Boolean,
});
const hasSlot = computed(() => !!useSlots().default);
const classes = computed(() => {
    const obj = {
        disabled: props.disabled,
        'btn-mono': props.mono,
        'btn-outline': props.outline,
        '!w-full justify-center': props.fullwidth || props.full,
        'opacity-50 cursor-not-allowed bg-gray-300 text-gray-700': props.disabled
    };
    if (props.grouped) {
        obj['group-hover/actions:btn-info text-blue-500'] = props.info;
        obj['group-hover/actions:btn-dark text-black'] = props.dark;
        obj['group-hover/actions:btn-danger text-red-500'] = props.danger;
        obj['group-hover/actions:btn-success text-green-500'] = props.success;
        obj['group-hover/actions:btn-yellow text-orange-100'] = props.yellow;
        obj['group-hover/actions:btn-primary text-primary'] = props.link;
        return obj;
    }

    obj['btn-primary'] = props.primary;
    obj['btn-success'] = props.success;
    obj['btn-dark'] = props.dark;
    obj['btn-secondary'] = props.secondary;
    obj['btn-link'] = props.link;
    obj['btn-danger'] = props.danger;
    obj['btn-info'] = props.info;
    obj['btn-yellow'] = props.yellow;
    return obj;
});
</script>

<template>
    <component
        :is="external || self ? 'a' : Link"
        v-if="href"
        :href="href"
        class="btn relative"
        :class="classes"
        :target="external ? '_blank' : '_self'"
        :disabled="disabled || loading"
    >
        <component :is="icon" v-if="icon" class="h-5 w-5 mr-2 -ml-1" :class="{ '!-mr-1': !hasSlot }" />
        <slot />
    </component>
    <button
        v-else
        :type="submit ? 'submit' : 'button'"
        :loading="loading"
        :disabled="disabled || loading"
        class="btn relative"
        :class="classes"
        @click="$emit('click')"
    >
        <p v-if="loading" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <SpinnerIcon class="fill-primary w-5 h-5 text-gray-300 animate-spin" />
        </p>
        <p class="flex items-center" :class="{ 'opacity-0': loading }">
            <component :is="icon" v-if="icon" class="h-5 w-5 mr-2 -ml-1" :class="{ '!-mr-1': !hasSlot }" />
            <span v-if="hasSlot" class="mx-auto flex items-center gap-2"><slot /></span>
        </p>
    </button>
</template>
