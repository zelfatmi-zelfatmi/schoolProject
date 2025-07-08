<template>
    <RadioGroup :model-value="selected" @update:model-value="handleChange">
        <label
            v-if="label"
            :for="id || uniqueID"
            class="block font-medium text-xs mb-0.5 mt-1"
            :class="[error && '!text-red-600', labelClass || 'text-gray-600']"
        >
            {{ label }}
        </label>
        <ul :class="['relative', wrapperClass || 'space-y-1']">
            <RadioGroupOption
                v-for="(item, idx) in items"
                :key="idx"
                v-slot="{ checked }"
                as="template"
                :value="item"
                :disabled="item.disabled"
            >
                <li
                    :class="[
                        itemClass || '',
                        item.disabled ? 'pointer-events-none opacity-45' : checked ? 'text-primary' : 'text-gray-900',
                        'relative flex cursor-pointer btn-hover rounded-lg px-3 py-1.5 focus:outline-none border border-slate-300 hover:md:bg-primary/10 flex-1',
                    ]"
                    @click="$emit('click')"
                >
                    <div class="flex w-full gap-2 items-center justify-between">
                        <div class="flex items-center">
                            <div :class="['text-sm']">
                                <RadioGroupLabel as="p" class="font-medium">
                                    {{ item[keys[0]] }}
                                </RadioGroupLabel>
                                <RadioGroupDescription as="span" class="text-gray-500 inline">
                                    <slot name="content" :item="item">
                                        {{ item.content }}
                                    </slot>
                                </RadioGroupDescription>
                            </div>
                        </div>
                        <div v-if="checked" class="shrink-0 text-primary">
                            <CheckCircleIcon class="w-6" />
                        </div>
                        <small v-if="item.disabled">Indisponible</small>
                    </div>
                </li>
            </RadioGroupOption>
        </ul>
        <p v-if="helperText" class="text-sm">{{ helperText }}</p>
        <InlineError v-if="error" :errors="error" />
    </RadioGroup>
</template>

<script setup>
import { computed } from 'vue';
import { InlineError } from '../feedbacks';
import { RadioGroup, RadioGroupLabel, RadioGroupDescription, RadioGroupOption } from '@headlessui/vue';
import { CheckCircleIcon } from '@heroicons/vue/20/solid';

// const selected = ref(plans[0]);
const emit = defineEmits(['update:modelValue', 'click', 'change', 'change:full']);
const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: null,
    },
    label: {
        type: String,
        default: '',
    },

    items: {
        type: Array,
        default: () => [],
    },
    keys: {
        type: Array,
        default: () => ['name', 'value'],
    },
    id: {
        type: String,
        default: String(new Date().getTime()),
    },

    error: {
        type: [String, Array],
        default: '',
    },

    disabled: {
        type: Boolean,
        default: false,
    },
    wrapperClass: String,
    itemClass: String,
    labelClass: String,
    helperText: String,
});

const selected = computed(() => {
    return props.items.find((item) => item?.[props.keys[1]] === props.modelValue) || null;
});
const uniqueID = new Date().getTime();
const handleChange = (item) => {
    emit('update:modelValue', item[props.keys[1]]);
    emit('change', item[props.keys[1]]);
    emit('change:full', item);
};
</script>
