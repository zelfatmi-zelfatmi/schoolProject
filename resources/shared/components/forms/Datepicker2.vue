<script setup>
import { InlineError } from '../feedbacks';
import { reactive, watch, nextTick } from 'vue';
import moment from 'moment-timezone';
import { Button, Popover } from '../common';
import { CalendarIcon, XCircleIcon, XMarkIcon } from '@heroicons/vue/20/solid';
const emit = defineEmits(['update:model-value', 'change']);
const props = defineProps({
    modelValue: String,
    error: [String, Array],
    label: String,
    customClass: String,
    placeholder: String,
    birthday: Boolean,
    clear: Boolean,
    monthPicker: Boolean,
    length: Number,
    minDate: [String, Date, undefined, null],
    maxDate: [String, Date, undefined, null],
    minTime: [String, null],
    maxTime: [String, null],
    time: Boolean,
});
const id = 'datepicker-' + Math.random().toString(36).substring(2, 11);
const formatType = props.monthPicker ? 'yyyy-MM' : 'yyyy-MM-DD';
const getInitialData = () => {
    if (props.time) {
        return {
            hour: moment(props.modelValue || undefined, 'HH:mm').hour(),
            minute: moment(props.modelValue || undefined, 'HH:mm').minute(),
            value: props.modelValue || null,
        };
    }
    const y = moment(props.modelValue || undefined)
        .subtract(!props.modelValue && props.birthday ? 16 : 0, 'years')
        .year();
    return {
        year: y,
        month: moment(props.modelValue || new Date()).month() + 1,
        day: props.monthPicker ? 1 : moment(props.modelValue || new Date()).date(),
        value: props.modelValue ? moment(props.modelValue, formatType).format(formatType) : null,
    };
};
const state = reactive(getInitialData());
const getDefaultTime = ({ hour, minute } = {}) => {
    const minTime = moment(props.minTime || '07:00', 'HH:mm');
    const maxTime = moment(props.maxTime || '23:00', 'HH:mm');

    const availableHours = [];
    let availableMinutes = [0, 15, 30, 45];
    const start = minTime.hours() >= 23 ? 7 : minTime.hours();

    for (let h = start; h <= maxTime.hours(); h++) {
        availableHours.push(h);
    }
    if (state.hour === start) {
        availableMinutes = availableMinutes.filter((m) => m >= minTime.minutes());
    }
    return {
        hours: availableHours,
        minutes: availableMinutes,
    };
};
const getDefaultdata = ({ year, month }) => {
    const min = moment()
        .subtract(props.birthday ? 100 : 20, 'years')
        .toDate();
    const max = props.birthday ? moment().subtract(16, 'years').toDate() : props.maxDate;

    const startYear = moment(min).year();
    const endYear = max ? moment(max).year() : moment().year() + 10;

    const validYears = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i).filter(
        (year) =>
            (!props.minDate || moment(props.minDate, 'yyyy-MM-DD').year() <= year) &&
            (!props.maxDate || moment(props.maxDate, 'yyyy-MM-DD').year() >= year)
    );

    const months = moment.months().map((name, value) => ({ name, value: value + 1 }));

    const days = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth();
    return {
        days: days,
        years: validYears,
        months: months,
    };
};


const data = reactive(getDefaultdata({ year: state.year, month: state.month }));
const timeData = reactive(getDefaultTime());

const handleClear = () => {
    state.value = null;
    emit('update:model-value', null);
    emit('change', null);
};
const handleApply = () => {
    if (props.time) state.value = moment(`${state.hour}:${state.minute}`, 'HH:mm').format('HH:mm');
    else state.value = moment(`${state.day}-${state.month}-${state.year}`, 'DD-MM-YYYY').format(formatType);

    emit('update:model-value', state.value);
    emit('change', state.value);
};

watch(state, ({ year, month, hour, minute }) => {
    if (props.time) {
        const values = getDefaultTime({ hour, minute });
        timeData.hours = values.hours;
        timeData.minutes = values.minutes;
    } else {
        const values = getDefaultdata({ year, month });
        data.months = values.months;
        data.days = values.days;
    }
});
const handleOpen = async ({ year, month, day, hour, minute } = state) => {
    await nextTick();
    if (props.time) {
        scrollToActiveButton(`#hour-${id}`, hour);
        scrollToActiveButton(`#minute-${id}`, minute);
    } else {
        scrollToActiveButton(`#year-${id}`, year);
        scrollToActiveButton(`#month-${id}`, month);
        if (!props.monthPicker) {
            scrollToActiveButton(`#day-${id}`, day);
        }
    }
};
const scrollToActiveButton = (selector, value) => {
    const element = window.document?.querySelector(`${selector} [data-idx="${value}"]`);
    if (element) {
        element.scrollIntoView({ block: 'center', behavior: 'smooth', inline: 'nearest' });
        window.document.scrollingElement.scrollTop = window.document.scrollingElement.scrollTop || 0;
    }
};

