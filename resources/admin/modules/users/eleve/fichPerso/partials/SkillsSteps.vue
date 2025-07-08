<script setup>
import { CheckIcon } from '@heroicons/vue/20/solid';
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
    data: Object,
});

const emit = defineEmits(['selectSkill']);

const sortedSkills = computed(() => props.data.slice().sort((a, b) => a.position - b.position));
const selectedItem = ref(null);
const select = (item) => {
    emit('selectSkill', item);
    selectedItem.value = item;
};
const checkIsValid = computed(() => {
    return (item) => {
        return !item.skills.some((skill) => skill?.feedback?.rating !== 1);
    };
});

onMounted(() => {
    select(sortedSkills.value[0]);
});
</script>

<template>
    <div class="border-b border-gray-200 flex w-full group">
        <nav aria-label="Progress" class="flex overflow-hidden group-hover:overflow-x-auto w-full scrollbar">
            <ol class="rounded-md flex lg:border-gray-200 justify-between w-full" role="list">
                <li
                    v-for="(step, stepIdx) in sortedSkills"
                    :key="step.id"
                    :class="[
                        'relative flex-1 min-w-[15rem] border-b-4 pt-1',
                        selectedItem?.id === step?.id ? '  border-red-400' : 'border-transparent',
                    ]"
                >
                    <div class="flex w-full items-center h-full" @click="select(step)">
                        <section class="group cursor-pointer">
                            <article class="flex items-center px-4 py-2.5 text-sm font-medium">
                                <div class="flex-shrink-0">
                                    <span
                                        :class="[
                                            'flex h-8 w-8 items-center justify-center rounded-full border-2',
                                            checkIsValid(step) && step.skills.length > 0
                                                ? 'bg-primary text-white border-primary'
                                                : selectedItem?.id === step?.id
                                                ? ' border-primary'
                                                : 'border-gray-300',
                                        ]"
                                    >
                                        <div v-if="checkIsValid(step) && step.skills.length > 0">
                                            <CheckIcon aria-hidden="true" class="h-6 w-6" />
                                        </div>
                                        <div v-else-if="selectedItem?.id === step?.id">
                                            <span class="text-red-700">{{ stepIdx + 1 }}</span>
                                        </div>
                                        <div v-else>
                                            <span class="text-gray-500">{{ stepIdx + 1 }}</span>
                                        </div>
                                    </span>
                                </div>
                                <div class="ml-4 mt-0.5 flex min-w-0 flex-col">
                                    <span
                                        :class="[
                                            'text-sm font-medium',
                                            step.status === 'complete'
                                                ? ''
                                                : selectedItem?.id === step?.id
                                                ? 'text-primary'
                                                : 'text-gray-500',
                                        ]"
                                    >
                                        {{ step.name }}
                                    </span>
                                </div>
                            </article>
                        </section>
                        <template v-if="stepIdx !== 0">
                            <!-- Separator -->
                            <div aria-hidden="true" class="absolute inset-0 left-0 top-0 hidden w-3 lg:block">
                                <svg
                                    class="h-full w-full text-gray-300"
                                    fill="none"
                                    preserveAspectRatio="none"
                                    viewBox="0 0 12 82"
                                >
                                    <path
                                        d="M0.5 0V31L10.5 41L0.5 51V82"
                                        stroke="currentcolor"
                                        vector-effect="non-scaling-stroke"
                                    />
                                </svg>
                            </div>
                        </template>
                    </div>
                </li>
            </ol>
        </nav>
    </div>
</template>
