<template>
    <Page :actions="actions" title="Plannings des sessions" subtitle="Gestion des plannings" width="full">
        <Box class="overflow-hidden relative" sectionned>
            <div class="lg:flex lg:h-full lg:flex-col">
                <div v-if="plannings.processing" class="absolute z-900 inset-0 bg-white/70 flex-center">
                    <Spinner class="w-6" />
                </div>
                <HeaderCalendar />
                <PlanningFilters :monitors="monitors" :students="eleves" />

                <EmptyState
                    v-if="!session.selectedMonitors?.length"
                    :image="CalendarDaysIcon"
                    class="py-10 min-h-[70vh] flex flex-col justify-center gap-2"
                    heading="Veuillez sélectionner au moins un moniteur"
                >
                    <p class="text-center text-gray-700 max-w-md mx-auto text-xs">
                        Parcourez notre sélection de moniteurs et choisissez celui qui correspond le mieux à vos besoins
                    </p>
                </EmptyState>
                <MonthCalender v-else-if="session.view === 'month'" :key="plannings.hardRefresh" :days="listDays" />
                <WeekCalender v-else :key="'week-' + plannings.hardRefresh" :days="listDays" />
            </div>
        </Box>
        <SessionMonitorModal />
        <SessionMonitorEditModal :key="!session.show" :monitors="monitors" :students="eleves" />
        <ConfirmationModal
            :loading="sessionQuery.mutating.value"
            :show="!!session.delete"
            confirm-text="Oui, supprimer cette entrée"
            @close="handleDeleteModalClose"
            @confirm="handleConfirmedDelete"
        >
            <p class="5">
                Etes-vous sûr que vous voulez supprimer le session de <br />
                <b class="text-red-500">{{ session.selectedSession?.moniteur?.user?.name }}</b> le
                <b class="text-red-500">{{
                    session.selectedSession ? dateFormat(session.selectedSession.date) : ''
                }}</b>
                à
                <b class="text-red-500">{{ session.selectedSession?.start_at?.slice(0, 5) }}</b>
                ?
            </p>
        </ConfirmationModal>
        <ConfirmationModal
            :loading="dispoQuery.mutating.value"
            :show="!!session.updateToDispo"
            confirm-text="Oui, Annuler cette session"
            @close="session.updateToDispo = false"
            @confirm="handleConfirmedUpdateToDispo"
        >
            <div class="p-5">
                Etes-vous sûr que vous voulez annuler le session de <br />
                <b class="text-orange-500">{{ session.selectedSession?.moniteur?.user?.name }}</b> le
                <b class="text-orange-500">{{
                    session.selectedSession ? dateFormat(session.selectedSession.date) : ''
                }}</b>
                à
                <b class="text-orange-500">{{ session.selectedSession?.start_at?.slice(0, 5) }}</b>
                ?
            </div>
        </ConfirmationModal>
    </Page>
</template>
<script setup>
import { Box, ConfirmationModal, EmptyState, Page, Spinner } from '@shared/components';
import { usePlanningSession, usePlannings } from '@admin/stores';
import { routes } from '@admin/routes';
import { useMutation } from '@shared/hooks';
import { dateFormat } from '@shared/helpers';
import { CalendarDaysIcon } from '@heroicons/vue/20/solid';
import { usePage } from '@inertiajs/vue3';
import { onMounted,watch,nextTick  } from 'vue';
import moment from 'moment';

import {
    MonthCalender,
    WeekCalender,
    HeaderCalendar,
    PlanningFilters,
    SessionMonitorModal,
    SessionMonitorEditModal,
} from './partials';
var props=defineProps({
    monitors: {
        type: Array,
        default: () => [],
    },
    eleves: {
        type: Object,
        default: () => ({}),
    },
});
const page = usePage();


const listDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const session = usePlanningSession();
const plannings = usePlannings();
const sessionQuery = useMutation();
const dispoQuery = useMutation();
const actions = [
    {
        label: 'Ajouter un évènement',
        primary: true,
        icon: null,
        onClick: () => {
            session.selectedSession = null;
            session.show = true;
        },
    },
];

const handleDeleteModalClose = () => {
    session.delete = false;
};
const handleConfirmedDelete = () => {
    sessionQuery
        .mutate(route(routes.api.plannings.destroy, session.selectedSession?.id), 'delete')
        .then(() => {
            session.delete = false;
            session.selectedSession = null;
            plannings.getPlannings();
        })
        .finally(() => {});
};
const handleConfirmedUpdateToDispo = () => {
    console.log("hello ",session.selectedSession?.id)
    dispoQuery
        .mutate(route(routes.api.plannings.annulation, session.selectedSession?.id), 'put')
        .then(() => {
            session.updateToDispo = false;
            session.selectedSession = null;
            plannings.getPlannings();
        })
        .finally(() => {});
};
onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('session_id');

  if (!sessionId) return;

  try {
    const { data } = await axios.get(route(routes.plannings.main.show, sessionId));

    // 1️⃣ Adapter la structure
    const adapted = {
      ...data.planning,
      moniteur: data.planning.moniteur,
      session: {
        ...data,
        eleve: data.eleve,
        message_administrateur: data.message_administrateur,
        is_read_moniteur: data.is_read_moniteur,
      },
    };

    // 2️⃣ Affecter le moniteur pour forcer chargement planning
    if (data.planning?.moniteur) {
      session.selectedMonitors = [{ moniteur: data.planning.moniteur }];
    }

    // 3️⃣ Définir la semaine autour de la date de la session
    const sessionDate = moment(data.planning.date, 'YYYY-MM-DD');
    session.start = sessionDate.clone().startOf('isoWeek');
    session.end = sessionDate.clone().endOf('isoWeek');

    // 4️⃣ Charger les plannings de la semaine
    await plannings.getPlannings();

    // 5️⃣ Sélectionner la session
    session.selectedSession = adapted;
    session.show = false;
        // router.replace(route(routes.plannings.main.list));

  } catch (e) {
    console.error("❌ Erreur de chargement de la session :", e);
  }
});

</script>
