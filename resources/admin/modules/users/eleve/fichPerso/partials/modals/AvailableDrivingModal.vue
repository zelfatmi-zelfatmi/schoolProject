<script setup>
import { Modal, Button, Listbox, Listbox2 } from '@shared/components';
import { useMutation, useQuery } from '@shared/hooks';
import { routes } from '@admin/routes';
import { ItemAvatar } from '@common/components';
import { ref } from 'vue';
import { moneyFormat } from '@shared/helpers';

const props = defineProps({
    data: {
        type: [null, Object],
        default: null,
    },
});
const emit = defineEmits(['close', 'refresh']);
const { errors, form, mutate, mutating } = useMutation({
    eleve_id: props.data?.eleve_id || null,
    date: props.data?.date || null,
    start_at: props.data?.start_at || null,
    hour: 1,
    end_at: props.data?.end_at || null,
    is_active: props.data?.is_active || 1,
    moniteur_id: null,
    product_id: null,
    lieu_id: null,
});
const zonesQuery = useQuery(
    {
        url: route(routes.api.zones.list),
        key: 'zones',
    },
    true
);
const lieuxQuery = useQuery({
    transformable: true,
    callback: (data = []) => data.map((item) => ({ ...item, ...item.data })),
});
const monitorsQuery = useQuery(
    {
        url: route(routes.api.moniteurs.all),
        init: { data: props.data?.moniteurs || [] },
        transformable: true,
        callback: (data = []) => data.map((item) => ({ ...item, ...item.moniteur })),
    },
    !props.data?.moniteurs?.length
);

const productQuery = useQuery(
    {
        url: route(routes.api.soldes.getSoldesByEleve, props.data?.eleve_id || '0'),
        transformable: true,
        callback: (data = []) => data.map((item) => ({ ...item, ...item.product, real_solde: item.solde })),
    },
    true
);
const zoneSelected = ref(null);

const close = () => {
    emit('close');
};
/**
 * Handle fetching the monitor data.
 *
 * @param {string} search - the search query for filtering
 * @param {boolean} refetch - whether to force a data refresh
 * @param {boolean} loadmore - whether to load more data
 * @return {void}
 */
const handleFetchMonitor = (search = '', refetch = false, loadmore = false) => {
    if (monitorsQuery.data?.length && !refetch) {
        return;
    }
    monitorsQuery.fetch('', { search }, loadmore);
};

/**
 * Function to handle fetching zones.
 *
 * @param {string} search - the search string
 * @param {boolean} refetch - whether to force a refetch
 * @param {boolean} loadmore - whether to load more data
 * @return {void}
 */
const handleFetchZones = (search = '', refetch = false, loadmore = false) => {
    if (zonesQuery.data?.length && !refetch) {
        return;
    }
    zonesQuery.fetch('', { search }, loadmore);
};

/**
 * Handle change in zone selection.
 *
 * @param {number} zoneId - The id of the selected zone
 * @return {void}
 */
const handleChangeZone = (zoneId) => {
    form.lieu_id = null;
    zoneSelected.value && lieuxQuery.fetch(route(routes.api.zones.lieux.list, zoneId));
};

/**
 * Function for handling form submission.
 *
 * @return {void}
 */
const handleSubmit = () => {
    mutate(route(routes.api.reservation.store), 'post').then(() => {
        emit('refresh');
        close();
    });
    // zoneSelected.value && lieuxQuery.fetch(route(routes.api.zones.lieux.list, zoneSelected.value));
};
</script>
<template>
    <Modal
        :show="!!data"
        max-width="sm"
        title="Reservation Session"
        :subtitle="`Pour le session de ${data?.start_at || '12:00'}h à ${data?.end_at || '12:00'}h`"
        :scrollable="false"
        @close="close"
    >
        <form class="contents" @submit.prevent="handleSubmit">
            <div class="px-3 pt-5 pb-8 gap-5 min-w-[27rem] border-b border-slate-400 bg-white flex-1 h-full space-y-4">
                <Listbox
                    v-model="zoneSelected"
                    label="Zone"
                    input-class="bg-white shadow-none border !h-9"
                    placeholder="selectionner une zone"
                    :items="zonesQuery.data || []"
                    :keys="['name', 'id']"
                    :fetching="zonesQuery.fetching"
                    :fetching-more="zonesQuery.fetchingMore"
                    ssr
                    clear
                    @change="handleChangeZone"
                    @search="handleFetchZones($event, true)"
                    @scroll:end="handleFetchZones($event, true, true)"
                />
                <Listbox
                    :key="zonesQuery.fetching"
                    v-model="form.lieu_id"
                    label="Lieu"
                    input-class="bg-white shadow-none border !h-9"
                    placeholder="selectionner un lieu"
                    :disabled="!zoneSelected"
                    :error="errors.lieu_id"
                    :keys="['name', 'id']"
                    :show-search="false"
                    :fetching="lieuxQuery.fetching"
                    :items="lieuxQuery.data || []"
                    ssr
                    clear
                />
                <div class="grid md:grid-cols-2 gap-3">
                    <Listbox
                        v-slot="{ selectedItem }"
                        v-model="form.moniteur_id"
                        :items="monitorsQuery.data"
                        :error="errors.moniteur_id"
                        input-class="border border-slate-300 py-1 pl-3 pr-8 shadow-sm rounded-lg min-h-[2.25rem] flex items-center text-sm"
                        placeholder="Selectionner moniteur"
                        label="Moniteur"
                        ssr
                        clear
                        :keys="['name', 'id']"
                        :fetching="monitorsQuery.fetching"
                        :fetching-more="monitorsQuery.fetchingMore"
                        @search="handleFetchMonitor($event, true)"
                        @scroll:end="handleFetchMonitor($event, true, true)"
                    >
                        <ItemAvatar
                            class="-ml-2"
                            :title="selectedItem.name"
                            :src="selectedItem.profile_photo_url"
                            :content="selectedItem.email"
                        />
                    </Listbox>
                    <Listbox2
                        v-slot="{ selectedItem }"
                        v-model="form.product_id"
                        :error="errors.product_id"
                        :query="productQuery"
                        input-class="border border-slate-300 py-1 pl-3 pr-8 shadow-sm rounded-lg min-h-[2.25rem] flex items-center text-sm"
                        placeholder="Selectionner produits"
                        label="Produit"
                        clear
                    >
                        <ItemAvatar
                            class="-ml-2"
                            :src="selectedItem?.media?.storage_media?.path"
                            :title="selectedItem?.name"
                            :content="moneyFormat(selectedItem.real_solde)"
                        />
                    </Listbox2>
                </div>
            </div>
            <div class="flex flex-row justify-between p-4 text-right flex-shrink-0 h-fit">
                <Button link dark @click="close">Fermer</Button>
                <Button info submit :loading="mutating">Modifier</Button>
            </div>
        </form>
    </Modal>
</template>
