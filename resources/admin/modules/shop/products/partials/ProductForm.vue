<script setup>
import {
    Box,
    ColorField,
    EditorField,
    ExceptionList,
    Listbox,
    MediaManager,
    SingleImageField,
    Switch,
    TabSwitch,
    TextField,
    useMedias,
} from '@shared/components';
import { routes } from '@admin/routes';
import { computed,watch } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { usePage } from '@shared/stores';
import { getStatusObjectById } from '@shared/hooks';
import { ProductTypeEnum } from '../ProductConsts.js';
import { InlineActions } from '@common/components';
import { productEtat } from '@common/constants';
import { debounce } from 'lodash';


let debounceTimerHT = null;
let debounceTimerTTC = null;
let updatingFromHT = false;
let updatingFromTTC = false;

const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
    actions: Array,
    isEdit: Boolean,
    uuid: String,
});

const page = usePage();
const medias = useMedias();

const form = useForm({
    name: props.data.name || '',
    caracteristiques: props.data.caracteristiques || '',
    description: props.data.description || '',
    color: props.data.color || '#000000',
    prix: props.data.prix || '',
    price_ht: props.data.price_ht || '',
    base_price_ttc: props.data.prix || 0, // 🔁 valeur réelle du prix sans promo
    promo: props.data.promo || 0,
    solde: props.data.solde || '',
    multi_payment: props.data.multi_payment || 0,
    is_auto: props.data.is_auto || false,
    is_cpf: props.data.is_cpf || 0,
    type_offre: props.data.type_offre || '',
    type: props.data.type || '',
    status:true,
    is_product_cart: props.data.is_product_cart || false,
    is_product_test:props.data.is_product_test || false,
    is_shop:props.data.is_shop || false,
    media: props.data?.media?.storage_media || null,
    order: props.data.order || 0,

});


watch(() => form.price_ht, (newHT) => {
  if (updatingFromTTC) return;
  clearTimeout(debounceTimerHT);

  debounceTimerHT = setTimeout(() => {
    const ht = parseFloat(String(newHT).replace(',', '.'));
    if (!isNaN(ht)) {
      updatingFromHT = true;
      form.prix = (ht * 1.2).toFixed(2);
      updatingFromHT = false;
    } else {
      form.prix = '';
    }
  }, 500); // 500ms de pause après frappe
});

watch(() => form.promo, (newPromo) => {
  const base = parseFloat(form.base_price_ttc.toString().replace(',', '.')) || 0;
  const remise = parseFloat(newPromo.toString().replace(',', '.')) || 0;

  if (base <= 0) return; // ✅ Protection : rien ne se fait si base invalide

  updatingFromHT = true;

  if (remise > 0) {
    const newTTC = Math.max(0, base - remise);
    form.prix = +newTTC.toFixed(2);
    form.price_ht = +(newTTC / 1.2).toFixed(2);
  } else {
    // ⏪ réinitialisation des prix d’origine
    form.prix = +base.toFixed(2);
    form.price_ht = +(base / 1.2).toFixed(2);
  }

  updatingFromHT = false;
});



page.actions = [
    {
        label: `${props.isEdit ? 'Modifier' : 'Ajouter'} produit`,
        primary: true,
        submit: true,
        disabled: computed(() => form.processing || !form.isDirty),
        loading: computed(() => form.processing),
        onClick: () => submit(),
    },
    {
        label: 'Rejeter',
        disabled: computed(() => form.processing || !form.isDirty),
        secondary: true,
        onClick: () => form.reset(),
    },
];
const submit = () => {
    form.transform((data) => {
        if (data.media?.id) {
            data.media = data.media.id;
        }

        // ⛔️ Supprime base_price_ttc de l'objet envoyé à Laravel
        delete data.base_price_ttc;

        return data;
    });

    if (props.isEdit) {
        form.put(route(routes.shop.products.update, props.data.id));
    } else {
        form.post(route(routes.shop.products.store));
    }
};

const handleDeleteMedia = () => {
    if (props.isEdit && props.data.media?.id) {
        medias.deleteMediaModel(props.data.media.id, () => {
            form.media = null;
        });
    } else {
        form.media = null;
    }
};
watch(() => form.promo, (newPromo) => {
  const baseTTC = parseFloat(form.base_price_ttc) || 0;
  const remise = parseFloat(newPromo.toString().replace(',', '.')) || 0;

  if (!isNaN(baseTTC)) {
    updatingFromHT = true;

    if (!isNaN(remise) && remise > 0) {
      const newTTC = Math.max(0, baseTTC - remise);
      form.prix = +newTTC.toFixed(2);
      form.price_ht = +(newTTC / 1.2).toFixed(2);
    } else {
      // 🟢 Promo supprimée → on remet les prix d’origine
      form.prix = +baseTTC.toFixed(2);
      form.price_ht = +(baseTTC / 1.2).toFixed(2);
    }

    updatingFromHT = false;
  }
});




