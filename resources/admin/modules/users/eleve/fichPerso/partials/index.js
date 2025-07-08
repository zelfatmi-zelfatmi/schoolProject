import { defineAsyncComponent } from 'vue';
export const InfosSection = defineAsyncComponent(() => import('./InfosSection.vue'));
export const ProfileSection = defineAsyncComponent(() => import('./ProfileSection.vue'));
export const CommentsSection = defineAsyncComponent(() => import('./CommentsSection.vue'));
export const AvailableDrivingCalendarSection = defineAsyncComponent(() =>
    import('./AvailableDrivingCalendarSection.vue')
);
export const SecretaryCalendarSection = defineAsyncComponent(() => import('./SecretaryCalendarSection.vue'));
export const SkillsSteps = defineAsyncComponent(() => import('./SkillsSteps.vue'));
export const GeneralTabs = defineAsyncComponent(() => import('./GeneralTabs.vue'));
export const Skill = defineAsyncComponent(() => import('./Skill.vue'));
export const CpfItem = defineAsyncComponent(() => import('./CpfItem.vue'));
