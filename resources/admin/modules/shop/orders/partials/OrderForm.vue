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
    ConfirmationModal
} from '@shared/components';
import { routes } from '@admin/routes';
import { computed,watch,ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { usePage } from '@shared/stores';
import { getStatusObjectById } from '@shared/hooks';
// import { ProductTypeEnum } from '../ProductConsts.js';
import { InlineActions } from '@common/components';
import { paymentType, productEtat } from '@common/constants';


const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
    students: {
        type: Object,
        default: () => ({}),
    },
    products: {
        type: Object,
        default: () => ({}),
    },
    actions: Array,
    isEdit: Boolean,
    uuid: String,
});

const page = usePage();
const medias = useMedias();

// Formulaire
const form = useForm({
    payment_type: props.data?.payment_method || '',
    student: props.data?.eleve.user_id || '', // ID de l'élève sélectionné
    package: props.data?.product_id || null, // Premier produit du panier
    amount: props.data?.amount || 0, // Initialisation par défaut
    solde: props.data?.solde || 0, // Initialisation par défaut
    eleve_id: props.data?.eleve.user_id || '', // ID de l'élève
    product_id: props.data?.product_id || null, // Produit
});

// Variables pour la modal de confirmation
const showConfirmation = ref(false);
const confirmationData = ref(null);

watch(
    () => form.package,
    (newPackageId) => {
        const selectedProduct = props.products.find(product => product.id === newPackageId);
        if (selectedProduct) {
            form.product_id = selectedProduct.id; // ID du produit
            form.amount = selectedProduct.prix;  // Montant (assumez que `prix` est la clé pour le montant)
            form.solde = selectedProduct.solde;  // Solde
        } else {
            form.product_id = null;
            form.amount = 0;
            form.solde = 0;
        }
    }
);

watch(
    () => form.student,
    (newStudentId) => {
        form.eleve_id = newStudentId; // Synchronise eleve_id avec l'ID de l'élève sélectionné
    }
);

page.actions = [
    {
        label: `${props.isEdit ? 'Modifier' : 'Ajouter'} Commande`,
        primary: true,
        submit: true,
        disabled: computed(() => form.processing || !form.isDirty),
        loading: computed(() => form.processing),
        onClick: () => showConfirmationModal(),
    },
    {
        label: 'Annuler',
        disabled: computed(() => form.processing || !form.isDirty),
        secondary: true,
        onClick: () => form.reset(),
    },
];

// Affiche la modal de confirmation
const showConfirmationModal = () => {
    if (!props.isEdit) {
        confirmationData.value = {
            typeAction: props.isEdit ? 'modifier' : 'ajouter',
            name: `la commande pour l'élève ${props.students[form.student]?.name || 'inconnu'}`,
        };
        showConfirmation.value = true;
    } else {
        submitForm();
    }
};

// Gère la soumission après confirmation
const handleConfirmedSubmit = () => {
    showConfirmation.value = false; // Ferme la modal
    submitForm();
};

// Soumission réelle du formulaire
const submitForm = () => {
    form.transform(data => ({
        ...data,
        user_id: data.student,
        product_id: data.product_id,
    }));

    if (props.isEdit) {
        form.put(route(routes.shop.orders.update, props.data.id));
    } else {
        form.post(route(routes.shop.orders.store));
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
</script>

<template>
    <MediaManager @submit="form.media = $event" />
    <form class="grid md:grid-cols-3 py-10 gap-6" @submit.prevent="showConfirmationModal">
        <article class="md:col-span-2 flex flex-col max-md:order-2">
            <Box sectionned padding title="Les Informations de la commande">
                <div class="grid grid-cols-2 gap-5">
                    <Listbox
                        v-model="form.payment_type"
                        :error="form.errors.payment_type"
                        :items="Object.values(paymentType)"
                        :keys="['name', 'id']"
                        :default-value="paymentType[data?.payment_method] || ''"
                        :show-search="false"
                        input-class="!rounded-lg bg-white shadow-none border !h-9"
                        label="Type de Paiement"
                        placeholder="Choisir le type de Paiement"
                    />
                    <Listbox
                        v-model="form.student"
                        :error="form.errors.student"
                        :items="students ? Object.values(students) : []"
                        :keys="['name', 'id']"
                        :show-search="true"
                        input-class="!rounded-lg bg-white shadow-none border !h-9"
                        label="Élève"
                          :disabled="props.isEdit"
                        placeholder="Choisir l'élève"
                    />
                    <Listbox
                        v-model="form.package"
                        :error="form.errors.package"
                        :items="products ? Object.values(products) : []"
                        :keys="['name','id']"
                        :show-search="true"
                        input-class="!rounded-lg bg-white shadow-none border !h-9"
                        label="Forfait"
                        placeholder="Choisir le Forfait"
                    />
                </div>
            </Box>
            <InlineActions :actions="page.actions" />
        </article>
        <div class="md:sticky top-12 max-md:order-1">
            <Box sectionned padding title="Media">
                <SingleImageField
                    :error="form.errors.media"
                    :src="form.media?.path || form.media || null"
                    @delete="handleDeleteMedia"
                />
            </Box>
        </div>
    </form>

    <!-- Modal de confirmation -->
    <ConfirmationModal
        :loading="form.processing"
        :show="showConfirmation"
          :icon="PlusCircleIcon"
        :confirm-text="`Oui, ${confirmationData?.typeAction || ''}`"
        @close="showConfirmation = false"
        @confirm="handleConfirmedSubmit"
    >
    Attention : vous ne pouvez pas changer l'élève une fois la commande créée.
            Veuillez vérifier les informations avant de continuer.
            Êtes-vous sûr de vouloir procéder avec ces modifications ?

    </ConfirmationModal>
</template>