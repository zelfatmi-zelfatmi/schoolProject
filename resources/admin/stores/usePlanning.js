import { watch, reactive, ref } from 'vue';
import { defineStore } from 'pinia';
// import { useParams } from '@shared/hooks';
import moment from 'moment-timezone';
import { routes } from '@admin/routes';
import { getDefaultPlanningsDate } from '@admin/modules/planning/PlanningMixin';
import axios from 'axios';

export const usePlanningSession = defineStore('plannings/session', () => {
    const defaultState = getDefaultPlanningsDate();
    const session = reactive({
        start: defaultState.start,
        end: defaultState.end,
        disp: defaultState.disp, // disponibilite
        lieu_id: defaultState.lieu_id,
        zone_id: defaultState.zone_id,
        view: 'week',
        currentMonth: moment(),
        selectedMonitors: [],
        selectedEleve: [],
        selectedSession: null,
        show: false,
        create: false,
        updateToDispo: false,
        delete: false,
        // deleting: false,
    });

    return session;
});
export const usePlannings = defineStore('plannings', () => {
    const session = usePlanningSession();
    const plannings = ref([]);
    const processing = ref(false);
    const hardRefresh = ref(performance.now());
    const controller = ref(null);
    const getPlannings = () => {
        if (!session.selectedMonitors?.length) {
            return false;
        }
        // Cancel previous request if it exists
        if (controller.value) {
            controller.value.abort();
        }

        processing.value = true;

        controller.value = new AbortController();

        const params = {
            start: session.start.format('YYYY-MM-DD'),
            end: session.end.format('YYYY-MM-DD'),
            moniteur_id: session.selectedMonitors?.map((item) => item.moniteur?.id) || [],
            eleve_id: session.selectedEleve?.map((item) => item.eleve?.id) || [],
            lieu_id: session.lieu_id || null,
            zone_id: session?.zone_id || null,
            view: session.view,
            disp: session.disp,
        };
        axios
            .get(route(routes.api.plannings.list), { params, signal: controller.value.signal })
            .then((res) => {
                plannings.value = res.data.plannings;
                hardRefresh.value = performance.now();
            })
            .finally(() => {
                processing.value = false;
            });
    };

    watch(() => session.view, getPlannings);
    return { data: plannings, hardRefresh, getPlannings, processing };
});
