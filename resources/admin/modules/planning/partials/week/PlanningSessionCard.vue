<template>
    <ul
        :class="['p-1 w-full grid gap-1 ', 'grid-cols-' + Object.keys(monitorPerOrder).length]"
        :style="{
            gridRow: `${Number(index) - 5}/ span ${maxRowSpan}`,
            gridTemplateRows: `repeat(${maxRowSpan}, minmax(0, 1fr))`,
        }"
    >
        <SessionWeekItem
            v-for="(item, idx) in listParse"
            :key="'item-session' + idx"
            :item="item || {}"
            :count="count"
            :class="[
                'md:order-' + monitorPerOrder[item?.moniteur?.user?.id],
                'col-start-' + monitorPerOrder[item?.moniteur?.user?.id],
            ]"
            :style="{
                gridRow: `span ${item.hour}/ span ${item.hour}`,
            }"
            @select="session.selectedSession = item"
        />
    </ul>
</template>

<script setup>
import { usePlanningSession } from '@admin/stores';
import SessionWeekItem from './SessionWeekItem.vue';
import { computed } from 'vue';

const props = defineProps({
    ordersMoniteur: {
        type: Array,
        default: () => [],
    },
    times: {
        type: [Array, Object],
        default: () => [],
    },
    monitorPerOrder: {
        type: Object,
        default: () => ({}),
    },
    count: Number,
    index: [Number, String],
});
const session = usePlanningSession();
const listParse = computed(() => {
    if (!props.times?.id) {
        return props.times;
    }
    return [];
});
const maxRowSpan = computed(() => {
    return listParse.value.reduce((max, item) => {
        if (item?.hour > max) {
            max = item?.hour;
        }
        return max;
    }, 1);
});
</script>
