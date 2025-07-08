<template>
    <Popover :dark="!light" :arrow="false" position="top">
        <slot />
        <template #content="{ close }">
            <div :class="['p-2', loading && 'pointer-events-none']">
                <p v-if="!loading">
                    {{ content || 'Confirmez-vous la suppression ?' }}
                    <span class="text-primary hover:underline cursor-pointer mx-1" @click="$emit('confirm', close)">
                        {{ confirmText || 'Retirer' }}
                    </span>
                    <span class="hover:underline hover:text-blue-500 cursor-pointer mx-1" @click="close">Annuler</span>
                </p>
                <p v-else class="text-center w-[23rem]">Processus est en cours.</p>
            </div>
        </template>
    </Popover>
</template>

<script setup>
import { Popover } from '@shared/components';
defineProps({
    loading: Boolean,
    light: Boolean,
    content: String,
    confirmText: String,
});
defineEmits(['confirm']);
</script>
