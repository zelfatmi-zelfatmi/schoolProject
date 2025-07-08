<script setup>
import { ref, computed, watch } from 'vue';
import { InlineError } from '../feedbacks';

const emit = defineEmits(['update:checked', 'update']);

const props = defineProps({
    checked: {
        type: [Array, Boolean],
        default: false,
    },
    value: {
        type: [String, Object, Number, Boolean],
        default: null,
    },
    error: {
        type: [String, Array],
        default: '',
    },
    label: String,
    indeterminate: Boolean,
    disabled: Boolean,
    id: String,
    content: String,
});
const uniqueID = ref(Math.random().toString(36).substring(7));

const proxyChecked = computed({
    get() {
        if (props.disabled) {
            return false;
        }
        return props.checked;
    },

    set(val) {
        emit('update:checked', val);
        emit('update', val);
    },
});
watch(
    () => props.disabled,
    (val) => {
        if (val) {
            proxyChecked.value = false;
        }
    },
    { immediate: true }
);
</script>

<template>
    <div :class="['w-full flex', content ? 'items-start' : 'items-center', disabled && 'opacity-50']">
        <input
            :id="id || uniqueID"
            v-model="proxyChecked"
            name="id || uniqueID"
            aria-describedby="comments-description"
            type="checkbox"
            :value="value"
            :disabled="disabled"
            :indeterminate="indeterminate"
            class="h-6 w-6 rounded-full border-gray-300 text-primary focus:ring-primary"
        />
        <div v-if="label || content" class="ml-3 flex-1">
            <label :for="id || uniqueID" class="block font-medium max-md:text-sm leading-4 text-gray-900 select-none">
                {{ label }}
            </label>
            <p v-if="content" :id="(id || uniqueID) + '-description'" class="text-xxs text-slate-700 block">
                {{ content }}
            </p>
            <InlineError v-if="error" :errors="error" />
        </div>
    </div>
</template>
