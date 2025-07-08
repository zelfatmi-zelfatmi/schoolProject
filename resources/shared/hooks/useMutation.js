import { errorsMessages } from '@admin/constants';
import { useToast } from '@shared/stores';
import axios from 'axios';
import { ref, reactive, computed, watch } from 'vue';

export function useMutation(data = {}, options = { notify: true }) {
    const toast = useToast();
    const nativeData = JSON.parse(JSON.stringify(data));
    const dataKeys = Object.keys(nativeData);

    const mutating = ref(false);
    const errors = ref({});
    const response = ref(null);
    const controller = ref(null);
    const transfomedData = ref(null);

    const form = reactive({
        ...data,
        errors: {},
        isDirty: false,
        mutating: false,
        processing: false,
        bulkLoading: {},
        data: () => dataKeys.map((key) => form[key]),
        transform,
        mutate,
        post: (url) => mutate(url, 'post'),
        delete: (url) => mutate(url, 'delete'),
        put: (url) => mutate(url, 'put'),
        reset,
        response: null,
    });

    const isDirty = computed(() => JSON.stringify(nativeData) !== JSON.stringify(form));

    function reset(fieldKey) {
        if (fieldKey) {
            form[fieldKey] = data[fieldKey];
        } else {
            dataKeys.forEach((key) => {
                form[key] = data[key];
            });
        }
    }
    function extractedPayload() {
        return dataKeys.reduce((acc, key) => {
            acc[key] = form[key];
            return acc;
        }, {});
    }
    function transform(callback = (data) => data) {
        transfomedData.value = callback(JSON.parse(JSON.stringify(extractedPayload())));
    }

    // eslint-disable-next-line no-unused-vars
    async function mutate(url = '', method = 'post', payload = null, { notify = true } = {}) {
        // ! deprecated
        errors.value = {};
        mutating.value = true;

        // v2 implementation
        form.processing = true;
        form.errors = {};
        form.response = null;

        try {
            if (controller.value) {
                controller.value.abort();
            }

            controller.value = new AbortController();

            const { data } = await axios[method](url, payload || transfomedData.value || extractedPayload(), {
                signal: controller.value.signal,
            });
            response.value = data;
            if (options.notify && notify) {
                toast.notify({ type: 'success', title: data?.message || 'Operation effectuee avec succes' });
            }
            return data;
            // eslint-disable-next-line no-useless-catch
        } catch (err) {
            errors.value = err?.response?.data?.errors || err;
            form.errors = err?.response?.data?.errors || err;
            let msg = err?.response?.data?.message || 'Une erreur est survenue';
            if (err?.response?.data?.message?.startsWith('E')) {
                msg = errorsMessages[err?.response?.data?.message];
            }
            toast.notify({ type: 'error', title: msg });
            throw err;
        } finally {
            mutating.value = false;
        }
    }
    watch(form, () => {
        form.isDirty = JSON.stringify(nativeData) !== JSON.stringify(form.data());
    });
    if (options.grouped) {
        return form;
    }

    return {
        mutating,
        form,
        response,
        errors,
        mutate,
        transform,
        reset,
        isDirty,
    };
}
