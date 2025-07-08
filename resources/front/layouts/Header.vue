<template>
    <header :key="$page.component" class="w-full inset-x-0 top-0 z-50 bg-white shadow-sm">
        <nav class="flex items-center justify-between p-3 md:p-6 lg:px-12" aria-label="Global">
            <div class="flex lg:flex-1">
                <a href="/" class="-m-1.5 px-1.5">
                    <img class="h-14 md:h-[77px] object-contain" :src="logo" alt="Logo" />
                </a>
            </div>
            <div class="flex lg:hidden">
                <button
                    type="button"
                    class="-m-2.5 text-lg text-back inline-flex items-center justify-center rounded-md p-2.5"
                    @click="mobileMenuOpen = true"
                >
                    <span class="sr-only">Open main menu</span>
                    <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
            <div class="hidden lg:flex md:gap-x-4 lg:gap-x-6 xl:gap-x-11">
                <a
                    v-for="item in navigation"
                     :key="item.name"
                    :href="item.href"
                    class="flex"
                    :class="[
                        isActive(item.href)
                            ? 'relative text-primary before:absolute before:-bottom-10 before:left-0 before:w-full before:h-0.5 before:bg-primary'
                            : null,
                        'text-lg text-back leading-6 hover:text-primary relative before:absolute before:-bottom-10 before:left-0 before:w-full before:h-0.5 hover:before:bg-primary',
                    ]"
                >
                    <div v-if="item.badge && cart.count" class="flex">
                        <span
                            class="w-5 h-5 rounded-full ring-2 ring-white absolute -top-3 -right-3 bg-primary text-white text-xs flex justify-center leading-5"
                        >
                            {{ cart.count }}
                        </span>
                    </div>
                    <component :is="item.icon" v-if="item.icon" class="w-[26px]" />
                    <span v-else>
                        {{ item.name }}
                    </span>
                </a>


            </div>
            <div v-if="auth" class="hidden lg:flex lg:flex-1 lg:justify-end">
                <a
                    :href="loginLink"
                    class="flex gap-2 justify-center items-center border border-blue-950 rounded-full px-4 py-3 text-sm font-semibold leading-6 text-black"
                >
                    <UserCircleIcon class="w-7" />
                    <span> {{ auth.name || 'Votre compte' }} </span>
                </a>
            </div>
            <div v-else class="hidden lg:flex lg:flex-1 lg:justify-end">
                <a
                    :href="loginLink"
                    class="flex gap-2 justify-center items-center bg-orange-100 rounded-full px-5 py-3 text-sm font-semibold leading-6 text-black"
                >
                    <User />
                    Se connecter
                </a>
            </div>
        </nav>
        <Dialog as="div" class="lg:hidden" :open="mobileMenuOpen" @close="mobileMenuOpen = false">
            <div class="fixed inset-0 z-50" />
            <DialogPanel
                class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
            >
                <div class="flex items-center justify-between">
                    <a href="#" class="-m-1.5 p-1.5">
                        <img class="h-8 w-auto" :src="logo" alt="Logo" />
                    </a>
                    <button type="button" class="-m-2.5 p-2.5 text-primary" @click="mobileMenuOpen = false">
                        <span class="sr-only">Close menu</span>
                        <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div class="mt-6 flow-root">
                    <div class="-my-6 divide-y divide-gray-500/10">
                        <div class="space-y-2 py-6">
                            <a
                                v-for="item in navigation"
                                :key="item.name"
                                :href="item.href"
                                :class="isActive(item.href) ? 'bg-gray-50' : null"
                                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                @click="mobileMenuOpen = false"
                            >
                                <component :is="item.icon" v-if="item.icon" class="w-5" />
                                <span v-if="item.name">
                                    {{ item.name }}
                                </span>
                            </a>
                        </div>
                        <div class="py-6">
                            <div v-if="auth" class="flex lg:flex-1 lg:justify-end">
                                <a
                                    :href="loginLink"
                                    class="flex gap-2 justify-center items-center border border-blue-950 rounded-full px-4 py-3 text-sm font-semibold leading-6 text-black"
                                >
                                    <UserCircleIcon class="w-7" />
                                    <span> {{ auth.name || 'Votre compte' }} </span>
                                </a>
                            </div>
                            <div v-else class="flex lg:flex-1 lg:justify-end">
                                <a
                                    :href="loginLink"
                                    class="flex gap-2 justify-center items-center bg-orange-100 rounded-full px-5 py-3 text-sm font-semibold leading-6 text-black"
                                >
                                    <User />
                                    Se connecter
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogPanel>
        </Dialog>
    </header>
    <AuthModal />
</template>

<script setup>
import { defineComponent, h, ref } from 'vue';
import { Dialog, DialogPanel } from '@headlessui/vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import logo from '@assets/images/logo/light_logo.png';
import User from '@assets/icons/home/user.svg';
import { usePage } from '@inertiajs/vue3';
import { useCart } from '@shared/stores/index.js';
import AuthModal from '@shared/components/modals/AuthModal.vue';
import { isActive } from '@shared/helpers';
import { UserCircleIcon } from '@heroicons/vue/20/solid';


const cart = useCart();
const page = usePage();
const auth = page.props.auth.user;
const loginLink = ref("login");

// ✅ Correction : Utilisation de `ref([])` pour éviter les erreurs en SSR
const formatUrl = (href) => {
    if (!href.startsWith('http')) {
        return new URL(href, import.meta.env.VITE_APP_URL).href;
    }
    return href;
};

const mobileMenuOpen = ref(false);

// eslint-disable-next-line vue/one-component-per-file
const HomeIcon = defineComponent({
    render: () =>
        h('svg', { fill: 'none', viewBox: '0 0 26 26' }, [
            h('path', {
                fill: 'currentColor',
                d: 'M4.20009 23V13.7694H1L13.0001 3L25 13.7691H21.8001V22.9998H15.4001V16.0769H10.6001V22.9998L4.20009 23Z',
            }),
        ]),
});

// eslint-disable-next-line vue/one-component-per-file
const CartIcon = defineComponent({
    render: () =>
        h('svg', { fill: 'none', viewBox: '0 0 24 24' }, [
            h('path', {
                stroke: 'currentColor',
                'stroke-width': '2',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                d: 'M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z',
            }),
        ]),
});
;
const navigation =ref([
     { icon: HomeIcon, href: formatUrl('/accueil') },
     { name: 'Permis', href: formatUrl('/permis') },
     { name: 'Code de la route', href: formatUrl('/code-route') },
     { name: 'Tarifs', href: formatUrl(`/nos-tarifs`) },
     { name: 'CPF', href: formatUrl(`/cpf`) },
     { name: 'Devenir moniteur', href: formatUrl(`/devenir-moniteur`) },
    { icon: CartIcon, href: formatUrl(`/eleve/shop`), from: 'header' },
    ])

</script>
