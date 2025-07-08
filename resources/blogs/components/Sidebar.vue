<template>
    <div>
        <div class="flex grow flex-col gap-y-3 overflow-y-auto border-r border-gray-200 bg-gray-80">
            <div class="flex py-0.5 border-b items-center sticky top-0 bg-gray-80 z-1">
                <img class="h-12 object-contain px-4" src="@assets/images/logo/light_logo.png" alt="Logo" />
            </div>
            <nav class="flex flex-1 flex-col">
                <ul :key="$page.component" role="list" class="flex flex-1 flex-col gap-1">
                    <NavigationItem v-for="item in navigation" :key="item.name" :item="item" />
                </ul>
            </nav>
            <a
                href="#"
                class="flex items-center gap-x-4 px-6 py-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50 sticky bottom-0 bg-gray-80 border-t"
            >
                <img
                    class="h-8 w-8 rounded-full bg-gray-50"
                    :src="auth?.user.profile_photo_url"
                    :alt="auth?.user.name"
                />
                <span class="sr-only">Your profile</span>
                <span aria-hidden="true"> {{ auth.user.name }} </span>
            </a>
        </div>
    </div>
</template>

<script setup>
import {
    ChatBubbleBottomCenterIcon,
    CommandLineIcon,
    PencilSquareIcon,
    RectangleStackIcon,
    Squares2X2Icon,
    WindowIcon,
} from '@heroicons/vue/20/solid';
import { usePage } from '@inertiajs/vue3';
import { NavigationItem } from '@shared/components';
import { routes } from '@blogs/routes';

const { auth } = usePage().props;
const navigation = [
    { name: 'Categories', href: route(routes.admin.categories.list), icon: Squares2X2Icon },
    { name: 'Articles', href: route(routes.admin.articles.list), icon: PencilSquareIcon },
    { name: 'Commentaires ', href: route(routes.admin.comments.list), icon: ChatBubbleBottomCenterIcon },
    { name: 'Popups', href: route(routes.admin.popups.all), icon: WindowIcon },
    { name: 'Leads', href: route(routes.admin.leads.all), icon: RectangleStackIcon },
    { name: 'Script', href: route(routes.admin.script.all), icon: CommandLineIcon },
    { name: 'Redirection', href: route(routes.admin.redirections.all), icon: CommandLineIcon },
];
</script>
