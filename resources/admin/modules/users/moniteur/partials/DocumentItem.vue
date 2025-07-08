<script setup>
import { DocumentTextIcon } from '@heroicons/vue/20/solid';
import { Button, Thumb, fileTypes } from '@shared/components';

defineEmits(['delete']);
defineProps({
    item: Object,
    deleting: Boolean,
});
</script>

<template>
    <div class="flex items-center bg-slate-50 border shadow-sm rounded-xl overflow-clip">
        <div class="flex-1 flex gap-3 px-2 items-center">
            <div v-if="fileTypes.includes(item.type)" class="flex items-center">
                <DocumentTextIcon class="w-12 h-12 text-slate-600 rounded-lg bg-slate-100 shadow-sm p-2.5" />
            </div>
            <Thumb v-else :src="item.thumb || item.path" size="sm" class="!rounded-lg" />
            <div class="flex-1">
                <p class="font-bold truncate max-w-md">{{ item.name }}</p>
            </div>
        </div>
        <div class="px-2 py-4 w-40 flex-center">
            <a :href="item.path" target="_blank" class="btn btn-dark btn-link flex-1" rel="noopener noreferrer">
                Voir
            </a>
            <Button link danger class="text-xs btn-m flex-1" :loading="deleting" @click="$emit('delete', item.id)">
                {{ item.created_at ? 'Supprimer' : 'Annuler' }}
            </Button>
        </div>
    </div>
</template>
