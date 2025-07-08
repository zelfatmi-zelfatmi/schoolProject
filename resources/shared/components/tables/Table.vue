<template>
    <div class="grid">
        <PerfectScrollbar :options="{ suppressScrollY: true }" class="align-middle" :class="minHeight">
            <div
                v-if="isSelect && selectedItem.length > 0"
                class="absolute left-10 top-0.5 flex h-9 items-center space-x-3 bg-gray-50 px-3 sm:left-12"
            >
                <button
                    v-for="(action, index) in actions"
                    :key="index"
                    type="button"
                    class="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                    @click="action.onClick(selectedItem)"
                >
                    {{ action.label }}
                </button>

                <span class="absolute h-9 w-10 top-0 -right-10 bg-gradient-to-r from-gray-50 to-transparent"></span>
            </div>
            <table class="table min-w-full table-fixed divide-y divide-gray-500/10">
                <thead>
                    <tr :class="[isBlack ? '' : 'bg-gray-50']">
                        <th v-if="isSelect" scope="col" class="relative px-7 sm:w-12 sm:px-6 h-10">
                            <input
                                type="checkbox"
                                class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                :checked="indeterminate || selectedItem.length === items.data.length"
                                :indeterminate="indeterminate"
                                @change="selectedItem = $event.target.checked ? items.data.map(({ id }) => id) : []"
                            />
                        </th>
                        <th
                            v-for="(head, index) in headings"
                            :key="index"
                            v-bind="head"
                            :class="[
                                'min-w-[4rem] py-2 px-3 text-left text-xs tracking-tight font-semibold ',
                                head.className,
                            ]"
                        >
                            {{ head.name }}
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-400/20">
                    <template v-if="isLoading">
                        <tr
                            v-for="index in 10"
                            :key="index"
                            :class="['bg-gray-50 animate-pulse min-h-[5rem] group/actions']"
                        >
                            <td v-if="isSelect" class="relative px-4">
                                <div class="h-4 w-4 bg-gray-400 rounded"></div>
                            </td>
                            <td v-for="(_, idx) in headings" :key="idx" class="h-12 px-3">
                                <div class="h-4 bg-gray-400 rounded"></div>
                            </td>
                        </tr>
                    </template>
                    <template v-else-if="items?.data?.length">
                        <slot name="items" :items="items.data">
                            <tr
                                v-for="(item, idx) in items.data"
                                :key="item.id || idx"
                                :class="[
                                    'hover:bg-gray-300/10 group/actions',
                                    selectedItem.includes(item.id) ? 'bg-gray-100' : '',
                                ]"
                                @click="handleLineClick(item)"
                            >
                                <td v-if="isSelect" class="relative px-7 sm:w-12 sm:px-6">
                                    <div
                                        v-if="selectedItem.includes(item.id)"
                                        class="absolute inset-y-0 left-0 w-0.5 bg-indigo-600"
                                    />
                                    <input
                                        v-model="selectedItem"
                                        type="checkbox"
                                        class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        :value="item.id"
                                    />
                                </td>
                                <slot :item="item" />
                            </tr>
                        </slot>
                    </template>

                    <tr v-else>
                        <td :colspan="headings.length + (isSelect ? 1 : 0)" class="text-center py-16">
                            <slot name="empty">
                                <EmptyState heading="Aucune donnée n'a été trouvée." :image="MagnifyingGlassIcon" />
                            </slot>
                        </td>
                    </tr>
                </tbody>
            </table>
        </PerfectScrollbar>
        <div
            v-if="(paginate && items?.total) || (paginate && items?.meta?.total)"
            class="py-4 px-2 flex-1 flex w-full border-t"
        >
            <Paginate :links="items?.meta?.links || items?.links || []" :is-api="isApi"
            @click:page="(pageUrl) => {
      // Empêcher toute navigation et charger les données de la page
      console.log('Changement de page:', pageUrl);
      handlePageChange(pageUrl);
  }"

            />
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid';
import { Paginate, EmptyState } from '../common';
const props = defineProps({
    headings: {
        type: Array,
        default: () => [],
    },
    items: {
        type: Object,
        default: () => ({ data: [] }),
    },

    isSelect: {
        type: Boolean,
        default: false,
    },
    isBlack: Boolean,
    paginate: {
        type: Boolean,
        default: true,
    },
    minHeight: {
        type: String,
    },
    isLoading: Boolean,
    isApi: Boolean,
    actions: {
        type: Array,
        default: () => [
            {
                onClick: () => {},
                label: 'modification groupée',
            },
            {
                onClick: () => {},
                label: 'suppression groupée',
            },
        ],
    },
});
const emit = defineEmits(['click:line','click:page']);
const selectedItem = ref([]);
const indeterminate = computed(
    () => selectedItem.value.length > 0 && selectedItem.value.length < props.items.data.length
);
const handleLineClick = (item) => {
    emit('click:line', item);
};
const handlePageClick = (page, event) => {
  console.log("Changement de page :", page);
  // Votre logique de pagination ici
  changePage(page, event);
};

</script>
