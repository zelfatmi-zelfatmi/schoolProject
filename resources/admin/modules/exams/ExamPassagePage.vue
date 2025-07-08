<script setup>
import {
    ArchiveBoxArrowDownIcon,
    ChatBubbleBottomCenterIcon,
    PencilSquareIcon,
    PlusCircleIcon,
} from '@heroicons/vue/20/solid';
import { Page, Box, ConfirmationModal, Popover, IndexTable, Badge, RadioField } from '@shared/components';
import { dateFormat } from '@shared/helpers';
import { reactive } from 'vue';
import {
    EXAM_ARCHIVE,
    EXAM_RESULT_ADMIS,
    EXAM_RESULT_REFUS,
    EXAM_RSULTS,
    getBoite,
    getExamPeriod,
    headingsPassage,
} from './Exams';
import { router } from '@inertiajs/vue3';
import { routes } from '@admin/routes';
import { BadgeChange, ExamFilters, ExamsStatsDPP } from './partials';
import { Link } from '@inertiajs/vue3';

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

const handleArchived = () => {
    router.post(
        route(routes.exams.passage.update, state.selectedItem?.id),
        {
            status: EXAM_ARCHIVE,
            result_permis: state.selectedItem.result_permis,
        },
        {
            onSuccess: () => {
                state.selectedItem = null;
            },
        }
    );
};

const bulkActions = [
    {
        title: 'Edit',
        secondary: true,
        isLink: true,
        icon: PencilSquareIcon,
        onAction: ({ id }) => route(routes.exams.passage.update, id),
    },
    {
        title: "Archive l'examen",
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
    <Page title="Passage" width="full">
        <ExamsStatsDPP :stats="stats" />
        <Box sectionned :separated="false">
            <ExamFilters />
            <IndexTable v-slot="{ item }" :headings="headingsPassage" :bulk-actions="bulkActions" :items="exams">
                <td class="cell">
                    {{ dateFormat(item.date_examen, 'letter') }}
                </td>
                <td class="cell">
                    <div class="">
                        <p>
                            {{ dateFormat(item.date_passage, 'letter') }}
                        </p>
                        <b class="text-xs">{{ item.heure_passage }}</b>
                    </div>
                </td>
                <td class="cell">
                    {{ item.lieu?.name }}
                </td>
                <td class="cell">
                    {{ item.moniteur?.user?.name }}
                </td>

                <td class="cell">
                    {{ item.user?.name }}
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
                    {{ item.ssss }}
                </td>
                <BadgeChange :exam="3" :item="item" />

                <td class="cell text-center">
                    <Popover hoverable position="top">
                        <ChatBubbleBottomCenterIcon
                            :class="['w-5 h-5', item.comment ? 'text-green-600' : 'text-gray-600']"
                        />
                        <template #content>
                            <div class="p-2 w-96" v-html="item.comment"></div>
                        </template>
                    </Popover>
                </td>

                <td class="cell">
                    {{ getExamPeriod(item.date_pass_prevu) }}
                </td>

                <td class="cell">
                    <Badge
                        v-if="item.result_permis"
                        :error="item.result_permis === EXAM_RESULT_REFUS"
                        :success="item.result_permis === EXAM_RESULT_ADMIS"
                    >
                        {{ EXAM_RSULTS[item.result_permis].name }}
                    </Badge>
                </td>
            </IndexTable>
        </Box>
        <ConfirmationModal
            :show="!!state.selectedItem"
            title="Archive l'examen"
            empty-class="!text-blue-500"
            confirm-text="Oui, Archiver"
            info
            :icon="ArchiveBoxArrowDownIcon"
            :disabled="!state.selectedItem?.result_permis"
            @confirm="handleArchived"
            @close="state.selectedItem = null"
        >
            <p>
                vous avez selectionné l'eleve <b>{{ state.selectedItem?.eleve?.user?.name }}</b>
            </p>
            <div v-if="state.selectedItem" class="text max-w-xs mx-auto bg-slate-50 rounded-xl p-5 mt-4">
                <RadioField
                    v-model="state.selectedItem.result_permis"
                    :items="Object.values(EXAM_RSULTS)"
                    :keys="['name', 'id']"
                />
            </div>
        </ConfirmationModal>
    </Page>
</template>
