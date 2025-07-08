<template>
    <Drawer :show="drawer.value" @close="drawer.close()">
        <dl class="p-4 border-b">
            <dd>
                <button class="btn-hover flex gap-2 items-center" @click="drawer.close()">
                    <ChevronLeftIcon class="w-8 p-1 bg-white shadow-box-2 rounded-full" />

                    Retour
                </button>
            </dd>
            <dd class="flex flex-col items-center">
                <Thumb :src="getMediaUrl(user)" size="xl" class="!rounded-full" />
                <b v-if="user.name">{{ user.name }}</b>
                <p v-if="user.email">{{ user.email }}</p>
                <p v-if="user.telephone">{{ user.telephone }}</p>
            </dd>
        </dl>
        <ul class="flex flex-col gap-2 p-4 h-full">
            <template v-for="(item, key) in drawerNavigation" :key="key">
                <li v-if="item.divider" class="font-semibold text-md pt-2 block text-gray-600">
                    {{ item.name }}
                </li>
                <li v-else-if="!item.grow" @click="drawer.close()">
                    <Link
                        :href="item.href || '#'"
                        class="group flex items-center gap-x-3 rounded-xl p-3 font-semibold bg-white shadow-sm btn-hover"
                    >
                        <span class="flex-1">{{ item.name }}</span>
                        <ChevronRightIcon class="w-7" />
                    </Link>
                </li>
            </template>
            <li class="flex-1"></li>
            <li>
                <button
                    class="btn w-full btn-link btn-danger justify-center active:bg-red-100 rounded-xl !h-10 -mb-2"
                    as="button"
                    @click.stop="logout()"
                >
                    Se déconnecter
                </button>
            </li>
        </ul>
    </Drawer>
</template>

<script setup>
import { Drawer, Thumb } from '@shared/components';
import { usePage } from '@shared/stores';
import { getMediaUrl } from '@shared/helpers';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';
import { Link } from '@inertiajs/vue3';
import { drawerNavigation } from '@admin/constants';
const { user, drawer, logout } = usePage();
</script>
