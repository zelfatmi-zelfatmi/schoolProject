<script setup>
import { reactive } from 'vue';
import { ChatBubbleBottomCenterIcon, PencilSquareIcon, PlusCircleIcon } from '@heroicons/vue/20/solid';
import { Page, Box, Button, TextField, ConfirmationModal, Popover, IndexTable, Badge } from '@shared/components';
import { dateFormat } from '@shared/helpers';
import { EXAM_PRE_LIST, getSession, getBoite, headings, getExamPeriod } from './Exams';
import { AVAL_MONITEUR } from '@common/constants';
import { router } from '@inertiajs/vue3';
import { routes } from '@admin/routes';
import { Link } from '@inertiajs/vue3';
import { BadgeChange, ExamFilters, ExamsStatsDPP } from './partials';
import { examenStatusForfais } from '@admin/constants';

defineProps({
    exams: {
        type: Object,
        default: () => ({}),
    },
    stats: Array,
});

const state = reactive({
    selectedItem: null,
    comment_account: '',
    comment: '',
    loading: {
        comment_account: false,
        comment: false,
    },
});

const handleAddToPrelist = () => {
    router.post(
        route(routes.exams.waitingList.update, state.selectedItem?.id),
        {
            status: EXAM_PRE_LIST,
        },
        {
            onSuccess: () => {
                state.selectedItem = null;
            },
        }
    );
};

const handleSubmit = (item, isAccount, close) => {
    const payload = isAccount
        ? { comment_account: state.comment_account }
        : { comment: state.comment, date_comment: dateFormat(new Date(), 'fulliso') };
    state.loading[isAccount ? 'comment_account' : 'comment'] = true;
    router.post(route(routes.exams.waitingList.update, item.id), payload, {
        onFinish: () => {
            state.loading.comment_account = false;
            state.loading.comment = false;
            close();
        },
    });
};

const bulkActions = [
    {
        title: 'Edit',
        secondary: true,
        isLink: true,
        icon: PencilSquareIcon,
        onAction: ({ id }) => route(routes.exams.waitingList.update, id),
    },
    {
        title: 'Ajouter à la pré-liste',
        info: true,
        icon: PlusCircleIcon,
        onAction: (item, close) => {
            state.selectedItem = item;
            close();
        },
    },
];
</script>

<template>
    <Page title="Liste d'attente" width="full">
        <ExamsStatsDPP :stats="stats" />
        <Box sectionned :separated="false">
            <ExamFilters />
            <IndexTable v-slot="{ item }" :headings="headings" :bulk-actions="bulkActions" :items="exams">
                <td class="cell font-bold">
                    <span
                        v-if="getBoite(item)"
                        :class="[
                            'w-7 h-7 text-xs rounded-full flex-center border border-current',
                            getBoite(item).style,
                        ]"
                    >
                        {{ getBoite(item).shortName }}
                    </span>
                </td>
                <td class="cell">
                    <Link
                        :href="route(routes.users.eleve.general, item.eleve_id)"
                        class="w-28 truncate btn btn-link btn-info"
                    >
                        {{ item.eleve?.user?.name }}
                    </Link>
                </td>
                <td class="cell">
                    <Badge
                        v-if="item.type"
                        :color="examenStatusForfais[item.type]?.color"
                        :tooltip="examenStatusForfais[item.type]?.name"
                    >
                        {{ examenStatusForfais[item.type]?.short }}
                    </Badge>
                </td>
                <td class="cell">
                    <span>
                        {{ item.eleve?.date_code ? 'Code valide' : 'Conduite sans code' }}
                    </span>
                </td>

                <td class="cell">
                    <div v-if="getSession(item).date">
                        <p>{{ dateFormat(getSession(item).date, 'letter') }}</p>
                        <!-- <b class="text-xs">{{ getSession(item).start_at }} à {{ getSession(item).end_at }}</b> -->
                    </div>
                </td>
                <td class="cell">
                    {{ item.eleve?.review_moniteur?.estimation || '-' }}
                </td>
                <td class="cell text-center">
                    <Popover @popover-closed="state.comment_account = null">
                        <ChatBubbleBottomCenterIcon
                            :class="['w-5 h-5', item.comment_account ? 'text-green-600' : 'text-gray-600']"
                        />
                        <template #content="{ close }">
                            <div class="p-2 w-96">
                                <TextField
                                    :multiline="3"
                                    :model-value="item.comment_account"
                                    @update:model-value="state.comment_account = $event"
                                />
                            </div>
                            <div
                                class="bg-gray-100 flex justify-end items-center gap-5 -m-1.5 py-1.5 px-3 rounded-b-xl"
                            >
                                <Button link danger @click="close">Annuler</Button>
                                <Button
                                    info
                                    class="h-7"
                                    :disabled="!state.comment_account"
                                    :loading="state.loading.comment_account"
                                    @click="handleSubmit(item, true, close)"
                                >
                                    Enregister
                                </Button>
                            </div>
                        </template>
                    </Popover>
                </td>
                <td class="cell text-center">
                    <Popover @popover-closed="state.comment = null">
                        <ChatBubbleBottomCenterIcon
                            :class="['w-5 h-5', item.comment ? 'text-green-600' : 'text-gray-600']"
                        />
                        <template #content="{ close }">
                            <div class="p-2 w-96">
                                <TextField
                                    :multiline="3"
                                    :model-value="item.comment"
                                    @update:model-value="state.comment = $event"
                                />
                                <p v-if="item.date_comment" class="text-xs pb-2">
                                    Le dernier commentaire a été ajouté le
                                    {{ dateFormat(item.date_comment, 'fulltime') }}
                                </p>
                            </div>
                            <div
                                class="bg-gray-100 flex justify-end items-center gap-5 -m-1.5 py-1.5 px-3 rounded-b-xl"
                            >
                                <Button link danger @click="close">Annuler</Button>
                                <Button
                                    info
                                    class="h-7"
                                    :disabled="!state.comment"
                                    :loading="state.loading.comment"
                                    @click="handleSubmit(item, false, close)"
                                >
                                    Enregister
                                </Button>
                            </div>
                        </template>
                    </Popover>
                </td>

                <td class="cell">
                    {{ getExamPeriod(item.date_pass_prevu) }}
                </td>
                <td class="cell">
                    {{ item.eleve?.aval_moniteur ? AVAL_MONITEUR[1] : AVAL_MONITEUR[0] }}
                </td>
                <BadgeChange :exam="1" :item="item" />
                <td class="cell">
                    {{ item.user?.name }}
                </td>
            </IndexTable>
        </Box>
        <ConfirmationModal
            :show="!!state.selectedItem"
            title="Ajouter l'examen à la pré-liste"
            empty-class="!text-blue-500"
            confirm-text="Oui, Ajouter"
            info
            :icon="PlusCircleIcon"
            @confirm="handleAddToPrelist"
            @close="state.selectedItem = null"
        >
            <p>
                vous avez selectionné l'eleve <b>{{ state.selectedItem?.eleve?.user?.name }}</b>
            </p>
        </ConfirmationModal>
    </Page>
</template>