watch(state, handleOpen);
watch(props, () => {
    if (props.time) {
        const values = getDefaultTime();
        timeData.hours = values.hours;
        timeData.minutes = values.minutes;
    } else {
        const values = getDefaultdata({ year: state.year, month: state.month });
        data.months = values.months;
        data.days = values.days;
    }
});
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
        <Popover
            :arrow="false"
            popper-classes="p-0 !min-w-80 md:max-w-lg"
            mobile
            class="w-full"
            z-index="z-[999]"
            @popover-opened="handleOpen(state)"
        >
            <input v-if="time" type="time" :value="state.value" placeholder="MM-DD-YYYY" class="form-control" />
            <div
                v-else-if="monthPicker"
                :class="['flex items-center px-3 min-h-9 gap-px', customClass || 'form-control']"
            >
                <input
                    :value="state.value ? moment(state.value, 'yyyy-MM').format('MMM yyyy') : ''"
                    :placeholder="placeholder || 'yyyy-MM'"
                    class="bg-transparent flex-1 inline-block w-20 h-full p-0 border-none outline-none"
                />
                <XMarkIcon
                    v-if="state.value && clear"
                    class="w-6 h-6 text-red-500 btn !p-0.5 hover:bg-red-500 hover:text-white relative"
                    @click.stop="handleClear"
                />
                <CalendarIcon class="w-5" />
            </div>
            <input
                v-else
                type="date"
                :value="state.value"
                :placeholder="placeholder || 'yyyy-MM-DD'"
                :class="customClass || 'form-control'"
            />
            <template #content="{ close }">
                <div class="flex justify-between border-b bg-slate-50">
                    <Button link dark class="!p-2" @click="close()">Fermer</Button>
                    <Button
                        primary
                        link
                        class="!p-2"
                        :disabled="time ? !state.hour && !state.minute : !state.day || !state.month || !state.year"
                        @click="handleApply(), close()"
                    >
                        Valider
                    </Button>
                </div>
                <ul v-if="time" class="flex text-xl divide-x bg-white">
                    <li :id="'hour-' + id" class="flex-1 max-h-60 overflow-y-auto no-scrollbar flex-col flex p-1">
                        <button
                            v-for="hour in timeData.hours"
                            :key="hour"
                            :data-idx="hour"
                            :class="[
                                'p-2 rounded-lg btn w-full justify-center text-lg',
                                state.hour === hour && 'bg-primary text-white',
                            ]"
                            @click="state.hour = hour"
                        >
                            {{ hour }}
                        </button>
                    </li>
                    <li :id="'minute-' + id" class="flex-1 max-h-60 overflow-y-auto no-scrollbar flex-col flex p-1">
                        <button
                            v-for="minute in timeData.minutes"
                            :key="minute"
                            :data-idx="minute"
                            :class="[
                                'p-2 rounded-lg btn w-full justify-center text-lg',
                                state.minute === minute && 'bg-primary text-white',
                            ]"
                            @click="state.minute = minute"
                        >
                            {{ minute?.toString().padStart(2, '0') }}
                        </button>
                    </li>
                </ul>
                <div v-else class="flex text-xl divide-x bg-white">
                    <li
                        :id="'year-' + id"
                        class="flex-1 min-w-[30%] max-h-60 overflow-y-auto no-scrollbar flex-col flex p-1"
                    >
                        <button
                            v-for="year in data.years"
                            :key="year"
                            :data-idx="year"
                            :class="[
                                'p-2 rounded-lg btn w-full justify-center text-lg',
                                state.year === year && 'bg-primary text-white',
                                minDate && moment(minDate, 'yyyy-MM-DD').year() > year && 'disable',
                            ]"
                            @click="state.year = year"
                        >
                            {{ year }}
                        </button>
                    </li>
                    <li :id="'month-' + id" class="flex-auto max-h-60 overflow-y-auto no-scrollbar flex-col flex p-1">
                        <button
                            v-for="month in data.months"
                            :key="month.value"
                            :data-idx="month.value"
                            :class="[
                                'p-2 rounded-lg btn w-full justify-center text-lg',
                                state.month === month.value && 'bg-primary text-white',
                                minDate &&
                                    moment(minDate, 'yyyy-MM-DD').month() >= month.value &&
                                    state.year === moment(minDate, 'yyyy-MM-DD').year() &&
                                    'disable',
                                maxDate &&
                                    moment(maxDate, 'yyyy-MM-DD').month() < month.value &&
                                    state.year === moment(maxDate, 'yyyy-MM-DD').year() &&
                                    'disable',
                            ]"
                            @click="state.month = month.value"
                        >
                            {{ month.name }}
                        </button>
                    </li>
                    <li
                        v-if="!monthPicker"
                        :id="'day-' + id"
                        class="flex-1 min-w-[30%] max-h-60 overflow-y-auto no-scrollbar flex-col flex p-1"
                    >
                        <button
                            v-for="day in data.days"
                            :key="day"
                            :data-idx="day"
                            :class="[
                                'p-2 rounded-lg btn w-full justify-center text-lg',
                                state.day === day && 'bg-primary text-white',
                                minDate &&
            moment(`${state.year}-${state.month}-${day}`, 'YYYY-MM-DD')
                .isBefore(moment(minDate, 'YYYY-MM-DD'))
            && 'disable',
                            ]"
                            @click="state.day = day"
                        >
                            {{ day }}
                        </button>
                    </li>
                </div>
            </template>
        </Popover>
        <InlineError v-if="error" :errors="error" />
    </div>
</template>
<style scoped>
.disable {
    @apply opacity-50 pointer-events-none;
}
</style>
