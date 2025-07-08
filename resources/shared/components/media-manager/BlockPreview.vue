<script setup>
// import { strip } from '@shared/helpers';
import { useMediaManager } from '@shared/stores';
import { Badge, Button } from '../common';
import { api, fileTypes } from './MediaManager';
import axios from 'axios';
import { ref } from 'vue';
import { DocumentTextIcon } from '@heroicons/vue/20/solid';

const props = defineProps({
    media: {
        type: Object,
        default: () => ({}),
    },
});
const mediaManager = useMediaManager();
const deleting = ref(false);

const handleDelete = () => {
    deleting.value = true;
    axios
        .delete(route(api.mediaDestroy, props.media.id))
        .then(({ data }) => {
            if (data.message) {
                mediaManager.selectedMedia = mediaManager.selectedMedia.filter((media) => media.id !== props.media.id);
                mediaManager.list.storageMedia = mediaManager.list.storageMedia.filter(
                    (media) => media.id !== props.media.id
                );
            }
        })
        .catch(() => {})
        .finally(() => {
            deleting.value = false;
        });
};
</script>

<template>
    <div>
        <h3 class="text-xl font-bold m-3 break-words line-clamp-2">
            {{ media.name }}
        </h3>
        <div v-if="fileTypes.includes(media.type)" class="p-1 flex">
            <a
                :href="media.path"
                target="_blank"
                class="aspect-square object-cover rounded-lg w-full h-full flex-center flex-col bg-gray-100"
            >
                <DocumentTextIcon class="w-6 h-6 text-slate-600" />
                {{ media.type }}
            </a>
        </div>
        <a v-else :href="media.path" class="w-full h-full" target="_blank">
            <img
                :src="media.path"
                class="w-full aspect-square object-contain bg-gray-100"
                @error="(e) => (e.target.src = '/assets/images/common/placeholder.png')"
            />
        </a>
        <div class="p-3 border-t flex ga-3 justify-between">
            <div class="flex gap-2">
                <Badge dark>{{ media.type }}</Badge>
                <Badge info>{{ media.is_active ? 'Actif' : 'Brouillon' }}</Badge>
            </div>
            <!-- <p>{{ strip(media.size / 1024) }} Ko</p> -->
        </div>
        <div class="px-3 mt-2"><Button danger fullwidth @click="handleDelete">Supprimer</Button></div>
    </div>
</template>
