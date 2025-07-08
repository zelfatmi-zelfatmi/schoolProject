<script setup>
import { routes } from '@admin/routes';
import {
    Box,
    Button,
    InlineConfirmation,
    Listbox,
    Page,
    StatusBadge,
    Table,
    Thumb,
    WapperMenu,
} from '@shared/components';
import { useQuery, useStatusSwitch } from '@shared/hooks';
import { dateFormat, getMediaUrl } from '@shared/helpers';
import { SoldeTypeEnum } from '@shared/constants';
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';
import { MinusCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/20/solid';
import { breadcumb, pagesBadges, pagesNavigation } from './fishPerso';

const props = defineProps({
    soldes: {
        type: Object,
        default: () => ({}),
    },
    user: {
        type: Object,
        default: () => ({}),
    },
});

const searchQuery = ref({
    zone: '',
});
const zoneSelected = ref(null);
const inProgress = ref(false);
const deletingZone = ref(false);
const headings = [
    { name: 'Produit', className: 'text-start font-normal px-2 rounded-xl py-2' },
    // { name: 'Quantité', className: 'text-center font-normal' },
    { name: 'Solde', className: 'text-center font-normal' },
    { name: 'Status', className: 'text-center font-normal' },
    { name: 'Date de creation', className: 'text-center font-normal rounded-xl' },
];
const zones = useQuery({
    url: route(routes.api.zones.list),
    key: 'zones',
});
const handleFetchZones = (search = '', refetch = false, loadmore = false) => {
    if (zones.data?.length && !refetch) {
        return;
    }
    zones.fetch('', { search }, loadmore);
};

const addZone = () => {
    if (zoneSelected.value && !props.user?.eleve?.zones.some((zone) => zone.id === zoneSelected.value)) {
        inProgress.value = true;
        router.post(
            route(routes.configuration.zones.attach, props.user?.eleve?.id),
            { zone_id: zoneSelected.value },
            {
                onFinish: () => (inProgress.value = false),
            }
        );
    }
};
const removeZone = (id) => {
    deletingZone.value = true;
    router.post(
        route(routes.configuration.zones.detach, props.user?.eleve?.id),
        { zone_id: id },
        {
            onFinish: () => (deletingZone.value = false),
        }
    );
};
</script>

<template>
    <Page
        :breadcumb="[...breadcumb, { name: 'Solde & zone' }]"
        :badges="pagesBadges(user)"
        :title="user?.name"
        width="2xl"
    >
        <WapperMenu :nav-items="pagesNavigation(user.eleve.id)">
            <Box class="grid lg:grid-cols-2 gap-x-8 gap-y-3" sectionned padding>
                <div class="flex gap-5 items-start justify-between w-full px-2 lg:border-r-2">
                    <Listbox
                        v-model="zoneSelected"
                        label="Zones"
                        class="min-w-[12rem]"
                        placeholder="selectionner une zone"
                        :items="zones.data || []"
                        :keys="['name', 'id']"
                        :fetching="zones.fetching"
                        :fetching-more="zones.fetchingMore"
                        ssr
                        @change="handleFetchZones"
                        @open="handleFetchZones"
                        @search="handleFetchZones($event, true)"
                        @scroll:end="handleFetchZones(searchQuery.zone, true, true)"
                    />
                    <Button
                        primary
                        class="px-6 mx-0 mt-6"
                        :disabled="!zoneSelected"
                        :loading="inProgress"
                        @click="addZone"
                    >
                        Ajoute
                    </Button>
                </div>
                <div class="flex flex-col justify-between px-2">
                    <span class="text-xs text-gray-500">Les zones d'eleve</span>
                    <ul v-if="user?.eleve?.zones.length" class="flex gap-3 mt-2 flex-wrap">
                        <li
                            v-for="zone in user?.eleve?.zones"
                            :key="zone.id"
                            class="relative group text-sm w-fit rounded-full font-semibold"
                        >
                            <div
                                class="flex items-center rounded-full from-green-100 to-green-50 text-green-600 bg-gradient-to-tl pl-3 pr-4 py-1"
                            >
                                {{ zone.name }}
                                <InlineConfirmation
                                    class="!-mr-6"
                                    :loading="deletingZone"
                                    @confirm="removeZone(zone.id)"
                                >
                                    <MinusCircleIcon
                                        title="retire zone"
                                        class="w-5 text-slate-300 group-hover:text-red-600 duration-300 cursor-pointer"
                                    />
                                </InlineConfirmation>
                            </div>
                        </li>
                    </ul>
                    <div v-else class="flex items-end gap-3 text-xs">
                        <ExclamationCircleIcon class="w-5" />
                        <span> Aucun zone trouvé </span>
                    </div>
                </div>
            </Box>
            <Box class="!p-0 mt-3" sectionned padding>
                <Table v-slot="{ item }" :headings="headings" :is-loading="false" :items="soldes">
                    <td class="cell">
                        <div class="flex gap-3">
                            <Thumb :src="getMediaUrl(item.product, true)" class="w-16" />
                            <div class="flex-1">
                                <b>
                                    {{ item.product?.name }}
                                </b>
                                <p
                                    class="line-clamp-2 max-w-xs whitespace-break-spaces"
                                    v-html="item.product?.description"
                                ></p>
                            </div>
                        </div>
                    </td>
                    <!-- <td class="cell text-center">
                        {{ item.cart_items_sum_quantity || 1 }}
                    </td> -->
                    <td class="cell text-center">
                        {{ item.solde }}
                    </td>
                    <td class="cell text-center">
                        <StatusBadge
                            :id="parseInt(item.status)"
                            :attr="SoldeTypeEnum"
                            :name="useStatusSwitch(SoldeTypeEnum, parseInt(item.status))"
                        >
                            {{ useStatusSwitch(SoldeTypeEnum, parseInt(item.status)) }}
                        </StatusBadge>
                    </td>
                    <td class="cell capitalize">
                        <div class="flex flex-col justify-center items-center">
                            <span>{{ item.created_at && dateFormat(item.created_at, 'lettre') }}</span>
                            <span>{{ item.created_at && dateFormat(item.created_at, 'time') }}</span>
                        </div>
                    </td>
                </Table>
            </Box>
        </WapperMenu>
    </Page>
</template>
