<script setup>
import { Switch } from '@headlessui/vue';
defineEmits(['update:model-value']);

defineProps({
    modelValue: {
        type: [Array, Boolean, Number],
        default: false,
    },
    disabled: Boolean,
    label: String,
    labelClass: String,
});
</script>

<template>
    <div :class="['flex justify-between gap-x-4 items-center flex-wrap', disabled && 'pointer-events-none opacity-75']">
        <label v-if="label" :for="label" class="block font-medium text-xs text-gray-600">{{ label }}</label>

        <Switch
            :model-value="modelValue"
            :class="modelValue ? 'bg-primary' : 'bg-gray-400'"
            class="relative inline-flex h-[28px] p-[2px] w-[48px] shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out !outline-none"
            @update:model-value="$emit('update:model-value', $event)"
        >
            <span
                aria-hidden="true"
                :class="modelValue ? 'translate-x-5' : 'translate-x-0'"
                class="pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
            />
        </Switch>
    </div>
</template>
