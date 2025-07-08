<template>
    <div class="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div
            class="grid grid-cols-7 text-center text-xs font-semibold leading-6 text-white lg:flex-none relative divide-x divide-gray-400/50"
        >
            <div v-for="day in days" :key="day" class="py-2 relative z-1">
                {{ day }}
            </div>
            <BgAnimated appearance="modal" class="-z-1" />
        </div>
        <div class="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
            <div class="w-full grid grid-cols-7 grid-rows-5 gap-px">
                <div
                    v-for="day in daysInMonth"
                    :key="day"
                    :class="[
                        day.slice(0, -3) === moment().format('YYYY-MM') ? 'bg-white' : 'bg-gray-50 text-gray-500',
                        'relative px-2 py-1 min-h-32',
                    ]"
                >
                    <time
                        :class="[
                            moment().format('YYYY-MM-DD') === day
                                ? 'flex h-6 w-6 items-center justify-center rounded-full bg-primary font-semibold text-white'
                                : undefined,
                            'relative z-1',
                        ]"
                        :datetime="day.date"
                    >
                        {{ day.split('-').pop().replace(/^0/, '') }}
                    </time>

                    <ol v-if="plannings.data?.[day]?.length > 0" class="mt-1 flex flex-col gap-1">
                        <SessionMonthItem
                            v-for="item in getSlicedList(day)"
                            :key="item.id"
                            :item="item"
                            @select="session.selectedSession = item"
                        />
                        <li v-if="plannings.data?.[day]?.length > 3" class="text-gray-500">
                            <button
                                class="hover:text-primary hover:underline"
                                @click="showMoreSessions = plannings.data?.[day]"
                            >
                                + {{ plannings.data?.[day]?.length - 3 }} autres
                            </button>
                        </li>
                    </ol>
                    <button
                        v-else
                        :class="[
                            'bg-gradient-lines absolute inset-0 z-0 hover:bg-primary/5 transition-all duration-300',
                            moment(day).diff(moment(), 'd') < 0 && 'pointer-events-none',
                        ]"
                        @click="handleEventInCalendar(day)"
                    ></button>
                </div>
            </div>
        </div>
        <ShowMoreSessionsModal :sessions="showMoreSessions" @close="showMoreSessions = null" />
    </div>
</template>

<script setup>
import moment from 'moment-timezone';
import { onMounted, ref, watch } from 'vue';
import { usePlanningSession, usePlannings } from '@admin/stores';
import ShowMoreSessionsModal from '../modals/ShowMoreSessionsModal.vue';
import SessionMonthItem from './SessionMonthItem.vue';
import { BgAnimated } from '@moniteur/components';

defineProps({
    days: {
        type: Array,
        default: () => [],
    },
});
const session = usePlanningSession();
const plannings = usePlannings();

const daysInMonth = ref([]);
const showMoreSessions = ref(null);

onMounted(() => {
    generateDays();
});

// watch  session.start and session.end
watch([() => session.start, () => session.end], () => {
    generateDays();
});
const getSlicedList = (day) => {
    const length = plannings.data?.[day]?.length;
    if (length > 3) {
        return plannings.data?.[day]?.slice(0, 3);
    }
    return plannings.data?.[day];
};
const generateDays = () => {
    // getPlannings();
    daysInMonth.value = [];
    for (let m = moment(session.start); m.diff(session.end, 'days') < 0; m.add(1, 'days')) {
        daysInMonth.value.push(m.format('YYYY-MM-DD'));
    }
    daysInMonth.value.push(session.end.format('YYYY-MM-DD'));
};
// const getPlannings = async () => {
//     const params = {
//         start: session.start.format('YYYY-MM-DD'),
//         end: session.end.format('YYYY-MM-DD'),
//         view: props.view,
//     };
//     await axios.get(route(routes.api.plannings.list), { params }).then((res) => {
//         plannings.value = res.data.plannings;
//     });
// };
const handleEventInCalendar = (date) => {
    session.selectedSession = {
        date: moment(date).format('YYYY-MM-DD'),
        start_at: '08:00',
        end_at: '09:00',
    };
    session.show = true;
};
</script>
