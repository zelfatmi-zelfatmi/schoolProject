<script setup>
import { EllipsisHorizontalIcon, ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/20/solid';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { Head, Link } from '@inertiajs/vue3';
import { Badge, Banner, Button } from '@shared/components';
import { usePage as usePageStore } from '@shared/stores';
import { computed, onBeforeUnmount, onMounted } from 'vue';
import PageLoading from '@shared/components/feedbacks/PageLoading.vue';
import { router } from '@inertiajs/vue3';

const emit = defineEmits(['banner:dismiss']);
const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    subtitle: String,
    back: [Boolean, String],
    actions: {
        type: Array,
        default: () => [],
    },
    breadcumb: {
        type: Array,
        default: () => [],
    },
    badges: {
        type: Array,
        default: () => [],
    },
    width: {
        type: String,
        default: '2xl',
    },
    banner: {
        type: Object,
        default: () => ({}),
    },
});

const page = usePageStore();

const getActions = computed(() => [...props.actions, ...(page.actions || [])]);

const widthScreen = {
    full: 'max-w-screen-2xl',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
};

const closeBanner = () => {
    emit('banner:dismiss');
    props.banner?.close();
};

const handleBack = () => {
    if (typeof props.back === 'string') {
        return router.get(props.back);
    }
    history.back();
};

onMounted(() => {
    const mainInterval = setInterval(() => {
        const sidebar = document.querySelector('#admin-sidebar');
        if (sidebar) {
            const main = document.querySelector('main');
            main.style.minHeight = sidebar.scrollHeight + 'px';
        }
    }, 100);
    setTimeout(() => {
        clearInterval(mainInterval);
    }, 5000);
});

onBeforeUnmount(() => {
    page.actions = [];
});
</script>

<template>
    <Suspense>
        <template #default>
            <main
                :class="[
                    widthScreen[width] || 'max-w-screen-xl',
                    'p-4 sm:px-6 lg:px-8 md:py-6 flex-1 transition-all duration-500 flex flex-col gap-y-6 mx-auto text-black bg-slate-50 max-lg:rounded-tl-2xl rounded-tr-2xl  w-full',
                ]"
            >
                <Head :title="title" />
                <div class="flex sm:items-center max-sm:flex-col lg:justify-between">
                    <div class="min-w-0 flex-1">
                        <nav v-if="breadcumb.length" class="flex" aria-label="Breadcrumb">
                            <ol role="list" class="flex items-center space-x-2">
                                <div v-for="(item, index) in breadcumb" :key="index" class="flex items-center gap-2">
                                    <ChevronRightIcon
                                        v-if="index !== 0"
                                        class="h-4 flex-shrink-0 text-gray-400"
                                        aria-hidden="true"
                                    />
                                    <Link
                                        v-if="item.href"
                                        :href="item.href"
                                        class="text-sm font-semibold text-primary hover:underline"
                                    >
                                        {{ item.name }}
                                    </Link>
                                    <div v-else class="text-sm text-gray-500">
                                        {{ item.name }}
                                    </div>
                                </div>
                            </ol>
                        </nav>
                        <div class="flex items-center gap-2">
                            <button
                                v-if="back"
                                class="bg-primary shadow-sm border rounded-full flex-center h-10 w-10"
                                @click="handleBack"
                            >
                                <ChevronLeftIcon class="h-6 w-6 flex-shrink-0 text-white" aria-hidden="true" />
                            </button>
                            <div class="sm:truncate text-black flex-1">
                                <h2 class="text-xl sm:text-2xl font-bold leading-7">
                                    {{ title }}
                                </h2>
                                <p v-if="subtitle" class="opacity-70 text-md">
                                    {{ subtitle }}
                                </p>
                            </div>
                        </div>

                        <ul v-if="badges.length" class="sm:pt-1 flex flex-col sm:flex-row sm:flex-wrap gap-1 sm:gap-1">
                            <Badge
                                v-for="badge in badges"
                                :key="badge.name"
                                v-bind="badge"
                                :class="badge.className"
                                as="li"
                            >
                                <component
                                    :is="badge.icon"
                                    v-if="badge.icon"
                                    class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                    aria-hidden="true"
                                />
                                {{ badge.name }}
                            </Badge>
                        </ul>
                    </div>
                    <slot name="actions" />
                    <ul v-if="getActions.length" class="mt-5 flex lg:ml-4 lg:mt-0 gap-3 max-sm:justify-between">
                        <li
                            v-for="(action, index) in getActions"
                            :key="index"
                            :class="[action.primary ? 'lg:order-4' : 'hidden lg:block lg:order-1']"
                        >
                            <Button :key="index" v-bind="action" @click="action.onAction?.()">
                                {{ action.label }}
                            </Button>
                        </li>

                        <!-- Dropdown -->
                        <Menu v-if="getActions.length - 1 > 0" as="li" class="relative ml-3 lg:hidden">
                            <MenuButton class="btn flex-center px-1 w-9 h-9">
                                <EllipsisHorizontalIcon class="h-5 w-5" aria-hidden="true" />
                            </MenuButton>

                            <transition
                                enter-active-class="transition ease-out duration-200"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95"
                            >
                                <MenuItems
                                    as="ul"
                                    class="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                >
                                    <MenuItem
                                        v-for="(action, idx) in getActions"
                                        :key="idx"
                                        as="li"
                                        :class="[action.primary && 'hidden']"
                                    >
                                        <Button :key="idx" v-bind="action" link mono>
                                            {{ action.label }}
                                        </Button>
                                    </MenuItem>
                                </MenuItems>
                            </transition>
                        </Menu>
                    </ul>
                </div>
                <Banner v-if="banner.show" v-bind="banner" @dismiss="closeBanner" />
                <div class="flex-1">
                    <slot />
                </div>

                <p class="text-3xs text-center">Moniteur indipendant sous licence MIT</p>
            </main>
        </template>
        <template #fallback>
            <PageLoading
                :class="[
                    widthScreen[width] || 'max-w-screen-xl',
                    'px-4 sm:px-6 lg:px-8 py-8 w-full transition-all duration-500 mx-auto bg-slate-50',
                ]"
            />
        </template>
    </Suspense>
</template>
