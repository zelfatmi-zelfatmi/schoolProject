<script setup>
import { onMounted, ref } from 'vue';
import { Box, EmptyState, InlineError, MEDIA_TYPES } from '@shared/components';
import { ArrowPathIcon, DocumentTextIcon, EyeIcon, PhotoIcon, TrashIcon } from '@heroicons/vue/20/solid';
import { useMediaManager } from '@shared/stores';
const emit = defineEmits(['delete', 'change']);
const props = defineProps({
    error: String,
    src: String,
    mediaType: String,
    mediaSource: String,
    menu: Boolean,
    label: String,
});

const mediaManager = useMediaManager();
const mediaSource = ref(props.mediaSource || Math.random().toString(36).substring(7));
const handleChangeMedia = () => {
    mediaManager.types = props.mediaType === 'pdf' ? MEDIA_TYPES.docs : null;
    if (props.menu) {
        mediaManager.openMenu(mediaSource.value);
    } else {
        mediaManager.open(mediaSource.value);
    }
};

onMounted(() => {
    mediaManager.submit(({ data, source }) => {
        console.log("Données reçues du media manager :", data);
        console.log("Source :", source);

        if (source === mediaSource.value) {
            emit('change', data);
        }
    });
});

</script>

<template>
    <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
        <EmptyState
            v-if="!src"
            heading="Vide pour l'instant"
            :image="PhotoIcon"
            class="py-10 group border bg-slate-100 rounded-2xl"
            @click.prevent="handleChangeMedia"
        >
            <button class="group-hover:underline group-hover:text-blue-400 px-3 mt-3" type="button">
                Appuyez ici pour ajouter une photo.
            </button>
        </EmptyState>
        <Box v-else class="relative group overflow-hidden !mb-0" bg-gray sectionned>
            <div
                class="gap-3 absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 flex-center opacity-0 group-hover:opacity-100 t-3 drop-shadow-2xl"
            >
                <a target="_blank" :href="src">
                    <EyeIcon class="w-8 h-8 p-2 btn btn-m text-white bg-black shadow-2xl shadow-white rounded-full" />
                </a>
                <ArrowPathIcon
                    class="w-8 h-8 p-2 btn btn-m text-white bg-blue-500 shadow-2xl rounded-full"
                    @click="handleChangeMedia"
                />
                <TrashIcon
                    class="w-8 h-8 p-2 btn btn-m text-white bg-red-500 shadow-2xl rounded-full"
                    @click="$emit('delete')"
                />
            </div>
            <div v-if="mediaType === 'pdf'" class="flex-center flex-col w-full aspect-square h-full bg-white shadow-sm">
                <DocumentTextIcon class="w-10 h-10 text-slate-600" />
                {{ mediaType }}
            </div>
            <img v-else :src="src" class="w-full aspect-square object-contain bg-white shadow-sm" />
        </Box>
        <InlineError v-if="error" :errors="error" />
    </div>
</template>
