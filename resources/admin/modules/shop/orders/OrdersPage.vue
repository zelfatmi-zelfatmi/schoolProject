<script setup>
import { ArrowDownTrayIcon, EyeIcon, ReceiptRefundIcon, XMarkIcon } from '@heroicons/vue/20/solid';
import { dateFormat, moneyFormat } from '@shared/helpers';
import { routes } from '@admin/routes';
import { getTotalSold } from '@admin/constants';
import { EleveBoiteEnum } from '@shared/constants'; 
import { useStatusSwitch } from '@shared/hooks';

import {
    PAYMENT_PAID,
    PAYMENT_PARTIAL_REFUND,
    paymentStatus,
    PAYMENT_TYPE_STRIP,
    PAYMENT_PARTIALLY_PAID,
    paymentType,
} from '@common/constants';
import { useParams } from '@shared/hooks';
import { reactive } from 'vue';
import { isAutoEnum } from '@admin/modules/shop/products/ProductConsts.js';

import { ProductDetails, RefundToolkit } from './partials';
import { Box, Button, IndexFilters, Table, DateRangepicker, StatusBadge, Page } from '@shared/components';
import { ItemAvatar } from '@common/components';
import { UserStatusEnum } from '@shared/constants';
import InvoiceDownload from '@/eleve/modules/orders/partials/InvoiceDownload.vue';
import {

    PlusIcon,

} from '@heroicons/vue/20/solid';
var props=defineProps({
    orders: {
        type: Object,
        default: () => ({}),
    },
    
});
console.log("orders is ",props.orders)
console.log("hello orders is ",props.orders)
const actions = [
    {
        label: 'Nouvelle Commande',
        primary: true,
        icon: PlusIcon,
        href: route(routes.shop.orders.create),
    },
];
const params = useParams();
const state = reactive({
    method: params.method || '',
    tabs: [
        {
            id: '',
            name: 'Tous',
            key:'status'
        },
        ...Object.values(paymentStatus),
    ],
});

const headings = [
    { name: 'Date création', className: 'text-center px-3 font-normal py-2' },
    { name: 'Éleve', className: 'text-start px-3 font-normal' },
    { name: 'Boite', className: 'text-start px-3 font-normal' },
    { name: 'Produit', className: 'text-center px-3 font-normal' },
    { name: 'Total', className: 'text-center px-3 font-normal' },
    { name: 'État', className: 'text-center px-3 font-normal' },
    { name: 'Method de paiment', className: 'text-center px-3 font-normal' },
    { name: 'Action', className: 'text-center pr-3 sticky right-0 bg-[#f9fafb] border-l-[1px] border-[#e2e8f0]' },
];

const onFilterByPayment = (value) => {
    state.method = value;
    params.update({ method: value });
};

const checkRefundPossibility = (idStatus, idPaymentMethod) => {
    return !(
        (idStatus !== PAYMENT_PAID && idStatus !== PAYMENT_PARTIAL_REFUND && idStatus !== PAYMENT_PARTIALLY_PAID) ||
        idPaymentMethod !== PAYMENT_TYPE_STRIP
    );
};
</script>

