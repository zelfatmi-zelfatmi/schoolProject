<template>
    <teleport to="body">
        <transition leave-active-class="duration-300">
            <div v-show="show" :class="['relative', zIndex || 'z-900']">
                <transition
                    enter-active-class="ease-out duration-500"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="ease-in duration-300"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <div v-if="show" class="fixed inset-0 transform transition-all" @click="$emit('close')">
                        <div class="absolute inset-0 bg-black/70 z-50" />
                    </div>
                </transition>
                <div :class="['fixed inset-y-0 flex w-full max-w-md', positionClass[position].wrapperClass]">
                    <transition :name="positionClass[position].transName" mode="out-in">
                        <div v-show="show" class="flex h-full flex-col overflow-y-auto bg-gray-100 shadow-xl w-full">
                            <div v-if="title" class="px-4 sm:px-6 py-6">
                                <div class="flex items-start justify-between">
                                    <h3 class="text-base font-semibold leading-6 text-gray-900">
                                        {{ title }}
                                    </h3>
                                    <div class="ml-3 flex h-7 items-center">
                                        <button
                                            type="button"
                                            class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            @click="$emit('close')"
                                        >
                                            <span class="absolute -inset-2.5" />
                                            <span class="sr-only">Close panel</span>
                                            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="relative flex-1 flex flex-col">
                                <slot />
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
    position: {
        type: String,
        default: 'right',
    },
    title: String,
    show: Boolean,
    zIndex: String,
    id: String,
});
const positionClass = {
    right: {
        transName: 'slide-left',
        wrapperClass: 'right-0 md:pl-10',
    },
    left: {
        transName: 'slide-right',
        wrapperClass: 'left-0 md:pr-10',
    },
};
const emit = defineEmits(['close']);
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
</script>
