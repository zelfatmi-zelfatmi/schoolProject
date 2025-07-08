import { defineAsyncComponent } from 'vue';
export const MoniteurForm = defineAsyncComponent(() => import('./MoniteurForm.vue'));
export const InvoiceRowItem = defineAsyncComponent(() => import('./InvoiceRowItem.vue'));
export const DocumentItem = defineAsyncComponent(() => import('./DocumentItem.vue'));
