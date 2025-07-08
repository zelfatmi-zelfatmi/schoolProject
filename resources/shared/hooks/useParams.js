import { router } from '@inertiajs/vue3';
import { watchEffect, ref, onMounted } from 'vue';
import { useEvents } from './useEvents';

export const useParams = ({ reload: _reload = true, events: applyEvent = false, data = {} } = {}) => {
    // ✅ Vérification SSR pour éviter d'accéder à window côté serveur
    const getUrlParams = (url = null) => {
        if (typeof window === "undefined") {
            return {}; // Retourne un objet vide si on est en SSR
        }
        return Object.fromEntries(new URLSearchParams(url || window.location.search));
    };

    const params = ref({ ...data, ...getUrlParams() });
    const event = useEvents();

    const update = (newParams, callback = () => { }, override = false) => {
        if (typeof window === "undefined") {
            console.warn("⚠ `window` n'est pas accessible en SSR");
            return;
        }

        const searchParams = new URLSearchParams(override ? '' : window.location.search);
        searchParams.delete('page');

        for (const key in newParams) {
            if (newParams[key] || newParams[key] === 0) searchParams.set(key, newParams[key]);
            else searchParams.delete(key);
        }

        const newUrl = searchParams.toString()
            ? `${window.location.pathname}?${searchParams.toString()}`
            : window.location.pathname;

        window.history.replaceState({}, '', newUrl);

        params.value = getUrlParams();
        if (!_reload) {
            return;
        }

        applyEvent && event.emit(event.keys.table.loading, { value: true });
        router.reload({
            replace: true,
            onFinish: () => {
                callback();
                applyEvent && event.emit(event.keys.table.loading, { value: false });
            },
        });
    };

    const reload = () => {
        applyEvent && event.emit(event.keys.table.loading, { value: true });

        router.reload({
            queryStringArrayFormat: 'bracket-separator',
            onFinish: () => {
                applyEvent && event.emit(event.keys.table.loading, { value: false });
            },
        });
    };

    // ✅ Assure que `window.location` est utilisé uniquement côté client
    onMounted(() => {
        params.value = getUrlParams();
    });

    return {
        value: params.value,
        ...params.value,
        update,
        getUrlParams,
        reload,
    };
};

