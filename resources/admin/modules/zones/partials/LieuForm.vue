<script setup>
import { Button } from '@shared/components/common';
import { routes } from '@admin/routes';
import { useForm } from '@inertiajs/vue3';
import { InlineError, TabSwitch } from '@shared/components';
import { globalIsActiveEnum } from '@shared/constants';
const props = defineProps({
    zone: Object,
});
const form = useForm({
    name: '',
    status: 1,
    url: '',
});
const submit = () => {
    form.post(route(routes.configuration.zones.lieux.store, props.zone?.id), {
        onSuccess: () => form.reset(),
    });
};
</script>

<template>
    <form class="flex gap-3 md:gap-10 w-full items-center" @submit.prevent="submit">
        <div class="flex-1">
            <div class="flex flex-col border border-gray-300 divide-y rounded-lg overflow-hidden shadow-sm -my-1">
                <input
                    v-model="form.name"
                    type="text"
                    class="text-xs focus:ring-0 p-1 h-7 !border-none"
                    placeholder="Nouveau localisation"
                    autofocus
                />
                <div></div>
                <input
                    v-model="form.url"
                    type="url"
                    class="text-xs focus:ring-0 p-1 h-7 !border-none text-blue-500"
                    placeholder="URL: https://google.com/maps?q=1.00,-0.00"
                />
            </div>
            <InlineError :error="form.errors.name" />
            <InlineError :error="form.errors.url" />
        </div>
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
