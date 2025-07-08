<script setup>
import { PlusCircleIcon, TrashIcon ,BellIcon } from '@heroicons/vue/20/solid';
import { usePage } from '@shared/stores';
import { getMediaUrl, getInitials, isActive } from '@shared/helpers';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { Box, Button } from '@shared/components';
import { headerNavigation } from '@admin/constants';
import { useStorage } from '@shared/hooks';
import { reactive, computed ,ref} from 'vue';
import { Link } from '@inertiajs/vue3';
import { usePage as usePage1 } from '@inertiajs/vue3';
import { router } from '@inertiajs/vue3';
import { routes } from '@admin/routes';

defineEmits(['sidebar:change']);
const { drawer, user } = usePage();
const [links, setLinks] = useStorage('HEADER:LINKS', []);
const { props } = usePage1();

const state = reactive({
    name: '',
    url: '',
});
const items = computed(() => [...headerNavigation, ...links.value]);
const checkEspace = (value = '') => value?.includes(window.location.hostname + '/admin/');
const handleSubmit = (close) => {
    close();
    setLinks([...links.value, { name: state.name, href: state.url }]);
};

const notifications = ref(props?.notifications || []);
console.log('🔔 Notifications:', notifications.value);

const unreadCount = computed(() =>
  notifications.value.filter(n => !n.read_at).length
)
const markAsReadAndRedirect = (notif,close) => {
  axios.post(route('admin.notifications.read', notif.id)).then(() => {
    notif.read_at = new Date().toISOString();
    close?.();

    // 🔁 Redirection selon le type
    const type = notif.data?.type;
    console.log("hello inscription ",type);
    switch (type) {
      case 'annulation':
        router.visit(route(routes.annulationTardive.index));
        break;
      case 'new_registration':
        router.visit(route(routes.users.eleve.general, notif.data?.eleve_id));
        break;
      case 'payment_completed':
        router.visit(route(routes.shop.orders.show,notif.data?.order_id));
        break;
        case 'comment_read':
     router.visit(route(routes.plannings.main.list, { session_id: notif.data?.session_id , moniteur_id: notif.data?.moniteur_id,
}));
     break;
      default:
      router.visit(route(routes.users.eleve.general, notif.data?.eleve_id));
      break;
    }
  });
};


</script>

<template>
    <header class="flex h-9 w-full fixed top-0 z-[900] bg-black shadow-lg text-white">
        <div class="w-60 flex items-center justify-start px-2">
            <div class="flex items-center gap-3 bg-">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mx-2 text-white fill-current"
                    viewBox="0 0 512 512"
                    @click="$emit('sidebar:change', true)"
                >
                    <path
                        d="M425.7 118.25A240 240 0 0076.32 447l.18.2c.33.35.64.71 1 1.05.74.84 1.58 1.79 2.57 2.78a41.17 41.17 0 0060.36-.42 157.13 157.13 0 01231.26 0 41.18 41.18 0 0060.65.06l3.21-3.5.18-.2a239.93 239.93 0 00-10-328.76zM240 128a16 16 0 0132 0v32a16 16 0 01-32 0zM128 304H96a16 16 0 010-32h32a16 16 0 010 32zm48.8-95.2a16 16 0 01-22.62 0l-22.63-22.62a16 16 0 0122.63-22.63l22.62 22.63a16 16 0 010 22.62zm149.3 23.1l-47.5 75.5a31 31 0 01-7 7 30.11 30.11 0 01-35-49l75.5-47.5a10.23 10.23 0 0111.7 0 10.06 10.06 0 012.3 14zm31.72-23.1a16 16 0 01-22.62-22.62l22.62-22.63a16 16 0 0122.63 22.63zm65.88 227.6zM416 304h-32a16 16 0 010-32h32a16 16 0 010 32z"
                    />
                </svg>
                <a href="/" class="text-xxs tracking-wide font-bold"> Voir Moniteur Indipendant</a>
            </div>
        </div>
        <div
            class="flex items-center justify-end md:justify-between flex-1 max-w-screen-2xl px-4 sm:px-6 lg:px-8 mx-auto"
        >
            <ul :key="$page.url" class="flex gap-1">
                <template v-for="(item, idx) in items" :key="idx">
                    <li v-if="!item.divider" class="relative group">
                        <component
                            :is="checkEspace(item.href) ? Link : 'a'"
                            :href="item.href"
                            :class="[
                                isActive(item.href) ? 'bg-primary' : 'text-gray-100 hover:bg-primary/20',
                                'p-1 text-xxs font-medium flex-center gap-1 rounded-lg h-7 min-w-7',
                            ]"
                            aria-current="page"
                        >
                            <component :is="item.icon" v-if="item.icon" class="h-5 w-5" />
                            <b v-else-if="item.name" class="md:hidden font-black">{{ getInitials(item.name) }}</b>
                            <span v-if="item.name" class="max-md:hidden">{{ item.shortName || item.name }}</span>
                        </component>
                        <Box
                            v-if="!item.sticky"
                            as="ul"
                            sectionned
                            :separated="false"
                            class="absolute top-full left-1/2 -translate-x-1/2 border mt-1 text-black w-full min-w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible t-4 divide-y"
                        >
                            <li
                                class="py-2 !px-3 cursor-pointer flex gap-2 items-center btn btn-link btn-danger btn-sm !text-xs"
                                @click="setLinks(links.filter((link) => link !== item))"
                            >
                                <TrashIcon class="h-4 w-4" />
                                Supprimer
                            </li>
                        </Box>
                    </li>
                </template>
                <Popover as="li" class="relative">
                    <PopoverButton
                        class="px-1 py-1 text-xxs font-medium flex-center gap-1 rounded-lg h-7 min-w-7 text-gray-100 hover:bg-primary/20"
                    >
                        <PlusCircleIcon class="h-5 w-5 text-white" />
                        <span class="max-md:hidden">Creer</span>
                    </PopoverButton>

                    <transition name="slide-up">
                        <PopoverPanel
                            v-slot="{ close }"
                            class="absolute max-md:right-0 md:left-1/2 md:-translate-x-1/2 z-10 mt-2 w-screen max-w-sm transform text-sm"
                        >
                            <form
                                class="overflow-hidden rounded-2xl shadow-lg bg-black ring-1 ring-black/5"
                                @submit.prevent="handleSubmit(close)"
                            >
                                <div class="relative grid gap-3 p-3">
                                    <div class="input-new">
                                        <input v-model="state.name" class="" required placeholder="Nom" />
                                    </div>
                                    <div class="input-new">
                                        <input
                                            v-model="state.url"
                                            class="bg-none border-none outline-none"
                                            required
                                            type="url"
                                            placeholder="URL"
                                        />
                                    </div>
                                </div>
                                <div class="bg-white/5 px-3 py-1.5 flex gap-3">
                                    <Button secondary type="button" @click="close">Fermer</Button>
                                    <Button primary full type="submit">Créer</Button>
                                </div>
                            </form>
                        </PopoverPanel>
                    </transition>
                </Popover>
            </ul>
            <div class="flex gap-2">
                <Popover class="relative">
    <PopoverButton
        class="relative rounded-full bg-white/10 p-1 w-7 flex justify-center items-center text-white hover:text-gray-300"
    >
        <BellIcon class="h-5 w-5" />
        <span
            v-if="unreadCount > 0"
            class="absolute top-0 right-0 h-4 w-4 bg-red-600 text-white text-[10px] rounded-full flex items-center justify-center"
        >
            {{ unreadCount }}
        </span>
    </PopoverButton>

    <transition name="slide-up">
        <PopoverPanel
          v-slot="{ close }"
  class="absolute right-0 mt-2 w-80 rounded-lg bg-white text-black shadow-xl ring-1 ring-black/5 z-50"
