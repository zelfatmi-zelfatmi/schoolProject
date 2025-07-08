<script setup>
import { ref, reactive } from 'vue';
import { routes } from '@admin/routes';
import { Link } from '@inertiajs/vue3';
import {
    ActionsList,
    Box,
    ConfirmationModal,
    DateRangepicker,
    Drawer,
    IndexFilters,
    Listbox,
    Page,
    StatusBadge,
    Table,
} from '@shared/components';
import { PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/vue/20/solid';
import { dateFormat } from '@shared/helpers';
import { CPFStatus } from '@common/constants';
import { CPFUpdateForm, CPFStoreForm } from './partials';
import { useParams } from '@shared/hooks';

defineProps({
    cpfs: {
        type: Object,
        default: () => ({}),
    },
});
const params = useParams();
const deleting = ref(false);
const state = reactive({
    delete: null,
    showDrawer: false,
    edit: null,
});
const actions = [
    {
        label: 'Nouveau Cpf',
        primary: true,
        icon: PlusIcon,
        onClick: () => {
            state.showDrawer = true;
        },
    },
];
const getActions = (item) => [
    {
        title: 'Modifier',
        icon: PencilSquareIcon,
        onClick: () => {
            state.edit = item;
        },
    },
    {
        divider: true,
    },
    {
        title: 'Supprimer définitivement',
        icon: TrashIcon,
        danger: true,
        link: true,
        onClick: () => {
            state.delete = item;
        },
    },
];
const headings = [
    { name: 'Nom Prénom Eleve' },
    { name: 'Forfait' },
    { name: 'Date Début formation' },
    { name: 'Date Fin formation' },
    { name: 'Statut' },
    { name: 'Vérifiction' },
    { name: 'Commentaire' },
    { name: 'Action', className: 'text-center pr-4 sticky right-0 bg-gray-80 border-l' },
];
const onDrawerClose = () => {
    state.showDrawer = false;
    state.edit = null;
};
const handleChangeStatus = (value) => {
    params.update({ status: value });
};
</script>

<template>
    <Page :actions="actions" title="CPFs" width="xl">
        <Box sectionned>
            <div>
                <IndexFilters>
                    <Listbox
                        :default-value="CPFStatus[params.status || '']"
                        :items="Object.values(CPFStatus)"
                        placeholder="Selectionner statut"
                        prefix="Statut"
                        input-class="!rounded-full bg-white shadow-none border !h-9 tracking-tighter"
                        class="w-full max-w-64"
                        :show-search="false"
                        ssr
                        clear
                        :keys="['name', 'id']"
                        @change="handleChangeStatus"
                    />
                    <DateRangepicker class="w-full max-w-64" placeholder="Date Vérifiction" />
                </IndexFilters>
                <Table v-slot="{ item }" :headings="headings" :is-loading="false" :items="cpfs">
                    <td class="cell">
                        <Link :href="route(routes.users.eleve.general, item.eleve_id)" class="btn btn-link btn-info">
                            {{ item.eleve?.user?.name }}
                        </Link>
                    </td>

                    <td class="cell">
                        <Link :href="route(routes.shop.products.edit, item.product_id)" class="btn btn-link btn-dark">
                            {{ item.product?.name }}
                        </Link>
                    </td>
                    <td class="cell">
                        <span> {{ dateFormat(item.start_at, 'letter') }} </span>
                    </td>
                    <td class="cell">
                        <span> {{ dateFormat(item.end_at, 'letter') }} </span>
                    </td>

                    <td class="cell">
                        <StatusBadge :id="item.status" class="text-[12px] tracking-tight" :items="CPFStatus" />
                    </td>
                    <td class="cell">
                        <span v-if="item.date_verif"> {{ dateFormat(item.date_verif, 'letter') }} </span>
                    </td>
                    <td class="cell">
                        <div class="line-clamp-2 max-w-60 text-wrap text-xs" v-html="item.comment"></div>
                    </td>
                    <td class="sticky right-0 bg-white w-10 mx-auto border-l">
                        <div class="flex justify-center items-center gap-2 h-full">
                            <ActionsList :actions="getActions(item)" />
                        </div>
                    </td>
                </Table>
            </div>
        </Box>
        <Drawer :show="state.showDrawer || !!state.edit" @close="onDrawerClose">
            <CPFUpdateForm
                v-if="state.edit"
                :key="state.showDrawer || !!state.edit"
                :data="state.edit"
                @close="state.edit = null"
            />
            <CPFStoreForm
                v-show="!state.edit"
                :key="state.showDrawer || !!state.edit"
                @close="state.showDrawer = false"
            />
        </Drawer>
        <ConfirmationModal
            :loading="deleting"
            :href="route(routes.cpf.destroy, state.delete?.id || '-')"
            :show="!!state.delete"
            @close="state.delete = null"
        >
            Etes-vous sûr que vous voulez supprimer ce CPF ?
        </ConfirmationModal>
    </Page>
</template>
