<script setup>
import { PopupForm } from './partials';

defineProps({
    popup: {
        type: Object,
        default: () => ({}),
    },
});
</script>

<template>
    <PopupForm />
</template>
