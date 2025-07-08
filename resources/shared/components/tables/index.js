import { defineAsyncComponent } from 'vue';
export const Table = defineAsyncComponent(() => import('./Table.vue'));
export const IndexFilters = defineAsyncComponent(() => import('./IndexFilters.vue'));
export const IndexTable = defineAsyncComponent(() => import('./IndexTable.vue'));
export const IndexFiltersProduct = defineAsyncComponent(() => import('./IndexFiltersProduct.vue'));
