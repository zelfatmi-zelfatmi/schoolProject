import { defineAsyncComponent } from "vue";

export const MediaListSection = defineAsyncComponent(() => import('./MediaListSection.vue'))
export const CommentSection = defineAsyncComponent(() => import('./CommentSection.vue'))
export const SummaryList = defineAsyncComponent(() => import('./SummaryList.vue'))