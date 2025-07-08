<script setup>
const props = defineProps({
    value: Boolean,
});
</script>

<template>
    <div v-if="!value" class="contents"><slot /></div>
    <Teleport v-else to="body">
        <slot />
    </Teleport>
</template>
