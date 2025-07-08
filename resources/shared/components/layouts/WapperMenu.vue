<script setup>
import { ChevronRightIcon } from '@heroicons/vue/24/solid';
import { Link } from '@inertiajs/vue3';
import { isActive } from '@shared/helpers';
defineProps({
    navItems: Object,
    active: String,
});
</script>

<template>
    <div class="md:grid gap-6 justify-between md:grid-cols-4">
        <ul
            class="rounded-lg w-full text-sm font-semibold tracking-wide divide-y divide-gray-500/10 text-slate-700 md:col-span-1 h-fit md:sticky top-14 grid gap-2"
        >
            <li v-for="(item, index) in navItems" :key="index" class="pt-2 first:pt-0">
                <div
                    :class="{
                        'bg-white text-primary shadow-box-2  rounded-xl btn-m': isActive('', item.pathname),
                    }"
                >
                    <Link
                        :href="item.path"
                        class="flex w-full py-3 items-center gap-3 px-2 hover:bg-white rounded-xl t-3"
                    >
                        <component :is="item.icon" class="w-5" />
                        <div class="flex-grow">
                            {{ item.title }}
                            <p v-if="item.content" class="text-xxs font-normal">{{ item.content }}</p>
                        </div>

                        <ChevronRightIcon class="w-4 opacity-40" />
                    </Link>
                    <ul v-if="isActive('', item.pathname) && item.children" class="text-slate-400 border-t py-2">
                        <Link
                            v-for="(subitem, idx) in item.children"
                            :key="idx"
                            as="li"
                            class="pl-10 flex text-xxs gap-2 hover:underline hover:text-primary cursor-pointer"
                            :href="item.path + '?tab=' + subitem.id"
                        >
                            <div class="flex-grow font-normal" :class="{ 'text-primary': active === subitem.id }">
                                {{ subitem.title }}
                            </div>
                        </Link>
                    </ul>
                </div>
            </li>
        </ul>
        <div class="w-full md:col-span-3 h-fit">
            <slot />
        </div>
    </div>
</template>
