<script setup>
import { ref } from 'vue';
import { ArrowLongRightIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/20/solid';
import { Link, router } from '@inertiajs/vue3';
import { routes } from '@admin/routes';
import { Badge, ConfirmationModal, Page } from '@shared/components';
import { dateFormat, isOutdated } from '@shared/helpers';

defineProps({
    pages: Array,
});

const confirmation = ref(null);
const deleting = ref(false);

// const isLoading = ref(false);

const actions = [
    {
        label: 'Nouveau promo',
        primary: true,
        href: route(routes.pages.promo.create),
    },
];

const handleConfirmation = (article) => {
    confirmation.value = article;
};
const handleConfirmedDelete = () => {
    deleting.value = true;
    router.delete(route(routes.pages.promo.delete, confirmation.value?.id), {
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
    <Page width="lg" title="Promo" :actions="actions">
        <ul class="mt-8 grid gap-2">
            <li v-for="item in pages" :key="item.id" as="li" class="bg-white rounded-xl shadow-sm">
                <div class="flex items-center">
                    <div class="flex-1 pl-1 py-1 text-sm">
                        <Link
                            :href="route(routes.pages.promo.edit, item.id)"
                            as="div"
                            class="btn-m hover:bg-slate-100 px-2 py-0.5 rounded-xl group"
                        >
                            <p class="group-hover:text-blue-500 font-bold text-lg">
                                {{ item.title || 'Promo à planifie' }}
                            </p>
                            <p class="text-sm">
                                <span>{{ dateFormat(item.start_at, 'letter') || 'N/A' }}</span>
                                <ArrowLongRightIcon class="w-5 mx-3 inline" />
                                <span>{{ dateFormat(item.end_at, 'letter') || 'N/A' }}</span>
                                <small v-if="isOutdated(item).expired" class="text-red-500">
                                    ({{ isOutdated(item).text }})
                                </small>
                            </p>
                        </Link>
                    </div>
                    <div class="p-3 flex gap-2">
                        <Badge :dark="!!item.products?.length" :warning="!item.products?.length">
                            {{ item.products?.length }} Produit(s)
                        </Badge>
                        <Badge :success="item.is_active" :error="!item.is_active">
                            {{ item.is_active ? 'Actif' : 'Inactif' }}
                        </Badge>
                    </div>
                    <div class="flex-center border-l p-3">
                        <Link
                            :href="route(routes.pages.promo.edit, item.id)"
                            class="flex-center rounded-full w-8 h-8 hover:bg-blue-100 cursor-pointer"
                            title="Modifier"
                        >
                            <PencilSquareIcon class="text-blue-500 w-6" />
                        </Link>
                        <span
                            class="flex-center rounded-full w-8 h-8 hover:bg-red-100 cursor-pointer"
                            title="supprimer"
                            @click="handleConfirmation(item)"
                        >
                            <TrashIcon class="text-red-600 w-6" />
                        </span>
                    </div>
                </div>
            </li>
        </ul>
        <ConfirmationModal
            :loading="deleting"
            :show="!!confirmation"
            @close="confirmation = null"
            @confirm="handleConfirmedDelete"
        >
            <div>
                Etes-vous sûr que vous voulez supprimer le promo
                <b class="text-red-500">{{ confirmation?.title }}</b
                >?
            </div>
        </ConfirmationModal>
    </Page>
</template>
