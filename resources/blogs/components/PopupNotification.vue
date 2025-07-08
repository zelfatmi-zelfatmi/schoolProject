<script setup>
import { useForm } from '@inertiajs/vue3';
import { TextField, Button } from '@shared/components';
import { computed } from 'vue';
import VideoPreview from './VideoPreview.vue';
import { routes } from '@blogs/routes';
const emit = defineEmits(['close']);
const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
    readonly: Boolean,
});
const form = useForm({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
});
const isVertical = computed(() => ['image_top', 'image_center', 'image_bottom'].includes(props.data.type_template));
const isHorizontal = computed(() => ['image_right', 'image_left'].includes(props.data.type_template));

const handleSubmit = () => {
    if (props.readonly) {
        return;
    }
    form.post(route(routes.front.leads.store), {
        onSuccess: () => {
            form.reset();
            emit('close');
        },
    });
};
// {
// //         firstname: initialStyle,
// //         lastname: initialStyle,
// //         email: initialStyle,
// //         phone: {
// //     size: 16,
// //     color: '#000000',
// // },
</script>

<template>
    <div
        class="flex bg-white min-w-[20rem] max-w-[100vw] max-h-[90vh] rounded-xl overflow-hidden"
        :class="{
            'flex-col': data.type_template === 'image_bottom' || data.type_template === 'video_bottom',
            'flex-col-reverse': data.type_template === 'image_center',
            'flex-col-reverse': data.type_template === 'image_top',
            'flex-row-reverse': data.type_template === 'image_left',
            '': data.type_template === 'image_right',
        }"
        :style="{
            backgroundColor: data.background_color,
            color: data.color,
            '--gcolor': data.color,
            '--gsize': data.font_size + 'px',
            fontFamily: data.font_family,
        }"
    >
        <form
            class="py-5 w-full max-w-xl flex flex-col gap-2 justify-center mx-auto"
            :class="[isVertical && data.image_path ? 'px-20' : 'px-10']"
            @submit.prevent="handleSubmit"
        >
            <h2 class="text-3xl font-semibold">{{ data.title || 'Exemple de titre' }}</h2>
            <div
                class="min-w-[18rem] prose prose-sm prose-headings:mb-3 prose-p:mt-0 prose-p:mb-3"
                :style="{ color: data.color }"
                v-html="data.content"
            ></div>
            <!--
            <p>{{ data.sub_titre || 'exemple sous-titre' }}</p> -->
            <div class="flex gap-3">
                <TextField
                    id="Nom"
                    v-model="form.nom"
                    :style="{
                        '--gcolor': data.styles?.firstname?.color,
                        '--gsize': data.styles?.firstname?.size + 'px',
                    }"
                    label-class="text-[var(--gcolor,#666)] !text-custom"
                    input-class="form-control !bg-white/10 !text-custom"
                    label="Nom"
                    class="flex-1"
                    :error="form.errors.nom"
                />
                <TextField
                    id="prenom"
                    v-model="form.prenom"
                    :style="{
                        '--gcolor': data.styles?.lastname?.color,
                        '--gsize': data.styles?.lastname?.size + 'px',
                    }"
                    label-class="text-[var(--gcolor,#666)] !text-custom"
                    input-class="form-control !bg-white/10 !text-custom"
                    label="Prénom"
                    class="flex-1"
                    :error="form.errors.prenom"
                />
            </div>
            <TextField
                id="email"
                v-model="form.email"
                :style="{
                    '--gcolor': data.styles?.email?.color,
                    '--gsize': data.styles?.email?.size + 'px',
                }"
                label-class="text-[var(--gcolor,#666)] !text-custom"
                input-class="form-control !bg-white/10 !text-custom"
                label="Email"
                :error="form.errors.email"
            />
            <TextField
                id="telephone"
                v-model="form.telephone"
                :style="{
                    '--gcolor': data.styles?.phone?.color,
                    '--gsize': data.styles?.phone?.size + 'px',
                }"
                label-class="text-[var(--gcolor,#666)] !text-custom"
                input-class="form-control !bg-white/10 !text-custom"
                label="Télephone"
                :error="form.errors.telephone"
            />
            <!-- <div class="flex-grow"></div> -->

            <Button primary fullwidth submit :disabled="!form.isDirty" class="mt-6"> Envoyer </Button>
            <div class="flex gap-2">
                <!-- <Button secondary class="!w-1/2 justify-center"> Fermer </Button> -->
            </div>
        </form>
        <img
            v-if="data.image_path && data.type_template !== 'video_bottom'"
            :src="data.image_path"
            :alt="data.title"
            class="object-cover"
            :class="{
                'aspect-video w-full max-w-3xl': isVertical,
                '!max-w-6xl mx-auto': isVertical && data.type === 'full',
                'aspect-[9/16] max-w-xl w-1/3': isHorizontal,
            }"
        />
        <VideoPreview
            v-if="data.video_path && data.type_template === 'video_bottom'"
            :url="data.video_path"
            :class-name="{
                'aspect-video w-full': isVertical,
                'aspect-[9/16] max-w-xl w-1/3': isHorizontal,
            }"
        />
    </div>
</template>
