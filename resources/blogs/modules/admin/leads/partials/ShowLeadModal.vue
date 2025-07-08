<script setup>
import { useForm } from '@inertiajs/vue3';
import { Button, Modal, Switch } from '@shared/components';
import { watch } from 'vue';
import { routes } from '@blogs/routes';
const emit = defineEmits(['close']);

const props = defineProps({
    data: [Object, null],
});
const form = useForm({
    is_done: !!props.data?.is_done,
});
watch(props, ({ data }) => {
    if (data) {
        form.is_done = data.is_done;
        form.defaults();
    }
});
const close = () => {
    emit('close');
};
const handleSave = () => {
    if (!props.data) {
        return;
    }
    form.post(route(routes.admin.leads.update, props.data?.id), {
        onSuccess: close,
    });
};
</script>

<template>
    <Modal
        :show="!!data"
        max-width="sm"
        title="Information relative aux demandeurs"
        subtitle="Données personnelles et candidature"
        @close="close"
    >
        <div class="border-y border-gray-300 px-4">
            <dl class="divide-y divide-gray-200">
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-semibold leading-6 text-gray-900">Traité</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <Switch v-model="form.is_done" />
                    </dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-semibold leading-6 text-gray-900">Nom et prénom</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {{ data?.nom }} {{ data?.prenom }}
                    </dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-semibold leading-6 text-gray-900">Télèphone</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ data?.telephone }}</dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-semibold leading-6 text-gray-900">Email address</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ data?.email }}</dd>
                </div>
                <!-- <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-semibold leading-6 text-gray-900">Salary expectation</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
                </div> -->
            </dl>
        </div>

        <div class="flex flex-row justify-end px-6 py-4 bg-gray-100 text-right">
            <Button secondary @click="close">Fermer</Button>
            <Button class="ml-3" primary :loading="form.processing" :disabled="!form.isDirty" @click="handleSave">
                Changer statut
            </Button>
        </div>
    </Modal>
</template>
