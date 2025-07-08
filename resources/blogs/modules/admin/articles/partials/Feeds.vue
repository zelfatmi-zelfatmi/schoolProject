<script setup>
import { CheckCircleIcon } from '@heroicons/vue/24/solid';
import { Box } from '@shared/components';
import { dateFormat } from '@shared/helpers';

defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
});
</script>
<template>
    <Box title="Historique" class="mt-5">
        <ul role="list" class="space-y-6 mt-3">
            <li class="relative flex gap-x-3 items-center">
                <div :class="['absolute left-0 top-0 flex w-6 justify-center -bottom-6']">
                    <div class="w-px bg-gray-200" />
                </div>
                <img
                    :src="data.user.profile_photo_url"
                    alt=""
                    class="relative h-8 w-8 -ml-1 flex-none rounded-full bg-gray-50"
                />
                <div class="flex-auto">
                    <div class="flex justify-between gap-x-4">
                        <div class="py-0.5 text-xs leading-5 text-gray-500 font-medium">
                            <span class="font-bold text-gray-900">{{ data.user.name }}</span> a Crée l'article.
                        </div>
                        <time :datetime="data.created_at" class="flex-none py-0.5 text-xs leading-5 text-gray-500">
                            {{ dateFormat(data.created_at, 'fromNow') }}
                        </time>
                    </div>
                </div>
            </li>
            <li v-for="(activity, idx) in data.user_history" :key="activity.id" class="relative flex gap-x-4">
                <div
                    :class="[
                        idx === data.user_history.length - 1 ? 'h-6' : '-bottom-6',
                        'absolute left-0 top-0 flex w-6 justify-center',
                    ]"
                >
                    <div class="w-px bg-gray-200" />
                </div>

                <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-slate-50">
                    <CheckCircleIcon
                        v-if="activity.type === 'paid'"
                        class="h-6 w-6 text-indigo-600"
                        aria-hidden="true"
                    />
                    <div v-else class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                </div>
                <p class="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                    <span class="font-medium text-gray-900">{{ activity.user.name }}</span>
                    {{ activity.type }} a modifié l'article.
                </p>
                <time :datetime="activity.updated_at" class="flex-none py-0.5 text-xs leading-5 text-gray-500">
                    {{ dateFormat(activity.updated_at, 'fromNow') }}
                </time>
            </li>
        </ul>
    </Box>
</template>
