<template>
    <Box as="ul" role="list" class="pb-5">
        <section class="grid grid-cols-2 gap-4">
            <div class="flex flex-col p-4 bg-white rounded-md shadow-md">
                <span class="text-gray-600 font-light">ID de panier</span>
                <span class="font-semibold block mt-1 hover:overflow-x-auto overflow-hidden scrollbar">{{
                    data.id
                }}</span>
            </div>
            <div class="flex flex-col p-4 bg-white rounded-md shadow-md">
                <span class="text-gray-600 font-light">Pannier Status</span>
                <StatusBadge
                    :id="data.status"
                    :attr="CartStatusEnum"
                    :name="useStatusSwitch(CartStatusEnum, data.status)"
                    class="!mx-0 w-fit mt-1 !py-1 px-5"
                >
                    {{ useStatusSwitch(CartStatusEnum, data.status) }}
                </StatusBadge>
            </div>
        </section>
    </Box>
</template>

<script setup>
import { Box, StatusBadge } from '@shared/components';
import { useStatusSwitch } from '@shared/hooks';
import { CartStatusEnum } from '@shared/constants';
defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
});
</script>
