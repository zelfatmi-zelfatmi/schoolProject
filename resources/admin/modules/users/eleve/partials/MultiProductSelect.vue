<template>
    <Listbox v-model="selectedStatus" multiple>
        <div class="relative z-20">
            <ListboxButton
                class="relative w-full flex flex-nowrap items-center cursor-default rounded-full bg-white h-9 pl-3 pr-7 text-left shadow-sm border border-gray-300 focus:outline-none"
                :class="[inputClass, disabled ? 'pointer-events-none opacity-60 !shadow-none bg-slate-100' : '']"
            >
                <span v-if="selectedStatus?.length" class="mr-1">Products: </span>
                <span v-else class="opacity-60 text-sm">{{ placeholder }}</span>
                <div class="flex gap-0.5 overflow-x-auto overflow-y-clip scrollbar h-full items-center rounded-full">
                    <span
                        v-for="item in selectedStatus"
                        :key="item.id"
                        class="px-1 py-0.5 rounded-full text-white text-xs font-bold whitespace-nowrap h-4"
                        :class="item.color"
                    >
                        {{ item.shortName }}
                    </span>
                </div>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <span
                        v-if="!disabled"
                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                    >
                        <ChevronUpDownIcon aria-hidden="true" class="h-5 w-5 text-gray-400" />
                    </span>
                </span>
            </ListboxButton>

            <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <ListboxOptions
                    class="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white p-1.5 text-base shadow-lg focus:outline-none border"
                >
                    <ListboxOption
                        v-for="status in getFullStatusList()"
                        v-slot="{ active, selected }"
                        :key="status.name"
                        :value="status"
                        as="template"
                    >
                        <li
                            :class="[
                                active ? status.color : '',
                                'relative cursor-default select-none text-slate-700 hover:text-primary/70 py-1.5 rounded-lg pl-10 pr-4',
                            ]"
                        >
                            <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{
                                status.name
                            }}</span>
                            <span
                                v-if="selected"
                                class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"
                            >
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                            </span>
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </transition>
        </div>
    </Listbox>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/24/solid';
import { useParams } from '@shared/hooks/index.js';

const props = defineProps({
    fullList: Boolean,
    onlyList: Boolean,
    empty: Boolean,
    data: Object,
    placeholder: String,
    disabled: Boolean,
    inputClass: String,
    defaultSelectedValue: {
        type: [String, null],
        default: null,
    },
});

const params = useParams();

const emit = defineEmits(['change']);

const getFullStatusList = () => {
    if (props.fullList) {
        return [{ id: '', name: 'Tous les produits', color: 'bg-slate-100 hover:text-slate-700' }, ...props.data];
    }
    return props.data;
};
const getDefaultStatus = () => {
    const statusIds = params.status?.split(',') || [];
    return props.data?.filter(({ id }) => statusIds.includes(id));
};
const selectedStatus = ref(getDefaultStatus());

watch(selectedStatus, (value) => {
    const values = value.map((status) => status.id);
    emit('change', values);
});
</script>
