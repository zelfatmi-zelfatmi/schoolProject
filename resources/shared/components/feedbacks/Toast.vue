<template>
    <Teleport to="body">
        <div v-if="toasts.list.length" class="pointer-events-none fixed inset-x-0 bottom-0 z-[9000] pb-2">
            <TransitionGroup name="list" tag="ul">
                <li
                    v-for="toast in toasts.list"
                    :key="toast.id"
                    class="sm:flex sm:justify-center px-3 pb-1 sm:pb-2 lg:px-8"
                    @click="toasts.dismiss(toast.id)"
                >
                    <div
                        class="pointer-events-auto flex items-center justify-between gap-x-4 px-6 py-2.5 rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5 shadow-lg"
                        :class="{
                            'bg-gray-900': toast.type === 'success',
                            'bg-red-600': toast.type === 'error',
                        }"
                    >
                        <component
                            :is="toast.type === 'success' ? InformationCircleIcon : ExclamationCircleIcon"
                            class="h-5 w-5 text-white"
                        />
                        <p class="text-sm leading-5 md:leading-6 text-white">
                            <strong class="font-semibold">{{ toast.title }}</strong>
                            <span v-if="toast.subtitle">
                                <svg viewBox="0 0 2 2" class="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
                                    <circle cx="1" cy="1" r="1" />
                                </svg>
                                {{ toast.subtitle }}
                            </span>
                        </p>
                        <button type="button" class="-m-1.5 flex-none p-1.5">
                            <span class="sr-only">Dismiss</span>
                            <XMarkIcon class="h-5 w-5 text-white" aria-hidden="true" />
                        </button>
                    </div>
                </li>
            </TransitionGroup>
        </div>
    </Teleport>
</template>
<script setup>
import { XMarkIcon, InformationCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/20/solid';
import { useToast } from '@shared/stores';
const toasts = useToast();
</script>

<style>
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
</style>
