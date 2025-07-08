import { defineAsyncComponent } from "vue";
export const Modal = defineAsyncComponent(() => import('./Modal.vue'))
export const ConfirmationModal = defineAsyncComponent(() => import('./ConfirmationModal.vue'))
export const InlineConfirmation = defineAsyncComponent(() => import('./InlineConfirmation.vue'))
export const InfoModal = defineAsyncComponent(() => import('./InfoModal.vue'))
export const BaseModal = defineAsyncComponent(() => import('./BaseModal.vue'))