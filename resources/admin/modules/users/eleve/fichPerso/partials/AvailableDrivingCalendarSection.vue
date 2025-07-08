<script setup>
import { ref, watch, computed } from 'vue';
import { routes } from '@admin/routes';
import { Box, Spinner } from '@shared/components';
import { useMutation, useQuery } from '@shared/hooks';
import moment from 'moment-timezone';
import AvailableDrivingItem from './AvailableDrivingItem.vue';
import AvailableDrivingModal from './modals/AvailableDrivingModal.vue';
import { Switch } from '@headlessui/vue';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';
import { getDateWeekByIndex, getListMoniteurs } from '../fishPerso';
import { hours } from '@shared/constants';

const props = defineProps({
    user: Object,
});
const reserved = ref(true);
const selectedSession = ref(null);
const listDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
// const hours = Array.from({ length: 12 }, (_, i) => i + 8);
const activeWeek = ref(0);
const planning = useQuery(
    {
        url: route(routes.api.availableSession.eleveReservation, props.user?.eleve?.id),
        params: getDateWeekByIndex(activeWeek.value),
        key: 'plannings',
    },
    true
);
const availableSession = useQuery(
    {
        url: route(routes.api.availableSession.index, props.user?.eleve?.id),
        params: getDateWeekByIndex(activeWeek.value),
        key: 'availableSession',
    },
    true
);
const { mutate, form, mutating } = useMutation({
    eleve_id: props.user?.eleve?.id,
    date: null,
    time_at: null,
});
const counts = computed(() => {
    let reservation = 0;
    let disponibilty = 0;
    for (const key in planning.data) {
        for (const key2 in planning.data[key]) {
            reservation += planning.data[key][key2].reduce((acc, value) => {
                if (value.session) return acc + 1;
                return acc;
            }, 0);
        }
    }
    for (const key in availableSession.data) {
        disponibilty += availableSession.data[key].reduce((acc) => acc + 1, 0);
    }
    return {
        reservation,
        disponibilty,
    };
});
const getCurrentWeek = (i) => moment().startOf('isoWeek').add(activeWeek.value, 'week').add(i, 'days');
const getItem = (index, hour) => {
    const date = getCurrentWeek(index).format('yyyy-MM-DD');
    const f = (m) => m.format('yyyy-MM-DD HH:mm');
    return {
        list: planning.data?.[date]?.[hour] || [],
        disabled: f(moment(date).set('hour', hour)) < f(moment()),
        item: {
            start_at: moment(`${hour}:00`, 'HH:mm').format('HH:mm'),
            end_at: moment(`${hour + 1}:00`, 'HH:mm').format('HH:mm'),
            is_active: 1,
            date: date,
            eleve_id: props.user?.eleve?.id,
        },
    };
};
const getDisponibility = (index, hour) =>
    availableSession.data?.[getCurrentWeek(index).format('yyyy-MM-DD')]?.find((value) => value.date_hour === hour) ||
    null;

const handleAddSession = (index, hour, e = { close: () => {}, isDisponible: null }) => {
    if (reserved.value) {
        const data = getItem(index, hour);
        selectedSession.value = {
            ...data.item,
            moniteurs: getListMoniteurs(data.list).map((value) => ({ ...value.user, ...value })),
        };
        return;
    }
    form.bulkLoading = {
        [index + '-' + hour]: true,
    };
    form.date = getCurrentWeek(index).format('yyyy-MM-DD');
    form.time_at = `${hour < 10 ? '0' + hour : hour}:00`;
    const url = e.isDisponible
        ? route(routes.api.availableSession.destroy, e.isDisponible.id)
        : route(routes.api.availableSession.store);
    mutate(url, e.isDisponible ? 'delete' : 'post')
        .then((res) => {
            e.close?.();
            if (e.isDisponible) {
                const removingId = availableSession.data[e.isDisponible.date].findIndex(
                    (v) => v.id === e.isDisponible.id
                );
                availableSession.data[e.isDisponible.date].splice(removingId, 1);
            } else {
                if (availableSession.data[form.date]) {
                    availableSession.data[form.date].push({ ...res, date_hour: hour });
                } else {
                    availableSession.data[form.date] = [{ ...res, date_hour: hour }];
                }
            }
        })
        .finally(() => {
            form.bulkLoading = {
                [index]: false,
            };
        });
};

