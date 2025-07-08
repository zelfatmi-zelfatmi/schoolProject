import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';

export const useToast = defineStore('toasts', () => {
    const list = ref([]);
    const showBanner = reactive({
        created: false,
        updated: false,
        key: 0,
    });
    const dismiss = (id) => {
        list.value = list.value.filter((t) => t.id !== id);
    };
    const notify = (data, timeout = 4000) => {
        const id = performance.now();
        list.value = [...list.value, { type: 'success', id, ...data }];
        setTimeout(() => {
            dismiss(id);
        }, timeout);
    };

    return {
        list,
        notify,
        showBanner,
        dismiss,
    };
});
