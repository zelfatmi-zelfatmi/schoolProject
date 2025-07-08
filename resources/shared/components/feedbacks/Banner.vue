<script setup>
import { XMarkIcon, ArrowRightIcon } from '@heroicons/vue/20/solid';
import { computed } from 'vue';

defineEmits(['dismiss']);
const props = defineProps({
    status: {
        type: String,
        default: 'secondary',
    },
    href: String,
    title: String,
    content: String,
});

const statusColor = computed(() => {
    switch (props.status) {
        case 'secondary':
            return '#6b7280';
        case 'info':
            return '#3c82f6';
        case 'success':
            return '#22c55d';
        case 'primary':
            return '#ea580b';
        default:
            return '#6b7280';
    }
});
</script>

<template>
    <div
        :style="{
            '--color-status': statusColor,
        }"
        class="relative isolate flex items-center gap-x-6 overflow-hidden px-6 py-4 sm:px-3.5 rounded-xl bg-white shadow-sm shadow-[--color-status]"
        :class="{ 'border border-primary': status === 'primary' }"
    >
        <div
            v-if="status !== 'primary'"
            class="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
            aria-hidden="true"
        >
            <div
                class="clippath aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[--color-status] to-[#9089fc] opacity-40"
            />
        </div>
        <div
            v-if="status !== 'primary'"
            class="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
            aria-hidden="true"
        >
            <div
                class="clippath aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[--color-status] to-[#9089fc] opacity-30"
            />
        </div>
        <p class="text-sm leading-6 text-gray-700 hover:text-black flex-1">
            <a
                :href="href || '#'"
                target="_blank"
                class="flex gap-4 items-center"
                :class="{ 'text-primary': status === 'primary' }"
            >
                <strong v-if="title" class="font-semibold">{{ title }}</strong>
                {{ content }}
                <ArrowRightIcon v-if="href" class="w-4" />
            </a>
        </p>
        <button type="button" class="-m-3 p-3 focus-visible:outline-offset-[-4px]" @click="$emit('dismiss')">
            <span class="sr-only">Dismiss</span>
            <XMarkIcon class="h-5 w-5 text-gray-900" aria-hidden="true" />
        </button>
    </div>
</template>
