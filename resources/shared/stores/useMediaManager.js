import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import { useEvents } from '@shared/hooks';

export const useMediaManager = defineStore('MediaManager', () => {
    const show = ref(false);
    const source = ref('');
    const search = ref('');
    const types = ref(null);
    const selectedTab = ref(1);
    const selectedMedia = ref([]);
    const errors = ref({});
    const multiple = ref(false);
    const event = useEvents();
    const settings = reactive({
        showTypeUpload: false,
    });
    const list = reactive({
        links: {},
        meta: {},
        storageMedia: [],
    });
    const loading = reactive({
        upload: false,
        delete: false,
        takingPhoto: false,
    });

    const trigger = (data = null) => {
        event.emit('media:submit', {
            data,
            source: source.value,
        });
    };
    const open = (val = '') => {
        errors.value = {};
        show.value = true;
        source.value = typeof val === 'string' ? val : '';
    };
    const openMenu = (val = '') => {
        settings.showTypeUpload = true;
        source.value = typeof val === 'string' ? val : '';
    };
    const close = () => {
        errors.value = {};
        show.value = false;
        source.value = '';
        types.value = null;
        settings.showTypeUpload = false;
    };

    return {
        show,
        source,
        types,
        selectedTab,
        errors,
        search,
        close,
        open,
        openMenu,
        trigger,
        submit: (callback) => {
            event.on('media:submit', (e) => {
                callback(e);
                event.off('media:submit', callback);
            });
        },
        settings,
        selectedMedia,
        multiple,
        list,
        loading,
    };
});
