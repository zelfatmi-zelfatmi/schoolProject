import { defineAsyncComponent } from 'vue';

export const TextField = defineAsyncComponent(() => import('./TextField.vue'));
export const SearchField = defineAsyncComponent(() => import('./SearchField.vue'));
export const EditorField = defineAsyncComponent(() => import('./EditorField.vue'));
export const Listbox = defineAsyncComponent(() => import('./listbox/Listbox.vue'));
export const Listbox2 = defineAsyncComponent(() => import('./listbox/Listbox2.vue'));
export const Listbox3 = defineAsyncComponent(() => import('./listbox/Listbox3.vue'));
export const Switch = defineAsyncComponent(() => import('./Switch.vue'));
export const ColorField = defineAsyncComponent(() => import('./ColorField.vue'));
export const Datepicker = defineAsyncComponent(() => import('./Datepicker2.vue'));
export const Datepicker1 = defineAsyncComponent(() => import('./Datepicker.vue'));
export const SuperEditorField = defineAsyncComponent(() => import('./SuperEditorField.vue'));
export const CodeEditeur = defineAsyncComponent(() => import('./CodeEditeur.vue'));
export const RadioField = defineAsyncComponent(() => import('./RadioField.vue'));
export const TabSwitch = defineAsyncComponent(() => import('./TabSwitch.vue'));
export const Checkbox = defineAsyncComponent(() => import('./Checkbox.vue'));
