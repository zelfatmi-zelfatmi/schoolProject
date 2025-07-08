<script setup>
import { ref } from 'vue';
import { routes } from '@front/routes';
import { useCart } from '@shared/stores';
import { Button, Checkbox } from '@shared/components';
import { moneyFormat } from '@shared/helpers';
import { useToast } from '@shared/stores';

const cart = useCart();
const toast = useToast();

const loading = ref(false);
const props = defineProps({
    showError: Boolean,
    selectedOrder: {
        type: Object,
        default: () => ({}),
    }
    // isEleveEspace: Boolean,
});
const formatUrl = (href) => {
    if (!href.startsWith('http')) {
        return new URL(href, import.meta.env.VITE_APP_URL).href;
    }
    return href;
};
const linkPaypal=formatUrl("api/paypal/transaction/process");
// Reactivity for input fields
const pay = () => {
    console.log("pay clicked")
    if (cart.isLogged) {
        loading.value = true;
        axios
            .get(linkPaypal, {
                params: {
                    amount: props.selectedOrder
                        ? parseFloat(props.selectedOrder.amount)
                        : parseFloat(cart.prices.total),
                    solde: props.selectedOrder
                        ? parseFloat(props.selectedOrder.solde)
                        : parseFloat(cart.prices.solde),
                    is_completed: !!props.selectedOrder, // Convert to boolean
                    order_id: props.selectedOrder ? props.selectedOrder.id : null,
                    is_active_two: !!cart.state.isSpliteActive, // Convert to boolean
                },
            })
            .then((response) => {
                if (typeof window !== "undefined" && window.location) {
                  window.location.href = response.data.approval_link;
               } else {
        console.warn("⚠️ Redirection ignorée : window.location n'est pas disponible en SSR.");
                }
            })
            .catch((error) => {
                const message = error?.response?.data?.message || 'Une erreur est survenue';
    
    toast.notify({ type: 'error', title: message });
                // console.error(error);
            })
            .finally(() => {
                loading.value = false;
            });
    } else {
        cart.state.authModal = true;
    }
};
</script>

<template>
    <div class="flex flex-col">
        <div class="w-full flex items-center justify-center">
            <img :src="`/assets/images/permis/onlinePay.png`" alt="pay image" class="w-36" />
        </div>
        <h1 class="text-xl font-semibold p-8 text-center">Se connecter en utilisant votre compte Paypal</h1>
        <div class="flex flex-col gap-2 h-max justify-end">
            <div class="flex justify-between">
                <span class="text-lg font-semibold">Sous-total </span>
                <span class="text-lg font-semibold">   {{ moneyFormat(selectedOrder ? selectedOrder.amount_paid : cart.prices.subTotal) }}</span>
            </div>
            <span class="font-light text-md">   {{ selectedOrder ? 1 : cart.count }} Produits</span>
            <hr />
            <div class="flex justify-between">
                <span class="text-xl font-bold">Total : </span>
                <span class="text-2xl font-bold">   {{ moneyFormat(selectedOrder ? selectedOrder.remaining_amount : cart.prices.total) }}</span>
            </div>
            <Button
                class="bg-orange-100 rounded-xl px-5 py-3 !h-fit font-bold btn-hover text-lg"
                :disabled="showError"
                :loading="loading"
                full
                type="button"
                @click="pay"
            >
                <slot name="btn">   {{ moneyFormat(selectedOrder ? selectedOrder.remaining_amount : cart.prices.total) }}Payer</slot>
            </Button>
            <div v-if="cart.getSplitedProduct()">
                <!-- <Checkbox
                    id="is-splite-active"
                    v-model:checked="cart.state.isSpliteActive"
                    :label="`Activer le paiement en plusieur fois`"
                /> -->
            </div>
        </div>
    </div>
</template>
