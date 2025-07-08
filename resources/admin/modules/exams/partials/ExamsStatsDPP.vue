<script setup>
import { computed } from 'vue';
import moment from 'moment-timezone';

const props = defineProps({
    stats: Array,
});

const data = computed(() => {
    const sortedData = [...(props.stats || [])].sort((a, b) => a.date_pass_prevu < b.date_pass_prevu);
    return sortedData.reduce((acc, item) => {
        if (!item.date_pass_prevu) return null;
        if (!acc) acc = {};

        const [month, prefix] = item.date_pass_prevu?.split('') || ['N/A', 'N/A'];
        if (month && !acc?.[month]) {
            acc[month] = {};
        }

        // item.day = dy;
        acc[month][prefix] = item;
        return acc;
    }, {});
});
</script>

<template>
    <section v-show="stats.length" class="flex gap-1 mb-5">
        <article
            v-for="(month, key) in data"
            :key="key"
            class="flex-1 overflow-hidden rounded-2xl shadow-xl bg-black/90 text-white max-w-48"
        >
            <div class="p-2 text-center font-medium">{{ moment.months()[key] }}</div>
            <ul class="bg-black text-white grid grid-rows-2 relative divide-y divide-white/20">
                <li :class="['p-2 flex justify-between ']">
                    <span>Début</span>
                    <span class="px-3 text-primary text-xl font-bold">{{ month['d']?.count || 0 }}</span>
                </li>
                <li :class="['p-2 flex justify-between ']">
                    <span>Fin</span>
                    <span class="px-3 text-primary text-xl font-bold">{{ month['f']?.count || 0 }}</span>
                </li>
            </ul>
        </article>
    </section>
</template>
