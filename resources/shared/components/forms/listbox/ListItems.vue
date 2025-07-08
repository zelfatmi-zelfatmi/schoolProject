<script setup>
import { computed, ref, watch } from 'vue';
import { CheckIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid';
import { SearchField } from '../index';
import { EmptyState, Scrollable, Spinner } from '../../common';

const emit = defineEmits(['update:modelValue', 'change', 'open', 'search', 'scroll:end', 'change:full', 'list:close']);
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

const selectedItem = defineModel({
    type: [String, Object, Boolean, Number, Array],
    default: () => ({}),
});
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

const isDisabled = (item) => {
    if (props.multiple) {
        return (
            props.max <= props.modelValue?.length &&
            !props.modelValue?.some((x) => x[props.keys[1]] === item?.[props.keys[1]])
        );
    }
    return false;
};
const isSelected = (item) => {
    if (props.multiple) {
        return selectedItem.value?.some((v) => JSON.stringify(item) === JSON.stringify(v));
    }
    return JSON.stringify(item) === JSON.stringify(selectedItem.value);
};
const handleSelectClick = (item, close) => {
    if (props.multiple) {
        const index = selectedItem.value?.findIndex((v) => JSON.stringify(item) === JSON.stringify(v));
        index > -1 ? selectedItem.value.splice(index, 1) : selectedItem.value.push(item);
        return;
    }
    selectedItem.value = item;
    close();
};
</script>
<template>
    <div class="">
        <div class="p-2 border-b flex">
            <SearchField v-model="search" class="bg-slate-200 rounded-xl h-8 flex-1" @change="handleSearch" />
        </div>
        <EmptyState
            v-if="!filtredItems.length && !fetching && !fetchingMore"
            :image="MagnifyingGlassIcon"
            class="md:p-6"
            heading="Aucun résultat"
        >
            <p v-if="emptyState">{{ emptyState }}</p>
        </EmptyState>
        <Scrollable v-else class="max-h-60" @scroll:end="$emit('scroll:end', search)">
            <template v-if="!fetching">
                <ul
                    v-for="(item, idx) in filtredItems"
                    :key="idx"
                    :disabled="isDisabled(item)"
                    @click="handleSelectClick(item, close)"
                >
                    <li
                        class="relative cursor-default select-none py-2 pl-8 pr-2 hover:bg-primary/10 hover:text-primary text-gray-900 t-200"
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
                v-if="ssr"
                :class="{ '!opacity-100': fetching || fetchingMore }"
                class="p-2 flex justify-center opacity-0"
            >
                <Spinner class="w-5 fill-primary" />
            </div>
        </Scrollable>
    </div>
</template>
