import '../bootstrap';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';
import { createPinia } from 'pinia';
import { FrontAppLayout } from './layouts';
import { createHead } from '@vueuse/head';


const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const pinia = createPinia();

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        if (name?.includes('modules/')) {
            const page = await resolvePageComponent(`./${name}.vue`, import.meta.glob('./modules/**/*.vue'));
            page.default.layout = page.default.layout || FrontAppLayout;
            return page;
        }
        const [prefix, suffix] = name.split('/');
        const newName = `${prefix.toLocaleLowerCase()}/${suffix}`;
        return await resolvePageComponent(`./modules/${newName}.vue`, import.meta.glob('./modules/**/*.vue'));
    },
    setup({ el, App, props, plugin }) {
        const head = createHead();
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(head)
            .use(pinia)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
