<script setup>
import { Button, TabSwitch } from '@shared/components';
import { routes } from '@admin/routes';
import { reactive } from 'vue';
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/20/solid';
import { globalIsActiveEnum } from '@shared/constants';
import { useForm } from '@inertiajs/vue3';

defineEmits(['item:delete']);

const props = defineProps({
    item: {
        type: Object,
        default: () => ({}),
    },
    gid: String,
});

const state = reactive({
    isEdit: false,
});

const form = useForm({
    label: props.item.label,
    skill_group_id: props.item.skill_group_id,
    status: props.item.status ? 1 : 0,
    position: props.item.position || 0,
});

const handleSave = () => {
    form.put(route(routes.configuration.liverApprentissage.skills.update, props.item.id), {
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
                v-model="form.position"
                class="form-control -my-1 p-1 h-8 w-14 text-center"
                type="number"
                placeholder="Position"
                autofocus
            />
            <b v-else>
                {{ item.position }}
            </b>
        </td>
        <td class="cell">
            <input
                v-if="state.isEdit"
                v-model="form.label"
                type="text"
                class="form-control -my-1 p-1 h-8 text-left"
                placeholder="Label"
            />
            <span
                v-else
                :href="route(routes.configuration.liverApprentissage.skills.index, item.id)"
                class="text-black"
            >
                {{ item.label }}
            </span>
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
                    <Button :icon="TrashIcon" danger grouped tooltip="Supprimer" tr @click="$emit('item:delete')" />
                </template>
                <template v-else>
                    <Button dark link class="!text-xs" @click="onCancel">Annuler</Button>
                    <Button
                        info
                        link
                        class="!text-xs"
                        :disabled="form.processing || !form.isDirty"
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
