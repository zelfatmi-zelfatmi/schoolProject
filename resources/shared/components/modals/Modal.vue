<script setup>
import { computed, onMounted, onUnmounted, watch } from 'vue';
import { XMarkIcon } from '@heroicons/vue/20/solid';

const props = defineProps({
    title: String,
    subtitle: String,
    zIndex: String,
    customClass: String,
    className: String,
    blurred: Boolean,
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: '2xl',
    },
    closeable: {
        type: Boolean,
        default: true,
    },
    scrollable: {
        type: Boolean,
        default: true,
    },
    backdrop: {
        type: Boolean,
        default: true,
    },
    persistent: {
        type: Boolean,
        default: true,
    },
});

const emit = defineEmits(['close']);

watch(
    () => props.show,
    () => {
        if (props.show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = null;
        }
    }
);

const close = () => {
    if (props.closeable) {
        emit('close');
    }
};


const closeOnEscape = (e) => {
    if (e.key === 'Escape' && props.show) {
        close();
    }
};

onMounted(() => document.addEventListener('keydown', closeOnEscape));

onUnmounted(() => {
    document.removeEventListener('keydown', closeOnEscape);
    document.body.style.overflow = null;
});

const maxWidthClass = computed(() => {
    return {
        xs: 'md:max-w-sm h-fit',
        sm: 'md:max-w-screen-sm h-fit',
        md: 'md:max-w-screen-md h-fit',
        '2md': 'md:max-w-4xl h-fit',
        lg: 'md:max-w-screen-lg h-full',
        xl: 'md:max-w-screen-xl h-full',
    }[props.maxWidth];
});
</script>

<template>
    <teleport to="body">
        <transition leave-active-class="duration-200">
            <div
                v-show="show"
                :class="[
                    'fixed inset-0 px-4 py-6 lg:px-0 flex items-center max-h-screen',
                    className || '',
                    zIndex || 'z-[899]',
                ]"
                scroll-region
            >
                <transition
                    enter-active-class="ease-out duration-300"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="ease-in duration-200"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <div v-show="show && backdrop" class="fixed inset-0 transform transition-all" @click="close">
                        <div :class="['absolute inset-0 bg-black/70 z-50', blurred && 'backdrop-blur-xl']" />
                    </div>
                </transition>

                <transition
                    enter-active-class="ease-out duration-[400ms]"
                    enter-from-class="md:opacity-0 translate-y-full md:translate-y-0 md:scale-95"
                    enter-to-class="opacity-100 translate-y-0 md:scale-100"
                    leave-active-class="ease-out duration-[400ms]"
                    leave-from-class="opacity-100 translate-y-0 md:scale-100"
                    leave-to-class="opacity-0 translate-y-1/2 md:translate-y-0 md:scale-95"
                >
                    <div
                        v-show="show"
                        :class="[
                            maxWidthClass,
                            scrollable && 'overflow-y-auto',
                            customClass ||
                                'bg-gray-100 border border-slate-300 rounded-2xl shadow-xl transform t-200 w-full md:mx-auto max-h-[calc(100vh-5rem)] flex flex-col',
                        ]"
                    >
                        <div
                            v-if="title || subtitle"
                            class="h-fit sticky top-0 z-1 border-b border-slate-300 bg-gray-100 md:rounded-t-xl max-md:py-1"
                        >
                            <div
                                v-if="title"
                                class="text-lg font-semibold px-3 md:px-4 py-2 md:py-4 relative text-slate-800"
                            >
                                {{ title }}
                                <button v-if="closeable" @click="close">
                                    <XMarkIcon
                                        class="absolute top-1/2 -translate-y-1/2 right-3 h-6 w-6 hover:text-red-500"
                                    />
                                </button>
                            </div>
                            <p
                                v-if="subtitle"
                                class="px-3 md:px-4 pb-2 md:pb-4 -mt-2 md:-mt-4 opacity-70 text-xs text-slate-700"
                            >
                                {{ subtitle }}
                            </p>
                        </div>
                        <slot />
                    </div>
                </transition>
            </div>
        </transition>
    </teleport>
</template>
