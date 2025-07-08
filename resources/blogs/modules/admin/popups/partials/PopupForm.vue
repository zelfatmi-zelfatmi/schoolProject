<script setup>
import { computed, ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import {
    Box,
    Button,
    Listbox,
    MediaManager,
    SingleImageField,
    SuperEditorField,
    Switch,
    TextField,
} from '@shared/components';
import { routes } from '@blogs/routes';
import { PopupNotification } from '@blogs/components';
import { usePage } from '@shared/stores';
import { includesType, popupType, tabs, templateType, triggerType } from '../PopupsConst';
import AppearenceBlock from './blocks/AppearenceBlock.vue';
// import html2canvas from 'html2canvas';
const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
    actions: Array,
    isEdit: Boolean,
});
const initialStyle = {
    size: 16,
    color: '#000000',
};
const form = useForm({
    content: props.data.content || '',
    title: props.data.title || '',
    // sub_titre: props.data.sub_titre || '',
    type: props.data.type || 'center',
    include: props.data.include || 'start_with',
    url: props.data.url || '',
    trigger: props.data.trigger || 'scroll',
    trigger_value: props.data.trigger_value || 0,
    type_template: props.data.type_template || 'image_right',
    countdown: props.data.countdown || 0,
    is_active: props.data.is_active || false,
    image_path: props.data.image_path || '',
    video_path: props.data.video_path || '',
    color: props.data.color || '#000000',
    background_color: props.data.background_color || '#ffff',
    font_family: props.data.font_family || '',
    font_size: props.data.font_size || '16',
    styles: props.data.styles || {
        firstname: { ...initialStyle },
        lastname: { ...initialStyle },
        email: { ...initialStyle },
        phone: { ...initialStyle },
    },
    preview_path: null,
});

const page = usePage();
const loading = ref(false);
const currentTab = ref(0);

const handleSubmit = async () => {
    // const canvas = await html2canvas(document.querySelector('#preview'));
    // document.body.appendChild(canvas);
    // const formData = new FormData();
    // canvas.toBlob((blob) => {
    // formData.append('image', blob, 'captured-image.png');
    // form.preview_path = formData.get('image');

    if (props.isEdit) {
        form.post(route(routes.admin.popups.update, props.data.id), {
            onSuccess: () => {
                // toasts
            },
        });
    } else {
        form.post(route(routes.admin.popups.store), {
            onSuccess: () => {
                // toasts
            },
        });
    }
    loading.value = true;
    // });
};

page.actions = [
    {
        label: `${props.isEdit ? 'Modifier' : 'Ajouter'} Popup`,
        primary: true,
        disabled: computed(() => form.processing || !form.isDirty),
        loading: computed(() => form.processing),
        onClick: () => handleSubmit(),
    },
    {
        label: 'Rejeter',
        disabled: computed(() => form.processing || !form.isDirty),
        secondary: true,
        onClick: () => form.reset(),
    },
];
const handleAddMedia = (value) => {
    form.image_path = value?.path;
};
</script>

