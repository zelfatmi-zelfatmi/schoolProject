<template>
    <Box class="pb-5" role="list">
        <ul class="grid grid-cols-4 gap-4">
            <li class="flex flex-col p-3 bg-white rounded-xl shadow">
                <span class="text-gray-600 font-light">Payment ID</span>
                <span class="font-semibold block mt-1 hover:overflow-x-auto overflow-hidden scrollbar">{{
                    data.payment_id ?? '_'
                }}</span>
            </li>
            <li class="flex flex-col p-3 bg-white rounded-xl shadow">
                <span class="text-gray-600 font-light">N° de commande</span>
                <span class="font-semibold block mt-1 hover:overflow-x-auto overflow-hidden scrollbar">{{
                    data.reference ?? '_'
                }}</span>
            </li>
            <li class="flex flex-col p-3 bg-white rounded-xl shadow">
                <span class="text-gray-600 font-light">Payment Method</span>
                <div class="flex gap-2 pt-2">
                    <img :src="paymentType[data.payment_method].icon" alt="par paypal" class="w-7" />

                    <span class="font-semibold block mt-1">{{ paymentType[data.payment_method].name }}</span>
                </div>
            </li>
            <li class="flex flex-col p-3 bg-white rounded-xl shadow">
                <span class="text-gray-600 font-light">Payment Status</span>
                <StatusBadge
                    :id="data.payment_status"
                    :attr="paymentStatus"
                    :name="useStatusSwitch(paymentStatus, data.payment_status)"
                    class="!mx-0 w-fit mt-1 !py-1 px-5"
                >
                    {{ useStatusSwitch(paymentStatus, data.payment_status) }}
                </StatusBadge>
            </li>
        </ul>
    </Box>
</template>

<script setup>
import { Box, StatusBadge } from '@shared/components';
import { useStatusSwitch } from '@shared/hooks';
import { paymentStatus, paymentType } from '@common/constants';

defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
});
</script>
