import {defineAsyncComponent} from "vue";

export const HeaderCalendar = defineAsyncComponent(() => import('./HeaderCalendar.vue'))
export const MonthCalender = defineAsyncComponent(() => import('./month/MonthCalender.vue'))
export const WeekCalender = defineAsyncComponent(() => import('./week/WeekCalender.vue'))

export const PlanningFilters = defineAsyncComponent(() => import('./PlanningFilters.vue'))
// export const StatusCalenderBadge = defineAsyncComponent(() => import('./StatusCalenderBadge.vue'))

export const SessionMonitorModal = defineAsyncComponent(() => import('./modals/SessionMonitorModal.vue'))
export const SessionMonitorEditModal = defineAsyncComponent(() => import('./modals/SessionMonitorEditModal.vue'))
export const ShowMoreSessionsModal = defineAsyncComponent(() => import('./modals/ShowMoreSessionsModal.vue'))