<script setup>
import { Button, TabSwitch } from '@shared/components';
import { routes } from '@admin/routes';
import { reactive } from 'vue';
import { GlobeEuropeAfricaIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/20/solid';
import { globalIsActiveEnum } from '@shared/constants';
import { useForm } from '@inertiajs/vue3';
defineEmits(['item:delete']);
const props = defineProps({
    item: {
        type: Object,
        default: () => ({}),
    },
});
const state = reactive({
    isEdit: false,
});
const form = useForm({
    name: props.item.name,
    status: props.item.status ? 1 : 0,
});

const handleSave = () => {
    form.put(route(routes.configuration.zones.update, props.item.id), {
        onSuccess: () => {
            state.isEdit = false;
        },
    });
};
const onCancel = () => {
    form.reset();
    state.isEdit = false;
};
</script>

<template>
    <tr class="group/actions hover:bg-slate-50">
        <td class="cell">
            <input
                v-if="state.isEdit"
                v-model="form.name"
                type="text"
                class="form-control -my-1 p-1 h-8"
                placeholder="Nom de la zone"
                autofocus
            />
            <Button
                v-else
                :href="route(routes.configuration.zones.lieux.index, item.id)"
                info
                link
                tl
                tooltip="Voir la liste des lieux pour ce zone"
            >
                {{ item.name }}
            </Button>
        </td>
        <td class="cell">
            <TabSwitch
                :model-value="form.status ? 1 : 0"
                size="sm"
                :disabled="!state.isEdit"
                class="bg-slate-200 !w-fit mx-auto"
                :items="Object.values(globalIsActiveEnum)"
                @update:model-value="form.status = !!$event"
            />
        </td>
        <td class="sticky right-0 bg-white w-10 mx-auto border-l">
            <div :class="['flex justify-center items-center gap-1 h-full', !state.isEdit && 'px-2']">
                <template v-if="!state.isEdit">
                    <Button :icon="PencilSquareIcon" info grouped tooltip="Modifier" @click="state.isEdit = true" />
                    <Button
                        :icon="GlobeEuropeAfricaIcon"
                        dark
                        grouped
                        tooltip="Code postal"
                        :href="route(routes.configuration.zones.zip.index, item.id)"
                    />
                    <Button :icon="TrashIcon" danger grouped tooltip="Supprimer" tr @click="$emit('item:delete')" />
                </template>
                <template v-else>
                    <Button dark link class="!text-xs" @click="onCancel">Annuler</Button>
                    <Button
                        info
                        link
                        class="!text-xs"
                        :disabled="!form.name"
                        :loading="form.processing"
                        @click="handleSave"
                    >
                        Enreg
                    </Button>
                </template>
            </div>
        </td>
    </tr>
</template>
