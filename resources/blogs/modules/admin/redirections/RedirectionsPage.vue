<script setup>
import { TrashIcon, PencilSquareIcon, PlusIcon, MinusIcon } from '@heroicons/vue/20/solid';
import { Badge, Box, Button, IndexFilters, Table, Page } from '@shared/components';
import { routes } from '@blogs/routes';
import { ConfirmationModal } from '@shared/components';
import { computed, reactive, ref } from 'vue';
import { router } from '@inertiajs/vue3';
import { RedirectForm } from './partials';
import { headings } from './RedirectionsConst';

defineProps({
    redirections: {
        type: Object,
        default: () => ({}),
    },
});
const redirectForm = reactive({
    show: false,
    data: null,
});
const actions = computed(() => [
    {
        label: redirectForm.show ? 'Fermer formulaire' : 'Ajoute une redirection',
        // primary: !redirectForm.show,
        secondary: true,
        icon: redirectForm.show ? MinusIcon : PlusIcon,
        onClick: () => {
            redirectForm.data = null;
            redirectForm.show = !redirectForm.show;
        },
    },
]);
const confirmation = ref(null);
const deleting = ref(false);

const handleEdit = (item) => {
    redirectForm.show = false;
    setTimeout(() => {
        redirectForm.show = true;
        redirectForm.data = item;
    });
};
const handleConfirmation = (item) => {
    confirmation.value = item;
};
const handleConfirmedDelete = () => {
    deleting.value = true;
    router.delete(route(routes.admin.redirections.delete, confirmation.value?.id), {
        onFinish: () => {
            deleting.value = false;
        },
        onSuccess: () => {
            confirmation.value = null;
        },
    });
};
</script>

<template>
    <Page width="2xl" title="Redirections" :actions="actions">
        <RedirectForm
            v-if="redirectForm.show"
            :data="redirectForm.data"
            :is-edit="!!redirectForm.data"
            @close="redirectForm.show = false"
        />
        <Box sectionned>
            <div>
                <IndexFilters />
                <Table v-slot="{ item }" :items="redirections" :headings="headings" :is-loading="false">
                    <td class="cell">{{ item.old_url }}</td>
                    <td class="cell">{{ item.new_url }}</td>
                    <td class="cell">
                        <Badge class="mx-auto" info>
                            {{ item.status_code }}
                        </Badge>
                    </td>

                    <td class="cell-actions">
                        <div>
                            <Button
                                link
                                success
                                :icon="PencilSquareIcon"
                                title="Modifier"
                                class="hover:bg-slate-100"
                                @click="handleEdit(item)"
                            />
                            <Button
                                link
                                danger
                                :icon="TrashIcon"
                                title="Delete"
                                class="hover:bg-slate-100"
                                @click="handleConfirmation(item)"
                            />
                        </div>
                    </td>
                </Table>
            </div>
        </Box>
        <ConfirmationModal
            :show="!!confirmation"
            :loading="deleting"
            @close="confirmation = null"
            @confirm="handleConfirmedDelete"
        >
            Etes-vous sûr que vous voulez supprimer la redirection?
        </ConfirmationModal>
    </Page>
</template>
