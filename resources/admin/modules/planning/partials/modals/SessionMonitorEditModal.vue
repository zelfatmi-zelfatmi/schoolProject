<script setup>
import { Button, ColorField, Datepicker,Datepicker1, Listbox2, Modal, RadioField, TextField } from '@shared/components';
import { usePlannings, usePlanningSession } from '@admin/stores';
import { usePlanningsMixinFilters } from '../../PlanningMixin';
import { ItemAvatar } from '@common/components';
import { computed, onMounted, ref, watch } from 'vue';
import { routes } from '@admin/routes';
import { useMutation } from '@shared/hooks';
import moment from 'moment-timezone';

const props = defineProps({
    monitors: {
        type: Object,
        default: () => ({}),
    },
    students: {
        type: Object,
        default: () => ({}),
    },
});

const session = usePlanningSession();
const plannings = usePlannings();
const zoneSelected = ref(null);

const { monitorsQuery, elevesQuery, lieuxQuery, zonesQuery, productQuery } = usePlanningsMixinFilters(props);
const { form, errors, mutate, mutating } = useMutation({
    planning_id: session.selectedSession?.id || null,
    date: session.selectedSession?.datef || null,
    start_at: session.selectedSession?.start_at || null,
    end_at: session.selectedSession?.end_at || null,
    is_active: session.selectedSession?.is_active || 1,
    hour: session.selectedSession?.hour || 0,
    moniteur_id: session.selectedSession?.moniteur?.id || null,
    eleve_id: session.selectedSession?.session?.eleve_id || null,
    product_id: session.selectedSession?.session?.product_id || null,
    lieu_id: session.selectedSession?.lieu || null,
    color: session.selectedSession?.color || '',
    all: true,
});
onMounted(() => {
    if (session.selectedSession?.lieu?.zone && isEdit) {
        zoneSelected.value = session.selectedSession?.lieu?.zone;
    }
    if (session.selectedSession?.lieu?.id) {
        form.lieu_id = session.selectedSession.lieu.id;
    }
    if (form.eleve_id) {
        productQuery.fetch(route(routes.api.soldes.getSoldesByEleve, form.eleve_id));
    }
});
const defaultValues = computed(() => {
    const { session: lecon, lieu } = session.selectedSession || {};
    const { eleve, moniteur, eleve_id, product } = lecon || {};
    return {
        eleve: eleve?.user,
        moniteur: moniteur?.user,
        product: form.eleve_id === eleve_id ? product : null,
        lieu,
        zone: lieu?.zone,
    };
});

const isEdit = computed(() => !!session.selectedSession && session.selectedSession?.id);

const close = () => {                                                                        
    session.show = false;
    session.selectedSession = null;
};
watch([() => form.start_at, () => form.end_at], ([start, end]) => {
    if (start && end) {
        form.hour = moment(end, 'HH:mm').diff(moment(start, 'HH:mm'), 'hour');
    }
});

const handleChangeEleve = (item) => {
    form.product_id = null;
    item?.eleve?.id && productQuery.fetch(route(routes.api.soldes.getSoldesByEleve, item?.eleve?.id));
};

const handleSubmit = async () => {
    try {
        delete form.all;
        if (isEdit.value) {
            await mutate(route(routes.api.plannings.update, session.selectedSession?.id), 'put');
        } else {
            delete form.planning_id;
            await mutate(route(routes.api.reservation.store), 'post');
        }
        close();
        plannings.getPlannings();
    } catch (error) {
        console.warn(error);
    }
};

watch(
    () => zoneSelected.value,
    (zone) => {
        if (!zone) {
            lieuxQuery.data = [];
            form.lieu_id = null;
            session.selectedSession.lieu = null;
        }
    }
);

const handleChangeLieu = (lieu_id) => {
    monitorsQuery.params.lieu_id = lieu_id;
    monitorsQuery.fetch();
};

const handleChangeZone = (zoneId) => {
    form.lieu_id = null;
    monitorsQuery.params.zone_id = zoneId;
    lieuxQuery.fetch(route(routes.api.zones.lieux.list, zoneId));
    monitorsQuery.fetch();
};
const handleChangeProduct = ({ color }) => {96
    if (!form.color) form.color = color;
};
</script>

