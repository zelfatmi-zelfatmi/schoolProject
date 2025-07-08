<script setup>
import { useMediaManager } from '@shared/stores';
import { SearchField, TabSwitch } from '../forms';
import MediaItem from './MediaItem.vue';
import { EmptyState, Scrollable, Spinner } from '../common';
import { PhotoIcon } from '@heroicons/vue/20/solid';
import BlockPreview from './BlockPreview.vue';
import { computed, reactive, onUnmounted } from 'vue';
import { MEDIA_TYPES } from './MediaManager';

const mediaManager = useMediaManager();

const props = defineProps({
    multiple: Boolean,
    loading: Boolean,
    types: Array,
});

const emit = defineEmits(['search', 'loadmore', 'change:tab']);
const tabs = [
    { name: 'Tous', id: '' },
    { name: 'Images', id: MEDIA_TYPES.images.map((v) => v.split('/')[1]).join(',') },
    { name: 'Documents', id: MEDIA_TYPES.docs.map((v) => v.split('/')[1]).join(',') },
];
const state = reactive({
    tab: '',
    showTab: true,
});
const handleSelectedMedia = (value) => {
    if (mediaManager.selectedMedia.some((media) => media.id === value.id)) {
        mediaManager.selectedMedia = mediaManager.selectedMedia.filter((media) => media.id !== value.id);
    } else {
        if (mediaManager.multiple || props.multiple) {
            mediaManager.selectedMedia.push(value);
        } else {
            mediaManager.selectedMedia = [value];
        }
    }
};
const handleTabChange = (value) => {
    state.tab = value;
    emit('change:tab', {
        type: value ? value.split(',') : null,
    });
};
const getPreview = computed(() => {
    const val = mediaManager.selectedMedia;
    if (val.length) {
        return val[val.length - 1];
    }
    return null;
});
</script>

<template>
    <div class="flex h-full md:min-h-[50vh]">
        <div class="p-2 w-full">
            <div class="flex justify-between items-center mb-2 gap-2 h-10">
                <TabSwitch v-if="state.showTab" :model-value="state.tab" :items="tabs" @change="handleTabChange" />
                <SearchField
                    v-else
                    v-model="mediaManager.search"
                    class="h-10 bg-gray-200 rounded-xl flex-1"
                    @change="$emit('search')"
                />
                <button class="btn btn-info btn-link" @click="state.showTab = !state.showTab">
                    {{ state.showTab ? 'Rechercher' : 'Annuler' }}
                </button>
            </div>
            <Scrollable class="max-h-[calc(100vh-17.5rem)] p-1 h-full" @scroll:end="$emit('loadmore')">
                <div v-if="loading" class="flex-center h-full">
                    <Spinner class="w-7 h-7" />
                </div>
                <ul
                    v-else-if="mediaManager.list.storageMedia.length"
                    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4"
                >
                    <li v-if="mediaManager.loading.upload" class="flex-center w-full h-full bg-gray-300 rounded-xl">
                        <Spinner class="w-7 h-7" />
                    </li>
                    <template v-for="media in mediaManager.list.storageMedia" :key="media.id">
                        <MediaItem
                            :types="types"
                            :media="media"
                            :selected="mediaManager.selectedMedia.some((m) => m.id === media.id)"
                            @click="handleSelectedMedia(media)"
                        />
                    </template>
                </ul>
                <EmptyState
                    v-else
                    heading="Aucun média"
                    :image="PhotoIcon"
                    class="py-10"
                    :actions="[
                        {
                            label: 'Add',
                            secondary: true,
                            fullwidth: true,
                            class: 'max-w-[6rem] justify-center',
                            onClick: () => (mediaManager.selectedTab = 0),
                        },
                    ]"
                >
                    L'extention accepter : jpg, jpeg, png et webp
                </EmptyState>
            </Scrollable>
        </div>
        <div v-if="getPreview" class="max-w-xs flex-1 lg:min-w-[20rem] bg-white h-full border-l max-md:hidden">
            <BlockPreview :media="getPreview" />
        </div>
    </div>
</template>
