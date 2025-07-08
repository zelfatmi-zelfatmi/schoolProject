<template>
    <div class="isolate flex flex-auto flex-col overflow-auto bg-white">
        <div class="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full" :style="{ width: '165%' }">
            <div class="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-16">
                <div class="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden relative z-1">
                    <button v-for="day in days" :key="day" class="flex flex-col items-center pb-3 pt-2" type="button">
                        {{ day.slice(0, 1) }}
                    </button>
                </div>

                <ul
                    class="-mr-px hidden grid-cols-7 divide-x divide-gray-400/50 border-r border-gray-400/50 text-sm leading-6 text-gray-500 sm:grid relative z-1"
                >
                    <li class="col-end-1 w-16" />
                    <li v-for="(day, count) in days" :key="day" class="grid grid-cols-1 w-full text-center">
                        <span class="flex justify-center items-center py-3 text-gray-100">
                            <span>{{ day.slice(0, 3) }}</span>
                            <span
                                :class="[
                                    'ml-1.5 flex h-8 w-8 items-center justify-center text-white font-bold',
                                    moment().format('YYYY-MM-DD') === checkSessionDate(count)
                                        ? 'rounded-full bg-primary '
                                        : '',
                                ]"
                            >
                                {{ checkSessionDate(count, 'DD') }}
                            </span>
                        </span>
                        <ul
                            v-if="plannings.data[checkSessionDate(count)]"
                            :class="'grid-cols-' + Object.keys(getUniqueMoniteurs(checkSessionDate(count))).length"
                            class="grid h-full text-center p-0.5 gap-0.5"
                        >
                            <li
                                v-for="(moniteur, idx) in getUniqueMoniteurs(checkSessionDate(count))"
                                :key="idx"
                                class="px-0.5 py-1 flex justify-center items-center gap-1 bg-primary rounded shadow text-ellipsis"
                                :class="['md:order-' + ordersMoniteur[checkSessionDate(count)][moniteur?.user?.id]]"
                            >
                                <img
                                    :alt="moniteur?.user?.name"
                                    :src="moniteur?.user?.media || moniteur?.user?.profile_photo_url"
                                    class="w-6 h-6 rounded-full border"
                                />
                                <span class="text-xs font-bold text-white/80">
                                    {{ getInitials(moniteur?.user?.name, 3) }}
                                </span>
                            </li>
                        </ul>
                    </li>
                </ul>
                <BgAnimated appearance="modal" class="-z-1" />
            </div>
            <CalendarSection v-slot="{ count }" desktop>
                <PlanningSessionCard
                    v-for="(times, key) in getPlanningList(count)"
                    :key="key"
                    :class="['col-start-' + (count + 1)]"
                    :monitor-per-order="ordersMoniteur[checkSessionDate(count)]"
                    :times="times"
                    :count="count"
                    :index="key"
                />
            </CalendarSection>
        </div>
    </div>
</template>

<script setup>
import moment from 'moment-timezone';
import { ref } from 'vue';
import { getInitials } from '@shared/helpers';
import { checkSessionDate } from '../../PlanningMixin';
import { usePlannings } from '@admin/stores';
import { BgAnimated } from '@moniteur/components';
import { CalendarSection } from '@common/components';
import PlanningSessionCard from './PlanningSessionCard.vue';

defineProps({
    days: {
        type: Array,
        default: () => [],
    },
});

const plannings = usePlannings();
const ordersMoniteur = ref([]);

const getPlanningList = (count) => {
    
  var sessions=plannings.data[checkSessionDate(count)];
  console.log("list des heures est  ",sessions);
     return sessions
};

const getUniqueMoniteurs = (date) => {
    const uniqueMoniteurs = {};
    const planningsData = plannings.data[date];
    // Iterate through hours
    Object.keys(planningsData).forEach((hour) => {
        // Iterate through sessions
        Object.values(planningsData?.[hour]).forEach((session) => {
            const moniteurId = session?.moniteur?.user?.id;
            uniqueMoniteurs[moniteurId] = session?.moniteur;

            if (!ordersMoniteur.value?.[date]?.[moniteurId])
                ordersMoniteur.value[date] = {
                    ...ordersMoniteur.value[date],
                    [moniteurId]: ordersMoniteur.value[date] ? Object.keys(ordersMoniteur.value[date]).length + 1 : 1,
                };
        });
    });
    return Object.values(uniqueMoniteurs).reverse();
};
</script>
