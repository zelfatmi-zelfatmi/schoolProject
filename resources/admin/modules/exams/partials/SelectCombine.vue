<script setup>
import { InlineError } from '@shared/components';
import { watch, reactive } from 'vue';
// import moment from 'moment-timezone';
import { examPeriodsList, monthsList } from '@admin/constants';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
    error: [String, Array],
    modelValue: String,
});

const defaultValue = (value = props.modelValue) => {
    const [month, period] = value?.split('') || [];
    return {
        period: period || examPeriodsList[0].id,
        month: month || '',
    };
};
const state = reactive(defaultValue());
watch(state, ({ period, month }) => {
    emit('update:modelValue', month + period);
});
watch(
    () => props.modelValue,
    (val) => {
        const { period, month } = defaultValue(val);
        state.period = period;
        state.month = month;
    }
);
</script>

<template>
    <div>
        <label class="block font-medium text-xs text-gray-600 mb-0.5 my-1">Date de passage prévu</label>
        <div class="flex gap-5">
            <select v-model="state.month" class="form-control w-2/3">
                <option v-for="month in monthsList" :key="month.id" :value="month.id">{{ month.name }}</option>
            </select>
            <select v-model="state.period" class="form-control w-1/3">
                <option v-for="period in examPeriodsList" :key="period.id" :value="period.id">{{ period.name }}</option>
            </select>
        </div>
        <InlineError v-if="error" :error="error" />
    </div>
</template>
