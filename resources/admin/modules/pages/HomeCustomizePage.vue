<script setup>
import { Box, EmptyState, Listbox2, Page, Thumb } from '@shared/components';
import { useForm } from '@inertiajs/vue3';
import { useDebounce, useQuery } from '@shared/hooks';
import { routes } from '@admin/routes';
import { TrashIcon } from '@heroicons/vue/20/solid';
import { getMediaUrl } from '@shared/helpers';
import { InlineActions } from '@common/components';
import { computed, watch } from 'vue';
const props = defineProps({
    page: {
        type: Object,
        default: () => ({}),
    },
});

const debounce = useDebounce(200);
const form = useForm({
    is_active: true,
    products: props.page?.products || [],
    extra: {
        products_auto: props.page?.extra_product_auto || [],
    },
});
const getParams = (products = [], is_auto = 0) => ({
    url: route(routes.api.products.list),
    transformable: true,
    paginate: true,
    params: { is_auto, excluded_ids: [...products].map((v) => v.id) },
});
const productsQuery = useQuery(getParams(form.products), true);
const productsAutoQuery = useQuery(getParams(form.extra.products_auto, 1), true);

const onAddProduct = (product) => {
    if (!form.products.some((v) => v.id === product.id)) form.products = [...form.products, product];
};
const onAddProductAuto = (product) => {
    if (!form.extra.products_auto.some((v) => v.id === product.id))
        form.extra = { products_auto: [...form.extra.products_auto, product] };
};

const onRemoveProduct = (product, isAuto = false) => {
    if (isAuto) {
        form.extra.products_auto = form.extra.products_auto.filter((item) => item.id !== product.id);
        return;
    }

    form.products = form.products.filter((item) => item.id !== product.id);
};

const handleSubmit = () => {
    if (props.page?.id) {
        form.transform((data) => {
            data.products = data.products.map((item) => item.id);
            data.extra = { products_auto: data.extra.products_auto.map((item) => item.id) };
            return data;
        }).post(route(routes.pages.promo.update, props.page?.id));
    }
};
watch(
    () => form.products,
    debounce(() => {
        productsQuery.params.excluded_ids = [...form.products].map((v) => v.id);
        productsQuery.fetch();
    })
);
watch(
    () => form.extra.products_auto,
    debounce(() => {
        productsAutoQuery.params.excluded_ids = [...form.extra.products_auto].map((v) => v.id);
        productsAutoQuery.fetch();
    })
);
const actions = computed(() => [
    {
        label: 'Enregistrer',
        primary: true,
        submit: true,
        disabled: !form.isDirty,
        loading: form.processing,
        onAction: handleSubmit,
    },
    {
        label: 'Reintialiser',
        disabled: form.processing || !form.isDirty,
        secondary: true,
        onAction: () => form.reset(),
    },
]);
</script>
<template>
    <Page width="md" title="Accueil" :actions="actions">
        <ul class="mt-5">
            <Box
                sectionned
                padding
                title="Produits Boite Manuelle"
                subtitle="Choisir les produits de type de boite Manuelle"
            >
                <div class="grid grid-cols-2 items-center">
                    <Listbox2
                        :key="form.products?.length"
                        :query="productsQuery"
                        :disabled="form.products?.length >= 3"
                        prefix="Produit"
                        clear
                        :placeholder="`${3 - form.products?.length} Produit(s) rester`"
                        @change:full="onAddProduct"
                    />
                </div>

                <ul class="flex flex-col divide-y border-b">
                    <li class="flex justify-between font-medium text-xxs text-gray-600 mb-1">
                        <span> le maximum de produit que vous pouvez ajouter est de 3 </span>
                        <span class="text-green-600">({{ form.products?.length || 0 }}) Produit(s) selectionner</span>
                    </li>

                    <li v-for="product in form.products" :key="product.id" class="flex items-center py-2">
                        <div class="flex-1 flex items-center gap-2">
                            <Thumb :src="getMediaUrl(product, true)" class="!rounded-2xl" />
                            <p class="text-base line-clamp-2 mt-1">{{ product.name }}</p>
                        </div>
                        <TrashIcon class="w-6 h-6 text-red-500 cursor-pointer" @click="onRemoveProduct(product)" />
                    </li>
                    <EmptyState
                        v-if="!form.products?.length"
                        image="/assets/images/panel/shopping_cart.png"
                        title="Aucun produit"
                        class="pb-5 pt-3"
                    >
                        Aucun produit n'a été ajouté
                    </EmptyState>
                </ul>
            </Box>
            <Box
                sectionned
                padding
                title="Produits Boite automatique"
                subtitle="Choisir les produits de type de boite automatique"
            >
                <div class="grid grid-cols-2 items-center">
                    <Listbox2
                        :key="form.extra.products_auto?.length"
                        :query="productsAutoQuery"
                        :disabled="form.extra.products_auto?.length >= 3"
                        prefix="Produit"
                        clear
                        :placeholder="`${3 - form.extra.products_auto?.length} Produit(s) rester`"
                        @change:full="onAddProductAuto"
                    />
                </div>

                <ul class="flex flex-col divide-y border-b">
                    <li class="flex justify-between font-medium text-xxs text-gray-600 mb-1">
                        <span> le maximum de produit que vous pouvez ajouter est de 3 </span>
                        <span class="text-green-600"
                            >({{ form.extra.products_auto?.length || 0 }}) Produit(s) selectionner</span
                        >
                    </li>

                    <li v-for="product in form.extra.products_auto" :key="product.id" class="flex items-center py-2">
                        <div class="flex-1 flex items-center gap-2">
                            <Thumb :src="getMediaUrl(product, true)" class="!rounded-2xl" />
                            <p class="text-base line-clamp-2 mt-1">{{ product.name }}</p>
                        </div>
                        <TrashIcon
                            class="w-6 h-6 text-red-500 cursor-pointer"
                            @click="onRemoveProduct(product, true)"
                        />
                    </li>
                    <EmptyState
                        v-if="!form.extra.products_auto?.length"
                        image="/assets/images/panel/shopping_cart.png"
                        title="Aucun produit"
                        class="pb-5 pt-3"
                    >
                        Aucun produit n'a été ajouté
                    </EmptyState>
                </ul>
            </Box>
            <InlineActions :actions="actions" />
        </ul>
    </Page>
</template>
