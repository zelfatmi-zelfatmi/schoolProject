<script setup>
import moment from 'moment-timezone';
import { watch } from 'vue';
import { Box, InlineError, Modal, RadioField, Spinner } from '@shared/components';
import { CheckCircleIcon, CheckIcon } from '@heroicons/vue/20/solid';
import { routes } from '@admin/routes';
import { ModalPageAction } from '@moniteur/components';
import { getMediaUrl } from '@shared/helpers';
import { ItemAvatar } from '@common/components';
import { PROPOSITION_ACTIVE, propositionSessionStatus } from '@common/constants';
import { useForm } from '@inertiajs/vue3';
import { useQuery } from '@shared/hooks';

const emit = defineEmits(['close']);

const props = defineProps({
    item: Object,
});

const form = useForm({
    status: props.item?.status || null,
    product_id: undefined,
});
const productQuery = useQuery(
    {
        transformable: true,
        // callback: (data = []) => data.map((item) => ({ ...item, ...item.product, real_solde: item.solde })),
    },
    props.item?.status === PROPOSITION_ACTIVE
);
const handleSubmitProposition = () => {
    form.post(route(routes.propositions.update, props.item?.id || '-'), {
        onSuccess: () => {
            form.reset();
            emit('close');
        },
    });
};
// const handleChangeStatus = (value) => {
//     if (props.item?.status !== value && value === PROPOSITION_ACTIVE && props.item?.eleve?.id) {
//         productQuery.fetch(route(routes.api.soldes.getSoldesByEleve, props.item?.eleve?.id));
//     }
//     // PROPOSITION_ACTIVE
// };
watch(
    () => props.item,
    (item) => {
        form.status = item?.status || null;
        form.defaults();
        if (item?.eleve?.id) {
            productQuery.fetch(route(routes.api.soldes.getSoldesByEleve, props.item?.eleve?.id));
        }
    }
);
</script>

<template>
    <Modal :show="!!item" title="Proposition details" max-width="sm" @close="$emit('close')">
        <form class="min-h-80" @submit.prevent="handleSubmitProposition">
            <ul v-if="item" class="flex flex-col gap-4 h-full p-3 pb-10">
                <li class="flex max-sm:flex-col md:items-center text-nowrap">
                    <h4 class="txet-xs font-medium text-gray-700 flex-1">Statut</h4>
                    <RadioField
                        v-model="form.status"
                        class="flex-1"
                        wrapper-class="flex gap-1"
                        item-class="bg-white"
                        :items="Object.values(propositionSessionStatus)"
                        :keys="['name', 'id']"
                        :disabled="form.processing"
                        :required="true"
                    />
                </li>
                <li>
                    <h4 class="txet-xs font-medium text-gray-700">Eleve</h4>
                    <Box sectionned padding="sm" class="!mb-0">
                        <ItemAvatar
                            :src="getMediaUrl(item.eleve?.user)"
                            size="w-12 h-12"
                            :title="item.eleve?.user?.name"
                            :content="item.eleve?.user?.email"
                            :phone="item.eleve?.user?.telephone"
                            :href="route(routes.users.eleve.general, item?.eleve.id)"
                        />
                    </Box>
                </li>
                <li v-if="form.status === PROPOSITION_ACTIVE">
                    <h4 class="txet-xs font-medium text-gray-700">List des Produits</h4>
                    <Box v-if="productQuery.fetching" sectionned>
                        <Spinner class="w-6 h-6 mx-auto" />
                    </Box>
                    <Box v-else sectionned class="!mb-0 divide-y" :separated="false" as="ul">
                        <li
                            v-for="pr in productQuery.data"
                            :key="pr.id"
                            :class="[
                                'p-2 t-3 btn-m flex justify-between items-center',
                                pr.product_id === form.product_id ? 'text-primary bg-primary/5 rounded-2xl' : '',
                                pr.solde === 0 ? 'opacity-70 pointer-events-none' : '',
                            ]"
                            @click="form.product_id = pr.product_id"
                        >
                            <ItemAvatar
                                :src="getMediaUrl(pr.product, true)"
                                size="w-8 h-8"
                                is-mobile
                                :title="pr.product?.name"
                                :content="`Solde: ${pr.solde}`"
                            />
                            <small v-if="pr.solde === 0">Indisponible</small>
                            <CheckCircleIcon
                                v-else-if="pr.product_id === form.product_id"
                                class="w-7 h-7 text-primary"
                            />
                        </li>
                    </Box>
                    <InlineError :errors="form.errors.product_id" />
                </li>
                <li>
                    <h4 class="txet-xs font-medium text-gray-700">Moniteur</h4>
                    <Box sectionned padding="sm" class="!mb-0">
                        <ItemAvatar
                            v-if="item.planning"
                            :src="getMediaUrl(item.planning.moniteur?.user)"
                            size="w-12 h-12"
                            :title="item.planning.moniteur?.user?.name"
                            :content="item.planning.moniteur?.user?.email"
                            :phone="item.planning.moniteur?.user?.telephone"
                            :href="route(routes.users.moniteur.edit, item.planning.moniteur.id)"
                        />
                    </Box>
                </li>
                <li class="grid md:grid-cols-2 gap-3">
                    <div class="flex flex-col">
                        <h4 class="txet-xs font-medium text-gray-700">Date de proposition</h4>
                        <div class="capitalize bg-black/10 text-black flex-center flex-col h-full rounded-xl py-3">
                            <span class="text-lg font-bold">
                                {{ moment(item.created_at).format('dddd DD MMMM yyyy') }}
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <h4 class="txet-xs font-medium text-gray-700">Date session</h4>

                        <div class="capitalize bg-primary/10 text-primary flex-center flex-col h-full rounded-xl py-3">
                            <div class="text-center">
                                <p class="text-lg font-bold">
                                    {{ moment(item.planning.date).format('dddd DD MMMM yyyy ') }}
                                </p>
                                <p class="text-xs font-medium text-primary/80">
                                    {{ item.planning.start_at + ' à ' + item.planning.end_at }}
                                </p>
                            </div>
                            <div class="block">
                                <span class="text-xs font-medium text-primary/80">
                                    {{ item.planning?.lieu?.zone?.name }}, {{ item.planning?.lieu?.name }}
                                </span>
                            </div>
                        </div>
                    </div>
                </li>

                <li>
                    <h4 class="txet-xs font-medium text-gray-700">Commentaire</h4>
                    <p class="max-w-lg line-clamp-2 w-full text-xs text-gray-500">
                        {{ item.comment }}
                    </p>
                </li>
            </ul>
            <ModalPageAction
                class="!relative md:!bottom-0 md:!rounded-none md:!border-none md:!max-w-none"
                apply
                closed
                :loading="form.processing"
                :disabled="!form.isDirty"
                submit
                :icon="CheckIcon"
                :text="`Appliquer le changement`"
                @close="$emit('close')"
            />
        </form>
    </Modal>
</template>