// watch filter calendar
watch(activeWeek, (value) => {
    const { start, end } = getDateWeekByIndex(value);
    planning.params.start = start;
    planning.params.end = end;
    availableSession.params.start = start;
    availableSession.params.end = end;
    planning.fetch();
    availableSession.fetch();
});
</script>
<template>
    <Box
        class="overflow-hidden p-4 relative"
        :title="reserved ? 'Réservez votre séance' : 'Disponible de conduite'"
        :subtitle="
            reserved
                ? `${counts.reservation} Réservations cette semaine `
                : `${counts.disponibilty} Disponibilités cette semaine`
        "
        as="section"
    >
        <template #action>
            <div class="flex-center gap-3">
                <Switch
                    v-model="reserved"
                    class="relative grid grid-cols-2 h-9 w-fit items-center rounded-full text-xs gap-2 bg-white px-1 border border-gray-300 z-0 shadow-sm"
                >
                    <span :class="['relative z-1 px-2 t-300', !reserved ? 'text-gray-800' : 'text-white']">
                        Reservation
                    </span>
                    <span :class="['relative z-1 px-2 t-300', reserved ? 'text-gray-800' : 'text-white']">
                        Disponibilité
                    </span>
                    <span
                        :class="reserved ? 'left-px bg-primary' : 'left-1/2 bg-indigo-500'"
                        class="inline-block h-8 left-0 t-300 rounded-full z-0 absolute w-1/2"
                    />
                </Switch>
                <div class="flex items-center rounded-full bg-white shadow-sm border border-gray-300 h-9 overflow-clip">
                    <button class="flex-center w-9 hover:bg-slate-100 h-full" @click="activeWeek = activeWeek - 1">
                        <ChevronLeftIcon aria-hidden="true" class="h-5 w-5" />
                    </button>
                    <button
                        class="px-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 h-full"
                        @click="activeWeek = 0"
                    >
                        Aujourd’hui
                    </button>
                    <span class="relative -mx-px h-5 w-px bg-slate-300 md:hidden" />
                    <button class="flex-center w-9 hover:bg-slate-100 h-full" @click="activeWeek = activeWeek + 1">
                        <ChevronRightIcon aria-hidden="true" class="h-5 w-5" />
                    </button>
                </div>
            </div>
        </template>
        <div
            v-if="planning.fetching || availableSession.fetching"
            class="absolute inset-0 bg-white/70 top-0 left-0 flex-center z-10"
        >
            <Spinner class="w-8" />
        </div>
        <div class="-m-4 border-t text-sm mt-4">
            <ul class="grid grid-cols-8 border-b divide-x h-12 items-center justify-center">
                <li
                    :class="[
                        'w-full h-full flex-center text-xxs text-white t-300',
                        reserved ? 'bg-primary' : 'bg-indigo-600',
                    ]"
                >
                    {{ reserved ? 'Reservation' : 'Disponibilité' }}
                </li>
                <li v-for="(day, idx) in listDays" :key="day" class="flex-center h-full">
                    {{ day }}
                    <span
                        :class="[
                            moment().format('DD') ===
                                moment().startOf('isoWeek').add(activeWeek, 'week').add(idx, 'days').format('DD') &&
                                `rounded-full text-white text-xs w-5 h-5 flex-center ${
                                    reserved ? 'bg-primary' : 'bg-indigo-600'
                                }`,

                            'ml-1',
                        ]"
                        >{{ getCurrentWeek(idx).format('DD') }}</span
                    >
                </li>
            </ul>
            <div class="grid grid-cols-8 grid-rows-12 divide-x divide-y bg-gradient-lines overflow-hidden rounded-xl">
                <template v-for="hour in hours" :key="hour">
                    <div class="h-14 w-full flex-center bg-white">{{ hour }}:00</div>
                    <AvailableDrivingItem
                        v-for="(item, index) in listDays"
                        :key="index"
                        :reserved-tab="reserved"
                        :disabled="getItem(index, hour).disabled"
                        :class="['h-14 flex-center p-1', getItem(index, hour).disabled && '!bg-slate-100']"
                        :item="getItem(index, hour).list"
                        :dispo-mutating="mutating"
                        :loading="form.bulkLoading?.[index + '-' + hour]"
                        :is-disponible="getDisponibility(index, hour)"
                        @add="handleAddSession(index, hour, $event)"
                    />
                </template>
            </div>
        </div>

        <AvailableDrivingModal
            v-if="selectedSession"
            :data="selectedSession"
            @refresh="planning.fetch()"
            @close="selectedSession = null"
        />
    </Box>
</template>
