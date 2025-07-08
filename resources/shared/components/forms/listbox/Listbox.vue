<script setup>
import { computed, ref, useSlots, watch } from 'vue';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, ListboxLabel } from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/20/solid';

import { SearchField } from '../index';
import { Badge, EmptyState, Scrollable, Spinner } from '../../common';
import { ExceptionList, InlineError } from '../../feedbacks';
import { useDimensions } from '@shared/hooks';
import Teleportion from '../Teleportion.vue';

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
    defaultValue: [String, Object, Boolean, Number],
    modelValue: [String, Object, Boolean, Number],
    emptyState: String,
    prefix: String,
    inputClass: String,
    placeholder: String,
    helperText: Array,
    ssr: Boolean,
    clear: Boolean,
    disabled: Boolean,
    multiple: Boolean,
    mobile: Boolean,
    max: Number,
    showSearch: {
        type: Boolean,
        default: true,
    },
    fetching: Boolean,
    fetchingMore: Boolean,
});
const { md } = useDimensions();
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
const search = ref('');

const filtredItems = computed(() => {
    if (props.ssr || !props.showSearch) {
        return props.items;
    }
    return [...props.items].filter((value) => {
        if (typeof value === 'number') {
            return value.includes(search.value?.toLocaleLowerCase());
        }
        return value.name.toLocaleLowerCase()?.includes(search.value?.toLocaleLowerCase());
    });
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

const handleSearch = (value) => {
    emit('search', value);
};
const showClear = computed(() => {
    if (props.multiple) {
        return selectedItem.value.length === 0;
    }
    return Object.values(selectedItem.value).length === 0;
});
const isDisabled = (item) => {
    if (props.multiple) {
        return (
            props.max <= props.modelValue?.length &&
            !props.modelValue?.some((x) => x[props.keys[1]] === item?.[props.keys[1]])
        );
    }
    return false;
};
</script>

<template>
    <Listbox v-model="selectedItem" as="div" :multiple="multiple"  dropdown-class="max-h-52 overflow-y-auto z-50">
        <ListboxLabel
            v-if="label"
            :class="{ '!text-red-600': !!error }"
            class="block font-medium text-xs text-gray-600 mb-0.5 my-1"
        >
            {{ label }}
        </ListboxLabel>
        <div :class="[mobile && !md ? '' : 'relative']">
            <ListboxButton
                :class="[
                    inputClass,
                    disabled ? 'pointer-events-none opacity-60 !shadow-none bg-slate-100' : '',
                    !hasSlotSingle &&
                        'relative w-full px-3 h-9 py-1 rounded-lg shadow-sm text-sm border border-gray-300 ring-gray-300 focus:ring-primary flex items-center cursor-pointer',
                    'group',
                ]"
                as="div"
                @click="$emit('open')"
            >
                <b v-if="prefix && Object.values(selectedItem).length">{{ prefix }}:&nbsp;</b>
                <span v-if="Object.values(selectedItem).length && !multiple" class="block">
                    <slot :selected-item="selectedItem">
                        {{ selectedItem?.[keys[0]] }}
                    </slot>
                </span>

                <template v-else-if="multiple && selectedItem.length">
                    <slot name="selectedItems" :selected-items="selectedItem">
                        <Badge v-for="(item, index) in selectedItem" :key="index">{{ item[keys[0]] }}</Badge>
                    </slot>
                </template>

                <span v-else-if="placeholder" class="block truncate opacity-60">{{ placeholder }}</span>

                <button
                    v-if="!disabled && showClear"
                    type="button"
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                >
                    <ChevronUpDownIcon aria-hidden="true" class="h-5 w-5 text-gray-400" />
                </button>
                <button
                    v-else-if="clear && !disabled"
                    type="button"
                    class="absolute inset-y-0.5 right-px flex items-center pr-1.5 bg-white rounded-full"
                    @click.stop="selectedItem = multiple ? [] : {}"
                >
                    <XMarkIcon aria-hidden="true" class="h-5 w-5 text-slate-400 group-hover:text-primary" />
                </button>
            </ListboxButton>
            <Teleportion :value="mobile && !md">
                <ListboxOptions
                    :class="[
                        ' mt-1 z-900 rounded-xl bg-white py-1 text-base shadow-lg ring-1 ring-slate-400 focus:outline-none sm:text-sm',
                        mobile && !md
                            ? 'inset-2 w-[calc(100%-1rem)] h-fit -translate-y-1/2 fixed top-1/2 '
                            : 'absolute overflow-auto w-full',
                    ]"
                    as="div"
                >
                    <div v-if="showSearch" class="px-2 pb-2 pt-1 border-b">
                        <SearchField v-model="search" class="bg-slate-200 !rounded-lg h-8" @change="handleSearch" />
                    </div>
                    <EmptyState
                        v-if="!filtredItems.length && !fetching && !fetchingMore"
                        :image="MagnifyingGlassIcon"
                        class="md:p-6"
                        heading="Aucun résultat"
                    >
                        <p v-if="emptyState">{{ emptyState }}</p>
                    </EmptyState>
                    <template v-else>
                        <Scrollable
                            :class="[mobile && !md ? 'max-h-80' : 'max-h-60']"
                            @scroll:end="$emit('scroll:end', search)"
                        >
                            <template v-if="!fetching">
                                <ListboxOption
                                    v-for="(item, idx) in filtredItems"
                                    :key="idx"
                                    v-slot="{ active, selected }"
                                    :value="item"
                                    as="template"
                                    :disabled="isDisabled(item)"
                                >
                                    <div
                                        :class="[
                                            active ? 'bg-primary/10 text-primary' : 'text-gray-900',
                                            'relative cursor-default select-none py-2 pl-8 pr-2',
                                        ]"
                                    >
                                        <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                                            {{ item[keys[0]] }}
                                        </span>
                                        <span
                                            v-if="selected"
                                            class="absolute inset-y-0 left-0 flex items-center pl-2 text-amber-600"
                                        >
                                            <CheckIcon aria-hidden="true" class="h-5 w-5" />
                                        </span>
                                    </div>
                                </ListboxOption>
                            </template>
                            <div
                                v-if="ssr"
                                :class="{ '!opacity-100': fetching || fetchingMore }"
                                class="p-2 flex justify-center opacity-0"
                            >
                                <Spinner class="w-5 fill-primary" />
                            </div>
                        </Scrollable>
                    </template>
                </ListboxOptions>
            </Teleportion>
        </div>

        <ExceptionList v-if="helperText" :items="helperText" />
        <InlineError v-if="error" :errors="error" />
    </Listbox>
</template>
