import { defineAsyncComponent } from 'vue';
export const StatsSection = defineAsyncComponent(() => import('./StatsSection.vue'));
export const ItemsCard = defineAsyncComponent(() => import('./ItemsCard.vue'));
export const UserCard = defineAsyncComponent(() => import('./UserCard.vue'));
export const DrawerAdmin = defineAsyncComponent(() => import('./DrawerAdmin.vue'));
export const MonitreurResumeHours = defineAsyncComponent(() => import('./MonitreurResumeHours.vue'));
export const DescPopup = defineAsyncComponent(() => import('./DescPopup.vue'));
export const SimplePaginate = defineAsyncComponent(() => import('./SimplePaginate.vue'));
export const ProductTable = defineAsyncComponent(() => import('./ProductTable.vue'));
