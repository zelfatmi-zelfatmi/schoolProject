<script setup>
import { Thumb } from '@shared/components';
import { dateFormat } from '@shared/helpers';

defineProps({
    item: {
        type: Object,
        default: () => ({}),
    },
});
</script>

<template>
    <li class="">
        <div class="w-full flex gap-3">
            <Thumb class="!rounded-full" :src="item.user_comment?.profile_photo_url" :alt="item.name" />
            <div class="flex-1 bg-slate-100 p-3 rounded-xl">
                <div class="flex gap-3 justify-between mb-1">
                    <h6 class="font-bold">{{ item.name }}</h6>
                    <span class="text-xs text-gray-500">{{ dateFormat(item.created_at, 'fromNow') }}</span>
                </div>
                <p class="text-sm">{{ item.comment }}</p>
            </div>
        </div>
        <div class="flex gap-3 ml-[62px] mb-5 mt-2">
            <Thumb size="sm" class="!rounded-full" :src="item.user?.profile_photo_url" :alt="item.name" />
            <div class="flex-1 bg-slate-100 p-3 rounded-xl">
                <div class="flex gap-3 justify-between mb-1">
                    <h6 class="font-bold">{{ item?.user?.name }}</h6>
                    <!-- <span class="text-xs text-gray-500">{{ dateFormat(item.created_at, 'fromNow') }}</span> -->
                </div>
                <p class="text-sm" v-html="item.reply"></p>
            </div>
        </div>
    </li>
</template>
