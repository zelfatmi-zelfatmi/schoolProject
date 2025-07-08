<template>
    <Popover v-if="desc" position="top" hoverable prevent-focus :delay="500">
        <p class="max-w-80 line-clamp-2 text-wrap">{{ desc }}</p>
        <template #content>
            <p class="prose max-w-lg p-2">{{ desc }}</p>
        </template>
    </Popover>
</template>

<script setup>
import { Popover } from '@shared/components';

defineProps({
    desc: String,
});
</script>
