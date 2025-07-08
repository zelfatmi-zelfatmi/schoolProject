<script setup>
import {ChevronLeftIcon} from '@heroicons/vue/20/solid';
import {Box, Button, Drawer, Listbox, TextField, Thumb} from '@shared/components';
import {useMutation, useQuery} from '@shared/hooks';
import {ItemAvatar} from '@common/components';
import {routes} from '@admin/routes';
import {getMediaUrl, moneyFormat} from '@shared/helpers';
import {ref} from 'vue';
import Listbox2 from '@shared/components/forms/listbox/Listbox2.vue';
// import { SoldeTypeEnum } from '@shared/constants';
const emit = defineEmits(['close', 'newSold']);
const props = defineProps({
    show: Boolean,
    user: {
        type: Object,
        default: () => ({}),
    },
});

const searchQuery = ref({
    product: '',
});
const { errors, form, mutate, mutating, isDirty } = useMutation({
    status: 'inc',
    solde: String(props.user?.eleve?.solde || 0),
    product_id: null,
});
const productQuery = useQuery({ url: route(routes.api.products.list) });


const soldes = useQuery({ url: route(routes.api.soldes.getSoldesByEleve, props.user?.eleve?.id || '-') }, true);
const handleFetchProducts = (search = '', refetch = false, loadmore = false) => {
    if (productQuery.data?.length && !refetch) {
        return;
    }
    productQuery.fetch('', { search }, loadmore);
};
const handleSelectedProduct = (product) => {
    form.solde = product.solde;
};
const close = () => {
    emit('close');
};

const newSold = (sold) => {
    emit('newSold', sold);
};

const handleSubmit = () => {
    mutate(route(routes.api.soldes.incOrDecSoldeEleve, props.user?.eleve?.id || '-'), 'post').then((res) => {
        newSold(res.data?.solde);
        soldes.fetch();
        close();
    });
};
</script>

<template>
    <Drawer :show="show" @close="close">
        <div class="p-4 border-b grid grid-cols-3 items-center">
            <button class="btn-hover flex gap-2 items-center" @click="close">
                <ChevronLeftIcon class="w-8 p-1 bg-white shadow-box-2 rounded-full" />

                Retour
            </button>
            <b class="flex flex-col items-center">Eleve solde</b>
        </div>
        <form class="contents" @submit.prevent="handleSubmit">
            <div class="flex flex-col gap-2 p-4 h-full flex-1">
                <Box class="grid w-full mb-5">
                    <Listbox
                        v-slot="{ selectedItem }"
                        v-model="form.product_id"
                        :error="errors.product_id"
                        :items="productQuery.data || []"
                        input-class="border border-slate-300 py-1 pl-3 pr-8 shadow-sm rounded-lg min-h-[2.25rem] flex items-center text-sm bg-white"
                        placeholder="Selectionner produits"
                        label="Produit"
                        clear
                        :keys="['name', 'id']"
                        :fetching="productQuery.fetching"
                        :fetching-more="productQuery.fetchingMore"
                        @change:full="handleSelectedProduct($event)"
                        @open="handleFetchProducts"
                        @search="handleFetchProducts($event, true)"
                        @scroll:end="handleFetchProducts(searchQuery.product, true, true)"
                    >
                        <ItemAvatar
                            class="-ml-2"
                            size="w-8"
                            :src="selectedItem?.media?.storage_media?.path"
                            :title="selectedItem?.name"
                            :content="selectedItem?.real_solde ? moneyFormat(selectedItem.real_solde) : ''"
                        />
                    </Listbox>
                    <div class="flex gap-3">
                        <TextField
                            id="Sold"
                            v-model="form.solde"
                            type="number"
                            class="w-24"
                            placeholder="Solde"
                            suffix="h"
                            label="Solde"
                        />
                        <Listbox
                            v-model="form.status"
                            :items="[
                                { value: 'inc', name: 'Addition (+)' },
                                { value: 'dec', name: 'Soustraction (-)' },
                            ]"
                            :error="form.errors?.status"
                            :show-search="false"
                            class="w-full"
                            input-class="!rounded-lg bg-white shadow-none border !h-9"
                            label="Operation"
                            placeholder="Operation"
                        />
                    </div>
                </Box>

                <Box class="" title="La list des soldes" sectionned padding>
                    <ul class="divide-y">
                        <li v-for="item in soldes.data || []" :key="item.id" class="py-2">
                            <div class="flex items-center gap-3">
                                <Thumb :src="getMediaUrl(item.product, true)" size="md" />
                                <div class="flex-1">
                                    <b class="text-md flex justify-between">
                                        {{ item?.product?.name }}

                                        <small class="text-blue-500">{{ item?.solde }} H</small>
                                    </b>
                                    <p
                                        class="line-clamp-2 max-w-xs whitespace-break-spaces text-xxs"
                                        v-html="item?.product?.description"
                                    ></p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </Box>
                <div class="flex-1"></div>
            </div>
            <div
                class="flex flex-row justify-between py-2 px-4 text-right flex-shrink-0 h-fit sticky bottom-0 bg-white shadow-box-2"
            >
                <Button primary submit full :disabled="!isDirty" :loading="mutating"> Enregistrer </Button>
            </div>
        </form>
    </Drawer>
</template>
