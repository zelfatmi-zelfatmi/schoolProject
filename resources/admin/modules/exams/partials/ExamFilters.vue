<script setup>
import { IndexFilters, Listbox2 } from '@shared/components';
import { useExams } from '../Exams';
import { productEtat } from '@common/constants';
import { useEvents, useParams } from '@shared/hooks';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/20/solid';
import { reactive } from 'vue';
const sortOptions = ['asc', 'desc'];
const params = useParams({ reload: true, events: true });
const event = useEvents();
const { monitorsQuery, elevesQuery, operatorsQuery } = useExams({ isMounted: true });
const state = reactive({
    date_pp: params.date_pp || sortOptions[0],
});
const handleSort = () => {
    state.date_pp = state.date_pp === sortOptions[0] ? sortOptions[1] : sortOptions[0];
    event.emit('table:filter:loading', { value: true });
    params.update({ date_pp: state.date_pp }, () => {
        event.emit('table:filter:loading', { value: false });
    });
};
</script>

<template>
    <div>
        <IndexFilters>
            <Listbox2
                is-filter
                :items="Object.values(productEtat)"
                :default-value="productEtat[params?.type] || ''"
                :show-search="false"
                prefix="Etat"
                clear
                placeholder="Selectionner un etat"
                @change="params.update({ type: $event })"
            />
            <Listbox2
                :query="monitorsQuery"
                placeholder="Selectionner moniteur"
                is-filter
                prefix="Moniteur"
                clear
                @change="params.update({ moniteur_id: $event })"
                @open="monitorsQuery.fetch()"
            />
            <Listbox2
                :query="elevesQuery"
                placeholder="Selectionner un eleve"
                is-filter
                prefix="Eleve"
                clear
                @change="params.update({ eleve_id: $event })"
                @open="elevesQuery.fetch()"
            />
            <Listbox2
                :query="operatorsQuery"
                placeholder="Selectionner un operateur"
                prefix="Operateur"
                is-filter
                clear
                @change="params.update({ user_id: $event })"
                @open="operatorsQuery.fetch()"
            />
            <button
                class="btn !p-0 ml-auto flex border border-gray-300 w-9 h-9 rounded-xl shadow-sm"
                @click="handleSort"
            >
                <ArrowDownIcon
                    :class="['-mr-1', state.date_pp === sortOptions[0] ? 'text-primary' : 'text-gray-444']"
                />
                <ArrowUpIcon :class="['-ml-1', state.date_pp === sortOptions[1] ? 'text-primary' : 'text-gray-444']" />
            </button>
        </IndexFilters>
    </div>
</template>
