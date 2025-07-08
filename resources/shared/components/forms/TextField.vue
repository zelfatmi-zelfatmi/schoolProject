<template>
    <div class="flex-1">
        <label
            v-if="label"
            :for="id || uniqueID"
            class="block font-medium text-xs mb-0.5 mt-1"
            :class="[error && '!text-red-600', labelClass || 'text-gray-600']"
        >
            {{ label }}
        </label>
        <div class="relative">
            <div v-if="PrefixName" class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <PrefixName
                    class="h-[17px] pr-1.5 absolute left-2 top-[10px] border-r opacity-70 border-gray-300 fill-current text-gray-700"
                    :class="{ '!text-red-500 !opacity-100': !!error }"
                />
            </div>
 
            <component
               :is="MaskInputComponent"
               v-if="mask && MaskInputComponent"
               v-bind="attrs"
              :id="id || uniqueID"
              :mask="mask"
              :model-value="modelValue"
              :placeholder="placeholder"
              :value="modelValue"
              :type="type"
              :class="[
                    disabled && 'disabled',
                    PrefixName ? '!pl-10' : '',
                    inputClass || 'form-control',
                    multiline && 'h-auto',
                    suffix && 'pr-9',
                ]"
                @update:model-value="onInput"
                @blur="onBlur"
                />

            <component
                :is="compName"
                v-else
                v-bind="attrs"
                :id="id || uniqueID"
                :type="type"
                :name="name || id || uniqueID"
                :disabled="disabled"
                :placeholder="placeholder"
                :aria-invalid="error"
                :value="modelValue"
                :rows="multiline"
                :aria-describedby="`${name || id || uniqueID}-error`"
                :class="[
                    disabled && 'disabled',
                    PrefixName ? '!pl-10' : '',
                    inputClass || 'form-control',
                    multiline && 'h-auto',
                    suffix && 'pr-9',
                ]"
                :inputmode="inputmode"
                :autocomplete="autocomplete"
                :autofocus="autofocus"
                :maxlength="length"
                @input="onInput"
                @blur="onBlur"
            />
            <div v-if="suffix" class="absolute right-0 top-1/2 -translate-y-1/2 w-9 flex-center text-gray-500">
                <component
                    :is="suffix"
                    v-if="typeof suffix === 'function'"
                    :class="[
                        'h-8 w-8 p-1',
                        suffixEvent && 'btn-m hover:bg-primary rounded-md text-primary hover:text-white',
                    ]"
                    @click="$emit('click:suffix')"
                />
                <div v-else>{{ suffix }}</div>
            </div>
            <div v-if="error" class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
            </div>
        </div>
        <p v-if="helperText" class="text-sm text-gray-500">{{ helperText }}</p>
        <InlineError v-if="error" :errors="error" />
    </div>
</template>

<script setup>
import {
    ExclamationCircleIcon,
    MagnifyingGlassIcon,
    PhoneIcon,
    EnvelopeIcon,
    LockClosedIcon,
} from '@heroicons/vue/20/solid';
import { computed, useAttrs, ref ,onMounted} from 'vue';
import { InlineError } from '../feedbacks';
const MaskInputComponent = ref(null);

onMounted(async () => {
    if (typeof window !== "undefined") {
        MaskInputComponent.value = (await import('vue-3-mask')).MaskInput;
    }
});
const emit = defineEmits(['update:modelValue', 'click:suffix']);
const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: null,
    },
    prefix: {
        type: [String, null],
        default: null,
    },
    suffix: {
        type: [String, Function, Object],
        default: null,
    },
    label: {
        type: String,
        default: '',
    },
    inputClass: {
        type: String,
        default: '',
    },
    multiline: {
        type: Number,
        default: 0,
    },
    name: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: 'text',
    },
    error: {
        type: [String, Array],
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    id: String,
    autocomplete: String,
    mask: String,
    avoidReplace: Boolean,
    labelClass: String,
    helperText: String,
    inputmode: String,
    length: Number,
    autofocus: Boolean,
    suffixEvent: Boolean,
});
const compName = props.multiline ? 'textarea' : 'input';
const attrs = useAttrs();
// random unique id
const uniqueID = ref(Math.random().toString(36).substring(7));
const PrefixName = computed(() => {
    switch (props.type) {
        case 'search':
            return MagnifyingGlassIcon;
        case 'tel':
            return PhoneIcon;
        case 'email':
            return EnvelopeIcon;
        case 'password':
            return LockClosedIcon;
        default:
            return null;
    }
});
const onBlur = () => {
    if (props.mask && !props.avoidReplace) {
        const value = typeof props.modelValue === 'string' ? props.modelValue?.replaceAll(' ', '') : '';
        emit('update:modelValue', value || props.modelValue);
        return;
    }
};
const onInput = (e) => {
    if (props.mask) {
        emit('update:modelValue', e);
        return;
    }
    if (props.length && e.target.value.length > props.length) {
        emit('update:modelValue', props.modelValue);
        return;
    }
    emit('update:modelValue', e.target.value);
};
</script>
