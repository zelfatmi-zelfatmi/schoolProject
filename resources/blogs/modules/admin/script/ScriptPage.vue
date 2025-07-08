<script setup>
import { Box, CodeEditeur, Page } from '@shared/components';
import { computed } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { routes } from '@blogs/routes';

const props = defineProps({
    script: {
        type: Object,
        default: () => ({}),
    },
});

const form = useForm({
    header: props.script?.header || null,
    body: props.script?.body || null,
    footer: props.script?.footer || null,
    is_active: props.script?.is_active || true,
});

const handleSubmit = () => {
    form.post(route(routes.admin.script.store));
};

const actions = computed(() => [
    {
        label: `Modifier Scripts`,
        primary: true,
        disabled: form.processing || !form.isDirty,
        loading: form.processing,
        onClick: () => handleSubmit(),
    },
    {
        label: 'Rejeter',
        disabled: form.processing || !form.isDirty,
        secondary: true,
        onClick: () => form.reset(),
    },
]);
</script>

<template>
    <Page :actions="actions" title="Script">
        <form class="flex flex-col py-10 lg:gap-10" @submit.prevent="handleSubmit">
            <Box as="article" class="lg:col-span-1 grid" sectionned padding title="Header :">
                <CodeEditeur
                    v-model="form.header"
                    :error="form.errors.header"
                    placeholder="ajouter les tags de Header ..."
                />
            </Box>
            <Box as="article" class="lg:col-span-1 grid" sectionned padding title="Body :">
                <CodeEditeur v-model="form.body" :error="form.errors.body" placeholder="ajouter les tags de Body ..." />
            </Box>
            <Box as="article" class="lg:col-span-1 grid" sectionned padding title="Footer :">
                <CodeEditeur
                    v-model="form.footer"
                    :error="form.errors.footer"
                    placeholder="ajouter les tags de Footer ..."
                />
            </Box>
        </form>
    </Page>
</template>
