<script setup>
import {Datepicker, EmptyState, InlineError, Listbox, Scrollable} from '@shared/components';
import {routes} from '@admin/routes';
import {useForm} from '@inertiajs/vue3';
import {InlineActions, ItemAvatar} from '@common/components';
import {getMediaUrl, moneyFormat} from '@shared/helpers';
import {useQuery} from '@shared/hooks';
import {CheckCircleIcon, MagnifyingGlassCircleIcon, XMarkIcon} from '@heroicons/vue/20/solid';
import {computed} from 'vue';

const emit = defineEmits(['close']);
const form = useForm({
    eleve_id: null,
    product_id: null,
    start_at: null,
    end_at: null,
});
const productQuery = useQuery(
    {
        url: route(routes.api.products.list),
        transformable: true,
        params: {
            is_cpf: 1,
            archived: 0,
        },
    },
    true
);
console.log(productQuery);

const elevesQuery = useQuery(
    {
        url: route(routes.api.eleves.all, {'new_cpf': true}),
        transformable: true,
        callback: (data = []) => data.map((item) => ({...item, ...item.eleve})),
    },
    true
);

const handleFetchEleve = (search = '', refetch = false, loadmore = false) => {
    if (elevesQuery.data?.length && !refetch) {
        return;
    }
    elevesQuery.fetch('', { search }, loadmore);
};

const submit = () => {
    form.post(route(routes.cpf.store), {
        preserveScroll: true,
        onSuccess: onClose,
    });
};
const onClose = () => {
    form.reset();
    emit('close');
};
const actions = computed(() => [
    {
        label: 'Enregister CPF',
        primary: true,
        submit: true,
        disabled: form.processing || !form.isDirty,
        loading: form.processing,
        onClick: submit,
    },
    {
        label: 'Rejeter',
        disabled: form.processing,
        secondary: true,
        onClick: onClose,
    },
]);
</script>

<template>
    <form class="flex flex-col h-full" @submit.prevent="submit">
        <article class="p-4 bg-white shadow-down">
            <div class="flex justify-between items-center">
                <h2 class="text-xl font-bold">L'ajout de CPF</h2>
                <XMarkIcon class="h-7 w-7 p-0.5 text-gray-500 cursor-pointer btn-m" @click="onClose" />
            </div>
        </article>
        <article class="flex-1 p-4 flex flex-col gap-5">
            <div class="gap-5">
                <Datepicker v-model="form.start_at" :error="form.errors.start_at" label="Date début" />
                <Datepicker v-model="form.end_at" :error="form.errors.end_at" label="Date fin" />
            </div>
            <Listbox
                v-slot="{ selectedItem }"
                v-model="form.eleve_id"
                :items="elevesQuery.data"
                :error="form.errors.eleve_id"
                input-class="border border-slate-400 py-1 pl-3 pr-8 bg-white shadow-sm rounded-xl h-14 flex items-center text-sm"
                placeholder="Selectionner un élève"
                label="Eleve"
                ssr
                clear
                :keys="['name', 'id']"
                :fetching="elevesQuery.fetching"
                :fetching-more="elevesQuery.fetchingMore"
                @search="handleFetchEleve($event, true)"
                @scroll:end="handleFetchEleve(searchQuery.product, true, true)"
            >
                <ItemAvatar
                    class="-ml-2"
                    :title="selectedItem.name"
                    :src="selectedItem.media || selectedItem.profile_photo_url"
                    :content="selectedItem.email"
                />
            </Listbox>
            <Scrollable>
                <span class="block font-medium text-xs text-gray-600 mb-1">Forfait:</span>
                <ul
                    v-if="productQuery.data.length"
                    class="min-h-60 flex flex-col divide-y rounded-xl bg-white shadow-sm"
                >
                    <li
                        v-for="item in productQuery.data"
                        :key="item.id"
                        class="pr-10 relative p-2 hover:bg-slate-50 btn-m"
                        @click="form.product_id = item.id"
                    >
                        <ItemAvatar
                            is-mobile
                            :src="getMediaUrl(item, true)"
                            :title="item?.name"
                            size="w-10 h-10"
                            :content="`prix: ${moneyFormat(item.prix)}`"
                        />
                        <CheckCircleIcon
                            v-if="item.id === form.product_id"
                            class="absolute top-1/2 -mt-3 right-3 h-6 w-6 text-green-500"
                        />
                    </li>
                </ul>
                <EmptyState
                    v-else-if="!productQuery.fetching"
                    title="Aucun produit trouvé"
                    class="min-h-60 flex flex-col justify-center"
                    :image="MagnifyingGlassCircleIcon"
                >
                    <p v-if="form.eleve_id">Il n'y a aucun produit trouvé.</p>
                    <p v-else>voulez vous selectionnez une eleve.</p>
                </EmptyState>
                <InlineError :errors="form.errors.product_id" />
            </Scrollable>
        </article>
        <InlineActions :actions="actions" class="px-4 py-3 bg-white shadow-up" />
    </form>
</template>
