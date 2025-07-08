<template>
    <span
        :class="[
            'rounded-full w-6 h-6 uppercase flex-center font-bold mx-auto text-4xs text-white',
            'bg-slate-600 bg-gradient-lines drop-shadow-sm',
        ]"
        :style="{
            backgroundColor: color || '',
        }"
    >
        {{ getInitials(categoryNameById?.[statusIndex] || INDIFINI, 3) }}
    </span>
</template>

<script setup>
import { getInitials } from '@shared/helpers';
import { categoryNameById, INDIFINI } from '@admin/constants';
defineProps({
    // statusIndex: [String, Number],
    color: String,
});
</script>
