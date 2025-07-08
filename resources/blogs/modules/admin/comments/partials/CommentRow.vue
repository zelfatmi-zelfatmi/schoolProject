<script setup>
import { reactive } from 'vue';
import { router, useForm } from '@inertiajs/vue3';
import { EditorField, Button, Thumb, ActionsList, Badge, TextField, Listbox } from '@shared/components';
import { routes } from '@blogs/routes';
import { dateFormat } from '@shared/helpers';
import { PencilSquareIcon, ArrowUturnLeftIcon, EllipsisHorizontalIcon, TrashIcon } from '@heroicons/vue/20/solid';
defineEmits(['delete']);
const props = defineProps({
    item: {
        type: Object,
        default: () => ({}),
    },
});
const formComment = useForm({
    reply: '',
    status: 'published',
});
const formCommentEdit = useForm({
    comment: props.item.comment || '',
    status: props.item.status || 'published',
});
const formStatus = useForm({
    status: props.item.status,
});
const action = reactive({
    reply: false,
    edit: false,
});
const STATUS_ITEMS = [
    { name: 'Publier', value: 'published' },
    { name: 'Désapprouver', value: 'draft' },
];
const handleClose = () => {
    action.reply = false;
    action.edit = false;
    formComment.reset();
    formCommentEdit.reset();
};
const onSuccess = () => {
    action.reply = false;
    action.edit = false;
    formComment.defaults();
    formCommentEdit.defaults();
};
const handleUpdateComment = () => {
    formCommentEdit.post(route(routes.admin.comments.update, props.item.id), { onSuccess });
};
const handleUpdateReply = () => {
    formComment.post(route(routes.admin.comments.update, props.item.id), { onSuccess });
};
const handleEdit = () => {
    action.edit = true;
};
const handleStatusToggle = () => {
    formStatus
        .transform((data) => ({
            status: data.status === 'draft' ? 'published' : 'draft',
        }))
        .post(route(routes.admin.comments.update, props.item.id));
};
</script>

<template>
    <tr>
        <td class="cell">
            <div class="flex items-start gap-3">
                <Thumb :src="item.user_comment?.profile_photo_url" />
                <div>
                    <b>{{ item.name }}</b>
                    <p class="text-xs text-gray-500">{{ item.email }}</p>
                </div>
            </div>
        </td>
        <td class="cell">
            <p class="line-clamp-2 max-w-md whitespace-break-spaces" v-html="item.comment"></p>
        </td>

        <td class="cell">
            <Badge :info="item.status === 'published'" :secondary="item.status === 'draft'">{{
                item.status === 'draft' ? 'Désapprouvé' : 'Approuvé'
            }}</Badge>
        </td>
        <td class="cell">
            {{ item.article?.title }}
        </td>
        <td class="cell capitalize">{{ dateFormat(item.created_at, 'fromNow') }}</td>
        <td class="cell">
            <div class="flex justify-center items-center gap-2">
                <ActionsList
                    :actions="[
                        {
                            title: item.status === 'draft' ? 'Approuvé' : 'Désapprouvé',
                            onClick: handleStatusToggle,
                        },
                        { divider: true },
                        {
                            title: 'Répondre',
                            info: true,
                            link: true,
                            icon: ArrowUturnLeftIcon,
                            onClick: () => {
                                action.reply = !action.reply;
                            },
                        },
                        {
                            title: 'Modifier',
                            icon: PencilSquareIcon,
                            onClick: handleEdit,
                        },
                        {
                            title: 'Supprimer',
                            icon: TrashIcon,
                            danger: true,
                            link: true,
                            onClick: () => $emit('delete', item),
                        },
                    ]"
                >
                    <Button link mono :icon="EllipsisHorizontalIcon" class="hover:bg-slate-100" />
                </ActionsList>
            </div>
        </td>
    </tr>
    <tr v-if="action.reply || action.edit">
        <td :colspan="6" class="bg-gray-100 p-2 space-y-8">
            <div v-if="action.edit" class="w-full">
                <h5 class="font-bold mb-2">Modifier le commentaire</h5>
                <div class="flex gap-2 w-full">
                    <TextField
                        v-model="formCommentEdit.comment"
                        :error="formCommentEdit.errors.comment"
                        :multiline="3"
                        label="Utilisateur Commentaire"
                        class="w-full"
                    />
                    <Listbox
                        v-model="formCommentEdit.status"
                        input-class="bg-white"
                        label="Statut"
                        class="max-w-xs w-full"
                        :default-value="item.status === 'draft' ? STATUS_ITEMS[1] : STATUS_ITEMS[0]"
                        :items="STATUS_ITEMS"
                    />
                </div>

                <div class="flex gap-2 mt-2">
                    <Button
                        info
                        :disabled="!formCommentEdit.isDirty"
                        :loading="formCommentEdit.progress"
                        class="h-7"
                        @click="handleUpdateComment"
                        >Modifier</Button
                    >
                    <Button secondary class="h-7" :disabled="formCommentEdit.progress" @click="handleClose">
                        Annuler
                    </Button>
                </div>
            </div>
            <div v-if="action.reply" class="w-full">
                <h5 class="font-bold mb-2">Répondre au commentaire</h5>
                <EditorField v-model="formComment.reply" :error="formComment.errors.reply" />
                <div class="flex gap-2 mt-2">
                    <Button
                        info
                        :disabled="!formComment.isDirty"
                        :loading="formComment.progress"
                        class="h-7"
                        @click="handleUpdateReply"
                    >
                        Approuver et Répondre
                    </Button>

                    <Button secondary class="h-7" :disabled="formComment.progress" @click="handleClose">Annuler</Button>
                </div>
            </div>
        </td>
    </tr>
</template>
