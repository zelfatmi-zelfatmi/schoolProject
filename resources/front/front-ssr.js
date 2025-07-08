import { createPinia } from 'pinia';
import { createSSRApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import createServer from '@inertiajs/vue3/server';
import { renderToString } from '@vue/server-renderer';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { FrontAppLayout } from './layouts';
import { createHead } from '@vueuse/head';

const pinia = createPinia();

// ✅ Protection contre SSR pour éviter "location is not defined"
if (typeof window !== "undefined") {
    global.Ziggy = require('../../resources/js/ziggy.js').Ziggy;
}

// ✅ Empêcher `route()` de s'exécuter en SSR
global.route = (name, params, absolute) => {
    if (typeof window === "undefined") {
        // console.warn(`🚨 \`route()\` a été appelé en SSR depuis ${new Error().stack}`);
        return "#"; // Fallback pour éviter les erreurs
    }
    return require('ziggy-js').route(name, params, absolute);
};

// ✅ Création de l'application Inertia SSR
createServer((page) =>
    createInertiaApp({
        title: (title) => {
            // ✅ Empêcher l'accès à `document.title` en SSR
            if (typeof document !== 'undefined') {
                return `${title || document.title || 'Laravel'} | Arabe facile`;
            }
            return `${title || 'Laravel'} | Arabe facile`;
        },
        page,
        render: renderToString,
        resolve: async (name) => {
            console.log("🔍 Résolution de la page :", name);

            if (name?.includes('modules/')) {
                const page = await resolvePageComponent(`./${name}.vue`, import.meta.glob('./modules/**/*.vue'));
                page.default.layout = page.default.layout || FrontAppLayout;
                return page;
            }

            const [prefix, suffix] = name.split('/');
            const newName = `${prefix.toLowerCase()}/${suffix}`;
            return await resolvePageComponent(`./modules/${newName}.vue`, import.meta.glob('./modules/**/*.vue'));
        },

        setup({ App, props, plugin }) {
            console.log("🔍 Props reçus dans setup:", props);

            // ✅ Protection contre SSR pour éviter des erreurs d'accès aux données
            const safeProps = props || {};
            safeProps.auth = safeProps.auth || { user: null, roles: [] };
            safeProps.jetstream = safeProps.jetstream || {};
            safeProps.ziggy = safeProps.ziggy || { url: "http://localhost:8000", routes: {} };

            const app = createSSRApp({ render: () => h(App, safeProps) });

            app.use(pinia);
            const head = createHead();

            app.use(head);

            // ✅ Définir `route` globalement AVANT toute utilisation
            app.config.globalProperties.route = global.route;

            // ✅ Vérifier que `plugin` est valide avant de l'utiliser
            if (typeof plugin === 'function' || (typeof plugin === 'object' && typeof plugin.install === 'function')) {
                app.use(plugin);
            }

            // ✅ Charger `ZiggyVue` uniquement côté client pour éviter `location` en SSR
            if (typeof window !== "undefined") {
                import("ziggy-js").then((mod) => {
                    if (mod.ZiggyVue) {
                        app.use(mod.ZiggyVue, Ziggy);
                    }
                }).catch(err => console.warn("⚠️ Impossible de charger ZiggyVue côté client:", err));
            }

            return app;
        }
    })
);
