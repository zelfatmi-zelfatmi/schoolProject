import { defineAsyncComponent } from 'vue';
export const TopSection = defineAsyncComponent(() => import('./TopSection.vue'));
export const ProductsSection = defineAsyncComponent(() => import('./ProductsSection.vue'));
export const SvgHourCount = defineAsyncComponent(() => import('./SvgHourCount.vue'));
