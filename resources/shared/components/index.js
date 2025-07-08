import { defineAsyncComponent } from 'vue';
export const SvgIcon = defineAsyncComponent(() => import('./SvgIcon.vue'));
export const Icon = defineAsyncComponent(() => import('./Icon.vue'));

export * from './common';
export * from './forms';
export * from './media-manager';
export * from './tables';
export * from './feedbacks';
export * from './modals';
export * from './layouts';
export * from './navigations';
export * from './auth';
