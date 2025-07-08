import { computed, onMounted, reactive, ref } from 'vue';
import { STORAGE_TYPE } from '@shared/constants';
import { useMutation, useQuery, useStorage } from '@shared/hooks';
import { routes } from '@front/routes';
import { defineStore } from 'pinia';
import { usePage } from '@inertiajs/vue3';

export const useCart = defineStore('cart', () => {
    const formatUrl = (href) => {
        if (!href.startsWith('http')) {
            return new URL(href, import.meta.env.VITE_APP_URL).href;
        }
        return href;
    };
    const [local, setLocal] = useStorage('CART_ITEMS', [], STORAGE_TYPE.session);
    const state = reactive({
        authModal: false,
        loading: {},
        successMsg: '',
        order: null,
        notify: true,
        isSpliteActive: false,
    });
    const mutation = useMutation();
    const query = useQuery({
        key: 'cart_items',
        url: formatUrl("api/eleve/carts/list"),
    });

    const isLogged = computed(() => !!usePage().props.auth.user);
    const data = computed(() => (isLogged.value ? query.data : local.value) || []);
    const count = computed(() => data.value?.length || 0);
    const prices = computed(() => {
        const subTotal = data.value.reduce((a, b) => {
            const { prix, quantity = 1, multi_payment } = b?.product || b;
            const mp = state.isSpliteActive ? multi_payment || 1 : 1;
            return a + (prix * quantity) / mp;
        }, 0);

        const solde = data.value.reduce((a, b) => {
            const { solde, quantity = 1 } = b?.product || b;
            return a + solde * quantity;
        }, 0);

        const total = subTotal;
        return {
            subTotal,
            solde,
            total,
        };
    });
    const isExist = (product) => data.value.find((item) => item.id === product.id || item.product_id === product.id);
    const getSplitedProduct = () => {
        const res = data.value.find((item) => !!(item.product?.multi_payment || item.multi_payment));
        return res?.product?.multi_payment || res?.multi_payment;
    };
    const getAll = () => {
        query.fetch().finally(() => {
            state.loading = {};
        });
    };
    const add = (product) => {
        if (isLogged.value) {
            state.loading[product.id] = true;

            const currentProducts = query.data || [];
            const exists = currentProducts.find(p => p.product_id === product.id || p.id === product.id);

            const updatedProducts = exists ? currentProducts : [...currentProducts, { product }];

            const payload = updatedProducts.map(p => ({
                product_id: p.product_id || p.product?.id || p.id,
                quantity: 1,
                tranches: 1,
            }));

            mutation
                .mutate(formatUrl("api/eleve/carts/many"), 'post', payload, { notify: state.notify })
                .then(() => {
                    state.successMsg = 'Produit bien ajouté au panier';
                    getAll();
                })
                .catch(() => {
                    state.loading = {};
                });
        } else {
            if (!isExist(product)) {
                setLocal([...local.value, product]);
            }
        }
    };


    const remove = (product) => {
        if (isLogged.value) {
            state.successMsg = '';
            state.loading[product.id] = true;

            const el = isExist(product);
            if (el) {
                mutation
                    .mutate(formatUrl(`api/eleve/carts/${el.id}/destroy`), 'delete', {}, { notify: state.notify })
                    .then(() => {
                        state.successMsg = 'Produit retiré du panier';

                        // 🔁 Mettre à jour local.value
                        const updatedLocal = [...local.value].filter((item) => item.id !== product.id);
                        setLocal(updatedLocal);

                        // ✅ Si panier vide → on vide aussi local cache
                        if (updatedLocal.length === 0) {
                            setLocal([]); // force nettoyage total
                        }

                        getAll(); // recharge
                    });
            }
        } else {
            const updatedLocal = [...local.value].filter((item) => item.id !== product.id);
            setLocal(updatedLocal);
        }
    };
    const removeAll = async () => {
        local.value = [];
        setLocal([]);

        if (isLogged.value && query.data?.length) {
            const ids = query.data.map(item => item.id); // ids des éléments dans le panier
            await Promise.all(
                ids.map(id => mutation.mutate(formatUrl(`api/eleve/carts/${id}/destroy`), 'delete'))
            );
            await getAll(); // refresh le panier
        }
    };



    const syncCart = () => {
        if (!local.value.length) return;
        const payload = local.value.map((item) => ({ product_id: item.id, quantity: 1, tranches: 1 }));
        mutation.mutate(formatUrl("api/eleve/carts/many"), 'post', payload).then(() => {
            // getAll({ clear: true });
            setLocal([]);
            state.authModal = false;
            location.reload();
        });
    };
    onMounted(() => {
        if (isLogged.value) {
            getAll();
        }
    });


    return {
        getAll,
        isExist,
        add,
        remove,
        removeAll,
        syncCart,
        getSplitedProduct,
        state,
        count,
        data,
        mutation,
        query,
        isLogged,
        prices,
    };
});
