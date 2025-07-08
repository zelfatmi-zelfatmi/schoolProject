<script setup>
import { navigationButtons } from '../fishPerso';
defineProps({
    activeTab: String,
});
defineEmits(['change']);
</script>
<template>
    <section
        class="-mt-[37px] sticky top-16 lg:top-0 z-10 -mb-4 text-sm p-0.5 bg-white grid grid-cols-4 border-b border-slate-400 shadow-down"
        :style="{
            '--left': `${navigationButtons.findIndex((v) => v.id === activeTab) * 25}%`,
        }"
    >
        <span class="left-[var(--left)] absolute w-1/4 h-1 -bottom-px rounded-t-xl bg-primary/90 z-0 t-300"></span>

        <button
            v-for="(item, index) in navigationButtons"
            :key="index"
            :class="[
                'flex gap-2 flex-1 p-2 justify-center items-center active:scale-95 t-200 h-8 font-medium z-1 hover:text-primary outline-none',
                item.id === activeTab ? ' text-primary' : 'text-slate-700',
            ]"
            @click="$emit('change', item.id)"
        >
            <component :is="item.icon" class="w-5" />
            {{ item.title }}
        </button>
    </section>
</template>