<template>
    <Modal
        :show="session.show"
        max-width="2md"
        :title="isEdit && session.selectedSession?.id ? 'L\'édition d\'événement' : 'L\'ajout d\'événement'"
        custom-class="bg-gray-100 rounded-xl shadow-xl transform transition-all w-full  mx-4 md:mx-auto flex flex-col"
        :scrollable="false"
        @close="close"
    >
        <form @submit.prevent="handleSubmit">
            <section class="px-5 border-y bg-white border-y-slate-300 flex gap-5 h-full">
                <article class="flex-1 flex flex-col gap-3 border-r pr-5 py-8">
                    <RadioField
                        v-model="form.is_active"
                        :error="errors.is_active"
                        :show-search="false"
                        label="Statut"
                        wrapper-class="flex gap-2"
                        :items="[
                            { name: 'Actif', value: 1 },
                            { name: 'Inactif', value: 2 },
                        ]"
                    />
                    <Datepicker1 v-model="form.date" :min-date="moment().toDate()" label="Date événement" />
                    <div class="flex gap-3">
                        <Datepicker
                            v-model="form.start_at"
                            :error="errors.start_at"
                            time
                            min-time="07:00"
                            max-time="23:00"
                            label="Heure de début"
                        />
                        <Datepicker
                            v-model="form.end_at"
                            :error="errors.end_at"
                            time
                            :min-time="moment(form.start_at, 'HH:mm').add(1, 'hour').format('HH:mm')"
                            :max-time="'23:00'"
                            label="Heure de fin"
                            placeholder="Sélectionner l'heure"
                        />
                        <TextField
                            v-model="form.hour"
                            label="Heures"
                            class="min-w-[3rem] !px-1 text-center appearance-none"
                            type="number"
                            :max="17"
                            :min="1"
                            placeholder="0"
                            :error="errors.hour"
                        />
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <Listbox2
                            v-model="zoneSelected"
                            label="Zone"
                            input-class="bg-white shadow-none border !h-9"
                            placeholder="selectionner une zone"
                            :query="zonesQuery"
                            :show-search="false"
                            :default-value="defaultValues.zone"
                            clear
                            @open="!zonesQuery.data.length && zonesQuery.fetch()"
                            @change="handleChangeZone"
                        />
                        <Listbox2
                            :key="zoneSelected"
                            v-model="form.lieu_id"
                            label="Lieu"
                            input-class="bg-white line-clamp-1 text-nowrap shadow-none border !h-9"
                            placeholder="selectionner un lieu"
                            :disabled="!zoneSelected"
                            :default-value="defaultValues.lieu"
                            :error="errors.lieu_id"
                            :show-search="false"
                            :query="lieuxQuery"
                            clear
                            @change="handleChangeLieu"
                        />
                    </div>
                </article>
                <article class="flex-1 py-8 flex flex-col gap-3">
                    <Listbox2
                        v-slot="{ selectedItem }"
                        v-model="form.moniteur_id"
                        :query="monitorsQuery"
                        :error="errors.moniteur_id"
                        :default-value="defaultValues.moniteur"
                        placeholder="Selectionner moniteur"
                        label="Moniteur"
                        clear
                        input-class="border border-slate-400 py-1 pl-3 pr-8 shadow-sm rounded-xl h-14 flex items-center text-sm"
                    >
                        <ItemAvatar
                            :title="selectedItem.name"
                            :src="selectedItem.media || selectedItem.profile_photo_url"
                            :content="selectedItem.email"
                        />
                    </Listbox2>
                    <Listbox2
                        v-slot="{ selectedItem }"
                        v-model="form.eleve_id"
                        :query="elevesQuery"
                        :default-value="defaultValues.eleve"
                        :error="errors.eleve_id"
                        placeholder="Selectionner un élève"
                        label="Eleve"
                        input-class="border border-slate-400 py-1 pl-3 pr-8 shadow-sm rounded-xl h-14 flex items-center text-sm"
                        clear
                        @change:full="handleChangeEleve"
                    >
                        <ItemAvatar
                            :title="selectedItem.name"
                            :src="selectedItem.media || selectedItem.profile_photo_url"
                            :content="selectedItem.email"
                        />
                    </Listbox2>
                    <Listbox2
                        v-slot="{ selectedItem }"
                        :key="form.eleve_id"
                        v-model="form.product_id"
                        :error="errors.product_id"
                        :default-value="defaultValues.product"
                        :query="productQuery"
                        input-class="border border-slate-400 py-1 pl-3 pr-8 shadow-sm rounded-xl h-14 flex items-center text-sm"
                        placeholder="Selectionner produits"
                        label="Produit"
                        clear
                        @search="
                            productQuery.fetch(route(routes.api.soldes.getSoldesByEleve, form.eleve_id), {
                                search: $event,
                            })
                        "
                        @change:full="handleChangeProduct"
                    >
                        <ItemAvatar
                            :key="form.eleve_id"
                            :src="selectedItem?.media?.storage_media?.path"
                            :title="selectedItem?.name"
                            :content="selectedItem?.real_solde ? `Solde: ${selectedItem.real_solde} h` : ''"
                        />
                    </Listbox2>
                    <ColorField v-model="form.color" label="Couleur specifique" />
                </article>
            </section>
            <div class="flex flex-row justify-between p-4 bg-gray-100 text-right rounded-b-2xl">
                <Button secondary @click="close">Cancel</Button>
                <Button primary submit :loading="mutating">{{
                    isEdit && session.selectedSession?.id ? 'Modifier' : 'Enregistrer'
                }}</Button>
            </div>
        </form>
    </Modal>
</template>
