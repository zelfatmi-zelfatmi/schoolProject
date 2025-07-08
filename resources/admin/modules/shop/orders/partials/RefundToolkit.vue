<script setup>
import { Popover } from '@shared/components/index.js';
import {Button,Checkbox,ConfirmationModal} from '@shared/components';
import { ref, onMounted, computed } from 'vue';
import { useToast } from '@shared/stores/index.js';
import { routes } from '@admin/routes';
import { PlusCircleIcon } from 'lucide-vue-next';
const toast = useToast();

const props = defineProps({
    soldEleve: Number,
    soldOrder: Number,
    orderId: String,
    isDisabled: Boolean,
    status: Object,
    items: {
        type: Array,
        default: () => [],
    },
    produitsRembourses: {
    type: Array,
    default: () => [],
  },
});

const showConfirmation = ref(false);
const confirmationData = ref({});
const inProgress = ref(false);
const selectedProductIds = ref([]);

onMounted(() => {
  selectedProductIds.value = []; // ← rien sélectionné au départ
});


const displayHours = computed(() => {
    const hours = props.status.id == 6 ? Math.floor(props.soldOrder / 2) : props.soldOrder;
    return hours;
});

const handleConfirmedSubmit = () => {
    inProgress.value = true;

    axios
        .post(route(routes.shop.orders.refund, { order: props.orderId }),
      {
        product_ids: selectedProductIds.value,
      },
      {
        headers: {
            'Content-Type': 'application/json',
        },
      })
        .then((res) => {
            toast.notify({
                type: 'success',
                title: 'Remboursement réussi',
                message: res.data.message || 'Les produits ont été remboursés avec succès.',
            });
            setTimeout(() => window.location.reload(), 1000);
        })
        .catch(() => {
            toast.notify({
                type: 'error',
                title: 'Erreur',
                message: 'Une erreur est survenue lors du remboursement.',
            });
        })
        .finally(() => {
            inProgress.value = false;
            showConfirmation.value = false;
        });
};
const confirmAndSubmit = () => {
    console.log("hello product selected ",selectedProductIds.value.length)
    if (!selectedProductIds.value.length) {
        toast.notify({
            type: 'error',
            title: 'Aucun produit sélectionné',
            message: 'Veuillez sélectionner au moins un produit à rembourser.',
        });
        return;
    }

    confirmationData.value = {
        typeAction: 'rembourser les produits sélectionnés',
    };
    showConfirmation.value = true;
};
const isProductRefunded = (productId) => {
  return props.produitsRembourses.some((p) => p.id === productId);
};

</script>

<template>
    <Popover :delay="100" :disabled="props.isDisabled" :offset="25" :arrow="false" position="left">
        <slot />
        <template #content="{ close }">
  <div class="grid w-[420px] max-w-full text-sm text-slate-800">
    <h2 class="text-lg font-bold mb-3">💰 MONTANT DE REMBOURSEMENT</h2>

    <!-- Bloc solde -->
    <div class="bg-slate-100 border rounded-lg p-4 mb-3 text-sm space-y-2">
      <div class="flex justify-between font-medium">
        <span>Total de solde :</span>
        <span class="text-black">{{ soldEleve }} H</span>
      </div>
      <div class="flex justify-between font-medium">
        <span>Heure à retirer :</span>
        <span class="text-black">{{ displayHours }} H</span>
      </div>
    </div>

    <!-- Liste des produits -->
    <div class="border-t pt-2 space-y-3 max-h-64 overflow-y-auto pr-1">
        <label
  v-for="item in props.items"
  :key="item.product.id"
  :class="[
    'flex flex-col rounded-md p-3 bg-white shadow-sm transition',
    selectedProductIds.includes(item.product.id)
      ? 'border border-blue-500 shadow-sm'
      : 'border border-blue-200',
    isProductRefunded(item.product.id) ? 'opacity-50 cursor-not-allowed' : ''
  ]"
>
  <!-- Ligne checkbox + nom + solde -->
  <div class="flex justify-between items-center gap-1">
    <div class="flex items-center gap-1 flex-1 leading-none">
      <div class="shrink-0 flex items-center">
        <input
          type="checkbox"
          :value="item.product.id"
          v-model="selectedProductIds"
          :disabled="isProductRefunded(item.product.id)"
          class="h-5 w-5 rounded-full border-gray-300 text-primary focus:ring-primary"
        />
      </div>
      <p class="font-semibold text-sm text-black">
        {{ item.product.name }}
      </p>
    </div>

    <span class="text-sm font-semibold text-gray-700 whitespace-nowrap">
      {{ item.product.solde }} H
    </span>
  </div>

  <!-- détails produit -->
  <div class="flex justify-between text-xs text-slate-700 font-medium mt-3 border-t pt-2">
    <span class="text-black font-semibold">Quantité : {{ item.quantity }}</span>
    <span class="text-black font-semibold">Unitaire : {{ item.product.prix }} €</span>
    <span class="text-black font-semibold">Total : {{ item.product.prix * item.quantity }} €</span>
  </div>
</label>


    </div>

    <!-- Bouton -->
    <Button
      primary
      class="mt-4 w-full flex items-center justify-center text-white font-medium"
      :loading="inProgress"
      @click="confirmAndSubmit"
    >
      Appliquer le remboursement
    </Button>
  </div>
        </template>
   </Popover>
<ConfirmationModal
  :loading="inProgress"
  :show="showConfirmation"
  :icon="PlusCircleIcon"
  :confirm-text="`Oui, ${confirmationData?.typeAction}`"
  @close="showConfirmation = false"
  @confirm="handleConfirmedSubmit"
>
  <template #default>
    <p class="text-sm text-slate-700">
      Êtes-vous sûr de vouloir <strong>{{ confirmationData?.typeAction }}</strong> ?
    </p>
  </template>
</ConfirmationModal>

</template>
