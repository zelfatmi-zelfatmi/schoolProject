<script setup>
import { Button } from '@shared/components/common';
import { routes } from '@admin/routes';
import { useForm } from '@inertiajs/vue3';
import { TabSwitch, TextField } from '@shared/components';
import { globalIsActiveEnum } from '@shared/constants';

const form = useForm({
    name: '',
    status: 1,
});
const submit = () => {
    form.post(route(routes.configuration.zones.store), {
        onSuccess: () => form.reset(),
    });
};
</script>

<template>
    <form class="flex gap-3 md:gap-10 w-full" @submit.prevent="submit">
        <TextField
            id="zone-name"
            v-model="form.name"
            class="flex-1"
            placeholder="Ajouter une nouveau zone"
            :error="form.errors.name"
            required
        />
        <TabSwitch v-model="form.status" class="bg-slate-200" :items="Object.values(globalIsActiveEnum)" />
        <div class="flex-center h-fit gap-2">
            <Button
                primary
                submit
                :disabled="form.processing || !form.name"
                :loading="form.processing"
                class="self-center !text-sm"
            >
                Enregistrer
            </Button>
        </div>
    </form>
</template>

<style scoped></style>
