<template>
    <img v-if="name" :src="`/assets/${icon}`" />
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
    name: String,
    // eslint-disable-next-line vue/prop-name-casing
    is_icon: {
        type: Boolean,
        default: true,
    },
});

const icon = computed(() => {
    return props.is_icon ? `icons/${props.name}.svg` : `images/${props.name}`;
});
</script>
