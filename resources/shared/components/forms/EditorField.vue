<template>
    <div class="block max-w-full">
        <div v-if="label" class="flex justify-between">
            <label class="block text-sm font-medium leading-6 text-gray-800">{{ label }}</label>
            <slot name="action" />
        </div>
        <slot>
            <div v-if="toolbar" class="w-full prose max-w-full prose-sm mt-0.5">
                <ckeditor
                    :editor="ClassicEditor"
                    :model-value="modelValue"
                    :placeholder="placeholder"
                    :config="config"
                    @input="$emit('update:modelValue', $event)"
                ></ckeditor>
            </div>
            <div v-else-if="!showSource" class="relative">
                <textarea
                    :class="[
                        error
                            ? 'text-red-900 ring-red-300 focus:ring-red-500 placeholder:text-red-300 pr-10'
                            : 'ring-gray-300 focus:ring-indigo-600',
                        'form-control',
                    ]"
                    :value="modelValue"
                    :placeholder="placeholder"
                    cols="30"
                    rows="3"
                    @input="$emit('update:modelValue', $event.target.value)"
                ></textarea>
                <div v-if="error" class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                </div>
            </div>
        </slot>

        <InlineError v-if="error" :errors="error" />
    </div>
</template>

<script setup>
import '@ckeditor/ckeditor5-build-classic/build/translations/fr';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ExclamationCircleIcon } from '@heroicons/vue/24/solid';
import { InlineError } from '../feedbacks';
import { computed } from 'vue';

defineEmits(['update:modelValue']);
defineProps({
    label: String,
    error: String,
    showSource: Boolean,
    toolbar: {
        type: Boolean,
        default: true,
    },
    modelValue: {
        type: [String, Number],
        default: null,
    },
    placeholder: {
        type: String,
        default: '',
    },
});
const config = computed(() => ({
    language: { ui: 'fr' },
    ckfinder: { uploadUrl: route('image.upload') + '?_token=' + document.getElementById('_token')?.value },
    toolbar: {
        shouldNotGroupWhenFull: true,
    },
}));
</script>
