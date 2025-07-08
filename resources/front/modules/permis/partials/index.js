import { defineAsyncComponent } from "vue";
export const HeroSection = defineAsyncComponent(() => import('./HeroSection.vue'))
export const EvaluationSection = defineAsyncComponent(() => import('./EvaluationSection.vue'))
export const PermisChezMoniteur = defineAsyncComponent(() => import('./PermisChezMoniteur.vue'))
export const InscritsSection = defineAsyncComponent(() => import('./InscritsSection.vue'))