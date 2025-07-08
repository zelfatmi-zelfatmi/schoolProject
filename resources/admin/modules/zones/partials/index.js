import { defineAsyncComponent } from 'vue';
export const ZoneForm = defineAsyncComponent(() => import('./ZoneForm.vue'));
export const ZipForm = defineAsyncComponent(() => import('./ZipForm.vue'));
export const LieuForm = defineAsyncComponent(() => import('./LieuForm.vue'));
// export const ZipManager = defineAsyncComponent(() => import('./ZipManager.vue'));
// export const LieuxManager = defineAsyncComponent(() => import('./LieuxManager.vue'));
export const ZoneItem = defineAsyncComponent(() => import('./ZoneItem.vue'));
export const LieuZipItem = defineAsyncComponent(() => import('./LieuZipItem.vue'));
