import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
const initialTransformed = (init, transformable = false, key = 'data') => {
    if ((init, transformable)) {
        return {
            data: init[key],
            meta: {
                total: init.total || 0,
                current_page: init.current_page || 1,
                per_page: init.per_page || 10,
                links: init.links || [],
                path: init.path,
                from: init.from,
                to: init.to,
            },
            links: {
                first: init.first_page_url || null,
                prev: init.prev_page_url || null,
                next: init.next_page_url || null,
                last: init.last_page_url || null,
            },
        };
    }
    if (Object.keys(init)?.length) {
        return {
            data: init[key],
        };
    }

    return {};
};

export function useQuery(props = {}, isMounted = false) {
    const { url = '', params = null, key = 'data', init = {}, dataType, transformable, callback } = props;
    const initialData = initialTransformed(init, transformable, key);

    const state = reactive({
        data: callback ? callback(initialData.data) : initialData.data ?? dataType ?? [],
        links: initialData.links || {},
        meta: initialData.meta || {},
        params: params || {},
        fetching: false,
        fetchingMore: false,
        error: null,
        fetch: handleFetch,
    });
    const controller = ref(null);

    async function handleFetch(_url = '', _params = null, loadmore = false) {
        const blocked = loadmore && !state.links.next;
        if (state.fetching || state.fetchingMore || blocked) {
            return;
        }
        const payload = _params || state.params;
        if (loadmore) {
            payload.page = (state.meta?.current_page || 1) + 1;
            state.fetchingMore = true;
        } else {
            state.fetching = true;
        }

        if (controller.value) {
            controller.value.abort();
        }
        controller.value = new AbortController();
        try {
            const { data } = await axios.get(_url || url, {
                params: payload,
                signal: controller.value.signal,
            });
            const newData = callback ? callback(data[key]) : data[key];
            if (data.links && !data.meta) {
                const dataTransformed = initialTransformed(data, true);
                state.links = dataTransformed.links;
                state.meta = dataTransformed.meta;
            } else if (data.links) {
                state.links = data.links;
                state.meta = data.meta;
            }
            state.data = loadmore ? [...state.data, ...(newData ?? [])] : newData ?? [];
        } catch (err) {
            state.error = err;
        } finally {
            state.fetching = false;
            state.fetchingMore = false;
        }
    }

    onMounted(() => {
        if (isMounted && url) {
            handleFetch();
        }
    });
    return state;
}
