<template>
    <div class="bg-gray-900 rounded-xl overflow-hidden mt-8">
        <div class="mx-auto max-w-7xl">
            <div class="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
                <div v-for="stat in stats" :key="stat.name" class="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                    <p class="text-sm font-medium leading-6 text-gray-400">{{ stat.name }}</p>
                    <p class="mt-2 flex items-baseline gap-x-2">
                        <span
                            class="font-semibold tracking-tight text-white"
                            :class="stat.name === 'DATE' ? 'text-2xl' : 'text-4xl'"
                            >{{ stat.value }}</span
                        >
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { dateFormat } from '@shared/helpers';
import { getTotalSold } from '@admin/constants';

const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
});
const getTotalPrice = (items) => {
    let totalSold = 0;
    items.map((item) => {
        totalSold += parseInt(item.product.prix);
    });
    return totalSold;
};

const stats = [
    { name: 'DATE', value: dateFormat(props.data?.created_at, 'fulltime') },
    { name: 'TOTAL', value: getTotalPrice(props.data?.cart_items) + ' €' },
    { name: 'PRODUITS', value: props.data?.cart_items?.length },
    { name: 'TOTAL HEURES', value: getTotalSold(props.data?.cart_items) + 'H' },
];
</script>