</script>

<template>
    <MediaManager @submit="form.media = $event" />
    <form class="grid md:grid-cols-3 py-10 gap-6" @submit.prevent="submit">
        <article class="md:col-span-2 flex flex-col max-md:order-2">
            <Box sectionned padding title="Produit infos">
                <TextField v-model="form.name" :error="form.errors.name" label="Nom du produit" />
                <TextField
                    v-model="form.description"
                    :error="form.errors.description"
                    :multiline="3"
                    label="Description du produit "
                />

                <EditorField
                    v-model="form.caracteristiques"
                    :error="form.errors.caracteristiques"
                    label="Caractéristiques"
                />
                <div class="grid grid-cols-2 gap-5">
                    <Listbox
                        v-model="form.type"
                        :items="Object.values(ProductTypeEnum)"
                        :error="form.errors.type"
                        :keys="['name', 'id']"
                        :show-search="false"
                        :default-value="getStatusObjectById(ProductTypeEnum, data?.type)"
                        input-class="!rounded-lg bg-white shadow-none border !h-9"
                        label="Type"
                        placeholder="Choisir type de produit"
                    />
                    <Listbox
                        v-model="form.type_offre"
                        :error="form.errors.type_offre"
                        :items="Object.values(productEtat)"
                        :keys="['name', 'id']"
                        :default-value="productEtat[data?.type_offre] || ''"
                        :show-search="false"
                        input-class="!rounded-lg bg-white shadow-none border !h-9"
                        label="Type d'offre"
                        placeholder="Choisir type d'offre"
                    />
                </div>
                <div class="flex items-center justify-between">
                    <label class="block font-medium text-xs text-gray-600 mb-0.5 mt-1">Forfait </label>
                    <TabSwitch
                        v-model="form.is_auto"
                        class="text-xs bg-gray-200"
                        size="sm"
                        :items="[
                            { value: false, name: 'Manuel' },
                            { value: true, name: 'Auto' },
                        ]"
                    />
                </div>
                <!-- <div class="flex items-center justify-between">
                    <label class="block font-medium text-xs text-gray-600 mb-0.5 mt-1">Cpf </label>
                    <TabSwitch
                        v-model="form.is_cpf"
                        class="text-xs bg-gray-200"
                        size="sm"
                        :items="[
                            { value: 0, name: 'Non' },
                            { value: 1, name: 'Oui' },
                        ]"
                        @change="form.status = false"
                    />
                </div> -->
            </Box>
            <Box sectionned padding title="Prix">
                <div class="grid grid-cols-2 gap-3">
                    <TextField
                        v-model="form.price_ht"
                        :error="form.errors.price_ht"
                        label="Prix HT"
                        suffix="€"
                        type="number"
                    />
                    <TextField
                        v-model="form.prix"
                        :error="form.errors.prix"
                        label="Prix TTC"
                        suffix="€"
                        type="number"

                    />
                    <TextField
                        v-model="form.promo"
                        :error="form.errors.promo"
                        label="Appliquer une réduction de"
                        type="number"
                    />
                    <TextField v-model="form.solde" :error="form.errors.solde" label="Solde" suffix="H" type="number" />
                    <TextField
                        v-model="form.multi_payment"
                        :error="form.errors.multi_payment"
                        label="Paiement en plusieurs fois"
                        type="number"
                    />
                    <TextField
  v-model="form.order"
  :error="form.errors.order"
  label="Ordre d'affichage"
  type="number"
  suffix="#"
/>

                </div>
            </Box>

            <InlineActions :actions="page.actions" />
        </article>
        <div class="md:sticky top-12 max-md:order-1">
            <Box sectionned padding>
                <ColorField v-model="form.color" :error="form.errors.color" label="Couleur" />
                <Switch v-model="form.is_product_cart" :error="form.errors.is_product_cart" label="Produit panier" />
                <Switch v-model="form.is_product_test" :error="form.errors.is_product_test" label="Produit Test" />
                <Switch v-model="form.is_cpf" :error="form.errors.is_product_test" label="Produit CPF" />
                <Switch v-model="form.is_shop" :error="form.errors.is_shop" label="Produit Boutique" />

                <!-- <div :class="['w-full', form.is_cpf ? 'pointer-events-none opacity-50 saturate-0' : '']">
                    <Switch v-model="form.status" :error="form.errors.status" label="Activé le produit" />
                    <ExceptionList :items="['Si le produit est désactivé, il ne sera pas disponible à l\'achat']" />
                </div> -->
            </Box>
            <Box sectionned padding title="Media">
                <SingleImageField
                    :error="form.errors.media"
                    :src="form.media?.path || form.media || null"
                    @delete="handleDeleteMedia"
                />
            </Box>
        </div>
    </form>
</template>