>
  <div class="p-3">
    <h4 class="text-sm font-semibold text-gray-700 mb-2">🛎️ Notifications</h4>
    <ul class="divide-y divide-gray-200 max-h-72 overflow-y-auto">
      <li
        v-for="notif in notifications"
        :key="notif.id"
        class="flex gap-3 p-3 hover:bg-gray-50 transition rounded-md cursor-pointer"
        @click="markAsReadAndRedirect(notif, close)"
      >
        <!-- BADGE TYPE -->
        <div class="flex-shrink-0">
          <div
            v-if="notif.data.type === 'payment_completed'"
            class="bg-green-100 text-green-600 text-xs px-2 py-1 rounded font-bold"
            title="Paiement complété"
          >
            Paiement
          </div>

          <div
            v-else-if="notif.data.type === 'annulation_tardive'"
            class="bg-red-100 text-red-600 text-xs px-2 py-1 rounded font-bold"
            title="Annulation tardive"
          >
            Annulation
          </div>

          <div
            v-else
            class="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium"
            title="Info"
          >
            <svg
              class="w-3 h-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M18 10A8 8 0 112 10a8 8 0 0116 0zM9 9a1 1 0 112 0v5a1 1 0 11-2 0V9zm1-4a1.25 1.25 0 100 2.5A1.25 1.25 0 0010 5z"
                clip-rule="evenodd"
              />
            </svg>
            Info
          </div>
        </div>

        <!-- CONTENU DE LA NOTIFICATION -->
        <div class="flex-1">
          <p
            class="text-sm font-medium text-gray-800"
            :class="{ 'font-bold': !notif.read_at }"
          >
            {{ notif.data.message }}
          </p>
          <small class="text-gray-500">{{ notif.created_at }}</small>
        </div>

        <!-- POINT ROUGE NON LU -->
        <div v-if="!notif.read_at" class="flex items-start">
          <span class="h-2 w-2 mt-1 bg-red-500 rounded-full"></span>
        </div>
      </li>
    </ul>
  </div>
</PopoverPanel>


    </transition>
</Popover>


                <div>
                    <button
                        class="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2"
                        @click="drawer.open()"
                    >
                        <span class="sr-only">Open user menu</span>
                        <img class="h-7 w-7 rounded-full" :src="getMediaUrl(user)" :alt="user.name" />
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss">
/* background: linear-gradient(to bottom, #ffffff2b, #ffffff0a); */

.input-new {
    --p-color-border-gradient-experimental: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.17),
        rgba(255, 255, 255, 0.04)
    );
    --p-border-width-025: 0.0625rem;
    @apply rounded-xl outline-none h-9 bg-[#352e3e] relative text-xs overflow-hidden;
    & > input {
        @apply w-full bg-transparent border-none outline-none text-white px-3 text-xs h-9 py-0 relative z-1;
    }
    // @apply rounded-xl outline-none h-9 bg-[#303030] relative border-t border-b-transparent border-x-black  border-[#555] text-white px-3 text-xs;
    &::before {
        @apply rounded-xl;
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border: solid var(--p-border-width-025) transparent;
        background: var(--p-color-border-gradient-experimental) border-box;
        -webkit-mask: linear-gradient(rgba(255, 255, 255, 1) 0 0) padding-box,
            linear-gradient(rgba(255, 255, 255, 1) 0 0);
        mask: linear-gradient(rgba(255, 255, 255, 1) 0 0) padding-box, linear-gradient(rgba(255, 255, 255, 1) 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
    }
}
</style>
