<script setup>
import { ChatBubbleBottomCenterIcon, CheckBadgeIcon, PencilSquareIcon } from '@heroicons/vue/20/solid';
import {
    Page,
    Box,
    Button,
    TextField,
    Popover,
    IndexTable,
    Badge,
    Modal,
    Listbox2,
    Datepicker,
} from '@shared/components';
import { dateFormat } from '@shared/helpers';
import { reactive } from 'vue';
import { EXAM_PASSAGE, getSession, headings, getBoite, useExams, getExamPeriod } from './Exams';
import { AVAL_MONITEUR } from '@common/constants';
import { router, useForm } from '@inertiajs/vue3';
import { routes } from '@admin/routes';
import { Link } from '@inertiajs/vue3';
import { InlineActions, ZoneLieu } from '@common/components';
import { BadgeChange, ExamFilters, ExamsStatsDPP } from './partials';
import { examenStatusForfais } from '@admin/constants';

defineProps({
    exams: {
        type: Object,
        default: () => ({}),
    },
    stats: Array,
});
const { monitorsQuery, onFetchMoniteur } = useExams();

const state = reactive({
    selectedItem: null,
    comment_account: '',
    comment: '',
    loading: {
        comment_account: false,
        comment: false,
    },
});
const form = useForm({
    moniteur_id: null,
    lieu_id: null,
    date_examen: null,
    date_passage: null,
    heure_passage: null,
    status: EXAM_PASSAGE,
});

const handleCloseDeclareExam = () => {
    state.selectedItem = null;
    form.reset();
    form.moniteur_id = null;
    form.defaults();
};
const handleDeclareExam = () => {
    form.post(route(routes.exams.preList.declare, state.selectedItem?.id), {
        onSuccess: handleCloseDeclareExam,
    });
};
const handleSubmit = (item, isAccount, close) => {
    const payload = isAccount ? { comment_account: state.comment_account } : { comment: state.comment };
    state.loading[isAccount ? 'comment_account' : 'comment'] = true;
    router.post(route(routes.exams.preList.update, item.id), payload, {
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
        onAction: ({ id }) => route(routes.exams.preList.edit, id),
    },
    {
        title: "Declare L'examen",
        yellow: true,
        icon: CheckBadgeIcon,
        onAction: (item, close) => {
            state.selectedItem = item;
            onFetchMoniteur();
            form.defaults();
            close();
        },
    },
];
</script>

<template>
    <Page title="Pre Liste" width="full">
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
                    {{ item.eleve?.date_code ? 'Code valide' : 'Conduite sans code' }}
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
                <BadgeChange :exam="2" :item="item" />
                <td class="cell">
                    {{ item.user?.name }}
                </td>
            </IndexTable>
        </Box>
        <Modal
            :show="!!state.selectedItem"
            title="Declare L'examen"
            :scrollable="false"
            :subtitle="`vous avez selectionné l'eleve ${state.selectedItem?.eleve?.user?.name} `"
            max-width="sm"
            @close="handleCloseDeclareExam"
        >
            <div class="p-5 bg-white grid grid-cols-2 gap-5">
                <ZoneLieu v-model="form.lieu_id" :errors="form.errors" class="col-span-2 max-md:flex-col flex gap-5" />
                <Listbox2
                    v-model="form.moniteur_id"
                    :items="monitorsQuery.data"
                    :error="form.errors.moniteur_id"
                    placeholder="Selectionner moniteur"
                    label="Moniteur"
                    ssr
                    clear
                    :fetching="monitorsQuery.fetching"
                    :fetching-more="monitorsQuery.fetchingMore"
                    @search="onFetchMoniteur($event, true)"
                    @scroll:end="onFetchMoniteur($event, true, true)"
                />

                <Datepicker v-model="form.date_examen" :error="form.errors.date_examen" label="Date d'examen" />
                <Datepicker v-model="form.date_passage" :error="form.errors.date_passage" label="Date de passage" />
                <Datepicker
                    v-model="form.heure_passage"
                    :error="form.errors.heure_passage"
                    label="Heure de début"
                    time
                    min-time="07:00"
                    max-time="23:00"
                />
            </div>
            <InlineActions
                class="p-5"
                :actions="[
                    {
                        label: 'Oui, Declare L\'examen',
                        primary: true,
                        submit: true,
                        icon: CheckBadgeIcon,
                        disabled: form.processing || !form.isDirty,
                        loading: form.processing,
                        onAction: handleDeclareExam,
                    },
                    {
                        label: 'Rejeter',
                        secondary: true,
                        disabled: form.processing,
                        onAction: handleCloseDeclareExam,
                    },
                ]"
            />
        </Modal>
    </Page>
</template>
