<script setup>
import { useForm } from '@inertiajs/vue3';
import { Box, Button, Checkbox, TextField } from '@shared/components';
import { onBeforeMount, ref,onMounted } from 'vue';
import { loadStripe } from '@stripe/stripe-js';
import { StripeElement, StripeElements } from 'vue-stripe-js';
import { routes } from '@front/routes';
import { useToast, useCart } from '@shared/stores';
import { moneyFormat } from '@shared/helpers';
import { nextTick } from 'vue';

const emit = defineEmits(['dismiss']);


const props = defineProps({
    showError: Boolean,
    selectedOrder: {
        type: Object,
        default: () => ({}),
    }
    // isEleveEspace: Boolean,
});
console.log('CartDrawer Props:', props.selectedOrder);

const tempKey =
    'pk_test_51La9ZrGAcbo4EI2kFXKVxyWslylb00Pb27zKtLrXafcb3c1F8UBLXyCYnzM6eVzOR1fSMuXRfDhnS2sx8wbkqnFQ00eivuVEs2';
const cart = useCart();
const stripeKey = ref(import.meta.env.VITE_STRIP_PUBLISHABLE || tempKey); // test key

const stripeLoaded = ref(false);
const card = ref();
const elms = ref();
const isDisabled = ref(false);
const loading = ref(false);
const toast = useToast();
const stripe = ref(null);
const linkStore = `${import.meta.env.VITE_APP_URL}/api/eleve/order`;
const cardInfo = ref({
    brand: '',
    errors: {
        isError: false,
        message: '',
    },
});
onBeforeMount(() => {
    const stripePromise = loadStripe(stripeKey.value);
    stripePromise.then(() => {
        stripeLoaded.value = true;
    });
});

const form = useForm({
    email: '',
    name: '',
    cardCode: '',
    cardExpirationDate: '',
    CVC: '',
    NameOnCard: '',
    Country: '',
    ZIP: '',
});
function handleCardChange(e) {
    isDisabled.value = !e.complete;
    if (e.error) {
        cardInfo.value.errors.isError = true;
        if (e.error.code.includes('number')) {
            cardInfo.value.errors.message = "Votre numéro de carte n'est pas valide";
        }
        if (e.error.code.includes('year')) {
            cardInfo.value.errors.message = 'La date de votre carte est expirée';
        }
    } else {
        cardInfo.value.errors.isError = false;
    }
}
onBeforeMount(async () => {
    stripe.value = await loadStripe(stripeKey.value);

    if (!stripe.value) {
        console.error("❌ Erreur : Impossible de charger Stripe !");
    } else {
        console.log("✅ Stripe chargé avec succès :", stripe.value);
    }
});
onMounted(() => {
    if (localStorage.getItem('paymentSuccess')) {
        toast.notify({ type: 'success', title: 'Paiement confirmé avec succès !' });
        localStorage.removeItem('paymentSuccess'); // Supprimer après affichage
    }
});

const pay = async () => {
    if (!cart.isLogged) {
        cart.state.authModal = true;
        return;
    }

    console.log("hello pay");
    loading.value = true;
    isDisabled.value = true;

    try {
        const cardElement = card.value.stripeElement;
        const result = await elms.value.instance.createToken(cardElement);

        if (result.error) {
            toast.notify({ type: 'error', title: result.error.message });
            return;
        }

        const response = await axios.post(linkStore, {
            token: result.token.id,
            amount: props.selectedOrder ? props.selectedOrder.amount : cart.prices.total,
            solde: props.selectedOrder ? props.selectedOrder.solde : cart.prices.solde,
            is_completed: !!props.selectedOrder,
            order_id: props.selectedOrder ? props.selectedOrder.id : null,
            is_active_two: cart.state.isSpliteActive
        });

        const data = response.data;

        if (data.success) {
            if (data.requiresAction) {
                const result3DS = await stripe.value.confirmCardPayment(data.clientSecret);

                if (result3DS.error) {
                    toast.notify({ type: 'error', title: result3DS.error.message });
                    return;
                }

                if (result3DS.paymentIntent?.id) {
                    localStorage.setItem('paymentSuccess', 'true');
                    window.location.href = `/payment-return?payment_intent=${result3DS.paymentIntent.id}`;
                    return;
                } else {
                    window.location.href = "/payment-return";
                    return;
                }
            }

            cart.state.order = data.order;
            // cart.removeAll();
            // await cart.getAll(); // ← forcer un rechargement des données API
            // await nextTick();
            emit('dismiss');
        }
    } catch (error) {
        console.error("Erreur axios:", error);
        const message = error?.response?.data?.message || 'Une erreur est survenue';
        toast.notify({ type: 'error', title: message });
    } finally {
        loading.value = false;
        isDisabled.value = false;
    }
};

</script>

<template>
    <Box class="gap-2 flex-1 flex flex-col rounded-3xl px-5 py-3">
        <h1 class="text-xl font-semibold">Informations de paiement</h1>
        <TextField
            id="title"
            v-model="form.name"
            label="Nom du titulaire de la carte"
            placeholder="Jhon doe"
            :error="form.errors.email"
        />
        <div>
            <label
                class="block font-medium text-xs mb-0.5 mt-1"
                :class="[cardInfo.errors.isError ? 'text-red-600' : 'text-gray-600']"
                >Information de la carte</label
            >
            <StripeElements v-slot="{ elements }" ref="elms" :stripe-key="stripeKey">
                <div class="block bg-white rounded-md shadow-sm text-gray-700 text-sm font-bold mb-2">
                    <StripeElement
                        ref="card"
                        type="card"
                        :elements="elements"
                        class="p-2 border rounded"
                        @change="handleCardChange"
                    />
                </div>
            </StripeElements>
        </div>
        <span v-if="cardInfo.errors.isError" class="text-red-600 text-xs">{{ cardInfo.errors.message }} </span>
        <section class="flex flex-col gap-3 pt-2">
    <div class="flex justify-between">
        <span class="text-lg font-semibold">Sous-total</span>
        <span class="text-lg font-semibold">
            {{ moneyFormat(selectedOrder ? selectedOrder.amount_paid : cart.prices.subTotal) }}
        </span>
    </div>
    <span class="font-light text-md">
        {{ selectedOrder ? 1 : cart.count }} Produits
    </span>
    <hr />
    <div class="flex justify-between">
        <span class="text-xl font-bold">Total :</span>
        <span class="text-2xl font-bold">
            {{ moneyFormat(selectedOrder ? selectedOrder.remaining_amount : cart.prices.total) }}
        </span>
    </div>
    <hr />
    <Button
        class="bg-orange-100 rounded-xl px-5 py-3 !h-fit font-bold btn-hover text-lg"
        :disabled="isDisabled || showError"
        :loading="loading"
        full
        type="button"
        @click="pay"
    >
        <slot name="btn">
            {{ moneyFormat(selectedOrder ? selectedOrder.remaining_amount : cart.prices.total) }} Payer
        </slot>
    </Button>
    <div v-if="cart.getSplitedProduct() && !selectedOrder">
        <Checkbox
            id="is-splite-active2"
            v-model:checked="cart.state.isSpliteActive"
            :label="`Activer le paiement en plusieurs fois`"
        />
    </div>
</section>

    </Box>
</template>
