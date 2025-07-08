<script setup>
import moment from 'moment-timezone';
import { ref, watch } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import { useParams } from '@shared/hooks';

const props = defineProps({
    modelValue: [Object],
    placeholder: String,
    prefix: String,
    isClone: Boolean,
    noPreset: Boolean,
});

const emit = defineEmits(['update:model-value']);
const params = useParams();
const defaultValue =
    params.start && params.end && !props.isClone
        ? [params.start, params.end]
        : props.modelValue
        ? [props.modelValue.start, props.modelValue.end]
        : [];
const date = ref(defaultValue);
function getFormat(d = '') {
    return moment(String(d)).format('yyyy-MM-DD');
}
watch(
    () => props.modelValue,
    (value) => {
        if (props.isClone && !value) {
            date.value = value;
        }
    }
);

watch(date, (value) => {
    if (props.isClone) {
        emit(
            'update:model-value',
            value
                ? {
                      start: value[0],
                      end: value[1],
                  }
                : null
        );
    } else {
        const start = value?.[0] ? getFormat(value[0]) : null;
        const end = value?.[1] ? getFormat(value[1]) : null;
        params.update({ start, end });
    }
});
const format = ([date1, date2]) => {
    const start = moment(date1).format('DD/MM/YYYY');
    const end = moment(date2).format('DD/MM/YYYY');

    return `${props.prefix || ''}${start} au ${end}`;
};

const presetRanges = ref([
    { label: "Aujourd'hui", range: [new Date(), new Date()] },
    {
        label: 'hier',
        range: [moment().subtract(1, 'd').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
    },
    {
        label: 'Ce mois-ci',
        range: [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')],
    },
    {
        label: 'Les 7 derniers jours',
        range: [moment().subtract(7, 'd').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
    },
    {
        label: 'Le mois dernier',
        range: [
            moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD'),
            moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD'),
        ],
    },
]);
</script>

<template>
    <VueDatePicker
        v-model="date"
        multi-calendars
        range
        :enable-time-picker="false"
        :preset-ranges="!noPreset ? presetRanges : undefined"
        close-on-scroll
        dark
        color="orange"
        :placeholder="placeholder"
        select-text="Valider"
        cancel-text="Annuler"
        input-class-name=" pr-7 !rounded-full placeholder:text-gray-700 placeholder:text-sm text-sm "
        class="text-xs"
        locale="fr-FR"
        :format="format"
    >
    </VueDatePicker>
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
</style>
