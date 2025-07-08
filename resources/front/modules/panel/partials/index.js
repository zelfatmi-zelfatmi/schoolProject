import { defineAsyncComponent } from 'vue';
export const ProductCard = defineAsyncComponent(() => import('./ProductCard.vue'));
export const PaymentCardStripe = defineAsyncComponent(() => import('./PaymentCardStripe.vue'));
export const PaymentCardPaypal = defineAsyncComponent(() => import('./PaymentCardPaypal.vue'));
