<template>
    <div>
        <codemirror
            v-model="code"
            :autofocus="autofocus"
            :extensions="extensions"
            :indent-with-tab="indentWithTab"
            :placeholder="placeholder"
            :style="style"
            :tab-size="tabSize"
            @input="onInput"
        />
        <InlineError v-if="error" :errors="error" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Codemirror } from 'vue-codemirror';
import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';
import InlineError from '@shared/components/feedbacks/InlineError.vue';

const props = defineProps({
    error: {
        type: [String, Array],
        default: '',
    },
    modelValue: {
        type: [String, Number],
        default: null,
    },
    placeholder: {
        type: String,
        default: '',
    },
    style: {
        type: Object,
        default: () => ({ height: '400px', borderRadius: '8px', overflow: 'hidden' }),
    },
    autofocus: {
        type: Boolean,
        default: true,
    },
    indentWithTab: {
        type: Boolean,
        default: true,
    },
    tabSize: {
        type: Number,
        default: 2,
    },
    extensions: {
        type: Array,
        default: () => [html(), oneDark],
    },
});
const code = ref(props.modelValue);
const emit = defineEmits(['update:modelValue']);

const onInput = () => {
    emit('update:modelValue', code);
};
</script>
