<template>
    <Popover class="flex-1" :arrow="false">
        <div class="flex gap-1 items-center">
            <button
                class="flex items-center gap-x-2 rounded-full text-sm font-semibold leading-6 text-gray-900 hover:bg-gradient-to-tr from-primary to-orange-400 hover:text-white flex-1"
            >
                <img
                    class="h-9 w-9 m-0.5 rounded-full border border-slate-400 shadow-sm"
                    :src="getMediaUrl(user)"
                    :alt="user.name"
                />
                <span v-if="!sideStore.sidebarCollapse" aria-hidden="true"> {{ user.name }}</span>
            </button>
        </div>
        <template #content>
            <div class="flex flex-col gap-0.5 w-60 divide-x divide-y">
                <button
                    class="btn w-full btn-link btn-danger h-10 justify-start hover:bg-red-50 rounded-xl"
                    as="button"
                    @click.stop="logout()"
                >
                    Se déconnecter
                </button>
            </div>
        </template>
    </Popover>
</template>

<script setup>
import Popover from './Popover.vue';
import { getMediaUrl } from '@shared/helpers';
import { usePage, useSideBarControll } from '@shared/stores';
const sideStore = useSideBarControll();
const { user, logout } = usePage();
</script>
