import { defineAsyncComponent } from "vue";

export const ProductDetails = defineAsyncComponent(() => import('./ProductDetailsToolkit.vue'))
export const RefundToolkit = defineAsyncComponent(() => import('./RefundToolkit.vue'))
export const OrderForm = defineAsyncComponent(() => import('./OrderForm.vue'))