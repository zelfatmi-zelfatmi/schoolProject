import { defineAsyncComponent } from "vue";
export const BlogPageLayout = defineAsyncComponent(() => import('./BlogPageLayout.vue'))
export const BlogAminLayout = defineAsyncComponent(() => import('./BlogAminLayout.vue'))
// export const DashboardLayout = defineAsyncComponent(() => import('@blogs/layouts/DashboardLayout.vue'))
