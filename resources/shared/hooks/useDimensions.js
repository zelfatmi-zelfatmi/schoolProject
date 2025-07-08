import { ref, onMounted, onUnmounted } from 'vue';

export function useDimensions() {
    const width = ref(0);
    const height = ref(0);
    const screenSize = ref(null);
    const lg = ref(window.innerWidth >= 1024);
    const md = ref(window.innerWidth >= 768);

    function updateDimensions() {
        if (screenSize.value) {
            width.value = screenSize.value.offsetWidth;
            height.value = screenSize.value.offsetHeight;
        }
        lg.value = window.innerWidth >= 1024;
        md.value = window.innerWidth >= 768;
    }

    onMounted(() => {
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', updateDimensions);
    });

    return {
        width,
        height,
        lg,
        md,
        screenSize,
    };
}

export default useDimensions;
