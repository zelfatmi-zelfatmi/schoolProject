<script setup>
import { computed, ref, useSlots, reactive, watch } from 'vue';
import { ChevronUpDownIcon, XMarkIcon } from '@heroicons/vue/20/solid';
import { Badge } from '../../common';
import { ExceptionList, InlineError } from '../../feedbacks';
import ListItems from './ListItems.vue';
// import { useDimensions } from '@shared/hooks';

const emit = defineEmits(['update:modelValue', 'change', 'open', 'search', 'scroll:end', 'change:full']);
const props = defineProps({
    items: {
        type: Array,
        default: () => [],
    },
    keys: {
        type: Array,
        default: () => ['name', 'value'],
    },
    label: {
        type: String,
        default: '',
    },
    error: {
        type: String,
        default: '',
    },
    defaultValue: [String, Object, Boolean, Number, null],
    modelValue: [String, Object, Boolean, Number, null],
    emptyState: String,
    prefix: String,
    inputClass: String,
    position: String,
    helperText: Array,
    ssr: Boolean,
    clear: Boolean,
    placeholder: String,
    disabled: Boolean,
    multiple: Boolean,
    max: Number,
    showSearch: {
        type: Boolean,
        default: true,
    },
    fetching: Boolean,
    fetchingMore: Boolean,
});

// const { md } = useDimensions();
const hasSlotSingle = computed(() => !!useSlots().default && !props.multiple);

const getDefaultValue = () => {
    if (
        typeof props.modelValue === 'boolean' ||
        typeof props.modelValue === 'string' ||
        (typeof props.modelValue === 'number' && !props.multiple)
    ) {
        return props.items?.find((item) => item[props.keys[1]] === props.modelValue) || props.defaultValue || {};
    }
    return props.defaultValue || (props.multiple ? [] : {});
};
const selectedItem = ref(getDefaultValue());
const state = reactive({
    show: false,
});

watch(selectedItem, (value) => {
    if (props.multiple) {
        emit('update:modelValue', value || []);
        emit('change', value || []);
    } else {
        emit('update:modelValue', value ? value[props.keys?.[1]] : {});
        emit('change', value ? value[props.keys?.[1]] : {});
    }
    emit('change:full', value);
});

const showClear = computed(() => {
    if (props.multiple) {
        return selectedItem.value?.length === 0;
    }
    return Object.values(selectedItem.value || {}).length === 0;
});
</script>

<template>
    <div class="">
        <label
            v-if="label"
            :class="{ '!text-red-600': !!error }"
            class="block font-medium text-xs text-gray-600 mb-0.5 my-1"
        >
            {{ label }}
        </label>
        <div
            :class="[
                'listbox-input',
                inputClass,
                disabled ? 'pointer-events-none opacity-60 !shadow-none bg-slate-100' : '',
                !hasSlotSingle &&
                    'relative w-full px-3 h-9 py-1 rounded-xl shadow-sm text-sm border border-gray-300 ring-gray-300 focus:ring-primary flex items-center cursor-pointer',
            ]"
            as="div"
            @click="state.show = true"
        >
            <b v-if="prefix && Object.values(selectedItem || {}).length">{{ prefix }}:&nbsp;</b>
            <p
                v-if="Object.values(selectedItem || {}).length && !multiple"
                class="block truncate"
                :title="selectedItem?.[keys[0]]"
            >
                <slot :selected-item="selectedItem">
                    {{ selectedItem?.[keys[0]] }}
                </slot>
            </p>
            <template v-else-if="multiple && selectedItem?.length">
                <slot name="selectedItems" :selected-items="selectedItem">
                    <Badge v-for="(item, index) in selectedItem" :key="index">{{ item[keys[0]] }}</Badge>
                </slot>
            </template>
            <span v-else-if="placeholder" class="block truncate opacity-60">{{ placeholder }}</span>
            <ChevronUpDownIcon
                v-if="!disabled && showClear"
                aria-hidden="true"
                class="h-5 w-5 text-gray-400 pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
            />
            <XMarkIcon
                v-else-if="clear && !disabled"
                aria-hidden="true"
                class="h-5 w-5 text-primary absolute inset-y-0 right-0 flex items-center pr-2 btn-m"
                @click="selectedItem = multiple ? [] : {}"
            />
        </div>
        <Teleport to="body">
            <div v-if="state.show" class="bg-black/20 fixed inset-0 z-900 flex-center" @click="state.show = false" />
            <transition name="slide-up">
                <div
                    v-if="state.show"
                    class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-[901] w-full max-w-xl md:max-w-sm min-h-[60%] flex flex-col px-3"
                >
                    <ListItems v-model="selectedItem" v-bind="props" class="bg-white rounded-2xl flex-1 shadow-box-2" />
                </div>
            </transition>
        </Teleport>
        <ExceptionList v-if="helperText" :items="helperText" />
        <InlineError v-if="error" :errors="error" />
    </div>
</template>
