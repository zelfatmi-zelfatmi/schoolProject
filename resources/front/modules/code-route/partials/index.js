import { defineAsyncComponent } from "vue";
export const HeroSection = defineAsyncComponent(() => import('./HeroSection.vue'))
export const MethodeSection = defineAsyncComponent(() => import('./MethodeSection.vue'))
export const FonctionneSection = defineAsyncComponent(() => import('./FonctionneSection.vue'))