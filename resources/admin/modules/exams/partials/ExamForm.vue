<script setup>
import { Box, Datepicker, Listbox2, TabSwitch, TextField } from '@shared/components';
import { routes } from '@admin/routes';
import { computed } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { usePage } from '@shared/stores';
import { InlineActions, ZoneLieu } from '@common/components';
import { EXAM_LIST_ATTENTE, EXAM_RSULTS, EXAM_RESULT_ADMIS, useExams } from '../Exams';
import SelectCombine from './SelectCombine.vue';
import { examenStatusForfais } from '@admin/constants';
const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
    actions: Array,
    isEdit: Boolean,
    isPreList: Boolean,
    isPassage: Boolean,
    uuid: String,
});

const page = usePage();
const { monitorsQuery, onFetchMoniteur, operatorsQuery } = useExams({ isMounted: true });

const tabsYesNo = [
    { id: true, name: 'Oui', color: 'bg-green-500' },
    { id: false, name: 'Non', color: 'bg-red-500' },
];
// const tabsStatus = [examStatus[EXAM_LIST_ATTENTE], examStatus[EXAM_PRE_LIST]];
const formData = props.isPassage
    ? {
          result_permis: props.data?.result_permis || EXAM_RESULT_ADMIS,
          moniteur_id: props.data?.moniteur_id || null,
          lieu_id: props.data?.lieu_id || null,
          date_examen: props.data?.date_examen || null,
          date_passage: props.data?.date_passage || null,
          heure_passage: props.data?.heure_passage || null,
      }
    : {
          eleve_id: props.data?.eleve_id || null,
          type: props.data?.type || null,
          comment_account: props.data?.comment_account || null,
          is_rdv_permis: props.data?.is_rdv_permis ?? false,
      };
const form = useForm({
    user_id: props.data?.user_id || null,
    date_pass_prevu: props.data?.date_pass_prevu || null,
    comment: props.data?.comment || null,
    status: props.data?.status ?? EXAM_LIST_ATTENTE,
    ...formData,
});

page.actions = [
    {
        label: `${props.isEdit ? 'Enregister' : 'Ajouter'} modification`,
        primary: true,
        submit: true,
        disabled: computed(() => form.processing || !form.isDirty),
        loading: computed(() => form.processing),
        onClick: () => submit(),
    },
    {
        label: 'Rejeter',
        disabled: computed(() => form.processing || !form.isDirty),
        secondary: true,
        onClick: () => form.reset(),
    },
];

const submit = () => {
    form.transform((data) => {
        if (data.media?.id) {
            data.media = data.media.id;
        }
        return data;
    });
    if (props.isPreList) {
        return form.post(route(routes.exams.preList.update, props.data.id));
    }
    if (props.isPassage) {
        return form.post(route(routes.exams.passage.update, props.data.id));
    }
    form.post(route(routes.exams.waitingList.update, props.data.id));
};
</script>

<template>
    <form class="grid md:grid-cols-3 py-10 gap-6" @submit.prevent="submit">
        <article class="md:col-span-2 flex flex-col max-md:order-2">
            <Box sectionned padding title="Examen infos">
                <TextField
                    v-if="!isPassage"
                    v-model="form.comment_account"
                    :error="form.errors.comment_account"
                    :multiline="3"
                    label="Compte rendu d'Organisation de la formation"
                />
                <TextField v-model="form.comment" :error="form.errors.comment" :multiline="3" label="Commentaire" />
            </Box>
            <Box v-if="isPassage" sectionned padding title="Passage">
                <div class="bg-white grid lg:grid-cols-2 gap-5">
                    <ZoneLieu
                        v-model="form.lieu_id"
                        :default-value="{ lieu: data.lieu, zone: data.lieu?.zone }"
                        class="col-span-2 max-md:flex-col flex gap-5"
                    />
                    <Listbox2
                        v-model="form.moniteur_id"
                        :items="monitorsQuery.data"
                        :error="form.errors.moniteur_id"
                        :default-value="data.moniteur?.user"
                        placeholder="Selectionner moniteur"
                        label="Moniteur"
                        ssr
                        clear
                        :fetching="monitorsQuery.fetching"
                        :fetching-more="monitorsQuery.fetchingMore"
                        @search="onFetchMoniteur($event, true)"
                        @scroll:end="onFetchMoniteur($event, true, true)"
                    />

                    <Datepicker
                        v-model="form.date_examen"
                        :error="form.errors.date_examen"
                        label="Date d'examen"
                        placeholder="Choisir une date"
                    />
                    <Datepicker
                        v-model="form.date_passage"
                        :error="form.errors.date_passage"
                        label="Date de passage"
                        placeholder="Choisir une date"
                    />
                    <Datepicker
                        v-model="form.heure_passage"
                        :error="form.errors.heure_passage"
                        time
                        min-time="07:00"
                        max-time="23:00"
                        label="Heure de début"
                    />

                    <div class="flex justify-between items-center col-span-2">
                        <span class="block font-medium text-xs text-gray-600 mb-0.5 my-1">Result permis</span>
                        <TabSwitch
                            v-model="form.result_permis"
                            class="text-xs bg-gray-200"
                            size="md"
                            :items="Object.values(EXAM_RSULTS).reverse()"
                        />
                    </div>
                </div>
            </Box>

            <InlineActions :actions="page.actions" />
        </article>

        <Box class="md:sticky top-12 max-md:order-1" padding sectionned title="Info supplémentaire">
            <SelectCombine v-model="form.date_pass_prevu" :error="form.errors.date_pass_prevu" />

            <Listbox2
                v-model="form.type"
                :error="form.errors.type"
                :items="Object.values(examenStatusForfais)"
                :default-value="examenStatusForfais[data?.type] || ''"
                :show-search="false"
                label="Etat"
                placeholder="Choisir type d'offre"
            />

            <Listbox2
                v-model="form.user_id"
                :query="operatorsQuery"
                :error="form.errors.user_id"
                :default-value="data.user"
                placeholder="Selectionner opérateur"
                label="Opérateur"
                clear
            />
            <div class="flex justify-between items-center">
                <span class="block font-medium text-xs text-gray-600 mb-0.5 my-1">Rdv permis</span>

                <TabSwitch
                    v-model="form.is_rdv_permis"
                    class="text-xs bg-gray-200"
                    size="md"
                    :items="tabsYesNo"
                    @change="form.is_rdv_permis = false"
                />
            </div>
        </Box>
    </form>
</template>
