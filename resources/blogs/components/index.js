import { defineAsyncComponent } from "vue";


export const PostCard = defineAsyncComponent(() => import('./PostCard.vue'))
export const CategoryCard = defineAsyncComponent(() => import('./CategoryCard.vue'))
export const Sidebar = defineAsyncComponent(() => import('./Sidebar.vue'))
export const SeoBar = defineAsyncComponent(() => import('./SeoBar.vue'))
export const PopupNotification = defineAsyncComponent(() => import('./PopupNotification.vue'))
