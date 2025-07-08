<template>
    <section :key="state.refreshComp" class="text-sm border-b">
        <article v-if="tabsList.length" class="flex gap-2 py-2 px-2 border-b items-center">
            <div class="sm:hidden flex-1">
                <label for="tabs" class="sr-only">Select a tab</label>
                <select
                    id="tabs"
                    v-model="tabSelected"
                    name="tabs"
                    class="block w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    @change="handleTabChange($event.target.value)"
                >
                    <option v-for="tab in tabsList" :key="tab.name" :value="tab.id" :selected="tabSelected === tab.id">
                        {{ tab.name }}
                    </option>
                </select>
            </div>
            <div class="hidden sm:block relative z-1 flex-1">
                <nav class="flex gap-x-px tracking-tight" aria-label="Tabs">
                    <div
    v-for="tab in tabsList"
    :key="tab.name"
    :class="[ 
        tabSelected === `${tab.key}:${tab.id}`
            ? 'bg-gradient-to-tr from-primary to-orange-100 text-white shadow-sm'
            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-80',
        'rounded-xl px-3 py-1.5 text-sm font-medium flex group relative cursor-pointer active:scale-95 t-2',
    ]"
    :aria-current="tabSelected === `${tab.key}:${tab.id}` ? 'page' : undefined"
    @click="handleTabChange(tab.id, tab)"
>
                        {{ tab.name }}
                        <Popover v-if="tab.isCustom" :arrow="false" position="bottom" :offset="16">
                            <ChevronDownIcon
                                class="h-5 w-0 -mr-3 opacity-0 transition-all group-hover:w-5 group-hover:opacity-100 group-hover:ml-2"
                            />
                            <template #content>
                                <div class="flex flex-col px-1 py-1 gap-2 min-w-40">
                                    <Button info link :icon="PencilIcon" @click.stop="handleRenameTab(tab)">
                                        Renommer
                                    </Button>
                                    <Button danger link :icon="TrashIcon" @click.stop="handleDeleteTab(tab)">
                                        Supprimer
                                    </Button>
                                </div>
                            </template>
                        </Popover>
                    </div>
                </nav>
            </div>
            <Button v-if="state.reset && tabsList.length" link class="h-8 text-xs" @click="handlClear">
                Réinitialiser
            </Button>
        </article>
        <article v-if="!noSearch" class="flex gap-3 px-2 items-center">
            <div class="relative py-2 rounded-full flex-1 flex">
                <Spinner v-if="state.isloading" class="w-5 fill-primary absolute right-[38px] top-4" />
                <button
                    v-else-if="search"
                    :class="{ 'opacity-0': !state.isInputFocused && !search }"
                    type="button"
                    class="absolute right-8 top-4"
                    @click="handleSearch('')"
                >
                    <XCircleIcon class="h-5 pr-1.5 opacity-70 border-gray-300 fill-current" />
                </button>
                <input
                    ref="inputSearchRef"
                    v-model="search"
                    type="text"
                    name="search"
                    :placeholder="placeholder || 'Recherche'"
                    class="bg-slate-200/70 focus:ring-black block w-full rounded-xl border-0 py-1.5 px-3 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    @focus="state.isInputFocused = true"
                    @blur="state.isInputFocused = false"
                    @input="handleDebounceSearch(search)"
                />
                <button
                    type="button"
                    class="btn-m flex-center h-7 w-7 rounded-lg btn p-0 btn-dark absolute right-1 top-1/2 transform -translate-y-1/2"
                    @click="handleSearch(search)"
                >
                    <MagnifyingGlassIcon class="w-5" />
                </button>
            </div>
            <Button v-if="state.reset && !tabsList.length" link class="h-8 text-xs" @click="handlClear">
                Réinitialiser
            </Button>
            <Button v-if="search" info link class="text-xs" @click="tabState.show = true"> Enregistrer Filtre </Button>
        </article>
        <article v-if="showFilters || options.showSlot" class="border-t p-3 flex items-center gap-3 flex-wrap">
            <slot />
        </article>
        <Modal :show="tabState.show" max-width="sm" title="Enregister tab" @close="tabState.show = false">
            <div class="p-10 border-t bg-white">
                <TextField v-model="tabState.field" label="Nom tab " />
                <p></p>
            </div>

            <div class="flex gap-3 justify-end p-3 border-t">
                <Button secondary @click="tabState.show = false"> Annuler </Button>
                <Button dark :disabled="!tabState.field" @click="handleAddOrEditTab">
                    {{ tabState.edit ? 'Renommer' : 'Ajouter' }}
                </Button>
            </div>
        </Modal>
    </section>
</template>

