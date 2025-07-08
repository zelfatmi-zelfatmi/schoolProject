<template>
    <div class="grid relative">
        <PerfectScrollbar class="align-middle max-w-full" :class="minHeight">
            <table class="table min-w-full table-fixed divide-y divide-gray-500/10">
                <!-- :class="minHeight && items?.data?.length ? 'border-b !border-[#e5e7eb]' : ''" -->
                <thead>
                    <tr :class="[isBlack ? '' : 'bg-gray-200']">
                        <th colspan="0" :class="[' h-full   z-1 !max-w-0']" />
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
                                'min-w-[4rem] py-1 px-3 text-left text-xxs tracking-tight font-semibold ',
                                head.className,
                            ]"
                        >
                            {{ head.name }}
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-400/20">
                    <template v-if="loading || state.loading || items.fetching">
                        <tr
                            v-for="index in 10"
                            :key="index"
                            :class="['bg-gray-50 animate-pulse min-h-[5rem] group/actions']"
                        >
                            <td></td>
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
                                    'hover:bg-gray-300/10 group/actions relative cursor-pointer t-2',
                                    selectedItem.includes(item.id) ? 'bg-gray-100' : '',
                                    actions && state.selectedItem?.id === item.id ? '!bg-primary/15 ' : '',
                                ]"
                                @click="handleLineClick(item)"
                            >
                                <td
                                    colspan="0"
                                    :class="[
                                        'left-0 inset-y-1 w-1 rounded-r-full absolute',
                                        actions && state.selectedItem?.id === item.id && 'bg-primary',
                                    ]"
                                ></td>
                                <slot :item="item" :index="idx" />
                            </tr>
                        </slot>
                        <slot name="addItem"></slot>
                    </template>

                    <tr v-else>
                        <td :colspan="headings.length + (isSelect ? 2 : 1)" class="text-center py-16">
                            <slot name="empty">
                                <EmptyState
                                    :heading="emptyText || 'Aucune donnée n\'a été trouvée.'"
                                    :image="MagnifyingGlassIcon"
                                />
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
            <Paginate
                :links="items?.meta?.links || items?.links || []"
                :is-api="isApi"
                @click:prev="handlePagination"
                @click:page="handlePagination"
                @click:next="handlePagination"
            />
        </div>
        <div v-if="actions?.bulk || actions?.promoted" class="flex-center h-0">
            <ConfirmationModal
                :loading="state.deleting"
                :danger="state.confirm?.danger || true"
                :icon="state.confirm?.icon || null"
                :show="!!state.confirm"
                @close="state.confirm = null"
                @confirm="handleConfirmedDelete"
            >
                {{ state.confirm?.message || 'Etes-vous sûr que vous voulez supprimer cette entrée' }}
            </ConfirmationModal>
            <div class="table-actions enter-up">
                <div v-if="actions.bulk?.length" class="flex gap-2 w-full">
                    <Button
                        v-for="(action, idx) in typeof actions.bulk === 'function'
                            ? actions.bulk(actions.selected)
                            : actions.bulk"
                        :key="idx"
                        type="button"
                        v-bind="action"
                        :class="[action.class, '!px-6 flex-1 justify-center text-nowrap']"
                        @click="handleBulkAction(action)"
                    >
                        {{ action.label || action.title }}
                    </Button>
                </div>
                <div v-if="actions.promoted?.length" class="flex gap-2">
                    <Popover position="top-end">
                        <EllipsisHorizontalIcon class="!p-1 btn btn-secondary text-gray-500" />
                        <template #content="{ close: onClose }">
                            <div class="flex flex-col divide-y -m-1.5">
                                <div
                                    v-for="(action, idx) in typeof actions.promoted === 'function'
                                        ? actions.promoted(actions.selected)
                                        : actions.promoted"
                                    :key="idx"
                                >
                                    <Button
                                        type="button"
                                        link
                                        v-bind="action"
                                        :class="[action.class, '!px-6 flex-1 py-2 justify-center text-nowrap']"
                                        @click="handleBulkAction(action), onClose()"
                                    >
                                        {{ action.label || action.title }}
                                    </Button>
                                </div>
                            </div>
                        </template>
                    </Popover>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, onUnmounted } from 'vue';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import { EllipsisHorizontalIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid';
import { Paginate, EmptyState, Button, ConfirmationModal, Popover } from '@shared/components';
// import { useMutation } from '@shared/hooks';
import { router } from '@inertiajs/vue3';
import { useEvents, useMutation } from '@shared/hooks';

const emit = defineEmits(['refresh', 'click:row']);
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
    minHeight: String,
    loading: Boolean,
    emptyText: String,
    isApi: Boolean,
    bulkActions: [Array, Function],
    promotedBulkActions: [Array, Function],
});

const events = useEvents();
const selectedItem = ref([]);
const state = reactive({
    selectedItem: null,
    confirm: null,
    deleting: false,
    loading: false,
});
const deleteMutation = useMutation();
const indeterminate = computed(
    () => selectedItem.value.length > 0 && selectedItem.value.length < props.items.data.length
);
const actions = computed(() => {
    const isFunc = typeof props.bulkActions === 'function';
    const b = isFunc ? props.bulkActions(state.selectedItem || {}) : props.bulkActions;
    const isEmpty = !state.selectedItem || (!b && !props.promotedBulkActions);
    if (isEmpty) return null;

    return {
        bulk: props.bulkActions,
        promoted: props.promotedBulkActions,
        selected: state.selectedItem,
    };
});
// const { mutate, mutating } = useMutation();
const close = () => {
    state.selectedItem = null;
};
const handlePagination = (url) => {
    props.items.fetch?.(url);
};
const handleLineClick = (item) => {
    if (item.actionDisabled) return;
    state.selectedItem = item.id === state.selectedItem?.id ? null : item;
    if (!actions.value?.bulk?.length) {
        emit('click:row', item);
    }
};
const handleConfirmedDelete = () => {
    state.deleting = true;
    if (props.isApi) {
        return deleteMutation
            .mutate(route(state.confirm.url, state.selectedItem?.id), 'delete')
            .then((res) => {
                state.confirm = null;
                state.selectedItem = null;
                emit('refresh', res);
                props.items.fetch?.();
            })
            .finally(() => {
                state.deleting = false;
            });
    }

    const options = {
        onSuccess: () => {
            state.confirm = null;
            state.selectedItem = null;
        },
        onFinish: () => {
            state.deleting = false;
        },
    };
    if (state.confirm?.payload) {
        return router.put(route(state.confirm.url, state.selectedItem?.id), state.confirm.payload, options);
    }
    router.delete(route(state.confirm.url, state.selectedItem?.id), options);
};

const handleBulkAction = (action) => {
    if (action.confirm) {
        state.confirm = action.confirm;
        return;
    }
    if (action.isLink) {
        return router.get(action.onAction(state.selectedItem));
    }
    action.onAction?.(state.selectedItem, close);
};
onMounted(() => {
    events.on(events.keys.table.loading, ({ value }) => {
        state.loading = value;
    });
    events.on(events.keys.table.clear, () => {
        state.selectedItem = null;
    });
});
onUnmounted(() => {
    events.off(events.keys.table.clear);
});
</script>
<style lang="scss">
.table-actions {
    @apply fixed bottom-14 min-w-80 z-50 bg-black p-3 shadow-xl rounded-2xl border flex gap-2 h-fit;
    transform: translateX(calc(-50% + 7.5rem));
}
</style>
