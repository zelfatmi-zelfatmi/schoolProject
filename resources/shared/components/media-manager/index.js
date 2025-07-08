import { defineAsyncComponent } from "vue";
export * from './MediaManager'
export const MediaManager = defineAsyncComponent(() => import('./MediaManager.vue'))
export const SingleImageField = defineAsyncComponent(() => import('./SingleImageField.vue'))
export const SingleAudioField = defineAsyncComponent(() => import('./SingleAudioField.vue'))
export const SingleVideoField = defineAsyncComponent(() => import('./SingleVideoField.vue'))
