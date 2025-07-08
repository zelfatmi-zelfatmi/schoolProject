<template>
    <div class="flex items-center relative">
        <div class="relative rounded-md flex-1 flex gap-3 h-full">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                    class="h-5 pr-1.5 absolute left-2 top-1/2 -mt-2.5 opacity-70 border-gray-300 fill-current"
                />
            </div>
            <button
                v-if="modelValue"
                :class="{ 'opacity-0': (!isInputFocused || loading) && !modelValue }"
                type="button"
                class="absolute right-2 top-1/2 -mt-2.5"
                @click="handleClear"
            >
                <XCircleIcon class="h-5 pr-1.5 opacity-70 border-gray-300 fill-current" />
            </button>

            <input
                v-bind="attrs"
                :id="id"
                ref="inputSearch"
                :value="modelValue"
                type="text"
                name="search"
                placeholder="Recherche"
                class="pl-10 bg-transparent focus:ring-slate-900 block h-full w-full rounded-md border-0 py-3 pr-3 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                @keydown="handleSearch"
                @focus="isInputFocused = true"
                @blur="isInputFocused = false"
            />
        </div>
        <Spinner v-if="loading" class="w-8 absolute right-2 p-1.5 top-1/2 -mt-4 fill-orange-500 text-gray-400" />
    </div>
</template>
<script setup>
import {ref, useAttrs} from 'vue';
import {MagnifyingGlassIcon, XCircleIcon} from '@heroicons/vue/24/solid';
import {useDebounce} from '@shared/hooks';
import {Spinner} from '../common';

defineProps({
    modelValue: String,
    loading: Boolean,
    placeholder: String,
    classOverride: String,
});
const emit = defineEmits(['update:modelValue', 'change']);
// const params = useParams();
const id = `search-field-${Math.random().toString(36).substr(2, 9)}`;
const debounce = useDebounce(800);
const attrs = useAttrs();
const inputSearch = ref();
const isInputFocused = ref(false);
// const handleChange = (e = {}) => {
//     if (e?.key === 'Enter') {
//         inputSearch.value?.blur();
//     }
//     emit('update:modelValue', e.target.value);
// };
const handleSearch = debounce((e = {}) => {
    if (e?.key === 'Enter') {
        inputSearch.value?.blur();
    }
    emit('change', e.target.value);
    emit('update:modelValue', e.target.value);
});
const handleClear = () => {
    emit('update:modelValue', '');
    emit('change', '');
};
// useParams
</script>
