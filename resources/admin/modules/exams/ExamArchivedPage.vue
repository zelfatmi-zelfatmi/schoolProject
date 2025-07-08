<script setup>
import { ChatBubbleBottomCenterIcon, PencilSquareIcon } from '@heroicons/vue/20/solid';
import { Page, Box, Popover, IndexTable, Badge, Modal, Listbox2 } from '@shared/components';
import { dateFormat } from '@shared/helpers';
import { reactive } from 'vue';
import { examStatus, headingsArchivee } from './Exams';
import { useForm } from '@inertiajs/vue3';
import { routes } from '@admin/routes';
import { InlineActions } from '@common/components';
import { ExamFilters } from './partials';

defineProps({
    exams: {
        type: Object,
        default: () => ({}),
    },
});
const form = useForm({
    status: null,
});
const state = reactive({
    selectedItem: null,
});

const handleCloseStatusExam = () => {
    state.selectedItem = null;
    form.status = null;
    form.defaults();
};
const handleStatusExam = () => {
    form.post(route(routes.exams.archived.update, state.selectedItem?.id), {
        onSuccess: handleCloseStatusExam,
    });
};
const bulkActions = [
    {
        title: 'Modifier status',
        danger: true,
        icon: PencilSquareIcon,
        onAction: (item, close) => {
            state.selectedItem = item;
            form.status = item.status;
            form.defaults();
            close();
        },
    },
];
</script>
<template>
    <!-- Archive examen
    headingsArchivee -->
    <Page title="Archive examen" width="full">
        <Box sectionned :separated="false">
            <ExamFilters />
            <IndexTable v-slot="{ item }" :headings="headingsArchivee" :bulk-actions="bulkActions" :items="exams">
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
                    <!-- {{ item.moniteur?.user?.name }} -->
                </td>

                <td class="cell">
                    {{ item.moniteur?.user?.name }}
                </td>
                <td class="cell">
                    {{ item.eleve?.user?.name }}
                </td>

                <td class="cell">
                    <Badge :error="!item.sssss" :success="item.sssss">
                        {{ item.sssss ? 'Oui' : 'Non' }}
                    </Badge>
                </td>
                <td class="cell">
                    <Badge :error="!item.sssss" :success="item.sssss">
                        {{ item.sssss ? 'Oui' : 'Non' }}
                    </Badge>
                </td>
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
            </IndexTable>
        </Box>
        <Modal
            :show="!!state.selectedItem"
            title="Status L'examen"
            :subtitle="`vous avez selectionné l'eleve ${state.selectedItem?.eleve?.user?.name} `"
            max-width="sm"
            @close="state.selectedItem = null"
        >
            <div class="p-5 bg-white gap-5">
                <Listbox2
                    v-model="form.status"
                    :error="form.errors.status"
                    :items="Object.values(examStatus)"
                    prefix="Marque comme"
                    :default-value="examStatus[form.status] || ''"
                    :show-search="false"
                    input-class="!rounded-lg bg-white shadow-none border !h-9 line-clamp-1 text-nowrap "
                    label="Statut"
                    placeholder="Choisir une statut"
                />
            </div>
            <InlineActions
                class="p-5"
                :actions="[
                    {
                        label: 'Oui, Modifier',
                        primary: true,
                        submit: true,
                        icon: PencilSquareIcon,
                        disabled: form.processing || !form.isDirty,
                        loading: form.processing,
                        onAction: handleStatusExam,
                    },
                    {
                        label: 'Rejeter',
                        secondary: true,
                        disabled: form.processing,
                        onAction: handleCloseStatusExam,
                    },
                ]"
            />
        </Modal>
    </Page>
</template>
