<script setup>
import axios from 'axios';
import { onMounted, watch, ref } from 'vue';
import { ArrowUpTrayIcon, PhotoIcon } from '@heroicons/vue/20/solid';
import { Button, InlineError, Modal } from '../../components';
import { useMediaManager } from '@shared/stores';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import { api, MEDIA_TYPES, useMedias } from './MediaManager';
import TabDropZone from './TabDropZone.vue';
import TabMediaList from './TabMediaList.vue';
import TabInsertUrl from './TabInsertUrl.vue';

const props = defineProps({
    multiple: Boolean,
    menu: Boolean,
    types: {
        type: Array,
        default: () => MEDIA_TYPES.images,
    },
});
const photoShotTriggerRef = ref(null);

const emit = defineEmits(['close', 'submit']);
const mediaManager = useMediaManager();
const medias = useMedias();
const fetchingMedia = ref(false);
const verticalTabs = [
    {
        name: 'Telecharger photos',
        icon: ArrowUpTrayIcon,
    },
    {
        name: 'Medias disponibles',
        icon: PhotoIcon,
    },
];
const handleAddMedia = () => {
    const data = mediaManager.multiple ? mediaManager.selectedMedia : mediaManager.selectedMedia[0];
    mediaManager.trigger(data);
    emit('submit', data);
    setTimeout(() => {
        mediaManager.close();
    });
};

const handleMediaUploaded = (value) => {
    mediaManager.selectedTab = 1;
    // const formData = new FormData();
    mediaManager.loading.upload = true;
    medias.upload(value, {
        multiple: value?.length > 1,
        onSuccess: () => handleGetMedia(),
        onError: (err) => {
            if (err?.response?.data?.errors) {
                mediaManager.errors = err?.response?.data?.errors || {};
            } else {
                mediaManager.errors.general = err?.response?.data?.message || null;
            }
        },
        onFinish: () => {
            mediaManager.loading.upload = false;
        },
    });
};

const handleGetMedia = (loadmore = false, filters = {}) => {
    const params = { name: mediaManager.search, ...filters };
    if ((loadmore && !mediaManager.list.links?.next) || fetchingMedia.value) {
        return;
    }
    if (loadmore) {
        params.page = mediaManager.list.meta?.current_page + 1;
    }
    fetchingMedia.value = true;
    axios
        .get(route(api.medias), { params })
        .then(({ data }) => {
            if (data?.storageMedia) {
                if (loadmore) {
                    mediaManager.list.storageMedia = [...mediaManager.list.storageMedia, ...data.storageMedia];
                    mediaManager.list.links = data.links;
                    mediaManager.list.meta = data.meta;
                } else {
                    mediaManager.list = data;
                }
            }
        })
        .finally(() => {
            fetchingMedia.value = false;
        });
};
const updatePhotoPreview = (e) => {
    // mediaManager.open()
    mediaManager.loading.takingPhoto = true;
    medias.upload(e.target.files, {
        multiple: mediaManager.multiple,
        onSuccess: ({ storageMedia }) => {
            mediaManager.trigger(storageMedia);
            emit('submit', storageMedia);
            mediaManager.close();
        },
        onFinish: () => {
            mediaManager.loading.takingPhoto = false;
        },
    });
};
watch(
    () => mediaManager.show,
    (value) => {
        if (value) {
            handleGetMedia(false, {
                // type: (mediaManager.types || props.types).map((v) => v.split('/')[1]),
            });
        } else {
            setTimeout(() => {
                mediaManager.selectedMedia = [];
            }, 350);
        }
        // handleGetMedia();
    }
);
onMounted(() => {
    mediaManager.multiple = !!props.multiple;
});
</script>

<template>
    <div class="contents">
        <Modal
            :show="mediaManager.show"
            max-width="xl"
            class-name="!p-0"
            custom-class="modal-mobile max-h-[calc(100%-3.5rem)] md:max-h-[calc(100vh-3rem)] h-full md:h-fit"
            title="Gestionnaire de médias"
            z-index="z-[920]"
            @close="mediaManager.close()"
        >
            <div class="flex flex-col h-full w-full border-t">
                <TabGroup
                    class="flex max-md:flex-col flex-1"
                    as="div"
                    :selected-index="mediaManager.selectedTab"
                    @change="mediaManager.selectedTab = $event"
                >
                    <TabList class="flex md:flex-col md:w-60 bg-gray-80 md:border-r md:py-8 p-2 gap-2">
                        <Tab
                            v-for="tab in verticalTabs"
                            :key="tab.name"
                            v-slot="{ selected }"
                            class="focus:outline-none max-md:flex-1"
                        >
                            <p
                                :class="[
                                    'flex gap-1.5 md:gap-3 py-1.5 pl-2 md:-ml-2 rounded-e-full max-md:rounded-full max-md:justify-center t-200 hover:shadow-inner hover:bg-orange-500 hover:text-white items-center max-md:text-xs max-md:px-2 line-clamp-1 text-nowrap',
                                    selected ? 'bg-primary text-white' : '',
                                ]"
                            >
                                <component :is="tab.icon" class="w-5" />
                                <span class="font-medium"> {{ tab.name }}</span>
                            </p>
                        </Tab>
                    </TabList>
                    <TabPanels class="flex-1">
                        <TabPanel as="template">
                            <TabDropZone :types="mediaManager.types || types" @change="handleMediaUploaded" />
                        </TabPanel>
                        <TabPanel as="template">
                            <TabMediaList
                                :loading="fetchingMedia"
                                :types="mediaManager.types || types"
                                @search="handleGetMedia"
                                @loadmore="handleGetMedia(true)"
                                @change:tab="handleGetMedia(false, $event)"
                            />
                        </TabPanel>
                        <TabPanel as="template">
                            <TabInsertUrl />
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
                <div class="p-2">
                    <InlineError v-if="mediaManager.errors.media" :errors="mediaManager.errors.media" />
                    <InlineError v-if="mediaManager.errors.general" :errors="mediaManager.errors.general" />
                </div>
                <div class="flex justify-between md:justify-end gap-3 p-3 border-t">
                    <Button secondary @click="mediaManager.close()">Discard</Button>
                    <Button primary :disabled="!mediaManager.selectedMedia.length" @click="handleAddMedia">
                        Ajouter medias
                    </Button>
                </div>
            </div>
        </Modal>
        <Modal
            v-if="menu"
            :show="mediaManager.settings.showTypeUpload"
            class-name="!p-0"
            custom-class="modal-mobile h-fit"
            @close="mediaManager.settings.showTypeUpload = false"
        >
            <div class="flex flex-col gap-2 px-3 pt-8 bg-slate-100 relative">
                <Button full class="border bg-white btn-m" @click="mediaManager.open(mediaManager.source)">
                    Ajouter un document
                </Button>
                <Button
                    full
                    class="border bg-white btn-m"
                    :loading="mediaManager.loading.takingPhoto"
                    @click="photoShotTriggerRef?.click?.()"
                >
                    Prendre une photo
                </Button>
                <input
                    ref="photoShotTriggerRef"
                    type="file"
                    class="hidden"
                    accept="image/*;capture=camera"
                    @change="updatePhotoPreview"
                />

                <Button danger full class="my-3" @click="mediaManager.settings.showTypeUpload = false"> Fermer </Button>
            </div>
        </Modal>
    </div>
</template>
