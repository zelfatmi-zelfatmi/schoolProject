import { onMounted, onUnmounted, ref } from 'vue';
import { useDebounce } from './useDebounce';

export const useSticky = (top = 100, params = { blocked: false, immediate: false }) => {
    const debounce = useDebounce(params.immediate ? 0 : 20);
    const isSticky = ref(false);
    const scrollPosition = ref(0);
    const onScroll = () => {
        scrollPosition.value = window.scrollY || document.documentElement.scrollTop;
        isSticky.value = scrollPosition.value > top;
    };
    const handleScroll = debounce(onScroll);

    onMounted(() => {
        if (params.blocked) {
            return;
        }
        handleScroll();
        window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
    });

    return [isSticky, handleScroll];
};
