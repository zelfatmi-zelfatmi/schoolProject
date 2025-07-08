<script setup>
import { routes } from '@admin/routes';
import { Box } from '@shared/components';
import { useMutation, useQuery } from '@shared/hooks';
import moment from 'moment-timezone';
import SecretaryCalendarItem from './SecretaryCalendarItem.vue';

const props = defineProps({
    user: Object,
});
const listDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const hours = Array.from({ length: 12 }, (_, i) => i + 8);
const availableCalls = useQuery(
    {
        url: route(routes.api.calls.index),
        params: {
            date_start: moment().startOf('week').startOf('isoWeek').format('YYYY-MM-DD'),
            date_end: moment().endOf('week').endOf('isoWeek').format('YYYY-MM-DD'),
            eleve_id: props.user?.eleve?.id,
        },
        key: 'availableCalls',
    },
    true
);
const { mutate, form, mutating } = useMutation({
    eleve_id: props.user?.eleve?.id,
    date: null,
    time_at: null,
});

const handleSubmitCall = (index, hour, { close, isCallPresent }) => {
    if (isCallPresent) {
        // return availableCalls.data[isCallPresent.date].splice();
        return mutate(route(routes.api.calls.destroy, isCallPresent.id), 'delete')
            .then((res) => {
                if (res) {
                    const removingId = availableCalls.data[isCallPresent.date].findIndex(
                        (value) => value.id === isCallPresent.id
                    );
                    availableCalls.data[isCallPresent.date].splice(removingId, 1);
                }
            })
            .finally(close);
    }
    form.date = moment().startOf('isoWeek').add(index, 'days').format('yyyy-MM-DD');
    form.time_at = `${hour < 10 ? '0' + hour : hour}:00`;
    mutate(route(routes.api.calls.store), 'post')
        .then((res) => {
            if (res) {
                if (availableCalls.data[form.date]) {
                    availableCalls.data[form.date].push({ ...res, parsed_hour: hour });
                } else {
                    availableCalls.data[form.date] = [{ ...res, parsed_hour: hour }];
                }
            }
        })
        .finally(close);
};
const isCallPresent = (index, hour) => {
    const date = moment().startOf('isoWeek').add(index, 'days').format('yyyy-MM-DD');
    return (availableCalls.data?.[date] || []).find((value) => value.parsed_hour === hour) || null;
};
</script>
<template>
    <Box class="!p-0 text-sm">
        <div>
            <ul class="grid grid-cols-8 border-b divide-x h-12 items-center justify-center">
                <li class="w-full h-full bg-slate-100"></li>
                <li v-for="(day, idx) in listDays" :key="day" class="flex-center h-full">
                    {{ day }}
                    <span
                        :class="[
                            moment().format('DD') === moment().startOf('isoWeek').add(idx, 'days').format('DD') &&
                                'bg-primary rounded-full text-white text-xs w-5 h-5 flex-center',
                            'ml-1',
                        ]"
                        >{{ moment().startOf('isoWeek').add(idx, 'days').format('DD') }}</span
                    >
                </li>
            </ul>
            <ul class="grid divide-y">
                <li v-for="hour in hours" :key="hour">
                    <ul class="grid grid-cols-8 divide-x items-center justify-center">
                        <li class="h-12 flex-center">{{ hour }}:00</li>
                        <SecretaryCalendarItem
                            v-for="(_, index) in listDays"
                            :key="index"
                            :is-call-present="isCallPresent(index, hour)"
                            :mutating="mutating"
                            @confirm="handleSubmitCall(index, hour, $event)"
                        />
                    </ul>
                </li>
            </ul>
        </div>
    </Box>
</template>
