<script setup>
import { ActionsList, Box, ConfirmationModal, IndexFiltersProduct, Page, StatusBadge, Table } from '@shared/components';
import {
    ArchiveBoxArrowDownIcon,
    ArrowUturnLeftIcon,
    PencilSquareIcon,
    PlusIcon,
    TrashIcon,
} from '@heroicons/vue/20/solid';
import { routes } from '@admin/routes';
import { ref, reactive } from 'vue';
import { router } from '@inertiajs/vue3';
import { useParams } from '@shared/hooks/index.js';
import { isAutoEnum, ProductOffreTypeEnum, ProductTypeEnum } from '@admin/modules/shop/products/ProductConsts.js';
import { moneyFormat, getMediaUrl } from '@shared/helpers';
import { ItemAvatar } from '@common/components';

defineProps({
    products: {
        type: Object,
        default: () => ({}),
    },
});
const params = useParams();
const confirmation = ref(null);
const deleting = ref(false);
const state = reactive({
    confirmation: null,
    typeAction: null,
});
const actions = [
    {
        label: 'Nouveau Produit',
        primary: true,
        icon: PlusIcon,
        href: route(routes.shop.products.create),
    },
];
const getActions = (item) => {
    const actions = [];
    if (item.status) {
        actions.push(
            {
                title: 'Modifier',
                icon: PencilSquareIcon,
                href: route(routes.shop.products.edit, item.id || '-'),
            },
            {
                divider: true,
            },
            {
                title: 'Archiver',
                icon: ArchiveBoxArrowDownIcon,
                link: true,
                onClick: () => handleConfirmation(item),
            }
        );
    } else {
        actions.push(
            {
                title: 'Restaurer',
                icon: ArrowUturnLeftIcon,
                dark: true,
                link: true,
                onClick: () => handleConfirmation(item),
            },
            {
                title: 'Supprimer définitivement',
                icon: TrashIcon,
                danger: true,
                link: true,
                onClick: () => handleConfirmation(item, true),
            }
        );
    }

    return actions;
};
const headings = [
    { name: 'Produit' },
    { name: 'Prix', className: 'text-center' },
    { name: 'Réduction', className: 'text-center' },
    { name: 'Solde', className: 'text-center ' },
    { name: 'Type', className: 'text-center' },
    { name: 'Offre', className: 'text-center' },
    { name: 'Forfait', className: 'text-center' },
    { name: 'Multi-paiement', className: 'text-center' },
    { name: 'Produit Test', className: 'text-center' },
    { name: 'Action', className: 'text-center pr-4 sticky right-0 bg-gray-80 border-l' },
];


const handleConfirmation = (article, isDelete = false) => {
    confirmation.value = article;
    state.typeAction = article.status ? 'archiver' : isDelete ? 'supprimer' : 'restaurer';
    state.iconAction = article.status ? ArchiveBoxArrowDownIcon : isDelete ? TrashIcon : ArrowUturnLeftIcon;
};
const handleConfirmedDelete = () => {
    deleting.value = true;
    if (state.typeAction === 'supprimer') {
        router.delete(route(routes.shop.products.delete, confirmation.value?.id), {
            onSuccess: () => {
                confirmation.value = null;
            },
            onFinish: () => {
                deleting.value = false;
            },
        });
    } else {
        router.put(
            route(routes.shop.products.updateStatus, confirmation.value?.id),
            {
                status: confirmation.value?.status ? 0 : 1,
            },
            {
                onSuccess: () => {
                    confirmation.value = null;
                },
                onFinish: () => {
                    deleting.value = false;
                },
            }
        );
    }
};
const tabs=[
        { name: 'Tous', id: '1', key: 'status' },
        { name: 'Produit Boutique', id: '1', key: 'is_shop' },
        { name: 'CPF', id: '1', key: 'is_cpf' },
        { name: 'Produit pannier', id: '1', key: 'is_product_cart' },
        { name: 'Produit Test', id: '1', key: 'is_product_test' },
    ]
const activeTabKey = ref(
    Object.keys(params).find((key) => tabs.some((tab) => tab.key === key)) || 'status'
);
</script>

<template>
    <Page :actions="actions" title="Produits" width="2xl">
        <Box sectionned>
            <div>
                <IndexFiltersProduct
    :default-tab="1"
    :key-tab="activeTabKey"
    :tabs="tabs"
/>

                <Table v-slot="{ item }" :headings="headings" :is-loading="false" :items="products"  >
                    <td class="cell">
                        <ItemAvatar
                            :src="getMediaUrl(item, true)"
                            :href="route(routes.shop.products.edit, item.id)"
                            :title="item.name"
                            :content="item.description"
                            is-mobile
                        />
                    </td>

                    <td class="cell text-center *:block">
                        <small v-if="Number(item.promo)" class="line-through opacity-70">
                            {{ moneyFormat(item.prix) }}
                        </small>
                        <b class="text-primary">
                            {{ moneyFormat(item.prix - item.promo) }}
                        </b>
                    </td>
                    <td class="cell text-center">
                        <b> {{ moneyFormat(item.promo) }} </b>
                    </td>
                    <td class="cell text-center">
                        <b> {{ item.solde }} H </b>
                    </td>
                    <td class="cell">
                        <b class="flex-center gap-2">
                            <StatusBadge :id="item.type" :attr="ProductTypeEnum" />
                        </b>
                    </td>

                    <td class="cell text-center">
                        <StatusBadge :id="item.type_offre" :attr="ProductOffreTypeEnum" is-short />
                    </td>

                    <td class="cell">
                        <b class="flex-center gap-2">
                            <StatusBadge :id="item.is_auto" :attr="isAutoEnum" />
                        </b>
                    </td>
                    <td class="cell text-center">
                        <b>
                            {{ item.multi_payment }}
                        </b>
                    </td>
                    <td class="cell text-center">
    <b>
        {{ item.is_product_test ? 'Oui' : 'Non' }}
    </b>
</td>

                    <td class="sticky right-0 bg-white w-10 mx-auto border-l">
                        <div class="flex justify-center items-center gap-2 h-full">
                            <ActionsList :actions="getActions(item)" />
                        </div>
                    </td>
                </Table>
            </div>
        </Box>
        <ConfirmationModal
            :loading="deleting"
            :show="!!confirmation"
            :icon="state.iconAction"
            :confirm-text="`Oui, ${state.typeAction}`"
            @close="confirmation = null"
            @confirm="handleConfirmedDelete"
        >
            Etes-vous sûr que vous voulez
            <b class="text-red-500">{{ state.typeAction }}</b>
            le
            <b class="text-red-500">{{ confirmation?.name }}</b>
            ?
        </ConfirmationModal>
    </Page>
</template>
