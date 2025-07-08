<template>
    <Modal
      :show="show"
      max-width="md"
      class="max-h-screen overflow-y-auto"
      title="Ajouter au panier"
      @close="close"
    >
      <div class="p-3 flex flex-col gap-5 md:grid md:grid-cols-2">
        <!-- Colonne gauche: Formulaire -->
        <Box class="flex flex-col h-full" sectionned padding="sm" mb="mb-0 md:mb-3">
          <Listbox
            v-model="selectedType"
            :items="types"
            :keys="['name', 'value']"
            input-class="!rounded-lg bg-white shadow-none border !h-9"
            label="Type"
            placeholder="selectionner un Type"
          />
  
          <Listbox
            :error="warningText"
            :fetching="products.fetching"
            :fetching-more="products.fetchingMore"
            :items="getProductsFiltred"
            :keys="['name', 'id']"
            input-class="!rounded-lg bg-white shadow-none border !h-9"
            label="Produits"
            placeholder="selectionner un produit"
            ssr
            @open="handleFetchProducts"
            @search="handleFetchProducts($event, true)"
            @change:full="handleProductChange($event)"
            @scroll:end="handleFetchProducts(searchQuery.product, true, true)"
          />
  
          <EmptyState v-if="!selectedProducts?.length" :image="ExclamationCircleIcon">
            <p class="block font-medium text-xs text-gray-600 py-1">
              Vous n'avez encore sélectionné aucun produit
            </p>
          </EmptyState>
  
          <section v-else>
            <ul class="max-h-[110px] min-h-[150px] overflow-y-hidden hover:overflow-y-auto scrollbar divide-y">
              <li
                v-for="product in selectedProducts"
                :key="product.id"
                class="flex py-2 gap-2 justify-between duration-200"
              >
                <span class="text-xs">{{ product?.name }}</span>
                <div class="flex gap-2 text-xxs">
                  <span>{{ moneyFormat(product?.prix) }}</span>
                  <span>({{ product?.solde }}H)</span>
                  <XCircleIcon class="w-4 text-red-700 cursor-pointer" @click="removeItem(product?.id)" />
                </div>
              </li>
            </ul>
            <hr />
            <div class="flex justify-end items-center bg-white w-full pt-2 gap-2">
              <span class="text-sm">Total:</span>
              <span>{{ moneyFormat(getPrixProducts()) }}</span>
              <span class="text-sm text-gray-700">({{ getSoldProducts() }}H)</span>
            </div>
          </section>
        </Box>
  
        <!-- Colonne droite: Infos eleve + image -->
        <article class="flex flex-col gap-3">
          <Box class="flex items-center justify-between gap-4" sectionned padding="sm" mb="mb-0">
            <div class="text-sm font-medium text-gray-600">
              <span>{{ eleve?.first_name }} {{ eleve?.last_name }}</span>
              <div class="flex items-center text-xs text-orange-600 gap-2">
                <a :href="'tel:' + eleve?.telephone">{{ eleve?.telephone }}</a>
                <ClipboardIcon
                  class="w-4 cursor-pointer hover:text-primary"
                  @click="copyText(eleve?.telephone, 'N° de télé')"
                />
              </div>
            </div>
            <UserTooltip v-if="eleve" :user="eleve">
              <Thumb :src="getMediaUrl(eleve)" size="sm" />
            </UserTooltip>
          </Box>
  
          <Box
            v-if="cart?.length"
            class="w-full min-h-[200px] flex-1"
            mb="mb-0"
            :separated="false"
            sectionned
            padding="sm"
          >
            <div class="min-h-[150px] overflow-y-auto scrollbar border-b flex-1">
              <div
                v-for="item in cart"
                :key="item?.id"
                class="flex py-2 px-2 rounded gap-2 justify-between hover:bg-gray-100 duration-200"
              >
                <span class="text-xs">{{ item.product.name }}</span>
                <div class="flex gap-2">
                  <span class="text-xxs">{{ moneyFormat(item.product.prix) }}</span>
                  <span class="text-xxs">({{ item.product.solde }}H)</span>
                </div>
              </div>
            </div>
            <div class="flex justify-end items-center bg-white w-full gap-2 pt-2">
              <span class="text-sm">Total cart:</span>
              <span>{{ moneyFormat(totalProductsPrice) }}</span>
              <span class="text-sm text-gray-700">({{ getTotalSold(cart) }}H)</span>
            </div>
          </Box>
  
          <Box v-else class="flex justify-center items-center bg-white shadow-md rounded-xl !mb-0 border py-4">
            <img src="/assets/images/panel/shopping-cart-boxes.png" alt="empty-cart" class="w-28 md:w-32" />
          </Box>
        </article>
      </div>
  
      <!-- Footer sticky -->
      <div class="flex items-center justify-end p-3 bg-white sticky bottom-0 z-10">
        <div v-if="selectedProducts?.length && cart?.length" class="grid grid-cols-2 text-left w-1/2 font-semibold">
          <span>Total General:</span>
          <p>
            <span class="text-primary">{{ moneyFormat(totalPriceToUse + totalProductsPrice) }}</span>
            <span>({{ totalSoldToUse + getTotalSold(cart) }}H)</span>
          </p>
        </div>
        <div class="w-full md:w-1/2 flex justify-end gap-2">
          <Button secondary @click="close">Annuler</Button>
          <Button
            :disabled="!selectedProducts.length"
            :loading="loading || processing"
            class="ml-3"
            primary
            type="button"
            @click="addProductsToPanel"
          >
            Enregistrer
          </Button>
        </div>
      </div>
    </Modal>
  </template>
  
