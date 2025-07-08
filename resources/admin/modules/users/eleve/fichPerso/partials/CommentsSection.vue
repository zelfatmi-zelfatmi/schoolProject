<script setup>
import { useDebounce, useQuery } from '@shared/hooks';
import { routes } from '@admin/routes';
import { onMounted, ref, watch } from 'vue';
import { Box, Button, TextField, Scrollable, SearchField, InlineConfirmation } from '@shared/components';
import { dateFormat } from '@shared/helpers';
import { router, useForm } from '@inertiajs/vue3';
import { PlusIcon } from '@heroicons/vue/20/solid';

const props = defineProps({
    eleve: Object,
});
const searchQuery = ref({
    comment: '',
});
const loading = ref(false);
const deleting = ref(false);
const comments = useQuery({
    url: route(routes.api.comments.list, { eleve_id: props.eleve.id }),
    key: 'comments',
});
const editedItem = ref({
    id: '',
    comment: '',
    eleve_id: props.eleve.id,
});
const isEdit = ref(false);
watch(
    () => searchQuery.value.comment,
    (comment) => {
        debouncedFetchComments(comment, true);
    }
);
const handleFetchComments = (search = '', refetch = false, loadmore = false) => {
    if (comments.data?.length && !refetch) {
        return;
    }
    searchQuery.value.comment = search;
    comments.fetch('', { search }, loadmore);
};
onMounted(async () => {
    await handleFetchComments('');
});
const form = useForm({
    comment: '',
    eleve_id: props.eleve.id,
});
const debouncedFetchComments = useDebounce()(handleFetchComments);

const submit = () => {
    loading.value = true;
    if (!isEdit.value) {
        router.post(route(routes.api.comments.store), form.data(), {
            preserveScroll: true,
            onSuccess: () => {
                handleFetchComments('', true);
                form.reset('comment');
            },
            onError: (e) => {
                console.warn(e);
            },
            onFinish: () => {
                loading.value = false;
            },
        });
    } else {
        router.post(
            route(routes.api.comments.update, editedItem.value.id),
            {
                comment: editedItem.value.comment,
                eleve_id: editedItem.value.eleve_id,
            },
            {
                onSuccess: () => {
                    handleFetchComments('', true);
                    isEdit.value = false;
                },
                onError: (e) => {
                    console.warn(e);
                },
                onFinish: () => {
                    loading.value = false;
                },
            }
        );
    }
};
const handleEdit = (item) => {
    isEdit.value = true;
    editedItem.value.id = item.id;
    editedItem.value.comment = item.comment;
};

const handleConfirmedDelete = (item) => {
    deleting.value = true;
    router.delete(route(routes.api.comments.delete, item?.id), {
        preserveScroll: true,
        onFinish: () => {
            deleting.value = false;
            handleFetchComments('', true);
        },
    });
};
</script>

<template>
    <Box class="p-4" title="Commentaires">
        <SearchField v-model="searchQuery.comment" class="bg-slate-100 rounded-xl" />

        <scrollable
            class="max-h-96 scrollbar overflow-y-auto w-full pb-4 mt-4"
            @scroll:end="handleFetchComments(searchQuery.comment, true, true)"
        >
            <ul class="w-full space-y-4">
                <li v-for="item in comments.data || []" :key="item.id" class="flex gap-3">
                    <div class="flex-shrink-0">
                        <img :src="item?.user?.profile_photo_url" alt="Avatar" class="h-10 w-10 rounded-full" />
                    </div>
                    <div class="flex flex-col flex-1 bg-gray-50 border p-3 rounded-xl">
                        <dl class="flex justify-between">
                            <dd>
                                <div class="font-bold">{{ item?.user?.name }}</div>
                                <div class="flex gap-2 text-xs">
                                    <span
                                        v-if="isEdit && editedItem.id === item.id"
                                        class="cursor-pointer text-blue-600 hover:underline"
                                        @click="isEdit = false"
                                        >Fermer</span
                                    >
                                    <span
                                        v-else
                                        class="cursor-pointer text-blue-600 hover:underline"
                                        @click="handleEdit(item)"
                                    >
                                        Editer
                                    </span>
                                    <InlineConfirmation
                                        class="text-red-600 hover:underline cursor-pointer"
                                        :loading="deleting"
                                        @confirm="handleConfirmedDelete(item)"
                                    >
                                        Supprimer
                                    </InlineConfirmation>
                                </div>
                            </dd>
                            <dd class="text-xs text-gray-500">
                                {{ dateFormat(item?.created_at, 'fromNow') }}
                            </dd>
                        </dl>
                        <div v-if="isEdit && editedItem.id === item.id" class="grid grid-cols-12 gap-3 items-end">
                            <TextField
                                v-model="editedItem.comment"
                                :error="form.errors.comment"
                                :multiline="2"
                                placeholder="Modifier comment"
                                class="col-span-10 mt-1"
                            />
                            <Button
                                :loading="loading"
                                :disabled="loading"
                                primary
                                class="col-span-2 text-xs"
                                fullwidth
                                @click="submit"
                                >Modifier</Button
                            >
                        </div>
                        <p v-else class="text-gray-800">{{ item?.comment }}</p>
                    </div>
                </li>
            </ul>
        </scrollable>

        <form class="flex gap-3 items-center mt-4" @submit.prevent="submit">
            <div class="flex-1">
                <TextField v-model="form.comment" :error="form.errors.comment" placeholder="Ajoute commentaire" />
            </div>
            <Button
                type="submit"
                :loading="loading && !isEdit"
                :disabled="loading"
                primary
                class="col-span-2"
                :icon="PlusIcon"
            >
                Commenter
            </Button>
        </form>
    </Box>
</template>
