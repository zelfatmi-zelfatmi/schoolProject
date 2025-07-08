<script setup>
import { reactive, ref } from 'vue';
import { Badge, InlineConfirmation, Spinner } from '@shared/components';
import { routes } from '@admin/routes';
import { router } from '@inertiajs/vue3';

const props = defineProps({
    item: {
        type: Object,
        default: () => ({}),
    },
    exam: {
        type: Number,
        default: 1,
    },
});
const form = reactive({
    paiement_forfait: props.item?.paiement_forfait || false,
    paiement_ppe: props.item?.paiement_ppe || false,
    is_rdv_permis: props.item?.is_rdv_permis || false,
});
const loading = ref({
    paiement_forfait: false,
    paiement_ppe: false,
    is_rdv_permis: false,
});
const handleChange = (key, close) => {
    form[key] = !form[key];
    loading.value[key] = true;
    const url =
        props.exam === 1
            ? routes.exams.waitingList.update
            : props.exam === 2
            ? routes.exams.preList.update
            : routes.exams.passage.update;

    router.post(route(url, props.item.id), form, {
        onSuccess: () => {
            close();
        },
        onFinish: () => {
            loading.value[key] = false;
        },
    });
};
</script>

<template>
    <td class="cell" @click="(e) => e.stopPropagation()">
        <InlineConfirmation
            confirm-text="Oui, Confirmer"
            content="Changer le statut de paiement forfait"
            :loading="loading.paiement_forfait"
            @confirm="handleChange('paiement_forfait', $event)"
        >
            <div v-if="loading.paiement_forfait" class="mx-2">
                <Spinner class="w-5" />
            </div>
            <Badge v-else :error="!item.paiement_forfait" :success="item.paiement_forfait">
                {{ item.paiement_forfait ? 'Oui' : 'Non' }}
            </Badge>
        </InlineConfirmation>
    </td>
    <td class="cell" @click="(e) => e.stopPropagation()">
        <InlineConfirmation
            confirm-text="Oui, Confirmer"
            content="Changer le statut de paiement ppe"
            :loading="loading.paiement_ppe"
            @confirm="handleChange('paiement_ppe', $event)"
        >
            <div v-if="loading.paiement_ppe" class="mx-2">
                <Spinner class="w-5" />
            </div>
            <Badge v-else :error="!item.paiement_ppe" :success="item.paiement_ppe">
                {{ item.paiement_ppe ? 'Oui' : 'Non' }}
            </Badge>
        </InlineConfirmation>
    </td>
    <td v-if="exam === 1 || exam === 2" class="cell" @click="(e) => e.stopPropagation()">
        <InlineConfirmation
            confirm-text="Oui, Confirmer"
            content="Changer le statut de rendez-vous permis"
            :loading="loading.is_rdv_permis"
            @confirm="handleChange('is_rdv_permis', $event)"
        >
            <div v-if="loading.is_rdv_permis" class="mx-2">
                <Spinner class="w-5" />
            </div>
            <Badge v-else :error="!item.is_rdv_permis" :success="item.is_rdv_permis">
                {{ item.is_rdv_permis ? 'Oui' : 'Non' }}
            </Badge>
        </InlineConfirmation>
    </td>
</template>
