<script setup>
import { Button } from '@shared/components/common';
import { routes } from '@admin/routes';
import { useForm } from '@inertiajs/vue3';
import { TabSwitch, TextField } from '@shared/components';
import { globalIsActiveEnum } from '@shared/constants';
const props = defineProps({
    zone: Object,
});
const form = useForm({
    status: 1,
    code: '',
});
const submit = () => {
    form.post(route(routes.configuration.zones.zip.store, props.zone?.id), {
        onSuccess: () => form.reset(),
    });
};
</script>

<template>
    <form class="flex gap-3 md:gap-10 w-full" @submit.prevent="submit">
        <TextField
            id="zone-code"
            v-model="form.code"
            class="flex-1"
            placeholder="Ajouter une nouveau code postal"
            :error="form.errors.code"
            required
        />
        <TabSwitch v-model="form.status" class="bg-slate-200" :items="Object.values(globalIsActiveEnum)" />
        <div class="flex-center h-fit gap-2">
            <Button
                primary
                submit
                :disabled="form.processing || !form.code"
                :loading="form.processing"
                class="self-center !text-sm"
            >
                Enregistrer
            </Button>
        </div>
    </form>
</template>

<style scoped></style>
