import { defineAsyncComponent } from "vue";
export const InlineError = defineAsyncComponent(() => import('./InlineError.vue'))
export const Toast = defineAsyncComponent(() => import('./Toast.vue'))
export const ExceptionList = defineAsyncComponent(() => import('./ExceptionList.vue'))
export const Banner = defineAsyncComponent(() => import('./Banner.vue'))