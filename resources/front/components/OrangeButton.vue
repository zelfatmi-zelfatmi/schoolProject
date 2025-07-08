<template>
    <component
        :is="href ? (reload ? 'a' : Link) : 'button'"
        :href="href"
        type="button"
        class="uppercase rounded-full bg-primary disabled:pointer-events-none disabled:opacity-70 disabled:shadow-none disabled:bg-gray-300 disabled:text-gray-950 text-white shadow-box hover:bg-white hover:text-primary block py-3 md:py-4 px-6 lg:px-12 text-center text-xs font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary relative"
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
import { Spinner } from '@shared/components';
import { Link } from '@inertiajs/vue3';
defineProps({
    loading: Boolean,
    reload: Boolean,
    href: String,
});
</script>