<template>
    <Page title="Commandes" subtitle="Voir les commandes" width="xl" :actions="actions">
        <Box sectionned>
            <div>
                <IndexFilters :options="{ showSlot: true }" key-tab="status" :tabs="state.tabs">
                    <div class="flex gap-5 pr-3">
                        <DateRangepicker class="flex-1 max-w-full" placeholder="Date d'ordre" title="Filtre par date" />
                        <Box as="ul" class="self-end flex relative">
                            <li
                                v-if="state.method"
                                class="w-12 absolute h-1 rounded-t-full -bottom-3 bg-primary t-5 enter-up"
                                :style="{
                                    left: `${(state.method - 1) * 20}%`,
                                }"
                            />
                            <li
                                v-for="payment in paymentType"
                                :key="payment.id"
                                :tooltip="payment.name"
                                class="w-12 flex-center"
                            >
                                <img
                                    :src="payment.icon"
                                    alt="par paypal"
                                    class="h-8 btn-m"
                                    @click="onFilterByPayment(payment.id)"
                                />
                            </li>
                            <li tooltip="Effacer filtre avec method paeiment" class="h-8 w-12 flex-center">
                                <XMarkIcon
                                    class="btn-m rounded-full text-primary flex-center h-8 w-8 p-1 border border-primary"
                                    @click="onFilterByPayment('')"
                                />
                            </li>
                        </Box>
                    </div>
                </IndexFilters>

                <Table
                    v-slot="{ item }"
                    :headings="headings"
                    :is-loading="false"
                    :items="orders"
                    min-height="min-h-[28rem]"
                >
                    <td class="cell capitalize">
                        <b class="font-normal text-center flex flex-col py-1">
                            <span>
                                {{ dateFormat(item.created_at, 'fr') }}
                            </span>
                            <span class="font-semibold">
                                {{ dateFormat(item.created_at, 'shortTime') }}
                            </span>
                        </b>
                    </td>
                    <td class="cell">
                        <ItemAvatar
                            class="min-w-[180px]"
                            :content="item?.eleve?.user?.email"
                            :phone="item?.eleve?.user?.telephone"
                            :title="item.eleve?.user?.name"
                            :src="item.eleve?.user?.media || item.eleve?.user?.profile_photo_url"
                            :href="
                                item.status === UserStatusEnum.INACTIVE.id
                                    ? ''
                                    : route(routes.users.eleve.general, item.eleve.id)
                            "
                        />
                    </td>
                    <td class="cell">
        
                        <StatusBadge
                      :id="item.cart?.cart_items[0]?.product?.is_auto"
                      :attr="isAutoEnum"
                        />

                    </td>
                    <td class="cell text-center">
                        <ProductDetails :details="item.cart?.cart_items" />
                    </td>
                    <td class="cell text-center">
                        {{ moneyFormat(item.amount) }}
                    </td>
                    <td class="cell capitalize text-gray-600">
  <div class="flex flex-col items-center gap-1">
    <!-- ✅ Badge de statut -->
    <StatusBadge :value="paymentStatus[item.payment_status]" />

    <!-- ✅ Produits remboursés (inclus depuis le backend) -->
    <div
      v-if="String(item.payment_status) === String(PAYMENT_PARTIAL_REFUND) && Array.isArray(item.produits_rembourses)"
      class="text-xs text-left w-full px-2 mt-1 space-y-1"
    >
      <div
        v-for="produit in item.produits_rembourses"
        :key="produit.id"
        class="flex justify-between text-green-700 bg-green-50 px-2 py-1 rounded"
      >
        <span class="truncate max-w-[150px]">
          {{ produit.name || 'Produit inconnu' }}
        </span>
        <span>
          {{ moneyFormat(produit.montant) }}
        </span>
      </div>
    </div>
  </div>
</td>
                    <td class="cell capitalize">
                        <img :src="paymentType[item.payment_method].icon" class="h-7 mx-auto" />
                    </td>

                    <td class="sticky right-0 bg-white w-10 mx-auto border-l">
                        <div class="flex items-center gap-2 px-2 justify-center">
                            <RefundToolkit
                                :is-disabled="!checkRefundPossibility(item?.payment_status, item.payment_method)"
                                :order-id="item.id"
                                :status="paymentStatus[item.payment_status]"
                                :sold-eleve="item?.eleve?.solde"
                                :sold-order="getTotalSold(item.cart?.cart_items)"
                                :items="item.cart?.cart_items || []"
                                :produits-rembourses="item.produits_rembourses || []"

                                >
                                <div
                                    :class="
                                        checkRefundPossibility(item?.payment_status, item.payment_method)
                                            ? 'text-red-600 !bg-red-200 cursor-pointer'
                                            : 'text-gray-400 bg-gray-300/80'
                                    "
                                    class="w-7 h-7 flex-center rounded-full"
                                >
                                    <ReceiptRefundIcon
                                        :title="
                                            checkRefundPossibility(item?.payment_status, item.payment_method)
                                                ? 'Action non disponible'
                                                : ''
                                        "
                                        class="w-5"
                                    />
                                </div>
                            </RefundToolkit>
                            <!-- Utiliser le composant InvoiceDownload -->
                            <InvoiceDownload :order="item"  :isIcon="true"  :isDisabled="item.payment_history && item.payment_history.length > 0"  />
                            <Button
                                :href="route(routes.shop.orders.show, item.id)"
                                :icon="EyeIcon"
                                primary
                                link
                                title="Voir l'ordre"
                            />
                        </div>
                    </td>
                </Table>
            </div>
        </Box>
    </Page>
</template>

