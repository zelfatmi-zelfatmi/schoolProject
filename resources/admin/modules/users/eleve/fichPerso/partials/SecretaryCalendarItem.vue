<script setup>
import { MinusIcon, PlusIcon } from '@heroicons/vue/20/solid';
import { InlineConfirmation } from '@shared/components';

defineEmits(['confirm']);
defineProps({
    isCallPresent: [Object, null],
    mutating: Boolean,
});
</script>
<template>
    <li class="h-14 flex-center p-1">
        <InlineConfirmation
            :class="[
                '!m-0 flex-center w-full h-full !border-none first-of-type:*:h-full',
                mutating && 'pointer-events-none',
            ]"
            :content="`Vous voulez ${isCallPresent ? 'supprimer' : 'ajouter'} la reservation?`"
            :light="!!isCallPresent"
            :confirm-text="isCallPresent ? '' : 'Ajouter'"
            :loading="mutating"
            @confirm="$emit('confirm', { close: $event, isCallPresent })"
        >
            <span
                :class="[
                    'p-2 flex-center w-full h-full rounded-md t-200 cursor-pointer transform active:scale-95 group/btn',
                    isCallPresent ? ' bg-primary hover:bg-orange-700' : ' hover:bg-green-100',
                ]"
            >
                <MinusIcon v-if="isCallPresent" class="w-5 h-5 text-white" />
                <PlusIcon v-else class="w-5 h-5 text-slate-300 group-hover/btn:text-green-500 t-200" />
            </span>
        </InlineConfirmation>
    </li>
</template>
