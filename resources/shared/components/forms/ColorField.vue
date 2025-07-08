<template>
    <div class="flex justify-between flex-wrap items-center w-full flex-1">
        <span v-if="label" class="block font-medium text-xs text-gray-600">{{ label }}</span>
        <ColorPicker
            v-model:pure-color="pureColor"
            format="hex"
            :debounce="100"
            shape="circle"
            blur-close
            @update:pure-color="handleChange"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { ColorPicker } from 'vue3-colorpicker';
import 'vue3-colorpicker/style.css';
const props = defineProps({
    modelValue: {
        type: String,
        default: '#000',
    },
    label: String,
    defaultColor: String,
});

const pureColor = ref(props.defaultColor || props.modelValue);

const emit = defineEmits(['update:model-value']);
const handleChange = (value) => {
    emit('update:model-value', value);
};
</script>
