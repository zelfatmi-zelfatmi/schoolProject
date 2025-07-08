<template>
    <header class="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
        <h1 class="text-base font-semibold leading-6 text-gray-900 capitalize">
            <time>{{ session.currentMonth.format('MMMM YYYY') }}</time>
        </h1>
        <div class="flex items-center">
            <div class="relative flex items-center rounded-full bg-white shadow-sm md:items-stretch">
                <button
                    class="flex h-9 w-12 items-center justify-center rounded-l-full border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
                    type="button"
                    @click="prevDate()"
                >
                    <ChevronLeftIcon aria-hidden="true" class="h-5 w-5" />
                </button>
                <button
                    class="hidden border-y border-gray-300 px-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
                    type="button"
                    @click="currentDay()"
                >
                    {{ session.view === 'month' ? 'Mois courante' : 'Aujourd’hui' }}
                </button>
                <span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
                <button
                    class="flex h-9 w-12 items-center justify-center rounded-r-full border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
                    type="button"
                    @click="nextDate()"
                >
                    <ChevronRightIcon aria-hidden="true" class="h-5 w-5" />
                </button>
            </div>
            <div class="hidden md:ml-4 md:flex md:items-center">
                <Menu as="div" class="relative">
                    <MenuButton
                        class="flex items-center gap-x-1.5 rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        type="button"
                    >
                        <span v-if="session.view === 'month'"> Le mois aperçu </span>
                        <span v-else> Semaine aperçu </span>
                        <ChevronDownIcon aria-hidden="true" class="-mr-1 h-5 w-5 text-gray-400" />
                    </MenuButton>

                    <transition
                        enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95"
                        enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95"
                    >
                        <MenuItems
                            class="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-slate-400 focus:outline-none"
                        >
                            <div class="py-1">
                                <MenuItem>
                                    <a
                                        :class="[
                                            session.view === 'week' ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm',
                                        ]"
                                        href="#"
                                        @click="eventView('week')"
                                    >
                                        Semaine aperçu
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a
                                        :class="[
                                            session.view === 'month' ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm',
                                        ]"
                                        href="#"
                                        @click="eventView('month')"
                                    >
                                        Mois aperçu
                                    </a>
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </transition>
                </Menu>
            </div>
        </div>
    </header>
</template>
<script setup>
import moment from 'moment-timezone';

import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { useParams } from '@shared/hooks';
import { usePlanningSession, usePlannings } from '@admin/stores';

const session = usePlanningSession();
const plannings = usePlannings();
const params = useParams();

const currentDay = () => {
    if (session.view === 'month') {
        session.start = moment().subtract(1, 'months').endOf('month').startOf('isoWeek');
        session.end = moment().add(1, 'months').startOf('month').endOf('isoWeek');
    } else if (session.view === 'week') {
        session.start = moment().startOf('week').startOf('isoWeek');
        session.end = moment().endOf('week').endOf('isoWeek');
    }
    session.currentMonth = moment();
};
const nextDate = () => {
    if (session.view === 'month') {
        const start = session.end.format('YYYY-MM-DD');
        session.start = moment(start).startOf('month').startOf('isoWeeks');
        session.end = moment(start).add(1, 'months').startOf('month').endOf('isoWeeks');
        session.currentMonth = moment(session.currentMonth).add(1, 'months');
    } else if (session.view === 'week') {
        session.start = moment(session.start).add(1, 'week').startOf('isoWeek');
        session.end = moment(session.end).add(1, 'week').endOf('isoWeek');
        session.currentMonth = moment(session.currentMonth).add(1, 'week').startOf('isoWeek');
    }
    plannings.getPlannings();
};

const prevDate = () => {
    if (session.view === 'month') {
        const start = session.end.format('YYYY-MM-DD');
        session.start = moment(start).subtract(3, 'months').endOf('month').startOf('isoWeek');
        session.end = moment(start).subtract(1, 'months').startOf('month').endOf('isoWeek');
        session.currentMonth = moment(session.currentMonth).subtract(1, 'months');
    } else if (session.view === 'week') {
        session.start = moment(session.start).subtract(1, 'week').startOf('isoWeek');
        session.end = moment(session.end).subtract(1, 'week').endOf('isoWeek');
        session.currentMonth = moment(session.currentMonth).subtract(1, 'week').startOf('isoWeek');
    }
    plannings.getPlannings();
};

const eventView = (value = null) => {
    value ? (session.view = value) : null;

    if (params?.start && params?.end) {
        session.start = moment(params?.start);
        session.end = moment(params?.end);
        session.currentMonth = moment(params?.start);
    } else if (session.view === 'month') {
        session.start = moment().subtract(1, 'months').endOf('month').startOf('isoWeek');
        session.end = moment().add(1, 'months').startOf('month').endOf('isoWeek');
    } else if (session.view === 'week') {
        session.start = moment().startOf('week').startOf('isoWeek');
        session.end = moment().endOf('week').endOf('isoWeek');
    }
    session.currentMonth = moment();
};
</script>
