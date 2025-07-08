<script setup>
import { routes } from '@blogs/routes';
import { OrangeButton } from '@front/components';
import { ChatBubbleBottomCenterIcon, CheckIcon } from '@heroicons/vue/20/solid';
import { useForm, usePage } from '@inertiajs/vue3';
import { EmptyState, Paginate, TextField } from '@shared/components';
import CommentItem from './CommentItem.vue';

const props = defineProps({
    comments: {
        type: Object,
        default: () => ({}),
    },
    article: {
        type: Object,
        default: () => ({}),
    },
});
const { auth } = usePage().props;
const form = useForm({
    article_id: props.article.id,
    comment: '',
    status: 'draft',
    // user_comment_id: auth.user?.id || '',
    // user_id: auth.user?.id || '',
    // article_comment_id: '',
    name: auth.user?.name || '',
    email: auth.user?.email || '',
});
const handleSubmit = () => {
    form.post(route(routes.admin.comments.store, { slug: props.article.slug }), {
        preserveScroll: true,
        onSuccess: () => {
            form.reset();
        },
    });
};
</script>

<template>
    <section class="container-app">
        <form class="mx-auto max-w-5xl mb-10 w-full grid gap-10" @submit.prevent="handleSubmit">
            <h2 class="text-xl md:text-3xl font-bold tracking-tight text-gray-900">Commentaires</h2>
            <article class="relative">
                <div v-if="!auth?.user" class="grid md:grid-cols-2 gap-5 mb-5">
                    <TextField v-model="form.name" label="Nom" :error="form.errors.name" placeholder="Votre nom" />
                    <TextField
                        v-model="form.email"
                        label="E-mail"
                        :error="form.errors.email"
                        placeholder="Votre e-mail"
                    />
                </div>
                <TextField
                    v-model="form.comment"
                    :multiline="4"
                    :error="form.errors.comment"
                    placeholder="Votre commentaire"
                />
                <div class="flex justify-between">
                    <p :class="{ 'opacity-0': !form.wasSuccessful }" class="text-green-500 flex-center gap-2">
                        <CheckIcon class="w-5" />
                        {{
                            form.recentlySuccessful
                                ? 'Votre avis a été pris en compte'
                                : 'Merci de votre commentaire, votre avis est important'
                        }}
                    </p>
                    <OrangeButton
                        class="float-right"
                        :disabled="!form.isDirty"
                        type="submit"
                        :loading="form.processing"
                    >
                        Comment
                    </OrangeButton>
                </div>
            </article>
            <EmptyState
                v-if="!comments.total"
                :image="ChatBubbleBottomCenterIcon"
                class="py-16 bg-slate-50 rounded-xl shadow"
                heading="Aucun commentaire"
            >
                Être le premier qui fera le commentaire
            </EmptyState>
            <article v-else>
                <ul class="flex flex-col gap-3">
                    <CommentItem v-for="item in comments.data" :key="item.id" :item="item" />
                </ul>
                <Paginate :links="comments.links" class="mt-5" />
            </article>
        </form>
    </section>
</template>
