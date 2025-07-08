<template>
    <div :key="pageMere.id" class="block max-w-full">
        <div v-if="label" class="flex justify-between">
            <label class="block text-sm font-medium leading-6 text-gray-800">{{ label }}</label>
        </div>
        <ul v-if="summary.length" class="bg-gray-100 mb-3 mt-1 rounded-lg p-2 text-sm space-y-0.5">
            <li
                v-for="(item, idx) in summary"
                :key="idx"
                class="cursor-pointer hover:underline hover:text-blue-700"
                @click="scrollToView(item)"
            >
                <!-- <a :href="`#`"  class="text-sm"> -->

                <span :class="[item.type === 'h1' ? 'font-semibold pt-2 first:-mt-2' : 'ml-4', 'block']"
                    >{{ item.type === 'h2' ? '• ' : '' }}{{ item.text }}</span
                >
                <!-- </a> -->
            </li>
        </ul>
        <div class="w-full prose max-w-full prose-sm mt-0.5">
            <div id="editor" class="prose max-w-[45.3rem]" v-html="modelValue"></div>
        </div>
        <Modal v-if="pageMain" :show="pageMere.show" max-width="sm" title="Page Mere" @close="handleClosePageMain">
            <div class="p-5 flex flex-col gap-5">
                <TextField v-model="pageMere.label" label="Titre Afficher" />
                <TextField v-model="pageMere.url" label="Url" />

                <div class="flex gap-5 justify-end">
                    <Button secondary @click="handleClosePageMain">Fermer</Button>
                    <Button success :disabled="!pageMere.label || !pageMere.url" @click="handleApplyPageMain">
                        Appliquer
                    </Button>
                </div>
            </div>
        </Modal>
        <Modal
            v-if="embbedPopup"
            :show="popupEmbbed.show"
            max-width="md"
            title="Pop up embedded"
            @close="handleClosePopupEmbbed"
        >
            <div class="flex flex-col">
                <Scrollable class="max-h-[70vh] p-5" @scroll:end="fetchPopups(true)">
                    <ul v-if="popupEmbbed.data.length" class="grid grid-cols-3 gap-5">
                        <li
                            v-for="item in popupEmbbed.data"
                            :key="item.id"
                            :class="[
                                'cursor-pointer bg-white rounded-lg shadow-sm p-5',
                                popupEmbbed.selected?.id === item.id ? 'ring ring-primary' : 'hover:shadow-lg',
                            ]"
                            @click="popupEmbbed.selected = item"
                            @dblclick="handleApplyEmbbededPopup(item)"
                        >
                            <!-- <PopupNotification :data="item" class="scale-50 origin-center" /> -->
                            {{ item.title }}
                        </li>
                    </ul>

                    <Spinner v-else-if="popupEmbbed.loading" class="w-8 my-8 mx-auto" />
                </Scrollable>

                <div class="flex gap-5 justify-end p-5">
                    <Button secondary @click="handleClosePageMain">Fermer</Button>
                    <Button success :disabled="!popupEmbbed.selected" @click="handleApplyEmbbededPopup(item)"
                        >Appliquer</Button
                    >
                </div>
            </div>
        </Modal>
        <InlineError v-if="error" :errors="error" />
    </div>
</template>

<script setup>
import '@ckeditor/ckeditor5-build-classic/build/translations/fr';
import { onMounted, watch } from 'vue';
import InlineError from '@shared/components/feedbacks/InlineError.vue';
import { ref } from 'vue';
import { Modal } from '../modals';
import TextField from './TextField.vue';
import { reactive } from 'vue';
import { Button, Scrollable, Spinner } from '../common';
import { routes } from '@blogs/routes';
import { getSummary, scrollToView } from '@shared/helpers';
import { PopupNotification } from '@blogs/components';
import { defineCustomElement } from 'vue';

