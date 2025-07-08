<script setup>
import { Box, Table } from '@shared/components/index.js';
import { ItemAvatar } from '@common/components';
import { truncateText } from '@admin/constants/index.js';
import { routes } from '@admin/routes';
import { Link } from '@inertiajs/vue3';
import { ref } from 'vue';
import { ReceiptRefundIcon } from '@heroicons/vue/20/solid/index.js';
import { PAYMENT_PAID, PAYMENT_TYPE_STRIP } from '@common/constants';
import { useToast } from '@shared/stores';

const props = defineProps({
    items: {
        type: Object,
        default: () => ({}),
    },
    isOrder: {
        type: Boolean,
    },
    paymentInfo: {
        type: Object,
        method: String,
        status: String,
    },
    orderId: String,
});
const inProgress = ref(false);
const toast = useToast();

const headings = [
    { name: 'Produit', colspan: '2' },
    { name: 'Prix', className: 'text-center font-normal px-3' },
    { name: 'Qtn', className: 'text-center font-normal px-3' },
    { name: 'Heures', className: 'text-center font-normal px-3' },
    { name: 'Tranches', className: 'text-center font-normal px-3' },
    { name: 'Total Payé', className: 'text-center font-normal px-3' },
    {
        name: props.isOrder && props.paymentInfo?.method === PAYMENT_TYPE_STRIP ? 'Action' : null,
        className:
            props.isOrder && props.paymentInfo?.method === PAYMENT_TYPE_STRIP
                ? 'text-center pr-4 sticky right-0 bg-slate-100'
                : null,
    },
];
const submit = async (id) => {
    inProgress.value = true;
    const data = {
        product_id: id,
    };
    await axios
        .post(route(routes.shop.orders.refund, props.orderId), data)
        .then(() => {
            toast.notify({ type: 'success', title: 'Refunded' });
        })
        .catch(() => {
            toast.notify({ type: 'error', title: 'an error happend' });
        });
    inProgress.value = false;
};
const checkRefundPossibility = () => {
    return !(props.paymentInfo.status !== PAYMENT_PAID || props.paymentInfo.method !== PAYMENT_TYPE_STRIP);
};
</script>

<template>
    <Box sectionned padding subtitle="" title="Produits">
        <div class="-m-4 mt-0 border-t">
            <Table v-slot="{ item }" :headings="headings" :is-loading="false" :items="items" :paginate="false">
                <td class="cell" colspan="2">
                    <Link
                        :href="route(routes.shop.products.edit, item.product_id)"
                        class="font-semibold hover:text-blue-700 hover:underline"
                    >
                        <ItemAvatar
                            :content="truncateText(item.product?.description)"
                            :src="item.product?.media?.storage_media.path"
                            :title="item.product?.name"
                        />
                    </Link>
                </td>
                <td class="cell text-center">{{ item.product.prix }} €</td>

                <td class="cell capitalize text-center">
                    {{ item.quantity }}
                </td>
                <td class="cell capitalize text-center">{{ item.product.solde }} H</td>
                <td class="cell capitalize">
                    <span class="flex-center self-center w-8 h-8 rounded-full bg-orange-200 ml-4">
                        {{ item.tranches }}
                    </span>
                </td>
                <td class="cell capitalize text-center">{{ item.product.prix * item.quantity }} €</td>
                <td v-if="isOrder" class="cell-actions">
                    <div @click="checkRefundPossibility() ? submit(item.product.id) : null">
                        <span
                            class="w-7 h-7 flex-center rounded-full"
                            :class="
                                checkRefundPossibility()
                                    ? 'text-red-600 !bg-red-200 cursor-pointer'
                                    : 'text-gray-400 bg-gray-300/80'
                            "
                        >
                            <ReceiptRefundIcon
                                :title="checkRefundPossibility() ? 'Action non disponible' : ''"
                                class="w-5"
                            />
                        </span>
                    </div>
                </td>
            </Table>
        </div>
    </Box>
</template>
