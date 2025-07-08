<script setup>
import { PropositionPlanningSection, PropositionDetailsEditModal } from './partials';
import { BgAnimated } from '@moniteur/components';
import { Weekdays } from '@common/components';
import { useParams } from '@shared/hooks';
import { reactive } from 'vue';
import moment from 'moment-timezone';
import { Box, Page } from '@shared/components';
defineProps({
    propositions: {
        type: Object,
        default: () => ({}),
    },
});
const params = useParams();
const state = reactive({
    week: Number(params.week || 0),
    day: moment().format('yyyy-MM-DD'),
    activeMonth: moment(params.date_1 || undefined),
    showModal: false,
    selectedProposition: null,
});
const getActiveMonth = () =>
    moment(params.date_1 || undefined)
        .add(state.week, 'week')
        .format('MMMM yyyy');

const getDay = (i) => moment().add(i, 'days').add(state.week, 'week').format('yyyy-MM-DD');

const handleActiveWeekChange = (value) => {
    state.week = value;
    params.update({ date_1: getDay(0), date_2: getDay(6), week: state.week });
};
</script>

<template>
    <Page width="xl" title="Liste des propositions" :subtitle="getActiveMonth()">
        <Box sectionned :separated="false" class="overflow-hidden mt-5">
            <div class="relative">
                <BgAnimated appearance="modal" class="-z-1" />
                <div :class="['flex relative z-1 drop-shadow ']">
                    <Weekdays
                        v-model="state.day"
                        class="flex-1 text-white md:gap-2"
                        class-arrows="md:!bg-white hover:!bg-primary"
                        v2
                        filter-by-week
                        :week="state.week"
                        @change:week="handleActiveWeekChange"
                    />
                    <!-- <button
                        class="btn-hover flex-center text-primary md:bg-primary md:text-white md:w-10 md:shadow rounded-xl"
                        @click="handleActiveWeekChange(1)"
                    >
                        <ChevronRightIcon class="w-7 h-7" />
                    </button> -->
                </div>
            </div>
            <PropositionPlanningSection
                :propositions="propositions"
                @proposition:edit="state.selectedProposition = $event"
            />
        </Box>
        <PropositionDetailsEditModal :item="state.selectedProposition" @close="state.selectedProposition = null" />
    </Page>
</template>
