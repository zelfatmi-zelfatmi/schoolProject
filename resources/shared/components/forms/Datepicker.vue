<script setup>
import { dateFormat } from '@shared/helpers';
import VueDatePicker from '@vuepic/vue-datepicker';
import { InlineError } from '../feedbacks';
import { computed } from 'vue';
import moment from 'moment-timezone';

const props = defineProps({
    modelValue: String,
    inputClass: String,
    error: [String, Array],
    label: String,
    placeholder: String,
    enableTimePicker: Boolean,
    inline: Boolean,
    timePicker: Boolean,
    minDate: [Date, undefined, null],
    maxDate: [Date, undefined, null],
    minTime: { type: Object, default: () => ({}) },
    maxTime: { type: Object, default: () => ({}) },
    autoApply: { type: Boolean, default: true },
    minutesIncrement: { type: Number, default: 5 },
    formatType: { type: String, default: 'fulliso' },
    format: { type: String, default: 'dd/MM/yyyy' },
});
const emit = defineEmits(['update:model-value']);
const convertDate = computed(() => {
    if (props.timePicker && props.modelValue) {
        const cdt = moment(props.modelValue, 'HH:mm');
        return {
            hours: cdt.hours(),
            minutes: cdt.minutes(),
        };
    }
    return props.modelValue;
});
const handleDate = (value) => {
    emit('update:model-value', value ? dateFormat(value, props.formatType) : null);
};
</script>
<template>
    <div class="w-full">
        <label
            v-if="label"
            class="block font-medium text-xs text-gray-600 mb-0.5 mt-1"
            :class="{ '!text-red-600': !!error }"
        >
            {{ label }}
        </label>
        <VueDatePicker
            :model-value="convertDate"
            :min-date="minDate"
            :max-date="maxDate"
            :min-time="minTime"
            :max-time="maxTime"
            :inline="inline"
            placeholder="jj/mm/aaaa" 
            text-input 
            :minutes-grid-increment="minutesIncrement"
            :minutes-increment="minutesIncrement"
            is24
            :start-time="{ hours: 8, minutes: 0 }"
            disable-time-range-validation
            :enable-seconds="false"
            ignore-time-validation
            esc-close
            :format="format"
            :time-picker="timePicker"
            :enable-time-picker="enableTimePicker"
            :input-class-name="inputClass "
            :placeholder="placeholder || 'Sélectionner une date'"
            :auto-apply="autoApply"
            locale="fr-FR"
            menu-class-name="overflow-hidden"
            select-text="Valider"
            cancel-text="Annuler"
            @update:model-value="handleDate"

        />
        <InlineError v-if="error" :errors="error" />
    </div>
</template>

<style>
.dp__action_cancel {
    padding: 6px 12px 6px 12px;
}
.dp__action_select {
    background-color: #e25626;
    padding: 6px 12px 6px 12px;
}

.dp__action_select:hover {
    background-color: rgba(226, 86, 38, 0.89);
}
.dp__today {
    border: 1px solid #824a37a8;
}
.dp__range_between {
    background-color: #824a37a8 !important;
}
.dp__range_start,
.dp__range_end,
dp__range_hover_end {
    background-color: rgba(226, 86, 38, 0.89);
}
.dp__range_start,
.dp__range_end,
.dp__active_date {
    background-color: rgba(226, 86, 38, 0.89);
}
.dp__month_year_select:hover {
    background-color: #824a37a8 !important;
    color: #ffffff;
}
.dp__preset_range:hover {
    background-color: rgba(130, 74, 55, 0.81) !important;
    color: #ffffff;
}
.dp__input_focus:focus {
    border-color: #e25626 !important;
    border-width: 2px !important; /* Augmentez la valeur (ex: 2px, 3px, etc.) selon vos besoins */
    box-shadow: 0 0 0 2px rgba(226, 86, 38, 0.3) !important;
    outline: none !important;
}


.dp__input:hover {
    border-color: #e25626; /* même couleur que .dp__action_select */
    border-width: 2px !important; /* Augmentez la valeur (ex: 2px, 3px, etc.) selon vos besoins */

}

</style>
