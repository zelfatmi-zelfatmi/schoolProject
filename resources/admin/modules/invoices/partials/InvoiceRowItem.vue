<script setup>
import { routes } from '@admin/routes';
import { reactive } from 'vue';
import { Button } from '@shared/components';
import { moneyFormat } from '@shared/helpers';
import { Link,} from '@inertiajs/vue3';
import { ArrowTrendingUpIcon, PencilSquareIcon, ArrowDownTrayIcon } from '@heroicons/vue/20/solid';

defineEmits(['click:resume-hours']);

const props = defineProps({
    item: {
        type: Object,
        default: () => ({}),
    },
});

const state = reactive({
    isEdit: false,
});


const form = useForm({
    date_paiement: props.item.date_paiement || null,
    status: props.item.status ? 1 : 0,
});

const handleSave = () => {
    form.put(route(routes.invoices.update, props.item.id), {
        onSuccess: () => {
            state.isEdit = false;
        },
    });
};
const onCancel = () => {
    form.reset();
    state.isEdit = false;
};

</script>
<template>
    <tr class="group/actions">
        <td class="cell text-left">
             {{ item.month }} 
        </td>
        <td class="cell text-left">
    
            {{ item.moniteur?.details?.departement }}

  
        </td>
        <td class="cell">
            <Link
                class="font-bold btn btn-link btn-dark !pl-0"
                :href="route(routes.users.moniteur.edit, item.moniteur?.id)"
            >
                {{ item.moniteur?.user?.name }}
            </Link>
        </td>

        <td class="cell text-center">
            {{ item.facturable_hours }}
        </td>
        <td class="cell text-center">
            {{ item.non_facturable_hours }}
        </td>
        <td class="cell text-center">
      

            {{item.facturable_hours?moneyFormat(item.facturable_hours * item.moniteur.details.tarif_car):'' }} 
        </td>
        <td class="cell text-center">
            <span>
                <!-- {{ item.date_paiement ? new Date(item.date_paiement).toLocaleDateString('fr-FR') : 'Non payé' }} -->
            </span>
        </td>
        <td class="sticky right-0 bg-white w-10 mx-auto border-l">
            <div :class="['flex justify-center items-center h-full gap-1', !state.isEdit && 'px-2']">
                <Button
                    :icon="ArrowDownTrayIcon"
                    info
                    link
                    title="Télécharger la facture"
                    @click="$emit('click:download', item)"
                />
                <template v-if="!state.isEdit">
                    <Button
                        :icon="ArrowTrendingUpIcon"
                        dark
                        grouped
                        tooltip="Resume heures"
                        @click="
                            $emit('click:resume-hours', {
                                factureMoniteur: item.id,
                                moniteur: item.moniteur?.id,
                            })
                        "
                    />
                    <Button :icon="PencilSquareIcon" tooltip="Modifier" info grouped @click="state.isEdit = true" />
                </template>
                <template v-else>
                    <Button dark link class="!text-xs" @click="onCancel">Annuler</Button>
                    <Button
                        info
                        link
                        class="!text-xs"
                        :disabled="!form.isDirty || form.processing"
                        :loading="form.processing"
                        @click="handleSave"
                    >
                        Enreg
                    </Button>
                </template>
            </div>
        </td>


    </tr>
</template>
