<script setup>
import Modal from './Modal.vue';
import { EmptyState, Button } from '../common';
import { ExclamationTriangleIcon, TrashIcon } from '@heroicons/vue/20/solid';
import { ArrowUpOnSquareIcon } from '@heroicons/vue/24/solid/index.js';
import { computed, reactive } from 'vue';
import { router } from '@inertiajs/vue3';

const emit = defineEmits(['close', 'confirm']);

const props = defineProps({
    show: Boolean,
    loading: Boolean,
    isRestore: Boolean,
    icon: Function,
    disabled: Boolean,
    heading: String,
    href: String,
    buttonAttrs: {
        type: String,
        default: 'danger',
    },
    yellow: Boolean,
    info: Boolean,
    primary: Boolean,
    secondary: Boolean,
    danger: Boolean,
    dark: Boolean,
    confirmText: {
        type: String,
        default: 'Oui, confirmer',
    },

    emptyClass: {
        type: String,
        default: 'text-red-500',
    },
});

const state = reactive({
    deleting: false,
});

const buttonAttributes = computed(() => {
    const obj = {
        primary: props.primary,
        secondary: props.secondary,
        info: props.info,
        dark: props.dark,
        yellow: props.yellow,
    };
    if (Object.values(obj).some((v) => v)) {
        return obj;
    }
    switch (props.buttonAttrs) {
        case 'primary':
            return {
                primary: true,
            };
        case 'success':
            return {
                success: true,
            };
        case 'secondary':
            return {
                secondary: true,
            };
        case 'info':
            return {
                info: true,
            };
        case 'dark': {
            return {
                dark: true,
            };
        }
        default:
            return {
                danger: true,
            };
    }
});

const close = () => {
    emit('close');
};

const handleConfirmedDelete = () => {
    if (props.href) {
        state.deleting = true;
        router.delete(props.href, {
            onSuccess: close,
            onFinish: () => {
                state.deleting = false;
            },
        });
    }
    emit('confirm');
};
</script>

<template>
    <Modal :show="show" max-width="sm" title="Confirmation" z-index="z-[911]" @close="close">
        <EmptyState
            :image="isRestore ? ArrowUpOnSquareIcon : icon || ExclamationTriangleIcon"
            :heading="heading || 'Êtes-vous sûr(e) ?'"
            :class="['py-10 bg-white', emptyClass]"
        >
            <!--  -->
            <div class="my-3"><slot /></div>
        </EmptyState>

        <div class="flex flex-row justify-end p-3 md:px-6 md:py-4 bg-gray-100 text-right">
            <Button secondary @click="close">Fermer</Button>
            <Button
                class="ml-3"
                type="button"
                v-bind="buttonAttributes"
                :loading="loading || state.deleting"
                :disabled="disabled"
                @click="handleConfirmedDelete"
            >
                {{ isRestore ? 'Restore' : confirmText }}
            </Button>
        </div>
    </Modal>
</template>
