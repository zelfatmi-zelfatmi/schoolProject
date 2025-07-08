<template>
    <component
        :is="href ? (reload ? 'a' : Link) : 'button'"
        :href="href"
        type="button"
        class="font-medium uppercase bg-white text-primary shadow-box-2 hover:bg-primary hover:text-white ring-1 ring-primary block rounded-full py-4 px-auto lg:px-12 text-center text-xs leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary relative"
    >
        <div v-if="loading" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Spinner class="fill-primary w-5 h-5 text-gray-300 animate-spin" />
        </div>
        <div class="flex-center" :class="{ 'opacity-0': loading }">
            <slot />
        </div>
    </component>
</template>
<script setup>
import { Link } from '@inertiajs/vue3';
import { Spinner } from '@shared/components';

defineProps({
    loading: Boolean,
    reload: Boolean,
    href: String,
});
</script>
