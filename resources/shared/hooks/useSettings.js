import { usePage } from '@inertiajs/vue3';

export function useSettings(userType = null) {
    const { props: page } = usePage();
    switch (userType) {
        case 'director':
            return {};
        default:
            return page.value?.settings || null;
    }
}
