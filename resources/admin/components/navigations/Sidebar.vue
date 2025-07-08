<template>
    <div
        id="admin-sidebar"
        :class="[
            sideStore.sidebarCollapse ? 'max-w-[52px] sidebar-collapse' : 'max-w-full',

            state.showMenuLogo ? '' : 'overflow-y-auto',
        ]"
        class="h-[100dvh-36px] sticky top-9 inset-y-0 flex flex-col gap-y-3 rounded-tl-2xl bg-slate-100 w-full z-[800] no-scrollbar"
    >
        <div class="menu-logo-container p-2 relative z-10">
            <div
                class="flex justify-between items-center bg-gray-400/20 rounded-xl py-1 relative z-1 btn-m menu-logo"
                @click="state.showMenuLogo = !state.showMenuLogo"
            >
                <img
                    class="h-10 object-contain px-1"
                    :src="[
                        `/assets/images/logo/${
                            sideStore.sidebarCollapse && !state.showMenuLogo ? 'small_light_logo' : 'light_logo'
                        }.png`,
                    ]"
                    alt="Logo monietur indipendant"
                />
                <ChevronDownIcon :class="['h-5 w-8 text-gray-500 t-4', state.showMenuLogo && '-rotate-180']" />
            </div>
            <div
                :class="[
                    'absolute inset-1 text-white bg-black shadow-lg rounded-2xl overflow-hidden pt-14 flex h-fit t-4 menu-logo-wapper',
                    state.showMenuLogo ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-90',
                ]"
            >
                <ul class="flex flex-col w-full text-sm" @click="state.showMenuLogo = false">
                    <li>
                        <a
                            href="/"
                            target="_blank"
                            class="p-2 btn-m hover:bg-white/10 flex gap-2"
                            rel="noopener noreferrer"
                        >
                            <EyeIcon class="h-5 w-5 text-gray-500" />
                            Voir site
                        </a>
                    </li>
                    <li>
                        <a
                            href="/blog"
                            class="p-2 btn-m hover:bg-white/10 flex gap-2"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <DocumentTextIcon class="h-5 w-5 text-gray-500" />
                            Voir Blog site
                        </a>
                    </li>
                    <li>
                        <a
                            href="/blog/admin/articles"
                            class="p-2 btn-m hover:bg-white/10 flex gap-2"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <DocumentTextIcon class="h-5 w-5 text-gray-500" />
                            Espace Blog admin
                        </a>
                    </li>
                    <li class="p-2 btn-m hover:bg-white/10 flex gap-2" @click="drawer.open()">
                        <CogIcon class="h-5 w-5 text-gray-500" />
                        Parametres
                    </li>
                    <li
                        class="p-2 btn-m hover:bg-white/10 border-t border-white/20 flex gap-2 text-red-500"
                        @click="logout()"
                    >
                        <ArrowRightStartOnRectangleIcon class="h-5 w-5 text-red-500" />
                        Deconnexion
                    </li>
                </ul>
            </div>
        </div>
        <nav class="flex flex-1 flex-col">
            <ul :key="$page.component" role="list" class="flex flex-1 flex-col text-black/80">
                <NavigationItem v-for="item in navigation" :key="item.name" :item="item" />
            </ul>
        </nav>
        <div class="p-2">
            <button
                class="flex-center font-medium text-xs h-8 p-0.5 w-full hover:bg-white hover:shadow-sm hover:ring-1 ring-gray-200 px-2 rounded-xl"
                @click="sideStore.sidebarCollapse = !sideStore.sidebarCollapse"
            >
                <span v-if="!sideStore.sidebarCollapse" class="flex-1 text-left"> Reduire menu </span>
                <svg
                    :class="{ 'rotate-180 ': !sideStore.sidebarCollapse }"
                    class="h-4 w-4 transition-all"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M3 4a1 1 0 0 0-1 1v14a1 1 0 0 0 2 0V5a1 1 0 0 0-1-1Zm18.92 7.62a1 1 0 0 0-.21-.33l-4-4a1 1 0 1 0-1.42 1.42l2.3 2.29H7a1 1 0 0 0 0 2h11.59l-2.3 2.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4-4a1 1 0 0 0 .21-.33a1 1 0 0 0 0-.76Z"
                        fill="currentColor"
                    />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup>
import { NavigationItem } from '@shared/components';
import { usePage, useSideBarControll } from '@shared/stores';
import { getNavigation } from './../../constants/navigations';
import {
    ArrowRightStartOnRectangleIcon,
    ChevronDownIcon,
    CogIcon,
    DocumentTextIcon,
    EyeIcon,
} from '@heroicons/vue/20/solid';
import { reactive, onMounted } from 'vue';
const state = reactive({
    showMenuLogo: false,
});
const { drawer, logout } = usePage();
const navigation = getNavigation();
const sideStore = useSideBarControll();
onMounted(() => {
    const sidebar = document.querySelector('#admin-sidebar');
    let previousScroll = window.scrollY;
    document.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        sidebar.scrollBy(0, currentScroll - previousScroll);

        previousScroll = currentScroll;
    });
});
</script>
<style scoped lang="scss">
.sidebar-collapse {
    .menu-logo-container {
        @apply p-1;
        .menu-logo {
            svg {
                @apply hidden;
            }
        }
        .menu-logo-wapper {
            @apply w-60 inset-0.5;
        }
    }
}
</style>
