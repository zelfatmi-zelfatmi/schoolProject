import '../bootstrap';

import {createApp, h} from 'vue';
import {createInertiaApp} from '@inertiajs/vue3';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';
import {ZiggyVue} from '../../vendor/tightenco/ziggy/dist/vue.m';
import {createPinia} from 'pinia'

import CKEditor from '@ckeditor/ckeditor5-vue';
import {BlogAminLayout} from './layouts';
import {FrontAppLayout} from '@front/layouts';


const appName = import.meta.env.VITE_APP_NAME || 'MI';
const pinia = createPinia()

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        if (name?.includes('modules/')) {
            const page = await resolvePageComponent(`./${name}.vue`, import.meta.glob('./modules/**/*.vue'));
            page.default.layout = name.includes('admin') ? BlogAminLayout : FrontAppLayout
            return page
        }
        return await resolvePageComponent(`../pages/${name}.vue`, import.meta.glob('../pages/**/*.vue'))
    },
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(pinia)
            .use(CKEditor)
            .use(ZiggyVue)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
