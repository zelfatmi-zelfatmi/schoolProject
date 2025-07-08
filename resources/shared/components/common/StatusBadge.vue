<template>
    <span
        v-show="status.name"
        :class="['rounded-full px-3 py-1 uppercase font-semibold mx-auto border border-current', status.style || '']"
        :tooltip="isShort ? status.name : null"
    >
        {{ isShort ? status.shortName || getInitials(status.name) : status.name }}
    </span>
</template>

<script setup>
import { computed } from 'vue';
import { getInitials } from '@shared/helpers';

const props = defineProps({
    value: Object,
    attr: Object,
    items: Object,
    id: [Number, String, Boolean],
    name: String,
    isShort: {
        type: Boolean,
        default: false,
    },
});

const status = computed(() => {
    if (props.value) {
        return props.value;
    }
    return (
        (props.attr || props.items || {})?.[props.id] ||
        Object.values(props.attr || props.items || {}).find((item) => item.id == props.id) ||
        {}
    );
});
</script>

