<template>
    <Box sectionned>
        <div class="p-4 flex flex-col gap-4">
            <div class="flex justify-between items-center">
                <h4 class="text-[18px] leading-8 text-gray-444 font-semibold max-w-[18rem]">
                    {{ product?.name }}
                </h4>

                <div @click="cart.remove(product)">
                    <Spinner v-if="cart.state.loading[product.id]" class="w-7 h-7" />
                    <TrashIcon v-else class="w-7 h-7 text-gray-600 hover:text-red-600 cursor-pointer" />
                </div>
            </div>
            <p
                v-if="product?.multi_payment > 1"
                class="text-orange-700 bg-orange-100/70 rounded-full px-2 text-sm md:text-base w-fit -mt-3"
            >
                Paiement en {{ product?.multi_payment }} fois
            </p>
            <div class="flex flex-col items-start justify-start" v-html="product?.caracteristiques"></div>
        </div>
        <div class="flex justify-between text-[28px] font-bold items-center gap-3 border-t p-4">
            <span class="text-[18px]">Total:</span>
            <p class="leading-7 flex flex-center">
                <span v-if="product?.multi_payment > 1" class="text-[18px] mr-2 pt-1.5 text-primary">
                    ({{ moneyFormat(product?.prix / (product?.multi_payment || 1)) }}) {{ product?.multi_payment }} fois
                </span>
                <span class="">
                    {{ moneyFormat(product?.prix) }}
                </span>
            </p>
        </div>
    </Box>
</template>

<script setup>
import { useCart } from '@shared/stores';
import { TrashIcon } from '@heroicons/vue/20/solid';
import { moneyFormat } from '@shared/helpers';
import { Box, Spinner } from '@shared/components';
import { computed } from 'vue';
const cart = useCart();
const props = defineProps({
    item: Object,
});
const product = computed(() => props.item.product || props.item || {});
</script>
