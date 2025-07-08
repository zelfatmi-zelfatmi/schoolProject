import { ref, watchEffect } from 'vue';

export function useInView(element) {
    const inView = ref(false);

    const observer = new IntersectionObserver(
        ([entry]) => {
            inView.value = entry.isIntersecting;
        },
        {
            threshold: 1,
            rootMargin: '10px',
        }
    );

    watchEffect(() => {
        if (element.value) {
            observer.observe(element.value);
        }

        return () => {
            if (element.value) {
                observer.unobserve(element.value);
            }
        };
    });

    return inView;
}
