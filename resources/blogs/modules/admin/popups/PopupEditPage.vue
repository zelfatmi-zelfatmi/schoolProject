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
    <PopupForm :data="popup" is-edit />
</template>
