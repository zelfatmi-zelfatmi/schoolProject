<script setup>
import { Box, Datepicker, TabSwitch, TextField } from '@shared/components';
import { toRef } from 'vue';
import MediaItem from '@shared/components/media-manager/MediaItem.vue';
import { routes } from '@admin/routes';
import { useQuery } from '@shared/hooks';
import { useToast } from '@shared/stores';

const props = defineProps({
    values: Object,
});
const toast = useToast();
const form = toRef(props, 'values');
const productsQuery = useQuery({ url: route(routes.api.products.list), transformable: true, paginate: true }, true);

const onAddOrRemoveProduct = (product, isExtra = false) => {
    const data = isExtra ? form.value.extra.products : form.value.products;
    const index = data.indexOf(product.id);
    if (index === -1) {
        if (data?.length >= 3) {
            toast.notify({
                title: 'Vous ne pouvez pas ajouter plus de 3 produits',
                type: 'error',
            });
            return;
        }
        if (isExtra) {
            form.value.extra = {
                ...form.value.extra,
                products: [...form.value.extra.products, product.id],
            };
        } else {
            form.value.products = [...form.value.products, product.id];
        }
    } else {
        if (isExtra) {
            form.value.extra = {
                ...form.value.extra,
                products: form.value.extra.products.filter((v) => v !== product.id),
            };
        } else {
            form.value.products = form.value.products.filter((v) => v !== product.id);
        }
    }
};
</script>
<template>
    <div class="contents">
        <Box sectionned padding>
            <div class="flex items-center justify-between gap-5">
                <div class="w-full max-w-xs">
                    <TextField
                        v-model="form.title"
                        placeholder="Titre ex: Promo de fin d'année"
                        :error="form.errors.title"
                    />
                </div>
                <div>
                    <TabSwitch
                        v-model="form.is_active"
                        :items="[
                            {
                                id: false,
                                name: 'Inactif',
                                color: 'bg-red-500',
                            },
                            {
                                id: true,
                                name: 'Actif',
                                color: 'bg-green-500',
                            },
                        ]"
                    />
                </div>
            </div>
        </Box>
        <Box sectionned padding title="Planification">
            <div class="flex gap-5">
                <Datepicker
                    v-model="form.start_at"
                    label="Date de début"
                    :auto-apply="false"
                    placeholder="Choisir le début promo"
                    :error="form.errors.start_at"
                />
                <Datepicker
                    v-model="form.end_at"
                    label="Date de fin"
                    :auto-apply="false"
                    :min-date="new Date(form.start_at || null)"
                    placeholder="Choisir la fin promo"
                    :error="form.errors.end_at"
                />
            </div>
            <ul class="grid grid-cols-4 gap-3">
                <li class="col-span-4 flex justify-between font-medium text-xs text-gray-600 -mb-1">
                    <span>Choisir les produits de promo</span>
                    <span class="text-green-600">({{ form.products?.length || 0 }}) Produit(s) selectionner</span>
                </li>
                <li v-for="product in productsQuery.data" :key="product.id">
                    <MediaItem
                        as="div"
                        :media="{ path: product.path_img }"
                        :selected="form.products.includes(product.id)"
                        @click="onAddOrRemoveProduct(product)"
                    />
                    <p class="text-3xs line-clamp-2 mt-1">{{ product.name }}</p>
                </li>
            </ul>
        </Box>
        <Box sectionned padding title="Supplémentaire">
            <div class="flex gap-5">
                <Datepicker
                    v-model="form.extra.start_at"
                    label="Date de début"
                    :auto-apply="false"
                    :min-date="new Date(form.start_at || null)"
                    :max-date="new Date(form.end_at || null)"
                    placeholder="Choisir le début promo"
                />
                <Datepicker
                    v-model="form.extra.end_at"
                    label="Date de fin"
                    :auto-apply="false"
                    :min-date="new Date(form.extra.start_at || null)"
                    :max-date="new Date(form.end_at || null)"
                    placeholder="Choisir la fin promo"
                />
            </div>
            <ul class="grid grid-cols-4 gap-3">
                <li class="col-span-4 flex justify-between font-medium text-xs text-gray-600 -mb-1">
                    <span>Choisir les produits de promo supplémentaire</span>
                    <span class="text-green-600">({{ form.extra.products?.length || 0 }}) Produit(s) selectionner</span>
                </li>
                <li v-for="product in productsQuery.data" :key="product.id">
                    <MediaItem
                        as="div"
                        :media="{ path: product.path_img }"
                        :selected="form.extra.products.includes(product.id)"
                        @click="onAddOrRemoveProduct(product, true)"
                    />
                    <p class="text-3xs line-clamp-2 mt-1">{{ product.name }}</p>
                </li>
            </ul>
        </Box>
    </div>
</template>
