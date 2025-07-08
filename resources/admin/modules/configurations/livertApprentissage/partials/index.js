import { defineAsyncComponent } from 'vue';
export const LAGroupForm = defineAsyncComponent(() => import('./LAGroupForm.vue'));
export const LASkillForm = defineAsyncComponent(() => import('./LASkillForm.vue'));

export const SkillItem = defineAsyncComponent(() => import('./SkillItem.vue'));
export const GroupItem = defineAsyncComponent(() => import('./GroupItem.vue'));
