<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
    <div class="grid grid-cols-2 md:grid-cols-5 w-full text-slate-600 gap-0.5 text-sm">
        <component
            :is="parsedLinks.first?.url && !isApi ? Link : 'button'"
            :class="[
                'flex items-center text-sm hover:text-primary',
                !parsedLinks.first?.url && 'opacity-50 pointer-events-none',
            ]"
            :href="parsedLinks.first?.url ? getLink(parsedLinks.first?.url) : '#'"
            @click="isApi && $emit('click:prev', parsedLinks.first?.url)"
        >
            <ChevronLeftIcon class="w-5" />
            <span class="flex-1">Précédent</span>
        </component>
        <div class="col-span-3 hidden md:flex gap-1 justify-center font-semibold">
            <template v-if="parsedLinks.list?.length > 1">
                <template v-for="(link, key) in parsedLinks.list">
                    <div
                        v-if="link.url === null"
                        :key="key"
                        class="h-8 px-4 flex justify-center items-center rounded-full pointer-events-none select-none opacity-60"
                        :class="{
                            '!px-0 w-6 border-gray-50': link.label.trim() == '...',
                        }"
                        v-html="link.label.trim() == '...' ? '•••' : link.label"
                    />
                    <component
                        :is="isApi ? 'button' : Link"
                        v-else
                        :key="'link-' + key"
                        class="!h-7 !w-7 flex-center rounded-full btn-m btn"
                        :class="{
                            ' btn-primary pointer-events-none': link.active,
                            'btn-link hover:bg-slate-100': !link.active,
                            'w-7 hidden md:flex': !isNaN(Number(link.label)),
                            'bg-slate-50': isNaN(Number(link.label)),
                        }"
                        :href="getLink(link.url)"
                        @click="isApi && $emit('click:page', link.url)"
                        v-html="link.label"
                    />
                </template>
            </template>
        </div>
        <component
            :is="parsedLinks.last?.url && !isApi ? Link : 'button'"
            :class="[
                'flex items-center text-sm hover:text-primary justify-end',
                !parsedLinks.last?.url && 'opacity-50 pointer-events-none',
            ]"
            :href="parsedLinks.last?.url ? getLink(parsedLinks.last?.url) : '#'"
            @click="isApi && $emit('click:next', parsedLinks.last?.url)"
        >
            <span class="w-fit">Suivant</span>
            <ChevronRightIcon class="w-5" />
        </component>
    </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/20/solid';

defineEmits(['click:page', 'click:prev', 'click:next']);
const props = defineProps({
    links: {
        type: Array,
        default: () => [],
    },
    isApi: Boolean,
});

const parsedLinks = computed(() => {
    const list = [...props.links];
    const obj = {
        first: null,
        last: null,
    };

    if (props.links?.length > 2) {
        obj.first = list.shift();
        obj.last = list.pop();
        obj.list = list;
    }
    return obj;
});
const getLink = (url) => {
    if (props.isApi) {
        return url;
    }
    const parsedUrl = new URL(location.href);
    const { page } = Object.fromEntries(new URL(url).searchParams);
    if (page) {
        parsedUrl.searchParams.set('page', page);
    }
    return parsedUrl.href;
};
</script>