<script setup>
import { computed, onUnmounted, reactive, ref, useSlots, watch } from 'vue';
import { ChevronDownIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon, XCircleIcon } from '@heroicons/vue/20/solid';
// import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { router, usePage } from '@inertiajs/vue3';
import { useDebounce, useEvents, useParams, useStorage } from '@shared/hooks';
import { Button, Modal, Popover, Spinner, TextField } from '@shared/components';

const emit = defineEmits(['change', 'load']);
const props = defineProps({
    options: {
        type: Object,
        default: () => ({}),
    },
    defaultTab: [String, Number],
    tabs: {
        type: Array,
        default: () => [],
    },
    keyTab: {
        type: String,
        default: 'archived',
    },
    noSearch: Boolean,
    api: Boolean,
    placeholder: String,
});
const events = useEvents();
const page = usePage();
const pathname = window.location.pathname;
const tabsStorageKey = 'tabs-' + pathname;
const debounce = useDebounce(800);
const [storage, setStorage, , getRefreshedValue] = useStorage(tabsStorageKey);
const params = useParams({ reload: !props.api });
const tabsList = ref([...props.tabs, ...(storage.value || [])]);
const defaultCustomKeyValue = tabsList.value.find((el) => el.key && params[el.key]) || {};

const tabSelected = ref(`${props.keyTab}:${props.defaultTab || ''}`);
const search = ref(params.search);
const showFilters = computed(() => useSlots().default);
const tabState = reactive({
    show: false,
    field: '',
    edit: null,
});

const state = reactive({
    reset: Object.values(params.getUrlParams()).length,
    isloading: false,
    refreshComp: performance.now(),
    isInputFocused: false,
});
const handleAddOrEditTab = () => {
    if (tabState.edit) {
        const storageList = getRefreshedValue() || [];
        const indexList = tabsList.value.findIndex(({ id }) => id === tabState.edit.id);
        const indexStorage = storageList.findIndex(({ id }) => id === tabState.edit.id);
        indexList > -1 && (tabsList.value[indexList].name = tabState.field);
        if (indexStorage > -1) {
            storageList[indexStorage].name = tabState.field;
            setStorage(storageList);
        }
    } else {
        const res = {
            name: tabState.field,
            // !!! deprecated
            // id: `search|${search.value}`,
            id: location.href,
            isCustom: true,
        };
        setStorage([...(getRefreshedValue() || []), res]);
        tabsList.value = [...tabsList.value, res];
    }
    tabState.show = false;
    tabState.field = '';
    tabState.edit = null;
};
const handleDeleteTab = (value) => {
    const listStored = getRefreshedValue() || [];
    tabsList.value = tabsList.value.filter(({ id, name }) => id !== value.id && name !== value.name);
    setStorage(listStored.filter(({ id, name }) => id !== value.id && name !== value.name));
    handlClear();
};
const handleRenameTab = (value) => {
    tabState.edit = value;
    tabState.show = true;
    tabState.field = value.name;
};
const handlClear = () => {
    tabSelected.value = props.defaultTab || '';
    state.isloading = true;
    search.value = '';
    events.emit(events.keys.table.loading, { value: true });
    router.replace(pathname, {
        onFinish: () => {
            state.refreshComp = performance.now();
            events.emit(events.keys.table.loading, { value: false });
            state.isloading = false;
        },
    });
};
const handleSearch = (value) => {
    search.value = value;
    if (props.api) {
        emit('change', {
            search: value,
            [props.keyTab]: tabSelected.value,
        });
        return;
    }
    state.isloading = true;
    events.emit(events.keys.table.loading, { value: true });
    params.update({ search: value }, () => {
        state.isloading = false;
        events.emit(events.keys.table.loading, { value: false });
    });
};
const handleDebounceSearch = debounce(handleSearch);
watch(
    () => page.props,
    () => {
        state.reset = Object.values(params.getUrlParams()).length;
    }
);
const handleTabChange = (id, tab = {}) => {
    tabSelected.value = `${tab.key}:${id}`; // Onglet actif basé sur key:id
    search.value = ''; // Réinitialise la recherche
    emit('load', true);

    events.emit('table:selected:clear');
    emit('change', { [tab.key]: id }); // Envoie uniquement le `id` au serveur

    if (props.api) return;

    state.isloading = true;
    let payload = {};
    events.emit(events.keys.table.loading, { value: true });

    if (String(id)?.includes('http')) {
        payload = params.getUrlParams(new URL(id).search);
    } else {
        payload[tab.key] = id;
    }

    params.update(
        payload,
        () => {
            emit('load', false);
            state.isloading = false;
            events.emit(events.keys.table.loading, { value: false });
        },
        true
    );
};

onUnmounted(() => {
    events.off(events.keys.table.loading, () => {});
});
</script>
