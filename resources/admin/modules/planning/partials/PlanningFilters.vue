<script setup>
import { onMounted, ref, watch } from 'vue';
import { Listbox2, Popover } from '@shared/components';
import { usePlanningSession, usePlannings } from '@admin/stores';
import { ItemAvatar } from '@common/components';
import { Switch } from '@headlessui/vue';
import { usePlanningsMixinFilters } from '../PlanningMixin';
import { routes } from '@admin/routes';
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
const zoneSelected = ref(null);
const lieuSelected = ref(null);

const session = usePlanningSession();
const plannings = usePlannings();
const { monitorsQuery, elevesQuery, zonesQuery, lieuxQuery } = usePlanningsMixinFilters(props);

const handleSelectedMonitorsChange = (items) => {
    session.selectedMonitors = items;
    plannings.getPlannings();
};
const handleSelectedEleveChange = (item) => {
    session.selectedEleve = item;
    plannings.getPlannings();
};
const handleDisponibilityChange = (value) => {
    console.log("hello val ",value)
    session.disp = value;
    plannings.getPlannings();
};
const handleSelectedLieuChange = (value) => {
    session.lieu_id = value;
    monitorsQuery.params.lieu_id = value;
    monitorsQuery.fetch();
    plannings.getPlannings();
};

const handleChangeZone = (zoneId) => {
    session.zone_id = zoneId;
    monitorsQuery.params.zone_id = zoneId;
    lieuSelected.value = null;
    zoneSelected.value && lieuxQuery.fetch(route(routes.api.zones.lieux.list, zoneId));
    monitorsQuery.fetch();
    plannings.getPlannings();
};
onMounted(() => {
    handleDisponibilityChange(1);
});

watch(
    () => zoneSelected.value,
    (zone) => {
        if (!zone) {
            lieuxQuery.data = [];
            handleSelectedLieuChange(null);
        }
    }
);

</script>
<template>
<ul class="flex flex-nowrap gap-3 p-3 border-b bg-slate-100 w-full">
    <li class="flex-1 flex gap-3">
            <Listbox2
                v-model="zoneSelected"
                :query="zonesQuery"
                is-filter
                clear
                placeholder="selectionner une zone"
                @change="handleChangeZone"
                @open="!zonesQuery.data.length && zonesQuery.fetch()"
            />
            <Listbox2
                :key="zoneSelected"
                v-model="lieuSelected"
                :query="lieuxQuery"
                :disabled="!zoneSelected"
                is-filter
                clear
                placeholder="selectionner un lieu"
                @change="handleSelectedLieuChange($event)"
            />
        </li>
        <li class="flex-1 flex gap-3 justify-center">
            <Listbox2
                v-model="session.selectedMonitors"
                :query="monitorsQuery"
                is-filter
                placeholder="Selectionner moniteur"
                prefix="Moniteurs"
                clear
                multiple
                :max="3"
                @change:full="handleSelectedMonitorsChange"
            >
                <template #selectedItems="{ selectedItems }">
                    <div class="flex">
                        <Popover v-for="(item, index) in selectedItems" :key="index" hoverable position="top">
                            <template #default>
                                <img
                                    :src="item.media || item.profile_photo_url"
                                    :alt="item.name"
                                    class="w-6 h-6 object-cover rounded-full border border-slate-400 ring ring-white block"
                                />
                            </template>
                            <template #content>
                                <ItemAvatar
                                    :title="item.name"
                                    :src="item.media || item.profile_photo_url"
                                    :content="item.email"
                                    :phone="item.telephone"
                                />
                            </template>
                        </Popover>
                    </div>
                </template>
            </Listbox2>
            <Listbox2
                v-model="session.selectedEleve"
                :query="elevesQuery"
                placeholder="Selectionner un élève"
                prefix="Eleve"
                is-filter
                clear
                multiple
                :max="3"
                @change:full="handleSelectedEleveChange($event)"
            >
                <template #selectedItems="{ selectedItems }">
                    <div class="flex">
                        <Popover v-for="(item, index) in selectedItems" :key="index" position="top" hoverable>
                            <template #default>
                                <img
                                    :src="item.media || item.profile_photo_url"
                                    :alt="item.name"
                                    class="w-6 h-6 object-cover rounded-full border border-slate-400 ring ring-white block"
                                />
                            </template>
                            <template #content>
                                <ItemAvatar
                                    :title="item.name"
                                    :src="item.media || item.profile_photo_url"
                                    :content="item.email"
                                    :phone="item.telephone"
                                />
                            </template>
                        </Popover>
                    </div>
                </template>
            </Listbox2>
        </li>

<li class="flex-1 flex justify-end">
    <div class="flex rounded-full overflow-hidden border border-gray-300">
  <button 
    :class="session.disp === 1 ? 'bg-primary text-white' : 'bg-white text-black'" 
    @click="handleDisponibilityChange(1)" 
    class="px-4 py-1 text-xs border-r border-gray-300"
  >
    Planning
  </button>
  <button 
    :class="session.disp === 0 ? 'bg-primary text-white' : 'bg-white text-black'" 
    @click="handleDisponibilityChange(0)" 
    class="px-4 py-1 text-xs border-r border-gray-300"
  >
    Dispo
  </button>
  <button 
    :class="session.disp === 2 ? 'bg-primary text-white' : 'bg-white text-black'" 
    @click="handleDisponibilityChange(2)" 
    class="px-4 py-1 text-xs"
  >
    Mixte
  </button>
</div>

</li>

    </ul>
</template>
