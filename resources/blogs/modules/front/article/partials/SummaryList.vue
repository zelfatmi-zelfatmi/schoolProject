<template>
    <ul class="border-l mb-3 mt-1 text-md space-y-1 flex-1 max-w-xs h-fit sticky top-5 pb-4">
        <li
            v-for="(item, idx) in items"
            :key="idx"
            class="cursor-pointer hover:text-primary/60"
            :class="{ 'text-primary font-bold border-l-[3px] border-primary -ml-0.5': selected === item.id }"
            @click="handleClick(item)"
        >
            <span :class="[item.type === 'h1' ? 'font-semibold ' : '', 'block  pl-5 py-1']">
                {{ item.type === 'h2' ? '• ' : '' }}{{ item.text }}
            </span>
        </li>
    </ul>
</template>

<script setup>
import { scrollToView } from '@shared/helpers';
import { ref } from 'vue';

defineProps({
    items: {
        type: Array,
        default: () => [],
    },
});
const selected = ref(null);
const handleClick = (item) => {
    selected.value = item.id;
    scrollToView(item);
};
</script>
