import { onMounted, onUnmounted } from 'vue';

export const useNetworkStatus = (callback = () => {}) => {
    const updateOnlineStatus = () => {
        const status = navigator.onLine ? true : false;
        callback(status);
    };

    onMounted(() => {
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
    });

    onUnmounted(() => {
        window.removeEventListener('online', updateOnlineStatus);
        window.removeEventListener('offline', updateOnlineStatus);
    });
};
