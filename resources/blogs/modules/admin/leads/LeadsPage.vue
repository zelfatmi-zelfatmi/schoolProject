<script setup>
import { TrashIcon, EyeIcon } from '@heroicons/vue/20/solid';
import { dateFormat } from '@shared/helpers';
import { Badge, Box, Button, IndexFilters, Table, Page } from '@shared/components';
import { routes } from '@blogs/routes';
import { ConfirmationModal } from '@shared/components';
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';
import { ShowLeadModal } from './partials';
import { headings } from './LeadsConst';

defineProps({
    leads: {
        type: Object,
        default: () => ({}),
    },
});

const confirmation = ref(null);
const deleting = ref(false);
const selectedLead = ref(null);

const handleConfirmation = (category) => {
    confirmation.value = category;
};
const handleConfirmedDelete = () => {
    deleting.value = true;
    router.delete(route(routes.admin.leads.delete, confirmation.value?.id), {
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
    <Page width="2xl" title="Gestion des leads">
        <Box sectionned>
            <div>
                <IndexFilters />
                <Table v-slot="{ item }" :items="leads" :headings="headings" :is-loading="false">
                    <td class="cell">
                        <b class="block">{{ item.nom }} {{ item.prenom }}</b>
                        <a class="hover:text-blue-500 hover:underline" :href="`mailto:${item.email}`">{{
                            item.email
                        }}</a>
                    </td>
                    <td class="cell uppercase">{{ item.telephone }}</td>
                    <td class="cell">
                        <Badge class="mx-auto capitalize" :info="item.is_done" :secondary="!item.is_done">
                            {{ item.is_done ? 'Traiter' : 'Non Traiter' }}
                        </Badge>
                    </td>
                    <td class="cell uppercase">{{ dateFormat(item.created_at, 'fulltime') }}</td>

                    <td class="cell-actions">
                        <div>
                            <Button
                                link
                                dark
                                :icon="EyeIcon"
                                title="Avoir"
                                class="hover:bg-slate-100"
                                @click="selectedLead = item"
                            />
                            <!-- <Button
                                link
                                success
                                :href="route(routes.admin.popups.edit, item.id)"
                                :icon="PencilSquareIcon"
                                title="Modifier"
                                class="hover:bg-slate-100"
                            /> -->
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
        <ShowLeadModal :data="selectedLead" @close="selectedLead = null" />
        <ConfirmationModal
            :show="!!confirmation"
            :loading="deleting"
            @close="confirmation = null"
            @confirm="handleConfirmedDelete"
        >
            Etes-vous sûr que vous voulez supprimer categorie
            <b class="text-red-500">{{ confirmation?.name }}</b
            >?
        </ConfirmationModal>
    </Page>
</template>
