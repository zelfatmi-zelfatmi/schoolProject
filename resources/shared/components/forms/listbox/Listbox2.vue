<script setup>
import { computed, ref, useSlots, watch } from 'vue';
import { CheckIcon, ChevronUpDownIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/20/solid';
import { SearchField } from '../index';
import { Badge, EmptyState, Popover, Scrollable, Spinner } from '../../common';
import { ExceptionList, InlineError } from '../../feedbacks';

const emit = defineEmits(['update:modelValue', 'change', 'open', 'search', 'scroll:end', 'change:full']);
const props = defineProps({
    items: {
        type: Array,
        default: () => [],
    },
    keys: {
        type: Array,
        default: () => ['name', 'id'],
    },
    label: {
        type: String,
        default: '',
    },
    error: {
        type: [String, Array],
        default: '',
    },
    defaultValue: [String, Object, Boolean, Number, null],
    modelValue: [String, Object, Boolean, Number, null],
    query: Object,
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
    isFilter: Boolean,
});

const hasSlotSingle = computed(() => !!useSlots().default && !props.multiple);
const getDefaultValue = (usedefault = true) => {
    const df = usedefault ? props.defaultValue : null;
    if (
        typeof props.modelValue === 'boolean' ||
        typeof props.modelValue === 'string' ||
        (typeof props.modelValue === 'number' && !props.multiple)
    ) {
        const data = props.query?.data || props.items || [];
        return data.find((item) => item[props.keys[1]] === props.modelValue) || df || {};
    }
    return df || (props.multiple ? props.modelValue || [] : {});
};
const selectedItem = ref(getDefaultValue());
const search = ref('');

const filtredItems = computed(() => {
    if (props.ssr || !props.showSearch || props.query) {
        return props.query?.data || props.items;
    }
    return [...(props.query?.data || props.items)].filter((value) => {
        if (typeof value === 'number') {
            return value.includes(search.value?.toLocaleLowerCase());
        }
        return value.name?.toLocaleLowerCase()?.includes(search.value?.toLocaleLowerCase());
    });
});
watch(
    () => props.modelValue,
    (value) => {
        if (value && !props.multiple) {
            const data = props.query?.data || props.items || [];
            const el = data.find((item) => item[props.keys[1]] === props.modelValue);
            if (el) {
                selectedItem.value = el;
            }
        } else if (!value) {
            selectedItem.value = {};
        }
    }
);
watch(selectedItem, (value) => {
    if (props.multiple) {
        emit('update:modelValue', value || []);
        emit('change', value || []);
    } else {
        emit('update:modelValue', value?.[props.keys?.[1]] || null);
        emit('change', value?.[props.keys?.[1]] || null);
    }

    emit('change:full', value);
});

const handleSearch = (value) => {
    emit('search', value);
    if (props.query) {
        props.query.fetch(null, { search: value });
    }
};
const showClear = computed(() => {
    if (props.multiple) {
        return selectedItem.value?.length === 0;
    }
    return Object.values(selectedItem.value || {}).length === 0;
});

const isDisabled = (item) => {
    if (props.multiple) {
        return (
            props.max <= props.modelValue?.length &&
            !props.modelValue?.some((x) => x[props.keys[1]] === item?.[props.keys[1]])
        );
    }
    return !!item.isDisabled;
};

const isSelected = (item) => {
    if (props.multiple) {
        return selectedItem.value?.some((v) => v[props.keys[1]] === item[props.keys[1]]);
    }
    return JSON.stringify(item) === JSON.stringify(selectedItem.value);
};
const handleSelectClick = (item, close) => {
    if (props.multiple) {
        const isPresent = selectedItem.value?.some((v) => v[props.keys[1]] === item[props.keys[1]]);
        if (isPresent) {
            selectedItem.value = selectedItem.value.filter((v) => v[props.keys[1]] !== item[props.keys[1]]);
        } else {
            selectedItem.value = [...selectedItem.value, item];
        }
        return;
    }
    selectedItem.value = item;
    close();
};
const handleScrollEnd = () => {
    emit('scroll:end');
    if (props.query) {
        props.query.fetch(null, { search: search.value }, true);
    }
};
</script>

<template>
    <div>
        <label
            v-if="label"
            :class="{ '!text-red-600': !!error }"
            class="block font-medium text-xs text-gray-600 mb-0.5 my-1"
        >
            {{ label }}
        </label>
        <Popover
            class="w-full"
            :arrow="false"
            popper-classes="p-0"
            :position="position || 'bottom'"
            :disabled="disabled"
        >
            <div
                :class="[
                    'select-none active:scale-95 t-2 listbox-input',
                    inputClass,
                    isFilter && '!rounded-full bg-white shadow-none border !h-9 min-w-[12rem]',
                    disabled ? 'pointer-events-none opacity-60 !shadow-none bg-slate-100' : '',
                    !hasSlotSingle &&
                        'relative w-full px-3 h-9 py-1 rounded-lg shadow-sm text-sm border border-gray-300 ring-gray-300 focus:ring-primary flex items-center cursor-pointer',
                ]"
                @click="$emit('open')"
            >
                <b v-if="prefix && Object.values(selectedItem || {}).length">{{ prefix }}:&nbsp;</b>
                <div
                    v-if="Object.values(selectedItem || {}).length && !multiple"
                    class="block truncate"
                    :title="selectedItem?.[keys[0]]"
                >
                    <slot :selected-item="selectedItem">
                        {{ selectedItem?.[keys[0]] }}
                    </slot>
                </div>
                <template v-else-if="multiple && selectedItem?.length">
                    <slot name="selectedItems" :selected-items="selectedItem">
                        <Badge v-for="(item, index) in selectedItem" :key="index" dark class="mr-1">
                            {{ item[keys[0]] }}
                        </Badge>
                    </slot>
                </template>
                <p v-else-if="placeholder" class="block truncate opacity-60">{{ placeholder }}</p>

                <div
                    v-if="!disabled && showClear"
                    type="button"
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                >
                    <ChevronUpDownIcon aria-hidden="true" class="h-5 w-5 text-gray-400" />
                </div>
                <button
                    v-else-if="clear && !disabled"
                    type="button"
                    class="absolute inset-y-0 right-0 flex items-center pr-1"
                    @click.stop="selectedItem = multiple ? [] : {}"
                >
                    <XMarkIcon
                        aria-hidden="true"
                        class="h-7 w-7 text-primary bg-white hover:bg-red-500 hover:text-white t-3 rounded-full p-1"
                    />
                </button>
            </div>

            <template #content="{ close, show }">
                <div class="w-full min-w-64 text-xs focus:outline-none sm:text-sm grid user-select-none rounded-xl">
                    <div v-if="showSearch" class="p-2 border-b flex">
                        <SearchField
                            :key="show"
                            v-model="search"
                            class="bg-slate-200 rounded-lg h-8 flex-1"
                            autofocus
                            @change="handleSearch"
                        />
                    </div>
                    <EmptyState
                        v-if="
                            !filtredItems.length &&
                            !fetching &&
                            !query?.fetching &&
                            !query?.fetchingMore &&
                            !fetchingMore
                        "
                        :image="MagnifyingGlassIcon"
                        class="md:p-6"
                        heading="Aucun résultat"
                    >
                        <p v-if="emptyState">{{ emptyState }}</p>
                    </EmptyState>
                    <Scrollable v-else class="max-h-60" @scroll:end="handleScrollEnd">
                        <template v-if="!fetching && !query?.fetching">
                            <ul>
                                <li
                                    v-for="(item, idx) in filtredItems"
                                    :key="idx"
                                    :class="[
                                        'relative cursor-default select-none py-2 pl-8 pr-2 hover:bg-primary/10 hover:text-primary text-gray-900 t-2',

                                        isDisabled(item) ? 'opacity-50 pointer-events-none' : '',
                                    ]"
                                    @click="handleSelectClick(item, close)"
                                >
                                    <span :class="[isSelected(item) ? 'font-medium' : 'font-normal', 'block truncate']">
                                        {{ item[keys[0]] }}
                                    </span>
                                    <span
                                        v-if="isSelected(item)"
                                        class="absolute inset-y-0 left-0 flex items-center pl-2 text-amber-600"
                                    >
                                        <CheckIcon aria-hidden="true" class="h-5 w-5" />
                                    </span>
                                </li>
                            </ul>
                        </template>
                        <div
                            v-if="ssr || props.query"
                            :class="{
                                '!opacity-100': fetching || fetchingMore || query?.fetching || query?.fetchingMore,
                            }"
                            class="p-2 flex justify-center opacity-0"
                        >
                            <Spinner class="w-5 fill-primary" />
                        </div>
                    </Scrollable>
                </div>
            </template>
        </Popover>
        <ExceptionList v-if="helperText" :items="helperText" />
        <InlineError v-if="error" :errors="error" />
    </div>
</template>
