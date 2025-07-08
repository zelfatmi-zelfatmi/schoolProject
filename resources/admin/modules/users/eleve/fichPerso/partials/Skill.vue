<script setup>
// import { ExclamationCircleIcon, CheckCircleIcon, MinusCircleIcon } from '@heroicons/vue/24/solid';
import { Table } from '@shared/components';

defineProps({
    group: Object,
});
const headings = [{ name: 'Acquis' }, { name: 'Libellé' }, { name: 'Commentaire' }];
</script>
<template>
    <div>
        <p class="p-3 font-bold">{{ group.label }}</p>
        <Table v-slot="{ item }" :headings="headings" :is-loading="false" :items="{ data: group.skills || [] }">
            <td class="cell">
                <div class="col-span-2 flex gap-2">
                    <div :class="['feedback check-circle', item?.feedback?.rating === 1 ? '' : 'disabled']"></div>
                    <div :class="['feedback check-exclamation', item?.feedback?.rating === 2 ? '' : 'disabled']"></div>
                    <div :class="['feedback check-minus', item?.feedback?.rating === 3 ? '' : 'disabled']"></div>
                </div>
            </td>
            <td class="cell">
                <p class="max-w-xs text-wrap">
                    {{ item?.label }}
                </p>
            </td>
            <td class="cell">
                <p class="max-w-xs text-wrap">
                    {{ item?.feedback?.comment }}
                </p>
            </td>
        </Table>
    </div>
</template>
<style lang="scss">
.feedback {
    @apply w-7 h-7 rounded-full flex justify-center items-center relative;
    &.disabled {
        @apply bg-gray-300;
    }
}
.check-circle {
    @apply bg-green-500;
    &:after {
        content: '';
        @apply w-2 h-4 border border-white rotate-45 relative -top-0.5;
        border-width: 0 3px 3px 0;
    }
}
.check-exclamation {
    @apply bg-yellow-500 text-white text-lg font-black;
    &:before {
        content: '';
        @apply absolute w-0.5 h-2.5 bg-white top-1.5;
    }
    &:after {
        content: '';
        @apply bg-white absolute w-0.5 h-0.5 bottom-1.5;
    }
}
.check-minus {
    @apply bg-red-500 text-white text-lg font-black;
    &:after {
        content: '';
        @apply w-2.5 h-0.5 bg-white rounded;
    }
}
</style>
