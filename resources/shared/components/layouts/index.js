import { defineAsyncComponent } from 'vue';
export const NavigationItem = defineAsyncComponent(() => import('./NavigationItem.vue'));
export const NavigationSubItem = defineAsyncComponent(() => import('./NavigationSubItem.vue'));
export const ToolkitItems = defineAsyncComponent(() => import('./ToolkitItems.vue'));
export const Page = defineAsyncComponent(() => import('./Page.vue'));
export const WapperMenu = defineAsyncComponent(() => import('./WapperMenu.vue'));
export const Drawer = defineAsyncComponent(() => import('./Drawer.vue'));
