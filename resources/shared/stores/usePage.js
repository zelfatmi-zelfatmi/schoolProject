import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import { usePage as useInertiaPage } from '@inertiajs/vue3';
import { watch, onMounted } from 'vue';
import { router } from '@inertiajs/vue3';

export const usePage = defineStore('page', () => {
    const page = useInertiaPage();
    const actions = ref([]);
    const badges = ref([]);
    const settings = reactive({
        stack: true,
        hideStack: false,
    });
    const drawer = reactive({
        value: false,
        open(name = 'value') {
            drawer[name] = true;
        },
        close(name = 'value') {
            drawer[name] = false;
        },
    });

    const init = (_actions = [], _badges = []) => {
        actions.value = _actions;
        badges.value = _badges;
    };
    const logout = () => {
        router.post(
            route('logout'),
            {},
            {
                onFinish: () => {
                    setTimeout(() => {
                        location.reload();
                    }, 100);
                },
            }
        );
    };
    onMounted(() => {
        settings.hideStack = !!page?.props?.hideStack;
    });
    watch(page, ({ props }) => {
        settings.hideStack = !!props.hideStack;
    });

    return {
        settings,
        drawer,
        actions,
        badges,
        init,
        logout,
        firstSession: page.props?.firstSession,
        user: page.props.auth?.user || {},
        impersonate: page.props?.adminUser || null,
        isLogged: !!page.props.auth?.user,
    };
});
