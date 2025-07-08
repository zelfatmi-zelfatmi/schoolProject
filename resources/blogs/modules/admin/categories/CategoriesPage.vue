<script setup>
import { PlusIcon, EyeIcon, DocumentTextIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/20/solid';
import { dateFormat } from '@shared/helpers';
import { Badge, Box, Button, IndexFilters, Table, Thumb, Page } from '@shared/components';
import { routes } from '@blogs/routes';
import { ConfirmationModal } from '@shared/components';
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';

defineProps({
    title: String,
    categories: {
        type: Object,
        default: () => ({}),
    },
});

const confirmation = ref(null);
const deleting = ref(false);

const actions = [
    {
        label: 'Ajoute Categorie',
        primary: true,
        icon: PlusIcon,
        href: route(routes.admin.categories.create),
    },
];

const headings = [
    { name: 'Media' },
    { name: 'Infos' },
    { name: 'Status', className: 'text-center' },
    { name: 'Date' },
    { name: 'Action', className: 'text-center pr-4' },
];

const handleConfirmation = (category) => {
    confirmation.value = category;
};
const handleConfirmedDelete = () => {
    deleting.value = true;
    router.delete(route(routes.admin.categories.delete, confirmation.value?.id), {
        onFinish: () => {
            deleting.value = false;
        },
        onSuccess: () => {
            confirmation.value = null;
        },
    });
};
</script>

<template>
    <Page width="2xl" :actions="actions" title="Categories">
        <Box sectionned>
            <div>
                <IndexFilters />
                <Table v-slot="{ item }" :items="categories" :headings="headings" :is-loading="false">
                    <td class="cell">
                        <Thumb
                            class="!rounded-lg"
                            image-class="object-cover "
                            :src="item?.media?.storage_media?.path"
                        />
                    </td>
                    <td class="cell">
                        <b>
                            {{ item.name }}
                        </b>
                        <p class="line-clamp-2 max-w-xs whitespace-break-spaces" v-html="item.description"></p>
                    </td>

                    <td class="cell">
                        <Badge class="mx-auto capitalize" :info="item.is_active" :secondary="!item.is_active">{{
                            item.is_active ? 'Actif' : 'Inactif'
                        }}</Badge>
                    </td>
                    <td class="cell uppercase">{{ dateFormat(item.created_at, 'fulltime') }}</td>

                    <td class="cell-actions">
                        <div>
                            <Button
                                link
                                info
                                :href="route(routes.admin.articles.list, { category_id: item.id })"
                                :icon="DocumentTextIcon"
                                title="Voir les articles"
                                class="hover:bg-slate-100"
                            />
                            <Button
                                link
                                success
                                :href="route(routes.admin.categories.edit, item.id)"
                                :icon="PencilSquareIcon"
                                title="Modifier"
                                class="hover:bg-slate-100"
                            />
                            <Button
                                link
                                dark
                                :href="route(routes.front.categoriesShow, { category: item.slug, show_all: true })"
                                :icon="EyeIcon"
                                title="Voir la catégorie"
                                external
                                class="hover:bg-slate-100"
                            />
                            <Button
                                link
                                danger
                                :icon="TrashIcon"
                                title="Delete"
                                class="hover:bg-slate-100"
                                @click="handleConfirmation(item)"
                            />
                        </div>
                    </td>
                </Table>
            </div>
        </Box>
        <ConfirmationModal
            :show="!!confirmation"
            :loading="deleting"
            @close="confirmation = null"
            @confirm="handleConfirmedDelete"
        >
            Etes-vous sûr que vous voulez supprimer categorie <b class="text-red-500">{{ confirmation?.name }}</b
            >?
        </ConfirmationModal>
    </Page>
</template>
