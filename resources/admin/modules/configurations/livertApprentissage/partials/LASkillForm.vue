<script setup>
import { Button } from '@shared/components/common';
import { routes } from '@admin/routes';
import { useForm } from '@inertiajs/vue3';
import { TabSwitch, TextField } from '@shared/components';
import { globalIsActiveEnum } from '@shared/constants';

const props = defineProps({
    length: {
        type: Number,
        default: 0,
    },
    id: String,
});
const form = useForm({
    skill_group_id: props.id,
    label: '',
    status: 1,
    position: props.length + 1,
});
const submit = () => {
    form.post(route(routes.configuration.liverApprentissage.skills.store, props.id));
};
</script>

<template>
    <form class="flex gap-3 md:gap-10 w-full" @submit.prevent="submit">
        <div class="flex-1 flex gap-1">
            <TextField
                v-model="form.position"
                class="w-14 flex-none"
                placeholder="Position"
                wrapper-class="!px-2"
                type="number"
                :error="form.errors.position"
                required
            />
            <TextField v-model="form.label" placeholder="Label" :error="form.errors.label" required />
        </div>

        <TabSwitch v-model="form.status" class="bg-slate-200" :items="Object.values(globalIsActiveEnum)" />
        <div class="flex-center h-fit gap-2">
            <Button
                primary
                submit
                :disabled="form.processing || !form.isDirty"
                :loading="form.processing"
                class="self-center !text-sm"
            >
                Enregistrer
            </Button>
        </div>
    </form>
</template>

<style scoped></style>