<script setup>
import {computed, ref, watch} from 'vue';
import {Box, Button, EmptyState, Listbox, Modal, Thumb} from '@shared/components';
import {ClipboardIcon, ExclamationCircleIcon, XCircleIcon} from '@heroicons/vue/20/solid';
import {routes} from '@admin/routes';
import {useQuery} from '@shared/hooks';
import {copyText, getMediaUrl, moneyFormat} from '@shared/helpers';
import UserTooltip from '@admin/modules/users/eleve/partials/UserTooltip.vue';
import {getTotalSold} from '@admin/constants';
import {useToast} from '@shared/stores';
const isMobile = window.innerWidth < 768

const emit = defineEmits(['close']);
const selectedProducts = ref([]);
const warningText = ref('');
const cart = ref();
const totalSoldToUse = ref(0);
const totalPriceToUse = ref(0);
const toast = useToast();
const processing = ref(false);
const props = defineProps({
    show: Boolean,
    loading: Boolean,
    eleve: Object,
});
const selectedType = ref('shop'); // Valeur par défaut pour tester
const types = [
  { name: 'Boutique', value: 'shop' },
  { name: 'Panier', value: 'cart' }
];
const close = () => {
    // console.log("hello close")
 cart.value = null;
 selectedProducts.value = [];
    // products.data = null;
    warningText.value = '';
     getProductsFiltred;
    emit('close');
};
const products = useQuery({
    url: route(routes.api.products.listbox),
});

const searchQuery = ref({
    product: '',
});



const totalProductsPrice = computed(() => cart.value?.reduce((acc, item) => acc + item.product.prix, 0) || 0);
const handleFetchProducts = (search = '', refetch = false, loadmore = false) => {
    if (products.data?.length && !refetch) {
        return;
    }
    searchQuery.value.category = search;
    products.fetch('', { is_cart: 1, search }, loadmore);
};
const handleProductChange = (item) => {
    warningText.value = '';
    if (selectedProducts.value?.find((obj) => obj.id === item.id)) {
        warningText.value = 'Vous avez deja ajoute ce produit';
    } else {
        selectedProducts.value.push(item);
    }
};
const removeItem = (id) => {
    selectedProducts.value = selectedProducts.value.filter((obj) => obj.id !== id);
};
watch(
    () => props.eleve,
    (user) => {
        if (user) {
            getUserCart();
        }
    }
);
const getPrixProducts = () => {
    let totalPrice = 0;
    selectedProducts.value?.map((item) => {
        totalPrice += parseInt(item.prix);
    });
    totalPriceToUse.value = totalPrice;
    return totalPrice;
};
const getSoldProducts = () => {
    let totalSold = 0;
    selectedProducts.value?.map((item) => {
        totalSold += parseInt(item.solde);
    });
    totalSoldToUse.value = totalSold;
    return totalSold;
};
watch(selectedType, (newValue) => {
  console.log('Type sélectionné :', newValue);
});
console.log("produit pannier ",products);

const getProductsFiltred = computed(() => {
    // Vérification et conversion de products.data en tableau
    let rawData = Array.isArray(products.data)
        ? products.data
        : Object.values(products.data); // Convertit les valeurs en tableau


    // Appliquer les filtres uniquement si `rawData` est un tableau
    if (!Array.isArray(rawData)) {
        return [];
    }

    // Cloner les données initiales pour éviter les mutations
    let productsNotSelected = [...rawData];

    // Filtrer les produits déjà dans le panier
    if (cart.value?.length) {
        productsNotSelected = productsNotSelected.filter((product) => {
            return !cart.value?.find((existProduct) => existProduct.product_id === product.id);
        });
    }

    // Appliquer un filtre basé sur le type sélectionné
    if (selectedType.value) {
        const typeMapping = {
            shop: 'is_shop',
            cart: 'is_product_cart',
        };
        const field = typeMapping[selectedType.value];
        if (field==='is_product_cart') {
            productsNotSelected = productsNotSelected.filter((product) => product[field] === true);
        }else {
            productsNotSelected = productsNotSelected.filter((product) => product[field] === 1);


        }
    }

    return productsNotSelected;
});


const getUserCart = async () => {
    cart.value = null;
    await axios
        .get(route(routes.api.cart.getCart, props?.eleve?.id))
        .then((res) => {
            cart.value = res.data?.cart_items;
        })
        .catch((e) => {
            console.error(e);
        });
};

const addProductsToPanel = async () => {
    processing.value = true;
    const data = selectedProducts.value.map((item) => {
        return {
            product_id: item.id,
            quantity: 1,
            tranches: item.multi_payment,
        };
    });
    await axios
        .post(route(routes.api.cart.addProductsToCart, props?.eleve?.id), data)
        .then((res) => {
            if (res.data) {
                selectedProducts.value = [];
                getUserCart();
                getProductsFiltred;
                getPrixProducts();
                getSoldProducts();
                toast.notify({ type: 'success', title: 'Produit ajouté au panier avec succès.' });
                emit('close');
            }
        })
        .catch((e) => {
            console.error(e);
        });
    processing.value = false;
};
console.log("eleve est ",props.eleve)
</script>