<template>
    <main class="flex">
        <MediaManager @submit="handleAddMedia" />
        <form
            class="flex flex-col max-h-screen overflow-y-auto flex-1 max-w-md px-3 min-h-[calc(100vh-64px)] lg:min-h-screen relative"
            @submit.prevent="handleSubmit"
        >
            <nav class="flex gap-3 py-3 h-fit" aria-label="Tabs">
                <button
                    v-for="tab in tabs"
                    :key="tab.name"
                    type="button"
                    :class="[
                        tab.id === currentTab
                            ? 'bg-primary/10 text-primary'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200',
                        'rounded-md px-3 py-2 text-sm font-semibold flex-1 h-fit',
                    ]"
                    @click="currentTab = tab.id"
                >
                    {{ tab.name }}
                </button>
            </nav>
            <template v-if="currentTab === 0">
                <Box class="mb-3 px-1">
                    <Switch v-model="form.is_active" label="Activer" :error="form.errors.type_template" />
                </Box>
                <Box title="Contenu" sectionned padding>
                    <TextField id="title" v-model="form.title" label="Titre" :error="form.errors.title" />
                    <!-- <TextField
                        id="sub_titre"
                        v-model="form.sub_titre"
                        label="Sous-titre"
                        :error="form.errors.sub_titre"
                    /> -->
                    <SuperEditorField v-model="form.content" minimal :error="form.errors.content" />

                    <TextField
                        v-model="form.countdown"
                        placeholder="0"
                        type="number"
                        :length="4"
                        label="Compte à rebours"
                        :error="form.errors.countdown"
                    />
                </Box>
                <Box sectionned padding title="Type de popup">
                    <Listbox
                        v-model="form.type"
                        :error="form.errors.type"
                        :items="popupType"
                        :show-search="false"
                        label="Type"
                        placeholder="Selectionner le type de popup"
                    />
                </Box>

                <Box sectionned padding>
                    <Listbox
                        v-model="form.type_template"
                        label="Media type"
                        :show-search="false"
                        :items="templateType"
                        :error="form.errors.type_template"
                    />
                    <SingleImageField
                        v-if="form.type_template?.startsWith('image_')"
                        :src="form.image_path"
                        :error="form.errors.image_path"
                        @delete="form.image_path = null"
                    />

                    <TextField
                        v-else
                        id="video_path"
                        v-model="form.video_path"
                        label="Video URL"
                        :error="form.errors.video_path"
                    />
                </Box>
            </template>
            <AppearenceBlock v-if="currentTab === 1" :values="form" />
            <template v-if="currentTab === 2">
                <Box title="Url condition" sectionned padding>
                    <div class="flex gap-2">
                        <Listbox
                            v-model="form.include"
                            placeholder="Status"
                            label="Status"
                            :items="includesType"
                            :show-search="false"
                            :error="form.errors.include"
                            class="w-2/5"
                        />
                        <TextField
                            id="url"
                            v-model="form.url"
                            class="flex-1"
                            placeholder="URL"
                            label="URL"
                            :error="form.errors.url"
                        />
                    </div>
                </Box>
                <Box title="déclencheur de pop-up" sectionned padding>
                    <Listbox
                        v-model="form.trigger"
                        placeholder="Type de déclenchement"
                        label="Status"
                        :items="triggerType"
                        :show-search="false"
                        :error="form.errors.trigger"
                    />
                    <TextField
                        v-if="form.trigger === 'after_time'"
                        v-model="form.trigger_value"
                        placeholder="0"
                        type="number"
                        label="Temps/seconds"
                        :helper-text="`Afficher si le visiteur est sur la page depuis plus de ${
                            form.trigger_value || 0
                        } seconds`"
                        :error="form.errors.trigger_value"
                    />
                    <TextField
                        v-if="form.trigger === 'scroll'"
                        v-model="form.trigger_value"
                        placeholder="0"
                        type="number"
                        :length="4"
                        label="Valeur du déclencheur de défilement"
                        :error="form.errors.trigger_value"
                        :helper-text="`Afficher si le visiteur fait défiler la page pendant plus de ${
                            form.trigger_value || 0
                        }`"
                    />
                </Box>
            </template>

            <div class="flex-grow"></div>
            <div class="sticky bottom-0 inset-x-0 bg-white flex gap-3 -mx-3 p-3 border-t shadow-box-2 h-fit">
                <Button secondary class="!w-1/2 justify-center"> Annuler </Button>
                <Button primary fullwidth :disabled="!form.isDirty" submit>
                    {{ isEdit ? 'Modifier' : 'Ajouter' }}
                </Button>
            </div>
        </form>
        <section id="preview" :class="['flex-1', form.type === 'full' ? 'bg-white' : 'bg-gray-400  flex-center p-4']">
            <PopupNotification
                :data="form"
                :class="form?.type === 'full' ? 'w-full h-[100vh] !max-h-[100vh] !rounded-none' : ''"
                readonly
            />
        </section>
    </main>
</template>
