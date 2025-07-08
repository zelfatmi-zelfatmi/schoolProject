<template>
    <main class="flex flex-col px-6 py-3 max-w-screen-lg mx-auto">
        <div class="flex w-full justify-between items-center">
            <span class="text-xl font-bold sm:text-3xl">Mon panier</span>
            <a :href="tarifLink" class="flex justify-center items-center cursor-pointer">
                < :src="`/assets/icons/arrow-left.svg`" alt="" class="w-14 h-14" />
                <span class="hover:text-primary">Retour vers tarifs</span>
            </a>
        </div>
        <section v-if="cart.count" class="grid md:grid-cols-2 gap-12 py-6">
            <div class="w-full max-w-[680px] flex flex-col gap-4 justify-self-end h-max top-12 md:sticky">
                <template v-if="cart.isLogged">
                    <div
                        :class="{ 'card-expanded': selectedMethod === 'stripe' }"
                        class="payment-method rounded-2xl shadow-box-2 w-full overflow-clip"
                    >
                        <div
                            :class="selectedMethod === 'stripe' ? 'bg-primary/10' : 'bg-white'"
                            class="flex w-full justify-between p-4 rounded-t-md"
                        >
                            <input
                                id="stripe"
                                v-model="selectedMethod"
                                class="hidden"
                                name="typePayment"
                                type="radio"
                                value="stripe"
                            />
                            <label class="radio-label flex items-center cursor-pointer" for="stripe">
                                <span
                                    :class="selectedMethod === 'stripe' ? 'border-primary' : 'border-gray-900'"
                                    class="flex-center border-2 w-5 h-5 mr-2 rounded-full"
                                >
                                    <span
                                        :class="{ 'bg-primary': selectedMethod === 'stripe' }"
                                        class="radio-button w-3 h-3 rounded-full"
                                    ></span>
                                </span>
                                <span class="text-lg font-semibold">Carte de crédit</span>
                            </label>
                            <div class="flex gap-2">
                                <img :src="`/assets/icons/payment/masterCard.svg`" alt="masterCard icon" class="w-10" />
                                <img :src="`/assets/icons/payment/visa.svg`" alt="visa icon" class="w-10" />
                                <img :src="`/assets/icons/payment/maestro.svg`" alt="maestro icon" class="w-10" />
                            </div>
                        </div>
                        <div v-if="selectedMethod === 'stripe'" class="card-content mt-4 pb-4">
                            <PaymentCardStripe />
                        </div>
                    </div>
                    <div
                        :class="{ 'card-expanded': selectedMethod === 'paypal' }"
                        class="payment-method rounded-2xl shadow-box-2 w-full overflow-clip"
                    >
                        <div
                            :class="selectedMethod === 'paypal' ? 'bg-primary/10' : 'bg-white'"
                            class="flex w-full justify-between p-4 rounded-t-md"
                        >
                            <input
                                id="paypal"
                                v-model="selectedMethod"
                                class="hidden"
                                name="typePayment"
                                type="radio"
                                value="paypal"
                            />
                            <label class="radio-label flex items-center cursor-pointer" for="paypal">
                                <span
                                    :class="selectedMethod === 'paypal' ? 'border-primary' : 'border-gray-700'"
                                    class="flex-center border-2 w-5 h-5 mr-2 rounded-full"
                                >
                                    <span
                                        :class="{ 'bg-primary': selectedMethod === 'paypal' }"
                                        class="radio-button w-3 h-3 rounded-full"
                                    ></span>
                                </span>
                                <span class="text-lg font-semibold">PayPal</span>
                            </label>
                            <img :src="`/assets/icons/payment/paypal.svg`" alt="paypal" class="w-8" />
                        </div>
                        <div v-if="selectedMethod === 'paypal'" class="card-content mt-4 p-4">
                            <PaymentCardPaypal />
                        </div>
                    </div>
                </template>
                <EmptyState
                    v-else
                    sectionned
                    :image="ArrowLeftEndOnRectangleIcon"
                    title="Connecter a votre eleve espace"
                    :actions="[
                        {
                            title: 'Se connecter',
                            primary: true,
                            full: true,
                            onClick: () => {
                                cart.state.authModal = true;
                            },
                        },
                    ]"
                >
                    <p>Vous devez vous connecter pour continuer</p>
                    <span class="py-3 block">{{ cart.count }} Produits</span>

                    <div class="mx-2 divide-y bg-gray-100 rounded-2xl mb-3 text-black">
                        <div class="flex justify-between p-3">
                            <span class="text-base font-semibold">Sous-total </span>
                            <span class="text-base font-semibold"> {{ moneyFormat(cart.prices.subTotal) }}</span>
                        </div>
                        <!-- <hr /> -->
                        <div class="flex justify-between p-3">
                            <span class="text-xl font-bold">Total : </span>
                            <span class="text-2xl font-bold"> {{ moneyFormat(cart.prices.total) }}</span>
                        </div>
                    </div>
                </EmptyState>
            </div>
            <ul class="flex flex-col gap-6">
                <ProductCard v-for="(item, idx) in cart.data" :key="idx" :item="item" />
            </ul>
        </section>
        <div v-if="cart.query.fetching" class="flex justify-center items-center h-80">
            <Spinner class="w-12 fill-primary" />
        </div>

        <div v-else-if="!cart.count" class="flex flex-col justify-center items-center gap-2 py-10 bg-pri">
            <img :src="`/assets/images/panel/shopping_cart.png`" alt="shopping_cart" class="w-64 h-56" />
            <span class="text-2xl font-bold">Oups!</span>
            <span class="text-xl"> Votre panier est vide </span>
        </div>
        <ConfirmedPaymentModal />
    </main>
</template>

<script setup>
import { useCart } from '@shared/stores';
import { ref } from 'vue';
import { routes } from '@front/routes';
import { EmptyState, Spinner } from '@shared/components';
import { PaymentCardPaypal, PaymentCardStripe, ProductCard } from './partials';
import { moneyFormat } from '@shared/helpers';
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/vue/20/solid';
import { ConfirmedPaymentModal } from '@common/components';
const tarifLink="nos-tarifs";
const selectedMethod = ref('stripe');
const cart = useCart();
</script>

<style scoped>
.card-expanded {
    transition: height 0.3s ease-in-out;
}

.radio-button {
    transition: background-color 0.3s ease-in-out;
}

.radio-label:hover .radio-button {
    background-color: #e25626; /* Change color on hover */
}

.payment-method {
    margin-right: 20px;
}

.card-content {
    margin-top: 10px;
}
</style>