const emit = defineEmits(['update:modelValue', 'selection']);
const props = defineProps({
    label: String,
    error: String,
    showSource: Boolean,
    setData: Function,
    minimal: Boolean,
    pageMain: Boolean,
    embbedPopup: Boolean,
    toolbar: {
        type: Boolean,
        default: true,
    },
    modelValue: {
        type: [String, Number],
        default: null,
    },
    placeholder: {
        type: String,
        default: '',
    },
});
const summary = ref([]);
const pageMere = reactive({
    show: false,
    id: performance.now(),
    url: '',
    label: '',
    editor: '',
});
const popupEmbbed = reactive({
    show: false,
    data: [],
    next_page_url: {},
    selected: null,
    loading: false,
    // editor: '',
});
const extraToolbarsItem = {
    find: ['findAndReplace'],
    textTransform: ['subscript', 'superscript'],
    font: ['fontSize', 'fontColor', 'fontBackgroundColor', '|'],
    media: ['insertImage', 'mediaEmbed'],
    export: ['exportPDF', 'exportWord'],
    other: ['specialCharacters', 'horizontalLine', '|'],
};
const handleApplyPageMain = () => {
    // const editableDiv = document.querySelector('.ck-editor__editable_inline');
    // if (window.getSelection && editableDiv.contains(window.getSelection().focusNode.parentElement)) {

    // }
    const addNewData = `<a href="${pageMere.url}" data-page-mere="true">${pageMere.label}</a>`;
    emit('update:modelValue', props.modelValue + addNewData);

    handleClosePageMain();
    pageMere.id = performance.now();
    setTimeout(() => {
        init();
    }, 100);
};
const handleApplyEmbbededPopup = (item = null) => {
    const editableDiv = document.querySelector('.ck-editor__editable_inline');
    // const focusedElement = document.activeElement;

    if (window.getSelection && editableDiv.contains(window.getSelection().focusNode.parentElement)) {
        // const selectedText = window.getSelection().toString();
        // // Add your data (you can replace this with your desired content)
        // const newData = 'This is the new data.';
        // // Insert the new data at the caret position
        // const textNode = document.createTextNode(newData);
        // const range = window.getSelection().getRangeAt(0);
        // range.insertNode(textNode);
        //     range.deleteContents();
        //     range.insertNode(document.createTextNode('test'));
        // }
        // var parent = document.getElementById("parent");
        // var component = createComponent(); // Assuming this return an Node element
        // parent.appendChild(component);
        // const MyVueElement = defineCustomElement({
        //     // normal Vue component options here
        //     props: {},
        //     emits: {},
        //     template: `<b>suso</b>`,
        //     // defineCustomElement only: CSS to be injected into shadow root
        //     styles: [`/* inlined css */`],
        // });
        // editableDiv.appendChild(
        //     new MyVueElement({
        //         // initial props (optional)
        //         data: item,
        //         readonly: true,
        //     })
        // );
    }

    handleClosePopupEmbbed();
};
const fetchPopups = (loadMore = false) => {
    let url = route(routes.api.popup.all);
    if (loadMore && !popupEmbbed.next_page_url) {
        return;
    } else if (loadMore && popupEmbbed.next_page_url) {
        url = popupEmbbed.next_page_url;
        popupEmbbed.loadingMore = true;
    } else {
        popupEmbbed.loading = true;
    }

    axios
        .get(url)
        .then(({ data }) => {
            if (data.data) {
                popupEmbbed.data = loadMore ? [...popupEmbbed.data, ...data.data] : data.data;
                popupEmbbed.next_page_url = data.next_page_url;
            }
        })
        .finally(() => {
            popupEmbbed.loading = false;
            popupEmbbed.loadingMore = false;
        });
};
const handleClosePageMain = () => {
    pageMere.show = false;
    pageMere.label = '';
    pageMere.url = '';
};
const handleClosePopupEmbbed = () => {
    popupEmbbed.show = false;
};
const registerButton = (editor = null) => {
    const toolbar = document.querySelector('.ck-toolbar .ck-toolbar__items');
    if (toolbar && editor) {
        pageMere.editor = editor;
        const btn = document.createElement('button');
        // const btn2 = document.createElement('button');
        btn.classList.add('ck', 'ck-button', 'ck-off');
        // btn2.classList.add('ck', 'ck-button', 'ck-off');
        btn.textContent = 'Page Mere';
        // btn2.textContent = 'Pop up';
        btn.type = 'button';
        // btn2.type = 'button';
        btn.addEventListener('click', () => {
            pageMere.show = true;
            props.setData(({ title, url }) => {
                pageMere.label = title;
                pageMere.url = url;
            });
        });
        // btn2.addEventListener('click', () => {
        //     popupEmbbed.show = true;
        //     if (!popupEmbbed.data.length) {
        //         fetchPopups();
        //     }
        // });
        toolbar.appendChild(btn);
        // toolbar.appendChild(btn2);
    }
};
const init = () => {
    summary.value = getSummary(props.modelValue);
    window.CKEDITOR.ClassicEditor.create(document.getElementById('editor'), {
        //   initialData: props.modelValue,
        ckfinder: { uploadUrl: route('image.upload') + '?_token=' + document.getElementById('_token')?.value },
        toolbar: {
            items: [
                'undo',
                'redo',
                // 'autoLink',
                ...(props.minimal ? [] : extraToolbarsItem.find),
                '|',
                'heading',
                '|',
                'bold',
                'italic',
                'strikethrough',
                'underline',
                ...(props.minimal ? [] : extraToolbarsItem.textTransform),
                '|',
                'fontSize',
                'fontColor',
                'fontBackgroundColor',
                '|',
                // ...(props.minimal ? [] : extraToolbarsItem.font),
                'bulletedList',
                'numberedList',
                'todoList',
                'alignment',
                'outdent',
                'indent',
                '|',
                'link',
                'blockQuote',
                'insertTable',
                // media
                ...(props.minimal ? [] : extraToolbarsItem.media),
                '|',
                // break
                ...(props.minimal ? [] : extraToolbarsItem.other),
                // // export
                // ...(props.minimal ? [] : extraToolbarsItem.export),
                'sourceEditing',
            ],
            shouldNotGroupWhenFull: true,
        },
        language: 'fr',
        heading: {
            options: [
                { model: 'paragraph', title: 'Paragraph' },
                { model: 'heading1', view: 'h1', title: 'Heading 1' },
                { model: 'heading2', view: 'h2', title: 'Heading 2' },
                { model: 'heading3', view: 'h3', title: 'Heading 3' },
                { model: 'heading4', view: 'h4', title: 'Heading 4' },
                { model: 'heading5', view: 'h5', title: 'Heading 5' },
                { model: 'heading6', view: 'h6', title: 'Heading 6' },
            ],
        },
        placeholder: props.placeholder || 'tapez votre contenu ici',
        fontSize: {
            options: [10, 12, 14, 'default', 18, 20, 22],
            supportAllValues: true,
        },
        // https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html#enabling-all-html-features
        htmlSupport: {
            allow: [
                {
                    name: /.*/,
                    attributes: true,
                    classes: true,
                    styles: true,
                },
            ],
        },
        // https://ckeditor.com/docs/ckeditor5/latest/features/link.html#custom-link-attributes-decorators
        link: {
            decorators: {
                addTargetToExternalLinks: true,
                defaultProtocol: 'https://',
                toggleDownloadable: {
                    mode: 'manual',
                    label: 'No follow',
                    attributes: {
                        rel: 'nofollow',
                    },
                },
            },
        },
        // documentOutline: {
        //     container: document.querySelector('.document-outline-container'),
        // },
        // https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html#configuration
        // mention: {
        //     feeds: [
        //         {
        //             marker: '@',
        //             feed: [],
        //             minimumCharacters: 0,
        //         },
        //     ],
        // },
        removePlugins: [
            'CKBox',
            'CKFinder',
            'EasyImage',
            'RealTimeCollaborativeComments',
            'RealTimeCollaborativeTrackChanges',
            'RealTimeCollaborativeRevisionHistory',
            'PresenceList',
            'Comments',
            'TrackChanges',
            'TrackChangesData',
            'RevisionHistory',
            'Pagination',
            'WProofreader',
            'MathType',
            'SlashCommand',
            'Template',
            'DocumentOutline',
            'FormatPainter',
            'TableOfContents',
            'PasteFromOfficeEnhanced',
        ],
    }).then((editor) => {
        // editor.model.document.selection.on('change:range', (e) => {
        //     // setTimeout(() => {
        //     //     // e.off();
        //     //     editor.model.deleteContent(window.getSelection().getRangeAt(0));
        //     // }, 1000);
        //     // emit('selection', editor.getData());
        // });
        editor.model.document.on('change:data', () => {
            summary.value = getSummary(editor.getData());
            emit('update:modelValue', editor.getData());
        });
        props.pageMain && registerButton(editor);
    });
};
onMounted(init);
</script>
<style>
.ck.ck-powered-by {
    display: none !important;
}
</style>
